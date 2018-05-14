<template lang="html">
  <v-container>
    <v-layout row justify-center>
      <v-dialog :value="dialog" fullscreen transition="dialog-bottom-transition" :overlay="false" scrollable>
        <v-card tile style="height:650px">
          <!-- ******************************Start ************************************* -->
          <v-toolbar card dark color="primary" app :clipped-left="$vuetify.breakpoint.mdAndUp" fixed>
            <v-spacer></v-spacer>
            <v-toolbar-title>Close</v-toolbar-title>
            <v-btn icon @click.native="closeDialog" dark>
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-content>
            <v-container grid-list-lg>
              <v-layout>
                <!-- ************************************************************************************************************************** -->
                <v-flex d-flex xs12>
                  <div class="form-views" v-show="progressbar == 1" style="width:100%;margin-left:3%;height:500px">

                    <procedure-list @update-object='updateTableObj' :tableObj="tableObj">                      
                    </procedure-list>

                  </div>
                  <div class="form-views" v-show="progressbar == 2" style="width:100%;margin-left:3%;height:500px">

                    <parameter-list @update-object='updateTableObj' @update-step='saveDialog' :tableObj="tableObj"></parameter-list>

                  </div>
                </v-flex>
                <!-- **************************************************************************** -->
              </v-layout>
            </v-container>
          </v-content>
          <!-- ****************************** END ************************************* -->
          <div style="flex: 1 1 auto;" />
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
import _def from '../various/defnitions'
import cloneDeep from 'lodash/cloneDeep';
import tableData from '../data/table-selection';
// import criteria from './criteria.vue'
import config from '../../config.json'
import procedureList from "./procedureList.vue";
import parameter from './parameter.vue';
import { post as postToServer  } from '../methods/serverCall'
export default {
  components: {
    // 'table-joins': tableJoins,
    'procedure-list':procedureList,
    'parameter-list':parameter
  },
  data() {
    return {
      drawer: null,
      dataStr: _def.dataStr,
      progressbar: 1,
      tableObj: cloneDeep(tableData),
      userData:''
    }
  },
  computed: {
    dialog() {
      return this.$store.state.openStoredProcedure
    },
  },
  watch: {
    dialog(newValue) {
      if (newValue) {
        this.tableObj = this.$store.state.archivalStep[this.$store.state.currentStep];
      }
    },
  },
  props: {
    source: String
  },
  methods: {
    saveDialog(objData) {
        let _this = this;
        _this.tableObj = objData;
        _this.userData = JSON.parse(sessionStorage.getItem("userInfo"));
        let flowchart$ = $("#droppable");
        var operatorData = flowchart$.flowchart('getOperatorData', _this.$store.state.currentStep);
        let $flowchart = $("#droppable");
        var flowchartData = $flowchart.flowchart('getData');
        this.$store.state.openStoredProcedure = false;
    },  
    updateTableObj(arr) {
        let _this = this;
        _this.tableObj = arr[0];
        this.progressbar = arr[1];
    },  
    previousScreen(number) {
      this.progressbar = number;
    },
    nextScreen(number) {
      this.progressbar = number;
    },
    closeDialog() {
      this.$store.state.openStoredProcedure = false
    },
    
  },
  mounted() {
    var _this = this;
  }
}

</script>
<style scoped>
.content {
  height: 626px;
  overflow: auto
}

.btm-20 {
  margin-bottom: 20px;
}

.updt-css {
  font-size: 20px;
  color: red;
  cursor: pointer;
}

.datatable td {
  vertical-align: inherit
}

.next {
  position: absolute;
  top: 537px;
}

.chevron {
  cursor: pointer;
  text-align: center;
  background: #ccc;
  border: 1px solid #fff;
  height: 22px;
  width: 250px;
  display: inline-block;
  margin-left: -65px;
  -webkit-clip-path: polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%);
  clip-path: polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%);
}

.chevron_active {
  background: #666;
}

.ft-30 {
  font-size: 30px;
}

</style>
