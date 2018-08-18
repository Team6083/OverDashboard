var wsCom = false;
var RobotCom = false;

NetworkTables.addWsConnectionListener(function(connected) {
  console.log("Websocket connected: " + connected);
  wsCom = connected;
  updateCommStat();
}, true);

NetworkTables.addRobotConnectionListener(function(connected) {
  console.log("Robot connected: " + connected);
  RobotCom = connected;
  updateCommStat();
}, true);

function updateCommStat(stat) {
  if (wsCom && RobotCom) {
    $("#com-stat").attr('class', "badge badge-success badge-pill");
    $("#com-stat").html("Connected");
  } else if (wsCom) {
    $("#com-stat").attr('class', "badge badge-warning badge-pill");
    $("#com-stat").html("Only Ws");
  } else if (RobotCom) {
    $("#com-stat").attr('class', "badge badge-success badge-pill");
    $("#com-stat").html("Only Robot");
  } else {
    $("#com-stat").attr('class',"badge badge-warning");
  }
}

// Connection Stat
NetworkTables.addGlobalListener(function(key, value, isNew) {
  console.log(key, " ", value);
}, true);

//FMS

NetworkTables.addKeyListener("/FMSInfo/EventName", function(key, value, isNew) {
  $("#event").html(value);
}, true);

NetworkTables.addKeyListener("/FMSInfo/MatchNumber", function(key, value, isNew) {
  $("#match").html(value);
}, true);

NetworkTables.addKeyListener("/FMSInfo/StationNumber", function(key, value, isNew) {
  $("#station").html(value);
}, true);

//DriveBase
NetworkTables.addKeyListener("/SmartDashbaord/drive/leftSpeed", function(key, value, isNew) {
  speedL.set(value);
  $("#speedL").html(value);
}, true);

NetworkTables.addKeyListener("/SmartDashbaord/drive/rightSpeed", function(key, value, isNew) {
  speedR.set(value);
  $("#speedR").html(value);
}, true);

NetworkTables.addKeyListener("/SmartDashbaord/drive/reverse", function(key, value, isNew) {
  if(value){
    $("#driveRev").addClass("active");
  }
  else{
    $("#driveRev").removeClass("active");
  }
}, true);

$("#driveRev").click(function(){
  var valKey = "/SmartDashbaord/drive/reverse";
  NetworkTables.putValue(valKey, !NetworkTables.getValue(valKey));
});

//Up Ass
NetworkTables.addKeyListener("/SmartDashbaord/Up/Enc", function(key, value, isNew) {
  setUpAssBar("upEncB", value);
  $("#upEnc").html(value);
}, true);

NetworkTables.addKeyListener("/SmartDashbaord/Up/targetStep", function(key, value, isNew) {
  setUpAssBar("upTargetB", value);
  $("#upTarget").html(value);
}, true);

NetworkTables.addKeyListener("/SmartDashbaord/Up/motorOutPut", function(key, value, isNew) {
  setPWMBar("upOutB", value);
  $("#upOut").html(value);
}, true);

NetworkTables.addKeyListener("/SmartDashbaord/Up/HoldOverride", function(key, value, isNew) {
  if(value){
    $("#upInfo").html("Holding Override");
  }
  else{
    $("#upInfo").html("");
  }
}, true);

$("#upHoldOver").click(function() {
  var valKey = "/SmartDashbaord/Up/HoldOverride";
  NetworkTables.putValue(valKey, !NetworkTables.getValue(valKey));
});

//Gyro
NetworkTables.addKeyListener("/SmartDashbaord/Gyro/angle", function(key, value, isNew) {
  compassC.value = value;
  $("#compass").html(value);
}, true);

//Camera
var cam1URL = "axis-camera1.local";

loadCameraOnConnect({
    container: '#cam',
    port: 5800,
    host:cam1URL,
    image_url: '/?action=stream',
    data_url: '/program.json',
    attrs: {
        width: 320,
        height: 240
    }
});

//SuckingAssembly

NetworkTables.addKeyListener("/SmartDashbaord/Cube/current1", function(key, value, isNew) {
  setAmpBar("suckC1B", value, 30);
  $("#suckC1").html(value);
}, true);

NetworkTables.addKeyListener("/SmartDashbaord/Cube/current2", function(key, value, isNew) {
  setAmpBar("suckC2B", value, 30);
  $("#suckC2").html(value);
}, true);
