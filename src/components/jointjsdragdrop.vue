<template>
    <div>
		<button class="btn btn-info" @click="getData">Get Data(console)</button>
    <div id="stencil"></div>
		<div id="paper"></div>
    </div>
</template>

<script>
import svgPanZoom from "svg-pan-zoom/src/svg-pan-zoom.js";
export default {
  data() {
    return {
      graph: ""
    }
  },
  mounted() {
    var gridsize = 1;
    var currentScale = 1;
    // Canvas where sape are dropped
    var graph = new joint.dia.Graph,
      paper = new joint.dia.Paper({
        el: $('#paper'),
        model: graph,
        gridSize: 5,
        drawGrid: true,
        defaultLink: new joint.dia.Link({
          connector: {
            name: 'rounded'
          },
          attrs: {
            '.connection': {
              stroke: '#333333',
              'stroke-width': 3
            },
            '.marker-target': {
              d: 'M 10 0 L 0 5 L 10 10 z'
            }
          }
        }),
        validateConnection: function (cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
          // Prevent linking from input ports.
          if (magnetS && magnetS.getAttribute('port-group') === 'in') return false;
          // Prevent linking from output ports to input ports within one element.
          if (cellViewS === cellViewT) return false;
          // Prevent linking to input ports.
          return magnetT && magnetT.getAttribute('port-group') === 'in';
        },
        validateMagnet: function (cellView, magnet) {
          // Note that this is the default behaviour. Just showing it here for reference.
          // Disable linking interaction for magnets marked as passive (see below `.inPorts circle`).
          return magnet.getAttribute('magnet') !== 'passive';
        },
        // Enable marking available cells & magnets
        markAvailable: true,

        // Enable link snapping within 75px lookup radius
        snapLinks: {
          radius: 75
        }
      });
    let panAndZoom = "";
    setTimeout(() => {
      panAndZoom = svgPanZoom(paper.svg, {
        //   viewportSelector: paper.svg.childNodes[0],
        zoomEnabled: true,
        zoomScaleSensitivity: 0.4,
        panEnabled: false,
        controlIconsEnabled: true,
        fit: false,
        onZoom: function (scale) {
        currentScale = scale;
        // setGrid(paper, gridsize * 15 * currentScale, '#808080');
        },
        beforePan: function (oldpan, newpan) {
          // setGrid(paper, gridsize * 15 * currentScale, '#808080', newpan);
        }
      });
    }, 1500);

    //Enable pan when a blank area is click (held) on
    paper.on('blank:pointerdown', function (evt, x, y) {
      panAndZoom.enablePan();
      //console.log(x + ' ' + y);
    });

    //Disable pan when the mouse button is released
    paper.on('cell:pointerup blank:pointerup', function (cellView, event) {
      panAndZoom.disablePan();
    });
    // Canvas from which you take shapes
    var stencilGraph = new joint.dia.Graph,
      stencilPaper = new joint.dia.Paper({
        el: $('#stencil'),
        height: 60,
        model: stencilGraph,
        interactive: false
      });

    paper.on('element:pointerdblclick', function (cellView, evt, x, y) {
      //cellView.remove();
      // debugger;
      var shapeText = prompt('Enter your table name:', '');
      cellView.model.attr('text/text', shapeText)
      cellView.model.attr('rect/title', 'abc')
      // console.log(graph)

    });

    this.graph = stencilGraph;
    var link = new joint.shapes.standard.Link();
    var selected;

    paper.on('link:pointerdblclick', function (linkView) {

      var currentLink = linkView.model;

      currentLink.attr('text/text', '1:m');
      let description = prompt("Enter Relation", "Data");
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
        '.label': {
          text: 'Rect3',
          style: {
            'font-size': '14px'
          }
        },
        rect: {
          fill: 'lightgray',
          rx: 10,
          ry: 10
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
            },
            attrs: {
              '.port-body': {
                magnet: 'passive',
                fill: 'gray',
                r: 6
              }
            }
          },
          'out': {
            position: 'bottom',
            label: {
              position: 'outside',
            },
            attrs: {
              '.port-body': {
                fill: 'gray',
                r: 6
              }
            }
          }
        }
      }
    });

    stencilGraph.addCells([model]);

    stencilPaper.on('cell:pointerdown', function (cellView, e, x, y) {
			// debugger;
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
      $('body').on('mousemove.fly', function (e) {
        $("#flyPaper").offset({
          left: e.pageX - offset.x,
          top: e.pageY - offset.y
        });
      });
      $('body').on('mouseup.fly', function (e) {
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
    getData() {
      let data = this.graph.toJSON();
      console.log("data" + JSON.stringify(data));
    }
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
