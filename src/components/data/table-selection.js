export default {
    selectedTables: '',
    relationship: {
        selectedTableArray: [],
        selectedTable: null,
        fromTable: {},
        toTable: {},
        selectedColumn: null,
        selectedFilter: null,
        driverTable: {},
    },
    relationshipArray: [],
    parenthasisobject: {
        openbrsis: '',
        function: '',
        column: {},
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
    availableColumn: [],
    previousSteps: [],
    selectedColumns: [],
    allDbTables: [],
    allArchiveTables: [],
    distinct: false,
    type: '',
    stepId: '',
    is_drv_table: false,
    colObj: { "fromColumn": '', 'toColumn': '', 'operator': '' },
    colArray: [{ "fromColumn": '', 'toColumn': '', 'operator': '' }],
    limit: '',
    allPrevStepTables: [],
    top: '',
    left: '',
    env_id: '',
    joins: true,
    loadTable: false,
    loadColumn: false,
    loadProcedureList: false,
    loadParamater: false,
    storedProcedure: {
        name: '',
        params: [],
        procedureList: []
    },
    merge: {
        selectedTable: {},
        optionColumn: [],
        selectedColumns: [],
        distinct: false,
        selectAll: false,
        distinctAll: true,
    },
    archive: {
        optionColumn: [],
        driverTable: {
            columns: [],
            selectedColumns: [],
        },
        where: []
    }
}