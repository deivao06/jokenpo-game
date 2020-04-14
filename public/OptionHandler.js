export default function createOptionHandler(state, socket){
    var rock = document.getElementById("rock");
    var paper = document.getElementById("paper");
    var scissor = document.getElementById("scissor");

    var statePlayer = state.players[socket.id];

    if (statePlayer){
        rock.addEventListener("click", function () {
            socket.emit('set-player-option', 'rock');
        });

        paper.addEventListener("click", function () {
            socket.emit('set-player-option', 'paper');
        });

        scissor.addEventListener("click", function () {
            socket.emit('set-player-option', 'scissor');
        })
    }
}