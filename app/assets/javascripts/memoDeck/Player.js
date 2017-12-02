class Player {
    constructor(id, name, isHost, character, game) {

        this.isHost = isHost;
        this.name = game;
        this.character = character;
        this.points = 0;
        this.game = game;
        this.cards = [];
        this.selectedCards = [];
        this.isPlaying = isHost ? true : false;
        this.id = id;
        this.pickCards();

    }

    pickCards(){
        for (var i = 0; i < 4; i++) {
            this.cards[i] = CardManager.pickCard(this.id);
        }
    }
    
    get Cards() {
        return this.cards;
    }
    get NbSelectedCards() {
        var nb = 0;
        for (var i = 0; i < 2; i++) {
            if (this.selectedCards[i] !== undefined) nb++;
        }
        return nb;
    }
    get SelectedCards() {
        return this.selectCard;
    }
    toggleIsPlaying() {
        this.isPlaying = !this.isPlaging;
    }
    
   get charIsMoving(){
       return this.character.isMoving;
   }

    selectCard(idx) {
        this.cards[idx].selected = true;
        if (this.selectedCards[0] == undefined)
            this.selectedCards[0] = this.cards[idx];
        else this.selectedCards[1] = this.cards[idx];
    }
    unselectCard(idx) {
        this.cards[idx].selected = false;
        if (this.selectedCards[0] == this.cards[idx])
            this.selectedCards[0] = undefined;
        else this.selectedCards[1] = undefined;
    }

    win() {}


    displayCards() {
        if (this.isPlaying)
            this.cards.forEach(function (c, idx) {
                c.draw(idx);
            });
        else
            for (var i = 0; i < 4; i++) {
                ACard.drawInactive(i * ACard.w + PADDING, HEIGHT - (PADDING + ACard.h));
            }
    }

    selectionClick(x, y) {
        var selected = Math.floor((x - PADDING) / ACard.w);
        var isSelected = this.cards[selected].selected;

        if (isSelected) this.unselectCard(selected);
        else if (this.NbSelectedCards < 2) this.selectCard(selected);
    }
    
    startRound(){
        this.isPlaying = true;
        this.pickCards();
        this.selectedCards =[];
    }
}
