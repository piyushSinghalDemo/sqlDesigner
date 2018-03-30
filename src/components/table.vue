<template lang="html">
  <div class="">
    <v-layout row justify-center>
      <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay="false" scrollable>
        <v-card tile style="height:650px">
          <!-- ******************************Start ************************************* -->
          <v-toolbar card dark color="primary" app :clipped-left="$vuetify.breakpoint.mdAndUp" fixed>
            <v-spacer></v-spacer>
            <v-toolbar-title >Close</v-toolbar-title>
              <v-btn icon @click.native="closeDialog" dark>
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-content>
            <v-container grid-list-lg>
              <v-layout>
<!-- ************************************************************************************************************************** -->
                <v-flex d-flex xs12>
                 <div class="form-views" v-show="progressbar == 1" style="width:100%;margin-left:3%;height:500px">
                    <ul>
                      <li @click.stop="nextScreen(1)" :class="{chevron:true,chevron_active:progressbar == 1}">Table Relationship</li>
                      <li @click.stop="nextScreen(2)" :class="{chevron:true,chevron_active:progressbar == 2}">Criteria</li>
                      <li @click.stop="nextScreen(3)" :class="{chevron:true,chevron_active:progressbar == 3}">Worktable Output</li>
                    </ul>
                    <v-layout row wrap>
                      <v-flex xs6>
                        <v-select :items="selectTable" v-model="tableObj.relationship.selectedTable" :loading="loading" 
                          :search-input.sync="search" cache-items label="Select Table" autocomplete></v-select>
                        <v-btn color="info" @click.native="addTable">Add</v-btn>
                      </v-flex>
                      <v-flex xs6> 
                            <div class="panel panel-success" v-show="tableObj.relationship.selectedTableArray.length">
                              <div class="panel-heading">Selected Table</div>
                              <div class="panel-body">
                                <v-layout row wrap>
                                  <v-flex style="margin-right:5px;" v-for="object in tableObj.relationship.selectedTableArray">
                                    <span style="cursor:pointer" class="badge" @click.stop="dialog2=true">{{object.tableName}}</span>
                                  </v-flex>
                                </v-layout>
                              </div>
                            </div> 
                      </v-flex>  
                    </v-layout>
                    <v-layout row wrap v-show="tableObj.relationshipArray.length">
                      <v-flex><b>From Table</b></v-flex>
                      <v-flex><b>Join</b></v-flex>
                      <v-flex><b>To Table</b></v-flex>
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
                          <v-layout row wrap >
                            <v-flex><b>From Column</b></v-flex>
                            <v-flex><b>Operator</b></v-flex>
                            <v-flex><b>To Column</b></v-flex>
                          </v-layout>
                          <v-layout row wrap v-for="column in item.colArray">
                            <v-flex>{{column.fromColumn.name}}</v-flex>
                            <v-flex>{{column.operator}}</v-flex>
                            <v-flex>{{column.toColumn.name}}</v-flex>
                          </v-layout>
                          </v-card-text>
                        </v-card>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-layout justify-end>
                              <v-btn class="next" @click.stop="nextScreen(2)" color="info">Next</v-btn>
                    </v-layout>      
                  </div>
                   <div class="form-views" v-show="progressbar == 2" style="width:100%;margin-left:3%;height:500px">
                     <ul>
                      <li @click.stop="nextScreen(1)" :class="{chevron:true,chevron_active:progressbar == 1}">Table Relationship</li>
                      <li @click.stop="nextScreen(2)" :class="{chevron:true,chevron_active:progressbar == 2}">Criteria</li>
                      <li @click.stop="nextScreen(3)" :class="{chevron:true,chevron_active:progressbar == 3}">Worktable Output</li>
                    </ul>
                     <!-- <h1>screen2</h1> -->
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
                     <v-layout v-for="(obj,index) in tableObj.criteriaArray">
                      <v-flex xs2>
                       <v-select :items="openbrsisArray" single-line label="Select Parenthisis" 
                            v-model="obj.openbrsis"></v-select> 
                      </v-flex>
                      <v-flex xs1>
                        <v-select :items="functionArray" single-line label="Select Function" 
                            v-model="obj.function"></v-select> 
                      </v-flex>  
                      <v-flex xs1>
                        <v-select label="Select Column" :items="tableObj.optionColumn" v-model="obj.column"
                           item-text="name" single-line item-value="name + tblAlies"></v-select> 
                      </v-flex>  
                      <v-flex xs1>
                        <v-select :items="relOperatorArray" single-line label="Select Operator" v-model="obj.relOperator">
                        </v-select>
                      </v-flex>  
                      <v-flex xs2>
                        <v-select :items="valueTypeArray" single-line label="Select ValueType" v-model="obj.valueType">
                        </v-select> 
                      </v-flex>
                      <v-flex xs2>
                         <v-text-field name="input-1" v-show="obj.valueType == 'value' || obj.valueType == ''"
                          single-line label="Label Text" v-model="obj.value"></v-text-field>

                         <v-menu ref="menu" lazy :close-on-content-click="false" v-show="obj.valueType == 'date'"
                          v-model="obj.menu" transition="scale-transition" offset-y full-width :nudge-right="40" 
                            min-width="290px" :return-value.sync="obj.date">
                          <v-text-field slot="activator" label="Picker in menu" v-model="obj.date" prepend-icon="event" readonly ></v-text-field>
                          <v-date-picker v-model="obj.date" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                          </v-date-picker>
                        </v-menu>

                        <v-select :items="tableObj.optionColumn" single-line label="Select Column" v-show="obj.valueType == 'field'"
                             v-model="obj.field" item-text="name"  item-value="name + tblAlies"></v-select> 
                      </v-flex>  
                      <v-flex xs2>
                        <v-select :items="closebrsisArray" single-line label="Select Parenthisis" v-model="obj.closebrsis">
                        </v-select> 
                      </v-flex>
                      <v-flex xs1>
                        <toggle-button v-show="obj.showLogicalOperator" :width=80 :height=30 :value="obj.logOperator" v-model="obj.logOperator" 
                          :labels="{checked: 'AND', unchecked: 'OR'}" style="margin-top:12%" :sync="true"/>
                          <div v-show="!obj.showLogicalOperator">
                            <i class="fa fa-plus criteria-opr" @click.stop="addCriteria()" aria-hidden="true"></i>
                            <span class="ft-30">|</span>
                            <i class="fa fa-trash criteria-opr" @click.stop="deleteCriteria(index)" aria-hidden="true"></i>
                          </div>                          
                      </v-flex>  
                     </v-layout>
                     <v-layout row>
                       <v-flex xs1>
                              <v-btn class="next" @click.stop="previousScreen(1)" color="info">Previous</v-btn>
                       </v-flex>
                       <v-flex xs10></v-flex>
                       <v-flex xs1>
                              <v-btn class="next" @click.stop="nextScreen(3)" color="info">Next</v-btn>
                       </v-flex>
                     </v-layout>
                   </div>
                   <div class="form-views" v-show="progressbar == 3" style="width:100%;margin-left:3%;height:500px">
                      <ul>
                        <li @click.stop="nextScreen(1)" :class="{chevron:true,chevron_active:progressbar == 1}">Table Relationship</li>
                        <li @click.stop="nextScreen(2)" :class="{chevron:true,chevron_active:progressbar == 2}">Criteria</li>
                        <li @click.stop="nextScreen(3)" :class="{chevron:true,chevron_active:progressbar == 3}">Worktable Output</li>
                      </ul>
                        
                     
                     <!-- <h1>screen3</h1> -->
                  <div id="createScroll2" class="createScroll2" style="width:100%">
                  <div id="droppable2" class="">
                    <v-container grid-list-md>
                       <div class="row clearfix">
                         <div class="col-sm-6">
                           <label style="font-size:20px;cursor:pointer">
                             <input type="checkbox" v-model="tableObj.selectAllColumn" style="vertical-align: baseline;margin-right: 11px;">Select All</label>
                         </div>
                         <div class="col-sm-6">
                           <label style="font-size:20px;cursor:pointer">
                             <input type="checkbox" v-model="tableObj.distinct" style="vertical-align: baseline;margin-right: 11px;">Distinct</label>
                         </div>
                        </div> 
                      <v-layout row wrap>
                        <v-flex>
                          <v-card>
                            <v-card-text>
                          <!-- <v-checkbox :label="`Distinct`" v-model="tableObj.distinct" style="position:absolute;left:40%"></v-checkbox> -->
                              <v-layout row wrap>
                                <v-flex xs8>
                                  <h3 class="panel-title">Available Column</h3>
                                </v-flex>
                                <v-flex xs4>
                                  <input type="text" class="srch-text" v-model="SearchTable" placeholder="Search..."/>
                                  <i class="fa fa-search srch-icon"></i>
                                </v-flex>
                              </v-layout>
                              <draggable element="span" v-model="tableObj.optionColumn" :options="dragOptions" :move="onMove" @start="isDragging=true" 
                                @end="isDragging=false" @change="updateGroup($event)">
                                <transition-group type="transition" :name="'flip-list'" class="list-group ht-215" tag="ul">
                                  <li class="list-group-item" v-if="element.name" v-for="(element, index) in filterBy(tableObj.optionColumn, SearchTable)" 
                                      :key="index">
                                    {{element.group}}.{{element.name}}
                                  </li>
                                </transition-group>
                              </draggable>
                            </v-card-text>
                          </v-card>
                        </v-flex>
                        <v-flex>
                          <v-card>
                            <v-card-text>
                              <v-layout row wrap>
                                <v-flex xs8>
                                  <h3 class="panel-title">Selected Column</h3>
                                </v-flex>
                                <v-flex xs4>
                                  <input type="text" class="srch-text" v-model="selectedSearch" placeholder="Search..."/>
                                  <i class="fa fa-search srch-icon"></i>
                                </v-flex>
                              </v-layout>
                              <draggable element="span" v-model="tableObj.selectedColumns" :options="dragOptions" :move="onMove" @change="updateGroup2($event)">
                                <transition-group type="transition" :name="'flip-list'" class="list-group ht-215" tag="ul">
                                  <li class="list-group-item" v-for="(element, index) in filterBy(tableObj.selectedColumns, selectedSearch)" :key="index">
                                    {{element.group}}.{{element.name}}
                                  </li>
                                </transition-group>
                              </draggable>
                            </v-card-text>
                          </v-card>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </div>
                </div>   
                     <!-- ****************************************************** END **************************************************** -->
                     <v-layout row>
                       <v-flex xs1>
                         <v-btn class="next" @click.stop="previousScreen(2)" color="info">Previous</v-btn>
                       </v-flex>
                       <v-flex xs10></v-flex>
                       <v-flex xs1>
                         <v-btn class="next"  @click.native="saveDialog" color="info">Save</v-btn>
                       </v-flex>                      
                     </v-layout> 
                   </div>
                </v-flex>
                <!-- **************************************************************************** -->
              </v-layout>
            </v-container>
          </v-content>
          <!-- ****************************** END ************************************* -->
          <div style="flex: 1 1 auto;" />
        </v-card>
      </v-dialog>
    </v-layout>
     <v-dialog v-model="dialog2" max-width="40%" max-height="50%">
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
               <v-layout row wrap v-for="column in colArray">
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
            <v-btn @click.stop="dialog2=false"> close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

  </div>
</template>

<script>
import _def from './various/defnitions'
import draggable from 'vuedraggable'
import cloneDeep from 'lodash/cloneDeep';
import sortBy from 'lodash/sortBy';
import tableData from './data/table-selection';
const message = [ 'vue.draggable', 'draggable', 'component', 'for', 'vue.js 2.0', 'based' , 'on', 'Sortablejs' ]
export default {
  components: {
            draggable,
  },
  data() {
    return {
      drawer: null,
      dataStr: _def.dataStr,
      joinOption:["AND","OR"],
      columnArray:["OrderNumber","OrderType","OrderDetail","LineNumber"],
      filterArray:["==","<",">", "<=",">=","!="],
      dialog2:false,
      dialog3:false,
      selectedColumns:[],
      SearchTable:"",
      editable:true,
      isDragging: false,
      delayedDragging:false,
      selectedSearch:"",
      e1:"",
      joinType:["join","left join","right join","full join"],
      colObj:{"fromColumn":'','toColumn':'','operator':''},
      colArray:[{"fromColumn":'','toColumn':'','operator':''}],
      progressbar:1,
      loading: false,
      search: null,
      openbrsisArray:['(','((','((('],
      closebrsisArray:[')','))',')))'],
      functionArray:['count','sum'],
      relOperatorArray:["==","<",">", "<=",">=","!="],
      valueTypeArray:['value','date','field'],   
      tableObj:cloneDeep(tableData)   
    }
  },
  // created(){
  //   if(this.$store.state.currentStep){
  //     this.tableObj =this.$store.state.archivalStep[this.$store.state.currentStep] ;
  //   } 
  // },
  computed: {
    selectTable(){
      return this.$store.state.allDbTables;
    },
    // tableObj: {
    //   get: function(){
    //     return this.tableObj;
    //   },
    //   set: function(){
    //     if(this.$store.state.currentStep){
    //       this.tableObj =this.$store.state.archivalStep[currentStep]   
    //     }
    //   }
    // },
    dialog() {
      return this.$store.state.dialog
    },
    items(){
      return this.tableObj.relationshipArray
    },
    total: function () {
      return this.value.interval ? (this.value.interval * this.value.multiplier).toFixed(2) : 0
    },
    dragOptions () {
      return  {
        animation: 0,
        group: 'description',
        ghostClass: 'ghost'
      };
    },
    listString(){
      return JSON.stringify(this.tableObj.optionColumn, null, 2);  
    },
    selectedColumnsString(){
      return JSON.stringify(this.tableObj.selectedColumns, null, 2);  
    }
  },
   watch: {
     dialog (newValue){
       if(newValue){
          this.tableObj =cloneDeep(this.$store.state.archivalStep[this.$store.state.currentStep]);
       }

     },
     isDragging (newValue) {
      if (newValue){
        this.delayedDragging= true
        return
      }
      this.$nextTick( () =>{
           this.delayedDragging =false
      })
    },
    search (val) {
        val && this.querySelections(val)
    }
  },
  props: {
    source: String
  },
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
    addTable(){
      let validFlag=true;
      let _this = this;
      console.log("Demo "+JSON.stringify(_this.demo));
      _this.tableObj.relationship.selectedTableArray.map(function(obj, index){
        if(obj.tableName == _this.tableObj.relationship.selectedTable){
          validFlag = false;
          _this.$toaster.error('Table Already Exist')
        }
      });
      if(validFlag){
        let obj = {'tableName':cloneDeep(_this.tableObj.relationship.selectedTable),
                   'aliesTableName':cloneDeep(_this.tableObj.relationship.selectedTable + _this.$store.state.aliesCounter++)}
        _this.tableObj.relationship.selectedTableArray.push(cloneDeep(obj));
         _this.getColumn(obj);
         _this.$toaster.success('Table Added Successfully') 
      }
    },
    getColumn(tableObject){
      let _this = this;
      let url = 'http://192.168.1.100:8010/get_all_columns';
      let inputJson = {
               "conn_str": "postgresql+psycopg2://postgres:essentio@192.168.1.100:5432/erpdatacloud",
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
    querySelections (value) {
      if(value.length %3 !== 0){
        return 
      }
        this.loading = true;
        let _this = this;
        let url = 'http://192.168.1.100:8010/get_tables';
        let inputJson = {
               "conn_str": "postgresql+psycopg2://postgres:essentio@192.168.1.100:5432/erpdatacloud",
               "dest_queue": "test",
               "table_name": value
      }
      this.$http.post(url, inputJson, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => {
          _this.$store.state.allDbTables = JSON.parse(response.bodyText);
          this.loading = false;
          console.log("Response from all tables"+JSON.stringify(response));
        },response => {}).catch(e => {
          console.log(e)
          this.loading = false;
          this.ErrorMessage = 'Something went wrong.'
          })
      },
    previousScreen(number){
      this.progressbar = number;
    },
    nextScreen(number){
      this.progressbar = number;
    },
    addColumn(){
      this.colArray.push(this.colObj);
    },
    updateGroup(event){
      this.orderList();
    },
    updateGroup2(event){
      this.orderselectedColumns();
    },
     orderList () {
       let _this = this;
      _this.tableObj.optionColumn = sortBy(_this.tableObj.optionColumn, ['group'])//this.optionColumn.sort((one,two) =>{return one.order-two.order; })
    },
    orderselectedColumns () {
      let _this = this;
      _this.tableObj.selectedColumns = sortBy(_this.tableObj.selectedColumns, ['group']) //this.selectedColumns.sort((one,two) =>{return one.order-two.order; })
    },
    onMove ({relatedContext, draggedContext}) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
    },
    deleteRowIndex(object){
      this.$store.state.dataSelectionIndex=object.index;
      this.dialog3 = true;
    },
    deleteRow(){
      this.$store.state.dataSelectionArray.splice(this.$store.state.dataSelectionIndex,1);
      this.dialog3 = false;
    },
    showData(index){
      this.tableObj.relationship = this.tableObj.relationshipArray[index].relationship;
      this.colArray = this.tableObj.relationshipArray[index].colArray
      this.dialog2 = true;
      // console.log(JSON.stringify(object));
    },
    setData(){
      let index=this.$store.state.dataSelectionIndex;
      this.$store.state.dataSelectionIndex = null;
      let tempObj = this.$store.state.dataSelectionArray[index];
      this.relationship.selectedTable = tempObj.selectedTable.split(",");
      this.relationship.selectedColumn = tempObj.selectedColumn.split(",");
      this.relationship.selectedFilter = [tempObj.selectedFilter];
      this.relationship.join = tempObj.join?[tempObj.join]:null;
    },
    savedata(){
      let arrayIndex = 0;
      let _this = this;
      _this.tableObj.relationshipArray.map(function(obj, index){
          if(obj.relationship.fromTable == _this.tableObj.relationship.fromTable){
            arrayIndex = index;
          }
      });
      let object = {'relationship':_this.tableObj.relationship,'colArray':this.colArray};
      if(arrayIndex){
        _this.tableObj.relationshipArray[arrayIndex] = cloneDeep(object);
        _this.$toaster.info('Relationship Updated successfully');
      }else{
        _this.tableObj.relationshipArray.push(cloneDeep(object));
        _this.$toaster.success('Relationship added successfully');
      }
      this.dialog2=false;
    },
    closeDialog() {
      this.$store.state.dialog = false
    },
    getSelectionData(){
      let _this = this;
      let dbStepInput =  cloneDeep(_this.$store.state.dbStepObject);
      console.log("relationshipArray" +JSON.stringify(_this.tableObj.relationshipArray));
      let workTablecolumns=[];
      dbStepInput.distinct=_this.tableObj.distinct;
      dbStepInput.output_table = _this.tableObj.relationship.selectedTableArray[0].tableName;
      dbStepInput.select_table.name = _this.tableObj.relationship.selectedTableArray[0].tableName;
      dbStepInput.select_table.alias = _this.tableObj.relationship.selectedTableArray[0].aliesTableName;
      if(_this.tableObj.selectAllColumn){
        dbStepInput.select_table.cols.push({
                'table_alias': 'cu',
                'col_alias': '',
                'col_name': '_*_',
                'func': '' //for now by default it will be blank
        });   
      }else{
        _this.tableObj.selectedColumns.map(function(obj, index){
        let tempObj = {
                  'table_alias': obj.tblAlies,
                  'col_alias': obj.colAlies,
                  'col_name': obj.name,
                  'func': '' //for now by default it will be blank
              }
        dbStepInput.select_table.cols.push(cloneDeep(tempObj));     
        });
      }
      
      let joinObject = { //Table Relationship
            'jfrom': '', //from table
            'jto': '', //to table
            'jfromalias': 't1', // alies name of from table
            'jtoalias': 'gc', //alies name to table
            'type': 'INNER JOIN',
            'condition': [] // will push condition object here
        }
      let conditionObject = {
                'from_column': '', //from column
                'to_column': '', //to column alies
                'from_alias': '', //from column alies
                'to_alias': '', //to column
                'operator': ''
            }
       _this.tableObj.relationshipArray.map(function(obj, index){
         joinObject.jfrom = obj.relationship.fromTable.tableName;
         joinObject.jto = obj.relationship.toTable.tableName;
         joinObject.jfromalias = obj.relationship.fromTable.aliesTableName;
         joinObject.jtoalias = obj.relationship.toTable.aliesTableName;
         joinObject.type = obj.relationship.selectedFilter;
         obj.colArray.map(function(colObj, colIndex){
           conditionObject.from_column = colObj.fromColumn.name;
           conditionObject.to_column = colObj.toColumn.name;
           conditionObject.from_alias = colObj.fromColumn.colAlies;
           conditionObject.to_alias = colObj.toColumn.colAlies;
           conditionObject.operator =  _this.getjoinOperator(colObj.operator);
           joinObject.condition.push(cloneDeep(conditionObject));
         });
         dbStepInput.joins.push(cloneDeep(joinObject));
       });
       _this.tableObj.criteriaArray.map(function(obj, index){
         let CriteriaObject = { 
            'alias': obj.column.tblAlies, //table alies
            'column_name': obj.column.name, //column alies
            'operator':  _this.getjoinOperator(obj.column.name), //relational operator
            'value': obj.value, //may be value date or column
            'operand': obj.logOperator ? 'AND':'OR',
            'pre_braces': obj.openbrsis,
            'post_braces': obj.closebrsis,
            'is_col_compare':obj.valueType == 'field' ? true : false,
            'with_alias':obj.field.colAlies,
            'with_col':obj.field.name
        }
        dbStepInput.where.push(cloneDeep(CriteriaObject));
       });    
      return dbStepInput;
    },
    getjoinOperator(sign){
      let operatorArray = {'==':'_eq_','<':'_lt_','>':'_gt_','<=':'_lt_eq_','>=':'_gt_eq_','!=':'_not_eq_'};
       return operatorArray[sign];
    },
    saveDialog() {
      let inputParam = this.getSelectionData();
      let _this = this;
      // let inputParam = _this.$store.state.dbStepObject;
      console.log("inputParam"+JSON.stringify(inputParam));
      let url = 'http://192.168.1.101:8016/ide_step_data/add';
       _this.$http.post(url, inputParam, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => {
          _this.$store.state.archivalStep[_this.$store.state.currentStep] = cloneDeep(_this.tableObj);
          console.log("Response from all tables"+JSON.stringify(response));
          _this.$toaster.success('Data save successfully') 
        },response => {
           _this.$toaster.error('There is some internal error please try again later.')
        }).catch(e => {
              console.log(e)
            this.ErrorMessage = 'Something went wrong.'
      }) 
      this.$store.state.dialog = false
    }
  },

  mounted() {
    var _this = this;
  }
}

</script>
<style scoped>
.content{
      height: 626px;
      overflow: auto
}
.btm-20{
  margin-bottom: 20px;
}
.updt-css{
  font-size:20px;color:red;cursor:pointer;
}
.srch-text{
  border-bottom: 01px solid cadetblue;
  width: 99%;
  height: 100%;
}
.srch-icon{
    position: absolute;
    top: 7%;
    right: 3%;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: .5;
  background: #C8EBFB;
}

.list-group {
  min-height: 150px;
}

.list-group-item {
  cursor: move;
}

.list-group-item i{
  cursor: pointer;
}
.ht-215{
  height: 215px;
  overflow: auto;
}
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
.datatable td{
  vertical-align: inherit
}
.next{
    position: absolute;
    top: 537px;
}
.form-views.ng-hide-remove {
    -webkit-animation: slideOutLeft 0.5s both ease;
    -moz-animation: slideOutLeft 0.5s both ease;
    animation: slideOutLeft 0.5s both ease;
}
    
    @keyframes slideOutLeft {
        to {
            transform: translateX(-200%);
        }
    }
    
    @-moz-keyframes slideOutLeft {
        to {
            -moz-transform: translateX(-200%);
        }
    }
    
    @-webkit-keyframes slideOutLeft {
        to {
            -webkit-transform: translateX(-200%);
        }
    }
    /* slide in from the right */
    
    @keyframes slideInRight {
        from {
            transform: translateX(200%);
        }
        to {
            transform: translateX(0);
        }
    }
    
    @-moz-keyframes slideInRight {
        from {
            -moz-transform: translateX(200%);
        }
        to {
            -moz-transform: translateX(0);
        }
    }
    
    @-webkit-keyframes slideInRight {
        from {
            -webkit-transform: translateX(200%);
        }
        to {
            -webkit-transform: translateX(0);
        }
    }
      .animate-hide {
        transition: all linear 0.5s;
        line-height: 20px;
        opacity: 1;
        padding: 10px;
        background: white;
    }
    
    .animate-hide.ng-hide {
        line-height: 0;
        opacity: 0;
        padding: 0 10px;
    }
    
    .animate-repeat {
        /*   line-height:30px; */
        list-style: none;
        box-sizing: border-box;
    }
    
    .animate-repeat.ng-move,
    .animate-repeat.ng-enter,
    .animate-repeat.ng-leave {
        transition: all linear 0.5s;
    }
    
    .animate-repeat.ng-leave.ng-leave-active,
    .animate-repeat.ng-move,
    .animate-repeat.ng-enter {
        opacity: 0;
        max-height: 0;
    }
    
    .animate-repeat.ng-leave,
    .animate-repeat.ng-move.ng-move-active,
    .animate-repeat.ng-enter.ng-enter-active {
        opacity: 1;
        /*   max-height:30px; */
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
    .criteria-opr{
      font-size: 20px;
      cursor: pointer;
      position: relative;
      margin: auto;
      padding: auto;
      margin-top: 24%;
    }
    .ft-30{
      font-size: 30px;
    }
  
</style>
