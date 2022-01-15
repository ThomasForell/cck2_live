
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
    var config_teams = config.teams;
    var config_werbung = config.werbung;
    var time_total_teams = 0;
    for (var i = 0; i < config_teams.length; ++i) {
      time_total_teams += config_teams[i].anzeigedauer_s;
    }
    var timeCurrent = stateModule.getState() % time_total_teams;

    // find team to load
    var timeCounter = 0;
    for (var i = 0; i < config_teams.length; ++i) {
      if (timeCurrent >= timeCounter && timeCurrent < timeCounter + config_teams[i].anzeigedauer_s) {
        loadBilder(config_teams[i].bild_heim, config_teams[i].bild_gast);
        loadMannschaftData(config_teams[i].token_datei, config_teams[i].anzahl_spieler, config_teams[i].anzahl_saetze, 
          config_teams[i].satzpunkte_anzeigen == "ja", config_teams[i].reduzierte_ausgabe == "ja")
        break;  
      }  
      timeCounter += config_teams[i].anzeigedauer_s;
    }

    // draw advertisments
    if (config_werbung.bilder.length > 0) {
      var time_total_werbung = config_werbung.bilder.length * config_werbung.anzeigedauer_s;
      var werbung_no = Math.floor((stateModule.getState() % time_total_werbung) / config_werbung.anzeigedauer_s);
      loadWerbung(config_werbung.bilder[werbung_no]);
    }

    // update state
    stateModule.changeState(stateModule.getState() + 1);
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

function loadWerbung(img) {
  var imgReplace = document.getElementById("img_center")
  imgReplace.src = img + "?" + Date.now().toString();
}
