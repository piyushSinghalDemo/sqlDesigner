export default {
    selectedTables: '',
    relationship: {
        selectedTableArray: [],
        selectedTable: null,
        fromTable: null,
        toTable: null,
        selectedColumn: null,
        selectedFilter: null,
        driverTable: null,
    },
    relationshipArray: [],
    parenthasisobject: {
        openbrsis: '',
        function: '',
        column: '',
        relOperator: '',
        valueType: '',
        value: '',
        closebrsis: '',
        logOperator: true,
        date: null,
        menu: false,
        modal: false,
        field: '',
        showLogicalOperator: false
    },
    criteriaArray: [{
        openbrsis: '',
        function: '',
        column: '',
        relOperator: '',
        valueType: '',
        value: '',
        closebrsis: '',
        logOperator: true,
        date: null,
        menu: false,
        modal: false,
        field: '',
    }],
    selectAllColumn: false,
    optionColumn: [],
    previousSteps: [],
    selectedColumns: [],
    allDbTables: [],
    allArchiveTables: [],
    distinct: false,
    type: '',
    is_drv_table: false,
    colObj: { "fromColumn": '', 'toColumn': '', 'operator': '' },
    colArray: [{ "fromColumn": '', 'toColumn': '', 'operator': '' }],
}