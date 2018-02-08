<template >
  <div id="page-title">
      <h2>Schedulers</h2>

      <!-- <p>The most complete user interface framework that can be used to create stunning admin dashboards and presentation websites.</p> -->
      <div class="panel">
              <div class="panel-body">

                  <div >
                    <router-link to="/scheduler/create" class="btn btn-success">Add Schedule</router-link>
                    <!-- <a to="/collection/create"  class="btn btn-success">Add</a> -->

                  </div>
                  <div class="example-box-wrapper">
                      <table class="table table-striped">
                          <thead>
                          <tr >
                              <th>#</th>
                              <th>Name</th>
                              <th>Type</th>
                              <th>Start Date</th>
                              <th>End Date</th>
                              <th>Timezone</th>
                              <th>Status</th>
                              <th>Action</th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr v-for="collection in collections">
                              <td>#</td>
                              <td>{{collection.name | concat}}</td>
                              <td>{{collection.type}} </td>
                              <td>{{collection.start_point}} </td>
                              <td>{{collection.expires}} </td>
                              <td>{{collection.timezone}} </td>
                              <td>
                                <span v-if="collection.enabled == 1">Active</span>
                                <span v-else>Inactive</span>
                              </td>
                              <td><router-link :to="{ name: 'edit-scheduler', params: { schedulerId: collection.id }}">Edit</router-link> |
                                 <a href="javascript:;" v-on:click="showConfirmAlert(collection.id)">Delete</a></td>
                          </tr>

                          </tbody>
                      </table>
                      <simplert useRadius=true
                        useIcon=true
                        ref="simplert">
                      </simplert>
                  </div>
              </div>
          </div>
  </div>

</template>

<script>
import Vue from 'vue'
Vue.filter('concat', function (value, input) {

  return value.split('_').splice(-1, 1).join('_')
})
import Simplert from 'vue2-simplert'
export default{
  components: {
    Simplert
  },
  data () {
    return {
      collections: []
    }
  },
  mounted () {
    this.getScheduler ()
  },
  methods: {
    showConfirmAlert(id) {
        let confirmFn = function() {
          this.$parent.deleteCollection(id)
        }
        let obj = {
            title: 'Delete',
            message: 'Are you sure want to delete this?',
            type: 'info',
            useConfirmBtn: true,
            onConfirm: confirmFn
        }
        this.$refs.simplert.openSimplert(obj)
    },
    deleteCollection (id) {
      this.$http.delete(this.host+"/v1/schedulers?scheduler_id=" + id).then(response => {
        this.getScheduler()
      })
    },
    getScheduler () {
      this.$http.get(this.host+'/v1/schedulers').then(response => {
        this.collections = response.body.data
      })
    }
  }

}
</script>

<style lang="css">
</style>
