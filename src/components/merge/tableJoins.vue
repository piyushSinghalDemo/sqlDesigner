<template>
  <v-card>
    <v-card-title>
      Select Data
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-layout row wrap>
          <v-flex style="margin-right:20px;">
            <b>From Table</b>
          </v-flex>
          <v-flex style="margin-right:20px;">
            <b>Join Type</b>
          </v-flex>
          <v-flex style="margin-right:20px;">
            <b>To Table</b>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex style="margin-right:20px;">
            <v-select :items="tableObj.relationship.selectedTableArray" v-model="tableObj.relationship.fromTable" label="From Table"
              single-line item-text="tableName" item-value="tableName" return-object></v-select>
          </v-flex>
          <v-flex style="margin-right:20px;">
            <v-select :items="joinType" v-model="tableObj.relationship.selectedFilter" label="Join Type" single-line></v-select>
          </v-flex>
          <v-flex style="margin-right:20px;">
            <v-select :items="tableObj.relationship.selectedTableArray" v-model="tableObj.relationship.toTable" label="To Table" item-text="tableName"
              item-value="tableName" return-object single-line></v-select>
          </v-flex>
        </v-layout>
        <v-expansion-panel>
          <v-expansion-panel-content>
            <div slot="header">
              Define Joins
            </div>
            <v-card>
              <v-card-text>
                <v-layout row wrap>
                  <v-flex style="margin-right:20px;">
                    <b>From Column</b>
                  </v-flex>
                  <v-flex style="margin-right:20px;">
                    <b>Operator</b>
                  </v-flex>
                  <v-flex style="margin-right:20px;">
                    <v-layout row wrap>
                      <v-flex>
                        <b>To Column</b>
                      </v-flex>
                      <v-flex>
                        <i class="fa fa-plus icn-css" @click.stop="addColumn"></i>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
                <v-layout row wrap v-for="(column, index) in tableObj.colArray" :key="index">
                  <v-flex xs4 style="margin-right:20px;">
                    <!-- *********************************** Group Column ********************************************* -->
                    <v-select label="From Column" :items="tableObj.optionColumn" v-model="column.fromColumn" item-text="name" single-line
                      autocomplete return-object></v-select>
                    <!-- ********************************************************************************************** -->
                  </v-flex>
                  <v-flex xs2 style="margin-right:20px;">
                    <v-select :items="filterArray" v-model="column.operator" label="Operator" single-line></v-select>
                  </v-flex>
                  <v-flex xs4 style="margin-right:20px;">
                    <v-layout>
                      <v-flex>
                        <v-select label="To Column" :items="tableObj.optionColumn" v-model="column.toColumn" item-text="name" single-line
                          autocomplete return-object></v-select>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
          <v-expansion-panel-content>
            <div slot="header">
              Define Criteria
            </div>
            <v-card>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout row wrap v-for="(obj,index) in tableObj.criteriaArray" :key="index">
                    <v-flex xs3>
                      <v-select clearable :items="openbrsisArray" single-line label="Select Parenthisis" v-model="obj.openbrsis"></v-select>
                    </v-flex>
                    <!-- <v-flex xs3>
                      <v-select clearable :items="functionArray" single-line label="Select Function" v-model="obj.function"></v-select>
                    </v-flex> -->
                    <v-flex xs3>
                      <v-select label="Select Column" :items="tableObj.merge.optionColumn" v-model="obj.column" 
                          item-text="name" return-object single-line></v-select>
                    </v-flex>
                    <v-flex xs3>
                      <v-select clearable :items="filterArray" single-line label="Select Operator" v-model="obj.relOperator">
                      </v-select>
                    </v-flex>
                    <v-flex xs3>
                      <v-select clearable :items="valueTypeArray" single-line label="Select ValueType" v-model="obj.valueType">
                      </v-select>
                    </v-flex>
                    <v-flex xs3 v-if="obj.valueType == 'date'">
                      <v-select :items="dateTypeArray" clearable :hint=dateHint @change="setDateHint" label="Select Date Type" v-model="obj.dateType" style="padding-top: 14px;">
                      </v-select>
                    </v-flex>
                    <v-flex xs3 v-if="obj.dateType == 'date' && obj.valueType == 'date'">
                      <v-select :items="['yyyy-mm-dd','mm-dd-yyyy']" clearable 
                        label="Date Format" v-model="obj.formatType" @change="obj.value=''" style="padding-top: 14px;">
                      </v-select>
                    </v-flex>
                    <v-flex xs3>
                      <calender v-if="obj.valueType == 'date' && obj.dateType == 'Database Date'" :input="obj.value" @update="setDate($event,index)" ></calender>

                      <v-select :items="tableObj.merge.optionColumn" single-line label="Select Column" v-else-if="obj.valueType == 'field'" v-model="obj.field"
                        item-text="name" return-object style="padding-top: 14px;"></v-select>

                      <v-text-field name="input-1" v-else single-line label="Label Text" v-model="obj.value" style="padding-top: 14px;"></v-text-field>
                      
                    </v-flex>
                    <v-flex xs3>
                      <v-select clearable :items="closebrsisArray" single-line label="Select Parenthisis" v-model="obj.closebrsis" style="padding-top: 14px;">
                      </v-select>
                    </v-flex>
                    <v-flex xs3>
                      <toggle-button v-show="obj.showLogicalOperator" :width=80 :height=30 :value="obj.logOperator" v-model="obj.logOperator" :labels="{checked: 'AND', unchecked: 'OR'}"
                        style="margin-top:12%" :sync="true" />
                      <div v-show="!obj.showLogicalOperator" style="text-align:center">
                        <i class="fa fa-plus criteria-opr" @click.stop="addCriteria()" aria-hidden="true"></i>
                        <span class="ft-30">|</span>
                        <i class="fa fa-trash criteria-opr" @click.stop="deleteCriteria(index)" aria-hidden="true"></i>
                      </div>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
          <v-expansion-panel-content>
            <div slot="header">
              Define Column
            </div>
            <v-card>
              <v-card-text>
                <v-container grid-list-md>
                  <div class="row clearfix">
                    <div class="col-sm-6">
                      <label style="font-size:20px;cursor:pointer">
                        <input type="checkbox" v-model="tableObj.merge.selectAll" style="vertical-align: baseline;margin-right: 11px;">
                        Select All</label>
                    </div>
                    <div class="col-sm-6">
                      <label style="font-size:20px;cursor:pointer">
                        <input type="checkbox" v-model="tableObj.merge.distinct" style="vertical-align: baseline;margin-right: 11px;">Distinct</label>
                    </div>
                  </div>
                  <!-- *************** Add Column *****************   -->
                  <v-layout row wrap>
                    <v-flex xs6>
                      <v-card>
                        <v-card-text>
                          <v-layout row wrap>
                            <v-flex xs8>
                              <h3 class="panel-title">Available Column</h3>
                            </v-flex>
                            <v-flex xs4>
                              <input type="text" class="srch-text" v-model="SearchTable" placeholder="Search..." />
                              <i class="fa fa-search srch-icon"></i>
                            </v-flex>
                          </v-layout>
                          <!-- availableColumn: {{tableObj.merge}} -->
                          <draggable element="span" v-model="tableObj.merge.optionColumn" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false"
                            @change="updateGroup($event)">
                            <transition-group type="transition" :name="'flip-list'" class="list-group ht-215" tag="ul">
                              <li class="list-group-item" v-if="element.name" v-for="(element, index) in filterBy(tableObj.merge.optionColumn, SearchTable)" :key="index">
                                {{element.group}}.{{element.name}}
                              </li>
                            </transition-group>
                          </draggable>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                    <v-flex xs6>
                      <v-card>
                        <v-card-text>
                          <v-layout row wrap>
                            <v-flex xs8>
                              <h3 class="panel-title">Selected Column</h3>
                            </v-flex>
                            <v-flex xs4>
                              <input type="text" class="srch-text" v-model="selectedSearch" placeholder="Search..." />
                              <i class="fa fa-search srch-icon"></i>
                            </v-flex>
                          </v-layout>
                          <draggable element="span" v-model="tableObj.merge.selectedColumns" :options="dragOptions" :move="onMove" @change="updateGroup2($event)">
                            <transition-group type="transition" :name="'flip-list'" class="list-group ht-215" tag="ul">
                              <li class="list-group-item" v-for="(element, index) in filterBy(tableObj.merge.selectedColumns, selectedSearch)" :key="index">
                                {{element.group}}.{{element.name}}
                              </li>
                            </transition-group>
                          </draggable>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <!-- ********************************************        -->
                </v-container>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn @click.stop="savedata"> submit </v-btn>
      <v-btn v-on:click="$emit('close')"> close</v-btn>
    </v-card-actions>
    <v-dialog v-model="aliesPanel" max-width="25%">
      <column-alies @save-alies="saveColumnAlies" :column="column" v-on:close="aliesPanel=false"></column-alies>
    </v-dialog>
  </v-card>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';
import findIndex from 'lodash/findIndex';
import draggable from 'vuedraggable'
import filter from 'lodash/filter';
import columnAlies from '../columnAlies.vue';
import {JOIN_TYPE,FILTER_ARRAY, OPEN_BRASIS_ARRAY, CLOSE_BRASIS_ARRAY, 
            FUNCTION_ARRAY, VALUE_TYPE_ARRAY, PREVIOUS_STEPS, DATE_TYPE_ARRAY, DATABASE_TABLE, DATE_HINT} from '../constant.js'
import calender from '../element/calender.vue'
export default {
  data() {
    return {
          aliesPanel:false,
          column:{},
          joinType:JOIN_TYPE,
          filterArray:FILTER_ARRAY,
           openbrsisArray:OPEN_BRASIS_ARRAY,
      closebrsisArray:CLOSE_BRASIS_ARRAY,
      functionArray:FUNCTION_ARRAY,
      valueTypeArray:VALUE_TYPE_ARRAY,
      SearchTable:"",
        isDragging: false,
        selectedSearch:"",
        selectedTable:"",
        availableColumn:[],
        selectedColumns:[],        
        dateTypeArray: DATE_TYPE_ARRAY,     
        dateHint:"",
    }},
   props: ['tableObj'],
   components: {
          draggable,
          'column-alies':columnAlies,
          calender
     },
     computed: {
        dragOptions () {
        return  {
            animation: 0,
            group: 'description',
            ghostClass: 'ghost'
         };
        },
     },
  methods: {
    setDateHint(param){
      this.dateHint = DATE_HINT[param]
    },
    setDate(dateParam, index){
       let _this = this;
      //  alert("Date "+dateParam);
       _this.tableObj.criteriaArray[index].value = dateParam;
      //  console.log("criteria Array "+JSON.stringify(_this.tableObj.criteriaArray));
    },
    saveColumnAlies(columnObj) {
      let _this = this;
      let index = findIndex(_this.tableObj.merge.selectedColumns, {
        'group': columnObj,
        'name': columnObj.name
      });
      _this.tableObj.merge.selectedColumns[index] = columnObj;
      _this.aliesPanel = false;
      // console.log("Selected Index "+JSON.stringify(_this.tableObj.selectedColumns));
    },
    getColumn(value) {
      let _this = this;
      this.availableColumn = filter(_this.tableObj.optionColumn, function (o) {
        return o.group == value.tableName
      });
    },
    addColumn() {
      let _this = this;
      _this.tableObj.colArray.push(cloneDeep(_this.tableObj.colObj));
    },
    savedata() {
      let arrayIndex = -1;
      let _this = this;
      _this.tableObj.relationshipArray.map(function (obj, index) {
        if (_this.tableObj.relationship.fromTable.tableName &&
          _this.tableObj.relationship.toTable.tableName &&
          obj.relationship.fromTable.tableName == _this.tableObj.relationship.fromTable.tableName &&
          obj.relationship.toTable.tableName == _this.tableObj.relationship.toTable.tableName) {
          arrayIndex = index;
        }
      });
      if (!_this.tableObj.relationship.fromTable && !_this.tableObj.relationship.toTable) {
        _this.tableObj.relationshipArray.map(function (obj, index) {
          if (obj.selectedTable.tableName == _this.tableObj.merge.selectedTable.tableName) {
            arrayIndex = index;
          }
        });
      }
      if(_this.tableObj.relationship.fromTable && _this.tableObj.relationship.fromTable.stepId == PREVIOUS_STEPS){
        _this.tableObj.relationship.jfrom_drv_table = true;
      } else {
        _this.tableObj.relationship.jfrom_drv_table = false;
      }
      if(_this.tableObj.relationship.toTable && _this.tableObj.relationship.toTable.stepId == PREVIOUS_STEPS){
        _this.tableObj.relationship.jto_drv_table = true;  
      }else{
        _this.tableObj.relationship.jto_drv_table = false;  
      }
      // debugger;
      if (!_this.tableObj.selectedColumns.length && _this.tableObj.merge.selectedColumns.length)
        _this.tableObj.selectedColumns = _this.tableObj.merge.selectedColumns
      let object = {
        'relationship': _this.tableObj.relationship,
        'is_drv_table': _this.tableObj.merge.selectedTable.stepId == DATABASE_TABLE ? false : true,
        'colArray': _this.tableObj.colArray,
        'where': _this.tableObj.criteriaArray,
        'workTableOutput': _this.tableObj.merge.selectedColumns,
        'distinct': _this.tableObj.merge.distinct,
        'selectAll': _this.tableObj.merge.selectAll,
        'selectedTable': _this.tableObj.merge.selectedTable,
      };
      // _this.tableObj.relationshipArray.push(cloneDeep(object));
      // _this.$toaster.success('Relationship added successfully');              
      if (arrayIndex >= 0) {
        _this.tableObj.relationshipArray[arrayIndex] = cloneDeep(object);
        _this.$toaster.info('Relationship Updated successfully');
      } else {
        _this.tableObj.relationshipArray.push(cloneDeep(object));
        _this.$toaster.success('Relationship added successfully');
      }
      this.resetForm();
      this.$emit('save-data', _this.tableObj)
    },
    resetForm() {
      this.tableObj.relationship.fromTable = '';
      this.tableObj.relationship.selectedFilter = '';
      this.tableObj.relationship.toTable = '';
      this.tableObj.colArray = [{
        "fromColumn": '',
        'toColumn': '',
        'operator': ''
      }];
      this.tableObj.criteriaArray = [{
        openbrsis: '',
        function: '',
        column: '',
        relOperator: '',
        valueType: '',
        value: '',
        closebrsis: '',
        logOperator: true,
        date: null,
        menu: false,
        modal: false,
        field: '',
      }];
    },
    deleteCriteria(index) {
      let _this = this;
      if (!index) {
        return;
      }
      _this.tableObj.criteriaArray.splice(index, 1);
      let length = _this.tableObj.criteriaArray.length;
      _this.tableObj.criteriaArray[length - 1].showLogicalOperator = false;
    },
    addCriteria() {
      let _this = this;
      let length = _this.tableObj.criteriaArray.length;
      _this.tableObj.criteriaArray[length - 1].showLogicalOperator = true;
      _this.tableObj.criteriaArray.push(cloneDeep(_this.tableObj.parenthasisobject));
    },
    onMove({
      relatedContext,
      draggedContext
    }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
    },
    updateGroup(event) {
      // this.orderList();
    },
    updateGroup2(event) {
      if (event.added) {
        this.column = event.added.element;
        this.aliesPanel = true;
      }
      // this.orderselectedColumns();
    }

  }
}
</script>
<style scoped>
.icn-css{
    background: red;
    color: white;
    width: 15px;
    text-align: center;
    height: 17px;
    vertical-align: middle;
    border-radius: 50%;
    cursor: pointer;
}
 .criteria-opr{
      font-size: 20px;
      cursor: pointer;
      position: relative;
      margin: auto;
      padding: auto;
      margin-top: 12%;
    }
  .ft-30 {
   font-size: 30px;
}

/* **************************************** */
.srch-text{
  border-bottom: 01px solid cadetblue;
  width: 99%;
  height: 100%;
}
.srch-icon{
    position: absolute;
    top: 7%;
    right: 3%;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: .5;
  background: #C8EBFB;
}

.list-group {
  min-height: 150px;
}

.list-group-item {
  cursor: move;
}

.list-group-item i{
  cursor: pointer;
}
.ht-215{
  height: 215px;
  overflow: auto;
}
</style>

