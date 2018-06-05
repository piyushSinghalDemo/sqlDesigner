<template lang="html">
<v-container>
    <v-layout row>
        <v-flex>
            <h3 @keypress.enter.prevent="emitChange" contenteditable="true" class="docs-title-input" @blur="emitChange"> {{ content }}</h3>
        </v-flex>
    </v-layout>
</v-container>
</template>
<script>
export default {

  data() {
    return {

    }
  },
  props: ['content'],
  methods: {
    // submit:function(event){
    //     this.$emit('update', event.target.textContent);
    // },  
    emitChange: function (event) {
      this.$emit('update', event.target.textContent)
    }
  }
}

</script>
<style>
.docs-title-input:hover {
    border-color: #e5e5e5;
}
.docs-title-input:focus {
    -webkit-appearance: none;
    -moz-appearance: none;
    border: 1px solid #4d90fe!important;
    -webkit-box-shadow: inset 0px 1px 2px rgba(0,0,0,0.1);
    -moz-box-shadow: inset 0px 1px 2px rgba(0,0,0,0.1);
    box-shadow: inset 0px 1px 2px rgba(0,0,0,0.1);
    color: #000;
    outline: none;
}
.docs-title-input{
    text-align: center;
    margin: 5px 0px;
}
</style>
