
function showMannschaft(configSrc, stateModule) {
  try {
    var requestURL = configSrc + "?" + Date.now().toString();
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'arraybuffer';
    request.onload = loadConfigAndShow.bind(null, request, stateModule);
    request.send();
  } catch (ex) {
    console.error("showMannschaft", ex.message);
  }
}

function loadConfigAndShow(request, stateModule) {
  var decoder = new TextDecoder("utf8");
  try {  
    var config = JSON.parse(decoder.decode(request.response));
    var timeCounter = 0;
    var timeCurrent = stateModule.getState();;
    for (var i = 0; i < config.length; ++i) {
      if (timeCurrent >= timeCounter && timeCurrent < timeCounter + config[i].anzeigedauer_s) {
        loadBilder(config[i].bild_heim, config[i].bild_gast);
        loadMannschaftData(config[i].token_datei, config[i].anzahl_spieler, config[i].anzahl_saetze, 
          config[i].satzpunkte_anzeigen == "ja", config[i].reduzierte_ausgabe == "ja")
      }  
      timeCounter += config[i].anzeigedauer_s;
    }
    // update state
    stateModule.changeState(stateModule.getState() + 1);
    if (timeCounter < stateModule.getState())
      stateModule.changeState(0);
  } catch (ex) {
      console.error("loadConfigAndShow", ex.message)
  }
}

function loadBilder(imgHome, imgGuest) {
  var imgReplace = document.getElementById("img_home")
  imgReplace.src = imgHome + "?" + Date.now().toString();
  imgReplace = document.getElementById("img_guest")
  imgReplace.src = imgGuest + "?" + Date.now().toString();
}

function loadMannschaftData(requestURL, teamSize, setCount, displaySP, reducedOutput) {
  try {
    var request = new XMLHttpRequest();
    request.open('GET', requestURL + "?" + Date.now().toString());
    request.responseType = 'arraybuffer';
    request.onload = writeMannschaft.bind(null, request, teamSize,
      setCount, displaySP, reducedOutput);
    request.send();
  } catch (ex) {
    console.error("loadMannschaftData", ex.message);
  }
}

function writeMannschaft(request, teamSize, setCount, displaySP, reducedOutput) {
  try {
    var decoder = new TextDecoder("utf8");
    var data = JSON.parse(decoder.decode(request.response));
    var mannschaft = data.mannschaft0;
    var el = document.getElementById("mannschaft0");
    el.innerHTML = mannschaft.name;
    el = document.getElementById("gesamt0");
    if (!reducedOutput)
    {
      el.innerHTML = mannschaft.volle;
      el = el.parentElement.nextElementSibling.firstChild;
      el.innerHTML = mannschaft.abr;
      el = el.parentElement.nextElementSibling.firstChild;
      el.innerHTML = mannschaft.f;
      el = el.parentElement.nextElementSibling.firstChild;
    }
    el.innerHTML = mannschaft.gesamt;
    el = el.parentElement.nextElementSibling.firstChild;
    if (displaySP)
      el.innerHTML = mannschaft.mp;
    else
      el.innerHTML = "";
     
    var spielerArray = [mannschaft.spieler0, mannschaft.spieler1,
    mannschaft.spieler2, mannschaft.spieler3,
    mannschaft.spieler4, mannschaft.spieler5];
    for (var i = 0; i < teamSize; i++) {
      var spieler = spielerArray[i];
      el = document.getElementById("spieler0" + i.toString());
      el.innerHTML = spieler.spielername;
      el = el.parentElement.nextElementSibling.firstChild;
      if (!reducedOutput)
      {
        el.innerHTML = spieler.wurf;
        el = el.parentElement.nextElementSibling.firstChild;
      }      
      var satzArray = spieler.satz.split(";")
      for (var j = 0; j < setCount; j++) {
        el.innerHTML = satzArray[j];
        el = el.parentElement.nextElementSibling.firstChild;
      }
      for (var j = setCount; j < 4; ++j)
      {
        el.innerHTML = "";
        el = el.parentElement.nextElementSibling.firstChild;
      }
      el.innerHTML = spieler.gesamt;
      el = el.parentElement.nextElementSibling.firstChild;
      if (displaySP) 
        el.innerHTML = spieler.sp;
      else
        el.innerHTML = "";
    }

    mannschaft = data.mannschaft1;
    el = document.getElementById("mannschaft1");
    el.innerHTML = mannschaft.name;
    el = document.getElementById("gesamt1");
    if (!reducedOutput)
    {
      el.innerHTML = mannschaft.volle;
      el = el.parentElement.previousElementSibling.firstChild;
      el.innerHTML = mannschaft.abr;
      el = el.parentElement.previousElementSibling.firstChild;
      el.innerHTML = mannschaft.f;
      el = el.parentElement.previousElementSibling.firstChild;
    }
    el.innerHTML = mannschaft.gesamt;
    el = el.parentElement.previousElementSibling.firstChild;
    if (displaySP)
      el.innerHTML = mannschaft.mp;
    else
      el.innerHTML = "";
    var spielerArray = [mannschaft.spieler0, mannschaft.spieler1,
      mannschaft.spieler2, mannschaft.spieler3,
      mannschaft.spieler4, mannschaft.spieler5];
    for (var i = 0; i < teamSize; i++) {
      var spieler = spielerArray[i];
      el = document.getElementById("spieler1" + i.toString());
      el.innerHTML = spieler.spielername;
      el = el.parentElement.previousElementSibling.firstChild;
      if (!reducedOutput)
      {      
        el.innerHTML = spieler.wurf;
        el = el.parentElement.previousElementSibling.firstChild;
      }      
      var satzArray = spieler.satz.split(";")
      for (var j = 0; j < setCount; j++) {
        el.innerHTML = satzArray[j];
        el = el.parentElement.previousElementSibling.firstChild;
      }
      for (var j = setCount; j < 4; ++j) {
        el.innerHTML = "";
        el = el.parentElement.previousElementSibling.firstChild;
      }
      el.innerHTML = spieler.gesamt;
        el = el.parentElement.previousElementSibling.firstChild;
      if (displaySP)
        el.innerHTML = spieler.sp;
      else
        el.innerHTML = "";
    }

    // clear rows
    var columnCount = 7;
    if (!reducedOutput)
      ++columnCount;
    for (var i = teamSize; i < 6; ++i) {
      el = document.getElementById("spieler0" + i.toString());
      for (var j = 0; j < columnCount * 2 - 1; ++j, el = el.parentElement.nextElementSibling.firstChild) 
        el.innerHTML = "";  
      el.innerHTML = "";
    }

  } catch (ex) {
    console.error("writeMannschaft", ex.message);
  }
}

function tvslider(counterState) {
  counterState.changeState(counterState.getState() + 1);
  if (counterState.getState() >= 5) {
    if (counterState.getState() == 5) {
      var imgReplace = document.getElementById("gastimg");
      imgReplace.src = "Gast2.png";
    }
    loadMannschaftData("mannschaft2.json", 6, 4, true, true)
  } else {
    if (counterState.getState() == 1) {
      var imgReplace = document.getElementById("gastimg");
      imgReplace.src = "Gast.png";
    }
    loadMannschaftData("mannschaft1.json", 6, 4, true, true)
  }
  if (counterState.getState() > 10) {
    counterState.changeState(0);
  }
}
