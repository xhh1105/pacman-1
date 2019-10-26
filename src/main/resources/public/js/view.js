'use strict';

//app to draw polymorphic shapes on canvas
var app;
var _COS = [1,0,-1,0];
var _SIN = [0,1,0,-1];
var time = 0;

function createApp(canvas) {
    var c = canvas.getContext("2d");
    var unit = 15;

    var drawMap = function(mapArray) {
        // 0 is wall, 1 is free space
        c.fillStyle = "black";
        c.fillRect(0,0,1200,400);
        c.strokeStyle = 'blue';
        c.lineWidth = 2;
        for (let y = 0; y < mapArray.length; y++) {
            for (let x = 0; x < mapArray[0].length; x++) {
                if (mapArray[y][x] === '0' && mapArray[y][x-1] === '1' && (mapArray[y-1][x] === '1' || mapArray[y+1][x] === '0')) {
                    c.strokeStyle = 'blue';
                    c.beginPath();
                    c.moveTo(x * unit, y * unit);
                    c.lineTo(x * unit, (y+1) * unit);
                    c.stroke();
                    c.closePath();
                }
                if (mapArray[y][x] === '0' && x - 1 > 0 && y - 1 > 0 && x + 1 < mapArray[y].length && y + 1 < mapArray.length && (mapArray[y][x-1] === '0' || mapArray[y][x-1] === '2') && mapArray[y][x+1] === '0' && mapArray[y-1][x] === '2' && mapArray[y+1][x] === '0' && (mapArray[y+1][x+1] === '1' || mapArray[y+1][x-1] === '1')) {
                    c.strokeStyle = 'blue';
                    c.beginPath();
                    c.moveTo(x * unit, y * unit);
                    c.lineTo(x * unit, (y+1) * unit);
                    c.stroke();
                    c.closePath();
                }
                if (mapArray[y][x] === "0" && x + 1 < mapArray[y].length && (mapArray[y][x+1] === "0" || mapArray[y][x+1] === "6")) {
                    if ((mapArray[y][x] ==='0' && mapArray[y][x-1] === '1' && mapArray[y+1][x] === '0' && mapArray[y-1][x] === '0')
                        || (mapArray[y][x] === '0' && x - 1 > 0 && x + 1 < mapArray[y].length && y - 1 > 0 && y + 1 < mapArray.length && mapArray[y-1][x] === '2' && mapArray[y+1][x] === '0' && mapArray[y+1][x-1] === '1')) {
                        continue;
                    }
                    c.strokeStyle = 'blue';
                    c.beginPath();
                    c.moveTo(x * unit, y * unit);
                    c.lineTo((x + 1) * unit, y * unit);
                    c.stroke();
                    c.closePath();
                }
                else if (mapArray[y][x] === "0" && y + 1 < mapArray.length && mapArray[y+1][x] === "0") {
                    if (mapArray[y][x] === '0' && y - 1 > 0 && mapArray[y-1][x] === '1' && x - 1 > 0 && x + 1 < mapArray[y].length && mapArray[y][x+1] !== '1' && mapArray[y][x-1] !== '1') {
                        continue;
                    }
                    c.strokeStyle = 'blue';
                    c.beginPath();
                    c.moveTo(x * unit, y * unit);
                    c.lineTo(x * unit, (y + 1) * unit);
                    c.stroke();
                    c.closePath();
                }
                if (mapArray[y][x] === "3" && x + 1 < mapArray[y].length && mapArray[y][x+1] === "3") {
                    c.strokeStyle = 'red';
                    c.beginPath();
                    c.moveTo(x * unit, y * unit);
                    c.lineTo((x + 1) * unit, y * unit);
                    c.stroke();
                    c.closePath();
                }
                if (mapArray[y][x] === "3" && y + 1 < mapArray.length && mapArray[y+1][x] === "3") {
                    if (mapArray[y][x] === '3' && x - 1 > 0 && y - 1 > 0 && x + 1 < mapArray[y].length && y + 1 < mapArray.length &&
                        ((mapArray[y][x-1] === '3' && mapArray[y][x+1] === '3' && mapArray[y-1][x] === '1') ||
                        mapArray[y][x+1] === '3' && mapArray[y+1][x+1] === '3')) {
                        continue;
                    }
                    c.strokeStyle = 'red';
                    c.beginPath();
                    c.moveTo(x * unit, y * unit);
                    c.lineTo(x * unit, (y + 1) * unit);
                    c.stroke();
                    c.closePath();
                }
                if (mapArray[y][x] === "4" && x + 1 < mapArray[y].length && mapArray[y][x+1] === "4") {
                    c.strokeStyle = 'yellow';
                    c.beginPath();
                    c.moveTo(x * unit, y * unit);
                    c.lineTo((x + 1) * unit, y * unit);
                    c.stroke();
                    c.closePath();
                }
                if (mapArray[y][x] === "4" && y + 1 < mapArray.length && mapArray[y+1][x] === "4") {
                    c.strokeStyle = 'yellow';
                    c.beginPath();
                    c.moveTo(x * unit, y * unit);
                    c.lineTo(x * unit, (y + 1) * unit);
                    c.stroke();
                    c.closePath();
                }
                if (mapArray[y][x] === "5" && x + 1 < mapArray[y].length && mapArray[y][x+1] === "5") {
                    c.strokeStyle = 'green';
                    c.beginPath();
                    c.moveTo(x * unit, y * unit);
                    c.lineTo((x + 1) * unit, y * unit);
                    c.stroke();
                    c.closePath();
                }
                if (mapArray[y][x] === "5" && y + 1 < mapArray.length && mapArray[y+1][x] === "5") {
                    c.strokeStyle = 'green';
                    c.beginPath();
                    c.moveTo(x * unit, y * unit);
                    c.lineTo(x * unit, (y + 1) * unit);
                    c.stroke();
                    c.closePath();
                }
                if (mapArray[y][x] === "6" && x + 1 < mapArray[y].length && (mapArray[y][x+1] === "6" || mapArray[y][x+1] === "0" )) {
                    c.strokeStyle = 'pink';
                    c.beginPath();
                    c.moveTo(x * unit, y * unit);
                    c.lineTo((x + 1) * unit, y * unit);
                    c.stroke();
                    c.closePath();
                }
                if (mapArray[y][x] === "6" && y + 1 < mapArray.length && mapArray[y+1][x] === "6") {
                    c.strokeStyle = 'pink';
                    c.beginPath();
                    c.moveTo(x * unit, y * unit);
                    c.lineTo(x * unit, (y + 1) * unit);
                    c.stroke();
                    c.closePath();
                }
            }
        }
    };

    /*
        The direction has 4 type,  right 0, down 1, left 2, up 3
     */
    var drawPacman = function(pacman) {
        let x = pacman.location.x;
        let y = pacman.location.y;
        let direction = pacman.direction
        c.fillStyle = '#FFE600';
        c.beginPath();
        c.arc(x * unit, y * unit, unit/2, (.5*direction+.20)*Math.PI,(.5*direction-.20)*Math.PI,false);
        c.lineTo(x * unit, y * unit);
        c.fill();
        c.closePath();
    };

    var drawLives = function(num) {
        let x = 0;
        let y = 18;
        let direction = 0;
        for (var i = 0; i < num; i++) {
            x += 1;
            c.fillStyle = '#FFE600';
            c.beginPath();
            c.arc(x * unit, y * unit, unit/2, (.5*direction+.20)*Math.PI,(.5*direction-.20)*Math.PI,false);
            c.lineTo(x * unit, y * unit);
            c.fill();
            c.closePath();
        }
    };

    var drawDots = function (objectsArray) {
        c.fillStyle = "#F5B5DA";
        for(let y = 0; y <objectsArray.length; y++){
            for (let x = 0; x <objectsArray[y].length; x++) {

                if (objectsArray[y][x] !== null && objectsArray[y][x].type === "dot") {

                    c.fillRect(x * unit, y * unit,3,3);
                }
            }
        }
    };

    var drawFruits = function (fruits) {
        fruits.forEach(function(fruit) {
            c.fillStyle = "#F5B5DA";

            c.beginPath();
            // c.arc(fruit.location.x, fruit.location.y,3+this.times%2,0,2*Math.PI,true);
            c.arc(fruit.location.x *  unit, fruit.location.y * unit, unit * 0.2 + time % 2 ,0,2*Math.PI,true);
            c.fill();
            c.closePath();

    })};




    var drawGhost = function(ghost) {
        let x = ghost.location.x;
        let y = ghost.location.y;
        let direction = ghost.direction;

        //draw body
        c.fillStyle = ghost.color;
        c.beginPath();
        c.arc(x* unit, y* unit, unit*.5,0,Math.PI,true);

        c.lineTo(x* unit- unit *.5, y* unit + unit *.4);
        c.quadraticCurveTo(x* unit-unit*.4,y* unit+unit*.5,x* unit-unit*.2,y* unit+unit*.3);
        c.quadraticCurveTo(x* unit,y* unit+unit*.5,x* unit+unit*.2,y* unit+unit*.3);
        c.quadraticCurveTo(x* unit+unit*.4,y* unit+unit*.5,x* unit+unit*.5,y* unit+unit*.4);

        c.fill();
        c.closePath();

        //draw eyes
        c.fillStyle = '#FFF';
        c.beginPath();
        c.arc(x * unit-unit*.15,y * unit-unit*.21,unit*.12,0,2*Math.PI,false);
        c.arc(x * unit+unit*.15,y * unit-unit*.21,unit*.12,0,2*Math.PI,false);
        c.fill();
        c.closePath();
        c.fillStyle = '#000';
        c.beginPath();
        c.arc(x * unit-unit*(.15-.04*_COS[direction]),y * unit-unit*(.21-.04*_SIN[direction]),unit*.07,0,2*Math.PI,false);
        c.arc(x * unit+unit*(.15+.04*_COS[direction]),y * unit-unit*(.21-.04*_SIN[direction]),unit*.07,0,2*Math.PI,false);
        c.fill();
        c.closePath();
    };

    var drawGhosts = function(ghosts) {
        ghosts.forEach(drawGhost);

    };



    var clear = function() {
        c.clearRect(0,0, canvas.width, canvas.height);
    };


    return {
        drawMap: drawMap,
        drawPacman: drawPacman,
        drawGhosts: drawGhosts,
        drawFruits: drawFruits,
        drawDots: drawDots,
        drawLives: drawLives,
        clear: clear,
        dims: {height: canvas.height, width: canvas.width}
    }
}



window.onload = function() {
    app = createApp(document.querySelector("canvas"));

     /*let mapArray = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
         [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
         [0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1,0],
         [0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1,0],
         [0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
         [0,0,0,0,0,0,1,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
         [0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
         [1,1,1,1,1,1,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
         [1,1,1,1,1,1,1,0,0,0,1,1,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
         [1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1],
         [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
         [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
         [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
         [0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,0],
         [0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,1,1,1,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,0],
         [0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,0],
         [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];*/

    // 000000000000000000000000000000000000000000000000000000000000
    // 011111111111111111111111111111111111111111111111111111111110
    // 010000100000000010000000000000001000000001555100000010000010
    // 010000102222222010000000000000001000000001525100000010000010
    // 011111102000000011111111111111111111111111525111111111111110
    // 000000102011111113333333144444441006660001525133333333310000
    // 000000102010000013222223142222241022222201525132222222310000
    // 111111102010002013233323142444241022222201525132222222311111
    // 111111102011102013232323142424241022222201525132333333311111
    // 111111102000002013233323142444241000000001525132311111111111
    // 000000102222222013222223142222241111111111525132333333310000
    // 000000100000000013333333144444441000000001555133333333310000
    // 011111111111111111111111111111111022222201111111111111111110
    // 010000010000000001001000000000001000000001000000010001000010
    // 010222010222222201001022222222201111001111022222010201022010
    // 010000010000000001001000000000001001001001000000010001000010
    // 011111111111111111001111111111111001111001111111111111111110
    // 000000000000000000000000000000000000000000000000000000000000
    // let ghosts = [{x: 39, y: 10, direction: 0, color: '#F00'},
    //     {x: 37, y: 10, direction: 0, color: '#F93'},
    //     {x: 35, y: 10, direction: 0, color: '#0CF'},
    //     {x: 34, y: 10, direction: 0, color: '#F9C'},
    // ];


    loadGame();

    setInterval(update, 200);

    document.addEventListener('keydown', pacmanMove, false);
};

/**
 * Create a ball at a location on the canvas
 */
function loadGame() {
    $.get("/load",  function (data) {
        console.log(data);
        app.drawMap(data.map.mapArray);
        app.drawPacman(data.pacman);
        app.drawGhosts(data.ghosts);
        app.drawFruits(data.fruits);
        app.drawDots(data.objectsMap);

        app.drawLives(3);
    }, "json");
}

/**
 *  Update the ball world
 */
function update() {
    $.get("/update", function(data) {
        time++;
        app.clear();
        app.drawMap(data.map.mapArray);
        app.drawPacman(data.pacman);
        app.drawGhosts(data.ghosts);
        app.drawFruits(data.fruits);
        app.drawDots(data.objectsMap);

        app.drawLives(3);
    }, "json");
}


/**
 *
 */
function pacmanMove(event) {
    const keyName = event.key;
    console.log(keyName);

    let direction = -1;
    switch (event.which) {
        case 39:
            // alert('right');
            direction = 0;
            break;
        case 40:
            // alert('down');
            direction = 1;
            break;
        case 37:
            // alert('left');
            direction = 2;
            break;
        case 38:
            // alert('up');
            direction = 3;
            break;
    }

    $.get("/move/" + direction, function (data) {

    }, "json");
}
/**
 * Switch strategies of some of the balls
 */
function switchStrategies(ballIndices, strategies) {
    $.post("/switch", {ballIndices: ballIndices, strategies: strategies}, function (data) {
        $("#ball-select").find('option').remove();
        var index = 0;
        data.forEach(function(ele) {
            app.drawBall(ele.loc.x, ele.loc.y, ele.radius, ele.color);
            $("#ball-select").append(new Option("#"+index + "-" + ele.color + "@(" + ele.loc.x + ", " + ele.loc.y + ")" +(ele.switchable? "switchable": "")
                , index, false, false));
            index++;
        });
    }, "json");
}

/**
 *  Remove some of the balls from the ball world
 */
function removeBalls(ballIndices) {
    // must convert the array to plain object for the ajax data
    $.get("/remove", Object.assign({}, ballIndices), function(data) {
        $("#ball-select").find('option').remove();
        var index = 0;
        data.forEach(function(ele) {
            app.drawBall(ele.loc.x, ele.loc.y, ele.radius, ele.color);
            $("#ball-select").append(new Option("#"+index + "-" + ele.color + "@(" + ele.loc.x + ", " + ele.loc.y + ")"+(ele.switchable? "switchable": "")
                , index, false, false));
            index++;
        });
    }, "json");
}
/**
 * Pass along the canvas dimensions
 */
function canvasDims() {
    $.get("/canvas", {height: app.dims.height, width: app.dims.width});
}

/**
 * Clear the canvas
 */
function clear() {
    $.get("/clear");
    $("#ball-select").find('option').remove();
    app.clear();
}