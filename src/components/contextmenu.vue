<template>
    <div>
       	<div id="stencil"></div>
		<div id="paper"  @contextmenu.prevent="$refs.ctxMenu.open" ref="elpaper"></div>
		<context-menu id="context-menu" ref="ctxMenu">
			<li style="font-weight:bold" @mouseover="CutMouseOver()" @mouseout="CutMouseOut()" v-bind:class="{disabled : !is_selected}" @click="ContextMenuClick('cut')" ref="elcut">Cut</li>
  			<li style="font-weight:bold" @mouseover="CopyMouseOver()" @mouseout="CopyMouseOut()" v-bind:class="{disabled : !is_selected}" @click="ContextMenuClick('copy')" ref="elcopy">Copy</li>
  			<li style="font-weight:bold" @mouseover="PasteMouseOver()" @mouseout="PasteMouseOut()" @click="ContextMenuClick('paste')" v-bind:class="{disabled : !is_cut_or_copied}" ref="elpaste">Paste</li>
  			<li style="font-weight:bold" @mouseover="DeleteMouseOver()" @mouseout="DeleteMouseOut()" v-bind:class="{disabled : !is_selected}" @click="ContextMenuClick('delete')" ref="eldelete">Delete</li>
		</context-menu>
    </div>
</template>

<script>
	import contextMenu from 'vue-context-menu'
	import graphlib from 'graphlib'
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
				var graph =_this.graph
			  	var paper = new joint.dia.Paper({
			    	el: $('#paper'),
			    	model: graph,
			    	gridSize: 5,
  					drawGrid:true,
  					height:400,
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
		  // _this.graph(cellView.clone())
		  // alert(cellView.model.id)
		  // console.log("data"+JSON.stringify(_this.graph))
			}).on('cell:pointerup', function (cellView, evt) {
			    var elem = cellView.model
			    var source = elem.get('source')
			    var target = elem.get('target')
			    if (elem instanceof joint.dia.Link && (!source.id || !target.id)) {
			        elem.remove()
			    }
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
			        });
			    }
			}).on('add', function(cell) {
				var listOfElements = graph.getElements()
				var listOfLinks = graph.getLinks()
			    if (_.contains(listOfElements, cell)) {
			        _.each(listOfLinks, function(link) {
			                paper.findViewByModel(link).update();
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

			$('.router-switch').on('click', function(evt) {
				debugger;
			    var router = $(evt.target).data('router');
			    var connector = $(evt.target).data('connector');

			    if (router) {
			        link.set('router', { name: router });
			    } else {
			        link.unset('router');
			    }

			    link.set('connector', { name: connector });
			});

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
		      graph.addCell(s);
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
				this.selected_el.remove()
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
					markup:'<circle class="joint-port-body" r="6" fill="#FFFFFF" stroke="#000000" magnet="true"/>'
					},
					'out':{
						position:{
							name:'right',
							args:{}
						},
					markup:'<circle class="joint-port-body" r="6" fill="#FFFFFF" stroke="#000000" magnet="true"/>'
					},
					'top':{
						position:{
							name:'top',
							args:{
							},
						},
					markup:'<circle class="joint-port-body" r="6" fill="#FFFFFF" stroke="#000000" magnet="true"/>'
					},
					'bottom':{
						position:{
							name:'bottom',
							args:{}
						},
					markup:'<circle class="joint-port-body" r="6" fill="#FFFFFF" stroke="#000000" magnet="true"/>'
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
</style>

// paper.on('element:pointerdblclick', function(cellView, evt, x, y) {
		//     //cellView.remove();
		//     debugger;
		    // var shapeText = prompt('Enter your table name:', '');
		    // cellView.model.attr('.name/text', shapeText)
		//     // cellView.model.attr('rect/title', 'abc')
		//     // console.log(graph)

		// });

		// this.graph = stencilGraph;
		// var link = new joint.shapes.standard.Link();
		// paper.on('link:pointerdblclick', function(linkView) {
		// 	// resetAll(this);
		// 	// alert("Worked");

		// 	// var description = prompt("Please description", "Harry Potter");
		// 	debugger;
		// 	 var currentLink = linkView.model;
		// 	 currentLink.attr('line/stroke', 'orange');

		// 	 currentLink.attr('text/text', '1:m');
		// 	 let description = prompt("Enter Relation","Data");
		// 	 currentLink.labels([{
		// 	    attrs: {
		// 	        text: {
		// 	            text: description
		// 	        }
		// 	    }
		// 	}]);
		// });



		var archivalcell = new joint.shapes.standard.BorderedImage({
	//     position : {
	//         x : 520,
	//         y : 10
	//     },
	//     size : {
	//         width : 100,
	//         height : 60
	//     },
	//     attrs : {
	//     	rect: {
	//         	rx:5,
	//         },

	//         image : {
	//             "xlink:href" : '../../static/flowchart/images/archive.png',
	//             width : 100,
	//             height : 60
	//         },
	//         text: { text: 'Archival','font-weight':'bold'},
	//     	data:'foo',
	//     },
	//     ports:{
	// 			groups: {
	// 				'in':{
	// 					position:{
	// 						name:'left',
	// 						args:{
	// 						},
	// 					},
	// 				markup:'<circle class="joint-port-body" r="6" fill="#FFFFFF" stroke="#000000" magnet="true"/>'
	// 				},
	// 				'out':{
	// 					position:{
	// 						name:'right',
	// 						args:{}
	// 					},
	// 				markup:'<circle class="joint-port-body" r="6" fill="#FFFFFF" stroke="#000000" magnet="true"/>'
	// 				},
	// 				'top':{
	// 					position:{
	// 						name:'top',
	// 						args:{
	// 						},
	// 					},
	// 				markup:'<circle class="joint-port-body" r="6" fill="#FFFFFF" stroke="#000000" magnet="true"/>'
	// 				},
	// 				'bottom':{
	// 					position:{
	// 						name:'bottom',
	// 						args:{}
	// 					},
	// 				markup:'<circle class="joint-port-body" r="6" fill="#FFFFFF" stroke="#000000" magnet="true"/>'
	// 				}
	// 			},
	// 			items:[
	// 				{
	// 					group:'in',
	// 					args:{}
	// 				},
	// 				{
	// 					group:'out',
	// 					args:{}
	// 				},
	// 				{
	// 					group:'top',
	// 					args:{}
	// 				},
	// 				{
	// 					group:'bottom',
	// 					args:{}
	// 				}
	// 			]
	// 		},
	// });