//We pass this json to jquery.flowchart to draw steps on canvas

'use strict'
import cloneDeep from 'lodash/cloneDeep';
import { debug } from 'util';
// import stepData from '../data/stepData.json';
export function createStepData(_this, processData) {
    let flowChartData = {};
    let operators = {};
    let links = {};
    let stepData = getStepData();
    // let operatorData = stepData.operators.operator_id;
    processData.steps.map((object, index) => {
        let operatorData = cloneDeep(stepData.operators.operator_id);
        operatorData.top = object.top;
        operatorData.left = object.left;
        operatorData.properties.title = object.name;
        debugger;
        // if (object.type == "select")
        //     operatorData.className = 'db';
        // else if (object.type == "archival")
        //     operatorData.className = 'archive';
        // else if (object.type == "stored_procedure")
        //     operatorData.className = 'spstep';
        operatorData.className = cloneDeep(getStepType(object.type));
        operators[object.id] = cloneDeep(operatorData);
    });
    processData.links.map((object, index) => {
        let linkData = cloneDeep(stepData.links['0']);
        linkData.fromOperator = object.source;
        linkData.toOperator = object.target;
        linkData.fromTable = object.sourceName;
        linkData.toTable = object.targetName;
        linkData.fromSubConnector = object.fromSubConnector;
        linkData.toSubConnector = object.toSubConnector;
        links[index] = cloneDeep(linkData);
    });
    flowChartData.operators = operators;
    flowChartData.links = links;

    return flowChartData;
}

function getStepType(value) {
    let typeArray = {
        "select": "db",
        "archival": "archive",
        "stored_procedure": "spstep",
        "merge": "merge"
    }
    return typeArray[value];
}

function getStepData() {
    return {
        "operators": {
            "operator_id": {
                "new": true,
                "className": "",
                "top": "",
                "left": "",
                "data": {},
                "properties": {
                    "title": "",
                    "inputs": {
                        "ins": {
                            "label": "",
                            "multiple": true
                        }
                    },
                    "outputs": {
                        "outs": {
                            "label": "",
                            "multiple": true
                        }
                    }
                }
            }
        },
        "links": {
            "0": {
                "fromOperator": "created_db_operator_0",
                "fromConnector": "outs",
                "fromSubConnector": 0,
                "toOperator": "created_archive_operator_1",
                "toConnector": "ins",
                "toSubConnector": 0,
                "fromTable": "Step1",
                "toTable": "Step2"
            }
        },
        "operatorTypes": {}
    }
}