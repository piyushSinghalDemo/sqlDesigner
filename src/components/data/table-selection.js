export default {
    selectedTables: '',
    relationship: {
        selectedTableArray: [],
        selectedTable: null,
        fromTable: null,
        toTable: null,
        selectedColumn: null,
        selectedFilter: null
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
    selectedColumns: [],
    distinct: false,
    colObj: { "fromColumn": '', 'toColumn': '', 'operator': '' },
    colArray: [{ "fromColumn": '', 'toColumn': '', 'operator': '' }],
}