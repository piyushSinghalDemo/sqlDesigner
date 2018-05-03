'use strict'
import cloneDeep from 'lodash/cloneDeep';
import stepData from '../data/stepData.json';
export function createStepData(_this, processData, processName) {
    let flowChartData = {};
    let operators = {};
    let links = {};
    let operatorData = stepData.operators.operator_id;
    processData.step_data.map((object, index) => {
        let operatorData = stepData.operators.operator_id;
        operatorData.top = object.top;
        operatorData.left = object.left;
        operatorData.properties.title = object.name;
        if (object.type = "select")
            operatorData.className = 'db';
        else if (object.type = "archival")
            operatorData.className = 'archive';
        operators[object.id] = cloneDeep(operatorData);
    });
    // processData.links.map((object, index) => {
    //     let linkData = stepData.operators.links['0'];
    //     linkData.fromOperator = object.source;
    //     linkData.toOperator = object.target;
    //     processData.steps.map((stepObject, stepIndex) => {
    //         if (stepObject.id == linkData.fromOperator)
    //             linkData.fromTable = stepObject.name
    //         if (stepObject.id == linkData.toOperator)
    //             linkData.toTable = stepObject.name
    //     });
    //     links[index] = linkData;
    // });
    processData.links.map((object, index) => {
        let linkData = stepData.operators.links['0'];
        linkData.fromOperator = object.source;
        linkData.toOperator = object.target;
        linkData.fromTable = stepObject.name;
        linkData.toTable = stepObject.name;
        links[index] = cloneDeep(linkData);
    });
    flowChartData.operators = operators;
    flowChartData.links = links;

    return flowChartData;
}