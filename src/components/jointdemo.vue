<template>
    <div>
        <h1>Home</h1>
        <div id="myholder"></div>
    </div>
</template>

<script>
    export default {
        mounted() {
            let graph = new joint.dia.Graph;

            let paper = new joint.dia.Paper({
                el: $('#myholder'),
                width: 1000,
                height: 800,
                model: graph,
                gridSize: 1
            });

            let rect = new joint.shapes.basic.Rect({
                position: { x: 100, y: 30 },
                size: { width: 100, height: 30 },
                attrs: { rect: { fill: 'blue' }, text: { text: 'my box', fill: 'white' } }
            });

            let rect2 = rect.clone();
            rect2.translate(300);

            let link = new joint.dia.Link({
                source: { id: rect.id },
                target: { id: rect2.id }
            });
            var model = new joint.shapes.devs.Model({
                  position: {
                    x: 400,
                    y: 200
                  },
                  size: {
                    width: 100,
                    height: 40
                  },
                  attrs: {
                    text: {
                      text: 'Top\nBottom\nModel'
                    }
                  },
                  inPorts: ['in'],
                  outPorts: ['out'],
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

            graph.addCells([rect, rect2, link,model]);
        }
    }
</script>