const canvas = document.getElementById("game");
const CTX = canvas.getContext("2d");

const HEIGHT = canvas.height;
const WIDTH = canvas.width;
const BOARD_W = 10;
const BOARD_H =10;
const TILE_H = 48;
const TILE_SURFACE_H = 32;
const TILE_W = 64;
const INTERVAL = 30;
const Y_OFFSET = 50;
const PADDING = 20;
const CURRENTROUND_PADDING = 80;

var gameData = {
    owner_id:1,
    opponent_id: 2,
    gameStack: new Array(0),
    winner_id: 0,    
    owner_points: 0,
    opponent_points: 0,
    maxRound: 3,
    roundsLeft: 3,
    coins: []
};

function isometricToScreen(x, y){
    var _x = (x - y) * TILE_W/2;
    var _y = (x + y) * TILE_SURFACE_H/2;
    return {x:_x, y:_y};
}

function screenToIsometric(x, y){
   var _x = (x / (TILE_W/2) + y / (TILE_SURFACE_H/2)) /2;
var _y = (y / (TILE_SURFACE_H/2) - x / (TILE_W/2)) /2;
    return {x:Math.round( _x * 10 ) / 10, y:Math.round( _y * 10 ) / 10}
}

function isColliding(x1,y1,w1,h1,x2,y2,w2,h2){
    return (
        x1 < x2+w2 && x1+w1 >x2 && 
       y1 < y2+h2 && y1+h1 > y2
    );
    
}
window.requestAnimFrame = (function(){
			return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function( callback ){
				window.setTimeout(callback, 1000 / 60);
			};
			// apply to our window global to avoid illegal invocations (it's a native)
			return function (callback, element) {
				func.apply(window, [callback, element]);
			};
		})();
function map(value, start1, stop1, start2, stop2) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}



