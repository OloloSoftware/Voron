
var context = new AudioContext();
var gainNode, source, destination, osc, filterNode, convolverNode;
var analyser;

analyser = context.createAnalyser();
analyser.fftSize = 32;
var fFrequencyData = new Float32Array(analyser.frequencyBinCount);
var bFrequencyData = new Uint8Array(analyser.frequencyBinCount);
var bTimeData = new Uint8Array(analyser.frequencyBinCount);

function play() {
    osc = context.createOscillator();
    gainNode = context.createGain();
    filterNode = context.createBiquadFilter();
    osc.connect(filterNode);
    osc.connect(analyser);
    osc.connect(gainNode);
    gainNode.connect(context.destination);
    analyser.connect(context.destination);
    filterNode.connect(context.destination);
    osc.start();
    printFrequency();
}

function printFrequency() {

   // analyser.getFloatFrequencyData(fFrequencyData);
    analyser.getByteFrequencyData(bFrequencyData);
   // analyser.getByteTimeDomainData(bTimeData);

    var freq;
    freq = document.getElementById('freq');
    freq.textContent = "1";
    freq.textContent = bFrequencyData.toString();
   
}

function stop() {
    osc.stop();
}
function changeParam(paramName, target) {
    osc[paramName].value = target.value;
    printFrequency();

}

function changeGain(target) {
    gainNode.gain.value = target.value;
}

function changeFilter(target) {
    if (target.value == 1) {
        filterNode.type = 1;
        filterNode.frequency.value = 1000;
        filterNode.frequency.Q = 1;
    }
    else if (target.value == 2) {
        filterNode.type = 2;
        filterNode.frequency.value = 150;
        filterNode.frequency.Q = 10;
    }
}
function changeFilter2(target) {
    if (target.value == 1) {
        filterNode.type = 1;
        filterNode.frequency.value = 440;
        filterNode.frequency.Q = 0;
    }
    else if (target.value == 2) {
        filterNode.type = 2;
        filterNode.frequency.value = 150;
        filterNode.frequency.Q = 10;
    }
    else filterNode.frequency.value = 0;
}
