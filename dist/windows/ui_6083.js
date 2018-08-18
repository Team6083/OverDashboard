var drivebaseOpt = {
  angle: -0.30, // The span of the gauge arc
  lineWidth: 0.15, // The line thickness
  radiusScale: 0.80, // Relative radius
  pointer: {
    length: 0.37, // // Relative to gauge radius
    strokeWidth: 0.042, // The thickness
    color: '#000000' // Fill color
  },
  limitMax: true, // If false, max value increases automatically if value > maxValue
  limitMin: true, // If true, the min value of the gauge will be fixed
  strokeColor: '#E0E0E0', // to see which ones work best for you
  generateGradient: true,
  highDpiSupport: true, // High resolution support
  staticLabels: {
    font: "20px sans-serif", // Specifies font
    labels: [-1, -0.5, 0, 0.5, 1], // Print labels at these values
    color: "#000000", // Optional: Label text color
    fractionDigits: 1 // Optional: Numerical precision. 0=round off.
  },
  renderTicks: {
    divisions: 4,
    divWidth: 1.1,
    divLength: 0.7,
    divColor: '#333333',
    subDivisions: 5,
    subLength: 0.5,
    subWidth: 0.6,
    subColor: '#666666'
  },

};

var speedL = new Gauge(document.getElementById("speedLCan")).setOptions(drivebaseOpt);
speedL.maxValue = 1;
speedL.setMinValue(-1);
speedL.animationSpeed = 1;
speedL.set(0);

var speedR = new Gauge(document.getElementById("speedRCan")).setOptions(drivebaseOpt);
speedR.maxValue = 1;
speedR.setMinValue(-1);
speedR.animationSpeed = 1;
speedR.set(0);

function setPWMBar(id,val){
  var max = 1.01;
  var min = -1.01;
  var range = max - min;
  var perC = (val/range*100)+50;
  $("#"+id).attr('style',"width: "+Math.abs(perC)+"%");
  if(perC > 50){
    $("#"+id).attr('class',"progress-bar bg-success");
  }
  else if (perC < 50) {
    $("#"+id).attr('class',"progress-bar bg-danger");
  }
  else{
    $("#"+id).attr('class',"progress-bar bg-warning");
  }
}

//Drive Base

function setUpAssBar(id,val){
  var max = 0;
  var min = -5800;
  var range = max - min;
  var perC = val/range*100;
  $("#"+id).attr('style',"width: "+Math.abs(perC)+"%");
  if(perC > 0){
    $("#"+id).attr('class',"progress-bar bg-warning");
  }
  else{
    $("#"+id).attr('class',"progress-bar bg-info");
  }
}

//Up UpAssembly

var compassC = new RadialGauge({
    width:180,
    renderTo: 'compassC',
    minValue: 0,
    maxValue: 360,
    majorTicks: [
        "0",
        "45",
        "90",
        "135",
        "180",
        "-135",
        "-90",
        "-45",
        "0"
    ],
    minorTicks: 22,
    ticksAngle: 360,
    startAngle: 180,
    strokeTicks: false,
    highlights: false,
    colorPlate: "#222",
    colorMajorTicks: "#f5f5f5",
    colorMinorTicks: "#ddd",
    colorNumbers: "#ccc",
    colorNeedle: "rgba(240, 128, 128, 1)",
    colorNeedleEnd: "rgba(255, 160, 122, .9)",
    valueBox: false,
    valueTextShadow: false,
    colorCircleInner: "#fff",
    colorNeedleCircleOuter: "#ccc",
    needleCircleSize: 15,
    needleCircleOuter: false,
    animationRule: "linear",
    needleType: "line",
    needleStart: 75,
    needleEnd: 99,
    needleWidth: 5,
    borders: true,
    borderInnerWidth: 0,
    borderMiddleWidth: 0,
    borderOuterWidth: 5,
    colorBorderOuter: "#ccc",
    colorBorderOuterEnd: "#ccc",
    colorNeedleShadowDown: "#222",
    borderShadowWidth: 0,
    animationDuration: 0,
}).draw();

//Compass
