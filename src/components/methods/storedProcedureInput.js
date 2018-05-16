'use strict'
import cloneDeep from 'lodash/cloneDeep';
import getLinkData from './getOperatorLink'
export default function getStepData(_this, tableObj) {
    let $flowchart = $("#droppable");
    let flowchartData = $flowchart.flowchart('getData');
    let objectLength = Object.keys(flowchartData.links).length;
    let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    let operatorData = $flowchart.flowchart('getOperatorData', _this.$store.state.currentStep);
    let procedureStepInput = cloneDeep(_this.$store.state.storedProcedureStep);

    procedureStepInput.top = operatorData.top + "";
    procedureStepInput.left = operatorData.left + "";
    procedureStepInput.datasource_id = userInfo.datasource_id[0];
    procedureStepInput.process_definition_id = _this.$store.state.process_definition_id; //To add net step on the same process designer
    procedureStepInput.process_definition_name = _this.$store.state.process_definition_name;
    procedureStepInput.client_id = userInfo.client_id[0];
    procedureStepInput.user_id = userInfo.user_id[0];
    procedureStepInput.id = tableObj.stepId ? tableObj.stepId : "";
    procedureStepInput.name = tableObj.title;
    procedureStepInput.desc = tableObj.description;
    procedureStepInput.procedure_name = tableObj.storedProcedure.name;
    let paramObject = { "type": "", "name": "", "value": "" }
    tableObj.storedProcedure.params.map((param, index) => {
        paramObject.name = param.Parameter_name;
        paramObject.dataType = param.Type;
        paramObject.type = param.Is_output ? "OUT" : "IN";
        paramObject.value = param.value ? param.value : "";
        procedureStepInput.params.push(cloneDeep(paramObject));
    })
    procedureStepInput.links = getLinkData(_this, flowchartData);

    return procedureStepInput;
}