class CardManager{
    constructor(){}
    
    static pickCard(playerId){
        var distance = Math.floor(Math.random() * 4 + 2);
        var direction = Math.floor(Math.random() * 4);
        return new DirectionCard(playerId, distance, direction);
    }
    static getSpecific(playerId, dir, dist){
        return new DirectionCard(playerId, dist, dir);
    }
}