class Button{
    constructor(x, y, w, h, color = "#888888", text = "Button", onlick){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.text = text;
        this.active = false;
        this.onClick = onclick;
        this.color = color;
    }
    
    manageClick(){
        if(this.active)
            this.onClick();
    }
    
    activate(){}
    
    draw(){
        CTX.fillStyle = this.active ? this.color : "lightgrey";
        CTX.fillRect(this.x, this.y, this.w, this.h);
        
        CTX.font = "20px Arial";
        CTX.textAlign = "center";
        CTX.fillStyle = this.active ? "black" : "darkgrey";
        CTX.fillText(this.text, this.x + this.w/2, this.y+this.h/2, this.w);
    }
}