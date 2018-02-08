

jsPlumb.ready(function () {
    var data = {
            "dynamicWindow100": ["dynamicWindow101"],
            "dynamicWindow102": ["dynamicWindow103"]

        }
    render(data)
    // renderAction(data)
});


function render(data){
    console.log(data);
    var sourceAnchors = [
            [0.2, 0, 0, -1, 0, 0, "foo"],
            [1, 0.2, 1, 0, 0, 0, "bar"],
            [0.8, 1, 0, 1, 0, 0, "baz"],
            [0, 0.8, -1, 0, 0, 0, "qux"]
        ],
        targetAnchors = [
            [0.6, 0, 0, -1],
            [1, 0.6, 1, 0],
            [0.4, 1, 0, 1],
            [0, 0.4, -1, 0]
        ],

        exampleColor = '#00f',
        exampleDropOptions = {
            tolerance: 'touch',
            hoverClass: 'dropHover',
            activeClass: 'dragActive'
        },
        connector = [ "Bezier", { cssClass: "connectorClass", hoverClass: "connectorHoverClass" } ],
        connectorStyle = {
            gradient: {stops: [
                [0, exampleColor],
                [0.5, '#09098e'],
                [1, exampleColor]
            ]},
            strokeWidth: 5,
            stroke: exampleColor
        },
        hoverStyle = {
            stroke: "#449999"
        },
        overlays = [
            ["Arrow", { location:1, fill: "#09098e", width: 15, length: 15 } ]
//            [ "Arrow", { location:0.3, direction:-1 } ]
//            [ "Arrow", { location:0.7 } ],
//              [ "Arrow", { location:0.3, direction:-1 } ]
        ],
        endpoint = ["Dot", { cssClass: "endpointClass", radius: 1, hoverClass: "endpointHoverClass" } ],
        endpointStyle = { fill: exampleColor },
        anEndpoint = {
            endpoint: endpoint,
            paintStyle: endpointStyle,
            hoverPaintStyle: { fill: "#449999" },
            isSource: true,
            isTarget: true,
            maxConnections: -1,
            connector: connector,
            connectorStyle: connectorStyle,
//            connectorHoverStyle: hoverStyle,
            connectorOverlays: overlays
        };

    var instance = jsPlumb.getInstance({
        DragOptions: { cursor: 'pointer', zIndex: 2000 },
        Container: "canvas",
        detachable: true
    });

    // suspend drawing and initialise.
    instance.batch(function () {

        var connections = data,
            endpoints = {},
        // ask jsPlumb for a selector for the window class
            divsWithWindowClass = jsPlumb.getSelector(".dynamic-demo .window");

        // add endpoints to all of these - one for source, and one for target, configured so they don't sit
        // on top of each other.
        for (var i = 0; i < divsWithWindowClass.length; i++) {
            var id = instance.getId(divsWithWindowClass[i]);
            endpoints[id] = [
                // note the three-arg version of addEndpoint; lets you re-use some common settings easily.
                instance.addEndpoint(id, anEndpoint, {anchor: sourceAnchors}),
                instance.addEndpoint(id, anEndpoint, {anchor: targetAnchors})
            ];
        }
        // then connect everything using the connections map declared above.
        for (var e in endpoints) {
            if (connections[e]) {
                for (var j = 0; j < connections[e].length; j++) {
                    instance.connect({
                        source: endpoints[e][0],
                        target: endpoints[connections[e][j]][1]
                    });
                }
            }
        }


        // bind click listener; delete connections on click
        // instance.bind("click", function (conn) {
        //     instance.deleteConnection(conn);
        //     // jsPlumb.detachEveryConnection();
        // });


        $('#deleteallcons').click(function(e) {
            instance.deleteEveryConnection();
            instance.deleteConnectionsForElement()
         });

        instance.draggable(divsWithWindowClass);

        jsPlumb.fire("jsPlumbDemoLoaded", instance);

    });
}


function detachEveryConnection(){
    alert()
    var newinstance = jsPlumb.getInstance({
            Container: "canvas",
            detachable: true
        });
    newinstance.batch(function () {
        newinstance.deleteEveryConnection();
        newinstance.deleteConnectionsForElement()
    });
}

function renderAction(data){
    console.log(data);
    var sourceAnchors = [
            [0.2, 0, 0, -1, 0, 0, "foo"],
            [1, 0.2, 1, 0, 0, 0, "bar"],
            [0.8, 1, 0, 1, 0, 0, "baz"],
            [0, 0.8, -1, 0, 0, 0, "qux"]
        ],
        targetAnchors = [
            [0.6, 0, 0, -1],
            [1, 0.6, 1, 0],
            [0.4, 1, 0, 1],
            [0, 0.4, -1, 0]
        ],

        exampleColor = '#00f',
        exampleDropOptions = {
            tolerance: 'touch',
            hoverClass: 'dropHover',
            activeClass: 'dragActive'
        },
        connector = [ "Bezier", { cssClass: "connectorClass", hoverClass: "connectorHoverClass" } ],
        connectorStyle = {
            gradient: {stops: [
                [0, exampleColor],
                [0.5, '#09098e'],
                [1, exampleColor]
            ]},
            strokeWidth: 5,
            stroke: exampleColor
        },
        hoverStyle = {
            stroke: "#449999"
        },
        overlays = [
            ["Arrow", { location:1, fill: "#09098e", width: 15, length: 15 } ]
//            [ "Arrow", { location:0.3, direction:-1 } ]
//            [ "Arrow", { location:0.7 } ],
//              [ "Arrow", { location:0.3, direction:-1 } ]
        ],
        endpoint = ["Dot", { cssClass: "endpointClass", radius: 1, hoverClass: "endpointHoverClass" } ],
        endpointStyle = { fill: exampleColor },
        anEndpoint = {
            endpoint: endpoint,
            paintStyle: endpointStyle,
            hoverPaintStyle: { fill: "#449999" },
            isSource: true,
            isTarget: true,
            maxConnections: -1,
            connector: connector,
            connectorStyle: connectorStyle,
//            connectorHoverStyle: hoverStyle,
            connectorOverlays: overlays
        };

    var instance = jsPlumb.getInstance({
        DragOptions: { cursor: 'pointer', zIndex: 2000 },
        Container: "canvas2",
        detachable: true
    });

    // suspend drawing and initialise.
    instance.batch(function () {

        var connections = data,
            endpoints = {},
        // ask jsPlumb for a selector for the window class
            divsWithWindowClass = jsPlumb.getSelector(".dynamic-demo .window");

        // add endpoints to all of these - one for source, and one for target, configured so they don't sit
        // on top of each other.
        for (var i = 0; i < divsWithWindowClass.length; i++) {
            var id = instance.getId(divsWithWindowClass[i]);
            endpoints[id] = [
                // note the three-arg version of addEndpoint; lets you re-use some common settings easily.
                instance.addEndpoint(id, anEndpoint, {anchor: sourceAnchors}),
                instance.addEndpoint(id, anEndpoint, {anchor: targetAnchors})
            ];
        }
        // then connect everything using the connections map declared above.
        for (var e in endpoints) {
            if (connections[e]) {
                for (var j = 0; j < connections[e].length; j++) {
                    instance.connect({
                        source: endpoints[e][0],
                        target: endpoints[connections[e][j]][1]
                    });
                }
            }
        }


        // bind click listener; delete connections on click
        // instance.bind("click", function (conn) {
        //     instance.deleteConnection(conn);
        //     // jsPlumb.detachEveryConnection();
        // });


        // $('#deleteallcons').click(function(e) {
        //     instance.deleteEveryConnection();
        //     instance.deleteConnectionsForElement()
        //  });

        instance.draggable(divsWithWindowClass);

        jsPlumb.fire("jsPlumbDemoLoaded", instance);

    });
}


function detachEveryConnection(){
    alert()
    var newinstance = jsPlumb.getInstance({
            Container: "canvas",
            detachable: true
        });
    newinstance.batch(function () {
        newinstance.deleteEveryConnection();
        newinstance.deleteConnectionsForElement()
    });
}
