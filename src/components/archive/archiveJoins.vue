<template>
  <v-card>
    <v-card-title>
      Select Data
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-layout row wrap v-show="!isDrivar">
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
        <v-layout row wrap v-show="!isDrivar">
          <v-flex style="margin-right:20px;">
            <v-select :items="tableObj.relationship.selectedTableArray" @selected="testChange(tableObj.relationship.fromTable)" v-model="tableObj.relationship.fromTable" 
            label="From Table"  single-line item-text="tableName" item-value="tableName" return-object clearable></v-select>
          </v-flex>
          <v-flex style="margin-right:20px;">
            <v-select :items="joinType" v-model="tableObj.relationship.selectedFilter" label="Join Type" single-line clearable></v-select>
          </v-flex>
          <v-flex style="margin-right:20px;">
             <!-- tableObj.relationship.toTable: {{tableObj.relationship.toTable}} -->
            <v-select :items="tableObj.relationship.selectedTableArray" v-model="tableObj.relationship.toTable" label="To Table" item-text="tableName"
              item-value="tableName" single-line return-object clearable></v-select>
          </v-flex>
        </v-layout>
        <v-expansion-panel>
          <v-expansion-panel-content v-show="!isDrivar">
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
                    <v-select label="From Column" :items="tableObj.optionColumn" item-text="name" v-model="column.fromColumn" single-line
                      autocomplete clearable return-object></v-select>
                    <!-- ********************************************************************************************** -->
                  </v-flex>
                  <v-flex xs2 style="margin-right:20px;">
                    <v-select :items="filterArray" v-model="column.operator" label="Operator" single-line clearable></v-select>
                  </v-flex>
                  <v-flex xs4 style="margin-right:20px;">
                    <v-layout>
                      <v-flex>
                        <v-select label="To Column" :items="tableObj.optionColumn" item-text="name" v-model="column.toColumn" single-line
                          autocomplete clearable return-object></v-select>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
            <!-- Driver VAlue:{{isDrivar}} -->
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
                      <!-- {{obj.column}} -->
                      <v-select label="Select Column" :items="tableObj.archive.optionColumn" item-text="name" v-model="obj.column" single-line
                          autocomplete clearable return-object></v-select>
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
                      <v-select :items="dateTypeArray" clearable @change="setDateHint" :hint="dateHint"
                          label="Select Date Type" style="padding-top: 14px;" v-model="obj.dateType">
                      </v-select>
                    </v-flex>
                    <v-flex xs3 v-if="obj.dateType == 'date' && obj.valueType == 'date'">
                      <v-select :items="['yyyy-mm-dd','mm-dd-yyyy']" style="padding-top: 14px;" clearable 
                        label="Date Format" v-model="obj.formatType" @change="obj.value=''">
                      </v-select>
                    </v-flex>
                    <v-flex xs3>
                      <calender v-if="obj.valueType == 'date' && obj.dateType == 'Database Date'" :input="obj.value"  @update="setDate($event,index)"></calender>
                      <v-select :items="tableObj.archive.optionColumn" item-text="name" single-line label="Select Column" v-else-if="obj.valueType == 'field'" v-model="obj.field"
                         clearable return-object></v-select>
                      
                      <v-text-field name="input-1" v-else single-line label="Label Text" style="padding-top:14px" v-model="obj.value"></v-text-field>
                    </v-flex>
                    <v-flex xs3>
                      <v-select clearable :items="closebrsisArray" single-line label="Select Parenthisis" style="padding-top:14px" 
                        v-model="obj.closebrsis">
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
          <!-- ******************************************Order By************************************************ -->
          <v-expansion-panel-content v-show="isDrivar">
            <div slot="header">
              Define OrderBy
            </div>
            <v-card>
              <v-card-text>
                <v-container grid-list-md>
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
                          <!-- {{tableObj.relationship}} -->
                          <draggable element="span" v-model="tableObj.archive.driverTable.columns" :options="dragOptions" :move="onMove" @start="isDragging=true"
                            @end="isDragging=false" @change="updateGroup($event)">
                            <transition-group type="transition" :name="'flip-list'" class="list-group ht-215" tag="ul">
                              <li class="list-group-item" v-if="element.name" v-for="(element, index) in filterBy(tableObj.archive.driverTable.columns, SearchTable)"
                                :key="index">
                                {{element.name}}
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
                          <draggable element="span" v-model="tableObj.archive.driverTable.selectedColumns" :options="dragOptions" :move="onMove" @change="updateGroup2($event)">
                            <transition-group type="transition" :name="'flip-list'" class="list-group ht-215" tag="ul">
                              <li class="list-group-item" v-for="(element, index) in filterBy(tableObj.archive.driverTable.selectedColumns, selectedSearch)"
                                :key="index">
                                <v-layout row align-center>
                                  <v-flex xs5>{{element.name}}</v-flex>
                                  <v-flex xs7 style="padding:0px;">
                                    <!-- <v-checkbox label="Decending" style="margin:0px;" hide-details v-model="element.decending">
                                    </v-checkbox> -->
                                    <v-btn depressed  medium v-if="!element.decending" @click="element.decending = !element.decending" style="margin:0px;">Ascending</v-btn>
                                    <v-btn depressed  medium v-if="element.decending" @click="element.decending = !element.decending" style="margin:0px;">Decending</v-btn>
                                  </v-flex>
                                </v-layout>
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
          <!-- ****************************************END **************************************************** -->
        </v-expansion-panel>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn @click.stop="saveArchiveData"> submit </v-btn>
      <v-btn v-on:click="$emit('close')"> close</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';
import draggable from 'vuedraggable'
import {
  JOIN_TYPE,
  FILTER_ARRAY,
  OPEN_BRASIS_ARRAY,
  CLOSE_BRASIS_ARRAY,
  FUNCTION_ARRAY,
  VALUE_TYPE_ARRAY,
  PREVIOUS_STEPS,
  DATE_TYPE_ARRAY,
  DATE_HINT
} from '../constant.js'
import calender from '../element/calender.vue'
export default {
  data() {
    return {
      customFilter(item, queryText, itemText) {
        const hasValue = val => val != null ? val : ''
        const text = hasValue(item.name)
        const query = hasValue(queryText)
        return text.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      },
      joinType: JOIN_TYPE,
      filterArray: FILTER_ARRAY,
      openbrsisArray: OPEN_BRASIS_ARRAY,
      closebrsisArray: CLOSE_BRASIS_ARRAY,
      functionArray: FUNCTION_ARRAY,
      valueTypeArray: VALUE_TYPE_ARRAY,
      dateTypeArray: DATE_TYPE_ARRAY,
      selectedSearch: "",
      SearchTable: "",
      dateHint:"",
    }
  },
  props: ['tableObj', 'isDrivar'],
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: 'description',
        ghostClass: 'ghost'
      };
    },
  },
  components: {
    draggable,
    calender
  },
  methods: {
      setDateHint(param){
      this.dateHint = DATE_HINT[param]
    },
    setDate(dateParam, index) {
      let _this = this;
      //  alert("Date "+dateParam);
      _this.tableObj.criteriaArray[index].value = dateParam;
      console.log("criteria Array " + JSON.stringify(_this.tableObj.criteriaArray));
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
    },
    onMove({
      relatedContext,
      draggedContext
    }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
    },
    addColumn() {
      let _this = this;
      // debugger;
      // alert("In add Column");
      _this.tableObj.colArray.push(cloneDeep(_this.tableObj.colObj));
    },
    saveArchiveData() {
      let arrayIndex = -1;
      let _this = this;
      if (_this.isDrivar) {
        _this.tableObj.archive.where = _this.tableObj.criteriaArray;
      } else {
        _this.tableObj.relationshipArray.map(function (obj, index) {
          if (obj.relationship.fromTable.tableName == _this.tableObj.relationship.fromTable.tableName &&
            obj.relationship.toTable.tableName == _this.tableObj.relationship.toTable.tableName) {
            arrayIndex = index;
          }
        });
        //debugger;
        if (_this.tableObj.relationship.fromTable.stepId && _this.tableObj.relationship.fromTable.stepId == PREVIOUS_STEPS) {
          _this.tableObj.relationship.jfrom_drv_table = true;
        } else {
          _this.tableObj.relationship.jfrom_drv_table = false;
        }
        if (_this.tableObj.relationship.toTable.stepId && _this.tableObj.relationship.toTable.stepId == PREVIOUS_STEPS) {
          _this.tableObj.relationship.jto_drv_table = true;
        } else {
          _this.tableObj.relationship.jto_drv_table = false;
        }
        // debugger;
        let object = {
          'relationship': _this.tableObj.relationship,
          'colArray': _this.tableObj.colArray,
          'where': _this.tableObj.criteriaArray,
          'select_table': _this.tableObj.archive.selectedTable
        };
        if (arrayIndex >= 0) {
          _this.tableObj.relationshipArray[arrayIndex] = cloneDeep(object);
          _this.$toaster.info('Relationship Updated successfully');
        } else {
          _this.tableObj.relationshipArray.push(cloneDeep(object));
          _this.$toaster.success('Relationship added successfully');
        }
      } //end of else(not driver table)
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
  }
}
</script>
<style scoped>
/* .radio label, .checkbox label {
  padding: 0px !important;
} */
/* .input-group__details{
  min-height: 0px !important;

} */
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
/* ************************ For drag and drop *************************************** */
.ht-215{
  height: 215px;
  overflow: auto;
}
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
</style>

