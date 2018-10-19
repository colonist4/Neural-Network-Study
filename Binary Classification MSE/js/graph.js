var ctx;
window.onload = function(){
    ctx = canvas.getContext('2d');
    draw();
}

function draw(){
    ctx.scale(canvas.width, canvas.height);
    
    for(let i=0; i<data.length; i++){
        if(label[i][0])
            ctx.fillStyle = 'red';
        else
            ctx.fillStyle = 'blue';
        
        ctx.beginPath();
        ctx.arc(data[i][0], data[i][1], 0.01, 0, 2*Math.PI);
        ctx.fill();
    }
}

