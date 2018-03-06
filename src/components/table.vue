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
            <v-container fluid fill-height>
              <v-layout justify-center >
                <div id="createScroll2" class="createScroll2">
                  <div id="droppable2" class="" style="margin-top:10px;">
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
                      
                      <v-layout row wrap>
                        <v-flex class="text-xs-center">
                          <v-expansion-panel>
                            <v-expansion-panel-content>
                              <div slot="header">Define Relationship</div>
                              <v-layout row wrap v-for="relationship in relationshipArray" style="padding:0 20px; 0 20px">
                                <v-flex>
                                    <multiselect v-model="relationship.selected" :options="selectTable" placeholder="Select Table" 
                                      :hideSelected="true" :multiple="true"> 
                                    </multiselect>
                                </v-flex>
                                <v-flex>
                                    <multiselect v-model="relationship.selectedColumn" :options="optionColumn" 
                                      placeholder="Select Column" :hideSelected="true" :multiple="true"> 
                                    </multiselect>
                                </v-flex>
                                </v-layout>
                                <v-layout>
                                <v-flex offset-xs10 xs2 style="margin-bottom:10px;">
                                   <v-btn color="primary" @click="addRelation">Add More</v-btn>
                                </v-flex>
                              </v-layout>
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                        </v-flex>
                      </v-layout>

                      <v-layout row wrap>
                        <v-flex class="text-xs-center">
                          <v-expansion-panel>
                            <v-expansion-panel-content>
                              <div slot="header">Define Filter</div>
                              <v-layout row wrap v-for="filter in customArray" style="padding:0 20px 0 20px">
                                <v-flex>
                                    <multiselect v-model="filter.selected" :options="columnArray" placeholder="Select Column" 
                                      :hideSelected="true"> 
                                    </multiselect>
                                </v-flex>
                                <v-flex>
                                    <multiselect v-model="filter.selectedFilter" :options="filterArray" placeholder="Select Criteria" 
                                      :hideSelected="true"> 
                                    </multiselect>
                                </v-flex>
                                <v-flex>
                                  <input type="text" placeholder="value" class="srch-text"/>
                                </v-flex>
                                </v-layout>
                                <v-layout>
                                <v-flex offset-xs10 xs2 style="margin-bottom:10px;">
                                   <v-btn color="primary" @click="addFilter">Add More</v-btn>
                                </v-flex>
                              </v-layout>
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </div>
                </div>
              </v-layout>
            </v-container>
          </v-content>
          <!-- ****************************** END ************************************* -->
          <div style="flex: 1 1 auto;" />
        </v-card>
      </v-dialog>
    </v-layout>
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
      dom: {},
      list: message.map( (name,index) => {return {name, order: index+1, fixed: false}; }),
      list2:[],
      editable:true,
      isDragging: false,
      delayedDragging:false,
      SearchTable:"",
      selectedSearch:"",
      e1:"",
      // items:["table1","table2","table3"],
      selectTable: ["table1","table2","table3"],
      optionColumn:["column1","column2","column3"],
      columnArray:["column1","column2","column3"],
      filterArray:["==","<",">", "<=",">=","!="],
      relationshipArray:[{
        selected: null,
        selectedColumn:null,
      }],
      customArray:[{
        selected: null,
        selectedFilter:null,
      }]
    }
  },
  computed: {
    dialog() {
      return this.$store.state.dialog
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
    addFilter(){
      this.customArray.push({selected: null, selectedFilter:null});
    },
    addRelation(){
      this.relationshipArray.push({ selected: null, selectedColumn:null});
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
    closeDialog() {
      this.$store.state.dialog = false
    },
    saveDialog() {
      this.$store.state.dialog = false
    },
  },

  mounted() {
    var title = '';
    var blockId = ''
    var _this = this
  }
}

</script>
<style scoped>

.dragArea {
  min-height: 100px;
  background: beige;
}
.ht-30{
  min-height: 30px;
  background: white;
} 
.bg-grey{
border:01px solid gray
}
.card__text{
  height: inherit;
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
.content{
      height: 626px;
      overflow: auto
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
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>