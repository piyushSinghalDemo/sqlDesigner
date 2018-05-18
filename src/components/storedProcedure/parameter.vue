<template>
  <v-container grid-list-md>
    <div v-show="tableObj.loadParamater">
        <v-progress-circular indeterminate color="red"></v-progress-circular>
        <span style="color: red;font-size: 16px;">Parameter List Loading...</span>
    </div>
    <div v-show="!tableObj.loadParamater">
    <ul>
      <li @click.stop="switchScreen(1)" :class="{chevron:true}">Procedure List</li>
      <li @click.stop="switchScreen(2)" :class="{chevron:true,chevron_active:true}">Parameter</li>
      <!-- <li @click.stop="switchScreen(3)" :class="{chevron:true}">Worktable Output</li> -->
    </ul>
    <v-layout row wrap>
      <v-flex>
        <!-- {{tableObj}} -->
         <v-data-table
            :headers="headers"
            :items="tableObj.storedProcedure.params"
            hide-actions
            class="elevation-1 table-data"
          >
            <template slot="items" slot-scope="props">
              <td class="table-data">{{ props.item.Parameter_name }}</td>
              <td class="table-data">{{ props.item.Type }}</td>
              <td class="table-data">{{ props.item.Is_output ? "OUT":"IN"}}</td>
              <!-- <td class="text-xs-right">{{ props.item.value}}</td> -->
              <td class="">
                 <!-- {{ props.item.value }} -->
                 <v-text-field name="value" label="Value" single-line v-model="props.item.value"></v-text-field>
              </td>
            </template>
          </v-data-table>
      </v-flex>
    </v-layout> 
        <!-- table data : {{tableObj}} -->
    <v-layout justify-end>
      <v-btn class="next" @click.stop="updateStep" :loading="saveData" color="info">Save</v-btn>
    </v-layout>
    </div>
  </v-container>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';
import config from '../../config.json'
export default {
  data() {
      return {
        loading: false,
        headers: [
          {
            text: 'Name',
            align: 'left',
            sortable: false,
            value: 'Parameter_name'
          },
          { text: 'Data Type', value: 'Type' },
          { text: 'Parameter Type', value: 'Is_output' },
          { text: 'Value', value: 'value' }
        ],
        saveData:false,
      }
    },
    props: ['tableObj'],
    mounted() {
       var _this = this;
    },
    computed: {
    //    selectTable() {
    //     let _this = this;
    //     return union(_this.tableObj.allDbTables, _this.tableObj.allPrevStepTables);//_this.tableObj.allDbTables;
    //   }
    },
    watch: {
      search(val) {
         //this.querySelections(val)
      },
      // tableObj(val){
      //   if(this.tableObj.storedProcedure.params.length)
      //    this.tableObj.storedProcedure.params[0].value = 10; 
      // }
    },
    methods: {
        updateStep(){
            let _this = this;
            _this.saveData = true;
            _this.$emit('update-step', _this.tableObj);
            setTimeout(function(){ _this.saveData = false }, 4000);
        },
        switchScreen(num) {
        let _this = this;
        _this.$emit('update-object', [_this.tableObj, num]);
      },
            
    }
  }

</script>
<style scoped>
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
    .table-data{
      vertical-align: inherit;font-size:16px;
    }
</style>
