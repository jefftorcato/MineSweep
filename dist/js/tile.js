function Tile(i, j, width) {
    this.i = i;
    this.j = j
    this.x = i * width;
    this.y = j * width;
    this.width = width;
    this.mine = false;
    this.revealed = false;
    this.flagged = false;
    this.count = 0;
}

Tile.prototype.show = function () {

    if (this.revealed) {  //If revealed is set to true
        if (this.mine) {
            //ctx.beginPath();
            //ctx.arc(this.x + this.width * 0.5, this.y + this.width * 0.5, this.width * 0.4, 0, 2 * Math.PI);
            //ctx.stroke();
            ctx.drawImage(img_mine, this.x + this.width * 0.25, this.y + this.width * 0.25, this.width * 0.5, this.width * 0.5);
        } else {
            //ctx.drawImage(img_sqr, this.x, this.y, this.width, this.width);
            ctx.clearRect(this.x, this.y, this.width, this.width);
            if (this.count > 0) {
                ctx.fillStyle = "black";
                ctx.textAlign = "center";
                ctx.font = "bold 20px Arial";
                ctx.fillText(this.count, this.x + this.width * 0.5, this.y + this.width * 0.6);
            }
            ctx.rect(this.x, this.y, this.width, this.width);
            ctx.stroke();
        }
    } else if (!this.revealed && !this.flagged) {
        //console.log("here");
        //ctx.clearRect(this.x, this.y, this.width, this.width);
        //ctx.rect(this.x, this.y, this.width, this.width);
        //ctx.stroke();
        ctx.drawImage(img_closed,this.x,this.y,this.width,this.width);
    } else if (!this.revealed && this.flagged) {
        ctx.drawImage(img_flag, this.x + this.width * 0.25, this.y + this.width * 0.25, this.width * 0.5, this.width * 0.5);
    }

}

Tile.prototype.countMines = function () {
    if (this.mine) {
        this.count = -1;
        return;
    }
    var total = 0;
    for (var xoff = -1; xoff <= 1; xoff++) {
        for (var yoff = -1; yoff <= 1; yoff++) {
            var i = this.i + xoff;
            var j = this.j + yoff;
            if (i > -1 && i < size && j > -1 && j < size) {
                var neighbor = grid[i][j];
                if (neighbor.mine) {
                    total++;
                }
            }
        }
    }

    this.count = total;
}

Tile.prototype.coordinates = function (x, y) {

    return (x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.width);

}

Tile.prototype.reveal = function () {
    //console.log("here");
    if(!this.flagged){ // If tile is flagged don't reveal
        this.revealed = true;
        if (this.count == 0) {
            this.floodFill();
        }
    }
}

Tile.prototype.floodFill = function () {
    //console.log("here");
    for (var xoff = -1; xoff <= 1; xoff++) {
        for (var yoff = -1; yoff <= 1; yoff++) {
            //console.log("xoff: " + xoff + " yoff: " + yoff);
            var i = this.i + xoff;
            var j = this.j + yoff;
            if (i > -1 && i < size && j > -1 && j < size) {
                var neighbor = grid[i][j];
                if (!neighbor.mine && !neighbor.revealed) {
                    neighbor.reveal();
                    neighbor.show();
                }
            }
        }
    }
}

Tile.prototype.markFlag = function () {
    if(!this.revealed) {
        if (this.flagged) {
            if(this.mine) {
                mines_flagged--;
            }
            this.flagged = false;
            flag_count++;
            this.show();
        } else if(!this.flagged && flag_count > 0) {
            if(this.mine) {
                mines_flagged++;
            }
            this.flagged = true;
            flag_count--;
            this.show();
        }else{
            alert("No more flags remaining!");
        }
    }
}