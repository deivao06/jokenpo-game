export default function renderScreen(match, requestAnimationFrame, currentPlayer, screen){
    var canvas = screen;
    var canvasContext = canvas.getContext("2d");
    var player1 = match.state.players[currentPlayer.id];
    var player2 = null;

    for (var playerId in match.state.players){
        var player = match.state.players[playerId];

        if (player !== player1){
            player2 = player;
        }
    }

    var image1 = new Image();
    var counter = match.state.counter;
    var counterMeasure = canvasContext.measureText(counter);

    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.font = "20px Sans-serif";

    if (match.state.started){
        canvasContext.fillText(player1.playerName, 10, canvas.height - 10);
        canvasContext.fillText(`Score: ${player1.playerScore}`, 315, canvas.height - 10);

        if(player2){
            canvasContext.fillText(player2.playerName, 10, 20);
            canvasContext.fillText(`Score: ${player2.playerScore}`, 315, 20);
        }

        if (player1.playerOption){
            image1.src = `sprites/${player1.playerOption}-big.png`;
            canvasContext.drawImage(image1, (canvas.width / 2) - (image1.width / 2), canvas.height - 100, 100, 100);
        }

        canvasContext.fillText(counter, (canvas.width / 2) - (counterMeasure.width / 2), (canvas.height / 2));
    }

    if (Object.keys(match.state.players).length < 2){
        var text = "Aguardando Jogador...";
        var textMeasure = canvasContext.measureText(text);


        canvasContext.fillText(text, (canvas.width / 2) - (textMeasure.width / 2), (canvas.height / 2));
    }

    requestAnimationFrame(() => {
        renderScreen(match, requestAnimationFrame, currentPlayer, screen);
    });
}

export function createCanvas(body) {
    var bodyInnerHTML =
        "<canvas id='canvas' width='400' height='400'></canvas>" +
        "<div id='options'>" +
        "<button id='rock'><img src='sprites/rock.png'></button>" +
        "<button id='paper'><img src='sprites/paper.png'></button>" +
        "<button id='scissor'><img src='sprites/scissor.png'></button>" +
        "</div>";

    body.innerHTML = bodyInnerHTML;

    return document.getElementById("canvas");
}