<template>
    <div>
		<button class="btn btn-info" @click="getData">Get Data(console)</button>
       	<div id="stencil"></div>
		<div id="paper"></div>
    </div>
</template>

<script>
    export default {
			data() {
				return{
					graph:""
				}
			},
      		mounted() {        	
        	// Canvas where sape are dropped
				var graph = new joint.dia.Graph,
			  	paper = new joint.dia.Paper({
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

		paper.on('element:pointerdblclick', function(cellView, evt, x, y) {
		    //cellView.remove();
		    debugger;
		    var shapeText = prompt('Enter your table name:', '');
		    cellView.model.attr('.name/text', shapeText)
		    // cellView.model.attr('rect/title', 'abc')
		    // console.log(graph)

		}).on('cell:contextmenu', function(cellView,e) {
				debugger;
        		alert(cellView.model.id)
    		});

		this.graph = stencilGraph;
		var link = new joint.shapes.standard.Link();
		paper.on('link:pointerdblclick', function(linkView) {
			// resetAll(this);
			// alert("Worked");

			// var description = prompt("Please description", "Harry Potter");
			debugger;
			 var currentLink = linkView.model;
			 currentLink.attr('line/stroke', 'orange');

			 currentLink.attr('text/text', '1:m');
			 let description = prompt("Enter Relation","Data");
			 currentLink.labels([{
			    attrs: {
			        text: {
			            text: description
			        }
			    }
			}]);
		});
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
		getData(){
			let data = this.graph.toJSON(); 
			console.log("data"+JSON.stringify(data));
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

	// var cell = new joint.shapes.org.Member({
		// // markup:'<g class="inPorts"/><g class="outPorts"/>',
  //       position: { x: 10, y: 10 },
  //       size: {
		// 	    width: 150,
		// 	    height: 60
		// 	  },
		// ports:{
		// 	groups: {
		// 		'in':{
		// 			position:{
		// 				name:'left',
		// 				args:{
		// 				},
		// 			},
		// 		markup:'<circle class="joint-port-body" r="5" fill="#FFFFFF" stroke="#000000" magnet="true"/>'
		// 		},
		// 		'out':{
		// 			position:{
		// 				name:'right',
		// 				args:{}
		// 			},
		// 		markup:'<circle class="joint-port-body" r="5" fill="#FFFFFF" stroke="#000000" magnet="true"/>'
		// 		}
		// 	},
		// 	items:[
		// 		{
		// 			group:'in',
		// 			args:{}
		// 		},
		// 		{
		// 			group:'out',
		// 			args:{}
		// 		}
		// 	]
		// },
  //       attrs: {
  //           '.card': { fill: '#30d0c6', stroke: 'none'},
  //             image: { 'xlink:href': "../../static/flowchart/images/archive.png", opacity: 0.7 },
  //           '.rank': { text: 'archival', fill: '#f1f1f1', 'word-spacing': '-5px', 'letter-spacing': 0},
  //           '.name': { text: '', fill: '#f1f1f1', 'font-size': 13, 'font-family': 'Arial', 'letter-spacing': 0 },
  //       	}
  //   	});