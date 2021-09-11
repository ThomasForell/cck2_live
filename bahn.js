function loadBahnData(requestURL, firstLane, lastLane) {
  try {
    var request = new XMLHttpRequest();
    request.open('GET', requestURL + '?nocache=' + (new Date()).getTime());
    request.responseType = 'arraybuffer';
    request.onload = writeBahn.bind(null, request, firstLane, lastLane);
    request.send();
  } catch (ex) {
    console.error("loadBahnData", ex.message);
  }
}

function writeBahn(request, firstLane, lastLane) {
  try {
    var laneCnt;
    var decoder = new TextDecoder("utf8");
    var data = JSON.parse(decoder.decode(request.response));
    var lane = [data.bahn0, data.bahn1, data.bahn2, data.bahn3,
      data.bahn4, data.bahn5, data.bahn6, data.bahn7];

    var el = document.getElementById("name");
    for (laneCnt = firstLane - 1; laneCnt < lastLane; laneCnt++) {
      el.innerHTML = lane[laneCnt].spielername + " ("
        + lane[laneCnt].sp + ")";
      if (laneCnt < lastLane -1) {
        el = el.parentElement.nextElementSibling.nextElementSibling.firstChild;
      }
    }

    var el = document.getElementById("team");
    for (laneCnt = firstLane - 1; laneCnt < lastLane; laneCnt++) {
      el.innerHTML = lane[laneCnt].mannschaft;
      if (laneCnt < lastLane -1) {
        el = el.parentElement.nextElementSibling.nextElementSibling.firstChild;
      }
    }

    var el = document.getElementById("total");
    for (laneCnt = firstLane - 1; laneCnt < lastLane; laneCnt++) {
      el.innerHTML = lane[laneCnt].wurf;
      el = el.parentElement.nextElementSibling.nextElementSibling.firstChild;
      el.innerHTML = lane[laneCnt].gesamt;
      if (laneCnt < lastLane -1) {
        el = el.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.firstChild;
      }
    }

    var el = document.getElementById("heat");
    for (laneCnt = firstLane - 1; laneCnt < lastLane; laneCnt++) {
      el.innerHTML = lane[laneCnt].durchgang_wurf;
      el = el.parentElement.nextElementSibling.nextElementSibling.firstChild;
      el.innerHTML = lane[laneCnt].durchgang_gesamt;
      if (laneCnt < lastLane -1) {
        el = el.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.firstChild;
      }
    }
  } catch (ex) {
    console.error("writeBahn", ex.message);
  }
}
