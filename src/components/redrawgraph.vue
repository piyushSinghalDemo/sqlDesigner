<template>
    <div>
		<button class="btn btn-info" @click="getData">Get Data(console)</button>
		<button class="btn btn-info" @click="redraw">Redraw</button>
       	<div id="stencil"></div>
		<div id="paper"></div>
    </div>
</template>

<script>
    export default {
			data() { return {
				graph:"",
				gdata:"",
				diagram:new joint.dia.Graph
				}
			},
      		mounted() {  
      		let _this =this      	
        	// Canvas where sape are dropped
			  	var paper = new joint.dia.Paper({
			    	el: $('#paper'),
			    	model: _this.diagram,
			    	gridSize: 5,
  					drawGrid:true,
					defaultLink: new joint.dia.Link({connector: { name: 'rounded' },
        			attrs: {'.connection': { stroke: '#333333','stroke-width': 3},
        			'.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' }
        				}
					}),
					circle:{ opacity: "1",r: "2"}
			  	});
			// Canvas from which you take shapes
			var stencilGraph = new joint.dia.Graph,
			  stencilPaper = new joint.dia.Paper({
			    el: $('#stencil'),
			    height: 60,
			    model: stencilGraph,
			    interactive: false
			  });
		paper.on('element:pointerdblclick', function(cellView, evt, x, y) {
		    //cellView.remove();
		    debugger;
		    var shapeText = prompt('Enter your table name:', '');
		    cellView.model.attr('text/text', shapeText)
		    var Title = prompt('Enter your Title:', '');
		    cellView.model.attr('rect/title', Title)
		    // console.log(graph)

		}).on('cell:contextmenu', function(cellView,e) {
				debugger;
        		cellView.remove();
    		});

		this.graph = stencilGraph;
		var link = new joint.shapes.standard.Link();
		var selected;
		paper.on('link:pointerdblclick', function(linkView) {
				debugger;
				 var currentLink = linkView.model;
				 currentLink.attr('line/stroke', 'orange');
				 // currentLink.attr('text/text', '1:m');
				 let description = prompt("Enter Relation","Data");
				 currentLink.labels([{
				    attrs: {
				        text: {
				            text: description
				        }
				    }
				}]);

				});

			var model = new joint.shapes.devs.Model({
			  position: {
			    x: 230,
			    y: 10
			  },
			  size: {
			    width: 100,
			    height: 40
			  },
			  attrs: {
			    text: {
			      text: 'Rect3'
			    },
			    rect:{
			    	rx:10,
			    	ry:10
			    }
			  },
			  inPorts: ['a'],
			  outPorts: ['b'],
			  ports: {
			    groups: {
			      'in': {
			        position: 'top',
			        label: {
			          position: 'outside'
			        }
			      },
			      'out': {
			        position: 'bottom',
			        label: {
			          position: 'outside'
			        }
			      }
			    }
			  }
			});
			stencilGraph.addCells([model]);

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
			      _this.diagram.addCell(s);
			    }
			    $('body').off('mousemove.fly').off('mouseup.fly');
			    flyShape.remove();
			    $('#flyPaper').remove();
			  });
			});
				},
			methods: {
				getData(){
					let data = this.diagram.toJSON(); 
					console.log("data"+JSON.stringify(data));
					this.gdata = JSON.stringify(this.diagram);
				},
				redraw(){
					alert('redrawing')
					this.diagram.fromJSON(JSON.parse(this.gdata))
				}
			}	
    }
</script>