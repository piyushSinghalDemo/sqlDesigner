<template>
  <v-card>
      <v-card-title style="color:black;font-size:16px;text-align:center">
             <b>Process Logs</b>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-layout row wrap>
            <v-flex>
                <p style="min-height:70px;">
                    <span>Jatan Sansthan is a grassroots Indian non-governmental organisation (NGO) based in the state of Rajasthan. The name is derived from local languages and translates to "Offering Organisation/NGO." Founded in 2001 by Dr. Kailash Brijwasi, the NGO was formed to provide needed services to young people in the rural areas. As the organisation has evolved, Jatan has expanded its services and trainings. They now work in the sectors of maternal health, sexual and reproductive health, migrant supportive services, women's empowerment and livelihood, childhood education, and local government empowerment. The administrative office is based in Udaipur, but Jatan has three field offices located in both the Rajsamand and Bhilwara districts.

Partnerships with other NGOs have been a core precept of Jatan, both local and global. Notable partnerships have been with Aajeevika Bureau,[1] Vikalp Designs,[2] Chetna,[3] Women's Health and Rights Advocacy Partnership,[4] WomenPowerConnect,[5] Rajasthan State AIDS Control Society,[6] Prayas and Pathfinder International. Jatan has hosted many interns from US-based Foundation for Sustainable Development and Minnesota Studies in International Development.</span>
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

