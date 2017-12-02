class Board {
    constructor(_h, _w, _x, _y) {
        this.h = _h;
        this.w = _w;
        this.location = {
            x: _x,
            y: _y
        }
        this.tileSet = TextureManager.getInstance().tiles;
        
    }
    
    getLocation(){return this.location;}

    draw() {
        
        CTX.save();
        // change projection to isometric view
        CTX.translate(WIDTH/2-TILE_W/2, Y_OFFSET);

        for (var y = 0; y < this.h; y++) {
            for (var x = 0; x < this.w; x++) {
                var isoCoord = isometricToScreen(x, y);
                CTX.drawImage(this.tileSet, TILE_W, 0, TILE_W, TILE_H, isoCoord.x, isoCoord.y, TILE_W, TILE_H);
            }

        }
        

        CTX.restore();
    }
}
