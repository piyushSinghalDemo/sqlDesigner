<template>
  <v-container grid-list-md >
    <div v-show="tableObj.loadParamater">
        <v-progress-circular indeterminate color="red"></v-progress-circular>
        <span style="color: red;font-size: 16px;">Parameter List Loading...</span>
    </div>
    <div v-show="!tableObj.loadParamater">

    <v-layout row wrap style="height:375px">
      <v-flex style="overflow:auto">
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
              <td class="table-data">{{ props.item.Is_output}}</td>
              <!-- <td class="text-xs-right">{{ props.item.value}}</td> -->
              <td class="">
                 <v-text-field name="value" label="Value" v-if="props.item.Type !== 'date'" single-line v-model="props.item.value"></v-text-field>
                    <!-- **********************************************************************************************   -->
                         <calender v-else @update="setDate($event,props)"></calender>
                         <!-- **********************************************************************************************        -->
              </td>
            </template>
          </v-data-table>
      </v-flex>
    </v-layout> 
        <!-- table data : {{tableObj}} -->
    <v-layout justify-end>
      <!-- <v-btn class="next" @click.stop="updateStep" :loading="saveData" color="info">Save</v-btn> -->
         <v-flex xs1>
        <v-btn class="next" @click.stop="switchScreen(1)" color="primary">Previous</v-btn>
        </v-flex>
        <v-flex xs9></v-flex>
        <v-flex xs2>
        <v-btn class="next" @click.stop="updateStep" color="primary">Next</v-btn>
        </v-flex>
    </v-layout>
    </div>
  </v-container>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';
import config from '../../config.json';
import calender from '../element/calender.vue'
import {} from '../constant.js'
export default {
   components: {
    calender,
  },
  data() {
      return {
        loading: false,
        obj:{
          'menu':false,
          'date':null,
        },
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
        date:null,
        menu2:false,
        saveData:false,
      }
    },
    props: ['tableObj'],
    mounted() {
       var _this = this;
    },
    computed: {
 
    },
    watch: {
      search(val) {
         //this.querySelections(val)
      },
 
    },
    methods: {
        setDate(inputDate, props){
          console.log("Input Date"+JSON.stringify(props));
          // tableObj.storedProcedure.params
        },
        updateStep(){
            let _this = this;
            _this.saveData = true;
            _this.$emit('update-step', _this.tableObj);
            setTimeout(function(){ _this.saveData = false }, 8000);
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
    .table-data{
      vertical-align: inherit;font-size:16px;
    }
</style>
