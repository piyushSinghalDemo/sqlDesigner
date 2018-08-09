<template>
    <div>
        <div id="graph"></div>
        
    </div>
</template>

<script>
import svgPanZoom from "svg-pan-zoom/src/svg-pan-zoom.js";
export default {
  mounted() {
    //Initial Parameters
    var gridsize = 1;
    var currentScale = 1;

    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({
      el: $('#graph'),
      width: 600,
      height: 300,
      gridSize: gridsize,
      model: graph
    });
    //Bonus function use (see below) - create dotted grid
    setGrid(paper, gridsize*15, '#808080');
    let panAndZoom="";
    setTimeout(()=>{
          panAndZoom = svgPanZoom(paper.svg, {
        //   viewportSelector: paper.svg.childNodes[0],
          zoomEnabled: true,
          zoomScaleSensitivity: 0.4,
          panEnabled: false,
          controlIconsEnabled: true,
          fit: false,
          onZoom: function(scale){
        currentScale = scale;
        setGrid(paper, gridsize*15*currentScale, '#808080');
    },
    beforePan: function(oldpan, newpan){
        setGrid(paper, gridsize*15*currentScale, '#808080', newpan);
    }
        //   center: true,

          // viewportSelector: document.getElementById('graph').querySelector('#g4') // this option will make library to misbehave. Viewport should have no transform attribute
        });
    },1500);

    //Enable pan when a blank area is click (held) on
    paper.on('blank:pointerdown', function (evt, x, y) {
        panAndZoom.enablePan();
        //console.log(x + ' ' + y);
    });

    //Disable pan when the mouse button is released
    paper.on('cell:pointerup blank:pointerup', function(cellView, event) {
    panAndZoom.disablePan();
    });


    //BONUS function - will add a css background of a dotted grid that will scale reasonably
//well with zooming and panning.
function setGrid(paper, size, color, offset) {
    // Set grid size on the JointJS paper object (joint.dia.Paper instance)
    paper.options.gridsize = gridsize;
    // Draw a grid into the HTML 5 canvas and convert it to a data URI image
    var canvas = $('<canvas/>', { width: size, height: size });
    canvas[0].width = size;
    canvas[0].height = size;
    var context = canvas[0].getContext('2d');
    context.beginPath();
    context.rect(1, 1, 1, 1);
    context.fillStyle = color || '#AAAAAA';
    context.fill();
    // Finally, set the grid background image of the paper container element.
    var gridBackgroundImage = canvas[0].toDataURL('image/png');
    $(paper.el.childNodes[0]).css('background-image', 'url("' + gridBackgroundImage + '")');
    if(typeof(offset) != 'undefined'){  
        $(paper.el.childNodes[0]).css('background-position', offset.x + 'px ' + offset.y + 'px');
    }
}


    var m1 = new joint.shapes.devs.Model({
      position: {
        x: 50,
        y: 50
      },
      size: {
        width: 90,
        height: 90
      },
      inPorts: ['in1', 'in2'],
      outPorts: ['out'],
      ports: {
        groups: {
          'in': {
            attrs: {
              '.port-body': {
                fill: '#16A085'
              }
            }
          },
          'out': {
            attrs: {
              '.port-body': {
                fill: '#E74C3C'
              }
            }
          }
        }
      },
      attrs: {
        '.label': {
          text: 'Model',
          'ref-x': .5,
          'ref-y': .2
        },
        rect: {
          fill: '#2ECC71'
        }
      }
    });
    graph.addCell(m1);

    var m2 = m1.clone().translate(300, 0).attr('.label/text', 'Model 2');
    graph.addCell(m2);

    graph.on('change:source change:target', function (link) {
      var sourcePort = link.get('source').port;
      var sourceId = link.get('source').id;
      var targetPort = link.get('target').port;
      var targetId = link.get('target').id;

      var m = [
        'The port <b>' + sourcePort,
        '</b> of element with ID <b>' + sourceId,
        '</b> is connected to port <b>' + targetPort,
        '</b> of elemnt with ID <b>' + targetId + '</b>'
      ].join('');

      out(m);
    });

    // paper.on('blank:pointerdown',
    //     function(event, x, y) {
    //          debugger;
    //          dragStartPosition = { x: x, y: y};
    //       //  var scale = paper.viewport.scale();
    //        // dragStartPosition = { x: x * scale.sx, y: y * scale.sy};
    //     }
    // );
    // paper.on('cell:pointerup blank:pointerup', function(cellView, x, y) {

    //      dragStartPosition= null;
    // });
    // $("#diagram")
    //     .mousemove(function(event) {
    //         if (dragStartPosition)
    //             paper.translate(
    //                 event.offsetX - dragStartPosition.x, 
    //                 event.offsetY - dragStartPosition.y);
    //     });

    function out(m) {
      $('#paper-link-out').html(m);
    }



  }
}
</script>