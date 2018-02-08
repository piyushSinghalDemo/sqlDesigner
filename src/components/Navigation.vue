<template >
    <div class="">
      <ul id="sidebar-menu">
      <!-- <li class="header"><span>Overview</span></li>
      <li>
          <a href="index.html" title="Admin Dashboard">
              <i class="glyph-icon icon-linecons-tv"></i>
              <span>Admin dashboard</span>
          </a>
      </li>
      <li class="divider"></li>
      <li class="no-menu">
          <a href="../frontend-template/index.html" title="Frontend template">
              <i class="glyph-icon icon-linecons-beaker"></i>
              <span>Frontend template</span>
              <span class="bs-label label-danger">
                  NEW
              </span>
          </a>
      </li> -->
      <li class="header"><span>Components</span></li>
      <li>
        <!-- <router-link to="/collections" ><i class="glyph-icon icon-linecons-diamond"></i><span>Collections</span></router-link> -->

      </li>
      <li>
        <router-link to="/schedulers" ><i class="glyph-icon icon-linecons-diamond"></i><span>Schedulers</span></router-link>
      </li>
      <li>
        <router-link to="/schedulerlog" ><i class="glyph-icon icon-linecons-diamond"></i><span>Scheduler Log</span></router-link>
      </li>
      <li>
        <router-link to="/intervals" ><i class="glyph-icon icon-linecons-diamond"></i><span>Intervals</span></router-link>
      </li>
      <li>
        <router-link to="/calendar" ><i class="glyph-icon icon-linecons-calendar"></i><span>Calendar</span></router-link>
      </li>
      <li>
        <a href="/sqldesigner"><i class="glyph-icon icon-linecons-calendar"></i><span>SqlDesigner</span></a>
        <!-- <router-link to="/sqldesigner" ><i class="glyph-icon icon-linecons-calendar"></i><span>SqlDesigner</span></router-link> -->
      </li>

      <li>
          <!-- <a href="#" title="Helpers">
              <i class="glyph-icon icon-linecons-doc"></i>
              <span>Helpers</span>
          </a> -->
          <div class="sidebar-submenu">

              <ul>
                  <li><a href="helper-classes.html" title="Helper classes"><span>Helper classes</span></a></li>
                  <li><a href="page-transitions.html" title="Page transitions"><span>Page transitions</span></a></li>
                  <li><a href="animations.html" title="Animations"><span>Animations</span></a></li>
              </ul>

          </div><!-- .sidebar-submenu -->
      </li>
      </ul><!-- #sidebar-menu -->

    </div>
</template>



<script>
export default {
  name: 'navigation',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
