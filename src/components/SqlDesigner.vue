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
		<div id="page-content-wrapper">
		    <div id="page-content">
		        <div class="container">





		<!-- {{dataStr}} -->


		<!-- <input type="text" class="form-control" name="" v-model="step"> -->
    <button  type="button" class="btn success" name="buttonUpdate" @click="updateStep">Update</button><br><br>
    <div id="area"></div>

	<div id="controls">
		<div id="bar">
			<div id="toggle"></div>
			<input type="button" id="saveload" style="display:none"/>

			<hr/>

			<input type="button" id="addtable" />
			<input type="button" id="edittable" />
			<input type="button" id="tablekeys" />
			<input type="button" id="removetable" />
			<input type="button" id="aligntables" />
			<input type="button" id="cleartables" />

			<hr/>

			<input type="button" id="addrow" />
			<input type="button" id="editrow" />
			<input type="button" id="uprow" class="small" />
			<input type="button" id="downrow" class="small"/>
			<input type="button" id="foreigncreate" />
			<input type="button" id="foreignconnect" />
			<input type="button" id="m2mforeignconnect" />
			<input type="button" id="foreigndisconnect" />
			<input type="button" id="removerow" />

			<hr/>

			<input type="button" id="options" />
			<a href="https://github.com/ondras/wwwsqldesigner/wiki" target="_blank"><input type="button" id="docs" value=""  style="display:none"/></a>
		</div>

		<div id="rubberband"></div>

		<div id="minimap"></div>

		<div id="background"></div>

		<div id="window">
			<div id="windowtitle"><img id="throbber" src="/static/sqldesigner/images/throbber.gif" alt="" title=""/></div>
			<div id="windowcontent"></div>
			<input type="button" id="windowok" />
			<input type="button" id="windowcancel" />
		</div>
	</div> <!-- #controls -->

	<div id="opts">
		<table>
			<tbody>
				<tr>
					<td>
						* <label id="language" for="optionlocale"></label>
					</td>
					<td>
						<select id="optionlocale"><option></option></select>
					</td>
				</tr>
				<tr>
					<td>
						* <label id="db" for="optiondb"></label>
					</td>
					<td>
						<select id="optiondb"><option></option></select>
					</td>
				</tr>
				<tr>
					<td>
						<label id="snap" for="optionsnap"></label>
					</td>
					<td>
						<input type="text" size="4" id="optionsnap" />
						<span class="small" id="optionsnapnotice"></span>
					</td>
				</tr>
				<tr>
					<td>
						<label id="pattern" for="optionpattern"></label>
					</td>
					<td>
						<input type="text" size="6" id="optionpattern" />
						<span class="small" id="optionpatternnotice"></span>
					</td>
				</tr>
				<tr>
					<td>
						<label id="hide" for="optionhide"></label>
					</td>
					<td>
						<input type="checkbox" id="optionhide" />
					</td>
				</tr>
				<tr>
					<td>
						* <label id="vector" for="optionvector"></label>
					</td>
					<td>
						<input type="checkbox" id="optionvector" />
					</td>
				</tr>
				<tr>
					<td>
						* <label id="showsize" for="optionshowsize"></label>
					</td>
					<td>
						<input type="checkbox" id="optionshowsize" />
					</td>
				</tr>
				<tr>
					<td>
						* <label id="showtype" for="optionshowtype"></label>
					</td>
					<td>
						<input type="checkbox" id="optionshowtype" />
					</td>
				</tr>
			</tbody>
		</table>

		<hr />

		* <span class="small" id="optionsnotice"></span>
	</div>

	<div id="io">
		<table>
			<tbody>
				<tr>
					<td style="width:60%">
						<fieldset>
							<legend id="client"></legend>
							<div id="singlerow">
							<input type="button" id="clientsave" />
							<input type="button" id="clientload" />
							</div>
							<div id="singlerow">
							<input type="button" id="clientlocalsave" />
							<input type="button" id="clientlocalload" />
							<input type="button" id="clientlocallist" />
							</div>
							<div id="singlerow">
								<input type="button" id="dropboxsave" /><!-- may get hidden by dropBoxInit() -->
								<input type="button" id="dropboxload" /><!-- may get hidden by dropBoxInit() -->
								<input type="button" id="dropboxlist" /><!-- may get hidden by dropBoxInit() -->
							</div>
							<hr/>
							<input type="button" id="clientsql" />
						</fieldset>
					</td>
					<td style="width:40%">
						<fieldset>
							<legend id="server"></legend>
							<label for="backend" id="backendlabel"></label> <select id="backend"><option></option></select>
							<hr/>
							<input type="button" id="serversave" />
							<input type="button" id="quicksave" />
							<input type="button" id="serverload" />
							<input type="button" id="serverlist" />
							<input type="button" id="serverimport" />
						</fieldset>
					</td>
				</tr>
				<tr>
					<td colspan="2">
						<fieldset>
							<legend id="output"></legend>
							<textarea id="textarea" rows="1" cols="1"></textarea><!--modified by javascript later-->
						</fieldset>
					</td>
				</tr>
			</tbody>
		</table>
	</div>

	<div id="keys">
		<fieldset>
			<legend id="keyslistlabel"></legend>
			<select id="keyslist"><option></option></select>
			<input type="button" id="keyadd" />
			<input type="button" id="keyremove" />
		</fieldset>
		<fieldset>
			<legend id="keyedit"></legend>
			<table>
				<tbody>
					<tr>
						<td>
							<label for="keytype" id="keytypelabel"></label>
							<select id="keytype"><option></option></select>
						</td>
						<td></td>
						<td>
							<label for="keyname" id="keynamelabel"></label>
							<input type="text" id="keyname" size="10" />
						</td>
					</tr>
					<tr>
						<td colspan="3"><hr/></td>
					</tr>
					<tr>
						<td>
							<label for="keyfields" id="keyfieldslabel"></label><br/>
							<select id="keyfields" size="5" multiple="multiple"><option></option></select>
						</td>
						<td>
							<input type="button" id="keyleft" value="&lt;&lt;" /><br/>
							<input type="button" id="keyright" value="&gt;&gt;" /><br/>
						</td>
						<td>
							<label for="keyavail" id="keyavaillabel"></label><br/>
							<select id="keyavail" size="5" multiple="multiple"><option></option></select>
						</td>
					</tr>
				</tbody>
			</table>
		</fieldset>
	</div>

	<div id="table">
		<table>
			<tbody>
				<tr>
					<td>
						<label id="tablenamelabel" for="tablename"></label>
					</td>
					<td>
						<input id="tablename" type="text" />
					</td>
				</tr>
				<tr>
					<td>
						<label id="tablecommentlabel" for="tablecomment"></label>
					</td>
					<td>
						<textarea rows="5" cols="40" id="tablecomment"></textarea>
					</td>
				</tr>
			</tbody>
		</table>
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
			stepForm: {"step": "", "data": ""},
			step: '',
			stepNo: '',
			designerObj: ''
		}
  },
  mounted () {
    console.log(this.$route.query.id);
		var d = new SQL.Designer();
		this.designerObj = d
		// this.$http.get('http://localhost:5000/v1/sqldesigner/demo').then(response => {
		// 	this.data = response.body
		// 	var parsedata = $.parseXML(response.body)
		// 	d.io.loadresponse(parsedata,200, response.headers);
		// })
  },
	methods: {
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
			// 
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
