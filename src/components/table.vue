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
            <v-toolbar-title >Close</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat @click.native="saveDialog">Save</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-content>
            <v-container fluid fill-height>
              <v-layout justify-center align-center>
                <div id="createScroll2" class="createScroll2">
                  <div id="droppable2" class="" style="margin-top:10px;">
                    <v-container grid-list-md text-xs-center>
                      <v-layout row wrap>
                        <v-flex class="text-xs-center" xs12>
                          <v-card>
                            <v-card-text>
                                <div class="form-group form-group-lg panel panel-default">
                                  <div class="panel-heading">
                                    <h3 class="panel-title">Sortbale control</h3>
                                  </div>
                                </div>
                                <div  class="col-md-3">
                                <draggable class="list-group" element="ul" v-model="list" :options="dragOptions" :move="onMove" 
                                     @change = "updateGroup($event)"
                                     @start="isDragging=true"
                                     @end="isDragging=false"> 
                                  <transition-group type="transition" :name="'flip-list'">
                                    <li class="list-group-item" v-for="element in list" :key="element.order"> 
                                      {{element.name}}
                                      <span class="badge">{{element.order}}</span>
                                    </li> 
                                  </transition-group>
                              </draggable>
                            </div>
                            <div  class="col-md-3">
                            <draggable element="span" v-model="list2" :options="dragOptions" :move="onMove" @change = "updateGroup2($event)"> 
                                <transition-group type="transition" :name="'flip-list'" class="list-group" tag="ul">
                                  <li class="list-group-item" v-for="element in list2" :key="element.order"> 
                                    {{element.name}}
                                    <span class="badge">{{element.order}}</span>
                                  </li> 
                                </transition-group>
                            </draggable>
                          </div>
                            </v-card-text>
                          </v-card>
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
const message = [ 'vue.draggable', 'draggable', 'component', 'for', 'vue.js 2.0', 'based' , 'on', 'Sortablejs' ]
export default {
  components: {
            draggable,
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
      // editable:true
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
        // disabled: !this.editable,
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
    updateGroup(event){
      this.orderList();
      // console.log(event);
    },
    updateGroup2(event){
      debugger;
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
/*
sql designer
 */
 @import "/static/flowchart/css/jquery.flowchart.css";
 /* @import "/static/minimap/minimap.css"; */
 /*@import "/static/sqldesigner/styles/print.css";*/

</style>
