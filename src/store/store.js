import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const state = {
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
    dbStepObject: {
        'id': 1,
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

        'where': []
    }
}
const mutations = {
    mutateUpdateSchedulerId: function(state, id) {
        state.schedulerId = id
    }
}
export default new Vuex.Store({
    state
})