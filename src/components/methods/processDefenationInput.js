'use strict'
import cloneDeep from 'lodash/cloneDeep';
export function getProcessData(_this, flowchartData) {
    let userData = JSON.parse(sessionStorage.getItem("userInfo"));
    let objectLength = Object.keys(flowchartData.links).length;
    let archivalStepKeys = Object.keys(_this.$store.state.archivalStep);
    let link = {
        source: '',
        target: '',
        sourceName: '',
        targetName: ''
    };
    let linkArray = [];
    let stepObject = { 'id': '', 'name': '' };
    let stepArray = [];
    let sourceName = '';
    let destinationName = '';
    // for (var flowIndex = 0; flowIndex < objectLength; flowIndex++) {
    //     for (var archivalStepIndex = 0; archivalStepIndex < archivalStepKeys.length; archivalStepIndex++) {
    //         if (flowchartData.links[flowIndex].fromTable == _this.$store.state.archivalStep[archivalStepKeys[archivalStepIndex]].title) {
    //             linkObject.source = _this.$store.state.archivalStep[archivalStepKeys[archivalStepIndex]].stepId;
    //             break;
    //         }
    //     } //we got our source Name
    //     for (var archivalStepIndex = 0; archivalStepIndex < archivalStepKeys.length; archivalStepIndex++) {
    //         if (flowchartData.links[flowIndex].toTable == _this.$store.state.archivalStep[archivalStepKeys[archivalStepIndex]].title) {
    //             linkObject.target = _this.$store.state.archivalStep[archivalStepKeys[archivalStepIndex]].stepId;
    //         }
    //     } //we got our dest name
    //     linkArray.push(cloneDeep(linkObject));
    // }
    for (var i = 0; i < objectLength; i++) {
        link.source = flowchartData.links[i].fromOperator;
        link.target = flowchartData.links[i].toOperator;
        link.sourceName = flowchartData.links[i].fromTable;
        link.targetName = flowchartData.links[i].toTable
        linkArray.push(cloneDeep(link));
    }
    for (var archivalStepIndex = 0; archivalStepIndex < archivalStepKeys.length; archivalStepIndex++) {
        stepObject.id = _this.$store.state.archivalStep[archivalStepKeys[archivalStepIndex]].stepId;
        stepObject.name = _this.$store.state.archivalStep[archivalStepKeys[archivalStepIndex]].title;
        stepArray.push(cloneDeep(stepObject));
    }
    for (var archivalStepIndex = 0; archivalStepIndex < stepArray.length; archivalStepIndex++) {
        let found = false;
        for (var flowIndex = 0; flowIndex < objectLength; flowIndex++) {
            if (stepArray[archivalStepIndex].name == flowchartData.links[flowIndex].toTable) {
                found = true;
                break;
            }
        }
        if (found) {
            stepArray[archivalStepIndex].is_parallel = false;
            found = false
        } else {
            stepArray[archivalStepIndex].is_parallel = false; //true; for hordcode false
        }
    }
    let ideInputData = {
        'steps': stepArray,
        'links': linkArray,
        'step_data': _this.$store.state.processArray,
        'process_definition_id': _this.$store.state.archivalStep[archivalStepKeys[0]].process_definition_id,
        'client_id': userData.client_id[0],
        'user_id': userData.user_id[0],
        'process_definition_name': _this.$store.state.process_definition_name
    };
    return ideInputData;
};