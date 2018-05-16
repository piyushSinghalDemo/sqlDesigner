'use strict'
import cloneDeep from 'lodash/cloneDeep';
import uniqBy from 'lodash/uniqBy';
import stepObject from '../data/table-selection';
import { post as postToServer } from './serverCall';
import config from '../../config.json';
export async function setStepInfo(_this, processData) {
    let step = {};
    let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    _this.$store.state.process_definition_name = processData.process_definition_name;
    _this.$store.state.process_definition_id = processData.process_definition_id;
    // debugger;
    _this.$store.state.datasource_id = processData.steps[0].datasource_id;
    // let selectedTable = {};
    processData.steps.map(async(stpObj, index) => {

        let tableObj = cloneDeep(stepObject);
        // tableObj.is_drv_table = stpObj.select_table.is_drv_table;
        tableObj.left = stpObj.left;
        tableObj.top = stpObj.top;
        tableObj.title = stpObj.name;
        tableObj.description = stpObj.desc;
        tableObj.distinct = stpObj.distinct;
        if (stpObj.type == "select") {
            tableObj.type = "db";
        } else if (stpObj.type == "archival") {
            tableObj.type = "archive";
        } else if (stpObj.type == "stored_procedure") {
            tableObj.type = "spstep";
        }
        tableObj.stepId = stpObj.id;
        tableObj.datasource_id = stpObj.datasource_id;
        tableObj.process_definition_id = stpObj.process_definition_id;
        if (stpObj.limit) {
            tableObj.limit = stpObj.limit;
        }
        // For selection step
        if (stpObj.type == "select") {
            tableObj.is_drv_table = stpObj.select_table.is_drv_table;
            if (!stpObj.joins || !stpObj.joins.length) {
                let colObj = {
                        'fromColumn': {},
                        'toColumn': {},
                        'operator': '',
                    },
                    fromTableObj = {},
                    toTableObj = {};
                fromTableObj.tableName = stpObj.select_table.name;
                fromTableObj.aliesTableName = stpObj.select_table.alias;
                fromTableObj.stepId = stpObj.select_table.is_drv_table ? "Previous Steps" : "Database Table";
                toTableObj.tableName = stpObj.select_table.name;
                toTableObj.aliesTableName = stpObj.select_table.alias;
                toTableObj.stepId = stpObj.select_table.is_drv_table ? "Previous Steps" : "Database Table";
                tableObj.joins = false;
                tableObj.relationship.fromTable = fromTableObj;
                tableObj.relationship.toTable = toTableObj;
                // tableObj.relationship.selectedFilter = "dummy";
                // tableObj.relationship.selectedTableArray.push(cloneDeep(toTableObj));
                tableObj.relationship.selectedTableArray.push(cloneDeep(fromTableObj));
                // tableObj.relationship.colArray = colArray;
                tableObj.relationship.selectedTableArray = uniqBy(tableObj.relationship.selectedTableArray, 'tableName');
                let tempObj = { 'relationship': tableObj.relationship, 'colArray': [] };
                // tableObj.relationshipArray.push(cloneDeep(tempObj));
            } else {
                stpObj.joins.map((joinObj, index) => {
                    let fromTableObj = {},
                        toTableObj = {},
                        colObj = {
                            'fromColumn': {},
                            'toColumn': {},
                            'operator': '',
                        },
                        colArray = [];
                    fromTableObj.tableName = joinObj.jfrom;
                    fromTableObj.aliesTableName = joinObj.jfromalias;
                    fromTableObj.stepId = joinObj.jfrom_drv_table ? "Previous Steps" : "Database Table";
                    toTableObj.tableName = joinObj.jto;
                    toTableObj.aliesTableName = joinObj.jtoalias;
                    toTableObj.stepId = joinObj.jto_drv_table ? "Previous Steps" : "Database Table";
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
                    // debugger;
                    tableObj.relationship.jto_drv_table = joinObj.jto_drv_table;
                    tableObj.relationship.jfrom_drv_table = joinObj.jfrom_drv_table;

                    tableObj.relationship.selectedTableArray.push(cloneDeep(toTableObj));
                    tableObj.relationship.selectedTableArray.push(cloneDeep(fromTableObj));
                    // tableObj.relationship.colArray = colArray;
                    tableObj.relationship.selectedTableArray = uniqBy(tableObj.relationship.selectedTableArray, 'tableName');
                    let tempObj = { 'relationship': tableObj.relationship, 'colArray': colArray };
                    tableObj.relationshipArray.push(cloneDeep(tempObj));
                });
            }

        }
        //For archival step
        stpObj.list_of_relations && stpObj.list_of_relations.length && stpObj.list_of_relations.map(async(relationObj) => {
            // debugger;
            relationObj.joins.map(async(joinObj, rlnIndex) => {
                    // debugger
                    let fromTableObj = {},
                        toTableObj = {},
                        colObj = {
                            'fromColumn': {},
                            'toColumn': {},
                            'operator': '',
                        },
                        colArray = [];
                    fromTableObj.tableName = joinObj.jfrom;
                    fromTableObj.aliesTableName = joinObj.jfromalias;
                    fromTableObj.stepId = joinObj.jfrom_drv_table ? "Previous Steps" : "Database Table";
                    toTableObj.tableName = joinObj.jto;
                    toTableObj.aliesTableName = joinObj.jtoalias;
                    toTableObj.stepId = joinObj.jto_drv_table ? "Previous Steps" : "Database Table";
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
                    // tableObj.relationship.colArray = colArray;
                    let tempObj = { 'relationship': tableObj.relationship, 'colArray': colArray };
                    tableObj.relationshipArray.push(cloneDeep(tempObj));
                }) //End of list of relotion Object array

        }); // End of relation Array
        if (stpObj.drv_table && stpObj.drv_table.length) {
            // debugger;
            tableObj.relationship.driverTable.name = stpObj.drv_table[0].select_table.name;
            tableObj.relationship.driverTable.stepId = stpObj.drv_table[0].select_table.is_drv_table ? "Previous Steps" : "Database Table";
            tableObj.relationship.driverTable.aliesTableName = stpObj.drv_table[0].select_table.alias;
            tableObj.is_drv_table = stpObj.drv_table[0].select_table.is_drv_table;
        }
        if (stpObj.where && stpObj.where.length)
            tableObj.criteriaArray = [];
        stpObj.where && stpObj.where.map((whrObj, whrIndex) => {
            let criteriaObject = cloneDeep(stepObject.parenthasisobject);
            criteriaObject.openbrsis = whrObj.pre_braces;
            criteriaObject.showLogicalOperator = whrObj.operand ? true : false;
            criteriaObject.column.name = whrObj.column_name;
            criteriaObject.column.fixed = false;
            criteriaObject.column.tblAlies = whrObj.alias;
            criteriaObject.relOperator = getjoinOperator(whrObj.operator)
            criteriaObject.valueType = whrObj.is_col_compare ? 'field' : 'value';
            criteriaObject.value = whrObj.value;
            criteriaObject.closebrsis = whrObj.post_braces;
            criteriaObject.logOperator = setOperand(whrObj.operand); // ? true : false;
            tableObj.criteriaArray.push(cloneDeep(criteriaObject));
        });
        stpObj.select_table && stpObj.select_table.cols.length && stpObj.select_table.cols.map((workTableObj, index) => {
            if (workTableObj.col_name == "_*_") {
                tableObj.selectAllColumn = true;
            } else {
                let wrkObj = { 'name': '', 'group': '', fixed: false, 'tblAlies': '', 'colAlies': '' };
                wrkObj.name = workTableObj.col_name;
                wrkObj.group = stpObj.select_table.name;
                wrkObj.tblAlies = workTableObj.table_alias;
                wrkObj.colAlies = workTableObj.col_alias;
                tableObj.selectedColumns.push(cloneDeep(wrkObj));
            }
        });
        tableObj.relationship.selectedTableArray = uniqBy(tableObj.relationship.selectedTableArray, 'tableName');
        tableObj.relationship.selectedTableArray.map(async(tblObj, tblindx) => {
            if (tblObj.stepId == 'Previous Steps') {

                // tblObj.columns = tableObj.columns;
                // getPrevStepCol(cloneDeep(tblObj));
                if (tableObj.optionColumn.length) {
                    tableObj.optionColumn.push({ divider: true });
                }
                let headerObj = { header: tblObj.tableName };
                tableObj.optionColumn.push(cloneDeep(headerObj));
                for (const item of processData.steps) {
                    if (item.name === tblObj.tableName) {
                        item.select_table.cols.map((colObj, colIndex) => {
                            let columnObj = {
                                name: colObj.col_name,
                                group: '',
                                fixed: false,
                                tblAlies: colObj.table_alias,
                                colAlies: colObj.col_alias
                            };
                            tableObj.optionColumn.push(cloneDeep(columnObj));
                        });
                    }
                }

            } else {
                // getColumn(_this, tblObj, tableObj);
                let url = config.GET_DATA_URL + 'get_all_columns'; //'http://192.168.1.100:8010/get_all_columns';
                let inputJson = {
                    "conn_str": _this.$store.state.conn_str,
                    "schema": _this.$store.state.schema,
                    "dest_queue": "test",
                    "table_name": tblObj.tableName
                }
                await postToServer(_this, url, inputJson).then(response => {
                    if (tableObj.optionColumn.length) {
                        tableObj.optionColumn.push({ divider: true });
                    }
                    let headerObj = { header: tblObj.tableName };
                    tableObj.optionColumn.push(cloneDeep(headerObj));
                    let allColumn = response;

                    allColumn.map(function(obj, index) {
                        let columnObj = {
                            name: obj,
                            group: tblObj.tableName,
                            fixed: false,
                            tblAlies: tblObj.aliesTableName,
                            colAlies: obj + _this.$store.state.aliesCounter++
                        };
                        tableObj.optionColumn.push(cloneDeep(columnObj));
                    });
                    _this.$store.state.archivalStep[stpObj.id] = cloneDeep(tableObj); //for data selection
                    // console.log("Response from all tables" + JSON.stringify(response));
                }, response => {}).catch(e => {
                    console.log(e)
                        // this.ErrorMessage = 'Something went wrong.'
                })
            }
        });
        if (stpObj.type == "stored_procedure") {
            tableObj.storedProcedure.name = stpObj.procedure_name;
            stpObj.params.map((paramObj, paramIndex) => {
                let paramater = { Parameter_name: "", Type: "", Is_output: "", value: "" };
                paramater.Parameter_name = paramObj.name;
                paramater.Type = paramObj.dataType;
                paramater.Is_output = paramObj.type == "OUT" ? true : false;
                paramater.value = paramObj.value;
                tableObj.storedProcedure.params.push(paramater);
            });

            // tableObj.storedProcedure.params = stpObj.params;
        }
        // debugger;
        _this.$store.state.archivalStep[stpObj.id] = cloneDeep(tableObj); //for archival and other step
        // step[stpObj.id] = cloneDeep(tableObj);

    });

};

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

function getjoinOperator(sign) {
    let operatorArray = {
        '_eq_': "EQUALS_TO",
        '_not_eq_': "NOT_EQUALS_TO",
        '_lt_': "LESS_THAN",
        '_gt_': "GREATER_THAN",
        '_lt_eq_': "LESS_THAN_EQUALS_TO",
        '_gt_eq_': "GREATER_THAN_EQUALS_TO",
        '_is_n_': "IS_NULL",
        '_is_nt_n_': "IS_NOT_NULL",
        '_sl_': "LIKE_STARTS_WITH",
        '_el_': "LIKE_ENDS_WITH",
        '_cl_': "LIKE_CONTAINS_WITH",
        '_bet_': "BETWEEN",
        '_in_': "IN"
    };
    return operatorArray[sign];
}