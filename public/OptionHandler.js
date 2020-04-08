export default function createOptionHandler(state, socket){
    var rock = document.getElementById("rock");
    var paper = document.getElementById("paper");
    var scissor = document.getElementById("scissor");

    var statePlayer = state.players[socket.id];

    if (statePlayer){
        rock.addEventListener("click", function () {
            statePlayer.playerOption = 'rock';
        });

        paper.addEventListener("click", function () {
            statePlayer.playerOption = 'paper';
        });

        scissor.addEventListener("click", function () {
            statePlayer.playerOption = 'scissor';
        })
    }
}