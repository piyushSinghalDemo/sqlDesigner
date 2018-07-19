<template>
  <v-container grid-list-md style="overflow:auto">
    <div v-show="tableObj.loadProcedureList">
        <v-progress-circular indeterminate color="red"></v-progress-circular>
        <span style="color: red;font-size: 16px;">Procedure List Loading...</span>
    </div>
    <div v-show="!tableObj.loadProcedureList">
   
    <v-layout row wrap>
      <v-flex xs6  offset-xs3>
   
         <v-select :loading="loading" :items="selectTable" :search-input.sync="search"
          v-model="tableObj.storedProcedure.name" label="Select Procedure" autocomplete cache-items></v-select>  
      </v-flex>
    </v-layout> 
    <v-layout justify-end>
      <v-btn class="next" @click.stop="switchScreen(2)" color="primary">Next</v-btn>
    </v-layout>
    </div>  
  </v-container>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';
import config from '../../config.json'
import {post as postToServer} from "../methods/serverCall"
import {GET_STORED_PROCEDURE_LIST} from '../constant.js'
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
        getProcedureList(val){
            let _this = this;
            let url = config.AGENT_API_URL+GET_STORED_PROCEDURE_LIST;
            let inputJson = {
                "procedure_name": val,
                "procedure_count": _this.userInfo.table_count,
                "env_id": _this.userInfo.env_id,
                "database_name":_this.$store.state.database_name,
                "database_type":_this.$store.state.database_type,
                "schema":_this.$store.state.schema,
                "connstr":_this.$store.state.conn_str,
                "client_id":_this.userInfo.client_id
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
        // let _this = this;
        let url = config.AGENT_API_URL+GET_STORED_PROCEDURE_LIST;
        let inputJson = {
            "procedure_name": value,
            "procedure_count": _this.userInfo.table_count,
            "env_id": _this.userInfo.env_id,
            "database_name":_this.$store.state.database_name,
            "database_type":_this.$store.state.database_type,
            "schema":_this.$store.state.schema,
            "connstr":_this.$store.state.conn_str,
            "client_id":_this.userInfo.client_id
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
        // await _this.getProcedureList(value);        
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
</style>
