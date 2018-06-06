<template lang="html">
  <v-container>
    <div v-show="tableObj.loadProcedureList">
        <v-progress-circular indeterminate color="red"></v-progress-circular>
        <span style="color: red;font-size: 16px;">Parameter List Loading...</span>
    </div>
    <div v-show="!tableObj.loadProcedureList">
    <v-layout row justify-center>
      <v-dialog :value="dialog" fullscreen transition="dialog-bottom-transition" :overlay="false" scrollable>
        <v-card tile style="height:650px">
          <!-- ******************************Start ************************************* -->
          <v-toolbar card dark color="primary" app :clipped-left="$vuetify.breakpoint.mdAndUp" fixed>
            <v-spacer></v-spacer>
            <v-toolbar-title>Close</v-toolbar-title>
            <v-btn icon @click.native="closeDialog" dark>
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-content>
            <v-container grid-list-lg>
              <v-layout>
                <!-- ************************************************************************************************************************** -->
                <v-stepper v-model="stepper" style="width:100%">
                <v-stepper-header>
                    <v-stepper-step :complete="stepper > 1"  step="1">Procedure List</v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step step="2" >Parameter</v-stepper-step>
                </v-stepper-header>
                <v-stepper-items>
                <v-stepper-content step="1">
                  <!-- <table-relationship @update-object='updateTableObj' @update-join="updateJoin" :tableObj="tableObj" style="height:430px">
                  </table-relationship> -->
                  <procedure-list @update-object='updateTableObj' :tableObj="tableObj" style="min-height:430px">                      
                  </procedure-list>
                </v-stepper-content>
                <v-stepper-content step="2">
                   <!-- <work-table-output @update-step='saveDialog' @update-object='updateTableObj' :tableObj="tableObj" style="min-height:430px">
                   </work-table-output> -->
                   <parameter-list @update-object='updateTableObj' @update-step='saveDialog' :tableObj="tableObj" style="height:430px"></parameter-list>
                </v-stepper-content>
                </v-stepper-items>
              </v-stepper>
                <!-- <v-flex d-flex xs12>
                  <div class="form-views" v-show="progressbar == 1" style="width:100%;margin-left:3%;height:500px">

                    <procedure-list @update-object='updateTableObj' :tableObj="tableObj">                      
                    </procedure-list>

                  </div>
                  <div class="form-views" v-show="progressbar == 2" style="width:100%;margin-left:3%;height:500px">

                    <parameter-list @update-object='updateTableObj' @update-step='saveDialog' :tableObj="tableObj"></parameter-list>

                  </div>
                </v-flex> -->
                <!-- **************************************************************************** -->
              </v-layout>
            </v-container>
          </v-content>
          <!-- ****************************** END ************************************* -->
          <div style="flex: 1 1 auto;" />
        </v-card>
      </v-dialog>
    </v-layout>
    <v-dialog v-model="processDoc" max-width="60%" max-height="50%">
        <process-name @save-name="saveName" v-on:close="processDoc=false"></process-name>
    </v-dialog>
    </div>
  </v-container>
</template>

<script>
import _def from '../various/defnitions'
import cloneDeep from 'lodash/cloneDeep';
import tableData from '../data/table-selection';
import uniq from 'lodash/uniq'
import config from '../../config.json'
import procedureList from "./procedureList.vue";
import parameter from './parameter.vue';
import getStepData from '../methods/storedProcedureInput'
import processName from '../processName.vue'
import { post as postToServer  } from '../methods/serverCall'
export default {
  components: {
    'procedure-list':procedureList,
    'parameter-list':parameter,
    'process-name':processName
  },
  data() {
    return {
      drawer: null,
      dataStr: _def.dataStr,
      progressbar: 1,
      tableObj: cloneDeep(tableData),
      userData:'',
      stepper:0,
      processDoc:false
    }
  },
  computed: {
    dialog() {
      return this.$store.state.openStoredProcedure
    },
  },
  watch: {
    dialog(newValue) {
      if (newValue) {
        this.tableObj = this.$store.state.archivalStep[this.$store.state.currentStep];
      }
    },
  },
  props: {
    source: String
  },
  methods: {
    saveName(name){
      let _this = this;
      _this.$store.state.process_definition_name = name;
      _this.$toaster.success('Name Change successfully')
      _this.processDoc = false;
    },
    saveDialog(objData) {
        let _this = this;
        _this.tableObj = objData;
        _this.userData = JSON.parse(sessionStorage.getItem("userInfo"));
        let inputJson = getStepData(_this, _this.tableObj);
        // console.log("inputJson in stored procedure"+JSON.stringify(inputJson));
        let url = config.IDE_API_URL+'ide_step_data/add';
         postToServer(this, url, inputJson).then(response=>{
           if(response.message){
            _this.$toaster.error(response.message);
            return;
          }
        _this.tableObj.stepId = response.id;
        _this.$store.state.process_definition_id = response.process_definition_id;
        _this.tableObj.process_definition_id = response.process_definition_id;
        _this.$store.state.archivalStep[_this.$store.state.currentStep] = cloneDeep(_this.tableObj);
        _this.$store.state.processArray.push(cloneDeep(inputJson));
        let $flowchart = $("#droppable");
        var flowchartData = $flowchart.flowchart('getData');
        let objectLength = Object.keys(flowchartData.links).length;
        let findLink=[],
        addData = [];
        let currentStep = _this.$store.state.currentStep;
        findLink.push(cloneDeep(currentStep));

        /**@augments For previous Step data Tree traversal BFS Algo Implemented
         */
        do{
          for (var i = 0; i < objectLength; i++) {
            if (flowchartData.links[i].fromOperator == currentStep) {
              findLink.push(cloneDeep(flowchartData.links[i].toOperator));
              addData.push(cloneDeep(flowchartData.links[i].toOperator));
            }
         }
        findLink.splice(0,1);
        if(findLink.length){
          currentStep = findLink[0];
        } 
        }while(findLink.length)
        
        addData = uniq(addData);
         let obj = {
                'name': _this.tableObj.title,
                'columns': _this.tableObj.selectedColumns,
                'stepId': 'Previous Steps'
              }
        addData.map(linkObj=>{
          _this.$store.state.archivalStep[linkObj].allPrevStepTables.push(obj);
        })
        console.log("flowchartData in save step" + JSON.stringify(flowchartData));
        console.log("tableObj in save step" + JSON.stringify(_this.tableObj));
        _this.$toaster.success('Data save successfully');
        this.$store.state.openStoredProcedure = false;
         },response=>{
           if(response && response.message){
             _this.$toaster.error(response.message);
                _this.processDoc = true;  
            }    
            else    
             _this.$toaster.error('Data got rejected');
          });      
    },  
    updateTableObj(arr) {
        let _this = this;
        _this.tableObj = arr[0];
        _this.stepper = arr[1];
        // this.progressbar = arr[1];
        if(arr[1] == '2'){
          _this.loadParamaterList();
        }
    },
    loadParamaterList(){
       let _this = this;
       let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
         _this.tableObj.loadParamater = true;
        let inputJson = {
                "procedure_name": _this.tableObj.storedProcedure.name,
                "env_id": userInfo.env_id,
                "database_name":_this.$store.state.database_name,
                "database_type":_this.$store.state.database_type,
                "schema":_this.$store.state.schema,
                "connstr":_this.$store.state.conn_str,
                "client_id":userInfo.client_id
        };
        let url = config.AGENT_API_URL+"get_stored_procedure_param";
        postToServer(this, url, inputJson).then(paramResponse => {
          _this.tableObj.loadParamater = false;
          _this.tableObj.storedProcedure.params = paramResponse.result;
        },paramResponse => {
          _this.tableObj.loadParamater = false;
        });
    },  
    previousScreen(number) {
      this.progressbar = number;
    },
    nextScreen(number) {
      this.progressbar = number;
    },
    closeDialog() {
      this.$store.state.openStoredProcedure = false
    },
    
  },
  mounted() {
    var _this = this;
  }
}

</script>
<style scoped>
.content {
  height: 626px;
  overflow: auto
}

.btm-20 {
  margin-bottom: 20px;
}

.updt-css {
  font-size: 20px;
  color: red;
  cursor: pointer;
}

.datatable td {
  vertical-align: inherit
}

.next {
  position: absolute;
  top: 537px;
}

.chevron {
  cursor: pointer;
  text-align: center;
  background: #ccc;
  border: 1px solid #fff;
  height: 22px;
  width: 250px;
  display: inline-block;
  margin-left: -65px;
  -webkit-clip-path: polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%);
  clip-path: polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%);
}

.chevron_active {
  background: #666;
}

.ft-30 {
  font-size: 30px;
}

</style>
