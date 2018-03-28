<template lang="html">
  <div class="">
    <v-layout row justify-center>
      <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay="false" scrollable>
        <v-card tile style="height:650px">
          <!-- ******************************Start ************************************* -->
          <v-toolbar card dark color="primary" app :clipped-left="$vuetify.breakpoint.mdAndUp" fixed>
            <!-- <v-btn icon @click.native="closeDialog" dark>
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Close</v-toolbar-title> -->
            <v-spacer></v-spacer>
            <v-toolbar-title >Close</v-toolbar-title>
              <v-btn icon @click.native="closeDialog" dark>
              <v-icon>close</v-icon>
            </v-btn>
              <!-- <v-btn dark flat @click.native="saveDialog">Save</v-btn> -->
          </v-toolbar>
          <v-content>
            <v-container grid-list-lg>
              <v-layout>
<!-- ************************************************************************************************************************** -->
                <!-- <v-flex d-flex xs2>
                  <ul class="progressbar" style="border-right: 01px solid rgb(36, 161, 237);">
                    <li :class="{active:progressbar == 1}">Table Relationship</li>
                    <li :class="{active:progressbar == 2}">Criteria</li>
                    <li :class="{active:progressbar == 3}">Worktable Output</li>                    
                  </ul>  
                </v-flex>       -->
                <v-flex d-flex xs12>
                 <div class="form-views" v-show="progressbar == 1" style="width:100%;margin-left:3%;height:500px">
                    <ul>
                      <li @click.stop="nextScreen(1)" :class="{chevron:true,chevron_active:progressbar == 1}">Table Relationship</li>
                      <li @click.stop="nextScreen(2)" :class="{chevron:true,chevron_active:progressbar == 2}">Criteria</li>
                      <li @click.stop="nextScreen(3)" :class="{chevron:true,chevron_active:progressbar == 3}">Worktable Output</li>
                    </ul>
                    <v-layout row wrap>
                      <v-flex xs6>
                        <v-select :items="selectTable" v-model="relationship.selectedTable" :loading="loading" :search-input.sync="search" 
                          cache-items label="Select Table" autocomplete></v-select>
                        <v-btn color="info" @click.native="addTable">Add</v-btn>
                      </v-flex>
                      <v-flex xs6> 
                            <div class="panel panel-success" v-show="relationship.selectedTableArray.length">
                              <div class="panel-heading">Selected Table</div>
                              <div class="panel-body">
                                <v-layout row wrap>
                                  <v-flex style="margin-right:5px;" v-for="table in relationship.selectedTableArray">
                                    <span style="cursor:pointer" class="badge" @click.stop="dialog2=true">{{table}}</span>
                                  </v-flex>
                                </v-layout>
                              </div>
                            </div> 
                      </v-flex>  
                    </v-layout>
                    <!-- <v-select :items="selectTable" v-model="relationship.selectedTableArray" :loading="loading" :search-input.sync="search" 
                          cache-items label="Select Table" 
                          autocomplete multiple chips deletable-chips></v-select>
                    <v-btn color="info" @click.native="dialog2 = true">Add</v-btn> -->
                    <v-layout row wrap v-show="relationshipArray.length">
                      <v-flex><b>From Table</b></v-flex>
                      <v-flex><b>Join</b></v-flex>
                      <v-flex><b>To Table</b></v-flex>
                    </v-layout>
                    <v-expansion-panel expand>
                      <v-expansion-panel-content v-for="(item,i) in relationshipArray" :key="i">
                        <div slot="header">
                          <v-layout row wrap>
                            <v-flex>{{item.relationship.fromTable}}</v-flex>
                            <v-flex>{{item.relationship.selectedFilter}}</v-flex>
                            <v-flex>{{item.relationship.toTable}}</v-flex>
                          </v-layout>
                        </div>
                        <v-card>
                          <v-card-text class="grey lighten-3">
                            <!-- Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                            consequat. -->
                          <v-layout row wrap >
                            <v-flex><b>From Column</b></v-flex>
                            <v-flex><b>Operator</b></v-flex>
                            <v-flex><b>To Column</b></v-flex>
                          </v-layout>
                          <v-layout row wrap v-for="column in item.colArray">
                            <v-flex>{{column.fromColumn}}</v-flex>
                            <v-flex>{{column.operator}}</v-flex>
                            <v-flex>{{column.toColumn}}</v-flex>
                          </v-layout>
                          </v-card-text>
                        </v-card>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-layout justify-end>
                              <v-btn class="next" @click.stop="nextScreen(2)" color="info">Next</v-btn>
                    </v-layout>      
                    <!-- <vue-tabs>
                      <v-tab title="Select Table">
                          <v-select :items="selectTable" v-model="relationship.selectedTable" :loading="loading" :search-input.sync="search" 
                          cache-items label="Select Table" 
                          autocomplete multiple chips deletable-chips></v-select>
                      </v-tab>
                      <v-tab title="Define Relationship">
                            <v-btn color="info" @click.native="dialog2 = true">Add</v-btn>
                          <v-card>
                              <v-data-table :headers="headers" v-show="items.length" :items="items" hide-actions class="elevation-1">
                                <template slot="items" slot-scope="props">
                                  <td class="text-xs-left">
                                    <span style="cursor:pointer" class="badge" @click.stop="showData(props.index)">{{ props.item.relationship.selectedTable }}</span></td>
                                  <td class="text-xs-left">
                                    {{ props.item.relationship.selectedFilter }}
                                    </td>
                                  <td class="text-xs-left">{{ props.item.relationship.selectedColumn }}</td>
                                </template>
                              </v-data-table>
                          </v-card>
                          <v-layout justify-end>
                              <v-btn class="next" @click.stop="nextScreen(2)" color="info">Next</v-btn>
                          </v-layout>
                      </v-tab>
                    </vue-tabs> -->
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
                     <v-layout>
                      <v-flex xs2>
                       <v-select :items="openbrsisArray" single-line label="Select Parenthisis" v-model="parenthasisobject.openbrsis"></v-select> 
                      </v-flex>
                      <v-flex xs1>
                        <v-select :items="functionArray" single-line label="Select Function" v-model="parenthasisobject.function"></v-select> 
                      </v-flex>  
                      <v-flex xs1>
                        <v-select label="Select Column" :items="optionColumn" v-model="parenthasisobject.column"
                           item-text="name" single-line item-value="name + tblAlies"
                    ></v-select> 
                        <!-- <v-select :items="columnArray" single-line label="Select Column" v-model="parenthasisobject.column"></v-select>  -->
                      </v-flex>  
                      <v-flex xs1>
                        <v-select :items="relOperatorArray" single-line label="Select Operator" v-model="parenthasisobject.relOperator"></v-select> 
                      </v-flex>  
                      <v-flex xs2>
                        <v-select :items="valueTypeArray" single-line label="Select ValueType" v-model="parenthasisobject.valueType"></v-select> 
                      </v-flex>
                      <v-flex xs2>
                         <v-text-field name="input-1" v-show="parenthasisobject.valueType == 'value' ||parenthasisobject.valueType == ''"
                          single-line label="Label Text" v-model="parenthasisobject.value"></v-text-field>

                         <v-menu ref="menu" lazy :close-on-content-click="false" v-show="parenthasisobject.valueType == 'date'"
                          v-model="parenthasisobject.menu" transition="scale-transition" offset-y full-width :nudge-right="40" min-width="290px" :return-value.sync="parenthasisobject.date">
                          <v-text-field slot="activator" label="Picker in menu" v-model="parenthasisobject.date" prepend-icon="event" readonly ></v-text-field>
                          <v-date-picker v-model="parenthasisobject.date" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                          </v-date-picker>
                        </v-menu>

                        <v-select :items="optionColumn" single-line label="Select Column" v-show="parenthasisobject.valueType == 'field'"
                             v-model="parenthasisobject.field" item-text="name"  item-value="name + tblAlies"></v-select> 
                      </v-flex>  
                      <v-flex xs2>
                        <v-select :items="closebrsisArray" single-line label="Select Parenthisis" v-model="parenthasisobject.closebrsis"></v-select> 
                      </v-flex>  
                      <v-flex xs1>
                        <toggle-button :value="true" :width=80 :height=30 v-model = "parenthasisobject.logOperator" 
                          :labels="{checked: 'AND', unchecked: 'OR'}" style="margin-top:12%"/>
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
                     <!-- *************************************************** Dragging Component ****************************************        -->
                     <div id="createScroll2" class="createScroll2" style="width:100%">
                  <div id="droppable2" class="">
                    <v-container grid-list-md>
                      <v-layout row wrap>
                        <v-flex>
                          <v-card>
                            <v-card-text>
                              <v-layout row wrap>
                                <v-flex xs8>
                                  <h3 class="panel-title">Available Column</h3>
                                </v-flex>
                                <v-flex xs4>
                                  <input type="text" class="srch-text" v-model="SearchTable" placeholder="Search..."/>
                                  <i class="fa fa-search srch-icon"></i>
                                </v-flex>
                              </v-layout>
                               <!-- :items="optionColumn" v-model="parenthasisobject.column" item-text="name" single-line item-value="name" -->
                               <!-- {{list}}   -->
                              <draggable element="span" v-model="optionColumn" :options="dragOptions" :move="onMove" @start="isDragging=true" 
                                @end="isDragging=false"
                                @change="updateGroup($event)">
                                <transition-group type="transition" :name="'flip-list'" class="list-group ht-215" tag="ul">
                                  <li class="list-group-item" v-if="element.name" v-for="(element, index) in filterBy(optionColumn, SearchTable)" :key="index">
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
                              <draggable element="span" v-model="list2" :options="dragOptions" :move="onMove" @change="updateGroup2($event)">
                                <transition-group type="transition" :name="'flip-list'" class="list-group ht-215" tag="ul">
                                  <li class="list-group-item" v-for="(element, index) in filterBy(list2, selectedSearch)" :key="index">
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
                <!-- <vue-tabs style="width:100%">
                  <v-tab title="Table Relationship">
                    <v-expansion-panel style="margin-top:3%">
                      <v-expansion-panel-content :key="1">
                        <div slot="header">Select Table</div>                       
                <div id="createScroll2" class="createScroll2" style="width:100%">
                  <div id="droppable2" class="">
                    <v-container grid-list-md>
                      <v-layout row wrap>
                        <v-flex>
                          <v-card>
                            <v-card-text>
                              <v-layout row wrap>
                                <v-flex xs8>
                                  <h3 class="panel-title">Select Table</h3>
                                </v-flex>
                                <v-flex xs4>
                                  <input type="text" class="srch-text" v-model="SearchTable" placeholder="Search..."/>
                                  <i class="fa fa-search srch-icon"></i>
                                </v-flex>
                              </v-layout>
                              
                              <draggable element="span" v-model="list" :options="dragOptions" :move="onMove" @start="isDragging=true" 
                                @end="isDragging=false"
                                @change="updateGroup($event)">
                                <transition-group type="transition" :name="'flip-list'" class="list-group ht-215" tag="ul">
                                  <li class="list-group-item" v-for="element in filterBy(list, SearchTable)" :key="element.order">
                                    {{element.name}}
                                    <span class="badge">{{element.order}}</span>
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
                                  <h3 class="panel-title">Selected Table</h3>
                                </v-flex>
                                <v-flex xs4>
                                  <input type="text" class="srch-text" v-model="selectedSearch" placeholder="Search..."/>
                                  <i class="fa fa-search srch-icon"></i>
                                </v-flex>
                              </v-layout>
                              <draggable element="span" v-model="list2" :options="dragOptions" :move="onMove" @change="updateGroup2($event)">
                                <transition-group type="transition" :name="'flip-list'" class="list-group ht-215" tag="ul">
                                  <li class="list-group-item" v-for="element in filterBy(list2, selectedSearch)" :key="element.order">
                                    {{element.name}}
                                    <span class="badge">{{element.order}}</span>
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
                </v-expansion-panel-content>
              </v-expansion-panel>

                    <v-expansion-panel>
                      <v-expansion-panel-content :key="2">
                        <div slot="header">Define Relationship</div>
                        <v-card>
                          <v-btn color="info" @click.native="dialog2 = true">Add</v-btn>

                            <v-data-table :headers="headers" v-show="items.length" :items="items" hide-actions class="elevation-1">
                              <template slot="items" slot-scope="props">
                                <td class="text-xs-left"><span style="cursor:pointer" class="badge" @click.stop="showData(props.index)">{{ props.item.relationship.selectedTable }}</span></td>
                                <td class="text-xs-left">{{ props.item.relationship.selectedFilter }}</td>
                                <td class="text-xs-left">{{ props.item.relationship.selectedColumn }}</td>
                              </template>
                            </v-data-table>
                         
                        </v-card>
                      </v-expansion-panel-content>
                    </v-expansion-panel>

                  </v-tab>
                  <v-tab title="Criteria">
                    Second tab content
                  </v-tab>
                  <v-tab title="Worktable Output">
                    Third tab content
                  </v-tab>
                </vue-tabs> -->
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
                  <v-select :items="relationship.selectedTableArray" v-model="relationship.fromTable" label="From Table" single-line ></v-select>
               </v-flex>
               <v-flex style="margin-right:20px;">
                  <v-select :items="joinType" v-model="relationship.selectedFilter" label="Join Type" single-line ></v-select>
               </v-flex>
               <v-flex style="margin-right:20px;">
                   <v-select :items="relationship.selectedTableArray" v-model="relationship.toTable" label="To Table" single-line ></v-select>
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
                   <v-select label="From Column" :items="optionColumn" v-model="column.fromColumn" item-text="name" single-line item-value="name"
                    autocomplete></v-select>     
                 <!-- ********************************************************************************************** -->
                  <!-- <v-select :items="optionColumn" v-model="column.fromColumn" label="From Column" single-line ></v-select> -->
               </v-flex>
               <v-flex xs2 style="margin-right:20px;">
                  <v-select :items="filterArray" v-model="column.operator" label="Operator" single-line ></v-select>
               </v-flex>
               <v-flex xs4 style="margin-right:20px;">
                  <v-layout>
                    <v-flex>
                      <v-select label="To Column" :items="optionColumn" v-model="column.toColumn" item-text="name" single-line item-value="name"
                    autocomplete></v-select> 
                      <!-- <v-select :items="optionColumn" v-model="column.toColumn" label="To Column" single-line ></v-select> -->
                    </v-flex>
                    <!-- <v-flex>
                      <i class="fa fa-minus icn-css" @click.stop="addColumn"></i>
                    </v-flex> -->
                  </v-layout>
               </v-flex>
               </v-layout>
                  <!-- <multiselect class="btm-20" v-show="items.length" v-model="relationship.join" :options="joinOption" placeholder="Select Operator" 
                                      ></multiselect> -->
                  <!-- <multiselect class="btm-20" v-model="relationship.selectedTable" :options="selectTable" placeholder="Select Table" 
                                      :hideSelected="true" :multiple="true">  -->
                  <!-- </multiselect> -->
                  <!-- <multiselect class="btm-20" v-model="relationship.selectedFilter" :options="filterArray" placeholder="Select Criteria"> 
                  </multiselect>  
                  <multiselect class="btm-20" v-model="relationship.selectedColumn" :options="optionColumn" 
                                      placeholder="Select Column" :hideSelected="true" :multiple="true"></multiselect> -->
             </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn @click.stop="savedata"> submit </v-btn>
            <v-btn @click.stop="dialog2=false"> close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialog3" max-width="290">
      <v-card>
        <v-card-title class="headline">Are you Sure, You want to delete?</v-card-title>
        <v-card-text>Data will be deleted permanantly... </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click.native="dialog3 = false">Cancel</v-btn>
          <v-btn color="green darken-1" flat="flat" @click.native="deleteRow">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>


<script>
import _def from './various/defnitions'
import draggable from 'vuedraggable'
import Multiselect from 'vue-multiselect'
import cloneDeep from 'lodash/cloneDeep';
import sortBy from 'lodash/sortBy';
const message = [ 'vue.draggable', 'draggable', 'component', 'for', 'vue.js 2.0', 'based' , 'on', 'Sortablejs' ]
export default {
  components: {
            draggable,
            Multiselect,
  },
  data() {
    return {
      drawer: null,
      dataStr: _def.dataStr,
      delayedDragging:false,
      joinOption:["AND","OR"],
      // selectTable: this.$store.state.allDbTables,
      optionColumn:[],
      columnArray:["OrderNumber","OrderType","OrderDetail","LineNumber"],
      filterArray:["==","<",">", "<=",">=","!="],
      relationship:{
        selectedTableArray:[],
        selectedTable:null,
        fromTable: null,
        toTable: null,
        selectedColumn:null,
        selectedFilter:null
      },
      relationshipArray:[],
      dialog2:false,
      dialog3:false,
      headers: [
          {
            text: 'From Table',
            align: 'left',
            sortable: false,
            value: 'relationship.selectedTable'
          },
          { text: 'join Type',sortable: false, value: 'relationship.selectedFilter' },
          { text: 'To Type',sortable: false, value: 'relationship.selectedColumn' }
        ],
      list: message.map( (name,index) => {return {name, order: index+1, fixed: false}; }),
      list2:[],
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
      parenthasisobject:{openbrsis:'',function:'',column:'',relOperator:'',valueType:'',value:'',closebrsis:'',logOperator:true,date:null,
                          menu:false,modal:false,field:'',},
    }
  },
  computed: {
    selectTable(){
      return this.$store.state.allDbTables;
    },
    dialog() {
      return this.$store.state.dialog
    },
    items(){
      return this.relationshipArray
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
      return JSON.stringify(this.list, null, 2);  
    },
    list2String(){
      return JSON.stringify(this.list2, null, 2);  
    }
  },
   watch: {
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
    addTable(){
      let validFlag=true;
      let _this = this;
      this.relationship.selectedTableArray.map(function(obj, index){
        if(obj == _this.relationship.selectedTable){
          validFlag = false;
          _this.$toaster.error('Table Already Exist')
        }
      });
      if(validFlag){
         _this.getColumn(this.relationship.selectedTable);
         this.relationship.selectedTableArray.push(cloneDeep(this.relationship.selectedTable));
         _this.$toaster.success('Table Added Successfully') 
      }
    },
    getColumn(table){
      let _this = this;
      let url = 'http://192.168.1.100:8010/get_all_columns';
      let inputJson = {
               "conn_str": "postgresql+psycopg2://postgres:essentio@192.168.1.100:5432/erpdatacloud",
               "dest_queue": "test",
               "table_name": table
      }
      _this.$http.post(url, inputJson, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => {
          if(_this.optionColumn.length){
            _this.optionColumn.push({ divider: true });
          }
          let headerObj = { header: table};
          _this.optionColumn.push(cloneDeep(headerObj));
          let allColumn = JSON.parse(response.bodyText);
          allColumn.map(function(obj, index){
             let columnObj = { name: obj, group: table, fixed: false, tblAlies:table, colAlies: obj};
            _this.optionColumn.push(cloneDeep(columnObj));
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
        // this.gettables(v);
        // setTimeout(() => {
        //   this.selectTable = this.states.filter(e => {
        //     return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
        //   })
        //   this.loading = false
        // }, 500)
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
      this.orderList2();
    },
     orderList () {
      this.optionColumn = sortBy(this.optionColumn, ['group'])//this.optionColumn.sort((one,two) =>{return one.order-two.order; })
    },orderList2 () {
      this.list2 = sortBy(this.list2, ['group']) //this.list2.sort((one,two) =>{return one.order-two.order; })
    },
    onMove ({relatedContext, draggedContext}) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
    },
    add: function() {
      this.list.push({
        name: 'Juan'
      });
    },
    replace: function() {
      this.list = [{
        name: 'Edgard'
      }]
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
      this.relationship = this.relationshipArray[index].relationship;
      this.colArray = this.relationshipArray[index].colArray
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
      this.relationshipArray.map(function(obj, index){
          if(obj.relationship.fromTable == _this.relationship.fromTable){
            arrayIndex = index;
          }
      });
      let object = {'relationship':this.relationship,'colArray':this.colArray};
      if(arrayIndex){
        this.relationshipArray[arrayIndex] = cloneDeep(object);
        _this.$toaster.info('Relationship Updated successfully');
      }else{
        this.relationshipArray.push(cloneDeep(object));
        _this.$toaster.success('Relationship added successfully');
      }
      this.dialog2=false;
    },
    closeDialog() {
      this.$store.state.dialog = false
    },
    getSelectionData(){
      let _this = this; 
      console.log("parenthasisobject" +JSON.stringify(_this.parenthasisobject));
      let workTablecolumns=[];
      _this.$store.state.dbStepObject.output_table = _this.relationship.selectedTableArray[0];
      _this.$store.state.dbStepObject.select_table.name = _this.relationship.selectedTableArray[0];
      _this.$store.state.dbStepObject.select_table.alias = _this.relationship.selectedTableArray[0];
      _this.list2.map(function(obj, index){
       let tempObj = {
                'table_alias': obj.tblAlies,
                'col_alias': obj.colAlies,
                'col_name': obj.name,
                'func': '' //for now by default it will be blank
            }
       _this.$store.state.dbStepObject.select_table.cols.push(cloneDeep(tempObj));     
      });
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
       _this.relationshipArray.map(function(obj, index){
         joinObject.jfrom = obj.relationship.fromTable;
         joinObject.jto = obj.relationship.toTable;
         joinObject.jfromalias = obj.relationship.fromTable;
         joinObject.jtoalias = obj.relationship.toTable;
         joinObject.type = obj.relationship.selectedFilter;
         obj.colArray.map(function(colObj, colIndex){
           conditionObject.from_column = colObj.fromColumn;
           conditionObject.to_column = colObj.toColumn;
           conditionObject.from_alias = colObj.fromColumn;
           conditionObject.to_alias = colObj.toColumn;
           conditionObject.operator =  _this.getjoinOperator(colObj.operator);
           joinObject.condition.push(cloneDeep(conditionObject));
         });
         _this.$store.state.dbStepObject.joins.push(cloneDeep(joinObject));
       });    
       let CriteriaObject = { 
            'alias': _this.parenthasisobject.column.tblAlies, //table alies
            'column_name': _this.parenthasisobject.column.name, //column alies
            'operator':  _this.getjoinOperator(_this.parenthasisobject.column.name), //relational operator
            'value': _this.parenthasisobject.value, //may be value date or column
            'operand': _this.parenthasisobject.logOperator ? 'AND':'OR',
            'pre_braces': _this.parenthasisobject.openbrsis,
            'post_braces': _this.parenthasisobject.closebrsis,
            'is_col_compare':_this.parenthasisobject.valueType == 'field' ? true : false,
            'with_alias':_this.parenthasisobject.field.colAlies,
            'with_col':_this.parenthasisobject.field.name
        }   
      _this.$store.state.dbStepObject.where.push(cloneDeep(CriteriaObject));
    },
    getjoinOperator(sign){
      let operatorArray = {'==':'_eq_','<':'_lt_','>':'_gt_','<=':'_lt_eq_','>=':'_gt_eq_','!=':'_not_eq_'};
       return operatorArray[sign];
    },
    saveDialog() {
      this.getSelectionData();
      let _this = this;
      let inputParam = _this.$store.state.dbStepObject;
      console.log("inputParam"+JSON.stringify(inputParam));
      let url = 'http://192.168.1.101:8016/ide_step_data/add';
       _this.$http.post(url, inputParam, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => {
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
        /*   border: 1px solid black; */
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
  
/* .application {
      min-height: inherit;
} */

/*
sql designer
 */
 /* @import "/static/flowchart/css/jquery.flowchart.css"; */
 /* @import "/static/minimap/minimap.css"; */
 /*@import "/static/sqldesigner/styles/print.css";*/

</style>
