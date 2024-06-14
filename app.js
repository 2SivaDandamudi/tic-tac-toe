const cellElements = document.querySelectorAll('[data-cell]')

let circleTurn

cellElements.forEach(cell => {
    cell.addEventListener('click', handleClick, {once:true})
})

function handleClick(e) {
    const cell = e.target

    const currentCell = circleTurn ? 'circle' : 'x'
    placeMarker(cell, currentCell)

    //check for win
    //check for draw
    swapTurns()
}

function placeMarker(cell, currentCell){
    cell.classList.add(currentCell)
}

function swapTurns() {
    circleTurn = !circleTurn
}