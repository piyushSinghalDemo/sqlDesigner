<template>
  <v-container grid-list-md>
        <v-layout row wrap v-for="(obj,index) in tableObj.criteriaArray" :key="index">
          <!-- tableObj.criteriaArray : {{tableObj.criteriaArray}} -->
          <v-flex xs3>
            <v-select :items="openbrsisArray" clearable  label="Select Parenthisis" v-model="obj.openbrsis">
            </v-select>
          </v-flex>
          <v-flex xs3>
            <!-- {{tableObj.optionColumn}} -->
            <v-select label="Select Column" clearable :items="tableObj.optionColumn" item-text="name"  v-model="obj.column"
              return-object autocomplete>
            </v-select>
          </v-flex>
          <v-flex xs3>
            <v-select :items="filterArray" clearable  label="Select Operator" v-model="obj.relOperator">
            </v-select>
          </v-flex>
          <v-flex xs3>
            <v-select :items="valueTypeArray" clearable  label="Select ValueType" v-model="obj.valueType">
            </v-select>
          </v-flex>
           <v-flex xs3 v-if="obj.valueType == 'date'">
             <!-- obj.dateType value : {{obj.dateType}} -->
            <v-select :items="dateTypeArray" style="padding-top: 10px;" clearable single-line @change="setDateHint" :hint=dateHint
              label="Select Date Type" v-model="obj.dateType">
            </v-select>
          </v-flex>
          <v-flex xs3 v-if="obj.dateType == 'Database Date'">
            <v-select :items="['yyyy-mm-dd','mm-dd-yyyy']" style="padding-top: 10px;" clearable 
              label="Date Format" v-model="obj.formatType" @change="obj.value=''">
            </v-select>
          </v-flex>
          <v-flex xs3>
            <calender v-if="obj.valueType == 'Database Date' && obj.dateType == 'Database Date'" :format="obj.formatType" 
              :input="obj.value" @update="setDate($event,index)"></calender>

            <v-select v-else-if="obj.valueType == 'field'" label="Select Column" clearable :items="tableObj.optionColumn" 
              item-text="name"  v-model="obj.field" return-object autocomplete style="padding-top: 10px;">
            </v-select>    
            <v-text-field name="input-1" v-else  label="Value" style="padding-top: 10px;" v-model="obj.value"></v-text-field>
          </v-flex>
          <v-flex xs3>
            <v-select :items="closebrsisArray" style="padding-top: 10px;" item-text="name" clearable  label="Select Parenthisis" v-model="obj.closebrsis"
              return-object autocomplete>
            </v-select>
          </v-flex>
          <v-flex xs3>
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
        <v-btn class="next" @click.stop="switchScreen(1)" color="primary">Previous</v-btn>
      </v-flex>
      <v-flex xs9></v-flex>
      <v-flex xs2>
        <v-btn class="next" @click.stop="switchScreen(3)" color="primary">Next</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import cloneDeep from 'lodash/cloneDeep';
import calender from './element/calender.vue';
import {
  OPEN_BRASIS_ARRAY,
  CLOSE_BRASIS_ARRAY,
  FUNCTION_ARRAY,
  FILTER_ARRAY,
  VALUE_TYPE_ARRAY,
  DATE_TYPE_ARRAY,
  DATE_HINT
} from './constant.js'
export default {
  components: {
    calender,
  },
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
      openbrsisArray: OPEN_BRASIS_ARRAY,
      closebrsisArray: CLOSE_BRASIS_ARRAY,
      functionArray: FUNCTION_ARRAY,
      filterArray: FILTER_ARRAY,
      valueTypeArray: VALUE_TYPE_ARRAY,
      dateTypeArray: DATE_TYPE_ARRAY,
      dateHint:"",
    }
  },
  props: ['tableObj'],
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
    switchScreen(num) {
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
      margin-top: 8%;
    }
    .next{
    position: absolute;
    bottom: 0px;
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



