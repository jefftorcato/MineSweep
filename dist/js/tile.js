function Tile(x, y, width) {
    this.x = x;
    this.y = y;
    this.width = width;
    if(Math.random() < 0.5){
        this.bomb = true;
    } else {
        this.bomb = false;
    }
    
    this.revealed = false;
}

Tile.prototype.show = function(){
    
    ctx.rect(this.x, this.y, this.width, this.width);
    ctx.stroke();
    if(this.revealed){
        if(this.bomb){
            ctx.beginPath();
            ctx.arc(this.x + this.width * 0.5, this.y + this.width * 0.5, this.width * 0.4, 0, 2 * Math.PI);
            ctx.stroke();
        } else {
            ctx.fillStyle = "#D3D3D3";
            ctx.fill();
            ctx.rect(this.x, this.y, this.width, this.width);
            
        }
    }
    
}

Tile.prototype.coordinates = function(x,y){

    return(x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.width);

}

Tile.prototype.reveal = function(){
    console.log("here");
    this.revealed = true;
}