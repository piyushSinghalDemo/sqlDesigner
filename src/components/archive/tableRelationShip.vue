<template>
  <v-container grid-list-md>
    <div v-show="tableObj.loadTable">
        <v-progress-circular indeterminate color="red"></v-progress-circular>
        <span style="color: red;font-size: 16px;">Table Loading...</span>
    </div>
    <div v-show="!tableObj.loadTable">
    <v-layout row wrap>
      <v-flex xs6>
        <v-layout row wrap>
          <v-flex xs6>
              <v-text-field name="limit" label="Limit" v-model="tableObj.limit"></v-text-field>
          </v-flex>
          <v-flex xs6>
            <v-select :items="selectDriverTable" v-model="tableObj.relationship.driverTable" :search-input.sync="searchDriver"
              label="Select Driver Table" item-text="name" item-value="name" return-object autocomplete></v-select>
            <a class="addTable" @click.stop="addDriverTable">Add</a>
          </v-flex>
          <v-flex xs6>
             <v-checkbox v-model="tableObj.isSingleTableArchival" label="Single Table Archival" style="margin-top:8%">
             </v-checkbox>
          </v-flex>
          <v-flex xs6>
            <v-select :items="selectTable" v-if="tableObj.isSingleTableArchival" v-model="tableObj.relationship.selectedTable" :loading="loading" :search-input.sync="search"
               label="Select Table" item-text="name" item-value="name" return-object autocomplete></v-select>
                  <!-- tableObj.allBussinessObject: {{tableObj.allBussinessObject}} -->
             <v-select :items="selectBussinessObject" v-else v-model="tableObj.relationship.bussinessObject"
               label="Bussiness Object" item-text="name" item-value="name" return-object autocomplete></v-select>   
             <a class="addTable" v-if="tableObj.isSingleTableArchival" @click.stop="addTable">Add Object</a>
             <a class="addTable" v-else @click.stop="addBussinessObject">Add Object</a>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs6>
        <!-- {{tableObj.relationship.selectedTableArray}} -->
        <div class="panel panel-success" v-show="tableObj.relationship.selectedTableArray.length">
          <div class="panel-heading">Selected Table</div>
          <div class="panel-body">
            <v-layout row wrap>
              <v-flex style="margin-right:5px;" v-for="(object, index) in tableObj.relationship.selectedTableArray" :key="index">
                <span style="cursor:pointer" class="badge" @click.stop="updateJoin(object)">{{object.tableName}}</span>
              </v-flex>
            </v-layout>
          </div>
        </div>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-show="tableObj.relationshipArray.length">
      <v-flex>
        <b>From Table</b>
      </v-flex>
      <v-flex>
        <b>Join</b>
      </v-flex>
      <v-flex>
        <b>To Table</b>
      </v-flex>
    </v-layout>
    <v-expansion-panel expand>
      <!-- tableObj.relationshipArray : {{tableObj.relationshipArray}} -->
      <v-expansion-panel-content v-for="(item,i) in tableObj.relationshipArray" :key="i">
        <div slot="header">
          <v-layout row wrap>
            <v-flex>{{item.relationship ? item.relationship.fromTable.tableName : ""}}</v-flex>
            <v-flex>{{item.relationship ? item.relationship.selectedFilter : ""}}</v-flex>
            <v-flex>{{item.relationship ? item.relationship.toTable.tableName : ""}}</v-flex>
          </v-layout>
        </div>
        <v-card>
          <v-card-text class="grey lighten-3">
            <v-layout row wrap>
              <v-flex>
                <b>From Column</b>
              </v-flex>
              <v-flex>
                <b>Operator</b>
              </v-flex>
              <v-flex>
                <b>To Column</b>
              </v-flex>
            </v-layout>
            <v-layout row wrap v-for="(column, index) in item.colArray" :key="index">
              <v-flex>{{column.fromColumn.name}}</v-flex>
              <v-flex>{{column.operator}}</v-flex>
              <v-flex>{{column.toColumn.name}}</v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-layout justify-end>
      <v-btn class="next" :loading="saveData" @click.stop="updateStep" color="info">Save</v-btn>
    </v-layout>
    </div>
  </v-container>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';
import union from 'lodash/union'
import config from '../../config.json';
import { post as postToServer } from '../methods/serverCall'
import {GET_TABLES, GET_ALL_COLUMN, PREVIOUS_STEPS, DRIVER_TABLE, DATABASE_TABLE, BUSSINESS_OBJECT} from '../constant.js'
export default {
  data() {
      return {
        loading: false,
        search: null,
        searchDriver:null,
        allTables:[],
        saveData:false,
        isDriverTable:false,
        allArchiveTablesCopy:[],
        createCopy : false,
        allDbTablesCopy : [],
        createTableCopy : false,
        // conn_str:this.$store.state.conn_str,
        // schema :_this.$store.state.schema,
      }
    },
    props: ['tableObj'],
    computed: {
       selectBussinessObject() {
         let _this = this;
         console.log("Data: " + JSON.stringify(_this.tableObj.allBussinessObject));
        return _this.tableObj.allBussinessObject; //allArchiveTables
      },
       selectTable() {
         let _this = this;
        return _this.tableObj.allArchiveTables; //allArchiveTables
      },
      selectDriverTable() {
         let _this = this;
        return union(_this.tableObj.allDbTables, _this.tableObj.allPrevStepTables);//_this.tableObj.allDbTables;
      },
      conn_str(){
        return this.$store.state.conn_str;
      },
      schema(){
        return this.$store.state.schema;
      }
    },
    watch: {
      search(val) {
         this.queryTableSelections(val)
      },
      searchDriver(val) {
         this.querySelections(val)
      }
    },
    methods: {
        updateStep(){
          let _this = this;
          _this.saveData = true;
          _this.$emit('update-step', _this.tableObj);
          setTimeout(function(){ _this.saveData = false }, 8000);
        },
        addDriverTable(){
          let _this = this;
        
          let obj = {'tableName':cloneDeep(_this.tableObj.relationship.driverTable.name),
                   'aliesTableName':cloneDeep(_this.tableObj.relationship.driverTable.name + _this.$store.state.aliesCounter++),
                   'group':DRIVER_TABLE, 'stepId':_this.tableObj.relationship.driverTable.stepId}
           _this.tableObj.relationship.driverTable.aliesTableName = obj.aliesTableName;         
           if(!_this.tableObj.relationship.selectedTableArray.find(o => o.group && o.group == DRIVER_TABLE))        
            _this.tableObj.relationship.selectedTableArray.push(cloneDeep(obj));
            _this.isDriverTable = true;
            // _this.tableObj.relationship.driverTable.columns
            if(_this.tableObj.relationship.driverTable.stepId == PREVIOUS_STEPS){
              obj.columns = _this.tableObj.relationship.driverTable.columns;
              _this.getPrevStepCol(cloneDeep(obj));
            }else{
              _this.getColumn(obj);
            }            
        },
        updateJoin(object){
          let _this = this;
            _this.$emit('update-join', object);
        },
      switchScreen(num) {
        let _this = this;
        _this.$emit('update-object', [_this.tableObj, num]);
      },
      querySelections(value) {

        let _this = this;
       // this search will work only on every third character
        if (value && value.length % 3 !== 0) {
          return
        }
        // if search input is blank, It will load all previous tables
        if(!value && _this.createCopy){
          _this.tableObj.allDbTables = cloneDeep(_this.allDbTablesCopy); 
          return;
        }
        if(!value && !_this.createCopy){
          return;
        }
        //Firstly It will search data in current list   
        let found = false;
        _this.tableObj.allDbTables.map((obj, index)=>{
          if(obj.name.indexOf(value)!== -1){
            found = true;  
          }
        });
        if(found){
          return;
        }else{
        if(!_this.createCopy){
          // _this.tableObj.allDbTables = _this.allDbTablesCopy
           _this.allDbTablesCopy = cloneDeep(_this.tableObj.allDbTables);
          _this.createCopy = true;
          }
        this.loading = true;
        let url = config.AGENT_API_URL+GET_TABLES//'http://192.168.1.100:8010/get_tables';
        let conn_str=_this.$store.state.conn_str;
        let schema =_this.$store.state.schema;
        let userData= JSON.parse(sessionStorage.getItem("userInfo"));
        let inputJson = {
          "conn_str": conn_str,
          "schema":schema,
          "table_name": value,
          "table_count":userData.table_count,
          "client_id":userData.client_id
        }
        postToServer(this, url, inputJson).then(response=>{  
          // _this.tableObj.allDbTables= [];
          let tableList = response.table_name_list;
          let dummyTableList=[];
          if(tableList.length){
              tableList.map(function(obj, index){
              let tempObj = {name: obj, stepId:'Database Table'}
              dummyTableList.push(cloneDeep(tempObj));   
            });
          }
          this.loading = false;
         // debugger;
          _this.tableObj.allDbTables = dummyTableList;
          // console.log("Response from all tables" + JSON.stringify(response));
        }, response => {}).catch(e => {
          console.log(e)
          this.loading = false;
          _this.$toaster.error('Something went wrong...')
        })
        }
      },
      queryTableSelections(value) {
        let _this = this;
       // this search will work only on every third character
        if (value && value.length % 3 !== 0) {
          return
        }
        // if search input is blank, It will load all previous tables
        if(!value && _this.createTableCopy){
          _this.tableObj.allArchiveTables = cloneDeep(_this.allArchiveTablesCopy); 
          return;
        }
         // if search input is blank, It will load all previous tables
        if(!value && !_this.createTableCopy){
          // _this.tableObj.allArchiveTables = cloneDeep(_this.allArchiveTablesCopy); 
          return;
        }
        //Firstly It will search data in current list   
        let found = false;
        _this.tableObj.allArchiveTables.map((obj, index)=>{
          if(obj.name.indexOf(value)!== -1){
            found = true;  
          }
        });
        if(found){
          return;
        }else{
        if(!_this.createTableCopy){
          // _this.tableObj.allArchiveTables = _this.allArchiveTablesCopy
           _this.allArchiveTablesCopy = cloneDeep(_this.tableObj.allArchiveTables);
          _this.createTableCopy = true;
          }
        this.loading = true;
        let url = config.AGENT_API_URL+GET_TABLES//'http://192.168.1.100:8010/get_tables';
        let conn_str=_this.$store.state.conn_str;
        let schema =_this.$store.state.schema;
        let userData = JSON.parse(sessionStorage.getItem("userInfo"));
        let inputJson = {
          "conn_str": conn_str,
          "schema":schema,
          "table_name": value,
          "table_count":userData.table_count,
          "client_id":userData.client_id
        }
        postToServer(this, url, inputJson).then(response=>{
          // _this.tableObj.allArchiveTables= [];
          let tableList = response.table_name_list;
          let dummyTableList=[];
          if(tableList.length){
              tableList.map(function(obj, index){
              let tempObj = {name: obj, stepId:DATABASE_TABLE}
              dummyTableList.push(cloneDeep(tempObj));   
            });
          }
          this.loading = false;
         // debugger;
          _this.tableObj.allArchiveTables = dummyTableList;
          // console.log("Response from all tables" + JSON.stringify(response));
        }, response => {}).catch(e => {
          console.log(e)
          this.loading = false;
          _this.$toaster.error('Something went wrong...')
        })
        }
      },
    addTable(){
      // alert("Click Working");
      let validFlag=true;
      let _this = this;
      // console.log("Demo "+JSON.stringify(_this.demo));
      _this.tableObj.relationship.selectedTableArray.map(function(obj, index){
        if(obj.tableName == _this.tableObj.relationship.selectedTable.name){
           validFlag = false;
          _this.$toaster.error('Table Already Exist')
        }
      });
      if(validFlag){
        let tempName = _this.tableObj.relationship.selectedTable.name.split(" ");
        let tableName = tempName.join("");
        let obj = {'tableName':cloneDeep(_this.tableObj.relationship.selectedTable.name),
                   'aliesTableName':cloneDeep(tableName + _this.$store.state.aliesCounter++),
                   'group':'Database Table','stepId':_this.tableObj.relationship.selectedTable.stepId}
        _this.tableObj.relationship.selectedTableArray.push(cloneDeep(obj));
        if(_this.tableObj.relationship.selectedTable.stepId == PREVIOUS_STEPS){
           obj.columns = _this.tableObj.relationship.selectedTable.columns;
          _this.getPrevStepCol(cloneDeep(obj));
        }else{
          _this.getColumn(obj);
        }
         _this.$toaster.success('Table Added Successfully'); 
      }
    },
    // get
     addBussinessObject(){
      let validFlag=true;
      let _this = this,
          arrayIndex=-1;
      // console.log("Demo "+JSON.stringify(_this.demo));
      // debugger;
      _this.tableObj.relationship.selectedTableArray.map(function(obj, index){
        if(obj.group == _this.tableObj.relationship.bussinessObject.group){
           arrayIndex = index;
        }
      }); //bussinessObject
      // let obj = {'tableName':cloneDeep(_this.tableObj.relationship.selectedTable.name),
      //              'aliesTableName':cloneDeep(tableName + _this.$store.state.aliesCounter++),
      //              'group':BUSSINESS_OBJECT}
        // let tempName = _this.tableObj.relationship.selectedTable.name.split(" ");
        // let tableName = tempName.join("");
        _this.tableObj.relationship.bussinessObject.tableName = cloneDeep(_this.tableObj.relationship.bussinessObject.name);
        _this.tableObj.relationship.bussinessObject.aliesTableName = cloneDeep(_this.tableObj.relationship.bussinessObject.name + _this.$store.state.aliesCounter++);        
        _this.tableObj.relationship.bussinessObject.group = BUSSINESS_OBJECT;
        if(arrayIndex>=0)
        _this.tableObj.relationship.selectedTableArray[arrayIndex] = cloneDeep(_this.tableObj.relationship.bussinessObject);
        else
        _this.tableObj.relationship.selectedTableArray.push(cloneDeep(_this.tableObj.relationship.bussinessObject));
        _this.getBussinessObjectColumn(_this.tableObj.relationship.bussinessObject);
        _this.$toaster.success('Table Added Successfully'); 
    },
    getPrevStepCol(object){
      let _this = this;
      if(_this.tableObj.optionColumn.length){
        _this.tableObj.optionColumn.push({ divider: true });
      }
          let headerObj = { header: object.tableName};
          _this.tableObj.optionColumn.push(cloneDeep(headerObj));
          let allColumn = object.columns;
          allColumn.map(function(obj, index){
             let columnObj ={}; 
             if(obj.colAlies)
             columnObj = {name: obj.colAlies,value:object.tableName+'-'+obj.colAlies, group: object.tableName, fixed: false, 
                               tblAlies:object.aliesTableName, colAlies: ''};
             else
             columnObj = {name: obj.name,value:object.tableName+'-'+obj.name, group: object.tableName, fixed: false, 
                               tblAlies:object.aliesTableName, colAlies: ''};                    
            _this.tableObj.optionColumn.push(cloneDeep(columnObj));
            _this.tableObj.availableColumn.push(cloneDeep(columnObj));
            //For orderBy need saprate driver table column
            if(object.group == DRIVER_TABLE){
              columnObj.decending = false;
              _this.tableObj.archive.driverTable.columns.push(cloneDeep(columnObj));
            }
          });
         _this.tableObj.is_drv_table = true;  
    },
    getBussinessObjectColumn(object){
      let _this = this;
      if(_this.tableObj.optionColumn.length){
        _this.tableObj.optionColumn.push({ divider: true });
      }
      let headerObj = { header: object.tableName};
      _this.tableObj.optionColumn.push(cloneDeep(headerObj));
      object.unique_identifiers.map(function(col, index){
        let columnObj = {name: col,value:object.tableName+'-'+col, group: object.tableName, fixed: false, 
                               tblAlies:object.aliesTableName, colAlies: ''};
      _this.tableObj.optionColumn.push(cloneDeep(columnObj));                         
      _this.tableObj.availableColumn.push(cloneDeep(columnObj));
      });
    },
    getColumn(tableObject){
      let _this = this;
      let url = config.AGENT_API_URL+GET_ALL_COLUMN;//'http://192.168.1.100:8010/get_all_columns';
       let userData= JSON.parse(sessionStorage.getItem("userInfo"));
        let inputJson = {
               "conn_str": _this.conn_str,
               "env_id":userData.env_id,
               "schema": _this.schema,
               "dest_queue": "test",
               "table_name": tableObject.tableName,
               "client_id":userData.client_id
            }
        postToServer(this, url, inputJson).then(response=>{  
          if(_this.tableObj.optionColumn.length){
            _this.tableObj.optionColumn.push({ divider: true });
          }
          let headerObj = { header: tableObject.tableName};
          _this.tableObj.optionColumn.push(cloneDeep(headerObj));
          let allColumn = response;
          allColumn.map(function(obj, index){
             let columnObj = {name: obj,value:tableObject.tableName+'-'+obj, group: tableObject.tableName, fixed: false, 
                               tblAlies:tableObject.aliesTableName, colAlies: ''};
            _this.tableObj.optionColumn.push(cloneDeep(columnObj));
            _this.tableObj.availableColumn.push(cloneDeep(columnObj));
            
            if(tableObject.group == DRIVER_TABLE){
              columnObj.decending = false;
            _this.tableObj.archive.driverTable.columns.push(cloneDeep(columnObj));
            }
          });
          // console.log("Response from all tables"+JSON.stringify(response));
        },response => {}).catch(e => {
              console.log(e)
            this.ErrorMessage = 'Something went wrong.'
      })
    
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
    .addTable{
        position: relative;
        top: -49px;
        right: -74%;
        font-size: 16px;
        background: white;
    }
</style>
