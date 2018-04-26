<template>
  <v-container grid-list-md>
       <ul>
            <li @click.stop="switchScreen(1)" :class="{chevron:true}">Table Relationship</li>
            <li @click.stop="switchScreen(2)" :class="{chevron:true,chevron_active:true}">Criteria</li>
            <li @click.stop="switchScreen(3)" :class="{chevron:true}">Worktable Output</li>
        </ul>
    <v-layout row wrap style="font-weight: bold;font-size:19px">
      <v-flex xs2>Parenthesis</v-flex>
      <v-flex xs1>Function</v-flex>
      <v-flex xs1>Columns</v-flex>
      <v-flex xs1>Operator</v-flex>
      <v-flex xs2>Value Type</v-flex>
      <v-flex xs2>Value</v-flex>
      <v-flex xs2>Parenthesis</v-flex>
      <v-flex xs1>Operator</v-flex>
    </v-layout>
    <v-layout v-for="(obj,index) in tableObj.criteriaArray" :key="index">
      <v-flex xs2>
        <v-select :items="openbrsisArray" clearable single-line label="Select Parenthisis" v-model="obj.openbrsis"></v-select>
      </v-flex>
      <v-flex xs1>
        <v-select :items="functionArray" clearable single-line label="Select Function" v-model="obj.function"></v-select>
      </v-flex>
      <v-flex xs1>
        <v-select label="Select Column" clearable :items="tableObj.optionColumn" v-model="obj.column" item-text="name" single-line item-value="name + tblAlies"></v-select>
      </v-flex>
      <v-flex xs1>
        <v-select :items="filterArray" clearable single-line label="Select Operator" v-model="obj.relOperator">
        </v-select>
      </v-flex>
      <v-flex xs2>
        <v-select :items="valueTypeArray" clearable single-line label="Select ValueType" v-model="obj.valueType">
        </v-select>
      </v-flex>
      <v-flex xs2>
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
      <v-flex xs2>
        <v-select :items="closebrsisArray" clearable single-line label="Select Parenthisis" v-model="obj.closebrsis">
        </v-select>
      </v-flex>
      <v-flex xs1>
        <toggle-button v-show="obj.showLogicalOperator" :width=80 :height=30 :value="obj.logOperator" v-model="obj.logOperator" :labels="{checked: 'AND', unchecked: 'OR'}"
          style="margin-top:12%" :sync="true" />
        <div v-show="!obj.showLogicalOperator">
          <i class="fa fa-plus criteria-opr" @click.stop="addCriteria()" aria-hidden="true"></i>
          <span class="ft-30">|</span>
          <i class="fa fa-trash criteria-opr" @click.stop="deleteCriteria(index)" aria-hidden="true"></i>
        </div>
      </v-flex>
    </v-layout>
     <v-layout row wrap>
        <v-flex xs1>
        <v-btn class="next" @click.stop="switchScreen(1)" color="info">Previous</v-btn>
        </v-flex>
        <v-flex xs9></v-flex>
        <v-flex xs2>
        <v-btn class="next" @click.stop="switchScreen(3)" color="info">Next</v-btn>
        </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import cloneDeep from 'lodash/cloneDeep';
export default {
  data() {
    return {
      openbrsisArray:['(','((','((('],
      closebrsisArray:[')','))',')))'],
      functionArray:['count','sum'],
      filterArray:["EQUALS_TO","NOT_EQUALS_TO","LESS_THAN", "GREATER_THAN","BETWEEN","IN",
                  "LESS_THAN_EQUALS_TO","GREATER_THAN_EQUALS_TO","IS_NULL","IS_NOT_NULL","LIKE_STARTS_WITH",
                  "LIKE_ENDS_WITH","LIKE_CONTAINS_WITH"],
      valueTypeArray:['value','date','field'],               
    }},
    props: ['tableObj'],
   methods: {
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
    switchScreen(num){
        let _this = this;
        _this.$emit('update-object', [_this.tableObj, num]);
    },
   }
}
</script>
<style scoped>
 .criteria-opr{
      font-size: 20px;
      cursor: pointer;
      position: relative;
      margin: auto;
      padding: auto;
      margin-top: 24%;
    }
    .next{
    position: absolute;
    top: 537px;
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

</style>



