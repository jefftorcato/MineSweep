function Tile(i, j, width) {
    this.i = i;
    this.j = j
    this.x = i * width;
    this.y = j * width;
    this.width = width;
    if(Math.random() < 0.25){
        this.mine = true;
    } else {
        this.mine = false;
    }
    this.revealed = true;
    this.count = 0;
}

Tile.prototype.show = function(){
    
    ctx.rect(this.x, this.y, this.width, this.width);
    ctx.stroke();
    if(this.revealed){
        if(this.mine){
            //ctx.beginPath();
            //ctx.arc(this.x + this.width * 0.5, this.y + this.width * 0.5, this.width * 0.4, 0, 2 * Math.PI);
            //ctx.stroke();
            ctx.drawImage(img_mine, this.x + this.width * 0.25, this.y + this.width * 0.25, this.width * 0.5, this.width * 0.5);
        } else {
            //ctx.fillStyle = "#D3D3D3";
            //ctx.fill();
            //ctx.rect(this.x, this.y, this.width, this.width);
            ctx.textAlign = "center";
            ctx.font = "20px Arial";
            ctx.fillText(this.count,this.x + this.width * 0.5, this.y + this.width * 0.6);
        }
    }
    
}

Tile.prototype.countMines = function () {
    if(this.mine){
        return -1;
    }
    var total = 0;
    for(var xoff = -1; xoff <= 1; xoff++){
        for(var yoff = -1; yoff <= 1; yoff++){
            var i = this.i + xoff;
            var j = this.j + yoff;
            if(i > -1 && i < size && j > -1 && j < size){
                var neighbor = grid[i][j];
                if(neighbor.mine){
                    total++;
                }
            }
        }
    }

    this.count = total;
}

Tile.prototype.coordinates = function(x,y){

    return(x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.width);

}

Tile.prototype.reveal = function(){
    console.log("here");
    this.revealed = true;
}