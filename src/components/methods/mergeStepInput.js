'use strict'
import cloneDeep from 'lodash/cloneDeep';
export default function getMergeStepData(_this, tableObj) {
    // let _this = this;
    // debugger;
    console.log("_this.tableObj" + JSON.stringify(_this.tableObj));
    let $flowchart = $("#droppable");
    var flowchartData = $flowchart.flowchart('getData');
    let objectLength = Object.keys(flowchartData.links).length;
    let userData = JSON.parse(sessionStorage.getItem("userInfo"));
    let mergeStepInput = cloneDeep(_this.$store.state.mergeStep);
    mergeStepInput.name = tableObj.title;
    mergeStepInput.desc = tableObj.description;
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
        relationObject.select_table.is_drv_table = obj.is_drv_table;
        obj.workTableOutput.map(function(selColumn, selIndex) {
            relationObject.select_table.alias = selColumn.tblAlies;
            relationObject.select_table.name = selColumn.group;
            colsObject.col_name = selColumn.name;
            colsObject.col_alias = selColumn.colAlies;
            colsObject.table_alias = selColumn.tblAlies;
            relationObject.select_table.cols.push(cloneDeep(colsObject));
            // console.log("selColumn" + JSON.stringify(selColumn));
        });
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
                whereObject.column_name = whereObj.column.name; //column alies
                whereObject.operator = getjoinOperator(whereObj.relOperator); //relational operator
                whereObject.value = whereObj.value; //may be value date or column
                whereObject.pre_braces = whereObj.openbrsis;
                whereObject.operand = whereObj.logOperator ? 'AND' : 'OR';
                whereObject.is_col_compare = whereObj.valueType == 'field' ? true : false;
                whereObject.with_alias = whereObj.field.colAlies;
                whereObject.with_col = whereObj.field.name;
                relationObject.where.push(whereObject);
            }
        });
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
            mergeStepInput.links.push(cloneDeep(link));
        }
        mergeStepInput.list_of_merge.push(relationObject);
        mergeStepInput.client_id = userData.client_id,
            mergeStepInput.user_id = userData.user_id,
            mergeStepInput.id = tableObj.stepId
    });
    return mergeStepInput;
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