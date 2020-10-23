function loadBahnData(numLanes) {
  try {
    var requestURL = "bahn.json";
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'arraybuffer';
    request.onload = writeBahn.bind(null, request, numLanes);
    request.send();
  } catch (ex) {
    console.error("loadBahnData", ex.message);
  }
}

function writeBahn(request, numLanes) {
  try {
    var laneCnt;
    var decoder = new TextDecoder("windows-1252");
    var data = JSON.parse(decoder.decode(request.response));
    var lane = [data.bahn0, data.bahn1, data.bahn2, data.bahn3,
      data.bahn4, data.bahn5, data.bahn6, data.bahn7];

    var el = document.getElementById("name");
    for (laneCnt = 0; laneCnt < numLanes; laneCnt++) {
      el.innerHTML = lane[laneCnt].spielername + " ("
        + lane[laneCnt].sp + ")";
      if (laneCnt < numLanes -1) {
        el = el.parentElement.nextElementSibling.nextElementSibling.firstChild;
      }
    }

    var el = document.getElementById("team");
    for (laneCnt = 0; laneCnt < numLanes; laneCnt++) {
      el.innerHTML = lane[laneCnt].mannschaft;
      if (laneCnt < numLanes -1) {
        el = el.parentElement.nextElementSibling.nextElementSibling.firstChild;
      }
    }

    var el = document.getElementById("total");
    for (laneCnt = 0; laneCnt < numLanes; laneCnt++) {
      el.innerHTML = lane[laneCnt].wurf;
      el = el.parentElement.nextElementSibling.nextElementSibling.firstChild;
      el.innerHTML = lane[laneCnt].gesamt;
      if (laneCnt < numLanes -1) {
        el = el.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.firstChild;
      }
    }

    var el = document.getElementById("heat");
    for (laneCnt = 0; laneCnt < numLanes; laneCnt++) {
      el.innerHTML = lane[laneCnt].durchgang_wurf;
      el = el.parentElement.nextElementSibling.nextElementSibling.firstChild;
      el.innerHTML = lane[laneCnt].durchgang_gesamt;
      if (laneCnt < numLanes -1) {
        el = el.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.firstChild;
      }
    }
  } catch (ex) {
    console.error("writeBahn", ex.message);
  }
}
