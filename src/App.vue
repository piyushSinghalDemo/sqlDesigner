
<style >
@import "/static/bootstrap/css/bootstrap.css";
@import "/node_modules/vue2-animate/dist/vue2-animate.min.css";
/* @import 'vuetify/dist/vuetify.min.css'; */
@import "/node_modules/vuetify@0.16.9/dist/vuetify.min.css";
/*helpers*/
@import "/static/helpers/animate.css";
@import "/static/helpers/backgrounds.css";
@import "/static/helpers/boilerplate.css";
@import "/static/helpers/border-radius.css";
@import "/static/helpers/grid.css";
@import "/static/helpers/page-transitions.css";
@import "/static/helpers/spacing.css";
@import "/static/helpers/typography.css";
@import "/static/helpers/utils.css";
@import "/static/helpers/colors.css";

/*<!-- ELEMENTS -->*/

@import "/static/assets/elements/badges.css";
@import "/static//elements/buttons.css";
@import "/static/elements/content-box.css";
@import "/static/elements/dashboard-box.css";
@import "/static/elements/forms.css";
@import "/static/elements/images.css";
@import "/static/elements/info-box.css";
@import "/static/elements/invoice.css";
@import "/static/elements/loading-indicators.css";
@import "/static/elements/menus.css";
@import "/static/elements/panel-box.css";
@import "/static/elements/response-messages.css";
@import "/static/elements/responsive-tables.css";
@import "/static/elements/ribbon.css";
@import "/static/elements/social-box.css";
@import "/static/elements/tables.css";
@import "/static/elements/tile-box.css";
@import "/static/elements/timeline.css";



/*<!-- ICONS -->*/

@import "../static/icons/fontawesome/fontawesome.css";
@import "../static/icons/new_fontawesome/css/font-awesome.css";
@import "/static/icons/linecons/linecons.css";
@import "/static/icons/spinnericon/spinnericon.css";


/*<!-- WIDGETS -->*/

@import "/static/widgets/accordion-ui/accordion.css";
@import "/static/widgets/calendar/calendar.css";
@import "/static/widgets/carousel/carousel.css";

@import "/static/widgets/charts/justgage/justgage.css";
@import "/static/widgets/charts/morris/morris.css";
@import "/static/widgets/charts/piegage/piegage.css";
@import "/static/widgets/charts/xcharts/xcharts.css";

@import "/static/widgets/chosen/chosen.css";
@import "/static/widgets/colorpicker/colorpicker.css";
@import "/static/widgets/datatable/datatable.css";
@import "/static/widgets/datepicker/datepicker.css";
@import "/static/widgets/datepicker-ui/datepicker.css";
@import "/static/widgets/daterangepicker/daterangepicker.css";
@import "/static/widgets/dialog/dialog.css";
@import "/static/widgets/dropdown/dropdown.css";
@import "/static/widgets/dropzone/dropzone.css";
@import "/static/widgets/file-input/fileinput.css";
@import "/static/widgets/input-switch/inputswitch.css";
@import "/static/widgets/input-switch/inputswitch-alt.css";
@import "/static/widgets/ionrangeslider/ionrangeslider.css";
@import "/static/widgets/jcrop/jcrop.css";
@import "/static/widgets/jgrowl-notifications/jgrowl.css";
@import "/static/widgets/loading-bar/loadingbar.css";
@import "/static/widgets/maps/vector-maps/vectormaps.css";
@import "/static/widgets/markdown/markdown.css";
@import "/static/widgets/modal/modal.css";
@import "/static/widgets/multi-select/multiselect.css";
@import "/static/widgets/multi-upload/fileupload.css";
@import "/static/widgets/nestable/nestable.css";
@import "/static/widgets/noty-notifications/noty.css";
@import "/static/widgets/popover/popover.css";
@import "/static/widgets/pretty-photo/prettyphoto.css";
@import "/static/widgets/progressbar/progressbar.css";
@import "/static/widgets/range-slider/rangeslider.css";
@import "/static/widgets/slidebars/slidebars.css";
@import "/static/widgets/slider-ui/slider.css";
@import "/static/widgets/summernote-wysiwyg/summernote-wysiwyg.css";
@import "/static/widgets/tabs-ui/tabs.css";
@import "/static/widgets/theme-switcher/themeswitcher.css";
@import "/static/widgets/timepicker/timepicker.css";
@import "/static/widgets/tocify/tocify.css";
@import "/static/widgets/tooltip/tooltip.css";
@import "/static/widgets/touchspin/touchspin.css";
@import "/static/widgets/uniform/uniform.css";
@import "/static/widgets/wizard/wizard.css";
@import "/static/widgets/xeditable/xeditable.css";

/*<!-- SNIPPETS -->*/

@import "/static/snippets/chat.css";
@import "/static/snippets/files-box.css";
@import "/static/snippets/login-box.css";
@import "/static/snippets/notification-box.css";
@import "/static/snippets/progress-box.css";
@import "/static/snippets/todo.css";
@import "/static/snippets/user-profile.css";
@import "/static/snippets/mobile-navigation.css";

/*<!-- APPLICATIONS -->*/

@import "/static/applications/mailbox.css";

/*<!-- Admin theme -->*/

@import "/static/themes/admin/layout.css";
@import "/static/themes/admin/color-schemes/default.css";

/*<!-- Components theme -->*/

@import "/static/themes/components/default.css";
@import "/static/themes/components/border-radius.css";

/*<!-- Admin responsive -->*/

@import "/static/helpers/responsive-elements.css";
@import "/static/helpers/admin-responsive.css";

.modal-backdrop{
  position: fixed !important;
  opacity: 0 !important;
  z-index: -100
}
</style>
<template>
  <div id="app">

<!-- <div id="loading">
    <div class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    </div>
</div> -->

<div id="page-wrapper">
    <div id="page-header" class="bg-gradient-9">
<div id="mobile-navigation">
    <button id="nav-toggle" class="collapsed" data-toggle="collapse" data-target="#page-sidebar"><span></span></button>
    <a href="index.html" class="logo-content-small" title="MonarchUI"></a>
</div>
<div id="header-logo" class="logo-bg">
    <a href="index.html" class="logo-content-big" title="MonarchUI">
        Monarch <i>UI</i>
        <span>The perfect solution for user interfaces</span>
    </a>
    <a href="index.html" class="logo-content-small" title="MonarchUI">
        Monarch <i>UI</i>
        <span>The perfect solution for user interfaces</span>
    </a>
    <a id="close-sidebar" href="#" title="Close sidebar">
        <i class="glyph-icon icon-angle-left"></i>
    </a>
</div>
<div id="header-nav-left">
    <div class="user-account-btn dropdown">
        <a href="#" title="My Account" class="user-profile clearfix" data-toggle="dropdown">
            <img width="28" src="/static/image-resources/gravatar.jpg" alt="Profile image">
            <span>Thomas Barnes</span>
            <i class="glyph-icon icon-angle-down"></i>
        </a>
        <div class="dropdown-menu float-left">
            <div class="box-sm">
                <div class="login-box clearfix">
                    <div class="user-img">
                        <a href="#" title="" class="change-img">Change photo</a>
                        <img src="/static/image-resources/gravatar.jpg" alt="">
                    </div>
                    <div class="user-info">
                        <span>
                            Thomas Barnes
                            <i>UX/UI developer</i>
                        </span>
                        <a href="#" title="Edit profile">Edit profile</a>
                        <a href="#" title="View notifications">View notifications</a>
                    </div>
                </div>
                <div class="divider"></div>

                <div class="pad5A button-pane button-pane-alt text-center">
                    <a href="#" class="btn display-block font-normal btn-danger">
                        <i class="glyph-icon icon-power-off"></i>
                        Logout
                    </a>
                </div>
            </div>
        </div>
    </div>
</div><!-- #header-nav-left -->



</div>
<!-- <div id="page-sidebar">
<div class="scroll-sidebar">
 <navigation></navigation>

</div>
</div>
<div id="page-content-wrapper">
    <div id="page-content">
        <div class="container">

            router-view></router-view
        </div>
    </div>
</div> -->
<router-view></router-view>
</div>




  </div>
</template>

<script>
import Navigation from './components/Navigation'

export default {
  name: 'app',
  // components:{
  //   Navigation
  // }
}



</script>
