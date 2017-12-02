var game = new Main();
game.start();
/************************Temporaire pour avant intégration ****************************************************/
var opponent = new Player(2, "op", false, game.mover[1], game);

function newRound(e) {

    var cards = [
                CardManager.pickCard(opponent.id),
                CardManager.pickCard(opponent.id)
            ];

    gameData.gameStack = gameData.gameStack.concat(cards);
    game.roundNb++;
    game.player.startRound();
}

function playRound(e) {
    var idx = 0;
    game.isAnim = true;
    game.currentCard = gameData.gameStack[idx];
    var interval = setInterval(function () {
        
        if (game.mover[0].isAtDestination && game.mover[1].isAtDestination) {

            if(gameData.gameStack.length > 0 && gameData.gameStack[idx]){
                var id = gameData.gameStack[idx].playerId;

                var pl = opponent.id == id ? opponent : game.player;
                pl.character.applyCard(gameData.gameStack[idx].direction, gameData.gameStack[idx].distance)

                game.currentCard = gameData.gameStack[idx];
                
            }

            if (!game.player.charIsMoving && !opponent.charIsMoving && gameData.gameStack.length+1 == idx) {

                game.isAnim = false;
                gameData.gameStack = [];
                clearInterval(interval);
                idx=0;
            }
            else idx++;
        }

    });

}
