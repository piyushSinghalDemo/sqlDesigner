<template lang="html">
  <!-- <v-container> -->
    <v-layout row>
      <v-flex style="padding:0px;">
        <!-- <v-menu ref="menu" lazy :close-on-content-click="false" v-if="props.item.Type == 'date'" v-model="obj.menu" transition="scale-transition"
          offset-y full-width :nudge-right="40" min-width="290px" :return-value.sync="obj.date">
          <v-text-field slot="activator" label="Picker in menu" v-model="obj.date" prepend-icon="event" readonly></v-text-field>
          <v-date-picker v-model="obj.date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="$refs.menu.save(obj.date)">OK</v-btn>
          </v-date-picker>
        </v-menu> -->
         <v-menu ref="menu2" :close-on-content-click="false" v-model="menu2" :nudge-right="40" 
           :return-value.sync="calenderDate" lazy transition="scale-transition" offset-y full-width  min-width="290px">
        <v-text-field slot="activator" v-model="calenderDate" single-line label="Date" readonly ></v-text-field>
        <v-date-picker v-model="calenderDate" @input="emitChange"></v-date-picker>
      </v-menu>
      </v-flex>
    </v-layout>
  <!-- </v-container> -->
</template>

<script>
export default {

  data() {
    return {
        menu2: false,
        // date: null,
        calenderDate:this.input,
    }
  },
  props: ['input'],
  watch:{
    input(newValue) {  
            this.calenderDate = newValue;
    },
  },
//   computed: {
//       calenderDate: function(){
//       return this.input;
//     },
//   },
  methods: {
    emitChange: function () {
        // alert("Working"+ this.calenderDate);
      this.$refs.menu2.save(this.calenderDate);
      this.$emit('update', this.calenderDate)
    }
  }
}
</script>
<style>

</style>
