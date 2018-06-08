<template>
  <v-container grid-list-md>
    <div id="createScroll2" class="createScroll2" style="width:100%">
      <div id="droppable2" class="">
        <v-container grid-list-md>
          <div class="row clearfix">
            <div class="col-sm-6">
              <label style="font-size:20px;cursor:pointer">
                <input type="checkbox" v-model="tableObj.selectAllColumn" style="vertical-align: baseline;margin-right: 11px;">
                Select All</label>
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
                  <v-layout row wrap>
                    <v-flex xs8>
                      <h3 class="panel-title">Available Column</h3>
                    </v-flex>
                    <v-flex xs4>
                      <input type="text" class="srch-text" v-model="SearchTable" placeholder="Search..." />
                      <i class="fa fa-search srch-icon"></i>
                    </v-flex>
                  </v-layout>
                  <draggable element="span" v-model="tableObj.availableColumn" :options="dragOptions" :move="onMove" @start="isDragging=true"
                    @end="isDragging=false" @change="updateGroup($event)">
                    <transition-group type="transition" :name="'flip-list'" class="list-group ht-215" tag="ul">
                      <li class="list-group-item" v-if="element.name" v-for="(element, index) in filterBy(tableObj.availableColumn, SearchTable)"
                        :key="index">
                        {{element.value.group}}.{{element.value.name}}
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
                      <input type="text" class="srch-text" v-model="selectedSearch" placeholder="Search..." />
                      <i class="fa fa-search srch-icon"></i>
                    </v-flex>
                  </v-layout>
                  <draggable element="span" v-model="tableObj.selectedColumns" :options="dragOptions" :move="onMove" @change="updateGroup2($event)">
                    <transition-group type="transition" :name="'flip-list'" class="list-group ht-215" tag="ul">
                      <li class="list-group-item" v-for="(element, index) in filterBy(tableObj.selectedColumns, selectedSearch)" :key="index">
                        {{element.value.group}}.{{element.value.name}}
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
    <v-layout row wrap>
      <v-flex xs1>
        <v-btn class="next" @click.stop="switchScreen(2)" color="primary">Previous</v-btn>
      </v-flex>
      <v-flex xs9></v-flex>
      <v-flex xs2>
        <v-btn :loading="saveData" class="next" @click.stop="updateStep" color="primary">Save</v-btn>
      </v-flex>
    </v-layout>
    <v-dialog v-model="aliesPanel" max-width="25%">
      <column-alies @save-alies="saveColumnAlies" :column="column" v-on:close="aliesPanel=false"></column-alies>
    </v-dialog>
  </v-container>
</template>

<script>
import draggable from 'vuedraggable'
import cloneDeep from 'lodash/cloneDeep';
import sortBy from 'lodash/sortBy';
import findIndex from 'lodash/findIndex';
import columnAlies from './columnAlies.vue'
export default {
     components: {
          draggable,
          'column-alies':columnAlies
     },
   data(){
    return {
        column:{},
        aliesPanel:false,
        SearchTable:"",
        isDragging: false,
        selectedSearch:"",
        saveData:false,
    }},
    props: ['tableObj'],
     computed: {
        dragOptions () {
        return  {
            animation: 0,
            group: 'description',
            ghostClass: 'ghost'
         };
        },
     },
    methods: {
      saveColumnAlies(columnObj){
        let _this = this;
        let index = findIndex(_this.tableObj.selectedColumns,{'group':columnObj, 'name':columnObj.name});
        _this.tableObj.selectedColumns[index] = columnObj; 
        _this.aliesPanel = false;
      },
      updateStep(){
        let _this = this;
        _this.saveData = true;
        _this.$emit('update-step', _this.tableObj);
        setTimeout(function(){ _this.saveData = false }, 8000);
      },
      switchScreen(num){
        let _this = this;
        _this.$emit('update-object', [_this.tableObj, num]);
     },
     onMove ({relatedContext, draggedContext}) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
    }, 
     updateGroup(event){
      this.orderList();
    },
    updateGroup2(event){
      if(event.added){
        this.column = event.added.element;
        this.aliesPanel = true;
      }
      this.orderselectedColumns();
    },
     orderList () {
       let _this = this;
      _this.tableObj.availableColumn = sortBy(_this.tableObj.availableColumn, ['value.group'])//this.optionColumn.sort((one,two) =>{return one.order-two.order; })
    },
    orderselectedColumns () {
      let _this = this;
      _this.tableObj.selectedColumns = sortBy(_this.tableObj.selectedColumns, ['value.group']) //this.selectedColumns.sort((one,two) =>{return one.order-two.order; })
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
</style>
