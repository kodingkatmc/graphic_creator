console.log("Script Linked");

const frameCount = 60;
let i = 0;
let res = [0,0];
let per = 0;
let color = "000";
let text = "";
let text2 = "";
let textCol = "";
let fillCol = "";
let bacColor = "";
let radius = Math.min(res[0]/2, res[1]/2)*0.2;
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");


function getInputs(){
    res = (document.getElementById("res").value).split("x");

    canvas.width = res[0];
    canvas.height = res[1];
    radius = Math.min(res[0]/2, res[1]/2)*0.9;

    per = (document.getElementById("per").value * 0.01);
    color = document.getElementById("color").value;
    text = document.getElementById("text").value;
    text2 = document.getElementById("text2").value;
    textCol = document.getElementById("textCol").value;
    fillCol = document.getElementById("fillCol").value;
    bacColor = document.getElementById("bacColor").value;

    //console.log(res + " - " + per);
}

function renderInit(){
    getInputs();

    ctx.beginPath();
    ctx.rect(0, 0, res[0], res[1])
    ctx.fillStyle = bacColor;
    ctx.fill();

    ctx.font = radius*0.4 + "px Times New Roman";
    ctx.fillStyle = textCol;
    ctx.fillText(text, res[0]/2-ctx.measureText(text).width/2, res[1]/2);
    ctx.fillText(text2, res[0]/2-ctx.measureText(text2).width/2, res[1]/2+radius*0.3);

    ctx.beginPath();
    ctx.arc(res[0]/2, res[1]/2, radius, -0.5*Math.PI, 1.5*Math.PI);
    ctx.strokeStyle = fillCol;
    ctx.lineWidth = radius/5;
    ctx.stroke();
    
    i = 0;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function renderFrame(){
    let dP = Math.sin(i*Math.PI/frameCount);
    
    ctx.beginPath();
    ctx.arc(res[0]/2, res[1]/2, radius, -0.5*Math.PI, 2*Math.PI*per*dP-0.5*Math.PI);
    ctx.stroke();
    
    if(i > 0.1){
        ctx.beginPath();
        let x = res[0]/2 + Math.cos(2*Math.PI*per*dP-0.5*Math.PI)*radius;
        let y = res[1]/2 + Math.sin(2*Math.PI*per*dP-0.5*Math.PI)*radius;
        ctx.arc(x, y, radius/10, 0, 2*Math.PI);
        ctx.fill();
    }
}

function renderAnimation(){
    renderInit();
    renderSlow();
}
function renderSlow(){
    
    renderFrame();
    i++;
    if(i < frameCount){
        setTimeout(renderSlow, 1000/60);
    }

}

function renderGIF(){
    
    renderInit();
    
    let gif = new GIF({
        repeat: -1,
        width: parseInt(res[0]),
        height: parseInt(res[1])
    });

    while(i < frameCount){
        gif.addFrame(ctx, {delay: 1000/frameCount, copy: true});
        renderFrame();
        i++;
    }

    gif.addFrame(ctx, {delay: 1000/frameCount, copy: true});
    gif.on('finished', function(blob){
        window.open(URL.createObjectURL(blob));
    });
    gif.render();
    
}