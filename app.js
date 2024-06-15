const cellElements = document.querySelectorAll('[data-cell]')
const board = document.querySelector('.board')
const winningMessage = document.querySelector('.winning-message')
const dataWinningMessage = document.querySelector('[data-winning-msg]')
const restart = document.querySelector('.restart')

const winCombination = [
    [0, 1, 2], 
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let circleTurn


startGame()

restart.addEventListener('click', startGame)


function startGame(){
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove('x', 'circle')
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once:true})
    })
    setHover()
    winningMessage.classList.remove('show')
}

function handleClick(e) {
    const cell = e.target

    const currentClass = circleTurn ? 'circle' : 'x'
    placeMarker(cell, currentClass)

    if (checkWin(currentClass)){
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else{
        swapTurns()
        setHover()
    }   
}

function endGame(draw){
    if (draw){
        dataWinningMessage.innerText = 'Draw'
    }else{
        dataWinningMessage.innerText = `${circleTurn ? "O's" : "X's"} Wins!!`
    }
    winningMessage.classList.add('show')
}

function placeMarker(cell, currentCell){
    cell.classList.add(currentCell)
}

function swapTurns() {
    circleTurn = !circleTurn
}

function setHover(){
    board.classList.remove('x' , 'circle')

    if (circleTurn){
        board.classList.add('circle')
    }else{
        board.classList.add('x')
    }

}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('circle')
    })
}

function checkWin(currentClass){
   return winCombination.some(combination => {
    return combination.every(index => {
        return cellElements[index].classList.contains(currentClass)
    })
   })
}

