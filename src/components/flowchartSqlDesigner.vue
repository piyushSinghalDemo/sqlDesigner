<template lang="html">
  <v-app id="inspire">
    <!-- <div class=""> -->
    <v-container grid-list-lg style="margin:0px;">
      <v-layout row wrap>
        <v-flex sm3>
          <v-layout row wrap>
            <v-flex>
              <editable :content="processDocName" v-on:update="updateHeadline"></editable>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex>
              <div class="draggable" @contextmenu.prevent="$refs.ctx.open($event)" id="db" style="display:inline-block;">
                <h5>Step</h5>
                <img src="../../static/flowchart/images/db_icon.png" alt="" height="40" width="40">
              </div>
            </v-flex>
            <v-flex>
              <div class="draggable" id="spstep">
                <h5>SP Step</h5>
                <img src="../../static/flowchart/images/sp_icon.jpeg" alt="" height="40" width="40">
              </div>
            </v-flex>
            <v-flex>
              <div class="draggable" id="merge">
                <h5>Merge</h5>
                <img src="../../static/flowchart/images/merge.png" alt="" height="40" width="40">
              </div>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex>
              <div class="draggable" id="if-else">
                <h5>Condition</h5>
                <img src="../../static/flowchart/images/if-else.png" alt="" height="40" width="40">
              </div>
            </v-flex>
            <v-flex>
              <div class="draggable" id="purge">
                <h5>Purge</h5>
                <img src="../../static/flowchart/images/purge.png" alt="" height="40" width="40">
              </div>
            </v-flex>
            <v-flex>
              <div class="draggable" id="archive">
                <h5>Archive</h5>
                <img src="../../static/flowchart/images/archive.png" alt="" height="40" width="40">
              </div>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex>
              <div class="draggable" id="minus">
                <h5>Minus</h5>
                <img src="../../static/flowchart/images/minus.png" alt="" height="40" width="40">
              </div>
            </v-flex>
            <v-flex>
              <div class="draggable" id="copy">
                <h5>Copy</h5>
                <img src="../../static/flowchart/images/copy.png" alt="" height="40" width="40">
              </div>
            </v-flex>
            <v-flex>
              <div class="draggable" id="report">
                <h5>Report</h5>
                <img src="../../static/flowchart/images/report_icon.png" alt="" height="40" width="40">
              </div>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex>
              <div class="draggable" id="duplicate">
                <h5>Duplicate</h5>
                <img src="../../static/flowchart/images/duplicate.png" alt="" height="40" width="40">
              </div>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex>
              <button type="button" class="btn btn-danger" style="width: 147px;" @click.stop="executeProcess">Save Process</button>
              <button type="button" class="btn btn-danger" @click.stop="validateProcess">Validate Process</button>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex sm9>
          <v-layout row wrap>
            <v-flex>
              <div class="panel">
                <div class="panel-body" style="margin-top:10px; ">
                  <div class="showdata">
                  </div>
                  <div name="minimap container">
                    <div id="minimap" v-show="minimap.showMap"></div>
                    <div class="tp-14" title="Minimap" v-on:click="minimap.showMap = !minimap.showMap">
                      <i class="fa fa-arrow-left rt-45" v-bind:class="{'fa-arrow-open':minimap.showMap, 'fa-arrow-down': !minimap.showMap}"></i>
                    </div>
                  </div>
                  <div id="createScroll" class="createScroll">
                    <div id="droppable" class="" style="margin-top:10px;">
                    </div>
                  </div>
                  <br style="clear:both">
                </div>
              </div>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
    <div id="">
        <table-modal></table-modal>
        <archive-panel></archive-panel>
        <stored-procedure></stored-procedure>
        <merge-step></merge-step>
        <!-- <simplert useRadius=true useIcon=true ref="simplert">
          </simplert> -->
    </div>

    <context-menu id="testingctx" ref="ctx" @ctx-open="onCtxOpen" @ctx-cancel="resetCtxLocals" @ctx-close="onCtxClose">
      <li class="ctx-header">Delete</li>
    </context-menu>

    <v-dialog v-model="addTitle" persistent max-width="25%">
      <v-layout align-center justify-center>
        <v-flex>
          <v-card>
            <v-form v-model="validateStep" ref="form" lazy-validation>
              <v-toolbar dark color="primary">
                <v-toolbar-title>Step Details</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon large @click="addTitle = false">
                  <v-icon large>close</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <v-text-field label="Step Name" v-model="stepName" :rules="stepNameRules" required>
                </v-text-field>
                <v-text-field label="Step Description" v-model="stepDetail" :rules="stepDetailRules" multi-line required></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click.native="submitStep" :disabled='!validateStep'>Submit</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
    </v-dialog>
    <v-dialog v-model="dialog2" max-width="60%" max-height="50%">
      <process-name @save-name="saveName" v-on:close="dialog2=false"></process-name>
    </v-dialog>
    <v-bottom-sheet v-model="bottomSheet">
      <validation-logs :logs="logs"></validation-logs>
    </v-bottom-sheet>
    </div>
  </v-app>
</template>


<script>
import { mapState,mapMutations,mapActions, mapGetters } from 'vuex'
import Simplert from 'vue2-simplert'
import _def from './various/defnitions'
import table from './table.vue'
import archiveMain from './archive/archiveMain.vue'
import mergeStep from './merge/mergeStep.vue'
import validationLogs from './validationLog.vue'
import editable from './element/editable.vue'
import storedProcedure from './storedProcedure/storedProcedure.vue'
import tableData from './data/table-selection'
import cloneDeep from 'lodash/cloneDeep';
import filter from 'lodash/filter';
import draggable from 'vuedraggable'
import contextMenu from 'vue-context-menu'
import config from './../config.json'
import { post as postToServer, get as getFromServer  } from './methods/serverCall'
import {getProcessData} from './methods/processDefenationInput'
import processName from './processName.vue'
import {createStepData} from './methods/createStep'
import {setStepInfo} from './methods/setStepInfo'
import {GET_PROCESS_DEFINITION_BY_ID, GET_TABLES, 
          VALDATE_PROCESS_DEFINITION, ADD_IDE_DATA, IDE_STEP_DATA, GET_STORED_PROCEDURE_LIST} from './constant.js'
export default {
  components: {
    Simplert,
    editable,
    'table-modal': table,
    'archive-panel':archiveMain,
    'stored-procedure':storedProcedure,
    'merge-step':mergeStep,
     draggable,
     contextMenu,
     'process-name':processName,
     'validation-logs':validationLogs,
  },
  data() {
    return {
      dataStr: _def.dataStr,
      bottomSheet:false,
      dom: {},
      minimap: {
        showMap: false,
      },
      connectionData: {},
      operatorId: '',
      dbOperatorId: '',
      dbLinkData: [],
      operatorI: 0,
      dragType: 'db',
      dbAllowed: ['db', 'merge'],
      tableAllowed: ['table'],
      SPData: [],
      operatorClass: "dbImage",
      blockData: _def.blockData,
      blockColumns: {},
      purgeForm: _def.purgeForm,
      spForm: _def.spForm,
      conditionForm: _def.conditionForm,
      archiveForm: _def.archiveForm,
      copyForm: _def.copyForm,
      reportForm: _def.reportForm,
      duplicateForm: _def.duplicateForm,
      operatorOptions: _def.operatorOptions,
      operators: _def.operators,
      tableOperatorData: [],
      worflowData: {},
      dbData: {},
      list: [{
      name: "John"
    }, {
      name: "Joao"
    }, {
      name: "Jean"
    }],
    list2: [{
      name: "Juan"
    }, {
      name: "Edgard"
    }, {
      name: "Johnson"
    }],
    showCtx: false,
    contextClicks: [],
    addTitle:false,
    stepName:'',
    stepNameRules:[v => !!v || 'Step Name is required'],
    stepDetail:'',
    stepDetailRules:[v => !!v || 'Step Description is required'],
    leftPosition:0,
    topPosition:0,
    type:'',
    validateStep:true,
    openArchivePanel:false,
    userInfo:"",
    dialog2:false,
    logs:[], 
    // processDocName:this.$store.state.process_definition_name
    }
  },
  computed: {
    ...mapState(['processArray','process_definition_id','process_definition_name','archivalStep',
                  'database_name','database_type','schema','conn_str','currentStep','env_id']),
    processDocName: function(){
      return this.process_definition_name;
    },
    total: function () {
      return this.value.interval ? (this.value.interval * this.value.multiplier).toFixed(2) : 0
    }
  },
  mounted() {
    var _this = this
    var url_string = window.location.href;
    var url = new URL(url_string);
    // console.log("Testing DATA ************************"+JSON.stringify(url.searchParams.get('client_id')));
    _this.userInfo ={
      'client_id':url.searchParams.get('client_id'),
      'accessToken':url.searchParams.get('accessToken'),
      'user_id': url.searchParams.get('user_id'),
      'table_count':url.searchParams.get('table_count'),
      'env_id':url.searchParams.get('env_id'),
      'process_definition_id':url.searchParams.get('process_definition_id'),
    }
    // debugger;
    if(_this.userInfo.env_id){
      _this.set_env_id(_this.userInfo.env_id);
    } 
    sessionStorage.setItem("userInfo",JSON.stringify(_this.userInfo));
    var title = '';
    var blockId = ''
    window.addEventListener('keyup', function(ev) {
      if(ev.key == 'Delete'){
         _this.deleteOperator(); 
      }
    });
    $(".draggable").draggable({
      appendTo: '#droppable',
      cursor: 'move',
      helper: 'clone',
      refreshPositions: true,
    });
    $("#droppable").droppable({
      accept: ".draggable",
      drop: function (event, ui) {
        var pos = ui.position;
        var $obj = ui.helper.clone();
        _this.leftPosition = pos.left; //ui.offset.left - $(this).offset().left;
        _this.topPosition = pos.top; //ui.offset.top - $(this).offset().top;
        _this.type = ui.draggable.attr("id");
        var className = '';
        var imageClass = '';
         _this.getStepDetails();
        if (_this.type == "db" || _this.type == 'spstep') {
          _this.dragType = 'db'
        }
        if (_this.type == "table" || _this.type == "sale_order" || _this.type == "work_order" || _this.type == "pur_order") {
          _this.dragType = 'table'
        }
        _this.minimapImage();
      }
    });

    setTimeout(function () {
      var data = {}
      let _this = this;
        if(_this.userInfo.process_definition_id){
          this.createProcessData();
        }else{
          this.loadData(data)
        }
      var object = $(".createScroll");
      $("#minimap").minimap(object);
    }.bind(this), 1000)
  },
  methods: {
    ...mapActions(['set_process_definition_id','set_process_definition_name','setCurrentStep','set_database_name',
                    'set_database_type','set_schema','set_conn_str','set_dialog','set_env_id','set_openArchivePanel',
                    'set_openMergePanel','set_openStoredProcedure','enable_loadProcedureList','disable_loadProcedureList']),
    async createProcessData(){       
      let _this = this;
      let inputJson = _this.userInfo.process_definition_id;
      let url = config.IDE_API_URL+ GET_PROCESS_DEFINITION_BY_ID+'/'+inputJson //'http://192.168.1.101:8016/add_ide_data';
        getFromServer(this, url).then(response=>{
          if(response && response.steps.length)
          _this.userInfo.env_id = response.steps[0].env_id;
          // console.log("Data for step creation "+JSON.stringify(response));
        let ideInputData = createStepData(_this, response);    
        // debugger;      
        let tableUrl = config.AGENT_API_URL + GET_TABLES; //'http://192.168.1.100:8010/get_tables';
        let inputJson = {
            "table_name": "",
            "table_count": "",
            "env_id": response.steps[0].env_id,
            "client_id": _this.userInfo.client_id
        }
        postToServer(this, tableUrl, inputJson).then(tableResponse => {
            if (tableResponse && tableResponse.table_name_list) {
                // _this.$store.state.schema = tableResponse.schema;
                _this.set_schema(tableResponse.schema);
                // _this.$store.state.conn_str = tableResponse.conn_str;
                _this.set_conn_str(tableResponse.conn_str);
                setStepInfo(_this, response);
                
            }
        }, tableResponse => {}).catch(e => {
            console.log(e)
            this.ErrorMessage = 'Error in getting connection string.'
        });
          
          _this.loadData(ideInputData);
        });  
    },

    updateHeadline (content) {
      // this.$store.state.process_definition_name = content;
      this.set_process_definition_name(content);
    },
    saveName(name){
      let _this = this;
      _this.saveProcessData(name);
    },
    executeProcess(){
      this.saveProcessData();
    },
    validateProcess(){
      let _this = this;
      let $flowchart = $("#droppable");
      var flowchartData = $flowchart.flowchart('getData');
        let url = config.VALIDATE + VALDATE_PROCESS_DEFINITION //'http://192.168.1.101:8016/add_ide_data';
        let ideInputData = getProcessData(_this, flowchartData);
        postToServer(this, url, ideInputData).then(response=>{
          if(response.status == "SUCCESS"){

            _this.processArray.map((validObj, validIndex)=>{
              $flowchart.flowchart('removeClassOperator', validObj.id, 'stepError');
            });  
            _this.$toaster.info('Data validated successfully') 
          }else if(response.result && response.result.length){
            _this.logs = response.result;
            let validatedData = _this.processArray;
            // debugger;
            response.result.map((step, stepIndex)=>{
            $flowchart.flowchart('addClassOperator', step.step_id, 'stepError');
                validatedData = filter(validatedData, function(obj){
                  if(obj.id != step.step_id){
                   return obj; 
                  }
                });
            });
            validatedData.map((validObj, validIndex)=>{
              $flowchart.flowchart('removeClassOperator', validObj.id, 'stepError');
            });
            _this.bottomSheet = true;
          }
        },response => {
          // if(response.message){
          //   _this.$toaster.error(response.message);
          // }
          // else
          //  _this.$toaster.error('There is some internal error please try again later.')
        }).catch(e => {
              console.log(e)
            _this.$toaster.error('Something went wrong...')
      })    
    },
    saveProcessData(){
      let _this = this;
      let $flowchart = $("#droppable");
      var flowchartData = $flowchart.flowchart('getData');
        let url = config.IDE_API_URL + ADD_IDE_DATA //'http://192.168.1.101:8016/add_ide_data';
        let ideInputData = getProcessData(_this, flowchartData);
        postToServer(this, url, ideInputData).then(response=>{  
          _this.$toaster.success('Data save successfully') 
        },response => {
          // if(response && response.message)
          // _this.$toaster.error(response.message);
          // else
          //  _this.$toaster.error('There is some internal error please try again later.')
        }).catch(e => {
              console.log(e)
            _this.$toaster.error('Something went wrong...')
      })    
    },
    getStepDetails(){ // take step name and description from user
      let _this = this;
      _this.addTitle = true;
    },
    submitStep(){
      let _this = this;
       if (this.$refs.form.validate()) {
         _this.addTitle = false;
         let url = config.IDE_API_URL + IDE_STEP_DATA;
         let stepType = "";
         if(_this.type == "db"){
           stepType = 'select'
         }else if(_this.type == "archive"){
           stepType = 'archival'
         }else if(_this.type == "merge"){
           stepType = 'merge'
         }else if(_this.type == "minus"){
           stepType = 'minus'
         }else if(_this.type == "spstep"){
           stepType = 'stored_procedure'
         }else{
           return ;
         }
         let inputJson = {
           process_definition_id : _this.process_definition_id,
           name:_this.stepName,
           description:_this.stepDetail,
           type:stepType
         }
         postToServer(this, url, inputJson).then(response=>{
            _this.set_process_definition_id(response.process_definition_id);
             tableData.title = cloneDeep(_this.stepName); 
             tableData.description = cloneDeep(_this.stepDetail);
             tableData.type = _this.type;
             tableData.stepId = response.id+"";
             _this.$store.state.archivalStep[response.id]=cloneDeep(tableData);
             _this.oneInOneOutOperator(_this.leftPosition, _this.topPosition, _this.type, response.id)
          //  if(response.process_definition_id)           
         },response=>{
           if(response && response.error && response.error.message)
            _this.$toaster.error(response.error.message);
         });
       }
    },
    clearStep(){
       this.$refs.form.reset()
    },
    onCtxOpen(locals) {
        console.log('open', locals)
      },

      onCtxClose(locals) {
        console.log('close', locals)
      },

      resetCtxLocals() {
        return;
      },

      logClick(e,context) {
        
        return true
      },
      sayColor(color) {
        window.alert('left click on ' + color)
      },
      getProcedureList(){
          let _this = this;
          _this.enable_loadProcedureList(_this.currentStep);
          let url = config.AGENT_API_URL + GET_STORED_PROCEDURE_LIST;
          let inputJson = {
              "procedure_name": "",
              "procedure_count": _this.userInfo.table_count,
              "env_id": _this.userInfo.env_id?_this.userInfo.env_id:_this.env_id,
              "database_name":_this.database_name,
              "database_type":_this.database_type,
              "schema":_this.schema,
              "connstr":_this.conn_str,
              "client_id":_this.userInfo.client_id
          };
          postToServer(this, url, inputJson).then(listResponse => {
            if(_this.$store.state.archivalStep[_this.currentStep])
                _this.disable_loadProcedureList(_this.currentStep);
                this.loading = false;
              _this.set_database_name(listResponse.database_name);
              _this.set_database_type(listResponse.database_type);
              _this.set_schema(listResponse.schema);
              _this.set_conn_str(listResponse.connstr);
              _this.$store.state.archivalStep[_this.currentStep].storedProcedure.procedureList = listResponse.result;
          },listResponse => {
                _this.disable_loadProcedureList(_this.currentStep);
            // if(listResponse && listResponse.message)
            //     _this.$toaster.error(listResponse.message);
            // else    
            //  _this.$toaster.error('Due to some internal error , Procedure List not found');
          });
      },
      gettables(){
        let _this = this;
        let url = config.AGENT_API_URL + GET_TABLES;//'http://192.168.1.100:8010/get_tables';
        if(_this.$store.state.archivalStep[_this.currentStep])
        _this.$store.state.archivalStep[_this.currentStep].loadTable=true;
        let inputJson = {
                "table_name": "",
                "table_count":_this.userInfo.table_count,
                "env_id":_this.userInfo.env_id,
                "client_id":_this.userInfo.client_id
        }
        postToServer(this, url, inputJson).then(response=>{
          _this.$store.state.archivalStep[_this.currentStep].loadTable=false;
          if(response && response.table_name_list){
              let allDbTables = response;//JSON.parse(response.bodyText);
              _this.set_schema(allDbTables.schema);
              _this.set_conn_str(allDbTables.conn_str);
              _this.$store.state.archivalStep[_this.currentStep].allArchiveTables=[];
              _this.$store.state.archivalStep[_this.currentStep].allDbTables=[];             
              allDbTables.table_name_list.map(function(obj, index){
                let temp = {'name':obj, 'stepId':'Database Table'};
                _this.$store.state.archivalStep[_this.currentStep].allArchiveTables.push(cloneDeep(temp));
                _this.$store.state.archivalStep[_this.currentStep].allDbTables.push(cloneDeep(temp));             
              });
          }
          // console.log("Response from all tables"+JSON.stringify(response));
        },response => {
          _this.$store.state.archivalStep[_this.currentStep].loadTable=false;
        }).catch(e => {
          console.log(e)
            this.ErrorMessage = 'Something went wrong.'
          })
    },
     add: function() {
      this.list.push({
        name: 'Juan'
      });
    },
    replace: function() {
      this.list = [{
        name: 'Edgard'
      }]
    },
    getIDEData() {
      var data = $('#droppable').flowchart('getData');
      // console.log(JSON.stringify(data));
    },
    closeRightPael() {
      console.log("this is log on 453");
      $(".sb-slidebar").removeClass("toggleshow")
    },
    minimapImage() {
      var data = {};
      var node = document.getElementById("createScroll");
      data.overflow = "auto";
      data.width = node.offsetWidth;
      data.height = node.offsetHeight;
      var height = node.scrollHeight;
      var width = node.scrollWidth;
      html2canvas(node, {
        onpreloaded: function () {
          node.style.overflow = "visible";
          node.style.height = height + 'px';
          node.style.width = width + 'px';
        },
        onrendered: function (canvas) {
          node.style.overflow = data.overflow;
          node.style.height = data.height + 'px';
          node.style.width = data.width + 'px';
          canvas.backgroundColor = "red";
          node.className = data
          var img = Canvas2Image.convertToImage(canvas, 198, 161);
          document.getElementsByClassName("minimap-node")[0].style.backgroundImage = "url(" + img.src + ")";
        }
      });
    },
    deletTable() {
      this.deleteOperator()
      this.closeRightPael()
      this.blockData = {
        top: 0,
        left: 0,
        properties: {
          title: "",
          inputs: {},
          outputs: {}
        }
      }
      this.operatorId = ''
    },
    operatorClick() {
      this.saveBlockData();
    },
    saveBlockData() {
      // console.log(this.blockData);
      var blockId = localStorage.getItem("operatorId")
      this.setOperatorData(this.operatorId)
    },
    addInputs() {
      var _this = this
      var noOfItems = Object.keys(this.blockData.properties.inputs).length + 1;
      this.blockData.properties.inputs["input_" + noOfItems] = {
        "label": "Input"
      }
      this.setOperatorData(this.operatorId)
    },
    removeInput(index) {
      // console.log(index);
      delete this.blockData.properties.inputs[index];
      this.saveBlockData()
    },
    addOutputs() {
      var noOfItems = Object.keys(this.blockData.properties.outputs).length + 1;
      this.blockData.properties.outputs["output_" + noOfItems] = {
        "label": "Output"
      }
      this.setOperatorData(this.operatorId)
    },
    removeOutput(index) {
      delete this.blockData.properties.outputs[index];
      this.saveBlockData()
    },
    addWhere() {},
    removeWhere() {},
    addOr() {},
    removeOr() {},
    getTableColumns() {
      //make dynamic call to api and get the table columns
      this.tableColumns = [{
        column: "column1",
        type: "integer"
      }, {
        column: "column2",
        type: "string"
      }, {
        column: "column3",
        type: "date"
      }, {
        column: "column4",
        type: "datetime"
      }]
    },
    getData() {
      var ideData = getData()
      // console.log(ideData);
    },//

    // oneInZeroOutOperator(left, top, className) {
    //   var _this = this
    //   var operatorId = 'created_' + className + '_operator_' + this.operatorI;
    
    //   var operatorData = _def.methods.oneInZeroOutOperator(this.operatorI, className, top, left);
    //   this.operatorI += 1;
    //   $('#droppable').flowchart('createOperator', operatorId, operatorData);
    //   _this.$store.state.archivalStep[operatorId]='';
    //   this.dataStr.workflow[operatorId] = {};
    //   var data = $('#droppable').flowchart('getData')
    //   this.dataStr.dbData = JSON.parse(JSON.stringify(data))
    //   this.dbData = JSON.parse(JSON.stringify(data))
    //   // console.log(JSON.stringify(this.dataStr.dbData));
    // },
    oneInOneOutOperator(left, top, className, operatorId) {
      var _this = this;
      // var operatorId = 'created_' + className + '_operator_' + _this.operatorI;
      var operatorData = _def.methods.oneInOneOutOperator(_this.stepName, _this.operatorI, className, top, left);
      this.operatorI += 1;
      $('#droppable').flowchart('createOperator', operatorId, operatorData);
      _this.$refs.form.reset();
      _this.dataStr.workflow[operatorId] = {};
      var data = $('#droppable').flowchart('getData')
      _this.dataStr.dbData = JSON.parse(JSON.stringify(data))
      _this.dbData = JSON.parse(JSON.stringify(data))
    },
    // oneInTwoOutOperator(left, top, className) {
    //   let _this = this;
    //   var operatorId = 'created_' + className + '_operator_' + this.operatorI;
    //   var operatorData = _def.methods.oneInTwoOutOperator(this.operatorI, className, top, left);
    //   this.operatorI += 1;
    //   $('#droppable').flowchart('createOperator', operatorId, operatorData);
    //   _this.$store.state.archivalStep[operatorId]='';
    //   this.dataStr.workflow[operatorId] = {};
    //   var data = $('#droppable').flowchart('getData');
    //   this.dataStr.dbData = JSON.parse(JSON.stringify(data));
    // },
    // twoInOneOutOperator(left, top, className) {
    //   let _this = this;
    //   var operatorId = 'created_' + className + '_operator_' + this.operatorI;
    //   var operatorData = _def.methods.twoInOneOutOperator(this.operatorI, className, top, left);
    //   this.operatorI += 1;
    //   $('#droppable').flowchart('createOperator', operatorId, operatorData);
    //   _this.$store.state.archivalStep[operatorId]='';
    //   this.dataStr.workflow[operatorId] = {};
    //   var data = $('#droppable').flowchart('getData');
    //   this.dataStr.dbData = JSON.parse(JSON.stringify(data));
    //   this.dbData = JSON.parse(JSON.stringify(data));
    // },
    // twoInTwoOutOperator(left, top, className) {
    //   let _this = this;
    //   var operatorId = 'created_' + className + '_operator_' + this.operatorI;
    //   var operatorData = _def.methods.twoInTwoOutOperator(this.operatorI, className, top, left);
    //   this.operatorI += 1;
    //   $('#droppable').flowchart('createOperator', operatorId, operatorData);
    //   _this.$store.state.archivalStep[operatorId]='';
    //   var data = $('#droppable').flowchart('getData')
    //   this.dataStr.workflow[operatorId] = {};
    //   this.dataStr.dbData = JSON.parse(JSON.stringify(data));
    //   this.dbData = JSON.parse(JSON.stringify(data));
    // },
    addTableOperator(left, top, className) {
      var _this = this
      var operatorId = 'created_table_operator_' + this.operatorI;
      var operatorData = {
        new: true,
        className: className,
        top: top,
        left: left,
        properties: {
          title: 'Table ' + (this.operatorI + 3),
          inputs: {
            input_1: {
              label: 'Input 1',
            }
          },
          outputs: {
            output_1: {
              label: 'Output 1',
            }
          }
        }
      };
      this.operatorI += 1;
      $('#droppable').flowchart('createOperator', operatorId, operatorData);
      var data = $('#droppable').flowchart('getData')
      this.dataStr.workflow[this.dbOperatorId] = JSON.parse(JSON.stringify(data))
      this.worflowData[this.dbOperatorId] = JSON.parse(JSON.stringify(data))
    },
    getOperatorData(operatorId) {
      this.blockData = $('#droppable').flowchart('getOperatorData', operatorId);
    },
    setOperatorData(operatorId) {
      $('#droppable').flowchart('setOperatorData', operatorId, this.blockData);
      this.getOperatorData(operatorId)
    },
    deleteOperator() {
      $('#droppable').flowchart('deleteSelected');
    },
    setData() {
      $('#droppable').flowchart('setData', {});
    },
    getSPData() {
      this.SPData = []
    },
    saveModalForm(formData, modal) {
      if (this.dragType == 'table') {
      } else {
      }
      var IDEData = $('#droppable').flowchart('getData');
      console.log(JSON.stringify(IDEData));
      IDEData.operators[this.operatorId]["data"] = formData
      setTimeout(function () {
        $('#droppable').flowchart('setData', IDEData);
      }.bind(this), 10)
      $("#" + modal).modal('hide')
    },
    loadDb() {
      var data = {}
      var _this = this
      this.dragType = 'db'
      setTimeout(function () {
        $('#droppable').flowchart('setData', _this.dataStr.dbData);
      }.bind(this), 200)
    },
    loadData(data) {
      var _this = this
      $('#droppable').flowchart({
        data: data,
        
        onOperatorDoubleClick: function (operatorId) {
          var operator = $('#droppable').flowchart('getOperatorData', operatorId);
          // console.log(operator);
          var type = operator.className
          var op = _this.operatorOptions[type]
          _this.operatorId = operatorId;
          _this.setCurrentStep(operatorId);
           if(operator.className == 'db'){
              _this.gettables();
            _this.set_dialog(true);
           }
           else if(operator.className == 'archive'){
             _this.gettables();
            //  _this.$store.state.openArchivePanel = true;
            _this.set_openArchivePanel(true);
           }else if(operator.className == 'merge' || operator.className == 'minus'){
             _this.gettables();
            //  _this.$store.state.openMergePanel = true;
            _this.set_openMergePanel(true);
           }else if(operator.className == 'spstep'){
             _this.getProcedureList();
            //  _this.$store.state.openStoredProcedure = true;
            _this.set_openStoredProcedure(true);
           } 
          return true;
        },
        onOperatorCreate: function (operatorId, operatorData, fullElement) {
          return true;
        },
        onLinkCreate: (linkId, linkData) => {
          // console.log(linkData);
          var fromOperatorData = $('#droppable').flowchart('getOperatorData', linkData.fromOperator);
          var toOperatorData = $('#droppable').flowchart('getOperatorData', linkData.toOperator);
          linkData.fromTable = fromOperatorData.properties.title
          linkData.toTable = toOperatorData.properties.title
          setTimeout(function () {
            var data = $('#droppable').flowchart('getData')
            // console.log(JSON.stringify(data));
            if (_this.dragType == 'db') {
              _this.dataStr.dbData = JSON.parse(JSON.stringify(data))
            } else {
              _this.dataStr.workflow[_this.dbOperatorId] = JSON.parse(JSON.stringify(data))
            }
          }, 10)
          return true;
        },
        onOperatorDelete: function (operatorId) {
          return true;
        }
      });
    },
    clauseModal(type) {
      this.clauseType = type;
      $("#clauseModal").modal()
    },
    remove(key) {
      let confirmFn = function () {
        this.$parent.dataStr.workflow.splice(key, 1)
        // this.$parent.deleteCollection(id)
      }
      let obj = {
        title: 'Delete',
        message: 'Are you sure want to delete this?',
        type: 'info',
        useConfirmBtn: true,
        onConfirm: confirmFn
      }
      this.$refs.simplert.openSimplert(obj)
    },

    openModal(data) {
      $('#myModal').modal();
    },

    findByStep: (step) => {
      this.users.find((usr) => {
        return usr.token === token
      });
    }
  },
}

</script>

<style lang="css">
.stepError{
border-color: red !important;
};
.draggable {
  width: 80px;
  height: 100px;
  margin: 10px 5px 0 1px;
  float: left;
  cursor: move
}

.createScroll {
  overflow: scroll;
  height: 450px;
  width: 1000px;
}

#droppable {
  height: 1000px;
  width: 1986px;
  overflow: auto
}

.togglehide {
  display: none;
  z-index: -1
}

.toggleshow {
  display: block;
  z-index: 9
}

.block {
  background-color: #000
}

.custom-modal-dialog {
  width: 90%;
  margin: auto;
  padding: 0;
}

.modal-content {
  height: auto;
  /*min-height: 100%;*/
  border-radius: 0;
}

body {
  /* overflow: hidden; */
}

#minimap {
  position: fixed;
  width: 200px;
  height: 155px;
  top: 6px;
  right: 24px;
  background-color: #EEE;
  border: 1px solid #AAA;
  opacity: 0.9;
  z-index: 201;
}

.minimap-node {
  position: absolute;
  background-color: white;
  background-image: url("../../static/images/background.jpg");
}

.minimap-viewport {
  position: absolute;
  box-sizing: border-box;
  z-index: 1;
  cursor: move;
}

.imageCss {
  width: 1000px !important;
  height: 1000px !important;
  background-color: white;
  overflow: visible;
}

.rt-45 {
  /* transform: rotateZ(-45deg); */
  margin-left: 20%;
  margin-top: 25%;
}

.tp-14 {
  position: fixed;
  top: 14px;
  right: 35px;
  cursor: pointer;
  z-index: 201;
  background: white;
  width: 25px;
  height: 25px;
  border-radius: 5px;
  box-shadow: 2px 2px 2px;
}

/* ****************** Rotate minimap icon ****************/

.fa-arrow-down {
  transform: rotate(225deg);
  transition: transform .25s linear;
}

.fa-arrow-open {
  transform: rotate(-45deg);
  transition: transform .25s linear;
}

.navigation-drawer--open {
  background: white;
  box-shadow: 0px 0px 7px 0px;
  /* z-index:
2 */
}

.navigation-drawer:not(.navigation-drawer--is-booted) {
  z-index: 2
}

.content {
  height: 100%;
  background: white
}

.content--wrap {
  height: 100%;
}
  .flowchart-operator-inputs-outputs{
    height: 60px;
} 
.srch-def-text{
  border-bottom: 01px solid cadetblue;
  width: 97%;
  /* height: 100%; */
  height: 30px;
  margin-bottom: 10px;
  margin-left: 3%
}
.srch-def-icon{
    position: absolute;
    top: 2%;
    right: 3%;
    cursor: pointer;
}
/*
sql designer
 */
 @import "/static/flowchart/css/jquery.flowchart.min.css";
 @import "/static/flowchart/css/custom.css";
 /* @import "/static/minimap/minimap.css"; */
 /*@import "/static/sqldesigner/styles/print.css";*/
</style>
