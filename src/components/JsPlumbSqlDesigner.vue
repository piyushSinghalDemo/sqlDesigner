<template lang="html">
  <div class="" >
		<!--=========Model=======-->
		<div class="modal fade" id="myModal" role="dialog">
      <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Modal Header</h4>
          </div>
          <div class="modal-body">
            <p>
							<form  @submit.prevent="addStep" class="form-horizontal bordered-row">
								<div class="form-group">
                    <label class="col-sm-3 control-label">Step Name</label>
                    <div class="col-sm-6">
                        <input type="text"  v-model="stepForm.step" required class="form-control"  placeholder="Step Name" >
                    </div>
                </div>
								<div class="form-group">
                    <div class="col-sm-6">
                        <button class="btn success" type="submit" name="submit">Save</button>
                    </div>
                </div>
							</form>
            </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>

      </div>
    </div>
		<!--=========Model=======-->

		<!--=========Entity Model=======-->
		<div class="modal fade" id="entityModal" role="dialog">
      <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Modal Header</h4>
          </div>
          <div class="modal-body">
            <p>
							<form  @submit.prevent="addNewEntity" class="form-horizontal bordered-row">
								<div class="form-group">
                    <label class="col-sm-3 control-label">Entity Name</label>
                    <div class="col-sm-6">
                        <input type="text"  v-model="nodeForm.key" required class="form-control"  placeholder="Step Name" >
                    </div>
                </div>
								<div class="form-group">
                    <div class="col-sm-6">
                        <button class="btn success" type="submit" name="submit">Save</button>
                    </div>
                </div>
							</form>
            </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>

      </div>
    </div>
		<!--=========Entity Model End=======-->



		<!--=========Relationship Model=======-->

		<!--=========Relationship Model End=======-->

		<!--=========Connecting Relationship Model=======-->
		<div class="modal fade" id="connectRelationshipModal" role="dialog">
      <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Relathionship Model</h4>
          </div>
          <div class="modal-body">
            <p>
              {{relathionFormData}}
							<form  @submit.prevent="relathionShipModel" class="form-horizontal bordered-row">
								<div class="form-group">
                    <label class="col-sm-3 control-label">From</label>
                    <div class="col-sm-6">
                      {{relathionFormData.key}}
                    </div>

                </div>
								<div class="form-group">
                    <label class="col-sm-3 control-label">From Column</label>
                    <div class="col-sm-6">
                      <select class="form-control" name="" v-model="relathionFormData.from_col">
                        <option value="">Select</option>
                        <option v-for="(value, key) in tableColumns" :value="value.column">{{value.column}}</option>
                      </select>
                    </div>

                </div>
								<div class="form-group">
                    <label class="col-sm-3 control-label">To</label>
                    <div class="col-sm-6">
                      <select class="form-control" name="" v-model="relathionFormData.to">
                        <option value="">Select</option>
                        <option v-for="(value, key ) in jsPlumbData.nodeDataArray" :value="value.id">{{value.key}}</option>
                      </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label">To Column</label>
                    <div class="col-sm-6">
                      <select class="form-control" name="" v-model="relathionFormData.to_col">
                        <option value="">Select</option>
                        <option v-for="(value, key) in tableColumns" :value="value.column">{{value.column}}</option>
                      </select>
                      <!-- <input type="text" class="form-control" name="" v-model="relathionFormData.to_col"> -->
                    </div>

                </div>
								<div class="form-group">
                    <label class="col-sm-3 control-label">Type</label>
                    <div class="col-sm-6">
                      <select class="form-control" name="" v-model="relathionFormData.type">
                        <option value="">Select</option>
                        <option value="one-to-one">One to One</option>
                        <option value="one-to-many">One to Many</option>
                        <option value="many-to-many">Many to Many</option>
                      </select>
                    </div>
                </div>
								<div class="form-group">
                    <div class="col-sm-6">
                        <button class="btn success" type="submit" name="submit">Save</button>
                    </div>
                </div>
							</form>
            </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>

      </div>
    </div>
		<!--=========Connecting Relationship Model End=======-->



		<!--=========Clause Model=======-->
		<div class="modal fade" id="clauseModal" role="dialog">
      <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Clause Model</h4>
            {{jsPlumbData}}
          </div>
          {{clauseForm}}
          <div class="modal-body">
            <p>
							<form  @submit.prevent="saveClauseData" class="form-horizontal bordered-row">
								<div class="form-group">
                    <label class="col-sm-3 control-label">Column</label>
                    <div class="col-sm-6">
                      <select class="form-control" name="" v-model="clauseForm.column">
                        <option value="">Select</option>
                        <option v-for="(value, key) in tableColumns" :value="{name:value.column, columnType: value.type}">{{value.column}}</option>
                      </select>
                    </div>
                </div>
								<div class="form-group">
                    <label class="col-sm-3 control-label">Operators</label>
                    <div class="col-sm-6">
                      <select class="form-control" name="" v-model="clauseForm.operator">
                        <option value="">Select</option>
                        <option v-for="(value, key) in operators" :value="value.symbol">{{value.name}}</option>
                      </select>
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-sm-3 control-label">Value</label>
                    <div class="col-sm-6">
                      <!-- <input type="text"  class="form-control datetimepicker" v-model="clauseForm.value"> -->
                      <input type="text" class="form-control" v-model="clauseForm.value">
                      <!-- <input type="text" v-show="clauseForm.column.columnType === 'datetime'"  class="form-control datetimepicker" v-model="clauseForm.value">
                      <input type="text" v-show="clauseForm.column.columnType === 'integer'" class="form-control" v-model="clauseForm.value">
                      <input type="text" v-show="clauseForm.column.columnType === 'string'" class="form-control" v-model="clauseForm.value">
                      <input type="text" v-show="clauseForm.column.columnType === 'date'" class="form-control" v-model="clauseForm.value">
                      <input type="text" v-if="clauseForm.column.columnType === ''" class="form-control" v-model="clauseForm.value"> -->
                    </div>
                </div>
								<div class="form-group">
                    <div class="col-sm-6">
                        <button class="btn success" type="submit" name="submit">Save</button>
                    </div>
                </div>
							</form>
            </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>

      </div>
    </div>
		<!--=========Clause Model End=======-->

    <div id="page-sidebar">
		<div class="scroll-sidebar">
			<table class="table table-striped">
              <thead>
                <tr>
                  <td><span class="header">Business Objects12</span></td>
                  <td></td>
                </tr>
              <tr class="header">
                  <th>Workflow Objects</th>
                  <th>Action</th>
              </tr>

              </thead>
              <tbody>
                <tr v-for="(collection, key) in dataStr.workflow">
                  <td><a href="javascript:;"  @click="renderData(key, collection)"><span>{{collection.step}}</span></a></td>
                  <td><span><button type="button" class="btn danger" name="button" @click="remove(key)">X</button></span></td>
                </tr>

              </tbody>
      </table>
			<ul id="sidebar-menu">

	    <!-- <li class="header"><span>Business Objects</span></li> -->

	    <li>
	      <!-- <router-link to="/calendar" ><i class="glyph-icon icon-linecons-calendar"></i><span>Calendar</span></router-link> -->
	    </li>
	    <li>
	      <!-- <a href="/sqldesigner"><i class="glyph-icon icon-linecons-calendar"></i><span>SqlDesigner</span></a> -->
	      <!-- <router-link to="/sqldesigner" ><i class="glyph-icon icon-linecons-calendar"></i><span>SqlDesigner</span></router-link> -->
	    </li>


	    <li>
	        <!-- <a href="#" title="Helpers">
	            <i class="glyph-icon icon-linecons-doc"></i>
	            <span>Workflow</span>
	        </a> -->
	        <div class="sidebar-submenu">

	            <ul>
	                <!-- <li><a href="helper-classes.html" title="Helper classes"><span>Helper classes</span></a></li>
	                <li><a href="page-transitions.html" title="Page transitions"><span>Page transitions</span></a></li>
	                <li><a href="animations.html" title="Animations"><span>Animations</span></a></li> -->

	            </ul>

	        </div><!-- .sidebar-submenu -->
	    </li>
			<li><button type="button" class="btn success" name="button" @click="openModal">+</button></li>
	    </ul><!-- #sidebar-menu -->

		</div>
		</div>

		    <div   id="page-content">
		        <div class="">

    <div class="row">
        <div class="col-md-12">
<div class="panel">
            <div class="panel-body">

                <div class="example-box-wrapper">
                    <ul id="myTab" class="nav clearfix nav-tabs">
                        <li class="active"><a href="#home" data-toggle="tab">Definition</a></li>
                        <li class=""><a href="#profile" data-toggle="tab">Actions</a></li>

                    </ul>
                    <div id="myTabContent" class="tab-content">
                        <div class="tab-pane fade active in" id="home">
                          <button type="button" class="btn success" name="buttonaddNewEntity" @click="entityModal()">Add New Entity</button>
                          <button type="button" class="btn success" name="buttonconnectRelationshipModal" id="deleteallcons">Delete All Connection</button>
                          <button type="button" class="btn success" name="buttonUpdate" @click="updateStep">Run</button>
                                <div class="jtk-demo-canvas canvas-wide dynamic-demo jtk-surface jtk-surface-nopan" id="canvas">
                                    <div class="window jtk-endpoint-anchor jtk-connected jtk-draggable jtk-endpoint-anchor-baz" v-for="(value, key ) in jsPlumbData.nodeDataArray" :id="value.id">
                                      <div class="form-group">
                                          <div class="col-sm-12">
                                            <strong class="table_name">{{value.key}}</strong>
                                          </div>
                                      </div>
                                      <div class="form-group">
                                          <div class="col-sm-12">
                                            <button type="button" class="btn success" name="button" @click="connectRelationshipModal(value)">Add Relation</button>
                                          </div>
                                      </div>

                                    </div>

                                  </div>


                        </div>
                        <div class="tab-pane fade" id="profile">
                          <button  type="button" class="btn success" name="buttonaddNewEntity" @click="clauseModal('where')">Where</button>
                          <button  type="button" class="btn success" name="buttonaddNewEntity" @click="clauseModal('or')">OR</button>

                          <!-- <button  type="button" class="btn success" name="buttonUpdate" @click="updateStep">Save</button> -->
                          <div class="jtk-demo-canvas canvas-wide dynamic-demo jtk-surface jtk-surface-nopan" id="canvas2">
                              <div class="window jtk-endpoint-anchor jtk-connected jtk-draggable jtk-endpoint-anchor-baz" id="dynamicWindow1Canvas2">
                                <div class="form-group">
                                    <div class="col-sm-12">
                                      <strong>Data</strong>
                                    </div>
                                </div>
                              </div>

                              <div class="window jtk-endpoint-anchor jtk-connected jtk-draggable jtk-endpoint-anchor-baz" id="dynamicWindow2Canvas2">
                                <div class="form-group">
                                    <div class="col-sm-12">
                                      <strong>Where</strong>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-sm-12">
                                      <button type="button" class="btn success" name="button" @click="connectRelationshipModal()">Add Relation</button>
                                    </div>
                                </div>
                              </div>

                              <div class="window jtk-endpoint-anchor jtk-connected jtk-draggable jtk-endpoint-anchor-baz" id="dynamicWindow3Canvas2">
                                <div class="form-group">
                                    <div class="col-sm-12">
                                      <strong>OR</strong>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-sm-12">
                                      <button type="button" class="btn success" name="button" @click="connectRelationshipModal()">Add Relation</button>
                                    </div>
                                </div>
                              </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
</div>
</div>


	<simplert useRadius=true
		useIcon=true
		ref="simplert">
	</simplert>
</div>
</div>


  </div>
</template>

<script>
import Simplert from 'vue2-simplert'
export default {
	components: {
    Simplert
  },
  data () {
		return {
			dataStr: {
						  "business_objs" : {
								"name" : "",
								"date" : "",
								"data" : ""
							},
						  "workflow" : []
						},
			dom: {},
      gojs: '',
      jsObj: '',
      HTMLcontent: '',
      connectionData: {},
      operators:[
                {name: "Equal", symbol: "="},
                {name: "Greater and Equal", symbol: ">="},
                {name: "Less and Equal", symbol: "<="},
                {name: "Not Equal", symbol: "!="},
                {name: "Like", symbol: "%"}
              ],
      jsPlumbData: {nodeDataArray: [], linkDataArray: [], linkDataBackend: [], actionsData: {where:[], or:[]}},
			stepForm: {"step": "", "data": {nodeDataArray: [], linkDataArray: [], linkDataBackend: [], actionsData: {where:[], or:[]}}},
      tableColumns: [],
      clauseForm: {column: {name:"", clauseType: ""}, operator: "", value: ""},
      clauseType: 'where',
      nodeForm:  {"key":"", "items":[]},
      relathionFormData: {from: "", from_col:"", to: "", to_col:"", type: ""},
      nodeDataArray: [],
      nodeDataArrayItems: {},
      linkDataArray: [{ from: "", to: "", text: "", toText: "" }],
			step: '',
      selectModel: '',
			stepNo: '',
			designerObj: ''
		}
  },
  computed: {
        total: function() {
            return this.value.interval ? (this.value.interval * this.value.multiplier).toFixed(2) : 0
        }
    },
  mounted () {


    var _this = this
    this.getTableColumns()
    $('.datetimepicker').datetimepicker({
      //defaultDate: '2017-06-20',
      format : "YYYY-MM-DD H:mm:s"
    }).on("dp.change", (e) =>  {
      this.clauseForm.value = e.date.format("YYYY-MM-DD H:mm:s");
    });
    var condata =  {
              "dynamicWindow1Canvas2": ["dynamicWindow2Canvas2"],
              "dynamicWindow2Canvas2": ["dynamicWindow3Canvas2"]

          }
    setTimeout(()=>{

      // renderAction(condata)
     },1000);


  },
	methods: {
    detachEveryConnection(){
       $('#deleteallcons').click();
    },

    addNewEntity(){
      var data = { key: this.nodeForm.key, id: "dynamicWindow" + (parseInt(this.jsPlumbData.nodeDataArray.length) + 1)}
      this.jsPlumbData.nodeDataArray.push(data)
      // render()
      $('#entityModal').modal('hide')
    },
    relathionShipModel(){
      var _this = this
      var from = this.relathionFormData.from
      var to = this.relathionFormData.to
      var type = this.relathionFormData.type
      var data = {[from]: [to]}
      _this.jsPlumbData.linkDataArray.push(data)
      _this.jsPlumbData.linkDataBackend.push({from: $("#"+from + " .table_name").text() + "." + this.relathionFormData.from_col, to: $("#"+to+ " .table_name").text() + "." + this.relathionFormData.to_col, type: type})
      render(data)
      $('#connectRelationshipModal').modal("hide");
    },

    entityModal(data) {
      $('#entityModal').modal();
    },
    relationshipModal(data) {
      $('#relationshipModal').modal();
    },
    connectRelationshipModal(data) {
      console.log(data);
      this.relathionFormData.key = data.key
      this.relathionFormData.from = data.id
      $('#connectRelationshipModal').modal();
    },

    /*
    for actions
     */
     getTableColumns (){
       //make dynamic call to api and get the table columns
       this.tableColumns = [{column:"column1", type: "integer"}, {column: "column2", type: "string"}, {column: "column3", type: "date"}, {column: "column4", type: "datetime"}]
     },

     clauseModal (type){
       this.clauseType = type;
       $("#clauseModal").modal()
     },

     saveClauseData (){
       if (this.clauseType == 'where') {
         this.jsPlumbData.actionsData.where.push(this.clauseForm)
       }else {
         this.jsPlumbData.actionsData.or.push(this.clauseForm)
       }
       this.clauseForm = {column: {name: "", columnType: ""}, "operator": "", "value": "" }
       this.updateStep()
     },

      //########################################################################################################


      addStep () {
  			var step = this.stepForm.step.toLowerCase();
  			if(!this.isStepExist(step)){
  					this.step = step
  					this.dataStr.workflow.push({"step": step, "data": {nodeDataArray: [], linkDataArray: [], linkDataBackend: [], actionsData: {where:[], or:[]}}})
  					this.stepForm.step = ''
  					$('#myModal').modal('hide');
  			}
  			else {
  				let obj = {
  				    title: 'Duplicate Alert',
  				    message: 'This Step already exist in json document',
  				    type: 'error'
  				}
  				this.$refs.simplert.openSimplert(obj)
  				// alert("This Step already exist in json document")
  			}
		},
		updateStep () {
      console.log("396" +this.step + " step no" + this.stepNo);
			if(!this.step){
				alert("Please select the step.")
				return
			}

			var stepData = this.dataStr.workflow[this.stepNo]
      console.log(stepData);
			var step = this.step
      var jsonStringData = JSON.parse(JSON.stringify(this.jsPlumbData)) //copy the jsPlumbData data objects
      //push data to api
      console.log(this.host);
      this.$http.post(this.yaml_host + '/yaml', jsonStringData, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        alert('data saved')
      });
			stepData.data = jsonStringData
		},

		renderData (key, collection) {
      $('#deleteallcons').click();
      var stepData = collection.data
      console.log(collection.data);
      console.log(collection.data.nodeDataArray);

      this.stepNo = key
      this.step = collection.step
			console.log(this.step + this.stepNo);
      this.jsPlumbData.nodeDataArray = stepData.nodeDataArray
      this.jsPlumbData.linkDataArray = stepData.linkDataArray
      this.jsPlumbData.linkDataBackend = stepData.linkDataBackend
      this.jsPlumbData.actionsData = stepData.actionsData

      var b = {};
      $.each(this.jsPlumbData.linkDataArray, function(key, value) {
         $.each(value, function(k1, v1) {
           b[k1] = v1

        });
     })
     this.connectionData = b

     setTimeout(()=>{
       render(this.connectionData)
      },1000);

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
		isStepExist (step) {
			for(var i=0; i < this.dataStr.workflow.length; i++){
        if( this.dataStr.workflow[i].step == step){
          return true
        }
      }
      return false
		},
		openModal(data) {
      $('#myModal').modal();
    },

		findByStep: (step) => {
        this.users.find((usr) => {
           return usr.token === token
        });
    }

	}
}
</script>

<style lang="css">
/*
sql designer
 */
 @import "/static/sqldesigner/styles/style.css";
 /*@import "/static/sqldesigner/styles/print.css";*/
</style>
