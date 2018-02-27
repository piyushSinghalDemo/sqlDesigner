<template lang="html">
        <div class="" >
            <v-layout row justify-center>
                    <!-- <v-btn color="primary" dark @click.stop="dialog = true">Open Dialog 1</v-btn> -->
                    <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition"
                     :overlay="false" scrollable >
                      <v-card tile style="height:650px">
                      <!-- <v-toolbar card dark color="primary">
                      <v-btn icon @click.native="dialog = false" dark>
                      <v-icon>close</v-icon>
                      </v-btn>
                      <v-toolbar-title>Settings</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-toolbar-items>
                      <v-btn dark flat @click.native="dialog = false">Save</v-btn>
                    </v-toolbar-items>
                  </v-toolbar> -->
                  <!-- ******************************Start ************************************* -->
                  <v-navigation-drawer fixed :clipped="$vuetify.breakpoint.mdAndUp"  app v-model="drawer" >
                   <v-list dense>
                         <div class="draggable" id="sale_order"><h5>Sell Order</h5>
                            <img src="../../static/flowchart/images/tables.png" alt="" height="40" width="40">
                          </div>
                          <div class="draggable" id="work_order"><h5>Work Order</h5>
                            <img src="../../static/flowchart/images/tables.png" alt="" height="40" width="40">
                          </div>
                          <div class="draggable" id="pur_order"><h5>Purchase Order</h5>
                            <img src="../../static/flowchart/images/tables.png" alt="" height="40" width="40">
                          </div>
                    <!-- <v-container grid-list-md text-xs-center>
                        <v-layout row wrap>
                            <v-flex xs12>
                                <img src="../../static/flowchart/images/tables.png" alt="" height="40" width="40">
                                <img src="../../static/flowchart/images/tables.png" alt="" height="40" width="40">
                                <img src="../../static/flowchart/images/tables.png" alt="" height="40" width="40">
                            </v-flex>
                        </v-layout>
                    </v-container>         -->
              <!-- <template v-for="item in items"> -->
          <!-- <v-layout
            row
            v-if="item.heading"
            align-center
            :key="item.heading"
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout> -->
          <!-- <v-list-group
            v-else-if="item.children"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon="" >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i" @click="" >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group> -->
          
        <!-- </template> -->
      </v-list>
    </v-navigation-drawer>
     <v-toolbar card dark color="primary" app :clipped-left="$vuetify.breakpoint.mdAndUp" fixed>
    <!--                  <v-btn icon @click.native="dialog = false" dark>
                      <v-icon>close</v-icon>
                      </v-btn>
                      <v-toolbar-title>Settings</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-toolbar-items>
                      <v-btn dark flat @click.native="dialog = false">Save</v-btn>
                    </v-toolbar-items>
                  </v-toolbar> -->
     <!-- <v-toolbar color="blue darken-3" dark app :clipped-left="$vuetify.breakpoint.mdAndUp" fixed > -->
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
         <v-btn icon @click.native="closeDialog" dark>
          <v-icon>close</v-icon>
        </v-btn>
        
        <!-- <span class="hidden-sm-and-down">Close</span> -->
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn dark flat @click.native="saveDialog">Save</v-btn>
      </v-toolbar-items>
    </v-toolbar>
       <v-content>
          <v-container fluid fill-height>
             <v-layout justify-center align-center>
            <!--  <v-tooltip right>
                <v-btn
                  icon
                  large
                  :href="source"
                  target="_blank"
                  slot="activator">
                  <v-icon large>code</v-icon>
                </v-btn>
                <span>Source</span>
              </v-tooltip> -->
              <h1>Show Me</h1>
            </v-layout>
          </v-container>
        </v-content> 
                  <!-- ****************************** END ************************************* -->
                  <!-- <v-card-text> </v-card-text> -->

          <div style="flex: 1 1 auto;"/>
        </v-card>
      </v-dialog>
    </v-layout>
</div>
</template>
<script>
export default {
    data () {
		return {
    //   dialog: false,
      drawer: null
        }
    },
    computed:{
        dialog(){
            return this.$store.state.dialog
        }
    },
    props: {
      source: String
    },
    methods: {
        closeDialog(){
            this.$store.state.dialog = false
        },
        saveDialog(){
            this.$store.state.dialog = false
        }
    }
}
</script>