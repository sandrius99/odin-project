const board = (() => {
    let squares = Array(9).fill("") ;
    const populateBoard = () => {
        for(let i=0; i<9; i++){
        let div = document.createElement('div');
        div.classList.add("square");
        div.id = i;
        
        document.querySelector(".board").appendChild(div);
    }

}

return {populateBoard, squares}
})();

const displayController = (() => {
    let filledDivs = 0
    const start = () => {
            document.getElementById("start").style.display = "none";
            document.getElementById("stop").style.display = "inline";
            document.querySelectorAll(".square").forEach(div => {
                div.classList.add("game")
                div.addEventListener("click", function x()  {
                    // e.preventDefault();
                    clickDiv( div)
                });
            });
            let input1 = document.getElementById("player1");
            let input2 = document.getElementById("player2");
            if(input1.value == "")
            input1.value = "Player 1";
            if(input2.value == "")
            input2.value = "Player 2";
            player1 = Player(input1.value);
            player2 = Player(input2.value);
            input1.readOnly=true;
            input2.readOnly=true;
            

    }

    const clickDiv = (  div) => {
        if(div.classList.contains("checked"))
            return;
        div.classList.add("checked");
        div.classList.remove("game");
        let value = giveValue();
        div.innerText = value;
        board.squares[div.id] = value;
        filledDivs++;
        if(filledDivs > 2)
        checkBoardState(board.squares);
    };

    let _value = 0;
    const giveValue = () => {
        if(_value === 0){
            _value++;
            return "X";
        }
        else {
            _value--;
            return "O";
        }

    }

    const winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2]
    ]
    

    const checkBoardState = (squares) => {
       
        for(let i=0; i<winCombos.length; i++){
            if((squares[winCombos[i][0]] === squares[winCombos[i][1]] && squares[winCombos[i][0]] === squares[winCombos[i][2]]) && 
            squares[winCombos[i][0]] !== '' && squares[winCombos[i][1]] !== '' && squares[winCombos[i][0]] !== ''){
                checkWinner(squares[winCombos[i][0]])
            }
        }

        if(filledDivs === 9){
            clearBoard();
            filledDivs = 0;
            return
        }
            
    };

    const clearBoard = () => {
        document.querySelectorAll(".square").forEach(div => {
            div.classList.remove("checked");
            div.classList.add("game");
            board.squares[div.id] = '';
            div.innerText = '';

        });
    };

    const checkWinner = (sign) => {
        const winner = sign === "X" ? player1 : player2;
        winner.addWin();
        document.getElementById(sign).innerText = winner.getScore()
        if(winner.getScore() === 5){
        let div = document.createElement("div");
        div.classList.add("gameWinner");
        div.innerText = winner.name + " is a winner!"
        document.querySelector(".content").prepend(div);
        document.querySelectorAll(".game").forEach(div => {div.classList.add("checked")});
        
        }
        else {
            clearBoard()
            filledDivs = 0;
        }

    
    }
    const restart = () => {
        player1.nullifyScore();
        player2.nullifyScore();
        document.getElementById("O").innerText = 0;
        document.getElementById("X").innerText = 0;
        clearBoard();

    };

    const stop = () => {
        document.getElementById("start").style.display = "inline";
        document.getElementById("stop").style.display = "none";
        clearBoard();
        player1 = {};
        player2 = {};
        document.getElementById("O").innerText = 0;
        document.getElementById("X").innerText = 0;
        document.getElementById("player1").readOnly = false;
        document.getElementById("player2").readOnly = false;

    };
   

    return {start, restart, stop};
})();

const Player = (name) => {
    let score = 0;
    addWin = () => score++;
    getScore = () => score;
    nullifyScore = () => score = 0;
    return {name, addWin, getScore, nullifyScore};
};

board.populateBoard();
let player1;
let player2;


document.getElementById("start").addEventListener('click', (e) => {
    e.preventDefault();
    displayController.start();
})

document.getElementById("restart").addEventListener('click', (e) => {
e.preventDefault();
displayController.restart();
});

document.getElementById("stop").addEventListener('click', (e) => {
    e.preventDefault();
    displayController.stop();
});