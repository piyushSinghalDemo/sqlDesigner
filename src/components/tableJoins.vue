<template>
  <v-card>
          <v-toolbar dark color="primary">
            <v-toolbar-title>Define Joins</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn v-on:click="$emit('close')" icon large>
              <v-icon large>close</v-icon>
            </v-btn>  
          </v-toolbar>
          <v-card-text>
             <v-form>
               <v-layout row wrap>
               <v-flex style="margin-right:20px;"><b>From Table</b></v-flex>  
               <v-flex style="margin-right:20px;"><b>Join Type</b></v-flex>  
               <v-flex style="margin-right:20px;"><b>To Table</b></v-flex>  
               </v-layout>
               <v-layout row wrap>
               <v-flex style="margin-right:20px;">
            <v-select :items="tableObj.relationship.selectedTableArray" v-model="tableObj.relationship.fromTable" label="From Table"
              single-line item-text="tableName" item-value="tableName" return-object clearable></v-select>
          </v-flex>
          <v-flex style="margin-right:20px;">
            <v-select :items="joinType" v-model="tableObj.relationship.selectedFilter" label="Join Type" single-line clearable></v-select>
          </v-flex>
          <v-flex style="margin-right:20px;">
            <v-select :items="tableObj.relationship.selectedTableArray" v-model="tableObj.relationship.toTable" label="To Table" item-text="tableName"
              item-value="tableName" return-object single-line clearable></v-select>
          </v-flex>
               </v-layout>
               <v-layout row wrap>
               <v-flex style="height:40px;padding-top:20px;margin-right:20px;"><b>From Column</b></v-flex>  
               <v-flex style="height:40px;padding-top:20px;margin-right:20px;"><b>Operator</b></v-flex>  
               <v-flex style="height:40px;padding-top:11px;margin-right:20px;">
                 <v-layout row wrap>
                    <v-flex style="height:40px;padding-top:11px;"> <b>To Column</b></v-flex>
                    <v-flex>
                      <v-btn @click.stop="addColumn" icon small>
                        <v-icon medium>fa-plus-circle</v-icon>
                      </v-btn>
                      <!-- <i class="fa fa-plus icn-css" @click.stop="addColumn">
                      </i> -->
                      </v-flex>
                 </v-layout>
                </v-flex>  
               </v-layout>
               <v-layout row wrap v-for="(column, index) in tableObj.colArray" :key="index">
               <v-flex xs4 style="margin-right:20px;">
                 <!-- *********************************** Group Column ********************************************* -->
                   <v-select  label="From Column" :items="tableObj.optionColumn" item-text="name"  v-model="column.fromColumn"
                     single-line autocomplete return-object></v-select>     
                 <!-- ********************************************************************************************** -->
               </v-flex>
               <v-flex xs2 style="margin-right:20px;">
                  <v-select  :items="filterArray" v-model="column.operator"  label="Operator" single-line ></v-select>
               </v-flex>
               <v-flex xs4 style="margin-right:20px;">
                  <v-layout>
                    <v-flex>
                      <v-select  label="To Column" :items="tableObj.optionColumn" item-text="name" v-model="column.toColumn" 
                        single-line autocomplete return-object></v-select> 
                    </v-flex>
                  </v-layout>
               </v-flex>
               </v-layout>
              </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click.stop="savedata"> submit </v-btn>
            <!-- <v-btn v-on:click="$emit('close')"> close</v-btn> -->
          </v-card-actions>
        </v-card>
</template>
<script>
import cloneDeep from 'lodash/cloneDeep';
import {JOIN_TYPE,FILTER_ARRAY} from './constant.js';
export default {
     data() {
    return {
          customFilter (item, queryText, itemText) {
          const hasValue = val => val != null ? val : ''
          const text = hasValue(item.name)
          const query = hasValue(queryText)
          return text.toString()
            .toLowerCase()
            .indexOf(query.toString().toLowerCase()) > -1
        },
          joinType:JOIN_TYPE,
          filterArray:FILTER_ARRAY,    
    }},
   props: ['tableObj'],
   methods: {
       addColumn(){
      let _this = this;
      _this.tableObj.colArray.push(cloneDeep(_this.tableObj.colObj));
    },
    savedata(){
      let arrayIndex = -1;
      let _this = this;
      _this.tableObj.relationshipArray.map(function(obj, index){
          if(obj.relationship.fromTable.tableName == _this.tableObj.relationship.fromTable.tableName && 
              obj.relationship.toTable.tableName == _this.tableObj.relationship.toTable.tableName){
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
      let object = {'relationship':_this.tableObj.relationship,'colArray':_this.tableObj.colArray};
      if(arrayIndex >=0){
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
</style>

