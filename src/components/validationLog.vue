<template>
  <v-card>
      <v-card-title style="color:black;font-size:16px;text-align:center">
             <b>Validation Error</b>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-layout row wrap>
            <v-flex>
              <!-- dummy
              {{logs}}******************************{{logs[0].name}} -->
                <p v-for="(log, index) in logs" :key="index">
                    <b style="display:block">{{log.name}}</b>
                    <span style="display:block">{{log.error_list}}</span>
                </p> 
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card> 
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';
export default {
     data() {
    return {
      valid:true
    }},
    props:['logs'],
     methods: {
         saveProcess(){
            if (this.$refs.form.validate()) {
              let _this = this;
              this.$emit('save-name', _this.processName);
            }  
         }
     }
}
</script>

