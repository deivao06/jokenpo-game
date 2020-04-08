export default function createMatch(){
    var state = {
        id: Math.floor(Math.random() * 10000),
        players: {},
        started: false,
        counter: 10,
        counted: false
    };

    var observers = [];

    function subscribe(observerFunction) {
        observers.push(observerFunction);
    }

    function notifyAll(object) {
        for (var observerFunction of observers){
            observerFunction(object);
        }
    }

    function setState(newState){
        Object.assign(state, newState);
        checkLenght();
    }

    function addPlayer(player){
        if (Object.keys(state.players).length < 2){
            state.players[player.id] = {
                playerName: player.name,
                playerScore: 0,
                playerOption: null,
            };

            checkLenght();

            notifyAll({
                type: 'add-player',
                id: player.id,
                name: player.name,
            });
        }
    }

    function removePlayer(player) {
        var playerId = player.id;

        delete state.players[playerId];

        checkLenght();

        notifyAll({
            type: 'remove-player',
            id: playerId
        })
    }

    function checkLenght(){
        if (Object.keys(state.players).length === 2){
            startMatch();
        }else{
            stopMatch();
        }
    }

    function startMatch() {
        state.started = true;

        var interval = setInterval(function () {
            state.counter --;
            var counted = checkCounter(interval);
            if (counted){
                checkWinner(state.players);
                startMatch();
            }
        },1000);
    }

    function stopMatch() {
        state.started = false;
        state.counter = 10;
    }

    function checkCounter(interval) {
        if (state.counter < 0){
            clearInterval(interval);
            state.counter = 10;
            return true;
        }

        return false;
    }

    function checkWinner(players) {
        for(var player1Id in players){
            var player1 = players[player1Id];

            for (var player2Id in players){
                var player2 = players[player2Id];

                if (player1 !== player2){
                    if (player1.playerOption === "paper" && player2.playerOption === "rock"
                        || player1.playerOption === "rock" && player2.playerOption === "scissor"
                        || player1.playerOption === "scissor" && player2.playerOption === "paper")
                    {
                        player1.playerScore ++;
                        player1.playerOption = null;
                        return;

                    }else if (player1.playerOption === player2.playerOption){
                        player1.playerOption = null;
                        return;
                    }

                    player2.playerScore ++;
                }
            }
        }
    }

    function setPlayerOption(object){
        var player = state.players[object.id];
        player.playerOption = object.option;
    }

    return {
        state,
        addPlayer,
        removePlayer,
        setState,
        subscribe,
        setPlayerOption
    }
}