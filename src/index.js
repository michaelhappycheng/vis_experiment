import React from "react";
import ReactDOM from "react-dom";
import vis from "vis-network";
import pic2 from "./img/network/leftArrow.png";

import "./styles.css";

class App extends React.Component{
  componentDidMount() {
    draw();
  }
  render() {
    return (
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
        {/* {draw()} */}
        <div id="visStuff"></div>
        {/* {<Node r={0.1} e={0.05} d={0.5} radius={20} />} */}
        {/* <img src={nodeImg(0.1, 0.05, 0.5, 20)} alt="svg1" /> */}
      </div>
    );
  }
}

var DIR = './img/soft-scraps-icons/';
var nodes = null;
var edges = null;
var network = null;

const draw = () => {
  // create people.
  // value corresponds with the age of the person
  var DIR = 'img/indonesia/';
  nodes = [
    // {id: 1,  shape: 'circularImage', image: DIR + '1.png', group: "group1", label: "Look at me please", font: {size:15, color:'red', face:'courier', strokeWidth:3, strokeColor:'#ffffff'}},
    {id: 1,  shape: 'image', image: nodeImg(0.1, 0.05, 0.5, 20), group: "group1", label: "Look at me please"},
    // {id: 2,  shape: 'circularImage', image: DIR + '2.png', group: "group1"},
    {id: 2,  shape: 'image', image: pic2, group: "group1"},

    // {id: 3,  shape: 'circularImage', image: DIR + '3.png', group: "group1"},
    // {id: 4,  shape: 'circularImage', image: DIR + '4.png', label:"pictures by this guy!", group: "group1"},
    // {id: 5,  shape: 'circularImage', image: DIR + '5.png', group: "group1"},
    // {id: 6,  shape: 'circularImage', image: DIR + '6.png', group: "group1"},
    // {id: 7,  shape: 'circularImage', image: DIR + '7.png', group: "group1"},
    // {id: 8,  shape: 'circularImage', image: DIR + '8.png', group: "group1"},
    // {id: 9,  shape: 'circularImage', image: DIR + '9.png', group: "group1"},
    // {id: 10, shape: 'circularImage', image: DIR + '10.png', group: "group2"},
    // {id: 11, shape: 'circularImage', image: DIR + '11.png', group: "group2"},
    // {id: 12, shape: 'circularImage', image: DIR + '12.png', group: "group2"},
    // {id: 13, shape: 'circularImage', image: DIR + '13.png', group: "group2"},
    // {id: 14, shape: 'circularImage', image: DIR + '14.png', group: "group2"},
    // {id: 15, shape: 'circularImage', image: DIR + 'missing.png', brokenImage: DIR + 'missingBrokenImage.png', label:"when images\nfail\nto load", group: "group31", size: 40},
    // {id: 16, shape: 'circularImage', image: DIR + 'anotherMissing.png', brokenImage: DIR + '9.png', label:"fallback image in action", group: "group3"}
  ];
  // create connections between people
  // value corresponds with the amount of contact between two people
  edges = [
    { from: 1, 
      to: 2,
      length: 400,
      arrows: {
        from: { enabled: true, scaleFactor:1 },
        // middle: { enabled: true, scaleFactor:1 },
        // to: { enabled: true, scaleFactor:1 }
      },
      label: "hi ma look at me top &spades;",
      font: {align: "top"}
    },
    { from: 2, 
      to: 1, 
      length: 400,
      arrows: {
        from: { enabled: true, scaleFactor:1 },
        // middle: { enabled: true, scaleFactor:1 },
        // to: { enabled: true, scaleFactor:1 }
      },
      label: "hi ma look at me bottom &spades;",
      font: {align: "bottom"}
    },
    // {from: 2, to: 1},
    // {from: 2, to: 3, length: 1000},
    // {from: 2, to: 4},
    // {from: 4, to: 5},
    // {from: 4, to: 10},
    // {from: 4, to: 6},
    // {from: 6, to: 7},
    // {from: 7, to: 8},
    // {from: 8, to: 9},
    // {from: 8, to: 10},
    // {from: 10, to: 11},
    // {from: 11, to: 12},
    // {from: 12, to: 13},
    // {from: 13, to: 14},
    // {from: 9, to: 16}
  ];
  // create a network
  var container = document.getElementById('visStuff');
  var data = {
    nodes: nodes,
    edges: edges
  };
  var options = {
    nodes: {
      borderWidth:4,
      // size:30,
    color: {
        border: '#222222',
        background: '#666666'
      },
      font:{color:'#eeeeee'}
    },
    edges: {
      color: 'lightgray'
    },
    groups: {
      group1: {color:{background:'red'}, borderWidth:3},
      group2: {color:{background:'red'}, borderWidth:3},
      group3: {color:{background:'red'}, borderWidth:3}
    },
    physics: false
  };
  network = new vis.Network(container, data, options);
  console.log("network", network)
  network.on("click", function(properties) {
    console.log('i am called', properties)
    var ids = properties.nodes;
    console.log("TCL: draw -> ids", ids, nodes.find((node) => {
      return (node.id === ids[0])
    }).label)
  })
}


function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
}

function describeArc(x, y, radius, startAngle, endAngle) {
  var start = polarToCartesian(x, y, radius, endAngle);
  var end = polarToCartesian(x, y, radius, startAngle);

  var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  var d = [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y
  ].join(" ");

  return d;
}

const nodeImg = (r, e, d, radius) => {
  const rRadius = radius + 8;
  const eRadius = radius + 17;
  const dRadius = radius + 25;
  const side = 2 * (radius + 30);
  const backCircleStyle = (color = "rgba(0, 0, 0, 0.15)") =>
    `fill="none" stroke="${color}" stroke-width="6px"`;

  const img = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"><g transform="${`translate(${radius +
    30}, ${radius +
    30})`}"><circle cx="0" cy="0" r="${radius}" fill="none" stroke="black" /><circle cx="0" cy="0" r="${rRadius}" ${backCircleStyle()} /><circle cx="0" cy="0" r="${eRadius}" ${backCircleStyle()} /><circle cx="0" cy="0" r="${dRadius}" ${backCircleStyle()} /><path d="${describeArc(
    0,
    0,
    rRadius,
    0,
    360 * r
  )}" stroke-linecap="round" ${backCircleStyle(
    "#FF9C32"
  )}/><path d="${describeArc(
    0,
    0,
    eRadius,
    0,
    360 * e
  )}" stroke-linecap="round" ${backCircleStyle("#C92100")}/><path
 d="${describeArc(
   0,
   0,
   dRadius,
   0,
   360 * d
 )}" stroke-linecap="round" ${backCircleStyle("#0095D3")}/></g></svg>`.replace(
    /#/g,
    "%23"
  );
  return img;
};
const Node = ({ r, e, d, radius }) => {
  const rRadius = radius + 8;
  const eRadius = radius + 17;
  const dRadius = radius + 25;
  const side = 2 * (radius + 30);
  const backCircleStyle = {
    fill: "none",
    stroke: "rgba(0, 0, 0, 0.15)",
    strokeWidth: "6px"
  };

  return (
    <svg style={{ border: "1px solid green", width: side, height: side }}>
      <g transform={`translate(${radius + 30}, ${radius + 30})`}>
        <circle cx="0" cy="0" r={radius} fill="none" stroke="black" />
        <circle cx="0" cy="0" r={rRadius} style={backCircleStyle} />
        <circle cx="0" cy="0" r={eRadius} style={backCircleStyle} />
        <circle cx="0" cy="0" r={dRadius} style={backCircleStyle} />
        <path
          d={describeArc(0, 0, rRadius, 0, 360 * r)}
          strokeLinecap="round"
          style={{ ...backCircleStyle, stroke: "#FF9C32" }}
        />
        <path
          d={describeArc(0, 0, eRadius, 0, 360 * e)}
          strokeLinecap="round"
          style={{ ...backCircleStyle, stroke: "#C92100" }}
        />
        <path
          d={describeArc(0, 0, dRadius, 0, 360 * d)}
          strokeLinecap="round"
          style={{ ...backCircleStyle, stroke: "#0095D3" }}
        />
      </g>
    </svg>
  );
};
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
