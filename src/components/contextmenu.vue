<template>
    <div>
       	<div id="stencil"></div>
		<div id="paper"  @contextmenu.prevent="$refs.ctxMenu.open" ref="elpaper"></div>
		<context-menu id="context-menu" ref="ctxMenu">
			<li style="font-weight:bold" @mouseover="CutMouseOver()" @mouseout="CutMouseOut()" v-bind:class="{disabled : !is_selected}" @click="ContextMenuClick('cut')" ref="elcut">Cut</li>
  			<li style="font-weight:bold" @mouseover="CopyMouseOver()" @mouseout="CopyMouseOut()" v-bind:class="{disabled : !is_selected}" @click="ContextMenuClick('copy')" ref="elcopy">Copy</li>
  			<li style="font-weight:bold" @mouseover="PasteMouseOver()" @mouseout="PasteMouseOut()" @click="ContextMenuClick('paste')" v-bind:class="{disabled : !is_cut_or_copied}" ref="elpaste">Paste</li>
		</context-menu>
    </div>
</template>

<script>
	import contextMenu from 'vue-context-menu'
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
					defaultLink: new joint.dia.Link({connector: { name: 'rounded' },
        			attrs: {'.connection': { stroke: '#333333','stroke-width': 3},
        			'.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' }
        				}
					}),
					circle:{ opacity: "1",r: "2"},
					 validateConnection: function(cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
								// Prevent linking from input ports.
								if (magnetS && magnetS.getAttribute('port-group') === 'in') return false;
								// Prevent linking from output ports to input ports within one element.
								if (cellViewS === cellViewT) return false;
								// Prevent linking to input ports.
								return magnetT && magnetT.getAttribute('port-group') === 'in';
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
			paper.on('cell:mouseover', function(cellView) {
				if(selected){
					selected.unhighlight()
				}
				selected = cellView
				selected.highlight();
				_this.is_selected = true
			}).on('cell:contextmenu', function(cellView) {
				selected = cellView
				selected.highlight();
				_this.is_selected = true
			}).on('cell:pointerdblclick', function(cellView) {
				var shapeText = prompt('Enter your table name:', '');
		    	cellView.model.attr('.name/text', shapeText)
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
		ContextMenuClick(){
			var selectioncell = this.getCell(10,10,150,60,'selection','',"db_icon.png",'#30d0c6','#f1f1f1')
			// console.log(this.$refs.elpaper)
			console.log(this.graph.addCell(selectioncell))
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
			if(!is_not_cut_or_copied)
				this.$refs.elpaste.style.backgroundColor = "grey";
		},
		PasteMouseOut(){
			this.$refs.elpaste.style.backgroundColor = "white";
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
					}
				]
			},
	        attrs: {
	            '.card': { fill: background, stroke: 'none'},
	              image: { 'xlink:href':'../../static/flowchart/images/'+image, opacity: 0.7 },
	            '.rank': { text: rank, fill: "#000", 'word-spacing': '-5px', 'letter-spacing': 0},
	            '.name': { text: name, fill: textColor, 'font-size': 13, 'font-family': 'Arial', 'letter-spacing': 0 }
	        		}
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