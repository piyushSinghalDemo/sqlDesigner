<template lang="html">
  <div class="">
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
                <v-flex d-flex xs12>
                  <div class="form-views" v-show="progressbar == 1" style="width:100%;margin-left:3%;height:500px">

                    <table-relationship @update-object='updateTableObj' @update-join="updateJoin" :tableObj="tableObj"></table-relationship>

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

      <table-joins @save-data="saveData" :tableObj="tableObj" v-on:close="dialog2=false"></table-joins>
    </v-dialog>
  </div>
</template>

<script>
import _def from './various/defnitions'
import cloneDeep from 'lodash/cloneDeep';
import uniq from 'lodash/uniq'
import tableData from './data/table-selection';
import tableJoins from './tableJoins.vue'
import criteria from './criteria.vue'
import workTableOutput from './workTableOutput.vue';
import tableRelationship from './tableRelationship.vue';
import config from '../config.json'
const message = ['vue.draggable', 'draggable', 'component', 'for', 'vue.js 2.0', 'based', 'on', 'Sortablejs']
export default {
  components: {
    'table-joins': tableJoins,
    'add-criteria': criteria,
    'work-table-output': workTableOutput,
    'table-relationship': tableRelationship
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
      userData:''
    }
  },
  computed: {
    dialog() {
      return this.$store.state.dialog
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
    updateJoin() {
      let _this = this;
      _this.dialog2 = true;
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
    // deleteRowIndex(object){
    //   this.$store.state.dataSelectionIndex=object.index;
    //   this.dialog3 = true;
    // },
    closeDialog() {
      this.$store.state.dialog = false
    },
    getSelectionData() {
      let _this = this;
      let dbStepInput = cloneDeep(_this.$store.state.dbStepObject);
      // console.log("relationshipArray" +JSON.stringify(_this.tableObj.relationshipArray));
      let workTablecolumns = [];
      dbStepInput.distinct = _this.tableObj.distinct;
      // dbStepInput.output_table = _this.tableObj.relationship.selectedTableArray[0].tableName;
      dbStepInput.select_table.name = _this.tableObj.relationship.selectedTableArray[0].tableName;
      dbStepInput.select_table.alias = _this.tableObj.relationship.selectedTableArray[0].aliesTableName;
      dbStepInput.select_table.is_drv_table = _this.tableObj.is_drv_table;
      if (_this.tableObj.selectAllColumn) {
        dbStepInput.select_table.cols.push({
          'table_alias': 'cu',
          'col_alias': '',
          'col_name': '_*_',
          'func': '' //for now by default it will be blank
        });
      } else {
        _this.tableObj.selectedColumns.map(function (obj, index) {
          let tempObj = {
            'table_alias': obj.tblAlies,
            'col_alias': obj.colAlies,
            'col_name': obj.name,
            'func': '', //for now by default it will be blank
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
      _this.tableObj.relationshipArray.map(function (obj, index) {
        joinObject.jfrom = obj.relationship.fromTable.tableName;
        joinObject.jto = obj.relationship.toTable.tableName;
        joinObject.jfromalias = obj.relationship.fromTable.aliesTableName;
        joinObject.jtoalias = obj.relationship.toTable.aliesTableName;
        joinObject.type = obj.relationship.selectedFilter;
        joinObject.jto_drv_table = obj.relationship.jto_drv_table;
        joinObject.jfrom_drv_table = obj.relationship.jfrom_drv_table;
        joinObject.condition = [];
        obj.colArray.map(function (colObj, colIndex) {
          conditionObject.from_column = colObj.fromColumn.name;
          conditionObject.to_column = colObj.toColumn.name;
          conditionObject.from_alias = colObj.fromColumn.tblAlies;
          conditionObject.to_alias = colObj.toColumn.tblAlies;
          conditionObject.operator = _this.getjoinOperator(colObj.operator);
          joinObject.condition.push(cloneDeep(conditionObject));
        });
        dbStepInput.joins.push(cloneDeep(joinObject));
      });
      _this.tableObj.criteriaArray.map(function (obj, index) {
        if(obj.relOperator){
          let CriteriaObject = {
          'alias': obj.column.tblAlies, //table alies
          'column_name': obj.column.name, //column alies
          'operator': _this.getjoinOperator(obj.relOperator), //relational operator
          'value': obj.value, //may be value date or column
          'operand': obj.logOperator ? 'AND' : 'OR',
          'pre_braces': obj.openbrsis,
          'post_braces': obj.closebrsis,
          'is_col_compare': obj.valueType == 'field' ? true : false,
          'with_alias': obj.field.colAlies,
          'with_col': obj.field.name
        }
        dbStepInput.where.push(cloneDeep(CriteriaObject));
        }
      });
      dbStepInput.where[dbStepInput.where.length - 1].operand = '';
      dbStepInput.name = _this.tableObj.title;
      dbStepInput.output_table = _this.tableObj.title;
      dbStepInput.desc = _this.tableObj.description;
      dbStepInput.client_id=_this.userData.client_id[0],
      dbStepInput.user_id=_this.userData.user_id[0],
      dbStepInput.id = _this.tableObj.stepId
      return dbStepInput;
    },
    getjoinOperator(sign) {
      let operatorArray = {
        EQUALS_TO: '_eq_',
        NOT_EQUALS_TO: '_not_eq_',
        LESS_THAN: '_lt_',
        GREATER_THAN: '_gt_',
        LESS_THAN_EQUALS_TO: '_lt_eq_',
        GREATER_THAN_EQUALS_TO: '_gt_eq_',
        IS_NULL: '_is_n_',
        IS_NOT_NULL: '_is_nt_n_',
        LIKE_STARTS_WITH: '_sl_',
        LIKE_ENDS_WITH: '_el_',
        LIKE_CONTAINS_WITH: '_cl_',
        BETWEEN: '_bet_',
        IN: '_in_'
      };
      return operatorArray[sign];
    },
    saveDialog(objData) {
      let _this = this;
      _this.tableObj = objData;
      _this.userData = JSON.parse(sessionStorage.getItem("userInfo"));
      let inputParam = this.getSelectionData();
      inputParam.process_definition_id = _this.$store.state.process_definition_id; //To add net step on the same process designer
      let url = config.SAVE_DATA_URL+'ide_step_data/add';//'http://192.168.1.101:8016/ide_step_data/add';
      _this.$http.post(url, inputParam, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization':_this.userData.accessToken[0]
        }
      }).then(response => {
        _this.tableObj.stepId = response.body.id;        
        _this.$store.state.process_definition_id = response.body.process_definition_id;
        _this.tableObj.process_definition_id = response.body.process_definition_id;
        _this.$store.state.archivalStep[_this.$store.state.currentStep] = cloneDeep(_this.tableObj);
        _this.$store.state.processArray.push(cloneDeep(inputParam));
        let $flowchart = $("#droppable");
        var flowchartData = $flowchart.flowchart('getData');
        let objectLength = Object.keys(flowchartData.links).length;
        // for (var i = 0; i < objectLength; i++) {
        //   if (flowchartData.links[i].fromOperator == _this.$store.state.currentStep) {
        //     let obj = {
        //       'name': _this.tableObj.title,
        //       'columns': _this.tableObj.selectedColumns,
        //       'stepId': 'Previous Steps'
        //     }
        //     _this.$store.state.archivalStep[flowchartData.links[i].toOperator].allDbTables.push(cloneDeep(obj));
        //   }
        // }
        // let i = 0,
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
        console.log("archivalStep"+JSON.stringify(_this.$store.state.archivalStep));
        _this.$toaster.success('Data save successfully')
      }, response => {
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
