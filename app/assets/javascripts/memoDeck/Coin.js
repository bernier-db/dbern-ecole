class Coin extends Mover {
    constructor(_gridX, _gridY, texture) {
        super(null, _gridX, _gridY, "");
        
        this.origW = 44;
        this.origH = 44;
        this.w = 22;
        this.h = 22;
        this.texture = texture;
        this.numberOfFrames = 10;
        this.frameIndex = 0;
    }

    update(){
        this.frameIndex = ++this.frameIndex % this.numberOfFrames;

    }
    
    draw() {
        //this.bounce();

        CTX.save();
        CTX.translate(WIDTH / 2, Y_OFFSET);

        this.drawShadow();
        CTX.drawImage(this.texture,
            this.frameIndex * this.origW,
            0,
            this.origW,
            this.origH,
            this.x - this.w/2,
            this.centerY-5,
            this.w,
            this.h);

        CTX.restore();
    }
}
