/************************Temporaire pour avant intégration ****************************************************/

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
    game.currentCard = gameStack[idx];
    var interval = setInterval(function () {
        
        if (game.mover[0].isAtDestination && game.mover[1].isAtDestination) {

            if(gameStack.length > 0 && gameStack[idx]){
                let id = gameStack[idx].playerId;
                let mover = gameData.opponent_id == id ? game.mover[1] : game.mover[0];

                mover.applyCard(gameStack[idx].direction, gameStack[idx].distance);

                game.currentCard = gameStack[idx];
                
            }

            if (!game.mover[0].isMoving && !game.mover[1].isMoving && gameStack.length+1 == idx) {

                game.isAnim = false;
                gameData.gameStack = [];
                gameStack = [];
                clearInterval(interval);
                idx=0;
            }
            else idx++;
        }

    });

}
