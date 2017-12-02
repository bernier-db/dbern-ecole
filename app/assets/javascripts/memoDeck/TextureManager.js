var TextureManager = (function() {
    var instance;



    function createInstance() {
        var cardTexture = new Image();
        cardTexture.src = "/assets/memoDeck/cards.png";
        var tileset = new Image();
        tileset.src = "/assets/memoDeck/tiles.png";
        var coinTexture = new Image();
        coinTexture.src = "/assets/memoDeck/coin_sprite.png";

        instance = {
            cards: cardTexture,
            coin: coinTexture,
            tiles: tileset
        };
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
