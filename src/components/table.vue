<template lang="html">
  <div class="">
    <v-layout row justify-center>
      <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay="false" scrollable>
        <v-card tile style="height:650px">
          <!-- ******************************Start ************************************* -->
          <v-toolbar card dark color="primary" app :clipped-left="$vuetify.breakpoint.mdAndUp" fixed>
            <v-spacer></v-spacer>
            <v-toolbar-title >Close</v-toolbar-title>
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
                    <ul>
                      <li @click.stop="nextScreen(1)" :class="{chevron:true,chevron_active:progressbar == 1}">Table Relationship</li>
                      <li @click.stop="nextScreen(2)" :class="{chevron:true,chevron_active:progressbar == 2}">Criteria</li>
                      <li @click.stop="nextScreen(3)" :class="{chevron:true,chevron_active:progressbar == 3}">Worktable Output</li>
                    </ul>
                    <v-layout row wrap>
                      <v-flex xs6>
                        <v-select :items="selectTable" v-model="tableObj.relationship.selectedTable" :loading="loading" 
                          :search-input.sync="search" cache-items label="Select Table" autocomplete></v-select>
                        <v-btn color="info" @click.native="addTable">Add</v-btn>
                      </v-flex>
                      <v-flex xs6> 
                            <div class="panel panel-success" v-show="tableObj.relationship.selectedTableArray.length">
                              <div class="panel-heading">Selected Table</div>
                              <div class="panel-body">
                                <v-layout row wrap>
                                  <v-flex style="margin-right:5px;" v-for="object in tableObj.relationship.selectedTableArray">
                                    <span style="cursor:pointer" class="badge" @click.stop="dialog2=true">{{object.tableName}}</span>
                                  </v-flex>
                                </v-layout>
                              </div>
                            </div> 
                      </v-flex>  
                    </v-layout>
                    <v-layout row wrap v-show="tableObj.relationshipArray.length">
                      <v-flex><b>From Table</b></v-flex>
                      <v-flex><b>Join</b></v-flex>
                      <v-flex><b>To Table</b></v-flex>
                    </v-layout>
                    <v-expansion-panel expand>
                      <v-expansion-panel-content v-for="(item,i) in tableObj.relationshipArray" :key="i">
                        <div slot="header">
                          <v-layout row wrap>
                            <v-flex>{{item.relationship.fromTable.tableName}}</v-flex>
                            <v-flex>{{item.relationship.selectedFilter}}</v-flex>
                            <v-flex>{{item.relationship.toTable.tableName}}</v-flex>
                          </v-layout>
                        </div>
                        <v-card>
                          <v-card-text class="grey lighten-3">
                          <v-layout row wrap >
                            <v-flex><b>From Column</b></v-flex>
                            <v-flex><b>Operator</b></v-flex>
                            <v-flex><b>To Column</b></v-flex>
                          </v-layout>
                          <v-layout row wrap v-for="column in item.colArray">
                            <v-flex>{{column.fromColumn.name}}</v-flex>
                            <v-flex>{{column.operator}}</v-flex>
                            <v-flex>{{column.toColumn.name}}</v-flex>
                          </v-layout>
                          </v-card-text>
                        </v-card>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-layout justify-end>
                              <v-btn class="next" @click.stop="nextScreen(2)" color="info">Next</v-btn>
                    </v-layout> 
                  </div>
                   <div class="form-views" v-show="progressbar == 2" style="width:100%;margin-left:3%;height:500px">
                     
                     <add-criteria @update-object='updateTableObj' :tableObj="tableObj"></add-criteria>
                     
                   </div>
                   <div class="form-views" v-show="progressbar == 3" style="width:100%;margin-left:3%;height:500px">
                      
                     <work-table-output @update-step='saveDialog' @update-object='updateTableObj' :tableObj="tableObj"></work-table-output>

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
     <v-dialog v-model="dialog2" max-width="40%" max-height="50%">

       <!-- ********** tableObj is used to pass data(props) to table-joins vue &
          save-data is used to emit data from table-joins vue ************* -->

        <table-joins @save-data="saveData" :tableObj="tableObj" v-on:close="dialog2=false" ></table-joins>
     
     </v-dialog>
  </div>
</template>
<script>
import _def from './various/defnitions'
import draggable from 'vuedraggable'
import cloneDeep from 'lodash/cloneDeep';
import sortBy from 'lodash/sortBy';
import tableData from './data/table-selection';
import tableJoins from './tableJoins.vue'
import criteria from './criteria.vue'
import workTableOutput from './workTableOutput.vue';
const message = [ 'vue.draggable', 'draggable', 'component', 'for', 'vue.js 2.0', 'based' , 'on', 'Sortablejs' ]
export default {
  components: {
           
            'table-joins':tableJoins,
            'add-criteria':criteria,
            'work-table-output':workTableOutput,
  },
  data() {
    return {
      drawer: null,
      dataStr: _def.dataStr,
      joinOption:["AND","OR"],
      columnArray:["OrderNumber","OrderType","OrderDetail","LineNumber"],
      dialog2:false,
      dialog3:false,
      selectedColumns:[],
      editable:true,
      delayedDragging:false,
      e1:"",
      colObj:{"fromColumn":'','toColumn':'','operator':''},      
      progressbar:1,
      loading: false,
      search: null,
      relOperatorArray:["==","<",">", "<=",">=","!="],
      tableObj:cloneDeep(tableData)   
    }
  },
  computed: {
    selectTable(){
      return this.$store.state.allDbTables;
    },
    dialog() {
      return this.$store.state.dialog
    },
    items(){
      return this.tableObj.relationshipArray
    },
    total: function () {
      return this.value.interval ? (this.value.interval * this.value.multiplier).toFixed(2) : 0
    },
    
    listString(){
      return JSON.stringify(this.tableObj.optionColumn, null, 2);  
    },
    selectedColumnsString(){
      return JSON.stringify(this.tableObj.selectedColumns, null, 2);  
    }
  },
   watch: {
     dialog (newValue){
       if(newValue){
          this.tableObj =cloneDeep(this.$store.state.archivalStep[this.$store.state.currentStep]);
       }
     },
     isDragging (newValue) {
      if (newValue){
        this.delayedDragging= true
        return
      }
      this.$nextTick( () =>{
           this.delayedDragging =false
      })
    },
    search (val) {
        val && this.querySelections(val)
    }
  },
  props: {
    source: String
  },
  methods: {
    updateTableObj(arr){
      let _this = this;
      _this.tableObj = arr[0];
      this.progressbar = arr[1];
    },
    saveData(obj){
      let _this = this;
      _this.tableObj = obj;
      _this.dialog2 = false; 
    },
    addTable(){
      let validFlag=true;
      let _this = this;
      console.log("Demo "+JSON.stringify(_this.demo));
      _this.tableObj.relationship.selectedTableArray.map(function(obj, index){
        if(obj.tableName == _this.tableObj.relationship.selectedTable){
          validFlag = false;
          _this.$toaster.error('Table Already Exist')
        }
      });
      if(validFlag){
        let obj = {'tableName':cloneDeep(_this.tableObj.relationship.selectedTable),
                   'aliesTableName':cloneDeep(_this.tableObj.relationship.selectedTable + _this.$store.state.aliesCounter++)}
        _this.tableObj.relationship.selectedTableArray.push(cloneDeep(obj));
         _this.getColumn(obj);
         _this.$toaster.success('Table Added Successfully') 
      }
    },
    getColumn(tableObject){
      let _this = this;
      let url = 'http://192.168.1.100:8010/get_all_columns';
      let inputJson = {
               "conn_str": "mssql://archivist:archivist@192.168.1.143:1433/demoAgent?driver=ODBC Driver 17 for SQL Server&; odbc_options='TDS_Version=7.2'",
               "dest_queue": "test",
               "table_name": tableObject.tableName
      }
      _this.$http.post(url, inputJson, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => {
          if(_this.tableObj.optionColumn.length){
            _this.tableObj.optionColumn.push({ divider: true });
          }
          let headerObj = { header: tableObject.tableName};
          _this.tableObj.optionColumn.push(cloneDeep(headerObj));
          let allColumn = JSON.parse(response.bodyText);
          allColumn.map(function(obj, index){
             let columnObj = { name: obj, group: tableObject.tableName, fixed: false, 
                               tblAlies:tableObject.aliesTableName, colAlies: obj+_this.$store.state.aliesCounter++};
            _this.tableObj.optionColumn.push(cloneDeep(columnObj));
          });
          console.log("Response from all tables"+JSON.stringify(response));
        },response => {}).catch(e => {
              console.log(e)
            this.ErrorMessage = 'Something went wrong.'
      })
    },
    querySelections (value) {
      if(value.length %3 !== 0){
        return 
      }
        this.loading = true;
        let _this = this;
        let url = 'http://192.168.1.100:8010/get_tables';
        let inputJson = {
               "conn_str": "mssql://archivist:archivist@192.168.1.143:1433/demoAgent?driver=ODBC Driver 17 for SQL Server&; odbc_options='TDS_Version=7.2'",
               "dest_queue": "test",
               "table_name": value
      }
      this.$http.post(url, inputJson, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => {
          _this.$store.state.allDbTables = JSON.parse(response.bodyText);
          this.loading = false;
          console.log("Response from all tables"+JSON.stringify(response));
        },response => {}).catch(e => {
          console.log(e)
          this.loading = false;
          this.ErrorMessage = 'Something went wrong.'
          })
      },
    previousScreen(number){
      this.progressbar = number;
    },
    nextScreen(number){
      this.progressbar = number;
    },
    deleteRowIndex(object){
      this.$store.state.dataSelectionIndex=object.index;
      this.dialog3 = true;
    },
    deleteRow(){
      this.$store.state.dataSelectionArray.splice(this.$store.state.dataSelectionIndex,1);
      this.dialog3 = false;
    },
    setData(){
      let index=this.$store.state.dataSelectionIndex;
      this.$store.state.dataSelectionIndex = null;
      let tempObj = this.$store.state.dataSelectionArray[index];
      this.relationship.selectedTable = tempObj.selectedTable.split(",");
      this.relationship.selectedColumn = tempObj.selectedColumn.split(",");
      this.relationship.selectedFilter = [tempObj.selectedFilter];
      this.relationship.join = tempObj.join?[tempObj.join]:null;
    },
    closeDialog() {
      this.$store.state.dialog = false
    },
    getSelectionData(){
      let _this = this;
      let dbStepInput =  cloneDeep(_this.$store.state.dbStepObject);
      console.log("relationshipArray" +JSON.stringify(_this.tableObj.relationshipArray));
      let workTablecolumns=[];
      dbStepInput.distinct=_this.tableObj.distinct;
      dbStepInput.output_table = 'table_1';//_this.tableObj.relationship.selectedTableArray[0].tableName;
      dbStepInput.select_table.name = _this.tableObj.relationship.selectedTableArray[0].tableName;
      dbStepInput.select_table.alias = _this.tableObj.relationship.selectedTableArray[0].aliesTableName;
      if(_this.tableObj.selectAllColumn){
        dbStepInput.select_table.cols.push({
                'table_alias': 'cu',
                'col_alias': '',
                'col_name': '_*_',
                'func': '' //for now by default it will be blank
        });   
      }else{
        _this.tableObj.selectedColumns.map(function(obj, index){
        let tempObj = {
                  'table_alias': obj.tblAlies,
                  'col_alias': obj.colAlies,
                  'col_name': obj.name,
                  'func': '' //for now by default it will be blank
              }
        dbStepInput.select_table.cols.push(cloneDeep(tempObj));     
        });
      }
      let joinObject = { //Table Relationship
            'jfrom': '', //from table
            'jto': '', //to table
            'jfromalias': 't1', // alies name of from table
            'jtoalias': 'gc', //alies name to table
            'type': 'INNER JOIN',
            'condition': [] // will push condition object here
        }
      let conditionObject = {
                'from_column': '', //from column
                'to_column': '', //to column alies
                'from_alias': '', //from column alies
                'to_alias': '', //to column
                'operator': ''
            }
       _this.tableObj.relationshipArray.map(function(obj, index){
         joinObject.jfrom = obj.relationship.fromTable.tableName;
         joinObject.jto = obj.relationship.toTable.tableName;
         joinObject.jfromalias = obj.relationship.fromTable.aliesTableName;
         joinObject.jtoalias = obj.relationship.toTable.aliesTableName;
         joinObject.type = obj.relationship.selectedFilter;
         joinObject.condition=[];
         obj.colArray.map(function(colObj, colIndex){
           conditionObject.from_column = colObj.fromColumn.name;
           conditionObject.to_column = colObj.toColumn.name;
           conditionObject.from_alias = colObj.fromColumn.tblAlies;
           conditionObject.to_alias = colObj.toColumn.tblAlies;
           conditionObject.operator =  _this.getjoinOperator(colObj.operator);
           joinObject.condition.push(cloneDeep(conditionObject));
         });
         dbStepInput.joins.push(cloneDeep(joinObject));
       });
       _this.tableObj.criteriaArray.map(function(obj, index){
         let CriteriaObject = { 
            'alias': obj.column.tblAlies, //table alies
            'column_name': obj.column.name, //column alies
            'operator':  _this.getjoinOperator(obj.relOperator), //relational operator
            'value': obj.value, //may be value date or column
            'operand': obj.logOperator ? 'AND':'OR',
            'pre_braces': obj.openbrsis,
            'post_braces': obj.closebrsis,
            'is_col_compare':obj.valueType == 'field' ? true : false,
            'with_alias':obj.field.colAlies,
            'with_col':obj.field.name
        }
        dbStepInput.where.push(cloneDeep(CriteriaObject));
       });  
       dbStepInput.where[dbStepInput.where.length-1].operand = '';
       dbStepInput.name=_this.tableObj.title;
       dbStepInput.desc=_this.tableObj.description;  
       return dbStepInput;
    },
    getjoinOperator(sign){
      let operatorArray = { EQUALS_TO : '_eq_',
                            NOT_EQUALS_TO : '_not_eq_',
                            LESS_THAN : '_lt_',
                            GREATER_THAN : '_gt_',
                            LESS_THAN_EQUALS_TO : '_lt_eq_',
                            GREATER_THAN_EQUALS_TO : '_gt_eq_',
                            IS_NULL : '_is_n_',
                            IS_NOT_NULL : '_is_nt_n_',
                            LIKE_STARTS_WITH : '_sl_',
                            LIKE_ENDS_WITH : '_el_',
                            LIKE_CONTAINS_WITH : '_cl_',
                            BETWEEN : '_bet_',
                            IN : '_in_'};
       return operatorArray[sign];
    },
    saveDialog(objData) {
      let _this = this;
      _this.tableObj = objData; 
      let inputParam = this.getSelectionData();
      // let inputParam = _this.$store.state.dbStepObject;
      console.log("inputParam"+JSON.stringify(inputParam));
      let url = 'http://192.168.1.101:8016/ide_step_data/add';
       _this.$http.post(url, inputParam, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => {
          _this.tableObj.stepId = response.body.id;
          _this.$store.state.archivalStep[_this.$store.state.currentStep] = cloneDeep(_this.tableObj);
          _this.$store.state.processArray.push(cloneDeep(inputParam));
          console.log("Response from all tables"+JSON.stringify(response));
          _this.$toaster.success('Data save successfully') 
        },response => {
           _this.$toaster.error('There is some internal error please try again later.')
        }).catch(e => {
              console.log(e)
            this.ErrorMessage = 'Something went wrong.'
      }) 
      this.$store.state.dialog = false
    }
  },

  mounted() {
    var _this = this;
  }
}
</script>
<style scoped>
.content{
      height: 626px;
      overflow: auto
}
.btm-20{
  margin-bottom: 20px;
}
.updt-css{
  font-size:20px;color:red;cursor:pointer;
}
.datatable td{
  vertical-align: inherit
}
.next{
    position: absolute;
    top: 537px;
}
.form-views.ng-hide-remove {
    -webkit-animation: slideOutLeft 0.5s both ease;
    -moz-animation: slideOutLeft 0.5s both ease;
    animation: slideOutLeft 0.5s both ease;
}
    @keyframes slideOutLeft {
        to {
            transform: translateX(-200%);
        }
    }
    
    @-moz-keyframes slideOutLeft {
        to {
            -moz-transform: translateX(-200%);
        }
    }
    
    @-webkit-keyframes slideOutLeft {
        to {
            -webkit-transform: translateX(-200%);
        }
    }
    /* slide in from the right */
    
    @keyframes slideInRight {
        from {
            transform: translateX(200%);
        }
        to {
            transform: translateX(0);
        }
    }
    
    @-moz-keyframes slideInRight {
        from {
            -moz-transform: translateX(200%);
        }
        to {
            -moz-transform: translateX(0);
        }
    }
    
    @-webkit-keyframes slideInRight {
        from {
            -webkit-transform: translateX(200%);
        }
        to {
            -webkit-transform: translateX(0);
        }
    }
      .animate-hide {
        transition: all linear 0.5s;
        line-height: 20px;
        opacity: 1;
        padding: 10px;
        background: white;
    }
    
    .animate-hide.ng-hide {
        line-height: 0;
        opacity: 0;
        padding: 0 10px;
    }
    
    .animate-repeat {
        /*   line-height:30px; */
        list-style: none;
        box-sizing: border-box;
    }
    
    .animate-repeat.ng-move,
    .animate-repeat.ng-enter,
    .animate-repeat.ng-leave {
        transition: all linear 0.5s;
    }
    
    .animate-repeat.ng-leave.ng-leave-active,
    .animate-repeat.ng-move,
    .animate-repeat.ng-enter {
        opacity: 0;
        max-height: 0;
    }
    
    .animate-repeat.ng-leave,
    .animate-repeat.ng-move.ng-move-active,
    .animate-repeat.ng-enter.ng-enter-active {
        opacity: 1;
        /*   max-height:30px; */
    }
    .chevron {
      cursor: pointer;
      text-align: center;
      background: #ccc;
      border:1px solid #fff;
      height: 22px;
      width: 250px;
      display:inline-block;
      margin-left:-65px;
      -webkit-clip-path: polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%);
      clip-path: polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%);
    }

    .chevron_active {
      background:#666;
    }
   
    .ft-30{
      font-size: 30px;
    }
</style>
