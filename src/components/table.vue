<template lang="html">
  <div class="">
    <v-layout row justify-center>
      <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay="false" scrollable>
        <v-card tile style="height:650px">
          <!-- ******************************Start ************************************* -->
          <v-toolbar card dark color="primary" app :clipped-left="$vuetify.breakpoint.mdAndUp" fixed>
            <v-btn icon @click.native="closeDialog" dark>
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Close</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat @click.native="saveDialog">Save</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-content>
            <v-container>
              <v-layout>
                <vue-tabs style="width:100%">
                  <v-tab title="Table Relationship">
                    <v-expansion-panel style="margin-top:3%">
                      <v-expansion-panel-content :key="1">
                        <div slot="header">Select Table</div>
                       
              <!-- ******************************************************************************       -->
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
                          <!-- <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text> -->
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
                </vue-tabs>
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
                  <v-select :items="selectTable" v-model="relationship.selectedTable" label="From Table" single-line ></v-select>
               </v-flex>
               <v-flex style="margin-right:20px;">
                  <v-select :items="joinType" v-model="relationship.selectedFilter" label="Join Type" single-line ></v-select>
               </v-flex>
               <v-flex style="margin-right:20px;">
                   <v-select :items="selectTable" v-model="relationship.selectedColumn" label="To Table" single-line ></v-select>
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
               <v-flex style="margin-right:20px;">
                  <v-select :items="optionColumn" v-model="column.fromColumn" label="From Column" single-line ></v-select>
               </v-flex>
               <v-flex style="margin-right:20px;">
                  <v-select :items="filterArray" v-model="column.operator" label="Operator" single-line ></v-select>
               </v-flex>
               <v-flex style="margin-right:20px;">
                  <v-layout>
                    <v-flex>
                      <v-select :items="optionColumn" v-model="column.toColumn" label="To Column" single-line ></v-select>
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
      selectTable: ["SalesHeader","SalesDetail","SalesLedger"],
      optionColumn:["OrderNumber","OrderType","OrderDetail","LineNumber"],
      columnArray:["OrderNumber","OrderType","OrderDetail","LineNumber"],
      filterArray:["==","<",">", "<=",">=","!="],
      relationship:{
        selectedTable: null,
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
      colArray:[{"fromColumn":'','toColumn':'','operator':''}]   
    }
  },
  computed: {
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
    }
  },
  props: {
    source: String
  },
  methods: {
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
      this.list = this.list.sort((one,two) =>{return one.order-two.order; })
    },orderList2 () {
      this.list2 = this.list2.sort((one,two) =>{return one.order-two.order; })
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
      debugger;
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
      debugger;
      this.relationship.join = tempObj.join?[tempObj.join]:null;
    },
    savedata(){
      this.relationshipArray.push({'relationship':this.relationship,'colArray':this.colArray});
      this.dialog2=false;
    },
    closeDialog() {
      this.$store.state.dialog = false
    },
    saveDialog() {
      this.$store.state.dialog = false
    },
  },

  mounted() {
    var _this = this
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

/* .application {
      min-height: inherit;
} */

/*
sql designer
 */
 @import "/static/flowchart/css/jquery.flowchart.css";
 /* @import "/static/minimap/minimap.css"; */
 /*@import "/static/sqldesigner/styles/print.css";*/

</style>
