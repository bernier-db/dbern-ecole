class ACard{
    constructor(playerId){
        this.texture = TextureManager.getInstance().cards;        
        this.x;
        this.sprite_x;
        this.sprite_y;
        this.playerId = playerId;
        this.y = HEIGHT - ACard.h;
        this.selected = false;
        this.selectionOrder = 0;
        
        
    }   
    
    toggleSelect(){
        this.selected = !this.selected;
    }
    select(order){
        this.selected = true;
        this.selectionOrder = order;
    }
    unselect(){
        this.selected = false;
        this.selectionOrder = 0;
    }
    
    drawAt(x,y){
        CTX.drawImage(this.texture, this.sprite_x, this.sprite_y, ACard.origW, ACard.origH, x, y, ACard.w, ACard.h);
    }
    
    static drawInactive(x, y){
        CTX.setLineDash([1,0]);
        CTX.strokeStyle = "black";
        CTX.fillStyle = "lightgrey";
        CTX.fillRect(x, y, ACard.w, ACard.h);
        CTX.strokeRect(x, y, ACard.w, ACard.h);
    }
}

ACard.w = 81*0.7;
ACard.h = 107*0.7;
ACard.origH = 107;
ACard.origW = 81;