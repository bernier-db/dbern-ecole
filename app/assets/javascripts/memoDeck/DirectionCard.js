class DirectionCard extends ACard {
    constructor(playerId, distance, direction){
        super(playerId);
        
        this.distance = distance;
        //0: N, 1: S, 2: W, 3: E
        this.direction = direction;
        this.sprite_x = this.direction * ACard.origW,
        this.sprite_y = (this.distance-2) * ACard.origH;
    }
    
    
    draw(pos) {
        this.x = pos * ACard.w;
        
        
        CTX.drawImage(this.texture, this.sprite_x, this.sprite_y, ACard.origW, ACard.origH, this.x+PADDING, this.y-PADDING, ACard.w, ACard.h);
        
        if(this.selected){
            CTX.beginPath();
            CTX.strokeStyle = "blue";
            CTX.lineWidth = 2;
            CTX.setLineDash([1,0]);
            CTX.rect(this.x+1+PADDING, this.y-PADDING, ACard.w-2, ACard.h);
            CTX.stroke();
            CTX.closePath();
        }
    }
    
    
}