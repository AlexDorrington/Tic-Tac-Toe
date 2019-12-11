const player1ScoreText = document.getElementById('player1Score')
const player2ScoreText = document.getElementById('player2Score')
const playerHeader1 = document.getElementById('playerHeader1')
const playerHeader2 = document.getElementById('playerHeader2')
const restartGameBtn = document.getElementById('restartGameBtn')
const gameBoard = document.querySelector('.container')
const winnerText = document.getElementById('displayWinner')

restartGameBtn.addEventListener('click', () => {
    resetGame()
})



//CREATE PLAYERS AND STORE SCORE
class Players {
    constructor(name, symbol) {
        this.name = name;
        this.symbol = symbol
    }
}
class User extends Players {
    constructor(name, symbol) {
        super(name, symbol)
    }
    score = 0
}
class Computer extends Players {
    constructor(name, symbol) {
        super(name, symbol)
    }
    score = 0
}

const player1 = new User('Player1', 'X')
const player2 = new Computer('Player2', 'O')



//HOLD GAME FLOW DETAILS
const myGameBoard = {
    board: [],
    player1Turn: true,
    decidePlayer() {
        if (this.player1Turn) {
            this.player1Turn = !this.player1Turn
        } else {
            this.player1Turn = !this.player1Turn
        }
    },
    listenOnGrid(board) {
        for (let grid of board) {
            grid.addEventListener('click', ({target}) => {
                if (target.innerHTML !== '') {
                    return
                }
                const gridPosition = myGameBoard.board.findIndex((grid) => {
                    return grid[0] === target
                })
                this.markPositionOnGrid(gridPosition, target)
                this.decidePlayer()
            })
        }
    },
    markPositionOnGrid(position, target) {
        let symbol;
        if (this.player1Turn) {
            myGameBoard.board[position].push(
                symbol = player1.symbol
            )
            target.innerHTML = player1.symbol
            playerHeader1.style.color = 'red'
            playerHeader2.style.color = 'green'
            symbol = player1.symbol
        } else {
            myGameBoard.board[position].push(
                symbol = player2.symbol
            )
            target.innerHTML = player2.symbol
            playerHeader1.style.color = 'green'
            playerHeader2.style.color = 'red'
            symbol = player2.symbol
        }
        this.checkWon(symbol)
    },
    checkWon(playerSymbol) {
        if (this.board[0][1] === playerSymbol && this.board[1][1] === playerSymbol && this.board[2][1] === playerSymbol) {
            this.declareWinner(playerSymbol, ({name}) => {
                winnerText.innerHTML = `Well done ${name}, you won`
            })
        } else if (this.board[3][1] === playerSymbol && this.board[4][1] === playerSymbol && this.board[5][1] === playerSymbol) {
            this.declareWinner(playerSymbol, ({name}) => {
                winnerText.innerHTML = `Well done ${name}, you won`
            })
        } else if (this.board[7][1] === playerSymbol && this.board[7][1] === playerSymbol && this.board[8][1] === playerSymbol) {
            this.declareWinner(playerSymbol, ({name}) => {
                winnerText.innerHTML = `Well done ${name}, you won`
            })
        } else if (this.board[0][1] === playerSymbol && this.board[3][1] === playerSymbol && this.board[6][1] === playerSymbol) {
            this.declareWinner(playerSymbol, ({name}) => {
                winnerText.innerHTML = `Well done ${name}, you won`
            })
        } else if (this.board[1][1] === playerSymbol && this.board[4][1] === playerSymbol && this.board[7][1] === playerSymbol) {
            this.declareWinner(playerSymbol, ({name}) => {
                winnerText.innerHTML = `Well done ${name}, you won`
            })
        } else if (this.board[2][1] === playerSymbol && this.board[5][1] === playerSymbol && this.board[8][1] === playerSymbol) {
            this.declareWinner(playerSymbol, ({name}) => {
                winnerText.innerHTML = `Well done ${name}, you won`
            })
        } else if (this.board[0][1] === playerSymbol && this.board[4][1] === playerSymbol && this.board[8][1] === playerSymbol) {
            this.declareWinner(playerSymbol, ({name}) => {
                winnerText.innerHTML = `Well done ${name}, you won`
            })
        } else if (this.board[2][1] === playerSymbol && this.board[7][1] === playerSymbol && this.board[6][1] === playerSymbol) {
            this.declareWinner(playerSymbol, ({name}) => {
                winnerText.innerHTML = `Well done ${name}, you won`
            })
        }
    },
    declareWinner(playerSymbol, callback) {
        if (playerSymbol === player1.symbol) {
            this.updateGameDom(player1) 
            return callback(player1)
        }
        this.updateGameDom(player2)
        return callback(player2)
    },
    updateGameDom({name}) {
        gameBoard.style.display = 'none'
        winnerText.style.display = 'block'
        restartGameBtn.classList.add('active')
        player1.symbol = ''
        player2.symbol = ''
        if (name === player1.name) {
            player1.score++
            player1ScoreText.innerHTML = player1.score
        } else {
            player2.score++
            player2ScoreText.innerHTML = player2.score
        }
    }
}



//START GAME
const startGame = () => {
    playerHeader1.style.color = 'green'
    playerHeader2.style.color = 'red'
    const getGrids = document.querySelectorAll('.gridItem')
    const AllGrids = Array.from(getGrids)
    for (let i = 0; i < AllGrids.length; i++) {
        myGameBoard.board.push([
            AllGrids[i]
        ])
    }
    myGameBoard.listenOnGrid(AllGrids)
}



//END GAME
resetGame = () => {
    winnerText.style.display = 'none'
    gameBoard.style.display = 'grid'
    restartGameBtn.classList.remove('active')
    player1.symbol = 'X'
    player2.symbol = 'O'
    const getGrids = document.querySelectorAll('.gridItem')
    const AllGrids = Array.from(getGrids)
    myGameBoard.board = []
    for (let grid of AllGrids) {
        grid.innerHTML = ''
    }
    myGameBoard.player1Turn = true;
    startGame()
}


//CALL ON INITIAL LOAD
startGame()




