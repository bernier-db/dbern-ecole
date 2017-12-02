class CardManager{
    constructor(){}
    
    static pickCard(playerId){
        var distance = Math.floor(Math.random() * 4 + 2);
        var direction = Math.floor(Math.random() * 4);
        return new DirectionCard(playerId, distance, direction);
        
    }
}