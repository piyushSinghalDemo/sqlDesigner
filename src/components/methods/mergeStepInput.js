'use strict'
import cloneDeep from 'lodash/cloneDeep';
import flowchartLink from './getOperatorLink';
import { OPERATOR_ARRAY } from '../constant'
export default function getMergeStepData(_this, tableObj) {
    // let _this = this;
    // debugger;
    // console.log("_this.tableObj" + JSON.stringify(_this.tableObj));
    let $flowchart = $("#droppable");
    var flowchartData = $flowchart.flowchart('getData');
    let objectLength = Object.keys(flowchartData.links).length;
    let userData = JSON.parse(sessionStorage.getItem("userInfo"));
    let mergeStepInput = cloneDeep(_this.$store.state.mergeStep);
    mergeStepInput.output_table = tableObj.title;
    mergeStepInput.name = tableObj.title;
    mergeStepInput.desc = tableObj.description;
    mergeStepInput.type = tableObj.type;
    // mergeStepInput.limit = tableObj.limit;
    let colsObject = {
        "col_name": "",
        "func": "",
        "col_alias": "",
        "table_alias": ""
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
        "operator": "",
        "value": "",
        "date_type": "",
        "formatType": "",
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
        // console.log("relationshipArray in merge step" + JSON.stringify(tableObj.relationshipArray));
    tableObj.relationshipArray.map(function(obj, index) {
        let relationObject = {
                "select_table": {
                    "alias": "", //From Table alies
                    "is_drv_table": false,
                    "name": "", //From Table
                    "cols": []
                },
                "joins": [],
                "where": []
            }
            // debugger;
        relationObject.distinct = obj.distinct;
        relationObject.select_table.is_drv_table = obj.is_drv_table;
        relationObject.select_table.alias = obj.selectedTable.aliesTableName;
        relationObject.select_table.name = obj.selectedTable.tableName;
        if (obj.selectAll) {
            relationObject.select_table.cols.push({
                'table_alias': 'cu',
                'col_alias': '',
                'col_name': '_*_',
                'func': '' //for now by default it will be blank
            });
        } else {
            obj.workTableOutput.map(function(selColumn, selIndex) {
                colsObject.col_name = selColumn.name;
                colsObject.col_alias = selColumn.colAlies;
                colsObject.table_alias = selColumn.tblAlies;
                relationObject.select_table.cols.push(cloneDeep(colsObject));
                // console.log("selColumn" + JSON.stringify(selColumn));
            });
        }

        if (obj.relationship.selectedFilter) {
            joinObject.jto = obj.relationship.toTable ? obj.relationship.toTable.tableName : "";
            joinObject.jfrom = obj.relationship.fromTable ? obj.relationship.fromTable.tableName : "";
            joinObject.jfromalias = obj.relationship.fromTable ? obj.relationship.fromTable.aliesTableName : "";
            joinObject.jtoalias = obj.relationship.toTable ? obj.relationship.toTable.aliesTableName : "";
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
        }


        obj.where && obj.where.map(function(whereObj, whereIndex) {
            if (whereObj.column) {
                whereObject.post_braces = whereObj.closebrsis;
                whereObject.alias = whereObj.column.tblAlies; //table alies
                whereObject.column_name = whereObj.column.name; //column alies
                whereObject.operator = getjoinOperator(whereObj.relOperator); //relational operator
                whereObject.date_type = whereObj.dateType;
                whereObject.formatType = whereObj.formatType;
                whereObject.valueType = whereObj.valueType;
                whereObject.value = whereObj.value; //may be value date or column
                whereObject.pre_braces = whereObj.openbrsis;
                whereObject.operand = whereObj.logOperator ? 'AND' : 'OR';
                whereObject.is_col_compare = whereObj.valueType == 'field' ? true : false;
                whereObject.with_alias = whereObj.field.colAlies;
                whereObject.with_col = whereObj.field.name;
                relationObject.where.push(cloneDeep(whereObject));
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
        mergeStepInput.links = flowchartLink(_this, flowchartData);
        mergeStepInput.list_of_merge.push(relationObject);
        mergeStepInput.client_id = userData.client_id;
        mergeStepInput.user_id = userData.user_id;
        mergeStepInput.id = tableObj.stepId;
        mergeStepInput.distinct = tableObj.merge.distinctAll;
    });
    return mergeStepInput;
};

function getjoinOperator(sign) {
    let operatorArray = OPERATOR_ARRAY
    return operatorArray[sign];
}