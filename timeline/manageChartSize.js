var btn = document.getElementById("adjustButton");
var heightInput = document.getElementById("heightInput");
var widthInput = document.getElementById("widthInput");

btn.addEventListener("click", function (){
    changeTimelineSize(heightInput.value, widthInput.value);
});

heightInput.addEventListener("keypress", function(event){
    if(event.keyCode == 13){//key of enter
        changeTimelineSize(heightInput.value, widthInput.value);
    }
});

widthInput.addEventListener("keypress", function(event){
    if(event.keyCode == 13){//key of enter
        changeTimelineSize(heightInput.value, widthInput.value);
    }
});

function changeTimelineSize(height, width){
    var container = document.getElementById('timelinesContainer');
    container.style.width = width+"px";
    container.style.height = height+"px";

    drawChart();
}

function syncSizeInputs(){
    var container = document.getElementById('timelinesContainer');
    
    heightInput.value = container.clientHeight;
    widthInput.value = container.clientWidth;
}
