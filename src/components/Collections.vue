<template >
  <div id="page-title">
      <h2>Collections</h2>

      <p>The most complete user interface framework that can be used to create stunning admin dashboards and presentation websites.</p>
      <div class="panel">
              <div class="panel-body">

                  <div >
                    <router-link to="/collection/create" class="btn btn-success">Add Collection</router-link>
                    <!-- <a to="/collection/create"  class="btn btn-success">Add</a> -->
                    
                  </div>
                  <div class="example-box-wrapper">
                      <table class="table table-striped">
                          <thead>
                          <tr >
                              <th>#</th>
                              <th>Name</th>
                              <th>Version</th>
                              <!-- <th>Row 3</th> -->
                              <th>Action</th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr v-for="collection in collections">
                              <td>#</td>
                              <td>{{collection.name}}</td>
                              <td>{{collection.version}} </td>
                              <td><router-link :to="{ name: 'edit-collection', params: { collectionId: collection._id.$oid }}">Edit</router-link> |
                                 <a href="javascript:;" v-on:click="deleteCollection(collection._id.$oid)">Delete</a></td>
                          </tr>

                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
  </div>

</template>

<script>
export default{
  data () {
    return {
      collections: []
    }
  },
  mounted () {
    this.getCollections ()
    // this.$http.get('/api/procd').then(response => {
    //   this.collections = response.body
    //
    // })
  },
  methods: {
    deleteCollection (id) {
      console.log(id);
      this.$http.delete('/api/procd?id='+id).then(response => {
        //this.collections = response.body
        this.getCollections()
      })
    },
    getCollections () {
      this.$http.get('/api/procd').then(response => {
        this.collections = response.body
        console.log(this.collections)
      })
    }
  }
}
</script>

<style lang="css">
</style>
