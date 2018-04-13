<template>
  <v-container grid-list-md>
    <ul>
      <!-- <li @click.stop="switchScreen(1)" :class="{chevron:true, chevron_active:true}">Table Relationship</li> -->
      <!-- <li @click.stop="switchScreen(2)" :class="{chevron:true}">Criteria</li> -->
      <!-- <li @click.stop="switchScreen(3)" :class="{chevron:true}">Worktable Output</li> -->
    </ul>
    <v-layout row wrap>
      <v-flex xs3>
        <!-- {{tableObj.relationship.driverTable}} -->
        <v-select :items="selectDriverTable" v-model="tableObj.relationship.driverTable" :search-input.sync="searchDriver"
          cache-items label="Select Driver Table" item-text="name" item-value="name + group" autocomplete></v-select>
          <a class="addTable" @click.stop="addDriverTable">Add</a>
        <!-- <v-btn color="info" @click.native="addTable">Add</v-btn> -->
      </v-flex>
      <v-flex xs3>
        <v-select :items="selectTable" v-model="tableObj.relationship.selectedTable" :loading="loading" :search-input.sync="search"
          cache-items label="Select Table" item-text="name" item-value="name + group" autocomplete></v-select>
        <!-- <v-btn color="info" @click.native="addTable" style="position:absolute">Add</v-btn> -->
        <a class="addTable" @click.stop="addTable">Add Table</a>
      </v-flex>
      <v-flex xs6>
        <div class="panel panel-success" v-show="tableObj.relationship.selectedTableArray.length">
          <div class="panel-heading">Selected Table</div>
          <div class="panel-body">
            <v-layout row wrap>
              <v-flex style="margin-right:5px;" v-for="(object, index) in tableObj.relationship.selectedTableArray" :key="index">
                <span style="cursor:pointer" class="badge" @click.stop="updateJoin">{{object.tableName}}</span>
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
      <v-expansion-panel-content v-for="(item,i) in tableObj.relationshipArray" :key="i">
        <div slot="header">
          <v-layout row wrap>
            <v-flex>{{item.relationship.fromTable.tableName}}</v-flex>
            <v-flex>{{item.relationship.selectedFilter}}</v-flex>
            <v-flex>{{item.relationship.toTable.tableName}}</v-flex>
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
  </v-container>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';
export default {
  data() {
      return {
        loading: false,
        search: null,
        searchDriver:null,
        allTables:[],
        saveData:false,
      }
    },
    props: ['tableObj'],
    computed: {
       selectTable() {
         let _this = this;
        return _this.tableObj.allArchiveTables;//allArchiveTables
      },
      selectDriverTable() {
         let _this = this;
        return _this.tableObj.allDbTables;
      },
    },
    watch: {
      search(val) {
        val && this.querySelections(val)
      },
      searchDriver(val) {
        //val && this.querySelections(val)
      }
    },
    methods: {
        updateStep(){
          let _this = this;
          _this.saveData = true;
          _this.$emit('update-step', _this.tableObj);
          setTimeout(function(){ _this.saveData = false }, 2000);
        },
        addDriverTable(){
          let _this = this;
          let obj = {'tableName':cloneDeep(_this.tableObj.relationship.driverTable.name),
                   'aliesTableName':cloneDeep(_this.tableObj.relationship.driverTable.name + _this.$store.state.aliesCounter++),
                   'group':'Driver Table', 'stepId':_this.tableObj.relationship.driverTable.stepId}
           _this.tableObj.relationship.driverTable.aliesTableName = obj.aliesTableName;         
           if(!_this.tableObj.relationship.selectedTableArray.find(o => o.group && o.group == 'Driver Table'))        
            _this.tableObj.relationship.selectedTableArray.push(cloneDeep(obj));
            if(_this.tableObj.relationship.driverTable.stepId == 'Previous Steps'){
              obj.columns = _this.tableObj.relationship.driverTable.columns;
              _this.getPrevStepCol(cloneDeep(obj));
            }else{
              _this.getColumn(obj);
            }            
        },
        updateJoin(){
          let _this = this;
            _this.$emit('update-join');
        },
      switchScreen(num) {
        let _this = this;
        _this.$emit('update-object', [_this.tableObj, num]);
      },
      querySelections(value) {
        if (value.length % 3 !== 0) {
          return
        }
        this.loading = true;
        let _this = this;
        let url = 'http://192.168.1.100:8010/get_tables';
        let inputJson = {
          "conn_str": "mssql://archivist:archivist@192.168.1.143:1433/demoAgent?driver=ODBC Driver 17 for SQL Server&; odbc_options='TDS_Version=7.2'",
          "dest_queue": "test",
          "table_name": value
        }
        this.$http.post(url, inputJson, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => {
          _this.allTables= [];
          _this.$store.state.allDbTables = JSON.parse(response.bodyText);
          if(this.$store.state.allDbTables.length){
              let headerObj = { header: 'Database Table'};
              _this.allTables.push(cloneDeep(headerObj));
              this.$store.state.allDbTables.map(function(obj, index){
              let tempObj = {name: obj, stepId:'Database Table'}
              _this.allTables.push(cloneDeep(tempObj));   
            });
          }
         if(_this.tableObj.previousSteps.length){
           _this.allTables.push({ divider: true });
          let headerObj = { header: 'Previous Steps'};
           _this.allTables.push(cloneDeep(headerObj));
           _this.tableObj.previousSteps.map(function(obj, index){
             let prevObj = {'name':obj.name, 'columns':obj.selectedColumns, stepId:'Previous Steps'};
             _this.allTables.push(cloneDeep(prevObj));
          }); 
         }
          this.loading = false;
          console.log("Response from all tables" + JSON.stringify(response));
        }, response => {}).catch(e => {
          console.log(e)
          this.loading = false;
          _this.$toaster.error('Something went wrong...')
        })
      },
    addTable(){
      // alert("Click Working");
      let validFlag=true;
      let _this = this;
      console.log("Demo "+JSON.stringify(_this.demo));
      _this.tableObj.relationship.selectedTableArray.map(function(obj, index){
        if(obj.tableName == _this.tableObj.relationship.selectedTable.name){
           validFlag = false;
          _this.$toaster.error('Table Already Exist')
        }
      });
      debugger;
      if(validFlag){
        let obj = {'tableName':cloneDeep(_this.tableObj.relationship.selectedTable.name),
                   'aliesTableName':cloneDeep(_this.tableObj.relationship.selectedTable.name + _this.$store.state.aliesCounter++),
                   'group':'Database Table','stepId':_this.tableObj.relationship.selectedTable.stepId}
        _this.tableObj.relationship.selectedTableArray.push(cloneDeep(obj));
        if(_this.tableObj.relationship.selectedTable.stepId == 'Previous Steps'){
           obj.columns = _this.tableObj.relationship.selectedTable.columns;
          _this.getPrevStepCol(cloneDeep(obj));
        }else{
          _this.getColumn(obj);
        }
         _this.$toaster.success('Table Added Successfully'); 
      }
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
            obj.group = object.tableName;
            obj.tblAlies = object.aliesTableName;
            _this.tableObj.optionColumn.push(cloneDeep(obj));
          });
         _this.tableObj.is_drv_table = true;  
    },
    getColumn(tableObject){
      let _this = this;
      let url = 'http://192.168.1.100:8010/get_all_columns';
      let inputJson = {
               "conn_str": "mssql://archivist:archivist@192.168.1.143:1433/demoAgent?driver=ODBC Driver 17 for SQL Server&; odbc_options='TDS_Version=7.2'",
               "dest_queue": "test",
               "table_name": tableObject.tableName
      }
      _this.$http.post(url, inputJson, {
      headers: {
        'Content-Type': 'application/json'
      }
        }).then(response => {
          if(_this.tableObj.optionColumn.length){
            _this.tableObj.optionColumn.push({ divider: true });
          }
          let headerObj = { header: tableObject.tableName};
          _this.tableObj.optionColumn.push(cloneDeep(headerObj));
          let allColumn = JSON.parse(response.bodyText);
          allColumn.map(function(obj, index){
             let columnObj = { name: obj, group: tableObject.tableName, fixed: false, 
                               tblAlies:tableObject.aliesTableName, colAlies: obj+_this.$store.state.aliesCounter++};
            _this.tableObj.optionColumn.push(cloneDeep(columnObj));
          });
          console.log("Response from all tables"+JSON.stringify(response));
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
