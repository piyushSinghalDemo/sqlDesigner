<template lang="html">
  <v-app id="inspire">
    <div class="">
      <!---==========Copy Modal ============-->
      <div class="modal fade" id="copyModal" role="dialog">
        <div class="modal-dialog">
          <!-- Modal content-->
          <div class="modal-content">
            <form class="form-horizontal" @submit.prevent="saveModalForm(copyForm, 'copyModal')">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Copy Modal</h4>
              </div>
              <div class="modal-body">
                <p>

                  <p>
                    <h4>From</h4>
                  </p>
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
                        <label>
                          <input type="radio" name="optradio">Only new records</label>
                      </div>
                      <div class="radio">
                        <label>
                          <input type="radio" name="optradio">Overwrite existing records</label>
                      </div>
                      <div class="form-group">
                        <label>Commit Size</label>
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
      <!---==========Archive Modal ============-->
      <div class="modal fade" id="archiveModal" role="dialog">
        <div class="modal-dialog">
          <!-- Modal content-->
          <div class="modal-content">
            <form class="form-horizontal" @submit.prevent="saveModalForm(archiveForm, 'archiveModal')">
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
                      <input type="checkbox" name="vehicle" value="Bike">
                    </div>
                    <div class="col-sm-6">
                      <div class="radio">
                        <label>
                          <input type="radio" name="optradio" v-model="archiveForm.duplicateProcessing">Skip duplicate records</label>
                      </div>
                      <div class="radio">
                        <label>
                          <input type="radio" name="optradio" v-model="archiveForm.duplicateProcessing">Migrate duplicate records</label>
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
      <!---==========Purge Modal ============-->
      <div class="modal fade" id="purgeModal" role="dialog">
        <div class="modal-dialog">

          <!-- Modal content-->
          <div class="modal-content">
            <form class="form-horizontal" @submit.prevent="saveModalForm(purgeForm, 'purgeModal')">
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

      <!---==========Report Modal ============-->
      <div class="modal fade" id="reportModal" role="dialog">
        <div class="modal-dialog">

          <!-- Modal content-->
          <div class="modal-content">
            <form class="form-horizontal" @submit.prevent="saveModalForm(reportForm, 'reportModal')">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Report Modal</h4>
              </div>
              <div class="modal-body">
                <p>

                  <p>
                    <h4>Report Source</h4>
                  </p>
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
                <button type="submit" class="btn btn-default">Save</button>
              </div>
            </form>
          </div>

        </div>
      </div>

      <!---==========Duplicate Modal ============-->
      <div class="modal fade" id="duplicateModal" role="dialog">
        <div class="modal-dialog">

          <!-- Modal content-->
          <div class="modal-content">
            <form class="form-horizontal" @submit.prevent="saveModalForm(duplicateForm, 'duplicateModal')">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Duplicate Modal</h4>
              </div>
              <div class="modal-body">
                <p>

                  <p>
                    <h4>Compare: </h4>
                  </p>
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
                <button type="submit" class="btn btn-default">Save</button>
              </div>
            </form>
          </div>

        </div>
      </div>

      <!---==========Conditional Modal ============-->
      <div class="modal fade" id="conditionalModal" role="dialog">
        <div class="modal-dialog">

          <!-- Modal content-->
          <div class="modal-content">
            <form class="form-horizontal bordered-row" @submit.prevent="saveModalForm(conditionForm, 'conditionalModal')">
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
                <button type="submit" class="btn btn-default">Save</button>
              </div>
            </form>
          </div>

        </div>
      </div>

      <!--============SP model===============-->
      <div class="modal fade" id="spStepModal" role="dialog">
        <div class="modal-dialog">

          <!-- Modal content-->
          <div class="modal-content">
            <form class="form-horizontal" @submit.prevent="saveModalForm(spForm, 'spStepModal')">
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
                </p>
              </div>
              <div class="modal-footer">
                <button type="submit" class="btn btn-default">Save</button>
              </div>
            </form>
          </div>

        </div>

      </div>

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
                      <li class="active">
                        <a href="#home" data-toggle="tab">Actions</a>
                      </li>
                      <li class="">
                        <a href="#profile" data-toggle="tab">Wiki</a>
                      </li>

                    </ul>
                    <div id="myTabContent" class="tab-content">
                      <div class="tab-pane fade active in" id="home">
                        <div class="" style="background-color:#f0f0f0; border: 1px solid #ccc">
                          <div class="">
                            <div class="pad15A">
                              <a href="#" title="" data-toggle="collapse" data-target="#sidebar-toggle-1" class="popover-title">
                                Title
                                <span class="caret"></span>
                              </a>
                              <div class="panel panel-default">
                                <div id="sidebar-toggle-1" class="collapse in">
                                  <div class="pad15A container">
                                    <div class="row ">
                                      <div class="col-md-12">
                                        <input type="text" class="form-control" placeholder="Table name" v-on:keyup="operatorClick()" v-model="blockData.properties.title">
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
                                    <li>
                                      <button type="button" name="button" class="btn btn-success" @click="addInputs()">Add</button>
                                    </li>
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
                                    <li>
                                      <button type="button" name="button" class="btn btn-success" @click="addOutputs()">Add</button>
                                    </li>
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
                                        </select>
                                        <br>
                                        <select class="form-control" name="">
                                          <option value="">Select</option>
                                        </select>
                                        <br>
                                        <input type="text" name="" value="" class="form-control">
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
                                    <li>
                                      <button type="button" name="button" class="btn btn-success" @click="addOutputs()">Add</button>
                                    </li>
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
                                    <li>
                                      <button type="button" name="button" class="btn btn-success" @click="addOutputs()">Add</button>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div class="divider mrg15T mrg15B"></div>
                              <div class="text-center">
                                <a href="javascript:;" @click="closeRightPael()" class="btn center-div btn-info mrg5T btn-sm text-transform-upr updateEasyPieChart">
                                  Close
                                </a>
                                <a href="javascript:;" @click="deletTable()" class="btn center-div btn-danger mrg5T btn-sm text-transform-upr updateEasyPieChart">
                                  Delete
                                </a>
                                <a href="javascript:;" @click="getData()" class="btn center-div btn-info mrg5T btn-sm text-transform-upr updateEasyPieChart">
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
                    <div class="col-md-12">
                      <input type="text" class="form-control" placeholder="Table name" v-on:keyup="operatorClick()" v-model="blockData.properties.title">
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
                  </li>
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
                  </li>
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
              <a href="javascript:;" @click="closeRightPael()" class="btn center-div btn-info mrg5T btn-sm text-transform-upr updateEasyPieChart">
                Close
              </a>
              <a href="javascript:;" @click="deletTable()" class="btn center-div btn-danger mrg5T btn-sm text-transform-upr updateEasyPieChart">
                Delete
              </a>
              <a href="javascript:;" @click="getData()" class="btn center-div btn-info mrg5T btn-sm text-transform-upr updateEasyPieChart">
                Get Data
              </a>
            </div>
          </div>
        </div>
      </div>
      <div id="page-sidebar">
        <div class="scroll-sidebar">
          <ul id="sidebar-menu">
          </ul>
          <div id="storage" class="definition" style="position:relative">
            <div class="files-box" style="position:relative">
              <!-- <div>
                <input type="text" class="srch-def-text"  placeholder="Search Id" />
                <i class="fa fa-search srch-def-icon"></i>
              </div> -->
              <div>
                <h3 contenteditable="true" class="docs-title-input" @blur="setProcessName">{{processDocName}}</h3>
              </div>
              <div class="accordion collapse in" style="position:relative">
                <h3 >Steps</h3>
                <div style="padding-bottom:25px;position:relative;">
                  <div class="draggable" @contextmenu.prevent="$refs.ctx.open($event)" id="db" style="display:inline-block;">
                    <h5>Step</h5>
                    <img src="../../static/flowchart/images/db_icon.png" alt="" height="40" width="40">
                  </div>
                  <div class="draggable" id="spstep">
                    <h5>SP Step</h5>
                    <img src="../../static/flowchart/images/sp_icon.jpeg" alt="" height="40" width="40">
                  </div>
                  <div class="draggable" id="merge">
                    <h5>Merge</h5>
                    <img src="../../static/flowchart/images/merge.png" alt="" height="40" width="40">
                  </div>
                  <div class="draggable" id="if-else">
                    <h5>Condition</h5>
                    <img src="../../static/flowchart/images/if-else.png" alt="" height="40" width="40">
                  </div>
                  <div class="draggable" id="purge">
                    <h5>Purge</h5>
                    <img src="../../static/flowchart/images/purge.png" alt="" height="40" width="40">
                  </div>
                  <div class="draggable" id="archive">
                    <h5>Archive</h5>
                    <img src="../../static/flowchart/images/archive.png" alt="" height="40" width="40">
                  </div>
                  <div class="draggable" id="minus">
                    <h5>Minus</h5>
                    <img src="../../static/flowchart/images/minus.png" alt="" height="40" width="40">
                  </div>
                  <div class="draggable" id="copy">
                    <h5>Copy</h5>
                    <img src="../../static/flowchart/images/copy.png" alt="" height="40" width="40">
                  </div>
                  <div class="draggable" id="report">
                    <h5>Report</h5>
                    <img src="../../static/flowchart/images/report_icon.png" alt="" height="40" width="40">
                  </div>
                  <div class="draggable" id="duplicate">
                    <h5>Duplicate</h5>
                    <img src="../../static/flowchart/images/duplicate.png" alt="" height="40" width="40">
                  </div>

                  <button type="button" class="btn btn-danger" style="width: 147px;" @click.stop="executeProcess">Save Process</button>
                  <button type="button" class="btn btn-danger" @click.stop="validateProcess">Validate Process</button>
                </div>
            
                <!-- <h3>Header 3</h3>
                <div>
                  Accordion content 3
                </div> -->
              </div>
              <!-- <button>deleteOperator</button> -->
            </div>
          </div>
        </div>
      </div>
      <div id="page-content">
        <div class="">
          <div class="row">
            <div class="col-md-12">
              <div class="panel">
                <div class="panel-body" style="margin-top:10px; ">
                  <div class="showdata">
                  </div>
                  <div name="minimap container">
                    <div id="minimap" v-show="minimap.showMap"></div>
                    <div class="tp-14" title="Minimap" v-on:click="minimap.showMap = !minimap.showMap">
                      <i class="fa fa-arrow-left rt-45" v-bind:class="{'fa-arrow-open':minimap.showMap, 'fa-arrow-down': !minimap.showMap}"></i>
                    </div>
                  </div>
                  <div id="createScroll" class="createScroll">
                    <div id="droppable" class="" style="margin-top:10px;">
                    </div>
                  </div>
                  <br style="clear:both">
                </div>
              </div>
            </div>
          </div>

          <table-modal></table-modal>
          <archive-panel></archive-panel>
          <stored-procedure></stored-procedure>
          <merge-step></merge-step>
          <simplert useRadius=true useIcon=true ref="simplert">
          </simplert>
        </div>
      </div>

      <context-menu id="testingctx" ref="ctx" @ctx-open="onCtxOpen" @ctx-cancel="resetCtxLocals" @ctx-close="onCtxClose">
        <li class="ctx-header">Delete</li>
    </context-menu>

    <v-dialog v-model="addTitle" persistent max-width="25%">
      <!-- <v-btn color="primary" dark slot="activator">Open Dialog</v-btn> -->
          <v-layout align-center justify-center>
            <v-flex>
              <v-card>
                <v-form v-model="validateStep" ref="form" lazy-validation>
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Step Details</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn icon large @click="addTitle = false">
                    <v-icon large>close</v-icon>
                  </v-btn>  
                </v-toolbar>
                <v-card-text>
                    <v-text-field label="Step Name" prepend-icon="person" v-model="stepName" :rules="stepNameRules" required>
                     </v-text-field>
                     <v-text-field prepend-icon="code" label="Step Description" v-model="stepDetail" :rules="stepDetailRules"
                       multi-line required></v-text-field>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click.native="submitStep" :disabled='!validateStep' >Submit</v-btn>        
                </v-card-actions>
                </v-form>
              </v-card>
            </v-flex>
          </v-layout>
      <!-- <v-card>
        <v-form v-model="validateStep" ref="form" lazy-validation>
        <v-card-title class="headline">
          <span>Step Details</span>
          <v-spacer></v-spacer>
          <v-icon @click="addTitle = false" style="cursor:pointer;color:red">close</v-icon>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-sm>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Step Name" v-model="stepName" :rules="stepNameRules" required>
                </v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Step Description" v-model="stepDetail" :rules="stepDetailRules"
                 multi-line required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="submitStep" :disabled='!validateStep' >Submit</v-btn>
          <v-btn @click.native="clearStep">Crear</v-btn>
        </v-card-actions>
        </v-form>
      </v-card> -->
    </v-dialog>
  <v-dialog v-model="dialog2" max-width="60%" max-height="50%">
      <process-name @save-name="saveName" v-on:close="dialog2=false"></process-name>
  </v-dialog>
  <v-bottom-sheet v-model="bottomSheet">
      <validation-logs :logs="logs"></validation-logs>  
  </v-bottom-sheet>
    </div>
  </v-app>
</template>

<script>
import Simplert from 'vue2-simplert'
import _def from './various/defnitions'
import table from './table.vue'
import archiveMain from './archive/archiveMain.vue'
import mergeStep from './merge/mergeStep.vue'
import validationLogs from './validationLog.vue'
import storedProcedure from './storedProcedure/storedProcedure.vue'
import tableData from './data/table-selection'
import cloneDeep from 'lodash/cloneDeep';
import draggable from 'vuedraggable'
import contextMenu from 'vue-context-menu'
import config from './../config.json'
import { post as postToServer, get as getFromServer  } from './methods/serverCall'
import {getProcessData} from './methods/processDefenationInput'
import processName from './processName.vue'
import {createStepData} from './methods/createStep'
import {setStepInfo} from './methods/setStepInfo'
export default {
  components: {
    Simplert,
    'table-modal': table,
    'archive-panel':archiveMain,
    'stored-procedure':storedProcedure,
    'merge-step':mergeStep,
     draggable,
     contextMenu,
     'process-name':processName,
     'validation-logs':validationLogs,
     'logs':[] 
  },
  data() {
    return {
      dataStr: _def.dataStr,
      bottomSheet:false,
      dom: {},
      minimap: {
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
      tableOperatorData: [],
      worflowData: {},
      dbData: {},
      list: [{
      name: "John"
    }, {
      name: "Joao"
    }, {
      name: "Jean"
    }],
    list2: [{
      name: "Juan"
    }, {
      name: "Edgard"
    }, {
      name: "Johnson"
    }],
    showCtx: false,
    contextClicks: [],
    addTitle:false,
    stepName:'',
    stepNameRules:[v => !!v || 'Step Name is required'],
    stepDetail:'',
    stepDetailRules:[v => !!v || 'Step Description is required'],
    leftPosition:0,
    topPosition:0,
    type:'',
    validateStep:true,
    openArchivePanel:false,
    userInfo:"",
    dialog2:false,
    // processDocName:this.$store.state.process_definition_name
    }
  },
  computed: {
    processDocName: function(){
      return this.$store.state.process_definition_name;
    },
    total: function () {
      return this.value.interval ? (this.value.interval * this.value.multiplier).toFixed(2) : 0
    }
  },
  mounted() {
    var _this = this
    var url_string = window.location.href;
    var url = new URL(url_string);
    // console.log("Testing DATA ************************"+JSON.stringify(url.searchParams.get('client_id')));
    _this.userInfo ={
      'client_id':url.searchParams.get('client_id'),
      'accessToken':url.searchParams.get('accessToken'),
      'user_id': url.searchParams.get('user_id'),
      'table_count':url.searchParams.get('table_count'),
      'env_id':url.searchParams.get('env_id'),
      'process_definition_id':url.searchParams.get('process_definition_id'),
    }
    // debugger;
    if(_this.userInfo.env_id){
      _this.$store.state.env_id = _this.userInfo.env_id;
    } 
    sessionStorage.setItem("userInfo",JSON.stringify(_this.userInfo));
    var title = '';
    var blockId = ''
    window.addEventListener('keyup', function(ev) {
      if(ev.key == 'Delete'){
         _this.deleteOperator(); 
      }
    });
    $(".draggable").draggable({
      appendTo: '#droppable',
      cursor: 'move',
      helper: 'clone',
      refreshPositions: true,
    });
    $("#droppable").droppable({
      accept: ".draggable",
      drop: function (event, ui) {
        var pos = ui.position;
        var $obj = ui.helper.clone();
        _this.leftPosition = pos.left; //ui.offset.left - $(this).offset().left;
        _this.topPosition = pos.top; //ui.offset.top - $(this).offset().top;
        _this.type = ui.draggable.attr("id");
        var className = '';
        var imageClass = '';
         _this.getStepDetails();
        if (_this.type == "db" || _this.type == 'spstep') {
          _this.dragType = 'db'
        }
        if (_this.type == "table" || _this.type == "sale_order" || _this.type == "work_order" || _this.type == "pur_order") {
          _this.dragType = 'table'
        }
        _this.minimapImage();
      }
    });

    setTimeout(function () {
      var data = {}
      let _this = this;
        if(_this.userInfo.process_definition_id){
          this.createProcessData();
        }else{
          this.loadData(data)
        }
      var object = $(".createScroll");
      $("#minimap").minimap(object);
    }.bind(this), 1000)
  },
  methods: {
    async createProcessData(){       
      let _this = this;
      let inputJson = _this.userInfo.process_definition_id;
      let url = config.IDE_API_URL+'get_process_definition_by_id/'+inputJson //'http://192.168.1.101:8016/add_ide_data';
        getFromServer(this, url).then(response=>{
          if(response && response.steps.length)
          _this.userInfo.env_id = response.steps[0].env_id;
          // console.log("Data for step creation "+JSON.stringify(response));
        let ideInputData = createStepData(_this, response);    
        // debugger;      
        let tableUrl = config.AGENT_API_URL + 'get_tables'; //'http://192.168.1.100:8010/get_tables';
        let inputJson = {
            "table_name": "",
            "table_count": "",
            "env_id": response.steps[0].env_id,
            "client_id": _this.userInfo.client_id
        }
        postToServer(this, tableUrl, inputJson).then(tableResponse => {
            if (tableResponse && tableResponse.table_name_list) {
                _this.$store.state.schema = tableResponse.schema;
                _this.$store.state.conn_str = tableResponse.conn_str;
                setStepInfo(_this, response);
                // debugger;
                console.log("archivalStep"+JSON.stringify(_this.$store.state.archivalStep));   
            }
        }, tableResponse => {}).catch(e => {
            console.log(e)
            this.ErrorMessage = 'Error in getting connection string.'
        });
          
          // console.log("archivalStep step information " +JSON.stringify(_this.$store.state.archivalStep));
          _this.loadData(ideInputData);
        });  
    },
    setProcessName(ev){
      this.$store.state.process_definition_name = ev.target.textContent;
    },
    saveName(name){
      let _this = this;
      _this.saveProcessData(name);
      // _this.dialog2 = false;
      // console.log("Name: "+name);
    },
    executeProcess(){
      this.saveProcessData();
    },
    validateProcess(){
      let _this = this;
      let $flowchart = $("#droppable");
      var flowchartData = $flowchart.flowchart('getData');
        let url = config.VALIDATE+'validate_process_definition/true' //'http://192.168.1.101:8016/add_ide_data';
        let ideInputData = getProcessData(_this, flowchartData);
        postToServer(this, url, ideInputData).then(response=>{
          // bottomSheet = true;  
          _this.$toaster.info('Data validated successfully') 
        },response => {
          if(response.message){
          _this.logs = response.message;
          _this.bottomSheet = true;
          }
          else
           _this.$toaster.error('There is some internal error please try again later.')
        }).catch(e => {
              console.log(e)
            _this.$toaster.error('Something went wrong...')
      })    
    },
    saveProcessData(){
      let _this = this;
      let $flowchart = $("#droppable");
      var flowchartData = $flowchart.flowchart('getData');
        let url = config.IDE_API_URL+'add_ide_data' //'http://192.168.1.101:8016/add_ide_data';
        let ideInputData = getProcessData(_this, flowchartData);
        postToServer(this, url, ideInputData).then(response=>{  
          _this.$toaster.success('Data save successfully') 
        },response => {
          if(response && response.message)
          _this.$toaster.error(response.message);
          else
           _this.$toaster.error('There is some internal error please try again later.')
        }).catch(e => {
              console.log(e)
            _this.$toaster.error('Something went wrong...')
      })    
      console.log("ideInputData " +JSON.stringify(ideInputData));
    },
    getStepDetails(){ // take step name and description from user
      let _this = this;
      _this.addTitle = true;
    },
    submitStep(){
      let _this = this;
       if (this.$refs.form.validate()) {
         _this.addTitle = false;
         let url = config.IDE_API_URL+'ide_step_data/add';
         let stepType = "";
         if(_this.type == "db"){
           stepType = 'select'
         }else if(_this.type == "archive"){
           stepType = 'archival'
         }else if(_this.type == "merge"){
           stepType = 'merge'
         }else if(_this.type == "minus"){
           stepType = 'minus'
         }else if(_this.type == "spstep"){
           stepType = 'stored_procedure'
         }else{
           return ;
         }
        //  let stringArray = _this.stepName.split(" ");
        //  let joinString = stringArray.join("");
        //  console.log("joinString " +joinString);
         let inputJson = {
           process_definition_id : _this.$store.state.process_definition_id,
           name:_this.stepName,
           description:_this.stepDetail,
           type:stepType
         }
         postToServer(this, url, inputJson).then(response=>{
           console.log("Response from step save:"+JSON.stringify(response));
             _this.$store.state.process_definition_id = response.process_definition_id;
             tableData.title = cloneDeep(_this.stepName); 
             tableData.description = cloneDeep(_this.stepDetail);
             tableData.type = _this.type;
             tableData.stepId = response.id+"";
             _this.$store.state.archivalStep[response.id]=cloneDeep(tableData);
             _this.oneInOneOutOperator(_this.leftPosition, _this.topPosition, _this.type, response.id)
          //  if(response.process_definition_id)           
         },response=>{
            _this.$toaster.error('Due to some internal error , Step not created');
         });
       }
    },
    clearStep(){
       this.$refs.form.reset()
    },
    onCtxOpen(locals) {
        console.log('open', locals)
      },

      onCtxClose(locals) {
        console.log('close', locals)
      },

      resetCtxLocals() {
        return;
      },

      logClick(e,context) {
        
        return true
      },
      sayColor(color) {
        window.alert('left click on ' + color)
      },
      getProcedureList(){
          let _this = this;
          _this.$store.state.archivalStep[_this.$store.state.currentStep].loadProcedureList=true;
          let url = config.AGENT_API_URL+"get_stored_procedure_list";
          let inputJson = {
              "procedure_name": "",
              "procedure_count": _this.userInfo.table_count,
              "env_id": _this.userInfo.env_id?_this.userInfo.env_id:_this.$store.state.env_id,
              "database_name":_this.$store.state.database_name,
              "database_type":_this.$store.state.database_type,
              "schema":_this.$store.state.schema,
              "connstr":_this.$store.state.conn_str,
              "client_id":_this.userInfo.client_id
          };
          postToServer(this, url, inputJson).then(listResponse => {
            if(_this.$store.state.archivalStep[_this.$store.state.currentStep])
            _this.$store.state.archivalStep[_this.$store.state.currentStep].loadProcedureList=false;
                console.log("listResponse"+JSON.stringify(listResponse));
                this.loading = false;
              _this.$store.state.database_name = listResponse.database_name;
              _this.$store.state.database_type = listResponse.database_type;
              _this.$store.state.schema = listResponse.schema;
              _this.$store.state.archivalStep[_this.$store.state.currentStep].storedProcedure.procedureList = listResponse.result;
              _this.$store.state.conn_str = listResponse.connstr;
          },listResponse => {
            _this.$store.state.archivalStep[_this.$store.state.currentStep].loadProcedureList=false;
            if(listResponse && listResponse.message)
                _this.$toaster.error(listResponse.message);
            else    
             _this.$toaster.error('Due to some internal error , Procedure List not found');
          });
      },
      gettables(){
        let _this = this;
        let url = config.AGENT_API_URL+'get_tables';//'http://192.168.1.100:8010/get_tables';
        if(_this.$store.state.archivalStep[_this.$store.state.currentStep])
        _this.$store.state.archivalStep[_this.$store.state.currentStep].loadTable=true;
        let inputJson = {
                "table_name": "",
                "table_count":_this.userInfo.table_count,
                "env_id":_this.userInfo.env_id,
                "client_id":_this.userInfo.client_id
        }
        postToServer(this, url, inputJson).then(response=>{
          _this.$store.state.archivalStep[_this.$store.state.currentStep].loadTable=false;
          if(response && response.table_name_list){
              let allDbTables = response;//JSON.parse(response.bodyText);
              _this.$store.state.schema = allDbTables.schema;
              _this.$store.state.conn_str = allDbTables.conn_str;
              _this.$store.state.archivalStep[_this.$store.state.currentStep].allArchiveTables=[];
              _this.$store.state.archivalStep[_this.$store.state.currentStep].allDbTables=[];             
              allDbTables.table_name_list.map(function(obj, index){
                let temp = {'name':obj, 'stepId':'Database Table'};
                _this.$store.state.archivalStep[_this.$store.state.currentStep].allArchiveTables.push(cloneDeep(temp));
                _this.$store.state.archivalStep[_this.$store.state.currentStep].allDbTables.push(cloneDeep(temp));             
              });
          }
          // console.log("Response from all tables"+JSON.stringify(response));
        },response => {
          _this.$store.state.archivalStep[_this.$store.state.currentStep].loadTable=false;
        }).catch(e => {
          console.log(e)
            this.ErrorMessage = 'Something went wrong.'
          })
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
    getIDEData() {
      var data = $('#droppable').flowchart('getData');
      console.log(JSON.stringify(data));
    },
    closeRightPael() {
      console.log("this is log on 453");
      $(".sb-slidebar").removeClass("toggleshow")
    },
    minimapImage() {
      var data = {};
      var node = document.getElementById("createScroll");
      data.overflow = "auto";
      data.width = node.offsetWidth;
      data.height = node.offsetHeight;
      var height = node.scrollHeight;
      var width = node.scrollWidth;
      html2canvas(node, {
        onpreloaded: function () {
          node.style.overflow = "visible";
          node.style.height = height + 'px';
          node.style.width = width + 'px';
        },
        onrendered: function (canvas) {
          node.style.overflow = data.overflow;
          node.style.height = data.height + 'px';
          node.style.width = data.width + 'px';
          canvas.backgroundColor = "red";
          node.className = data
          var img = Canvas2Image.convertToImage(canvas, 198, 161);
          document.getElementsByClassName("minimap-node")[0].style.backgroundImage = "url(" + img.src + ")";
        }
      });
    },
    deletTable() {
      this.deleteOperator()
      this.closeRightPael()
      this.blockData = {
        top: 0,
        left: 0,
        properties: {
          title: "",
          inputs: {},
          outputs: {}
        }
      }
      this.operatorId = ''
    },
    operatorClick() {
      this.saveBlockData();
    },
    saveBlockData() {
      console.log(this.blockData);
      var blockId = localStorage.getItem("operatorId")
      this.setOperatorData(this.operatorId)
    },
    addInputs() {
      var _this = this
      var noOfItems = Object.keys(this.blockData.properties.inputs).length + 1;
      this.blockData.properties.inputs["input_" + noOfItems] = {
        "label": "Input"
      }
      this.setOperatorData(this.operatorId)
    },
    removeInput(index) {
      console.log(index);
      delete this.blockData.properties.inputs[index];
      this.saveBlockData()
    },
    addOutputs() {
      var noOfItems = Object.keys(this.blockData.properties.outputs).length + 1;
      this.blockData.properties.outputs["output_" + noOfItems] = {
        "label": "Output"
      }
      this.setOperatorData(this.operatorId)
    },
    removeOutput(index) {
      delete this.blockData.properties.outputs[index];
      this.saveBlockData()
    },
    addWhere() {},
    removeWhere() {},
    addOr() {},
    removeOr() {},
    getTableColumns() {
      //make dynamic call to api and get the table columns
      this.tableColumns = [{
        column: "column1",
        type: "integer"
      }, {
        column: "column2",
        type: "string"
      }, {
        column: "column3",
        type: "date"
      }, {
        column: "column4",
        type: "datetime"
      }]
    },
    getData() {
      var ideData = getData()
      console.log(ideData);
    },//

    oneInZeroOutOperator(left, top, className) {
      var _this = this
      var operatorId = 'created_' + className + '_operator_' + this.operatorI;
    
      var operatorData = _def.methods.oneInZeroOutOperator(this.operatorI, className, top, left);
      this.operatorI += 1;
      $('#droppable').flowchart('createOperator', operatorId, operatorData);
      _this.$store.state.archivalStep[operatorId]='';
      this.dataStr.workflow[operatorId] = {};
      var data = $('#droppable').flowchart('getData')
      this.dataStr.dbData = JSON.parse(JSON.stringify(data))
      this.dbData = JSON.parse(JSON.stringify(data))
      // console.log(JSON.stringify(this.dataStr.dbData));
    },
    oneInOneOutOperator(left, top, className, operatorId) {
      var _this = this;
      // var operatorId = 'created_' + className + '_operator_' + _this.operatorI;
      var operatorData = _def.methods.oneInOneOutOperator(_this.stepName, _this.operatorI, className, top, left);
      this.operatorI += 1;
      $('#droppable').flowchart('createOperator', operatorId, operatorData);
      _this.$refs.form.reset();
      // tableData.title = cloneDeep(_this.stepName); 
      // tableData.description = cloneDeep(_this.stepDetail);
      // tableData.type = className;
      // _this.$refs.form.reset()
      // _this.$store.state.archivalStep[operatorId]=cloneDeep(tableData);
      _this.dataStr.workflow[operatorId] = {};
      var data = $('#droppable').flowchart('getData')
      _this.dataStr.dbData = JSON.parse(JSON.stringify(data))
      _this.dbData = JSON.parse(JSON.stringify(data))
    },
    oneInTwoOutOperator(left, top, className) {
      let _this = this;
      var operatorId = 'created_' + className + '_operator_' + this.operatorI;
      var operatorData = _def.methods.oneInTwoOutOperator(this.operatorI, className, top, left);
      this.operatorI += 1;
      $('#droppable').flowchart('createOperator', operatorId, operatorData);
      _this.$store.state.archivalStep[operatorId]='';
      this.dataStr.workflow[operatorId] = {};
      var data = $('#droppable').flowchart('getData');
      this.dataStr.dbData = JSON.parse(JSON.stringify(data));
    },
    twoInOneOutOperator(left, top, className) {
      let _this = this;
      var operatorId = 'created_' + className + '_operator_' + this.operatorI;
      var operatorData = _def.methods.twoInOneOutOperator(this.operatorI, className, top, left);
      this.operatorI += 1;
      $('#droppable').flowchart('createOperator', operatorId, operatorData);
      _this.$store.state.archivalStep[operatorId]='';
      this.dataStr.workflow[operatorId] = {};
      var data = $('#droppable').flowchart('getData');
      this.dataStr.dbData = JSON.parse(JSON.stringify(data));
      this.dbData = JSON.parse(JSON.stringify(data));
    },
    twoInTwoOutOperator(left, top, className) {
      let _this = this;
      var operatorId = 'created_' + className + '_operator_' + this.operatorI;
      var operatorData = _def.methods.twoInTwoOutOperator(this.operatorI, className, top, left);
      this.operatorI += 1;
      $('#droppable').flowchart('createOperator', operatorId, operatorData);
      _this.$store.state.archivalStep[operatorId]='';
      var data = $('#droppable').flowchart('getData')
      this.dataStr.workflow[operatorId] = {};
      this.dataStr.dbData = JSON.parse(JSON.stringify(data));
      this.dbData = JSON.parse(JSON.stringify(data));
    },
    addTableOperator(left, top, className) {
      var _this = this
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
              label: 'Input 1',
            }
          },
          outputs: {
            output_1: {
              label: 'Output 1',
            }
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
    getOperatorData(operatorId) {
      this.blockData = $('#droppable').flowchart('getOperatorData', operatorId);
    },
    setOperatorData(operatorId) {
      $('#droppable').flowchart('setOperatorData', operatorId, this.blockData);
      this.getOperatorData(operatorId)
    },
    deleteOperator() {
      $('#droppable').flowchart('deleteSelected');
      // $('#droppable').flowchart('deleteOperator', this.operatorId);
    },
    setData() {
      $('#droppable').flowchart('setData', {});
    },
    getSPData() {
      this.SPData = []
    },
    saveModalForm(formData, modal) {
      console.log("sff", this.operatorId);
      if (this.dragType == 'table') {
      } else {
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
      $("#" + modal).modal('hide')
    },
    loadDb() {
      var data = {}
      var _this = this
      this.dragType = 'db'
      setTimeout(function () {
        $('#droppable').flowchart('setData', _this.dataStr.dbData);
        console.log(JSON.stringify(_this.dbData));
        // _this.loadData(this.dataStr.dbData)
      }.bind(this), 200)
    },
    loadData(data) {
      var _this = this
      $('#droppable').flowchart({
        data: data,
        
        onOperatorDoubleClick: function (operatorId) {
          var operator = $('#droppable').flowchart('getOperatorData', operatorId);
          console.log(operator);
          var type = operator.className
          var op = _this.operatorOptions[type]
          _this.operatorId = operatorId;
          // _this.$store.state.currentStep = operatorId;
          //  _this.$store.commit('setCurrentStep', operatorId);
          _this.$store.dispatch('setCurrentStep', operatorId);
          console.log(op);
          // if (op['dblClick'] && op["modal"]) {
          //   $("#" + op["modalName"]).modal()
          // }
          // if (operator.className != 'db')
          //   return
           if(operator.className == 'db'){
              _this.gettables();
             _this.$store.state.dialog = true;
           }
           else if(operator.className == 'archive'){
             _this.gettables();
             _this.$store.state.openArchivePanel = true;
           }else if(operator.className == 'merge' || operator.className == 'minus'){
             _this.gettables();
             _this.$store.state.openMergePanel = true;
           }else if(operator.className == 'spstep'){
             _this.getProcedureList();
             _this.$store.state.openStoredProcedure = true;
           } 
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
          setTimeout(function () {
            var data = $('#droppable').flowchart('getData')
            console.log(JSON.stringify(data));
            if (_this.dragType == 'db') {
              _this.dataStr.dbData = JSON.parse(JSON.stringify(data))
            } else {
              _this.dataStr.workflow[_this.dbOperatorId] = JSON.parse(JSON.stringify(data))
            }
          }, 10)
          return true;
        },
        onOperatorDelete: function (operatorId) {
          return true;
        }
      });
    },
    clauseModal(type) {
      this.clauseType = type;
      $("#clauseModal").modal()
    },
    remove(key) {
      let confirmFn = function () {
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
//   watch: {
//   processDocName(newValue) {  
//     
//     this.$store.state.process_definition_name = newValue;
//   },
// }
}

</script>

<style lang="css">
.draggable {
  width: 80px;
  height: 100px;
  margin: 10px 5px 0 1px;
  float: left;
  cursor: move
}

.createScroll {
  overflow: scroll;
  height: 450px;
  width: 1000px;
}

#droppable {
  height: 1000px;
  width: 1986px;
  overflow: auto
}

.togglehide {
  display: none;
  z-index: -1
}

.toggleshow {
  display: block;
  z-index: 9
}

.block {
  background-color: #000
}

.custom-modal-dialog {
  width: 90%;
  margin: auto;
  padding: 0;
}

.modal-content {
  height: auto;
  /*min-height: 100%;*/
  border-radius: 0;
}

body {
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
  /* background-color: indianred; */
  z-index: 1;
  cursor: move;
}

.imageCss {
  width: 1000px !important;
  height: 1000px !important;
  background-color: white;
  overflow: visible;
}

.rt-45 {
  /* transform: rotateZ(-45deg); */
  margin-left: 20%;
  margin-top: 25%;
}

.tp-14 {
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

.fa-arrow-down {
  transform: rotate(225deg);
  transition: transform .25s linear;
}

.fa-arrow-open {
  transform: rotate(-45deg);
  transition: transform .25s linear;
}

/* .card__text {
  background: white;
  height: 600px;
} */

.navigation-drawer--open {
  background: white;
  box-shadow: 0px 0px 7px 0px;
  /* z-index:
2 */
}

.navigation-drawer:not(.navigation-drawer--is-booted) {
  z-index: 2
}

.content {
  height: 100%;
  background: white
}

.content--wrap {
  height: 100%;
}
  .flowchart-operator-inputs-outputs{
    height: 60px;
} 
.srch-def-text{
  border-bottom: 01px solid cadetblue;
  width: 97%;
  /* height: 100%; */
  height: 30px;
  margin-bottom: 10px;
  margin-left: 3%
}
.srch-def-icon{
    position: absolute;
    top: 2%;
    right: 3%;
    cursor: pointer;
}
.docs-title-input:hover {
    border-color: #e5e5e5;
}
.docs-title-input:focus {
    -webkit-appearance: none;
    -moz-appearance: none;
    border: 1px solid #4d90fe!important;
    -webkit-box-shadow: inset 0px 1px 2px rgba(0,0,0,0.1);
    -moz-box-shadow: inset 0px 1px 2px rgba(0,0,0,0.1);
    box-shadow: inset 0px 1px 2px rgba(0,0,0,0.1);
    color: #000;
    outline: none;
}
.docs-title-input{
    text-align: center;
    margin: 5px 0px;
}
/*
sql designer
 */
 @import "/static/flowchart/css/jquery.flowchart.min.css";
 @import "/static/flowchart/css/custom.css";
 /* @import "/static/minimap/minimap.css"; */
 /*@import "/static/sqldesigner/styles/print.css";*/
</style>
