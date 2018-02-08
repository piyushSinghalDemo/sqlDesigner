<template >
  <div id="page-title">

      <br>
      <h2>Sql Designer List</h2>
      <br>
      <!-- <p>The most complete user interface framework that can be used to create stunning admin dashboards and presentation websites.</p> -->
      <div class="panel">
              <div class="panel-body">

                  <div >
                    <!-- <router-link to="/scheduler/create" class="btn btn-success">Create Document</router-link> -->
                    <br>
                    <!-- <a to="/collection/create"  class="btn btn-success">Add</a> -->

                  </div>
                  <div class="example-box-wrapper">
                      <table class="table table-striped">
                          <thead>
                          <tr >
                              <th>#</th>
                              <th>Name</th>
                              <th>Status</th>
                              <th>Action</th>
                          </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>ABC</td>
                              <td>Active</td>
                              <td><router-link to="/jsplubmdesigner?id=1" >Edit Doucment</router-link></td>
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
    // this.getScheduler ()
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
