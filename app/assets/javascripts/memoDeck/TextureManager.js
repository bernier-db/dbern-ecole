var TextureManager = (function() {
    var instance;



    function createInstance() {
        var cardTexture = new Image();
        cardTexture.src = "images/cards.png";
        var tileset = new Image();
        tileset.src = "images/tiles.png";
        var coinTexture = new Image();
        coinTexture.src = "images/coin_sprite.png";

        instance = {
            cards: cardTexture,
            coin: coinTexture,
            tiles: tileset
        }
        return instance;
    }


    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };

})();
