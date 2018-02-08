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
		<div class="modal fade" id="relationshipModal" role="dialog">
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
                    <label class="col-sm-3 control-label">From</label>
                    <div class="col-sm-12">
                      <table class="table table-striped">
                              <thead>

                              <tr class="header">
                                  <th>Workflow Objects</th>
                                  <th>Action</th>
                              </tr>

                              </thead>
                              <tbody>
                                <tr v-for="(collection, key) in nodeDataArray">
                                  <td>
                                    <a href="javascript:;" @click="renderData(key, collection)"><span>{{key}}{{collection.key}}</span></a>
                                  </td>
                                  <td>
                                    <span><button type="button" name="button">Manage Columns</button></span>
                                    <span><button type="button" class="btn danger" name="button" @click="removeNode(collection.key)">X</button></span>
                                  </td>
                                </tr>

                              </tbody>
                      </table>

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
		<!--=========Relationship Model End=======-->

		<!--=========Connecting Relationship Model=======-->
		<div class="modal fade" id="connectRelationshipModal" role="dialog">
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
                    <label class="col-sm-3 control-label">From</label>
                    <div class="col-sm-12">

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

		<div id="page-sidebar">
		<div class="scroll-sidebar">
			<table class="table table-striped">
              <thead>
                <tr>
                  <td><span class="header">Business Objects</span></td>
                  <td></td>
                </tr>
              <tr class="header">
                  <th>Workflow Objects</th>
                  <th>Action</th>
              </tr>

              </thead>
              <tbody>
                <tr v-for="(collection, key) in dataStr.workflow">
                  <td><a href="javascript:;" @click="renderData(key, collection)"><span>{{collection.step}}</span></a></td>
                  <td><span><button type="button" class="btn danger" name="button" @click="remove(collection)">X</button></span></td>
                </tr>

              </tbody>
      </table>


		</div>
		</div>
		<div id="page-content-wrapper">
		    <div id="page-content">
		        <div class="container">





		<!-- {{dataStr}} -->


		<!-- <input type="text" class="form-control" name="" v-model="step"> -->
    <button  type="button" class="btn success" name="buttonUpdate" @click="updateStep">Update</button><br><br>
    <button  type="button" class="btn success" name="buttonaddNewEntity" @click="entityModal()">Add New Entity</button>
    <button  type="button" class="btn success" name="buttonrelationshipModal" @click="relationshipModal()">Edit</button>
    <button  type="button" class="btn success" name="buttonconnectRelationshipModal" @click="connectRelationshipModal()">Connect</button>



    <div id="sample">
      <div id="myDiagramDiv" style="background-color: white; border: solid 1px black; width: 100%; height: 700px"></div>
    <button @click="addNodeElement()">Click</button>

    </div>





	<simplert useRadius=true
		useIcon=true
		ref="simplert">
	</simplert>
</div>
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
			stepForm: {"step": "", "data": ""},
      nodeForm:  {"key":"", "items":[]},
      nodeDataArray: [],
      nodeDataArrayItems: {},
      linkDataArray: [
          { from: "", to: "", text: "", toText: "" }

        ],
			step: '',
      selectModel: '',
			stepNo: '',
			designerObj: ''
		}
  },
  mounted () {
    var _this = this
    var d = goInIt()
    this.gojs = d;
    var item = ''

    var jsonModel = JSON.parse(d.model.toJson())
    _this.nodeDataArray = jsonModel.nodeDataArray

  },
	methods: {

    nodeDataArrayItems(items){
      // this.nodeDataArrayItems = {key: key, items:items};
      console.log(items);
    },
    addNodeElement(){

        console.log(this.gojs.model.nodeDataArray)
        this.gojs.model.nodeDataArray.push({ key: "world1",
        items: [ { name: "OrderID", iskey: true, figure: "Decision", color: "#000" }
                  ] })

        console.log(this.gojs.model.nodeDataArray);
        console.log(this.gojs.model.linkDataArray);
        this.gojs.model.linkDataArray.push({ from: "Categories", to: "world1", text: "1", toText: "0..N" })
        console.log(this.gojs.model.linkDataArray);

        myDiagram.model = new go.GraphLinksModel(this.gojs.model.nodeDataArray, this.gojs.model.linkDataArray);
    },

    addNewEntity(){
      console.log(this.nodeForm);
      var data = { key: this.nodeForm.key,
           items: [
                    { name: "id", iskey: true, figure: "Decision", color: "#000" }
                  ]}
      this.gojs.model.addNodeData(data);
      // myDiagram.model = new go.GraphLinksModel(this.gojs.model.nodeDataArray, this.gojs.model.linkDataArray);

      $('#entityModal').modal('hide');
      this.updateGoJSModelData()
    },


    entityModal(data) {
      $('#entityModal').modal();
    },
    relationshipModal(data) {
      $('#relationshipModal').modal();
    },
    connectRelationshipModal(data) {
      $('#connectRelationshipModal').modal();
    },

    removeNode(key){
      var b = myDiagram.model.findNodeDataForKey(key);
        this.gojs.model.removeNodeData(b)
        this.updateGoJSModelData()
    },
    updateGoJSModelData(){
      this.nodeDataArray = JSON.parse(this.gojs.model.toJson()).nodeDataArray
    },
      //########################################################################################################





      addStep () {
			var step = this.stepForm.step.toLowerCase();

			if(!this.isStepExist(step)){
					this.step = step
					var a = this.designerObj.io.owner
					this.dataStr.workflow.push({"step": step, "data": a.toXML()})
					this.stepForm.step = ''
					let obj = {
					    title: 'Diagram Saved',
					    message: 'Diagram Saved Sucessfully.',
					    type: 'success'
					}
					this.$refs.simplert.openSimplert(obj)
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
			if(!this.step){
				alert("Please select the step.")
				return
			}

			// if(!this.isStepExist(this.step)){
			// 	alert("This Step doesn't Exist.")
			// 	return
			// }
			this.dataStr.workflow.splice(this.stepNo, 1)
			var step = this.step
			var a = this.designerObj.io.owner
			this.dataStr.workflow.push({"step": step, "data": a.toXML()})
			let obj = {
			    title: 'Diagram Saved',
			    message: 'Diagram Saved Sucessfully.',
			    type: 'success'
			}
			this.$refs.simplert.openSimplert(obj)
		},
		saveDiagram (data) {

		},
		getData (data){
			console.log(this.designerObj);
			var a = this.designerObj.io.owner
			console.log(a.toXML());

			this.dataStr.workflow.push({"step": "003", "data": a.toXML()})
		},

		renderData (key, collection) {
			if(collection.data){
				this.stepNo = key
				this.step = collection.step
				var parsedata = $.parseXML(collection.data)
				this.designerObj.io.loadresponse(parsedata,200);
			}

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

			// console.log(data);
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
