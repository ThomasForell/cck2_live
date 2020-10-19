function loadMannschaftData(teamSize, setCount) {
  try {
    var requestURL = "mannschaft.json";
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.onload = writeMannschaft.bind(null, request, teamSize, setCount);
    request.send();
  } catch (ex) {
    console.error("loadMannschaftData", ex.message);
  }
}

function writeMannschaft(request, teamSize, setCount) {
  try {
    var data = request.response;
    var mannschaft = data.mannschaft[0];
    var el = document.getElementById("mannschaft0");
    el.innerHTML = mannschaft.name;
    el = document.getElementById("gesamt0");
    el.innerHTML = mannschaft.volle;
    el = el.parentElement.nextElementSibling.firstChild;
    el.innerHTML = mannschaft.abr;
    el = el.parentElement.nextElementSibling.firstChild;
    el.innerHTML = mannschaft.f;
    el = el.parentElement.nextElementSibling.firstChild;
    el.innerHTML = mannschaft.gesamt;
    el = el.parentElement.nextElementSibling.firstChild;
    el.innerHTML = mannschaft.mp;
    var i;
    for (i = 0; i < teamSize; i++) {
      var spieler = mannschaft.spieler[i];
      el = document.getElementById("spieler0" + i.toString());
      el.innerHTML = spieler.spielername;
      el = el.parentElement.nextElementSibling.firstChild;
      el.innerHTML = spieler.wurf;
      el = el.parentElement.nextElementSibling.firstChild;
      var j;
      for (j = 0; j < setCount; j++) {
        el.innerHTML = spieler.satz[j];
        el = el.parentElement.nextElementSibling.firstChild;
      }
      el.innerHTML = spieler.gesamt;
      el = el.parentElement.nextElementSibling.firstChild;
      el.innerHTML = spieler.sp;
    }

    mannschaft = data.mannschaft[1];
    el = document.getElementById("mannschaft1");
    el.innerHTML = mannschaft.name;
    el = document.getElementById("gesamt1");
    el.innerHTML = mannschaft.volle;
    el = el.parentElement.previousElementSibling.firstChild;
    el.innerHTML = mannschaft.abr;
    el = el.parentElement.previousElementSibling.firstChild;
    el.innerHTML = mannschaft.f;
    el = el.parentElement.previousElementSibling.firstChild;
    el.innerHTML = mannschaft.gesamt;
    el = el.parentElement.previousElementSibling.firstChild;
    el.innerHTML = mannschaft.mp;
    for (i = 0; i < teamSize; i++) {
      var spieler = mannschaft.spieler[i];
      el = document.getElementById("spieler1" + i.toString());
      el.innerHTML = spieler.spielername;
      el = el.parentElement.previousElementSibling.firstChild;
      el.innerHTML = spieler.wurf;
      el = el.parentElement.previousElementSibling.firstChild;
      var j;
      for (j = 0; j < setCount; j++) {
        el.innerHTML = spieler.satz[j];
        el = el.parentElement.previousElementSibling.firstChild;
      }
      el.innerHTML = spieler.gesamt;
      el = el.parentElement.previousElementSibling.firstChild;
      el.innerHTML = spieler.sp;
    }
  } catch (ex) {
    console.error("writeMannschaft", ex.message);
  }
}
