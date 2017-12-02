class Main {

    constructor() {
        var textures = TextureManager.getInstance();
        this.key = null;
        this.lastUpdateTime = 0;
        this.acDelta = 0;
        this.roundNb = 1;
        this.maxRound = gameData.maxRound;
        this.isAnim = false;
        this.over = false;
        this.board = new Board(10, 10, 0, 0);

        this.mover = [new Mover(gameData.owner_id, 9, 9, "blue"),
                      new Mover(gameData.opponent_id, 0, 0, "red")
                     ];
        canvas.addEventListener('click', this.canvaClick.bind(this), false);



        this.player = new Player(1, "Name", true, this.mover[0], this);

        this.coins = [];

        for (var i = 0; i < 98; i++) {
            var cX, cY;
            if (this.player.isHost) {
                do {
                    cX = Math.floor(Math.random() * 10);
                    cY = Math.floor(Math.random() * 10);
                }
                while (!this.tileIsEmpty(cX, cY));
                gameData.coins.push({
                    x: cX,
                    y: cY
                });
            }
            this.coins.push(new Coin(gameData.coins[i].x, gameData.coins[i].y, textures.coin));

        }

        this.confirmButton = new Button(WIDTH / 2 - ACard.w, HEIGHT - CURRENTROUND_PADDING, 2 * (ACard.w + 5), 30, "#5a5", "Confirm", () => {});
    }

    start() {
        requestAnimFrame(this.start.bind(this));
        this.input();

        var delta = Date.now() - this.lastUpdateTime;
        if (this.acDelta > INTERVAL) {
            this.acDelta = 0;
            //Dessine un frame 
            if(!this.over)
                this.update();
            this.draw();
        } else {
            this.acDelta += delta;
        }
        this.lastUpdateTime = Date.now();


    }

    input() {}

    update() {


        this.mover.forEach(function (m) {
            m.update();
        });
        this.coins.forEach(function (c) {
            c.update();
        });

        //activation du bouton confirm
        this.confirmButton.active = this.player.isPlaying && this.player.NbSelectedCards == 2;

        gameData.roundsLeft = gameData.maxRound - (this.roundNb - 1);

        //Verif end
        if (gameData.roundsLeft <= 0) {

            var dif = gameData.owner_points - gameData.opponent_points;
            if (gameData.gameStack.length === 4 * gameData.maxRound) {
                if (!this.isAnim) {
                    playRound();

                }
            }
            else if (gameData.gameStack.length === 0 && dif != 0) {
                this.over = true;
                gameData.winner_id = dif > 0 ? gameData.owner_id : gameData.opponent_points;
            }
        }
    }

    draw() {
        CTX.fillStyle = "white";
        CTX.fillRect(0, 0, WIDTH, HEIGHT);

        this.board.draw();


        this.coins.forEach(function (c) {
            c.draw();
        });
        this.mover.forEach(function (m) {
            m.draw();
        });
        
        if(!this.over){
            this.player.displayCards();
            this.drawSelectionArea();
        }
        
        this.drawText();
        this.confirmButton.draw();

        if (this.isAnim) {
            this.drawCurrentCard(this.currentCard);
        }
        if (this.over) {
            this.drawEnd();
        }
    }



    drawText() {
        //Coins left
        CTX.font = "20px Arial";
        CTX.fillStyle = "#000000";
        CTX.textBaseline = "hanging";
        CTX.textAlign = "left";
        CTX.fillText("Coins left: " + this.coins.length, PADDING, PADDING);

        //Rounds left
        CTX.fillText("Rounds left: " + gameData.roundsLeft, PADDING, PADDING + 25);

        //Section titles
        var sectionY = HEIGHT - ACard.h - PADDING - 20;
        //Your cards
        CTX.textAlign = "center";
        CTX.fillText("Your cards", (4 * ACard.w + PADDING) / 2, sectionY);
        //Selection title
        CTX.textAlign = "center";
        CTX.fillText("Round", WIDTH / 2, sectionY - CURRENTROUND_PADDING);

        //Points title
        var midSection = HEIGHT - PADDING - ACard.h / 2,
            lastThird = WIDTH / 6 * 5;
        CTX.fillText("Points", WIDTH / 6 * 5, sectionY);


        //Points
        CTX.textAlign = "end";
        CTX.font = "50px Arial";
        CTX.textBaseline = "middle";
        CTX.fillStyle = "blue";
        CTX.fillText(gameData.owner_points, lastThird - 20, midSection);

        CTX.textAlign = "start";
        CTX.fillStyle = "green";
        CTX.fillText(gameData.opponent_points, lastThird + 20, midSection);

        CTX.font = "30px Arial";
        CTX.textAlign = "center";
        CTX.fillStyle = "black";
        CTX.fillText("vs", lastThird, midSection);
    }


    drawSelectionArea() {
        var x = WIDTH / 2 - 2 * ACard.w;
        var y = HEIGHT - PADDING - ACard.h - CURRENTROUND_PADDING;
        var selCards = this.player.selectedCards;

        for (var i = 0; i < 4 * ACard.w; i += ACard.w + 5) {
            var idx = Math.floor(i / ACard.w);
            var xpos = x + ACard.w * idx + idx * 5;

            if (this.roundNb > 1) {
                gameData.gameStack[(this.roundNb - 2) * 4 + idx].drawAt(xpos, y);

                CTX.fillStyle = "rgba(255,255,255, 0.75)";
                CTX.fillRect(xpos, y, ACard.w, ACard.h);
            }

            if (this.player.NbSelectedCards > 0) {

                var card = selCards[idx];
                if (card != undefined) {
                    card.drawAt(xpos, y);
                }
            }
            CTX.setLineDash([5, 3]);
            CTX.lineWidth = 1;
            CTX.strokeStyle = i < 2 * ACard.w ? "blue" : "green";

            CTX.strokeRect(x + i, y, ACard.w, ACard.h);
        }
    }


    canvaClick(event) {
        var x = event.pageX - canvas.offsetLeft,
            y = event.pageY - canvas.offsetTop;

        if (this.player.isPlaying && !this.over && !this.isAnim) {
            //Verif si selection de carte
            if (y >= HEIGHT - (ACard.h + PADDING) && y <= HEIGHT - PADDING && x <= 4 * ACard.w + PADDING && x >= PADDING) {
                this.player.selectionClick(x, y);
            } //sinon si bouton confirm
            else if (this.confirmButton.active && isColliding(x, y, 0, 0, this.confirmButton.x, this.confirmButton.y, this.confirmButton.w, this.confirmButton.h)) {
                this.player.isPlaying = false;
                gameData.gameStack = gameData.gameStack.concat(this.player.selectedCards);
                if (!this.player.isHost) {
                    gameData.roundsLeft--;
                }
            }
        }
    }



    drawCurrentCard(card) {
        var x = PADDING;
        var y = HEIGHT / 2;

        CTX.setLineDash([5, 3]);
        card.drawAt(x, y);

        CTX.strokeStyle = card.playerId == gameData.owner_id ? "blue" : "green";
        CTX.strokeRect(x, y, ACard.w, ACard.h);
    }


    drawEnd() {
        var txt = this.player.id == gameData.winner_id ? "You Won!" : "You lost!";
        CTX.fillStyle = "rgba(0,0,0,0.7)";
        CTX.fillRect(0, 0, WIDTH, HEIGHT);
        
        CTX.textAlign="center";
        CTX.textBaseline="middle";
        CTX.fillStyle ="white";
        CTX.fillText(txt, WIDTH/2, HEIGHT/2);

    }


    tileIsEmpty(x, y) {
        var ok = true;
        this.mover.forEach((m) => {
            if (m.gridX === x && m.gridY === y) {
                ok = false;
            }
        });

        this.coins.forEach((c) => {
            if (c.gridX === x && c.gridY === y) {
                ok = false;
            }
        });

        return ok;
    }
}
