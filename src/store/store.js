import Vue from 'vue';
import Vuex from 'vuex';

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
    }
}
const mutations = {
    // mutateUpdateSchedulerId: function(state, id) {
    //     state.schedulerId = id
    // },
    setCurrentStep: (state, stepId) => {
        state.currentStep = stepId;
    }
}
const actions = {
    setCurrentStep: (context, stepId) => {
        context.commit('setCurrentStep', stepId);
    }
}
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})