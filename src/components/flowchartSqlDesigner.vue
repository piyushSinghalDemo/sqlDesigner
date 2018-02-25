<template lang="html">
  <div class="" >
    <!---==========Copy Modal ============-->
    <div class="modal fade" id="copyModal" role="dialog">
      <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
          <form  class="form-horizontal" @submit.prevent="saveModalForm(copyForm, 'copyModal')">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Copy Modal</h4>
          </div>
          <div class="modal-body">
            <p>

                <p><h4>From</h4></p>
								<div class="form-group">
                    <label class="col-sm-3 control-label">Driver Table/View</label>
                    <div class="col-sm-6">
                        <select class="form-control " name="" v-model="copyForm.driverTable">
                          <option value="">Select</option>
                          <option value="DS1 Staging">DS1 Staging</option>
                          <option value="DS2 Production">DS2 Production</option>
                        </select>
                    </div>
                </div>

                <br>
                <h4>To</h4>

								<div class="form-group">
                    <label class="col-sm-3 control-label">Table</label>
                    <div class="col-sm-6">
                        <select class="form-control" name="" v-model="copyForm.table">
                          <option value="">Select</option>
                          <option value="f4031">f4031</option>
                          <option value="f4032">f4032</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label">Truncate destination before copy</label>
                    <div class="col-sm-6">
                        <input type="checkbox" name="vehicle" value="Bike" v-model="copyForm.truncateDestBeforeCopy">
                    </div>
                </div>
								<div class="form-group">
                    <label class="col-sm-3 control-label">Incremental copy</label>
                    <div class="col-sm-6">
                        <input type="checkbox" name="vehicle" value="Bike" v-model="copyForm.incrementalCopy">
                    </div>

                    <div class="col-sm-6">
                      <div class="radio">
                        <label><input type="radio" name="optradio">Only new records</label>
                      </div>
                      <div class="radio">
                        <label><input type="radio" name="optradio">Overwrite existing records</label>
                      </div>
                      <div class="form-group">
                        <label >Commit Size</label>
                        <input type="text" class="form-control" v-model="copyForm.commitSize"> records
                      </div>
                    </div>
                </div>
            </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Save</button>
          </div>
          </form>
        </div>

      </div>
    </div>
    <!---==========Copy Modal ============-->
    <!---==========Archive Modal ============-->
    <div class="modal fade" id="archiveModal" role="dialog">
      <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
          <form  class="form-horizontal" @submit.prevent="saveModalForm(archiveForm, 'archiveModal')">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Archive Modal</h4>
          </div>
          <div class="modal-body">
            <p>


								<div class="form-group">

                    <label class="col-sm-3 control-label">Driver Table</label>
                    <div class="col-sm-6">
                        <select class="form-control " name="" v-model="archiveForm.driverTable">
                          <option value="">Select</option>
                          <option value="DS1 Staging">DS1 Staging</option>
                          <option value="DS2 Production">DS2 Production</option>
                        </select>
                    </div>
                </div>
								<div class="form-group">
                    <label class="col-sm-3 control-label">Allow selective restore</label>
                    <div class="col-sm-6">
                        <input type="checkbox" name="vehicle" value="Bike" v-model="archiveForm.allowSelectiveRestore">
                    </div>
                </div>
								<div class="form-group">
                    <label class="col-sm-3 control-label">Duplicate Processing</label>
                    <div class="col-sm-6">
                        <input type="checkbox" name="vehicle" value="Bike" >
                    </div>

                    <div class="col-sm-6">
                      <div class="radio">
                        <label><input type="radio" name="optradio" v-model="archiveForm.duplicateProcessing">Skip duplicate records</label>
                      </div>
                      <div class="radio">
                        <label><input type="radio" name="optradio" v-model="archiveForm.duplicateProcessing">Migrate duplicate records</label>
                      </div>

                    </div>

                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label">Commit Size</label>
                    <div class="col-sm-6">
                        <input type="text" class="form-control" name="commit_size" v-model="archiveForm.commitSize"> Records
                    </div>
                </div>

            </p>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-default">Save</button>
          </div>
        </form>
        </div>

      </div>
    </div>
    <!---==========Archive Modal ============-->
    <!---==========Purge Modal ============-->
    <div class="modal fade" id="purgeModal" role="dialog">
      <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
          <form  class="form-horizontal" @submit.prevent="saveModalForm(purgeForm, 'purgeModal')">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Purge Modal</h4>
          </div>
          <div class="modal-body">
            <p>

								<div class="form-group">

                    <label class="col-sm-3 control-label">Driver Table</label>
                    <div class="col-sm-6">
                        <select class="form-control " name="" v-model="purgeForm.driverTable">
                          <option value="">Select</option>
                          <option value="">DS1 Staging</option>
                          <option value="">DS2 Production</option>
                        </select>
                    </div>
                </div>
								<div class="form-group">
                    <label class="col-sm-3 control-label">Commit Size</label>
                    <div class="col-sm-6">
                        <input type="text" class="form-control" name="commit_size" v-model="purgeForm.commitSize"> Records
                    </div>
                </div>
            </p>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-default">Save</button>
          </div>
          </form>
        </div>

      </div>
    </div>
    <!---==========Purge Modal ============-->

    <!---==========Report Modal ============-->
    <div class="modal fade" id="reportModal" role="dialog">
      <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
          <form  class="form-horizontal" @submit.prevent="saveModalForm(reportForm, 'reportModal')">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Report Modal</h4>
          </div>
          <div class="modal-body">
            <p>

                <p><h4>Report Source</h4></p>
                <div class="form-group">
                    <label class="col-sm-3 control-label">Source</label>
                    <div class="col-sm-6">
                        <select class="form-control " name="" v-model="reportForm.source">
                          <option value="">Select</option>
                          <option value="">DS1 Staging</option>
                          <option value="">DS2 Production</option>
                          <option value="">Step1</option>
                          <option value="">Step2</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label">Description</label>
                    <div class="col-sm-6">
                        <textarea class="form-control" name="name" v-model="reportForm.description"></textarea>
                    </div>
                </div>
                <br>
                <h4>Report Type</h4>
                <div class="form-group">

                    <label class="col-sm-3 control-label">Data Source</label>
                    <div class="col-sm-6">
                        <select class="form-control " name="" v-model="reportForm.dataSource">
                          <option value="">Select</option>
                          <option value="">PDF</option>
                          <option value="">CSV</option>
                        </select>
                    </div>
                </div>
            </p>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-default" >Save</button>
          </div>
          </form>
        </div>

      </div>
    </div>
    <!---==========Report Modal ============-->

    <!---==========Duplicate Modal ============-->
    <div class="modal fade" id="duplicateModal" role="dialog">
      <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
          <form  class="form-horizontal" @submit.prevent="saveModalForm(duplicateForm, 'duplicateModal')">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Duplicate Modal</h4>
          </div>
          <div class="modal-body">
            <p>

                <p><h4>Compare: </h4></p>
                <div class="form-group">
                    <label class="col-sm-3 control-label">Table/View/Alias</label>
                    <div class="col-sm-6">
                        <select class="form-control " name="" v-model="duplicateForm.comapre_table_view">
                          <option value="">Select</option>
                          <option value="">Table 1</option>
                          <option value="">Table 2</option>
                          <option value="">Table 3</option>
                        </select>
                    </div>
                </div>

                <br>
                <h4>With: </h4>
                <div class="form-group">

                    <label class="col-sm-3 control-label">Table/View/Alias</label>
                    <div class="col-sm-6">
                        <select class="form-control " name="" v-model="duplicateForm.with_table_view">
                          <option value="">Select</option>
                          <option value="">Table 4</option>
                          <option value="">Table 5</option>
                          <option value="">Table 6</option>
                        </select>
                    </div>
                </div>

            </p>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-default" >Save</button>
          </div>
          </form>
        </div>

      </div>
    </div>
    <!---==========Duplicate Modal ============-->




    <!---==========Conditional Modal ============-->
    <div class="modal fade" id="conditionalModal" role="dialog">
      <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
          <form  class="form-horizontal bordered-row" @submit.prevent="saveModalForm(conditionForm, 'conditionalModal')">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Conditional Modal</h4>
          </div>
          <div class="modal-body">
            <p>

								<div class="form-group">
                    <label class="col-sm-3 control-label">Step Name</label>
                    <div class="col-sm-6">
                        <select class="form-control" name="" v-model="conditionForm.stepName">
                          <option value="">Select</option>
                          <option value="option1">Option 1</option>
                        </select>
                    </div>
                </div>
								<div class="form-group">
                    <label class="col-sm-3 control-label">Description</label>
                    <div class="col-sm-6">
                        <textarea class="form-control" name="name" v-model="conditionForm.description"></textarea>
                    </div>
                </div>
            </p>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-default" >Save</button>
          </div>
        </form>
        </div>

      </div>
    </div>
    <!---==========Conditional Modal ============-->

    <!--============SP model===============-->
    <div class="modal fade" id="spStepModal" role="dialog">
      <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
          <form  class="form-horizontal" @submit.prevent="saveModalForm(spForm, 'spStepModal')">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Modal Header</h4>
          </div>
          <div class="modal-body">
            <p>

								<div class="form-group">
                    <label class="col-sm-3 control-label">Stored Procedures</label>
                    <div class="col-sm-6">
                        <select class="form-control" name="" v-model="spForm.sp">
                          <option value="">Select</option>
                          <option value="">SP1</option>
                          <option value="">SP2</option>
                        </select>
                    </div>
                </div>
								<div class="form-group">
                    <label class="col-sm-3 control-label">Input Variables</label>
                    <div class="col-sm-6">
                        <textarea class="form-control" name="name" v-model="spForm.inputVariables"></textarea>
                    </div>
                </div>
								<div class="form-group">
                    <label class="col-sm-3 control-label">Output Variables</label>
                    <div class="col-sm-6">
                        <textarea class="form-control" name="name" v-model="spForm.outputVariables"></textarea>
                    </div>
                </div>
								<!-- <div class="form-group">
                    <div class="col-sm-6">
                        <button class="btn success" type="submit" name="submit">Save</button>
                    </div>
                </div> -->

            </p>
          </div>
          <div class="modal-footer">
            <!-- <button type="submit" class="btn btn-default" data-dismiss="modal">Save</button> -->
            <button type="submit" class="btn btn-default">Save</button>
          </div>
          </form>
        </div>

      </div>

    </div>
    <!--============SP model===============-->

    <!--=========Model=======-->
    <div class="modal fade col-sm-12" id="myModal" role="dialog">
      <div class="modal-dialog custom-modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Modal Header</h4>
          </div>
          <div class="modal-body">
            <div class="panel">
                        <div class="panel-body">

                            <div class="example-box-wrapper">
                                <ul id="myTab" class="nav clearfix nav-tabs">
                                    <li class="active"><a href="#home" data-toggle="tab">Actions</a></li>
                                    <li class=""><a href="#profile" data-toggle="tab">Wiki</a></li>

                                </ul>
                                <div id="myTabContent" class="tab-content">
                                    <div class="tab-pane fade active in" id="home">
                                      <div class="" style="background-color:#f0f0f0; border: 1px solid #ccc">
                                      <div class="">
                                      <!-- <div class="scrollable-content scrollable-slim-sidebar"> -->
                                      <div class="pad15A">
                                      <a href="#" title="" data-toggle="collapse" data-target="#sidebar-toggle-1" class="popover-title">
                                          Title
                                          <span class="caret"></span>
                                      </a>
                                      <div class="panel panel-default">
                                      <div id="sidebar-toggle-1" class="collapse in">
                                          <div class="pad15A container">
                                              <div class="row ">
                                                <!-- {{blockData}} -->
                                                  <div class="col-md-12">
                                                      <input type="text"  class="form-control" placeholder="Table name" v-on:keyup="operatorClick()" v-model="blockData.properties.title">
                                                  </div>

                                              </div>

                                          </div>
                                      </div>
                                      </div>


                                      <div class="clear"></div>
                                      <div class="panel panel-default">
                                      <a href="#" title="" data-toggle="collapse" data-target="#sidebar-toggle-6" class="popover-title">
                                          Input
                                          <span class="caret"></span>
                                      </a>
                                      <div id="sidebar-toggle-6" class="collapse in">

                                          <ul class="files-box">
                                              <li v-for="(item, index) in blockData.properties.inputs">
                                                  <input type="text" name="" value="" class="form-control" v-model="item.label" v-on:keyup="operatorClick()">
                                                  <div class="files-buttons">
                                                      <a href="#" class="btn btn-xs hover-danger tooltip-button" data-placement="left" title="Delete" @click="removeInput(index)">
                                                          <i class="glyph-icon icon-times"></i>
                                                      </a>
                                                  </div>
                                              </li>
                                              <li><button type="button" name="button" class="btn btn-success" @click="addInputs()">Add</button></li>

                                          </ul>

                                      </div>
                                      </div>
                                      <div class="clear"></div>
                                      <div class="panel panel-default">
                                        <a href="#" title="" data-toggle="collapse" data-target="#sidebar-toggle-3" class="popover-title">
                                            Output
                                            <span class="caret"></span>
                                        </a>
                                        <div id="sidebar-toggle-3" class="collapse in">

                                            <ul class="files-box">
                                              <li v-for="(item, index ) in blockData.properties.outputs">
                                                  <input type="text" name="" value="" class="form-control" v-model="item.label" v-on:keyup="operatorClick()">

                                                  <div class="files-buttons">
                                                      <a href="#" class="btn btn-xs hover-danger tooltip-button" data-placement="left" title="Delete" @click="removeOutput(index)">
                                                          <i class="glyph-icon icon-times"></i>
                                                      </a>
                                                  </div>
                                              </li>
                                              <li><button type="button" name="button" class="btn btn-success" @click="addOutputs()">Add</button></li>
                                            </ul>

                                        </div>
                                      </div>

                                      <div class="clear"></div>

                                      <div class="panel panel-default">
                                        <a href="#" title="" data-toggle="collapse" data-target="#sidebar-toggle-3" class="popover-title">
                                            Where
                                            <span class="caret"></span>
                                        </a>
                                        <div id="sidebar-toggle-3" class="collapse in">

                                            <ul class="files-box">
                                              <li v-for="(item, index ) in blockData.properties.outputs" class="">


                                                  <div class="files-buttons">
                                                      <a href="#" class="btn btn-xs hover-danger tooltip-button" data-placement="left" title="Delete" @click="removeOutput(index)">
                                                          <i class="glyph-icon icon-times"></i>
                                                      </a>
                                                  </div>
                                              </li>
                                              <li>
                                                <div class="form-group">
                                                  <select class="form-control" name="">
                                                    <option value="">Select</option>
                                                  </select><br>
                                                  <select class="form-control" name="">
                                                    <option value="">Select</option>
                                                  </select><br>
                                                  <input type="text" name="" value="" class="form-control" >
                                                </div>
                                              </li>
                                              <li>
                                                <button type="button" name="button" class="btn btn-success" @click="addOutputs()">Add</button>

                                              </li>
                                            </ul>

                                        </div>
                                      </div>

                                      <div class="clear"></div>
                                      <div class="panel panel-default">

                                        <a href="#" title="" data-toggle="collapse" data-target="#sidebar-toggle-3" class="popover-title">
                                            Or
                                            <span class="caret"></span>
                                        </a>
                                        <div id="sidebar-toggle-3" class="collapse in">

                                            <ul class="files-box">
                                              <li v-for="(item, index ) in blockData.properties.outputs">
                                                  <input type="text" name="" value="" class="form-control" v-model="item.label" v-on:keyup="operatorClick()">

                                                  <div class="files-buttons">
                                                      <a href="#" class="btn btn-xs hover-danger tooltip-button" data-placement="left" title="Delete" @click="removeOutput(index)">
                                                          <i class="glyph-icon icon-times"></i>
                                                      </a>
                                                  </div>
                                              </li>
                                              <li><button type="button" name="button" class="btn btn-success" @click="addOutputs()">Add</button></li>
                                            </ul>

                                        </div>
                                      </div>
                                      <div class="clear"></div>


                                      <div class="panel panel-default">
                                        <a href="#" title="" data-toggle="collapse" data-target="#sidebar-toggle-3" class="popover-title">
                                            Sort
                                            <span class="caret"></span>
                                        </a>
                                        <div id="sidebar-toggle-3" class="collapse in">

                                            <ul class="files-box">
                                              <li v-for="(item, index ) in blockData.properties.outputs">
                                                  <input type="text" name="" value="" class="form-control" v-model="item.label" v-on:keyup="operatorClick()">

                                                  <div class="files-buttons">
                                                      <a href="#" class="btn btn-xs hover-danger tooltip-button" data-placement="left" title="Delete" @click="removeOutput(index)">
                                                          <i class="glyph-icon icon-times"></i>
                                                      </a>
                                                  </div>
                                              </li>
                                              <li><button type="button" name="button" class="btn btn-success" @click="addOutputs()">Add</button></li>
                                            </ul>

                                        </div>
                                      </div>

                                      <div class="divider mrg15T mrg15B"></div>
                                      <div class="text-center">
                                          <a href="javascript:;" @click="closeRightPael()"class="btn center-div btn-info mrg5T btn-sm text-transform-upr updateEasyPieChart">
                                              Close
                                          </a>
                                          <a href="javascript:;" @click="deletTable()"class="btn center-div btn-danger mrg5T btn-sm text-transform-upr updateEasyPieChart">
                                              Delete
                                          </a>
                                          <a href="javascript:;" @click="getData()"class="btn center-div btn-info mrg5T btn-sm text-transform-upr updateEasyPieChart">
                                              Get Data
                                          </a>
                                      </div>

                                      </div>
                                      </div>
                                      </div>


                                    </div>
                                    <div class="tab-pane fade" id="profile">
                                      <h1>Content here</h1>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>

      </div>
    </div>
    <!--=========Model=======-->



<div class="sb-slidebar bg-black sb-right " style="background-color:#f0f0f0; border: 1px solid #ccc; margin-top:78px;">
<div class="scrollable-content scrollable-slim-sidebar">
<div class="pad15A">
<a href="#" title="" data-toggle="collapse" data-target="#sidebar-toggle-1" class="popover-title">
    Title
    <span class="caret"></span>
</a>
<div class="panel panel-default">
<div id="sidebar-toggle-1" class="collapse in">
    <div class="pad15A container">
        <div class="row ">
          <!-- {{blockData}} -->
            <div class="col-md-12">
                <input type="text"  class="form-control" placeholder="Table name" v-on:keyup="operatorClick()" v-model="blockData.properties.title">
            </div>

        </div>

    </div>
</div>
</div>


<div class="clear"></div>
<div class="panel panel-default">
<a href="#" title="" data-toggle="collapse" data-target="#sidebar-toggle-6" class="popover-title">
    Input
    <span class="caret"></span>
</a>
<div id="sidebar-toggle-6" class="collapse in">

    <ul class="files-box">
        <li v-for="(item, index) in blockData.properties.inputs">
          {{item.label}}
            <!-- <input type="text" name="" value="" class="form-control" v-model="item.label" v-on:keyup="operatorClick()"> -->
            <!-- <div class="files-buttons">
                <a href="#" class="btn btn-xs hover-danger tooltip-button" data-placement="left" title="Delete" @click="removeInput(index)">
                    <i class="glyph-icon icon-times"></i>
                </a>
            </div> -->
        </li>
        <!-- <li><button type="button" name="button" class="btn btn-success" @click="addInputs()">Add</button></li> -->

    </ul>

</div>
</div>
<div class="clear"></div>
<div class="panel panel-default">
  <a href="#" title="" data-toggle="collapse" data-target="#sidebar-toggle-3" class="popover-title">
      Output
      <span class="caret"></span>
  </a>
  <div id="sidebar-toggle-3" class="collapse in">

      <ul class="files-box">
        <li v-for="(item, index ) in blockData.properties.outputs">
          {{item.label}}
            <!-- <input type="text" name="" value="" class="form-control" v-model="item.label" v-on:keyup="operatorClick()"> -->

            <!-- <div class="files-buttons">
                <a href="#" class="btn btn-xs hover-danger tooltip-button" data-placement="left" title="Delete" @click="removeOutput(index)">
                    <i class="glyph-icon icon-times"></i>
                </a>
            </div> -->
        </li>
        <!-- <li><button type="button" name="button" class="btn btn-success" @click="addOutputs()">Add</button></li> -->
      </ul>

  </div>
</div>

<div class="clear"></div>

<div class="panel panel-default">
  <a href="#" title="" data-toggle="collapse" data-target="#sidebar-toggle-3" class="popover-title">
      Where
      <span class="caret"></span>
  </a>
  <div id="sidebar-toggle-3" class="collapse in">

      <ul class="files-box">
        <li v-for="(item, index ) in blockData.properties.outputs" class="">

            <!-- <div class="files-buttons">
                <a href="#" class="btn btn-xs hover-danger tooltip-button" data-placement="left" title="Delete" @click="removeOutput(index)">
                    <i class="glyph-icon icon-times"></i>
                </a>
            </div> -->
        </li>
        <!-- <li>
          <div class="form-group">
            <select class="form-control" name="">
              <option value="">Select</option>
            </select><br>
            <select class="form-control" name="">
              <option value="">Select</option>
            </select><br>
            <input type="text" name="" value="" class="form-control" >
          </div>
        </li> -->
        <!-- <li>
          <button type="button" name="button" class="btn btn-success" @click="addOutputs()">Add</button>

        </li> -->
      </ul>

  </div>
</div>

<div class="clear"></div>
<div class="panel panel-default">

  <a href="#" title="" data-toggle="collapse" data-target="#sidebar-toggle-3" class="popover-title">
      Or
      <span class="caret"></span>
  </a>
  <div id="sidebar-toggle-3" class="collapse in">



  </div>
</div>
<div class="clear"></div>


<div class="panel panel-default">
  <a href="#" title="" data-toggle="collapse" data-target="#sidebar-toggle-3" class="popover-title">
      Sort
      <span class="caret"></span>
  </a>
  <div id="sidebar-toggle-3" class="collapse in">



  </div>
</div>

<div class="divider mrg15T mrg15B"></div>
<div class="text-center">
    <a href="javascript:;" @click="closeRightPael()"class="btn center-div btn-info mrg5T btn-sm text-transform-upr updateEasyPieChart">
        Close
    </a>
    <a href="javascript:;" @click="deletTable()"class="btn center-div btn-danger mrg5T btn-sm text-transform-upr updateEasyPieChart">
        Delete
    </a>
    <a href="javascript:;" @click="getData()"class="btn center-div btn-info mrg5T btn-sm text-transform-upr updateEasyPieChart">
        Get Data
    </a>
</div>

</div>
</div>
</div>

    <!--  Sidebar #############################-->

    <!--  Sidebar #############################-->





    <div id="page-sidebar">
		<div class="scroll-sidebar">

			<ul id="sidebar-menu">

			<!-- <li><button type="button" class="btn success" name="button" @click="openModal">+</button></li> -->
	    </ul><!-- #sidebar-menu -->


      <div id="storage" class="definition" style="position:relative">
        <div class="files-box" style="position:relative">

                    <div class="accordion collapse in" style="position:relative">
                        <h3>Steps</h3>
                        <div style="padding-bottom:25px;position:relative;">
                          <div class="draggable" id="db" style="display:inline-block;"> <h5 >Step</h5>
                            <img src="../../static/flowchart/images/db_icon.png" alt="" height="40" width="40">
                          </div>
                          <div class="draggable" id="spstep"> <h5>SP Step</h5>
                            <img src="../../static/flowchart/images/sp_icon.jpeg" alt="" height="40" width="40">
                          </div>
                          <div class="draggable" id="merge"><h5>Merge</h5>
                            <img src="../../static/flowchart/images/merge.png" alt="" height="40" width="40">
                          </div>
                          <div class="draggable" id="if-else"><h5>Condition</h5>
                            <img src="../../static/flowchart/images/if-else.png" alt="" height="40" width="40">
                          </div>
                          <div class="draggable" id="purge"><h5>Purge</h5>
                            <img src="../../static/flowchart/images/purge.png" alt="" height="40" width="40">
                          </div>
                          <div class="draggable" id="archive"><h5>Archive</h5>
                            <img src="../../static/flowchart/images/archive.png" alt="" height="40" width="40">
                          </div>
                          <div class="draggable" id="minus"><h5>Minus</h5>
                            <img src="../../static/flowchart/images/minus.png" alt="" height="40" width="40">
                          </div>
                          <div class="draggable" id="copy"><h5>Copy</h5>
                            <img src="../../static/flowchart/images/copy.png" alt="" height="40" width="40">
                          </div>
                          <div class="draggable" id="report"><h5>Report</h5>
                            <img src="../../static/flowchart/images/report_icon.png" alt="" height="40" width="40">
                          </div>
                          <div class="draggable" id="duplicate"><h5>Duplicate</h5>
                            <img src="../../static/flowchart/images/duplicate.png" alt="" height="40" width="40">
                          </div>
                        </div>
                        <h3>Widgets</h3>
                        <div style="padding-bottom:25px">
                          <!-- <div class="draggable" id="table"><h5>Table</h5>
                            <img src="../../static/flowchart/images/tables.png" alt="" height="40" width="40">
                          </div> -->

                          <div class="draggable" id="sale_order"><h5>Sell Order</h5>
                            <img src="../../static/flowchart/images/tables.png" alt="" height="40" width="40">
                          </div>
                          <div class="draggable" id="work_order"><h5>Work Order</h5>
                            <img src="../../static/flowchart/images/tables.png" alt="" height="40" width="40">
                          </div>
                          <div class="draggable" id="pur_order"><h5>Purchase Order</h5>
                            <img src="../../static/flowchart/images/tables.png" alt="" height="40" width="40">
                          </div>

                        </div>
                        <h3>Header 3</h3>
                        <div>
                            Accordion content 3
                        </div>
                    </div>
                </div>

      </div>
		</div>


		</div>

		    <div   id="page-content">

		        <div class="">

    <div class="row" >
        <div class="col-md-12">
<div class="panel">
            <div class="panel-body" style="margin-top:10px; ">

              <div class="showdata">
                  <a href="javascript:;" @click="loadDb()">Document
                    </a><span v-if="dragType=='table'"> / {{this.dbOperatorId}}</span>
                  <br><a href="javascript:;" @click="getIDEData()">Get IDE Data</a>

                </div>
                <div name="minimap container">
                    <div id="minimap" v-show="minimap.showMap"></div>
                    <div class="tp-14" title="Minimap" v-on:click="minimap.showMap = !minimap.showMap">
                      <i class="fa fa-arrow-left rt-45" v-bind:class="{'fa-arrow-open':minimap.showMap, 'fa-arrow-down': !minimap.showMap}"></i>
                    </div>
                </div>                  
		            <!-- <div id="parent"></div> -->
                <div id="createScroll" class="createScroll">
                <div id="droppable" class="" style="margin-top:10px;">

                  <!-- <div class="col-md-12 scrollD" >
                      <h2 v-if="dragType=='db'">Drag Step</h2>
                      <h2 v-else>Drag Table</h2>
                  </div> -->

                  <!-- {{dataStr}} -->
                </div>
                </div>
                <br style="clear:both">

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
import _def from './various/defnitions'
export default {
	components: {
    Simplert
  },
  data () {
		return {
			dataStr: _def.dataStr,
      dom: {},
      minimap:{
        showMap: true,
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
  computed: {
        total: function() {
            return this.value.interval ? (this.value.interval * this.value.multiplier).toFixed(2) : 0
        }
    },
  mounted () {
    var title = '';
    var blockId = ''
    var _this = this
    $(".draggable").draggable({
          grid: [ 20, 20 ],
          appendTo: '#droppable',
          cursor: 'move',
          revertDuration: 100,
          revert: 'invalid',
          helper: 'clone',
          refreshPositions: true,
          scroll: true,
          containment: "document",
          zIndex: 10000,
      });

      $("#droppable").droppable({
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
        var object = $(".createScroll");
        $( "#minimap" ).minimap(object);
    }.bind(this), 10)
  },
	methods: {
    getIDEData(){
      var data  = $('#droppable').flowchart('getData');
      console.log(JSON.stringify(data));
    },
    closeRightPael(){
      console.log("this is log on 453");
      $(".sb-slidebar").removeClass("toggleshow")
    },
    minimapImage(){
      var data={};
      var node = document.getElementById("createScroll");
      debugger;
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
        $('#droppable').flowchart('createOperator', operatorId, operatorData);
        this.dataStr.workflow[operatorId] = {};
        var data = $('#droppable').flowchart('getData')
        this.dataStr.dbData = JSON.parse(JSON.stringify(data))
        this.dbData = JSON.parse(JSON.stringify(data))
        console.log(JSON.stringify(this.dataStr.dbData));
    },
    oneInOneOutOperator(left, top, className){
      var _this = this
      var operatorId = 'created_'+className+'_operator_' + _this.operatorI;
      var operatorData = _def.methods.oneInOneOutOperator(_this.operatorI, className, top, left);
      this.operatorI += 1;
      $('#droppable').flowchart('createOperator', operatorId, operatorData);
      _this.dataStr.workflow[operatorId] = {};
      var data = $('#droppable').flowchart('getData')
      _this.dataStr.dbData = JSON.parse(JSON.stringify(data))
      _this.dbData = JSON.parse(JSON.stringify(data))
      console.log(JSON.stringify(_this.dataStr));
    },
    oneInTwoOutOperator(left, top, className){
      var operatorId = 'created_'+className+'_operator_' + this.operatorI;
      var operatorData = _def.methods.oneInTwoOutOperator(this.operatorI, className, top, left);
      this.operatorI += 1;
      $('#droppable').flowchart('createOperator', operatorId, operatorData);
      this.dataStr.workflow[operatorId] = {};
      var data = $('#droppable').flowchart('getData');
      this.dataStr.dbData = JSON.parse(JSON.stringify(data));
    },
    twoInOneOutOperator(left, top, className){
      var operatorId = 'created_'+className+'_operator_' + this.operatorI;
      var operatorData = _def.methods.twoInOneOutOperator(this.operatorI, className, top, left);
      this.operatorI += 1;
      $('#droppable').flowchart('createOperator', operatorId, operatorData);
      this.dataStr.workflow[operatorId] = {};
      var data = $('#droppable').flowchart('getData');
      this.dataStr.dbData = JSON.parse(JSON.stringify(data));
      this.dbData = JSON.parse(JSON.stringify(data));
    },
    twoInTwoOutOperator(left, top, className){
      var operatorId = 'created_'+className+'_operator_' + this.operatorI;
      var operatorData = _def.methods.twoInTwoOutOperator(this.operatorI, className, top, left);
      this.operatorI += 1;
      $('#droppable').flowchart('createOperator', operatorId, operatorData);
      var data = $('#droppable').flowchart('getData')
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
          $('#droppable').flowchart('createOperator', operatorId, operatorData);
          var data = $('#droppable').flowchart('getData')
          // this.dataStr.workflow[this.dbOperatorId]['dbData'] = data
          this.dataStr.workflow[this.dbOperatorId] = JSON.parse(JSON.stringify(data))
          this.worflowData[this.dbOperatorId] = JSON.parse(JSON.stringify(data))
          console.log(JSON.stringify(this.dataStr));
    },
    getOperatorData(operatorId){
      this.blockData = $('#droppable').flowchart('getOperatorData', operatorId);
    },
    setOperatorData(operatorId){
      $('#droppable').flowchart('setOperatorData', operatorId, this.blockData);
      this.getOperatorData(operatorId)
    },
    deleteOperator(){
      $('#droppable').flowchart('deleteOperator', this.operatorId);
    },
    setData(){
      $('#droppable').flowchart('setData', {});
    },
    getSPData(){
      this.SPData = []
    },
    saveModalForm(formData, modal){
      console.log("sff", this.operatorId);
      if(this.dragType == 'table'){

      }else{

      }
      var IDEData = $('#droppable').flowchart('getData');
      console.log(JSON.stringify(IDEData));
      IDEData.operators[this.operatorId]["data"] = formData
      console.log(IDEData.operators[this.operatorId]);

      setTimeout(function () {
          $('#droppable').flowchart('setData', IDEData);
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
          $('#droppable').flowchart('setData', _this.dataStr.dbData);
          console.log(JSON.stringify(_this.dbData));
          // _this.loadData(this.dataStr.dbData)
      }.bind(this), 10)
    },

    loadData(data){
      var _this = this
      $('#droppable').flowchart({
             data: data,
             onOperatorSelect: (operatorId) => {
               _this.getOperatorData(operatorId);
               _this.operatorId = operatorId;
               $(".sb-slidebar").addClass("toggleshow");
               return true;
             },
             onOperatorDoubleClick: function (operatorId) {
               var operator = $('#droppable').flowchart('getOperatorData', operatorId);
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
                $(".sb-slidebar").removeClass("toggleshow");
                setTimeout(function(){
                  console.log(JSON.stringify(_this.dataStr.workflow[operatorId]))
                  $('#droppable').flowchart('setData', _this.dataStr.workflow[operatorId]);

                },10)
                _this.dbOperatorId = operatorId;
                _this.dragType = 'table';
                this.operatorClass = "tableImage"
                $(".flowchart-operator").addClass("tableImage");
                return true;
             },
             onOperatorCreate: function (operatorId, operatorData, fullElement) {
               return true;
             },
             onLinkCreate: (linkId, linkData) => {
               console.log(linkData);
                 var fromOperatorData = $('#droppable').flowchart('getOperatorData', linkData.fromOperator);
                 var toOperatorData = $('#droppable').flowchart('getOperatorData', linkData.toOperator);
                 linkData.fromTable = fromOperatorData.properties.title
                 linkData.toTable = toOperatorData.properties.title
                 setTimeout(function(){
                   var data = $('#droppable').flowchart('getData')
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

	}
}
</script>

<style lang="css">
.draggable { width: 80px; height: 80px; /*border: red 1px solid;*/ margin:10px 5px 0 1px; float: left;cursor: move}
.createScroll{overflow: scroll;height: 400px;width: 1000px;border: black 1px solid;}
#droppable {height: 1000px;width: 1986px;overflow: auto}
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
    z-index: 1000;
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
        z-index: 1001;
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
/*
sql designer
 */
 @import "/static/flowchart/css/jquery.flowchart.css";
 /* @import "/static/minimap/minimap.css"; */
 /*@import "/static/sqldesigner/styles/print.css";*/
</style>
