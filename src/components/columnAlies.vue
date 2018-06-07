<template>
  <v-card>
    <v-card-title style="color:blue;font-size:16px;">
            Column Alies Name
    </v-card-title>
    <v-card-text>
      <v-form v-model="valid" ref="form" lazy-validation autocomplete="off">
        <v-container grid-list-md>
          <v-layout row wrap>
            <v-flex>
              <v-text-field name="Column Name" disabled v-model="column.name" label="Column Name" 
                ></v-text-field>
            </v-flex>
          </v-layout>
           <v-layout row wrap>
            <v-flex>
              <v-text-field name="Alies Name" v-model="column.colAlies" label="Alies Name" 
                ></v-text-field>
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
    props:['column'],
     data() {
    return {
        processName:'',
        aliesName:'',
        processNameRules: [
        v => !!v || 'Name is required'
      ],
      valid:true
    }},
     methods: {
         saveProcess(){
             this.$emit('save-alies', this.column);  
         }
     }
}
</script>

