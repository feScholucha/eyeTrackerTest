
window.onload = async function () {

    //start the webgazer tracker
    await webgazer.setRegression('ridge') /* currently must set regression and tracker */
        //.setTracker('clmtrackr')
        .setGazeListener(function (data, clock) {
        //     //   console.log(data); /* data is an object containing an x and y key which are the x and y prediction coordinates (no bounds limiting) */
        //     //   console.log(clock); /* elapsed time in milliseconds since webgazer.begin() was called */
        })
        .saveDataAcrossSessions(true)
        .begin();
    webgazer.showVideoPreview(true) /* shows all video previews */
        .showPredictionPoints(true) /* shows a square every 100 milliseconds where current prediction is */
        .applyKalmanFilter(true); /* Kalman Filter defaults to on. Can be toggled by user. */
    //Set up the webgazer video feedback.
    var setup = function () {
        //Set up the main canvas. The main canvas is used to calibrate the webgazer.
        var canvas = document.getElementById("plotting_canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = 'fixed';
    };
    webgazer.clearData();
    // webgazer.removeMouseEventListeners();

    setup();
};


// Set to true if you want to save the data even if you reload the page.
window.saveDataAcrossSessions = true;
window.onbeforeunload = function () {
    webgazer.end();
}
/**
 * Restart the calibration process by clearing the local storage and reseting the calibration point
 */
function Restart() {
    document.getElementById("Accuracy").innerHTML = "<a>Não calibrado</a>";
    webgazer.clearData();
    ClearCalibration();
    PopUpInstruction();
}

function DumpCoords(btn) {
    webgazer.removeMouseEventListeners();
    webgazer.setGazeListener(function (data, elapsedTime) {
        if (data == null) {
            return;
        }
        webgazer.removeMouseEventListeners();
        var xprediction = data.x; //these x coordinates are relative to the viewport
        if(xprediction < 0){xprediction = 0};
        var yprediction = data.y; //these y coordinates are relative to the viewport
        if(yprediction < 0){yprediction = 0};
        btn.style.position = "absolute";
        btn.style.left = xprediction - btn.offsetWidth / 2 + 'px';
        btn.style.top = yprediction - btn.offsetHeight / 2 + 'px';
        CheckIt()
    }).begin();
    webgazer.removeMouseEventListeners();
}