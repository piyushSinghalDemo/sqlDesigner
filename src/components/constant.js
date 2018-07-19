/**
 * API LINK
 */
export const GET_ALL_COLUMN = "get_all_columns";
export const GET_PROCESS_DEFINITION_BY_ID = 'get_process_definition_by_id';
export const GET_TABLES = 'get_tables';
export const VALDATE_PROCESS_DEFINITION = 'validate_process_definition/true';
export const ADD_IDE_DATA = 'add_ide_data';
export const IDE_STEP_DATA = 'ide_step_data/add';
export const GET_STORED_PROCEDURE_LIST = 'get_stored_procedure_list';
export const GET_STORED_PROCEDURE_PARAM = 'get_stored_procedure_param';

/**
 * METADATA
 */
export const PREVIOUS_STEPS = 'Previous Steps';
export const JOIN_TYPE = ["inner join", "left join", "right join", "full join"];
export const FILTER_ARRAY = ["EQUALS_TO", "NOT_EQUALS_TO", "LESS_THAN", "GREATER_THAN", "BETWEEN", "IN",
    "LESS_THAN_EQUALS_TO", "GREATER_THAN_EQUALS_TO", "IS_NULL", "IS_NOT_NULL", "LIKE_STARTS_WITH", "LIKE_ENDS_WITH", "LIKE_CONTAINS_WITH"
];
export const OPEN_BRASIS_ARRAY = ['(', '((', '((('];
export const CLOSE_BRASIS_ARRAY = [')', '))', ')))'];
export const FUNCTION_ARRAY = ['count', 'sum'];
export const VALUE_TYPE_ARRAY = ['value', 'date', 'field'];