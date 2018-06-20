import Vue from 'vue';
import Vuex from 'vuex';
// import { stat } from 'fs';

Vue.use(Vuex);
const state = {
    env_id: "",
    schedulerId: 'hello',
    dialog: false,
    dataSelectionArray: [],
    dataSelectionIndex: null,
    allDbTables: [],
    dbColumn: [],
    aliesCounter: 0,
    currentStep: '',
    archivalStep: {}, // for getting all steps internal data
    processArray: [],
    process_definition_id: '',
    process_definition_name: 'Untitled Document',
    openArchivePanel: false,
    openMergePanel: false,
    dbStepObject: {
        'id': '',
        'process_definition_name': '',
        'type': 'select', //step type select, merge, minus
        'name': 'temp', //temp
        'desc': 'table description', //table_2
        'output_table': 'table_2', //dummy or any one table name 
        "distinct": false,
        'select_table': { //work table output
            'name': 'table_1', //default   //work table output may be same as output_table key
            'alias': 't1', // 2char +incr 
            'cols': []
        },
        'joins': [],
        'where': [],
        links: []
    },
    archiveStepObject: {
        "id": '',
        "process_definition_name": '',
        "type": "archival",
        "name": "temp name archival",
        "desc": "temp desc archival",
        "limit": '',
        "drv_table": [],
        "list_of_relations": [],
        links: []
    },
    storedProcedureStep: {
        top: "",
        left: "",
        env_id: "",
        process_definition_id: "",
        "process_definition_name": '',
        client_id: "",
        user_id: "",
        "id": '',
        "type": "stored_procedure",
        "name": "temp name procedure",
        "desc": "temp desc procedure",
        procedure_name: "",
        links: [],
        params: [],
    },
    mergeStep: {
        "id": 205,
        "user_id": "13",
        "output_table": "Step1",
        "process_definition_id": "",
        "name": "Step1",
        "desc": "merge step",
        "list_of_merge": [],
        "type": "merge",
        "distinct": false,
        "client_id": "16",
        links: [],
    },
    'openStoredProcedure': false,
    schema: '',
    conn_str: '',
    database_type: '',
    database_name: ''
}
const getters = {
    currentStep: state => {
        return state.currentStep
    },
    get_env_id: state => {
        return state.env_id
    },
    get_dialog: state => {
        return state.dialog
    },
    get_dataSelectionArray: state => {
        return state.dataSelectionArray
    },
    get_dataSelectionIndex: state => {
        return state.dataSelectionIndex
    },
    get_allDbTables: state => {
        return state.allDbTables
    },
    get_dbColumn: state => {
        return state.dbColumn
    },
    get_aliesCounter: state => {
        return state.aliesCounter
    },
    get_currentStep: state => {
        return state.currentStep
    },
    get_archivalStep: state => {
        return state.archivalStep
    },
    get_processArray: state => {
        return state.processArray
    },
    get_process_definition_id: state => {
        return state.process_definition_id
    },
    get_process_definition_name: state => {
        return state.process_definition_name
    },
    // get_process_definition_name: state => {
    //     return state.process_definition_name
    // },
    get_openArchivePanel: state => {
        return state.openArchivePanel
    },
    get_openMergePanel: state => {
        return state.openMergePanel
    },
    get_dbStepObject: state => {
        return state.dbStepObject
    },
    get_archiveStepObject: state => {
        return state.archiveStepObject
    },
    get_storedProcedureStep: state => {
        return state.storedProcedureStep
    },
    get_mergeStep: state => {
        return state.mergeStep
    },
    get_schema: state => {
        return state.schema
    },
    get_openStoredProcedure: state => {
        return state.openStoredProcedure
    },
    // get_schema: state => {
    //     return state.schema
    // },
    get_conn_str: state => {
        return state.conn_str
    },
    get_database_type: state => {
        return state.database_type
    },
    get_database_name: state => {
        return state.database_name
    },
}
const mutations = {
    // mutateUpdateSchedulerId: function(state, id) {
    //     state.schedulerId = id
    // },
    setCurrentStep: (state, stepId) => {
        state.currentStep = stepId;
    },
    set_env_id: (state, env_id) => {
        state.env_id = env_id;
    },
    set_dialog: (state, dialog) => {
        state.dialog = dialog;
    },
    set_dataSelectionArray: (state, dataSelectionArray) => {
        state.dataSelectionArray = dataSelectionArray;
    },
    set_dataSelectionIndex: (state, dataSelectionIndex) => {
        state.dataSelectionIndex = dataSelectionIndex;
    },
    set_allDbTables: (state, allDbTables) => {
        state.allDbTables = allDbTables;
    },
    set_dbColumn: (state, dbColumn) => {
        state.dbColumn = dbColumn;
    },
    set_aliesCounter: (state, aliesCounter) => {
        state.aliesCounter = aliesCounter;
    },
    set_currentStep: (state, currentStep) => {
        state.currentStep = currentStep;
    },
    set_archivalStep: (state, archivalStep) => {
        state.archivalStep = archivalStep;
    },
    set_processArray: (state, processArray) => {
        state.processArray = processArray;
    },
    set_process_definition_id: (state, process_definition_id) => {
        state.process_definition_id = process_definition_id;
    },
    set_process_definition_name: (state, process_definition_name) => {
        state.process_definition_name = process_definition_name;
    },
    set_openArchivePanel: (state, openArchivePanel) => {
        state.openArchivePanel = openArchivePanel;
    },
    set_openMergePanel: (state, openMergePanel) => {
        state.openMergePanel = openMergePanel;
    },
    set_dbStepObject: (state, dbStepObject) => {
        state.dbStepObject = dbStepObject;
    },
    set_archiveStepObject: (state, archiveStepObject) => {
        state.archiveStepObject = archiveStepObject;
    },
    set_storedProcedureStep: (state, storedProcedureStep) => {
        state.storedProcedureStep = storedProcedureStep;
    },
    set_mergeStep: (state, mergeStep) => {
        state.mergeStep = mergeStep;
    },
    set_schema: (state, schema) => {
        state.schema = schema;
    },
    set_openStoredProcedure: (state, openStoredProcedure) => {
        state.openStoredProcedure = openStoredProcedure;
    },
    // set_schema: (state, schema) => {
    //     state.schema = schema;
    // },
    set_conn_str: (state, conn_str) => {
        state.conn_str = conn_str;
    },
    set_database_type: (state, database_type) => {
        state.database_type = database_type;
    },
    set_database_name: (state, database_name) => {
        state.database_name = database_name;
    },
}

const actions = {
    setCurrentStep: (context, stepId) => {
        context.commit('setCurrentStep', stepId);
    },
    set_env_id: (context, env_id) => {
        context.commit('set_env_id', env_id);
    },
    set_dialog: (context, dialog) => {
        context.commit('set_dialog', dialog);
    },
    set_dataSelectionArray: (context, dataSelectionArray) => {
        context.commit('set_dataSelectionArray', dataSelectionArray);
    },
    set_dataSelectionIndex: (context, dataSelectionIndex) => {
        context.commit('set_dataSelectionIndex', dataSelectionIndex);
    },
    set_allDbTables: (context, allDbTables) => {
        context.commit('set_allDbTables', allDbTables);
    },
    set_dbColumn: (context, dbColumn) => {
        context.commit('set_dbColumn', dbColumn);
    },
    set_aliesCounter: (context, aliesCounter) => {
        context.commit('set_aliesCounter', aliesCounter);
    },
    set_currentStep: (context, currentStep) => {
        context.commit('set_currentStep', currentStep);
    },
    set_archivalStep: (context, archivalStep) => {
        context.commit('set_archivalStep', archivalStep);
    },
    set_processArray: (context, processArray) => {
        context.commit('set_processArray', processArray);
    },
    set_process_definition_id: (context, process_definition_id) => {
        context.commit('set_process_definition_id', process_definition_id);
    },
    set_process_definition_name: (context, process_definition_name) => {
        context.commit('set_process_definition_name', process_definition_name);
    },
    set_openArchivePanel: (context, openArchivePanel) => {
        context.commit('set_openArchivePanel', openArchivePanel);
    },
    set_openMergePanel: (context, openMergePanel) => {
        context.commit('set_openMergePanel', openMergePanel);
    },
    set_dbStepObject: (context, dbStepObject) => {
        context.commit('set_dbStepObject', dbStepObject);
    },
    set_archiveStepObject: (context, archiveStepObject) => {
        context.commit('set_archiveStepObject', archiveStepObject);
    },
    set_storedProcedureStep: (context, storedProcedureStep) => {
        context.commit('set_storedProcedureStep', storedProcedureStep);
    },
    set_mergeStep: (context, mergeStep) => {
        context.commit('set_mergeStep', mergeStep);
    },
    set_schema: (context, schema) => {
        context.commit('set_schema', schema);
    },
    set_openStoredProcedure: (context, openStoredProcedure) => {
        context.commit('set_openStoredProcedure', openStoredProcedure);
    },
    // set_schema: (context, schema) => {
    //     context.commit('set_schema', schema);
    // },
    set_conn_str: (context, conn_str) => {
        context.commit('set_conn_str', conn_str);
    },
    set_database_type: (context, database_type) => {
        context.commit('set_database_type', database_type);
    },
    set_database_name: (context, database_name) => {
        context.commit('set_database_name', database_name);
    },
}
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})