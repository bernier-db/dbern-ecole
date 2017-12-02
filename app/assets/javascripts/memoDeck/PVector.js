class PVector{
    constructor(x, y){
        this.x = x || 0;
        this.y = y || 0;
    }

    
    mag(){
        var mag = Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2));    
        return mag;
    }
    
    limit(l){
        var mag = this.mag();
        if(mag > l){
            this.normalize();
            this.mult(l);
        }
    }
    
    normalize(){
        var mag = this.mag();
        if (mag !== 0){
            this.x /= mag;
            this.y /= mag;
        }
    }
    
    add(vec){
        this.x += vec.x;
        this.y += vec.y;
    }
    
    mult(mul){
        if(typeof(mul) == "number"){
            this.x *= mul;
            this.y *= mul;
        }
        else throw Error("Type received in mult not a number");
    }
    
    sub(num){
        this.x -= vec.x;
        this.y -= vec.y;
    }
    
    static staticSub(v1, v2){
        return new PVector(v1.x-v2.x, v1.y-v2.y);
    }
}