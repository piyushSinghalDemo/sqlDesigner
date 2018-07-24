/**
 * @author Piyush Singhal 
 * @description It will return Output json from archival step to create step
 * 
 */
'use strict'
import cloneDeep from 'lodash/cloneDeep';
import flowchartLink from './getOperatorLink';
import { OPERATOR_ARRAY } from '../constant'
export function getStepData(_this, tableObj) {
    // let _this = this;
    // console.log("_this.tableObj" + JSON.stringify(_this.tableObj));
    // debugger;
    // debugger;
    let $flowchart = $("#droppable");
    var flowchartData = $flowchart.flowchart('getData');
    let objectLength = Object.keys(flowchartData.links).length;
    let userData = JSON.parse(sessionStorage.getItem("userInfo"));
    let archiveStepInput = cloneDeep(_this.$store.state.archiveStepObject);
    archiveStepInput.name = tableObj.title;
    archiveStepInput.desc = tableObj.description;
    archiveStepInput.limit = tableObj.limit;
    archiveStepInput.isSingleTableArchival = tableObj.isSingleTableArchival;
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
        'order_by': [],
        'where': []
    }
    let orderByObject = { 'column_name': '', 'is_desc': '' };
    tableObj.archive.driverTable.selectedColumns.map(obj => {
        orderByObject.column_name = obj.name;
        orderByObject.is_desc = obj.decending;
        DrvTableObj.order_by.push(cloneDeep(orderByObject));
    });
    let whereObject = {
        "post_braces": "",
        "alias": "",
        "column_name": "",
        "table_name": "",
        "operator": "",
        "date_type": "",
        'formatType': "",
        "valueType": "",
        "value": "",
        "pre_braces": "",
        "operand": "",
        "is_col_compare": "",
    }
    tableObj.archive.where.map(obj => {
        let temp = cloneDeep(whereObject);
        if (obj.column && obj.column.name) {
            temp.post_braces = obj.closebrsis;
            temp.alias = obj.column.tblAlies; //table alies
            temp.table_name = obj.column.group;
            temp.column_name = obj.column.name; //column alies
            temp.colAlies = obj.column.colAlies; //column alies
            temp.operator = getjoinOperator(obj.relOperator); //relational operator
            temp.date_type = obj.dateType;
            temp.formatType = obj.formatType;
            temp.valueType = obj.valueType;
            temp.value = obj.value; //may be value date or column
            temp.pre_braces = obj.openbrsis;
            temp.operand = obj.logOperator ? 'AND' : 'OR';
            temp.is_col_compare = obj.valueType == 'field' ? true : false;
            temp.with_alias = obj.field.colAlies;
            temp.with_col = obj.field.name;
            temp.with_table = obj.field.group;
            temp.with_colAlies = obj.field.colAlies;
            DrvTableObj.where.push(cloneDeep(temp));
        }
    });
    DrvTableObj.where.length ? DrvTableObj.where[DrvTableObj.where.length - 1].operand = '' : '';
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
    tableObj.isSingleTableArchival && tableObj.relationshipArray.map(function(obj, index) {
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
            // debugger;
        relationObject.output_table = obj.select_table.tableName;
        relationObject.select_table.alias = obj.select_table.aliesTableName;
        relationObject.select_table.name = obj.select_table.tableName;
        colsObject.table_alias = obj.select_table.aliesTableName;
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
        //check for join have some data or not
        if (joinObject.jto)
            relationObject.joins.push(cloneDeep(joinObject));

        obj.where && obj.where.map(function(whereObj, whereIndex) {
            if (whereObj.column) {
                whereObject.post_braces = whereObj.closebrsis;
                whereObject.alias = whereObj.column.tblAlies; //table alies
                whereObject.table_name = whereObj.column.group;
                whereObject.column_name = whereObj.column.name; //column alies
                whereObject.colAlies = whereObj.column.colAlies; //column alies
                whereObject.operator = getjoinOperator(whereObj.relOperator); //relational operator
                whereObject.date_type = whereObj.dateType;
                whereObject.formatType = whereObject.formatType;
                whereObject.valueType = whereObj.valueType;
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
        // debugger;
        archiveStepInput.list_of_relations.push(relationObject);
    });
    /**
     * Set Business Object
     */
    // debugger;
    !tableObj.isSingleTableArchival && tableObj.relationshipArray.map(function(obj, index) {
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
        //check for join have some data or not
        // if (joinObject.jto)
        // relationObject.joins.push(cloneDeep(joinObject));
        archiveStepInput.business_object_join = cloneDeep(joinObject);
    })
    archiveStepInput.client_id = userData.client_id;
    archiveStepInput.user_id = userData.user_id;
    archiveStepInput.id = tableObj.stepId;
    archiveStepInput.business_object_id = tableObj.archive.businessObjectId;
    return archiveStepInput;
};

function getjoinOperator(sign) {
    let operatorArray = OPERATOR_ARRAY;
    return operatorArray[sign];
}