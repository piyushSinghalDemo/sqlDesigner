<template>
  <v-container grid-list-md>
    <ul>
      <li @click.stop="switchScreen(1)" :class="{chevron:true, chevron_active:true}">Procedure List</li>
      <li @click.stop="switchScreen(2)" :class="{chevron:true}">Parameter</li>
      <!-- <li @click.stop="switchScreen(3)" :class="{chevron:true}">Worktable Output</li> -->
    </ul>
    <v-layout row wrap>
      <v-flex xs6  offset-xs3>
        <v-select :items="selectTable" v-model="tableObj.storedProcedure.name" :loading="loading"
          :search-input.sync="search" @change="getParameter"
           label="Select Procedure"  cache-items item-text="name" autocomplete></v-select>
      </v-flex>
    </v-layout> 
        <!-- table data : {{tableObj}} -->
    <v-layout justify-end>
      <v-btn class="next" @click.stop="switchScreen(2)" color="info">Next</v-btn>
    </v-layout>
  </v-container>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';
import config from '../../config.json'
import {post as postToServer} from "../methods/serverCall"
export default {
  data() {
      return {
        loading: false,
        search: null,
        allTables:[],
        createCopy : false,
        allDbTablesCopy : [],
        // selectTable:[],
        CopyList:[],
        userInfo:"",
        database_type:"",
        schema:"",
        database_name:"",
        connstr:""
      }
    },
    props: ['tableObj'],
    mounted() {
       var _this = this;
           _this.userInfo =JSON.parse(sessionStorage.getItem("userInfo"));
        //    debugger;
          //  _this.getProcedureList(); 
    },
    computed: {
       selectTable() {
        let _this = this;
        return _this.tableObj.storedProcedure.procedureList;//_this.tableObj.allDbTables;
      }
    },
    watch: {
      
      search(val) {
         val && this.querySelections(val)
      },
      tableObj(newVal){
        // debugger;
        console.log("newVal"+JSON.stringify(newVal));
        console.log(this.tableObj);
        // debugger;
        if(newVal.storedProcedure.name)
            this.getProcedureList();
      }
    },
    methods: {
      getParameter(newValue){
        let _this = this;
        let inputJson = {
                "procedure_name": newValue,
                "datasource_id": _this.userInfo.datasource_id,
                "database_name":_this.$store.state.database_name,
                "database_type":_this.$store.state.database_type,
                "schema":_this.$store.state.schema,
                "connstr":_this.$store.state.conn_str
        };
        let url = config.PROCEDURE_LIST+"get_stored_procedure_param";
        postToServer(this, url, inputJson).then(paramResponse => {
          _this.tableObj.storedProcedure.params = paramResponse.result;
        });
      },
        getProcedureList(val){
            let _this = this;
            let url = config.PROCEDURE_LIST+"get_stored_procedure_list";
            let inputJson = {
                "procedure_name": val,
                "procedure_count": _this.userInfo.table_count,
                "datasource_id": _this.userInfo.datasource_id,
                "database_name":_this.$store.state.database_name,
                "database_type":_this.$store.state.database_type,
                "schema":_this.$store.state.schema,
                "connstr":_this.$store.state.conn_str
            };
            postToServer(this, url, inputJson).then(listResponse => {
                 console.log("listResponse"+JSON.stringify(listResponse));
                 this.loading = false;
                _this.$store.state.database_name = listResponse.database_name;
                _this.$store.state.database_type = listResponse.database_type;
                _this.$store.state.schema = listResponse.schema;
                _this.tableObj.storedProcedure.procedureList = listResponse.result;
                _this.$store.state.conn_str = listResponse.connstr;
            });
        },
        updateJoin(){
            let _this = this;
            _this.$emit('update-join');
        },
      switchScreen(num) {
        let _this = this;
        _this.$emit('update-object', [_this.tableObj, num]);
      },
      async querySelections(value) {
        let _this = this;
        this.loading = true;
        await _this.getProcedureList(value);        
      },
    // addTable(){
    //   let validFlag=true;
    //   let _this = this;
    //   console.log("Demo "+JSON.stringify(_this.demo));
    //   _this.tableObj.relationship.selectedTableArray.map(function(obj, index){
    //     if(obj.tableName == _this.tableObj.relationship.selectedTable.name){
    //       validFlag = false;
    //       _this.$toaster.error('Table Already Exist')
    //     }
    //   });
    //   if(validFlag){
    //     let tempName = _this.tableObj.relationship.selectedTable.name.split(" ");
    //     let tableName = tempName.join("");
    //     let obj = {'tableName':cloneDeep(_this.tableObj.relationship.selectedTable.name),
    //                'aliesTableName':cloneDeep(tableName + _this.$store.state.aliesCounter++),
    //                'stepId':_this.tableObj.relationship.selectedTable.stepId}
    //     _this.tableObj.relationship.selectedTableArray.push(cloneDeep(obj));
    //     if(_this.tableObj.relationship.selectedTable.stepId == 'Previous Steps'){           
    //        obj.columns = _this.tableObj.relationship.selectedTable.columns;
    //       _this.getPrevStepCol(cloneDeep(obj));
    //     }else{
    //       // obj.is_drv_table = false;
    //       _this.getColumn(obj);
    //     }
    //      _this.$toaster.success('Table Added Successfully'); 
    //   }
    // },
    // getPrevStepCol(object){
    //   let _this = this;
    //   if(_this.tableObj.optionColumn.length){
    //     _this.tableObj.optionColumn.push({ divider: true });
    //   }
    //       let headerObj = { header: object.tableName};
    //       _this.tableObj.optionColumn.push(cloneDeep(headerObj));
    //       let allColumn = object.columns;
    //       allColumn.map(function(obj, index){
    //        let columnObj = { name: obj.colAlies, group: object.tableName, fixed: false, 
    //                            tblAlies:object.aliesTableName, colAlies: obj.colAlies+_this.$store.state.aliesCounter++}; 
    //         // obj.group = object.tableName;
    //         _this.tableObj.is_drv_table = true;
    //         //  obj.tblAlies = object.aliesTableName;
    //         _this.tableObj.optionColumn.push(cloneDeep(columnObj));
    //       });
    // },
    // getColumn(tableObject){
    //   let _this = this;
    //   let url = config.GET_DATA_URL+'get_all_columns'; //'http://192.168.1.100:8010/get_all_columns';
    //   let inputJson = {
    //            "conn_str": _this.conn_str,
    //            "schema": _this.schema,
    //            "dest_queue": "test",
    //            "table_name": tableObject.tableName
    //   }
    //   _this.$http.post(url, inputJson, {
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    //     }).then(response => {
    //       if(_this.tableObj.optionColumn.length){
    //         _this.tableObj.optionColumn.push({ divider: true });
    //       }
    //       let headerObj = { header: tableObject.tableName};
    //       _this.tableObj.optionColumn.push(cloneDeep(headerObj));
    //       let allColumn = JSON.parse(response.bodyText);
    //       allColumn.map(function(obj, index){
    //          let columnObj = { name: obj, group: tableObject.tableName, fixed: false, 
    //                            tblAlies:tableObject.aliesTableName, colAlies: obj+_this.$store.state.aliesCounter++};
    //         _this.tableObj.optionColumn.push(cloneDeep(columnObj));
    //       });
    //       console.log("Response from all tables"+JSON.stringify(response));
    //     },response => {}).catch(e => {
    //           console.log(e)
    //         this.ErrorMessage = 'Something went wrong.'
    //   })
    
    // },
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
</style>
