
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

function loadMannschaftData(requestURL, teamSize, setCount, displaySP, reducedOutput) {
  try {
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
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
      el.innerHTML = spieler.gesamt;
      if (displaySP) {
        el = el.parentElement.nextElementSibling.firstChild;
        el.innerHTML = spieler.sp;
      }
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
    if (displaySP)
    {
      el = el.parentElement.previousElementSibling.firstChild;
      el.innerHTML = mannschaft.mp;
    }
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
      el.innerHTML = spieler.gesamt;
      if (displaySP) {
        el = el.parentElement.previousElementSibling.firstChild;
        el.innerHTML = spieler.sp;
      }
    }
  } catch (ex) {
    console.error("writeMannschaft", ex.message);
  }
}
