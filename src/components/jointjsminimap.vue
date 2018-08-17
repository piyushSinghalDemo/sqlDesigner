<template>
    <div id="diagram">
       	<div id="stencil"></div>
       	<div id="container">
			<div id="paper" style="left:10px;" @contextmenu.prevent="$refs.ctxMenu.open" ref="elpaper"></div>
		</div>
		<context-menu id="context-menu" ref="ctxMenu">
			<li style="font-weight:bold" @mouseover="CutMouseOver()" @mouseout="CutMouseOut()" v-bind:class="{disabled : !is_selected}" @click="ContextMenuClick('cut')" ref="elcut">Cut</li>
  			<li style="font-weight:bold" @mouseover="CopyMouseOver()" @mouseout="CopyMouseOut()" v-bind:class="{disabled : !is_selected}" @click="ContextMenuClick('copy')" ref="elcopy">Copy</li>
  			<li style="font-weight:bold" @mouseover="PasteMouseOver()" @mouseout="PasteMouseOut()" @click="ContextMenuClick('paste')" v-bind:class="{disabled : !is_cut_or_copied}" ref="elpaste">Paste</li>
  			<li style="font-weight:bold" @mouseover="DeleteMouseOver()" @mouseout="DeleteMouseOut()" v-bind:class="{disabled : !is_selected}" @click="ContextMenuClick('delete')" ref="eldelete">Delete</li>
		</context-menu>
    <div class="paper" id="paper-multiple-papers-small" style="position: absolute; top: 70px; left: 625px;background:#E5E8E8;"></div>
    </div>
        

</template>

<script>
	import contextMenu from 'vue-context-menu'
	import graphlib from 'graphlib'
	import svgPanZoom from "svg-pan-zoom/src/svg-pan-zoom.js"
    export default {
    	  	components: { contextMenu },
			data() {
				return{
					// graph:"",
					cut_copy_ele:'',
					is_cut_or_copied:false,
					is_selected:false,
					selected_el:'',
					graph: new joint.dia.Graph
				}
			},
      		mounted() {        	
        	// Canvas where sape are dropped
        		let _this = this
        		var paper_heigth = 1600
        		var paper_width = 1600
        		var currentScale = 1
        		var gridSize = 5
				var graph =_this.graph
			  	var paper = new joint.dia.Paper({
			    	el: $('#paper'),
			    	model: graph,
			    	gridSize: gridSize,
  					drawGrid:true,
  					height:paper_heigth,
  					width:paper_width,
  					x:10,
					defaultLink: new joint.dia.Link({router: { name: 'manhattan' },
                  	connector: { name: 'rounded' },
                  		attrs: {
                      	'.connection': {
                          	stroke: '#333333',
                          	'stroke-width': 3
                      		},
                      		'.marker-target': {
                          		fill: '#333333',
                          		d: 'M 10 0 L 0 5 L 10 10 z'
                      		}	
                  		}
					}),
					circle:{ opacity: "1",r: "2"},
					 validateConnection: function(cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
								// Prevent linking from input ports.
								if (magnetS && (magnetS.getAttribute('port-group') === 'in' || magnetS.getAttribute('port-group') === 'top')) return false;
								// Prevent linking from output ports to input ports within one element.
								if (cellViewS === cellViewT) return false;
								// Prevent linking to input ports.
								return magnetT && (magnetT.getAttribute('port-group') === 'in' || (magnetT.getAttribute('port-group') === 'top'));
						},
						validateMagnet: function(cellView, magnet) {
								// Note that this is the default behaviour. Just showing it here for reference.
								// Disable linking interaction for magnets marked as passive (see below `.inPorts circle`).
								return magnet.getAttribute('magnet') !== 'passive';
						},
						// Enable marking available cells & magnets
						markAvailable: true,
						
						 // Enable link snapping within 75px lookup radius
    				snapLinks: { radius: 75 }
			  	});
			var paperSmall_width = 160
			var paperSmall_heigth = 160
			var paperSmall = new joint.dia.Paper({
	        el: $('#paper-multiple-papers-small'),
	        model: graph,
	        width: paperSmall_width,
	        height: paperSmall_heigth,
	        gridSize: 1,
	        interactive: false,
	        defaultLink: new joint.dia.Link({router: { name: 'manhattan' },
                  	connector: { name: 'rounded' },
                  		attrs: {
                      	'.connection': {
                          	stroke: '#333333',
                          	'stroke-width': 3
                      		},
                      		'.marker-target': {
                          		fill: '#333333',
                          		d: 'M 10 0 L 0 5 L 10 10 z'
                      		}	
                  		}
					})
	    });
		var paperSmall_scale = paperSmall_width / paper_width
	    paperSmall.scale(paperSmall_scale); 
	    	let panAndZoom = "";
		    setTimeout(() => {
		      panAndZoom = svgPanZoom(paper.svg,{
		        zoomEnabled: false,
		        zoomScaleSensitivity: 0.4,
		        panEnabled: false,
		        controlIconsEnabled: true,
		        dblClickZoomEnabled: false,
		        fit: false,
		        center: false,
		        scroll:true,
		        onZoom: function (scale) {
		        currentScale = scale;
		        },
		        beforePan: function (oldpan, newpan) {
		        },
		        onPan: function(){
		        }
		      });
		    }, 1500);

			var selected;
			 paper.on("link:connect", function(linkView) {
            if(graphlib.alg.findCycles(graph.toGraphLib()).length > 0) {
                linkView.model.remove();
                // show some error message here
            	}
        	});
			paper.on('cell:mouseover', function(cellView) {
				if(selected){
					selected.unhighlight()
				}
				selected = cellView
				_this.selected_el = cellView
				selected.highlight();
				_this.is_selected = true
			}).on('cell:contextmenu', function(cellView) {
				selected = cellView
				selected.highlight();
				_this.selected_el = cellView
				_this.is_selected = true
			}).on('cell:pointerdblclick', function(cellView) {
				var shapeText = prompt('Enter your table name:', '');
		    	cellView.model.attr('.name/text', shapeText)
			}).on('cell:pointerup blank:pointerup', function (cellView, evt) {
			    // panAndZoom.disablePan();
			    if(cellView.model){
				    var elem = cellView.model
				    var source = elem.get('source')
				    var target = elem.get('target')
				    if (elem instanceof joint.dia.Link && (!source.id || !target.id)) {
				        elem.remove()
				    }
				}
			}).on('cell:pointermove', function (cellView, evt, x, y) {

			    var bbox = cellView.getBBox();
			    var constrained = false;

			    var constrainedX = x;

			    if (bbox.x <= 0) { constrainedX = x + gridSize; constrained = true }
			    if (bbox.x + bbox.width >= paper_width) { constrainedX = x - gridSize; constrained = true }

			    var constrainedY = y;

			    if (bbox.y <= 0) {  constrainedY = y + gridSize; constrained = true }
			    if (bbox.y + bbox.height >= paper_heigth) { constrainedY = y - gridSize; constrained = true }

			    //if you fire the event all the time you get a stack overflow
			    if (constrained) { cellView.pointermove(evt, constrainedX, constrainedY) }
			});

			// paper.on('blank:pointerdown', function (evt, x, y) {
		 //      // panAndZoom.enablePan();
		 //      console.log(paper.options.width)
		 //      //console.log(x + ' ' + y);
		 //    });

		    paperSmall.on('blank:pointerclick',function(event,x,y){
		    	debugger;
		    	document.getElementById('container').scrollLeft = (x -400)
		    	document.getElementById('container').scrollTop = (y-250)
		    }).on('cell:pointerclick',function(cellview,event,x,y){
		    	debugger;
		    	document.getElementById('container').scrollLeft = (cellview.model.attributes.position.x -400)
		    	document.getElementById('container').scrollTop = (cellview.model.attributes.position.y - 250)
		    });

			$('#paper')
			    .attr('tabindex', 0)
			    .on('mouseover', function() {
			        this.focus();
			    })
			    .on('keydown', function(e) {
			    	// if(_this.is_selected){
			    	// 	// if(e.which === 46){
			    	// 	// 	alert('delete key pressed')
			    	// 	// }

			    	// }
			    	var key = e.which || e.keyCode;
			    	var ctrl = e.ctrlKey ? e.ctrlKey : ((key === 17) ? true : false);
			    	if(key === 46 && _this.is_selected){
			    		_this.ContextMenuClick('delete')
			    	}
			    	else if ( key == 88 && ctrl && _this.is_selected ) {
				        _this.ContextMenuClick('cut')
				    } else if ( key == 67 && ctrl && _this.is_selected) {
				        _this.ContextMenuClick('copy')
				    } else if ( key == 86 && ctrl && _this.is_cut_or_copied) {
				        _this.ContextMenuClick('paste')
				    }
			    });
			paper.on('blank:mouseover', function(cellView) {
				if(selected){
					selected.unhighlight()
				}
				_this.is_selected = false
			}).on('blank:contextmenu', function(cellView) {
				if(selected){
					selected.unhighlight()
				}
				_this.is_selected = false
			});

			graph.on('change:position', function(cell) {
				var listOfElements = graph.getElements()
				var listOfLinks = graph.getLinks()
			    if (_.contains(listOfElements, cell)) {
			        _.each(listOfLinks, function(link) {
			                paper.findViewByModel(link).update();
			                paperSmall.findViewByModel(link).update();
			        });
			    }
			}).on('add', function(cell) {
				var listOfElements = graph.getElements()
				var listOfLinks = graph.getLinks()
			    if (_.contains(listOfElements, cell)) {
			        _.each(listOfLinks, function(link) {
			                paper.findViewByModel(link).update();
			                paperSmall.findViewByModel(link).update();
			        });
			    }
			});
  	
			// function overlap(rect1, rect2) {
			//     return !(rect1.right < rect2.left || 
			//              rect1.left > rect2.right || 
			//              rect1.bottom < rect2.top || 
			//              rect1.top > rect2.bottom);
			// }

			// graph.on('change:position', function(cell) {
			// 	var listOfElements = graph.getElements()
			// 	var listOfLinks = graph.getLinks()
			//     if (_.contains(listOfElements, cell)) {
			//         var bbox = paper.findViewByModel(cell);
			//         _.each(listOfLinks, function(link) {
			//             var linkView = paper.findViewByModel(link);
			//             if (overlap(linkView.getBBox(), bbox.getBBox())) {
			//                 linkView.update();
			//             }
			//         });
			//     }
			// });

			
			// Canvas from which you take shapes
			  var stencilGraph = new joint.dia.Graph,
			  stencilPaper = new joint.dia.Paper({
			    el: $('#stencil'),
			    height: 70,
			    model: stencilGraph,
			    interactive: false
			  });

  		var selectioncell = this.getCell(10,10,150,60,'selection','',"db_icon.png",'#30d0c6','#f1f1f1')

  		var mergecell = this.getCell(180,10,150,60,'merge','',"merge.png",'#30d0c6','#f1f1f1')

  		var minuscell = this.getCell(350,10,150,60,'minus','',"minus.png",'#30d0c6','#f1f1f1')

  		var archivalcell = this.getCell(520,10,150,60,'archival','',"archive.png",'#30d0c6','#f1f1f1')
 //  		

		stencilGraph.addCells([selectioncell,minuscell, mergecell ,archivalcell]);
		

			stencilPaper.on('cell:pointerdown', function(cellView, e, x, y) {
			  $('body').append('<div id="flyPaper" style="position:fixed;z-index:100;opacity:.7;pointer-event:none;"></div>');
		  var flyGraph = new joint.dia.Graph,
		    flyPaper = new joint.dia.Paper({
		      el: $('#flyPaper'),
		      model: flyGraph,
		      interactive: false
		    }),
		    flyShape = cellView.model.clone(),
		    pos = cellView.model.position(),
		    offset = {
		      x: x - pos.x,
		      y: y - pos.y
		    };

		  flyShape.position(0, 0);
		  flyGraph.addCell(flyShape);
		  $("#flyPaper").offset({
		    left: e.pageX - offset.x,
		    top: e.pageY - offset.y
		  });
		  $('body').on('mousemove.fly', function(e) {
		    $("#flyPaper").offset({
		      left: e.pageX - offset.x,
		      top: e.pageY - offset.y
		    });
		  });
		  $('body').on('mouseup.fly', function(e) {
		    var x = e.pageX,
		      y = e.pageY,
		      target = paper.$el.offset();
		    
		    // Dropped over paper ?
		    if (x > target.left && x < target.left + paper.$el.width() && y > target.top && y < target.top + paper.$el.height()) {
		      var s = flyShape.clone();
		      s.position(x - target.left - offset.x, y - target.top - offset.y);
		      s.addTo(graph);
		    }
		    $('body').off('mousemove.fly').off('mouseup.fly');
		    flyShape.remove();
		    $('#flyPaper').remove();
		  });
		});
	},
	methods: {
		ContextMenuClick(action_type){
			if(action_type==='cut'){
				this.cut_copy_ele = this.selected_el.model.clone()
				this.is_cut_or_copied = true
				this.selected_el.model.remove()
			}
			else if(action_type === 'copy'){
				this.cut_copy_ele = this.selected_el.model.clone()
				this.is_cut_or_copied = true
				if(this.cut_copy_ele.attributes.attrs['.name'].text){
					var copied_text = 'Copy of ' +this.cut_copy_ele.attributes.attrs['.name'].text
					this.cut_copy_ele.attributes.attrs['.name'].text = copied_text
				}
			}
			else if(action_type === 'paste'){
				var copy_el = this.cut_copy_ele
				copy_el.position(10, 10)
				this.graph.addCell(copy_el.clone())	
			}
			else if(action_type === 'delete'){
				this.selected_el.model.remove({disconnectLinks : false})
				this.is_selected = false
			}
			// var copy_el = this.selected_el.model.clone()
			// copy_el.position(10, 10)
			// this.graph.addCell(copy_el)
		},
		CutMouseOver(){
			this.$refs.elcut.style.backgroundColor = "grey";
		},
		CutMouseOut(){
			this.$refs.elcut.style.backgroundColor = "white";
		},
		CopyMouseOver(){
			this.$refs.elcopy.style.backgroundColor = "grey";
		},
		CopyMouseOut(){
			this.$refs.elcopy.style.backgroundColor = "white";
		},
		PasteMouseOver(){
			if(this.is_cut_or_copied)
				this.$refs.elpaste.style.backgroundColor = "grey";
		},
		PasteMouseOut(){
			this.$refs.elpaste.style.backgroundColor = "white";
		},
		DeleteMouseOver(){
			this.$refs.eldelete.style.backgroundColor = "grey";
		},
		DeleteMouseOut(){
			this.$refs.eldelete.style.backgroundColor = "white";
		},

		getCell(x, y,width,height, rank, name, image, background, textColor) {

	    	textColor = textColor || "#000";

	    	var cell = new joint.shapes.org.Member({
	        position: { x: x, y: y },
	        size: {
			    width: width,
			    height: height
			  },
			ports:{
				groups: {
					'in':{
						position:{
							name:'left',
							args:{
							},
						},
					markup:'<circle class="joint-port-body" r="5" fill="#FFFFFF" stroke="#000000" magnet="true"/>'
					},
					'out':{
						position:{
							name:'right',
							args:{}
						},
					markup:'<circle class="joint-port-body" r="5" fill="#FFFFFF" stroke="#000000" magnet="true"/>'
					},
					'top':{
						position:{
							name:'top',
							args:{
							},
						},
					markup:'<circle class="joint-port-body" r="5" fill="#FFFFFF" stroke="#000000" magnet="true"/>'
					},
					'bottom':{
						position:{
							name:'bottom',
							args:{}
						},
					markup:'<circle class="joint-port-body" r="5" fill="#FFFFFF" stroke="#000000" magnet="true"/>'
					}
				},
				items:[
					{
						group:'in',
						args:{}
					},
					{
						group:'out',
						args:{}
					},
					{
						group:'top',
						args:{}
					},
					{
						group:'bottom',
						args:{}
					}
				]
			},
	        attrs: {
	            '.card': { fill: background, stroke: 'none',rx:5},
	              image: { 'xlink:href':'../../static/flowchart/images/'+image, opacity: 0.7 },
	            '.rank': { text: rank, fill: "#000", 'word-spacing': '-5px', 'letter-spacing': 0},
	            '.name': { text: name, fill: textColor, 'font-size': 13, 'font-family': 'Arial', 'letter-spacing': 0}
	        		},
	    		});
	    		return cell;
			},
		}	
  	}
</script>
<style>
/* port styling */
.available-magnet {
    fill: yellow;
}

/* element styling */
.available-cell rect {
    stroke-dasharray: 5, 2;
}

div#container {
  height: 500px;
  width: 800px;
  border:1px solid #000;
  overflow: scroll;
  lef:10px;
 }



</style>
