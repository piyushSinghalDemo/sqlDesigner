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
export const PREVIOUS_STEPS = 'Previous Steps'; //step1
export const DATABASE_TABLE = 'Database Table'; //step2
export const DRIVER_TABLE = "Driver Table";
export const JOIN_TYPE = ["inner join", "left join", "right join", "full join"];
export const FILTER_ARRAY = ["EQUALS_TO", "NOT_EQUALS_TO", "LESS_THAN", "GREATER_THAN", "BETWEEN", "IN",
    "LESS_THAN_EQUALS_TO", "GREATER_THAN_EQUALS_TO", "IS_NULL", "IS_NOT_NULL", "LIKE_STARTS_WITH", "LIKE_ENDS_WITH", "LIKE_CONTAINS_WITH"
];
export const OPEN_BRASIS_ARRAY = ['(', '((', '((('];
export const CLOSE_BRASIS_ARRAY = [')', '))', ')))'];
export const FUNCTION_ARRAY = ['count', 'sum'];
export const VALUE_TYPE_ARRAY = ['value', 'date', 'field'];
export const DATE_TYPE_ARRAY = ['Database Date', 'JDE Julien', 'CCYYMMDD', 'Century Only',
    'Year Only', 'Month Only', 'YYDDD'
];
export const DATE_HINT = {
    'Database Date': "Example: 2007-12-24",
    'JDE Julien': "Example: 107358",
    'CCYYMMDD': "Example: 20071224",
    'Century Only': "Example: 20",
    'Year Only': "Example: 07",
    'Month Only': "Example: 12",
    'YYDDD': "Example: 07358",
}