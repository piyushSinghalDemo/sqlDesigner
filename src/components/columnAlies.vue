<template>
 <v-layout align-center justify-center>
        <v-flex>
          <v-card>
            <v-form v-model="valid" ref="form" lazy-validation>
              <v-toolbar dark color="primary">
                <v-toolbar-title>Column Alies Name</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon large v-on:click="$emit('close')">
                  <v-icon large>close</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <v-text-field v-if="column.group" name="Table Name" disabled v-model="column.group" label="Table Name" 
                ></v-text-field>
                <v-text-field name="Column Name" disabled v-model="column.name" label="Column Name" 
                ></v-text-field>
                <v-text-field name="Alies Name" v-model="column.colAlies" label="Alies Name" 
                ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" :disabled="!valid" @click="saveProcess">Save</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
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

