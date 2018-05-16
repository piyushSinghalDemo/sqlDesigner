'use strict'
import config from '../../config.json'
import cloneDeep from 'lodash/cloneDeep';
export default function getOperatorLink(_this, flowchartData) {
    let objectLength = Object.keys(flowchartData.links).length;
    let linkArray = [],
        link = {};
    for (var i = 0; i < objectLength; i++) {
        link.source = flowchartData.links[i].fromOperator;
        link.target = flowchartData.links[i].toOperator;
        link.sourceName = flowchartData.links[i].fromTable;
        link.targetName = flowchartData.links[i].toTable
        link.fromSubConnector = flowchartData.links[i].fromSubConnector;
        link.toSubConnector = flowchartData.links[i].toSubConnector;
        linkArray.push(cloneDeep(link));
    }

    return linkArray;
}