<template lang="html">
        <div class="" >
            <v-layout row justify-center>
                    <!-- <v-btn color="primary" dark @click.stop="dialog = true">Open Dialog 1</v-btn> -->
                    <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition"
                     :overlay="false" scrollable >
                      <v-card tile style="height:650px">
                      <!-- <v-toolbar card dark color="primary">
                      <v-btn icon @click.native="dialog = false" dark>
                      <v-icon>close</v-icon>
                      </v-btn>
                      <v-toolbar-title>Settings</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-toolbar-items>
                      <v-btn dark flat @click.native="dialog = false">Save</v-btn>
                    </v-toolbar-items>
                  </v-toolbar> -->
                  <!-- ******************************Start ************************************* -->
                  <v-navigation-drawer fixed :clipped="$vuetify.breakpoint.mdAndUp"  app v-model="drawer" >
                   <v-list dense>
                         <div class="draggable" id="sale_order"><h5>Sell Order</h5>
                            <img src="../../static/flowchart/images/tables.png" alt="" height="40" width="40">
                          </div>
                          <div class="draggable" id="work_order"><h5>Work Order</h5>
                            <img src="../../static/flowchart/images/tables.png" alt="" height="40" width="40">
                          </div>
                          <div class="draggable" id="pur_order"><h5>Purchase Order</h5>
                            <img src="../../static/flowchart/images/tables.png" alt="" height="40" width="40">
                          </div>
                    <!-- <v-container grid-list-md text-xs-center>
                        <v-layout row wrap>
                            <v-flex xs12>
                                <img src="../../static/flowchart/images/tables.png" alt="" height="40" width="40">
                                <img src="../../static/flowchart/images/tables.png" alt="" height="40" width="40">
                                <img src="../../static/flowchart/images/tables.png" alt="" height="40" width="40">
                            </v-flex>
                        </v-layout>
                    </v-container>         -->
              <!-- <template v-for="item in items"> -->
          <!-- <v-layout
            row
            v-if="item.heading"
            align-center
            :key="item.heading"
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout> -->
          <!-- <v-list-group
            v-else-if="item.children"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon="" >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i" @click="" >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group> -->
          
        <!-- </template> -->
      </v-list>
    </v-navigation-drawer>
     <v-toolbar card dark color="primary" app :clipped-left="$vuetify.breakpoint.mdAndUp" fixed>
    <!--                  <v-btn icon @click.native="dialog = false" dark>
                      <v-icon>close</v-icon>
                      </v-btn>
                      <v-toolbar-title>Settings</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-toolbar-items>
                      <v-btn dark flat @click.native="dialog = false">Save</v-btn>
                    </v-toolbar-items>
                  </v-toolbar> -->
     <!-- <v-toolbar color="blue darken-3" dark app :clipped-left="$vuetify.breakpoint.mdAndUp" fixed > -->
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
         <v-btn icon @click.native="closeDialog" dark>
          <v-icon>close</v-icon>
        </v-btn>
        
        <!-- <span class="hidden-sm-and-down">Close</span> -->
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn dark flat @click.native="saveDialog">Save</v-btn>
      </v-toolbar-items>
    </v-toolbar>
       <v-content>
          <v-container fluid fill-height>
             <v-layout justify-center align-center>
            <!--  <v-tooltip right>
                <v-btn
                  icon
                  large
                  :href="source"
                  target="_blank"
                  slot="activator">
                  <v-icon large>code</v-icon>
                </v-btn>
                <span>Source</span>
              </v-tooltip> -->
                <div id="createScroll2" class="createScroll2">
                    <div id="droppable2" class="" style="margin-top:10px;">
                    </div>
                </div>
            </v-layout>
          </v-container>
        </v-content> 
                  <!-- ****************************** END ************************************* -->
                  <!-- <v-card-text> </v-card-text> -->

          <div style="flex: 1 1 auto;"/>
        </v-card>
      </v-dialog>
    </v-layout>
</div>
</template>
<script>
import _def from './various/defnitions'
export default {
    data () {
		return {
    //   dialog: false,
      drawer: null,
      dataStr: _def.dataStr,
      dom: {},
      minimap:{
        showMap: false,
      },
      connectionData: {},
      operatorId: '',
      dbOperatorId: '',
      dbLinkData: [],
      operatorI: 0,
      dragType: 'db',
      dbAllowed: ['db', 'merge'],
      tableAllowed: ['table'],
      SPData: [],
      operatorClass: "dbImage",
      blockData: _def.blockData,
      blockColumns: {},
      purgeForm: _def.purgeForm,
      spForm: _def.spForm,
      conditionForm: _def.conditionForm,
      archiveForm: _def.archiveForm,
      copyForm: _def.copyForm,
      reportForm: _def.reportForm,
      duplicateForm: _def.duplicateForm,
      operatorOptions: _def.operatorOptions,
      operators: _def.operators,
      tableOperatorData:[],
      worflowData:{},
      dbData: {}
        }
    },
    computed:{
        dialog(){
            return this.$store.state.dialog
        },
        total: function() {
            return this.value.interval ? (this.value.interval * this.value.multiplier).toFixed(2) : 0
        }
    },
    props: {
      source: String
    },
    methods: {
        closeDialog(){
            this.$store.state.dialog = false
        },
        saveDialog(){
            this.$store.state.dialog = false
        },
        getIDEData(){
      var data  = $('#droppable2').flowchart('getData');
      console.log(JSON.stringify(data));
    },
    closeRightPael(){
      console.log("this is log on 453");
      $(".sb-slidebar").removeClass("toggleshow")
    },
    minimapImage(){
      var data={};
      var node = document.getElementById("createScroll2");      
      data.overflow = "auto";
      data.width = node.offsetWidth;
      data.height = node.offsetHeight;
      var height = node.scrollHeight;
      var width = node.scrollWidth;
      html2canvas(node, {
        // backgroundColor: "white",
         onpreloaded: function(){
            node.style.overflow= "visible";
            node.style.height= height+'px';
            node.style.width= width+'px'; 
         },
         onrendered: function(canvas) {
           node.style.overflow= data.overflow;
           node.style.height= data.height+'px';
           node.style.width= data.width+'px';
           canvas.backgroundColor="red";
           node.className = data
          //  Canvas2Image.saveAsPNG(canvas, 198, 161);
           var img = Canvas2Image.convertToImage(canvas, 198, 161);
           document.getElementsByClassName("minimap-node")[0].style.backgroundImage="url("+img.src+")";            
        }
		  });
    },
    deletTable(){
      this.deleteOperator()
      this.closeRightPael()
      this.blockData = {top:0, left:0, properties: {title:"", inputs:{}, outputs: {}}}
      this.operatorId = ''
    },
    operatorClick(){
      this.saveBlockData();
    },
    saveBlockData(){
      console.log(this.blockData);
      var blockId = localStorage.getItem("operatorId")
      this.setOperatorData(this.operatorId)
    },
    addInputs(){
      var _this = this
      var noOfItems = Object.keys(this.blockData.properties.inputs).length + 1;
      console.log(noOfItems);
      this.blockData.properties.inputs["input_" + noOfItems] = {"label":"Input"}
      this.setOperatorData(this.operatorId)
    },
    removeInput(index){
      console.log(index);
      delete this.blockData.properties.inputs[index];
      this.saveBlockData()
    },
    addOutputs(){
      var noOfItems = Object.keys(this.blockData.properties.outputs).length + 1;
      this.blockData.properties.outputs["output_" + noOfItems] = {"label":"Output"}
      this.setOperatorData(this.operatorId)
    },
    removeOutput(index){
      delete this.blockData.properties.outputs[index];
      this.saveBlockData()
    },
    addWhere(){},
    removeWhere(){},
    addOr(){},
    removeOr(){},
    getTableColumns (){
      //make dynamic call to api and get the table columns
      this.tableColumns = [{column:"column1", type: "integer"}, {column: "column2", type: "string"}, {column: "column3", type: "date"}, {column: "column4", type: "datetime"}]
    },
    getData(){
      var ideData = getData()
      console.log(ideData);
    },

    oneInZeroOutOperator(left, top, className){
        var operatorId = 'created_'+className+'_operator_' + this.operatorI;
        var operatorData = _def.methods.oneInZeroOutOperator(this.operatorI, className, top, left);
        this.operatorI += 1;
        $('#droppable2').flowchart('createOperator', operatorId, operatorData);
        this.dataStr.workflow[operatorId] = {};
        var data = $('#droppable2').flowchart('getData')
        this.dataStr.dbData = JSON.parse(JSON.stringify(data))
        this.dbData = JSON.parse(JSON.stringify(data))
        console.log(JSON.stringify(this.dataStr.dbData));
    },
    oneInOneOutOperator(left, top, className){
      var _this = this
      var operatorId = 'created_'+className+'_operator_' + _this.operatorI;
      var operatorData = _def.methods.oneInOneOutOperator(_this.operatorI, className, top, left);
      this.operatorI += 1;
      $('#droppable2').flowchart('createOperator', operatorId, operatorData);
      _this.dataStr.workflow[operatorId] = {};
      var data = $('#droppable2').flowchart('getData')
      _this.dataStr.dbData = JSON.parse(JSON.stringify(data))
      _this.dbData = JSON.parse(JSON.stringify(data))
      console.log(JSON.stringify(_this.dataStr));
    },
    oneInTwoOutOperator(left, top, className){
      var operatorId = 'created_'+className+'_operator_' + this.operatorI;
      var operatorData = _def.methods.oneInTwoOutOperator(this.operatorI, className, top, left);
      this.operatorI += 1;
      $('#droppable2').flowchart('createOperator', operatorId, operatorData);
      this.dataStr.workflow[operatorId] = {};
      var data = $('#droppable2').flowchart('getData');
      this.dataStr.dbData = JSON.parse(JSON.stringify(data));
    },
    twoInOneOutOperator(left, top, className){
      var operatorId = 'created_'+className+'_operator_' + this.operatorI;
      var operatorData = _def.methods.twoInOneOutOperator(this.operatorI, className, top, left);
      this.operatorI += 1;
      $('#droppable2').flowchart('createOperator', operatorId, operatorData);
      this.dataStr.workflow[operatorId] = {};
      var data = $('#droppable2').flowchart('getData');
      this.dataStr.dbData = JSON.parse(JSON.stringify(data));
      this.dbData = JSON.parse(JSON.stringify(data));
    },
    twoInTwoOutOperator(left, top, className){
      var operatorId = 'created_'+className+'_operator_' + this.operatorI;
      var operatorData = _def.methods.twoInTwoOutOperator(this.operatorI, className, top, left);
      this.operatorI += 1;
      $('#droppable2').flowchart('createOperator', operatorId, operatorData);
      var data = $('#droppable2').flowchart('getData')
      this.dataStr.workflow[operatorId] = {};
      this.dataStr.dbData = JSON.parse(JSON.stringify(data));
      this.dbData = JSON.parse(JSON.stringify(data));
      console.log(JSON.stringify(this.dataStr.dbData));
    },
    addTableOperator(left, top, className){
      var operatorId = 'created_table_operator_' + this.operatorI;
          var operatorData = {
            new: true,
            className: className,
            top: top,
            left: left,
            properties: {
              title: 'Table ' + (this.operatorI + 3),
              inputs: {
                input_1: {
                  label: 'Input 1',}
                },
              outputs: {
                output_1: {
                  label: 'Output 1',}
                }
            }
          };
          this.operatorI += 1;
          $('#droppable2').flowchart('createOperator', operatorId, operatorData);
          var data = $('#droppable2').flowchart('getData')
          // this.dataStr.workflow[this.dbOperatorId]['dbData'] = data
          this.dataStr.workflow[this.dbOperatorId] = JSON.parse(JSON.stringify(data))
          this.worflowData[this.dbOperatorId] = JSON.parse(JSON.stringify(data))
          console.log(JSON.stringify(this.dataStr));
    },
    getOperatorData(operatorId){
      this.blockData = $('#droppable2').flowchart('getOperatorData', operatorId);
    },
    setOperatorData(operatorId){
      $('#droppable2').flowchart('setOperatorData', operatorId, this.blockData);
      this.getOperatorData(operatorId)
    },
    deleteOperator(){
      $('#droppable2').flowchart('deleteOperator', this.operatorId);
    },
    setData(){
      $('#droppable2').flowchart('setData', {});
    },
    getSPData(){
      this.SPData = []
    },
    saveModalForm(formData, modal){
      console.log("sff", this.operatorId);
      if(this.dragType == 'table'){

      }else{

      }
      var IDEData = $('#droppable2').flowchart('getData');
      console.log(JSON.stringify(IDEData));
      IDEData.operators[this.operatorId]["data"] = formData
      console.log(IDEData.operators[this.operatorId]);

      setTimeout(function () {
          $('#droppable2').flowchart('setData', IDEData);
          console.log(JSON.stringify(IDEData));
          // _this.loadData(this.dataStr.dbData)
      }.bind(this), 10)
      $("#"+modal).modal('hide')

    },
    loadDb(){
      var data = {}
      var _this = this
      this.dragType = 'db'
      setTimeout(function () {
          $('#droppable2').flowchart('setData', _this.dataStr.dbData);
          console.log(JSON.stringify(_this.dbData));
          // _this.loadData(this.dataStr.dbData)
      }.bind(this), 10)
    },

    loadData(data){
      var _this = this
      $('#droppable2').flowchart({
             data: data,
             onOperatorSelect: (operatorId) => {
               _this.getOperatorData(operatorId);
               _this.operatorId = operatorId;
               $(".sb-slidebar").addClass("toggleshow");
               return true;
             },
             onOperatorDoubleClick: function (operatorId) {
               
               var operator = $('#droppable2').flowchart('getOperatorData', operatorId);
               console.log(operator);
               var type = operator.className
               var op = _this.operatorOptions[type]
               _this.operatorId = operatorId
               console.log(op);
               if (op['dblClick'] && op["modal"]){
                 $("#" + op["modalName"]).modal()
               }
               if(operator.className != 'db')
                  return
                _this.$store.state.dialog = true;
                  // _this.$store.dialog = true;
                // $(".sb-slidebar").removeClass("toggleshow");
                // setTimeout(function(){
                //   console.log(JSON.stringify(_this.dataStr.workflow[operatorId]))
                //   $('#droppable2').flowchart('setData', _this.dataStr.workflow[operatorId]);

                // },10)
                // _this.dbOperatorId = operatorId;
                // _this.dragType = 'table';
                // this.operatorClass = "tableImage"
                // $(".flowchart-operator").addClass("tableImage");
                return true;
             },
             onOperatorCreate: function (operatorId, operatorData, fullElement) {
               return true;
             },
             onLinkCreate: (linkId, linkData) => {
               console.log(linkData);
                 var fromOperatorData = $('#droppable2').flowchart('getOperatorData', linkData.fromOperator);
                 var toOperatorData = $('#droppable2').flowchart('getOperatorData', linkData.toOperator);
                 linkData.fromTable = fromOperatorData.properties.title
                 linkData.toTable = toOperatorData.properties.title
                 setTimeout(function(){
                   var data = $('#droppable2').flowchart('getData')
                   console.log(JSON.stringify(data));
                   if (_this.dragType == 'db'){
                     _this.dataStr.dbData = JSON.parse(JSON.stringify(data))
                   }else{
                     _this.dataStr.workflow[_this.dbOperatorId] = JSON.parse(JSON.stringify(data))
                   }
                 },10)
                 return true;
             },
             onOperatorDelete: function (operatorId) {
               return true;
             }
           });
    },
     clauseModal (type){
       this.clauseType = type;
       $("#clauseModal").modal()
     },
		remove (key) {
			let confirmFn = function() {
				this.$parent.dataStr.workflow.splice(key, 1)
				// this.$parent.deleteCollection(id)
			}
			let obj = {
					title: 'Delete',
					message: 'Are you sure want to delete this?',
					type: 'info',
					useConfirmBtn: true,
					onConfirm: confirmFn
			}
			this.$refs.simplert.openSimplert(obj)
		},

		openModal(data) {
      $('#myModal').modal();
    },

		findByStep: (step) => {
        this.users.find((usr) => {
           return usr.token === token
        });
    }

    },
    
  mounted () {
    var title = '';
    var blockId = ''
    var _this = this
    $(".draggable").draggable({
          grid: [ 20, 20 ],
          appendTo: '#droppable2',
          cursor: 'move',
          revertDuration: 100,
          revert: 'invalid',
          helper: 'clone',
          refreshPositions: true,
          scroll: true,
          containment: "document",
          zIndex: 10000,
      });

      $("#droppable2").droppable({
          accept: ".draggable",
          tolerance: "intersect",
          drop: function (event, ui) {
            var pos = ui.position;
            var $obj = ui.helper.clone();
            var leftPosition  = pos.left;//ui.offset.left - $(this).offset().left;
            var topPosition   = pos.top;//ui.offset.top - $(this).offset().top;
            var type = ui.draggable.attr("id");
            var className = '';
            var imageClass = '';
            var operator = _this.operatorOptions[type]
            _this[operator['operatorType']](leftPosition, topPosition, type)
            // _this.dragType = type
            if(type == "db" || type == 'spstep'){
              // _this.oneInOneOutOperator(leftPosition, topPosition, type)
              _this.dragType = 'db'
            }
            if(type == "table" || type == "sale_order" || type == "work_order" || type == "pur_order"){
              // _this.addTableOperator(leftPosition, topPosition, type)
              _this.dragType = 'table'
            }
            _this.minimapImage();
          }
        });


    setTimeout(function () {
        var data = {}
        this.loadData(data)
        var object = $(".createScroll2");
        $( "#minimap" ).minimap(object);
    }.bind(this), 10)
  }
}
</script>
<style scoped>
.draggable { width: 80px; height: 80px; /*border: red 1px solid;*/ margin:10px 5px 0 1px; float: left;cursor: move}
.createScroll2{overflow: scroll;height: 500px;width: 1000px;}
#droppable2 {height: 1000px;width: 1986px;overflow: auto}
.togglehide {display: none; z-index: -1}
.toggleshow {display: block;z-index: 9}
.block {background-color: #000}
.custom-modal-dialog {
  width: 90%;
  /*height: 100%;*/
  margin: auto;
  padding: 0;
}

.modal-content {
  height: auto;
  /*min-height: 100%;*/
  border-radius: 0;
}
  body{
    /* overflow: hidden; */
  }
  #minimap {
    position: fixed;
    width: 200px;
    height: 155px;
    top: 6px;
    right: 24px;
    background-color: #EEE;
    border: 1px solid #AAA;
    opacity: 0.9;
    z-index: 201;
  }

			.minimap-node {
				position: absolute;
        background-color: white;
        background-image: url("../../static/images/background.jpg");
			}

			.minimap-viewport {
				position: absolute;
				box-sizing: border-box;
				/* //background-color: rgba(79, 111, 126, 0.4); */
		    background-color: indianred;        
				z-index: 1;
				cursor: move;
			}
      .imageCss{
        width: 1000px !important;
        height: 1000px !important;
        background-color: white; 
        overflow: visible;
      }
      .rt-45{
        /* transform: rotateZ(-45deg); */
        margin-left: 20%;
        margin-top: 25%;        
      }
      .tp-14{
        position: fixed;
        top: 14px;
        right: 35px;
        cursor: pointer;
        z-index: 201;
        background: white;
        width: 25px;
        height: 25px;
        border-radius: 5px;
        box-shadow: 2px 2px 2px;
      }
      /* ****************** Rotate minimap icon ****************/
      .fa-arrow-down{
        transform: rotate(225deg);
        transition: transform .25s linear;
      }
      .fa-arrow-open{
        transform: rotate(-45deg);
        transition: transform .25s linear;
      }
      .card__text{
            background: white;
            height: 600px;
      }
      .navigation-drawer--open{
        background: white;
        box-shadow: 0px 0px 7px 0px;
        /* z-index: 2 */
      }
      .navigation-drawer:not(.navigation-drawer--is-booted){
         z-index: 2
      }
      .content{
        height: 100%;
        background: white
      }
      .content--wrap{
        height: 100%;
      }
/*
sql designer
 */
 @import "/static/flowchart/css/jquery.flowchart.css";
 /* @import "/static/minimap/minimap.css"; */
 /*@import "/static/sqldesigner/styles/print.css";*/

</style>
