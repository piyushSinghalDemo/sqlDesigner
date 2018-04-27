<template>
  <v-card>
          <v-card-title>
            Select Data
          </v-card-title>
          <v-card-text>
             <v-form>
               <v-layout row wrap>
               <v-flex style="margin-right:20px;"><b>From Table</b></v-flex>  
               <v-flex style="margin-right:20px;"><b>Join Type</b></v-flex>  
               <v-flex style="margin-right:20px;"><b>To Table</b></v-flex>  
               </v-layout>
               <v-layout row wrap>
               <v-flex style="margin-right:20px;">
                  <v-select clearable :items="tableObj.relationship.selectedTableArray" v-model="tableObj.relationship.fromTable" 
                    label="From Table" single-line item-text="tableName" item-value="tableName + aliesTableName"></v-select>
               </v-flex>
               <v-flex style="margin-right:20px;">
                  <v-select clearable :items="joinType" v-model="tableObj.relationship.selectedFilter" label="Join Type" single-line ></v-select>
               </v-flex>
               <v-flex style="margin-right:20px;">
                   <v-select clearable :items="tableObj.relationship.selectedTableArray" v-model="tableObj.relationship.toTable" 
                      label="To Table" item-text="tableName" item-value="tableName + aliesTableName" single-line></v-select>
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
                              <v-flex style="margin-right:20px;"><b>From Column</b></v-flex>  
                              <v-flex style="margin-right:20px;"><b>Operator</b></v-flex>  
                              <v-flex style="margin-right:20px;">
                                <v-layout row wrap>
                                    <v-flex> <b>To Column</b></v-flex>
                                    <v-flex><i class="fa fa-plus icn-css" @click.stop="addColumn"></i></v-flex>
                                </v-layout>
                                </v-flex>  
                              </v-layout>
                              <v-layout row wrap v-for="(column, index) in tableObj.colArray" :key="index">
                                <v-flex xs4 style="margin-right:20px;">
                                  <!-- *********************************** Group Column ********************************************* -->
                                    <v-select clearable label="From Column"  :items="tableObj.optionColumn" v-model="column.fromColumn" item-text="name" 
                                      single-line item-value="name + colAlies" autocomplete></v-select>     
                                  <!-- ********************************************************************************************** -->
                                </v-flex>
                                <v-flex xs2 style="margin-right:20px;">
                                    <v-select clearable :items="filterArray"  v-model="column.operator" label="Operator" single-line ></v-select>
                                </v-flex>
                                <v-flex xs4 style="margin-right:20px;">
                                    <v-layout>
                                      <v-flex>
                                        <v-select clearable label="To Column"  :items="tableObj.optionColumn" v-model="column.toColumn" item-text="name" 
                                          single-line item-value="name + colAlies" autocomplete></v-select> 
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
                              <v-select clearable :items="openbrsisArray"  single-line label="Select Parenthisis" v-model="obj.openbrsis"></v-select>
                            </v-flex>
                            <v-flex xs3>
                              <v-select clearable :items="functionArray"  single-line label="Select Function" v-model="obj.function"></v-select>
                            </v-flex>
                            <v-flex xs3>
                              <v-select label="Select Column"  :items="tableObj.optionColumn" v-model="obj.column" item-text="name" single-line item-value="name + tblAlies"></v-select>
                            </v-flex>
                            <v-flex xs3>
                              <v-select clearable :items="filterArray"  single-line label="Select Operator" v-model="obj.relOperator">
                              </v-select>
                            </v-flex>
                            <v-flex xs3>
                              <v-select clearable :items="valueTypeArray"  single-line label="Select ValueType" v-model="obj.valueType">
                              </v-select>
                            </v-flex>
                            <v-flex xs3>
                               <v-text-field name="input-1" v-show="obj.valueType == 'value' || obj.valueType == ''" single-line label="Label Text" v-model="obj.value"></v-text-field>
                                <v-menu ref="menu" lazy :close-on-content-click="false" v-show="obj.valueType == 'date'" v-model="obj.menu" transition="scale-transition"
                                  offset-y full-width :nudge-right="40" min-width="290px" :return-value.sync="obj.date">
                                  <v-text-field slot="activator" label="Picker in menu" v-model="obj.date" prepend-icon="event" readonly></v-text-field>
                                  <v-date-picker v-model="obj.date" no-title scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                                  </v-date-picker>
                                </v-menu>
                                <v-select :items="tableObj.optionColumn" single-line label="Select Column" v-show="obj.valueType == 'field'" v-model="obj.field"
                                  item-text="name" item-value="name + tblAlies"></v-select>
                            </v-flex>
                            <v-flex xs3>
                              <v-select clearable :items="closebrsisArray"  single-line label="Select Parenthisis" v-model="obj.closebrsis">
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
               </v-expansion-panel> 
              </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn @click.stop="savedata"> submit </v-btn>
            <v-btn v-on:click="$emit('close')"> close</v-btn>
          </v-card-actions>
        </v-card>
</template>
<script>
import cloneDeep from 'lodash/cloneDeep';
export default {
     data() {
    return {
          joinType:["join","left join","right join","full join"],
          filterArray:["EQUALS_TO","NOT_EQUALS_TO","LESS_THAN", "GREATER_THAN","BETWEEN","IN",
                  "LESS_THAN_EQUALS_TO","GREATER_THAN_EQUALS_TO","IS_NULL","IS_NOT_NULL","LIKE_STARTS_WITH","LIKE_ENDS_WITH","LIKE_CONTAINS_WITH"],
           openbrsisArray:['(','((','((('],
      closebrsisArray:[')','))',')))'],
      functionArray:['count','sum'],
      valueTypeArray:['value','date','field'],             
    }},
   props: ['tableObj'],
   methods: {
       addColumn(){
      let _this = this;
      _this.tableObj.colArray.push(cloneDeep(_this.tableObj.colObj));
    },
    savedata(){
      let arrayIndex = 0;
      let _this = this;
      // _this.tableObj = data.tableObj;
      _this.tableObj.relationshipArray.map(function(obj, index){
          if(obj.relationship.fromTable == _this.tableObj.relationship.fromTable){
            arrayIndex = index;
          }
      });
      if(_this.tableObj.relationship.fromTable.stepId && _this.tableObj.relationship.fromTable.stepId == "Previous Steps"){
        _this.tableObj.relationship.jfrom_drv_table = true;
      }else{
        _this.tableObj.relationship.jfrom_drv_table = false;
      }
      if(_this.tableObj.relationship.toTable.stepId && _this.tableObj.relationship.toTable.stepId == "Previous Steps"){
        _this.tableObj.relationship.jto_drv_table = true;  
      }else{
        _this.tableObj.relationship.jto_drv_table = false;  
      }

      let object = {'relationship':_this.tableObj.relationship,
                    'colArray':_this.tableObj.colArray, 'where':_this.tableObj.criteriaArray};
      if(arrayIndex){
        _this.tableObj.relationshipArray[arrayIndex] = cloneDeep(object);
        _this.$toaster.info('Relationship Updated successfully');
      }else{
        _this.tableObj.relationshipArray.push(cloneDeep(object));
        _this.$toaster.success('Relationship added successfully');
      }
      this.resetForm();
      this.$emit('save-data', _this.tableObj)
    },
    resetForm(){
      this.tableObj.relationship.fromTable = '';
      this.tableObj.relationship.selectedFilter = '';
      this.tableObj.relationship.toTable = '';
      this.tableObj.colArray = [{ "fromColumn": '', 'toColumn': '', 'operator': '' }];
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
    deleteCriteria(index){
      let _this = this;
      if(!index){
        return;
      }
      _this.tableObj.criteriaArray.splice(index,1);
      let length = _this.tableObj.criteriaArray.length;
      _this.tableObj.criteriaArray[length-1].showLogicalOperator = false; 
    },
    addCriteria(){
      let _this = this;
      let length = _this.tableObj.criteriaArray.length;
      _this.tableObj.criteriaArray[length-1].showLogicalOperator = true;
      _this.tableObj.criteriaArray.push(cloneDeep(_this.tableObj.parenthasisobject)); 
    },
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
</style>

