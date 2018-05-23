<template>
  <v-card>
    <v-card-title style="color:blue;font-size:16px;">
            Provide New  Process Name
    </v-card-title>
    <v-card-text>
      <v-form v-model="valid" ref="form" lazy-validation autocomplete="off">
        <v-container grid-list-md>
          <v-layout row wrap>
            <v-flex>
              <v-text-field name="Process Name" v-model="processName" label="Process Name" 
                id="testing" required :rules="processNameRules"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-btn color="success" :disabled="!valid" @click="saveProcess">Save</v-btn>
            <v-btn v-on:click="$emit('close')">close</v-btn>
          </v-layout>
        </v-container>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';
export default {
     data() {
    return {
        processName:'',
        processNameRules: [
        v => !!v || 'Name is required'
      ],
      valid:true
    }},
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

