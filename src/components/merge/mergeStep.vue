<template lang="html">
  <div class="">
    <v-layout row justify-center>
      <v-dialog :value="dialog" fullscreen transition="dialog-bottom-transition" :overlay="false" scrollable>
        <v-card tile style="height:650px">
          <!-- ******************************Start ************************************* -->
          <v-toolbar card dark color="primary" app :clipped-left="$vuetify.breakpoint.mdAndUp" fixed>
            <v-toolbar-title v-if="tableObj.type == 'merge'">Merge Step</v-toolbar-title>
            <v-toolbar-title v-if="tableObj.type == 'minus'">Minus Step</v-toolbar-title>
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
                <v-flex d-flex xs12>
                  <div class="form-views" v-show="progressbar == 1" style="width:100%;margin-left:3%;height:500px">

                    <table-relationship @update-object='updateTableObj' @update-step="saveDialog" @update-join="updateJoin" :tableObj="tableObj">                      
                    </table-relationship>
                  
                  </div>      
                </v-flex>
                <!-- **************************************************************************** -->
              </v-layout>
            </v-container>
          </v-content>
          <!-- ****************************** END ************************************* -->
          <div style="flex: 1 1 auto;" />
        </v-card>
      </v-dialog>
    </v-layout>
    <v-dialog v-model="dialog2" max-width="60%" max-height="50%">

      <!-- ********** tableObj is used to pass data(props) to table-joins vue &
          save-data is used to emit data from table-joins vue ************* -->

      <table-joins @save-data="saveData" :tableObj="tableObj" v-on:close="dialog2=false"></table-joins>

    </v-dialog>
    <v-dialog v-model="processDoc" max-width="60%" max-height="50%">
        <process-name @save-name="saveName" v-on:close="processDoc=false"></process-name>
    </v-dialog>
  </div>
</template>

<script>
import _def from '../various/defnitions'
import cloneDeep from 'lodash/cloneDeep';
import differenceBy from 'lodash/differenceBy'
import uniq from 'lodash/uniq'
import tableData from '../data/table-selection';
import tableJoins from './tableJoins.vue'
import processName from '../processName.vue'
import filter from 'lodash/filter'
// import criteria from './criteria.vue'
import tableRelationship from './mergeTableRelationShip.vue';
import config from '../../config.json'
import { post as postToServer  } from '../methods/serverCall'
import mergeStepData from '../methods/mergeStepInput'
import {IDE_STEP_DATA, PREVIOUS_STEPS, OPERATOR_ARRAY} from '../constant.js'
const message = ['vue.draggable', 'draggable', 'component', 'for', 'vue.js 2.0', 'based', 'on', 'Sortablejs']
export default {
  components: {
    'table-joins': tableJoins,
    'table-relationship': tableRelationship,
    'process-name':processName
  },
  data() {
    return {
      drawer: null,
      dataStr: _def.dataStr,
      dialog2: false,
      dialog3: false,
      selectedColumns: [],
      delayedDragging: false,
      e1: "",
      progressbar: 1,
      tableObj: cloneDeep(tableData),
      userData:'',
      processDoc:false
    }
  },
  computed: {
    dialog() {
      return this.$store.state.openMergePanel
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
    async updateJoin(object) {
      let _this = this;
      _this.tableObj.merge.selectedTable = object;
      await _this.getMergeColumn(object);
      _this.dialog2 = true;
    },
    
    async getMergeColumn(object){
      let _this = this;
       this.tableObj.merge.optionColumn = filter(_this.tableObj.optionColumn, function(o){return o.group == object.tableName});
        this.tableObj.merge.selectedColumns = [];
        for(var relationIndex =0; relationIndex < this.tableObj.relationshipArray.length; relationIndex++)
          if(this.tableObj.relationshipArray[relationIndex].workTableOutput.length && 
                this.tableObj.relationshipArray[relationIndex].workTableOutput[0].group == this.tableObj.merge.optionColumn[0].group){
                    this.tableObj.merge.selectedColumns = this.tableObj.relationshipArray[relationIndex].workTableOutput;
                    this.tableObj.merge.optionColumn = differenceBy(this.tableObj.merge.optionColumn, this.tableObj.merge.selectedColumns, 'name');
                    break;
          }
          debugger;
          // This will add the where condition in the current selected table
          for(var relationIndex =0; relationIndex < this.tableObj.relationshipArray.length; relationIndex++){
            let relObject = this.tableObj.relationshipArray[relationIndex];
            if(relObject.selectedTable.tableName == object.tableName){
              this.tableObj.criteriaArray = cloneDeep(relObject.where);
              break;
            }else{
              _this.tableObj.criteriaArray = cloneDeep(tableData.criteriaArray);
            }
          }
      // console.log("Option Column"+JSON.stringify(this.tableObj.merge.optionColumn));
    },
    updateTableObj(arr) {
      let _this = this;
      _this.tableObj = arr[0];
      this.progressbar = arr[1];
    },
    saveData(obj) {
      let _this = this;
      _this.tableObj = obj;
      _this.dialog2 = false;
    },
    previousScreen(number) {
      this.progressbar = number;
    },
    nextScreen(number) {
      this.progressbar = number;
    },
    closeDialog() {
      this.$store.state.openMergePanel = false
    },
    getjoinOperator(sign) {
      let operatorArray = OPERATOR_ARRAY;
      return operatorArray[sign];
    },
    saveDialog(objData) {
      // alert("In merge step");
      let _this = this;
      _this.tableObj = objData;
      // debugger;
      _this.userData = JSON.parse(sessionStorage.getItem("userInfo"));
      let flowchart$ = $("#droppable");
      var operatorData = flowchart$.flowchart('getOperatorData', _this.$store.state.currentStep);
      let inputParam =  mergeStepData(this, _this.tableObj);     //this.getSelectionData();
      inputParam.top = operatorData.top+"";
      inputParam.left = operatorData.left+"";
      // debugger;
      inputParam.env_id = _this.$store.state.env_id;          //_this.userData.env_id;
      inputParam.process_definition_id = _this.$store.state.process_definition_id; //To add net step on the same process designer
      inputParam.process_definition_name = _this.$store.state.process_definition_name;
      console.log("inputParam in merge step " +JSON.stringify(inputParam));
      let url = config.IDE_API_URL+IDE_STEP_DATA; //'http://192.168.1.101:8016/ide_step_data/add';
      postToServer(this, url, inputParam).then(response=>{
        _this.tableObj.stepId = response.id;
        _this.$store.state.process_definition_id = response.process_definition_id;
        _this.tableObj.process_definition_id = response.process_definition_id;
        _this.$store.state.archivalStep[_this.$store.state.currentStep] = cloneDeep(_this.tableObj);
        _this.$store.state.processArray.push(cloneDeep(inputParam));
        let $flowchart = $("#droppable");
        var flowchartData = $flowchart.flowchart('getData');
        let objectLength = Object.keys(flowchartData.links).length;
        let findLink=[],
        addData = [];
        let currentStep = _this.$store.state.currentStep;
        findLink.push(cloneDeep(currentStep));
        // debugger;
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
                'stepId': PREVIOUS_STEPS
              }
        addData.map(linkObj=>{
          _this.$store.state.archivalStep[linkObj].allPrevStepTables.push(obj);
        })
        console.log("flowchartData in save step" + JSON.stringify(flowchartData));
        console.log("tableObj in save step" + JSON.stringify(_this.tableObj));
        _this.$toaster.success('Data save successfully');
        this.$store.state.openMergePanel = false;
      }
      ,response=>{
           if(response && response.message){
            //  _this.$toaster.error(response.message);
             _this.processDoc = true;  
           }
            // else    
            //  _this.$toaster.error('Due to some internal error, Data got rejected');
      }
      ).catch(e => {
        console.log(e)
        this.ErrorMessage = 'Something went wrong.'
      })

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
