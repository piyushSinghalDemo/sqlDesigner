<template>
    <div>
       	<div id="stencil"></div>
		<div id="paper"></div>
    </div>
</template>

<script>
    export default {
        mounted() {        	
        	// Canvas where sape are dropped
			var graph = new joint.dia.Graph,
			  paper = new joint.dia.Paper({
			    el: $('#paper'),
			    model: graph
			  });
			// Canvas from which you take shapes
			var stencilGraph = new joint.dia.Graph,
			  stencilPaper = new joint.dia.Paper({
			    el: $('#stencil'),
			    height: 60,
			    model: stencilGraph,
			    interactive: false
			  });
		var link = new joint.shapes.standard.Link();
		// 	graph.options.defaultAnchor = {
		//     name: 'midSide',
		//     args: {
		//         rotate: true,
		//         padding: 20
		//     }
		// };
		var selected;

		paper.on('cell:pointerdblclick', function(cellView, evt, x, y) {
		    cellView.remove();
		});

			var r1 = new joint.shapes.basic.Rect({
			  position: {
			    x: 10,
			    y: 10
			  },
			  size: {
			    width: 100,
			    height: 40
			  },
			  attrs: {
			    text: {
			      text: 'Rect1'
			    },
			  },
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
			var r2 = new joint.shapes.basic.Rect({
			  position: {
			    x: 120,
			    y: 10
			  },
			  size: {
			    width: 100,
			    height: 40
			  },
			  attrs: {
			    text: {
			      text: 'Rect2'
			    }
			  }
			});
			stencilGraph.addCells([r1, r2,model]);

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
        }
    }
</script>