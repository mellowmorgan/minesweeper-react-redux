export default (state = {}, action) => {
  const { w, h, mineCount, lost, won, minesPlaced,x,y, number, cellToIgnore} = action; //id is coords "X-Y"
  
  switch (action.type) {
  case 'START_GAME': //preset grid size 16x16 mineCount 40
    return Object.assign({}, state, {
        w: w,
        h: h,
        mineCount:mineCount,
        lost: false,
        won: false,
        minesPlaced: false,
        grid: range(h).map((y) => range(w).map((x) => { 
          return {
            id: `cell-${x}-${y}`,
            x, y,
            flagged: false,
            mine: false,
            revealed: false
          };
        }))
    });
  case 'TOGGLE_FLAG':
    let selectedCell = state.grid[y][x];
    selectedCell.flagged = !selectedCell.flagged;
    state.grid[y][x] = selectedCell;
    return state;
  case 'PLACE_MINES':
    const minesArray = placeMines(cellToIgnore, mineCount, w, h);
    return Object.assign({}, state, {
      minesPlacedArray: minesArray,
      minesPlaced: true,
      grid: range(h).map((y) => range(w).map((x) => { 
         let thisCell = `cell-${x}-${y}`;
         //if cell exists and if cell is adjacnt to a mine in mineArray then number is ++ isAdjacent(minesArray, cellx,celly)
          if (minesArray.includes(thisCell)) {
      
          return {
            id: `cell-${x}-${y}`,
            x, y,
            flagged: false,
            mine: true,
            revealed: false
          };
        } else {
          const num = countAdjacentMines(minesArray, x, y)
          return {
            id: `cell-${x}-${y}`,
            x, y,
            flagged: false,
            number: num,
            mine: false,
            revealed: false
          };
        }
    }))

  });
  case 'CELL_CLICKED':
    return Object.assign({}, state, {
      revealed: true
    });
  case 'REFRESH_GAME':
    return Object.assign({}, state, {
      lost:false,
      won:false,
      mineCount: mineCount,
      w: w,
      h:h,
      minesPlaced: false,
      grid: range(h).map((y) => range(w).map((x) => { 
        return {
          id: `cell-${x}-${y}`,
          x, y,
          flagged: false,
          mine: false,
          revealed: false
        };
      }))
    })
  case 'GAME_OVER':
    return Object.assign({}, state, {
      lost:true
    })
  default:
    return state;
  }
};


function countAdjacentMines(mineArr, cellX, cellY){
  let adjacentCounter=0;
  mineArr.forEach((mine)=>{
    const coords = mine.substring(5).split("-")
    const x = parseInt(coords[0]);
    const y = parseInt(coords[1]);
    if ((x+1===cellX && y+1===cellY) || (x+1===cellX && y===cellY) || (x+1===cellX && y-1===cellY) || (x===cellX && y-1===cellY) || (x===cellX && y+1===cellY) || (x-1 === cellX && y===cellY) || (x-1===cellX && y-1===cellY) || (x-1===cellX && y+1===cellY)) {
      adjacentCounter+=1
    }
  });
  return adjacentCounter;
}



function placeMines(cellToIgnore, mineCount, w, h) {
  let mineArray = []
  do {
    let x = Math.floor(Math.random()* h);
    let y = Math.floor(Math.random()* w);
      if (`cell-${x}-${y}` != cellToIgnore.id && !mineArray.includes([y, x])) {
        // mineArray.push([y, x]);
        mineArray.push(`cell-${x}-${y}`);
      }

  } while (mineArray.length < mineCount);
  return mineArray; 
}

function range(num) {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(i);
  }
  return arr;
}


 
  