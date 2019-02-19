function Tile(x, y, width) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.bomb = true;
    this.revealed = true;
}

Tile.prototype.show = function(){

    ctx.rect(this.x, this.y, this.width, this.width);
}