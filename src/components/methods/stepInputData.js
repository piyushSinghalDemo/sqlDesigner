/**
 * @author Piyush Singhal 
 * @description It will return Input json for archival step to create step
 * 
 */
'use strict'
import cloneDeep from 'lodash/cloneDeep';
import flowchartLink from './getOperatorLink';
export function getStepData(_this, tableObj) {
    // let _this = this;
    // console.log("_this.tableObj" + JSON.stringify(_this.tableObj));
    let $flowchart = $("#droppable");
    var flowchartData = $flowchart.flowchart('getData');
    let objectLength = Object.keys(flowchartData.links).length;
    let userData = JSON.parse(sessionStorage.getItem("userInfo"));
    let archiveStepInput = cloneDeep(_this.$store.state.archiveStepObject);
    archiveStepInput.name = tableObj.title;
    archiveStepInput.desc = tableObj.description;
    archiveStepInput.limit = tableObj.limit;
    let DrvTableObj = {
        "select_table": {
            "alias": tableObj.relationship.driverTable.aliesTableName,
            "name": tableObj.relationship.driverTable.name,
            "is_drv_table": tableObj.is_drv_table,
            "cols": [{
                "table_alias": tableObj.relationship.driverTable.aliesTableName,
                "col_alias": "",
                "col_name": "_*_"
            }]
        },
        'order_by': []
    }
    let orderByObject = { 'column_name': '', 'is_desc': '' };
    tableObj.archive.driverTable.selectedColumns.map(obj => {
        orderByObject.column_name = obj.name;
        orderByObject.is_desc = obj.decending;
        DrvTableObj.order_by.push(cloneDeep(orderByObject));
    });
    archiveStepInput.drv_table.push(DrvTableObj);
    let colsObject = { // all column dont have work table o/p as data selection
        "table_alias": "",
        "func": "",
        "col_alias": "",
        "col_name": "_*_"
    }
    let joinObject = {
        "condition": [],
        "jfrom": "",
        "jto": "",
        "type": "",
        "jfromalias": "",
        "jtoalias": "",
        "jto_drv_table": false,
        "jfrom_drv_table": false
    }
    let conditionObject = {
        "from_column": "",
        "to_column": "",
        "from_alias": "",
        "to_alias": "",
        "operator": ""
    }
    let whereObject = {
        "post_braces": "",
        "alias": "",
        "column_name": "",
        "table_name": "",
        "operator": "",
        "value": "",
        "pre_braces": "",
        "operand": "",
        "is_col_compare": "",
    }
    let relationObject = {
        "output_table": "", //From table
        "select_table": {
            "alias": "", //From Table alies
            "name": "", //From Table
            "cols": []
        },
        "joins": [],
        "where": []
    }
    tableObj.relationshipArray.map(function(obj, index) {
        let relationObject = {
            "output_table": "", //From table
            "select_table": {
                "alias": "", //From Table alies
                "name": "", //From Table
                "cols": []
            },
            "joins": [],
            "where": []
        }
        relationObject.output_table = obj.relationship.toTable.tableName;
        relationObject.select_table.alias = obj.relationship.toTable.aliesTableName;
        relationObject.select_table.name = obj.relationship.toTable.tableName;
        colsObject.table_alias = obj.relationship.toTable.aliesTableName;
        relationObject.select_table.cols.push(cloneDeep(colsObject));

        joinObject.jto = obj.relationship.toTable.tableName;
        joinObject.jfrom = obj.relationship.fromTable.tableName;
        joinObject.jfromalias = obj.relationship.fromTable.aliesTableName;
        joinObject.jtoalias = obj.relationship.toTable.aliesTableName;
        joinObject.type = obj.relationship.selectedFilter;
        joinObject.jto_drv_table = obj.relationship.jto_drv_table;
        joinObject.jfrom_drv_table = obj.relationship.jfrom_drv_table;
        joinObject.condition = [];
        obj.colArray.map(function(colObj, colIndex) {
            if (colObj.fromColumn.name) {
                conditionObject.from_column = colObj.fromColumn.name;
                conditionObject.to_column = colObj.toColumn.name;
                conditionObject.from_alias = colObj.fromColumn.tblAlies;
                conditionObject.to_alias = colObj.toColumn.tblAlies;
                conditionObject.operator = getjoinOperator(colObj.operator);
                joinObject.condition.push(cloneDeep(conditionObject));
            }
        });
        relationObject.joins.push(cloneDeep(joinObject));

        obj.where && obj.where.map(function(whereObj, whereIndex) {
            if (whereObj.column) {
                whereObject.post_braces = whereObj.closebrsis;
                whereObject.alias = whereObj.column.tblAlies; //table alies
                whereObject.table_name = whereObj.column.group;
                whereObject.column_name = whereObj.column.name; //column alies
                whereObject.colAlies = whereObj.column.colAlies; //column alies
                whereObject.operator = getjoinOperator(whereObj.relOperator); //relational operator
                whereObject.value = whereObj.value; //may be value date or column
                whereObject.pre_braces = whereObj.openbrsis;
                whereObject.operand = whereObj.logOperator ? 'AND' : 'OR';
                whereObject.is_col_compare = whereObj.valueType == 'field' ? true : false;
                whereObject.with_alias = whereObj.field.colAlies;
                whereObject.with_col = whereObj.field.name;
                whereObject.with_table = whereObj.field.group;
                whereObject.with_colAlies = whereObj.field.colAlies;
                relationObject.where.push(whereObject);
            }
        });
        relationObject.where.length ? relationObject.where[relationObject.where.length - 1].operand = '' : '';
        let link = {
            source: '',
            target: '',
            sourceName: '',
            targetName: '',
            fromSubConnector: '',
            toSubConnector: ''
        }
        for (var i = 0; i < objectLength; i++) {
            link.source = flowchartData.links[i].fromOperator;
            link.target = flowchartData.links[i].toOperator;
            link.sourceName = flowchartData.links[i].fromTable;
            link.targetName = flowchartData.links[i].toTable;
            link.fromSubConnector = flowchartData.links[i].fromSubConnector;
            link.toSubConnector = flowchartData.links[i].toSubConnector;
            archiveStepInput.links.push(cloneDeep(link));
        }
        // archiveStepInput.links = flowchartLink(_this, flowchartData);
        archiveStepInput.list_of_relations.push(relationObject);
        archiveStepInput.client_id = userData.client_id,
            archiveStepInput.user_id = userData.user_id,
            archiveStepInput.id = tableObj.stepId
    });
    return archiveStepInput;
};

function getjoinOperator(sign) {
    let operatorArray = {
        EQUALS_TO: '_eq_',
        NOT_EQUALS_TO: '_not_eq_',
        LESS_THAN: '_lt_',
        GREATER_THAN: '_gt_',
        LESS_THAN_EQUALS_TO: '_lt_eq_',
        GREATER_THAN_EQUALS_TO: '_gt_eq_',
        IS_NULL: '_is_n_',
        IS_NOT_NULL: '_is_nt_n_',
        LIKE_STARTS_WITH: '_sl_',
        LIKE_ENDS_WITH: '_el_',
        LIKE_CONTAINS_WITH: '_cl_',
        BETWEEN: '_bet_',
        IN: '_in_'
    };
    return operatorArray[sign];
}