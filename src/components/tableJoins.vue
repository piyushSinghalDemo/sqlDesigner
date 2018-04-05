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
                  <v-select :items="tableObj.relationship.selectedTableArray" v-model="tableObj.relationship.fromTable" 
                    label="From Table" single-line item-text="tableName" item-value="tableName + aliesTableName"></v-select>
               </v-flex>
               <v-flex style="margin-right:20px;">
                  <v-select :items="joinType" v-model="tableObj.relationship.selectedFilter" label="Join Type" single-line ></v-select>
               </v-flex>
               <v-flex style="margin-right:20px;">
                   <v-select :items="tableObj.relationship.selectedTableArray" v-model="tableObj.relationship.toTable" 
                      label="To Table" item-text="tableName" item-value="tableName + aliesTableName" single-line></v-select>
               </v-flex>
               </v-layout>
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
                   <v-select label="From Column" :items="tableObj.optionColumn" v-model="column.fromColumn" item-text="name" 
                     single-line item-value="name + colAlies" autocomplete></v-select>     
                 <!-- ********************************************************************************************** -->
               </v-flex>
               <v-flex xs2 style="margin-right:20px;">
                  <v-select :items="filterArray" v-model="column.operator" label="Operator" single-line ></v-select>
               </v-flex>
               <v-flex xs4 style="margin-right:20px;">
                  <v-layout>
                    <v-flex>
                      <v-select label="To Column" :items="tableObj.optionColumn" v-model="column.toColumn" item-text="name" 
                        single-line item-value="name + colAlies" autocomplete></v-select> 
                    </v-flex>
                  </v-layout>
               </v-flex>
               </v-layout>
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
      let object = {'relationship':_this.tableObj.relationship,'colArray':_this.tableObj.colArray};
      if(arrayIndex){
        _this.tableObj.relationshipArray[arrayIndex] = cloneDeep(object);
        _this.$toaster.info('Relationship Updated successfully');
      }else{
        _this.tableObj.relationshipArray.push(cloneDeep(object));
        _this.$toaster.success('Relationship added successfully');
      }
      this.$emit('save-data', _this.tableObj)
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
</style>

