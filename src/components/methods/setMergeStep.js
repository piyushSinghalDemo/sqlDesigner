import cloneDeep from 'lodash/cloneDeep';
import uniqBy from 'lodash/uniqBy';
import stepObject from '../data/table-selection';
import { post as postToServer } from './serverCall';
import config from '../../config.json';
import { PREVIOUS_STEPS, OPERATOR_ARRAY, DATABASE_TABLE } from '../constant'
export default function setmergeStepData(_this, relationObj, tableObj) {
    let criteriaArray = [],
        colArray = [],
        workTableArray = [],
        reletionData = {},
        selectedTable = {},
        is_drv_table = false;
    relationObj.joins && relationObj.joins.length && relationObj.joins.map(async(joinObj, rlnIndex) => {
            let fromTableObj = {},
                toTableObj = {},
                colObj = {
                    'fromColumn': {},
                    'toColumn': {},
                    'operator': '',
                };

            fromTableObj.tableName = joinObj.jfrom;
            fromTableObj.aliesTableName = joinObj.jfromalias;
            fromTableObj.stepId = joinObj.jfrom_drv_table ? PREVIOUS_STEPS : DATABASE_TABLE;
            toTableObj.tableName = joinObj.jto;
            toTableObj.aliesTableName = joinObj.jtoalias;
            toTableObj.stepId = joinObj.jto_drv_table ? PREVIOUS_STEPS : DATABASE_TABLE;
            tableObj.relationship.fromTable = fromTableObj;
            tableObj.relationship.toTable = toTableObj;
            tableObj.relationship.selectedFilter = joinObj.type;
            joinObj.condition.map((conditionObj, conditionIndex) => {
                colObj.fromColumn.name = conditionObj.from_column;
                colObj.fromColumn.group = joinObj.jfrom;
                colObj.fromColumn.tblAlies = conditionObj.from_alias;
                colObj.fromColumn.fixed = false;
                colObj.fromColumn.colAlies = ""; // Need to discuss and fill details
                colObj.toColumn.name = conditionObj.to_column;
                colObj.toColumn.group = joinObj.jto;
                colObj.toColumn.tblAlies = conditionObj.to_alias;
                colObj.toColumn.fixed = false;
                colObj.toColumn.colAlies = ""; // Need to discuss and fill details
                colObj.operator = getjoinOperator(conditionObj.operator); //conditionObj.operator;
                colArray.push(cloneDeep(colObj));
            });
            tableObj.relationship.jto_drv_table = joinObj.jto_drv_table;
            tableObj.relationship.jfrom_drv_table = joinObj.jfrom_drv_table;
            tableObj.relationship.selectedTableArray.push(cloneDeep(toTableObj));
            tableObj.relationship.selectedTableArray.push(cloneDeep(fromTableObj));
            tableObj.relationship.selectedTableArray = uniqBy(tableObj.relationship.selectedTableArray, 'tableName');
        }) //End of list of relotion Object array

    relationObj.where && relationObj.where.length && relationObj.where.map((whrObj, whrIndex) => {
        let criteriaObject = cloneDeep(tableObj.parenthasisobject);
        criteriaObject.openbrsis = whrObj.pre_braces;
        criteriaObject.showLogicalOperator = whrObj.operand ? true : false;
        criteriaObject.column.name = whrObj.column_name;
        criteriaObject.column.fixed = false;
        criteriaObject.column.tblAlies = whrObj.alias;
        criteriaObject.relOperator = getjoinOperator(whrObj.operator);
        criteriaObject.valueType = whrObj.valueType;
        criteriaObject.dateType = whrObj.date_type;
        criteriaObject.value = whrObj.value;
        criteriaObject.closebrsis = whrObj.post_braces;
        criteriaObject.logOperator = setOperand(whrObj.operand); // ? true : false;
        criteriaArray.push(cloneDeep(criteriaObject));
    });
    criteriaArray = criteriaArray.length ? criteriaArray : cloneDeep(tableObj.parenthasisobject);
    relationObj.select_table.cols && relationObj.select_table.cols.length && relationObj.select_table.cols.map((workTableObj, workIndex) => {
        let tempObject = {
            name: workTableObj.col_name,
            group: relationObj.select_table.name,
            fixed: false,
            tblAlies: workTableObj.table_alias,
            colAlies: workTableObj.col_alias
        }
        is_drv_table = relationObj.select_table.is_drv_table;

        let tableObject = {};
        tableObject.tableName = relationObj.select_table.name;
        tableObject.aliesTableName = workTableObj.table_alias;
        tableObject.stepId = is_drv_table ? PREVIOUS_STEPS : DATABASE_TABLE;
        tableObj.relationship.selectedTableArray.push(cloneDeep(tableObject));
        tableObj.relationship.selectedTableArray = uniqBy(tableObj.relationship.selectedTableArray, 'tableName');
        workTableArray.push(cloneDeep(tempObject));
    });
    selectedTable.tableName = relationObj.select_table.name;
    selectedTable.aliesTableName = relationObj.select_table.alias;
    selectedTable.group = relationObj.select_table.is_drv_table ? '' : DATABASE_TABLE;
    selectedTable.stepId = relationObj.select_table.is_drv_table ? PREVIOUS_STEPS : DATABASE_TABLE;

    reletionData = {
        "relationship": tableObj.relationship,
        is_drv_table: is_drv_table,
        colArray: colArray,
        where: criteriaArray,
        workTableOutput: workTableArray,
        selectedTable: selectedTable,
        distinct: relationObj.distinct,
        //'selectAll':'',
    }
    return reletionData;
};

function getjoinOperator(sign) {
    let operatorArray = OPERATOR_ARRAY;
    return operatorArray[sign];
}

function setOperand(param) {
    let operandArray = {
        'AND': true,
        'OR': false
    }
    if (param)
        return operandArray[param]
    else
        return false;
}