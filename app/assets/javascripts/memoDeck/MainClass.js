class Main {

    constructor() {
        let textures = TextureManager.getInstance();
        this.key = null;
        this.lastUpdateTime = 0;
        this.acDelta = 0;
       // this.roundNb = gameData.maxRound - gameData.roundsLeft;
        this.maxRound = gameData.maxRound;
        this.isAnim = false;
        this.over = false;
        this.board = new Board(10, 10, 0, 0);
        this.currentCard = null;
        this.mover = [new Mover(gameData.owner_id, 9, 9, "blue"),
            new Mover(gameData.opponent_id, 0, 0, "red")
        ];
        if (canvas === undefined)
            canvas = document.getElementById("game");
        canvas.addEventListener('click', this.canvaClick.bind(this), false);


        this.player = new Player(user_id, "Name", isHost, isHost ? this.mover[0] : this.mover[1], this);

        this.coins = [];
        let length = gameData.coins.length > 0 ? gameData.coins.length : 10;
        let initiating = (!gameData.coins || gameData.coins.length === 0 && gameData.roundsLeft === gameData.maxRound);
        for (let i = 0; i < length; i++) {
            let cX,
                cY;
            if (initiating) {
                if (this.player.isHost) {
                    //find available place
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
            } else {
                cX = gameData.coins[i].x;
                cY = gameData.coins[i].y;
            }
            this.coins.push(new Coin(gameData.coins[i].x, gameData.coins[i].y, textures.coin));
        }
        if (initiating) {
            this.updateData((res) => {
                console.log(res);
            });
        }

        this.confirmButton = new Button(WIDTH / 2 - ACard.w, HEIGHT - CURRENTROUND_PADDING, 2 * (ACard.w + 5), 30, "#5a5", "Confirm", () => {
        });
        this.startWaiting();
    }

    start() {
        if(gameData.coins != undefined)
            requestAnimFrame(this.start.bind(this));
        this.input();

        let delta = Date.now() - this.lastUpdateTime;
        if (this.acDelta > INTERVAL) {
            this.acDelta = 0;
            //Dessine un frame 
            if (!this.over)
                this.update();
            this.draw();
        } else {
            this.acDelta += delta;
        }
        this.lastUpdateTime = Date.now();
    }

    input() {
    }

    update() {
        this.mover.forEach(function (m) {
            m.update();
        });
        this.coins.forEach(function (c) {
            c.update();
        });

        //activation du bouton confirm
        this.confirmButton.active = this.player.isPlaying && this.player.NbSelectedCards === 2;

        //gameData.roundsLeft = gameData.maxRound - (this.roundNb - 1);

        //Verif end
        if (gameData.roundsLeft <= 0) {

            let dif = gameData.owner_points - gameData.opponent_points;
            if (gameData.gameStack.length === 4 * gameData.maxRound) {
                if (!this.isAnim) {
                    playRound();
                }
            }
            else if (gameData.gameStack.length === 0 && dif !== 0) {
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

        if (!this.over) {
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
        let sectionY = HEIGHT - ACard.h - PADDING - 20;
        //Your cards
        CTX.textAlign = "center";
        CTX.fillText("Your cards", (4 * ACard.w + PADDING) / 2, sectionY);
        //Selection title
        CTX.textAlign = "center";
        CTX.fillText("Round", WIDTH / 2, sectionY - CURRENTROUND_PADDING);

        //Points title
        let midSection = HEIGHT - PADDING - ACard.h / 2,
            lastThird = WIDTH / 6 * 5;
        CTX.fillText("Points", WIDTH / 6 * 5, sectionY);


        //Points
        CTX.textAlign = "end";
        CTX.font = "50px Arial";
        CTX.textBaseline = "middle";
        CTX.fillStyle = "blue";
        CTX.fillText(gameData.owner_points, lastThird - 20, midSection);

        CTX.textAlign = "start";
        CTX.fillStyle = "red";
        CTX.fillText(gameData.opponent_points, lastThird + 20, midSection);

        CTX.font = "30px Arial";
        CTX.textAlign = "center";
        CTX.fillStyle = "black";
        CTX.fillText("vs", lastThird, midSection);
    }


    drawSelectionArea() {
        let x = WIDTH / 2 - 2 * ACard.w;
        let y = HEIGHT - PADDING - ACard.h - CURRENTROUND_PADDING;
        let selCards = this.player.selectedCards;

        for (let i = 0; i < 4 * ACard.w; i += ACard.w + 5) {
            let idx = Math.floor(i / ACard.w);
            let xpos = x + ACard.w * idx + idx * 5;
            let difRound = gameData.maxRound - gameData.roundsLeft;
            if (isHost && difRound > 0) {

                gameStack[(difRound - 1) * 4 + idx].drawAt(xpos, y);
                CTX.fillStyle = "rgba(255,255,255, 0.75)";
                CTX.fillRect(xpos, y, ACard.w, ACard.h);
            }
            else if (!isHost && gameStack.length > 0 && idx < 2) {
                let cd = gameStack[(difRound) * 4 + idx];
                if(cd)
                    cd.drawAt(xpos, y);
                CTX.fillStyle = "rgba(255,255,255, 0.5)";
                CTX.fillRect(xpos, y, ACard.w, ACard.h);
            }

            //Dessiner cartes sélectionnées
            if (this.player.NbSelectedCards > 0) {

                let card = selCards[idx];
                if (card !== undefined) {
                    xpos = isHost ? xpos : xpos + 2 * ACard.w + 2 * 5;
                    card.drawAt(xpos, y);
                }
            }
            CTX.setLineDash([5, 3]);
            CTX.lineWidth = 1;
            CTX.strokeStyle = i < 2 * ACard.w ? "blue" : "red";

            CTX.strokeRect(x + i, y, ACard.w, ACard.h);
        }
    }


    canvaClick(evt) {
        let rect = canvas.getBoundingClientRect();

        let x = evt.clientX - rect.left, y = evt.clientY - rect.top;

        if (this.player.isPlaying && !this.over && !this.isAnim) {
            //Verif si selection de carte
            if (y >= HEIGHT - (ACard.h + PADDING) && y <= HEIGHT - PADDING && x <= 4 * ACard.w + PADDING && x >= PADDING) {
                this.player.selectionClick(x, y);
            } //sinon si bouton confirm
            else if (this.confirmButton.active && isColliding(x, y, 0, 0, this.confirmButton.x, this.confirmButton.y, this.confirmButton.w, this.confirmButton.h)) {
                this.player.isPlaying = false;
                gameStack = gameStack.concat(this.player.selectedCards);
                let cards = this.player.selectedCards;
                for (let i = 0; i < 2; i++)
                    gameData.gameStack.push({playerId: user_id, dir: cards[i].direction, dist: cards[i].distance});

                this.updateData((res) => {
                    if (res.ok) this.startWaiting()
                });
            }
        }
    }


    drawCurrentCard(card) {
        let x = PADDING;
        let y = HEIGHT / 2;

        CTX.setLineDash([5, 3]);
        card.drawAt(x, y);

        CTX.strokeStyle = card.playerId === gameData.owner_id ? "blue" : "red";
        CTX.strokeRect(x, y, ACard.w, ACard.h);
    }


    drawEnd() {
        let txt = this.player.id === gameData.winner_id ? "You Won!" : "You lost!";
        CTX.fillStyle = "rgba(0,0,0,0.7)";
        CTX.fillRect(0, 0, WIDTH, HEIGHT);

        CTX.textAlign = "center";
        CTX.textBaseline = "middle";
        CTX.fillStyle = "white";
        CTX.fillText(txt, WIDTH / 2, HEIGHT / 2);

    }


    tileIsEmpty(x, y) {
        let ok = true;
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


    updateData(callback) {
        if(!isHost)
            gameData.roundsLeft-=1;
        $.ajax({
            method: "post",
            url: '/games/updateGameData/',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-CSRF-Token', auth)
            },
            data: {
                joustId: joustId,
                gameData: JSON.stringify(gameData),
            },
            success: callback
        });
    }

    startWaiting() {
        interval = setInterval(function () {
            $.ajax({
                method: "get",
                url: "/games/isItMyTurn/" + joustId,
                success: function (res) {
                    console.log("checking...");
                    if (res.ok) {
                        if (res.myTurn) { //C'EST MON TOUR!!!!
                            console.log("YEAH!");
                            let data = JSON.parse(res.gameData);
                            clearInterval(interval);
                            gameData = data;
                            this.mover[0].playerId = res.owner_id;
                            this.mover[1].playerId = res.opponent_id;
                            //this.roundNb = gameData.maxRound - data.roundsLeft;

                            for (let i = 0; i < data.gameStack.length; i++) {
                                let card = data.gameStack[i];
                                gameStack[i] = CardManager.getSpecific(card.playerId, card.dist, card.dir);
                            }
                            this.player.startRound();
                        }
                        console.log("no...");
                    }
                }.bind(this)
            })
        }.bind(this), 2000);
    }
}

