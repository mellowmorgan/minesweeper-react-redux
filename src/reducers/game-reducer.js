export default (state = {}, action) => {
  const { w, h, mineCount, lost, won, minesPlaced,x,y, number, cellToIgnore} = action; //id is coords "X-Y"
  
  switch (action.type) {
  case 'START_GAME': //preset grid size 16x16 mineCount 40
  console.log("in start game reducer")
    return Object.assign({}, state, {
        flagsCount:0,
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
    if (!state.grid[y][x].revealed && state.minesPlaced) {
      if (!state.grid[y][x].flagged) {
        state.flagsCount++;
      } else {
        state.flagsCount--;
      }
      let selectedCell = state.grid[y][x];
      selectedCell.flagged = !selectedCell.flagged;
      state.grid[y][x] = selectedCell;
      return Object.assign({}, state);
    } else {
      return state;
    }
  case 'PLACE_MINES':
    const minesArray = placeMines(cellToIgnore, mineCount, w, h);
    let foundFirstClickedNumber;
    return Object.assign({}, state, {
      minesPlacedArray: minesArray,
      minesPlaced: true,
      grid: range(h).map((y) => range(w).map((x) => { 
         let thisCell = `cell-${x}-${y}`;
          if (minesArray.includes(thisCell)) {
      
          return {
            id: `cell-${x}-${y}`,
            x, y,
            flagged: false,
            mine: true,
            revealed: false,
            number: ""
          };
        } else {
          const num = countAdjacentMines(minesArray, x, y)
          //id of first clicked
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
    // let clickedCell = state.grid[y][x];
    // clickedCell.revealed = true;
    // state.grid[y][x] = clickedCell;
    const newState = clickHelper(state, x, y);
    return Object.assign({}, state, newState);
  // case 'REFRESH_GAME':
  //   return Object.assign({}, state, {
  //     lost:false,
  //     won:false,
  //     mineCount: mineCount,
  //     w: w,
  //     h:h,
  //     minesPlaced: false,
  //     grid: range(h).map((y) => range(w).map((x) => { 
  //       return {
  //         id: `cell-${x}-${y}`,
  //         x, y,
  //         flagged: false,
  //         mine: false,
  //         revealed: false
  //       };
  //     }))
  //   })
  case 'GAME_OVER':
    return Object.assign({}, state, {
      lost:true
    })
  default:
    return state;
  }
};

function clickHelper(state, x, y) {
  let clickedCell = state.grid[y][x];
  clickedCell.revealed = true;
  state.grid[y][x] = clickedCell;
  if (state.grid[y][x].number === 0) {
    const neighbors = getNeighbors(x, y, state); 
    neighbors.forEach((neighbor) => {
      if (!neighbor.mine && !neighbor.revealed) {
        clickHelper(state, neighbor.x, neighbor.y);
      }
    })
  }
  return state;
}

function getNeighbors(x, y, state) {
  let neighbors = [];
  if (x !== 0) {
    neighbors.push(state.grid[y][x - 1]); //left
    if (y !== 0) {
      neighbors.push(state.grid[y-1][x-1]); //down, left
    }
    if (y !== state.h - 1) {
      neighbors.push(state.grid[y + 1][x - 1]); //up, left
    }
  }
  if (x !== state.w - 1) {
    neighbors.push(state.grid[y][x + 1]); //right
    if (y !== 0) {
      neighbors.push(state.grid[y-1][x + 1]); //down, right
    }
    if (y !== state.h - 1) {
      neighbors.push(state.grid[y + 1][x + 1]); //up, right
    }
  }
  if (y !== 0) {
    neighbors.push(state.grid[y - 1][x]); //down
  }
  if (y !== state.h - 1) {
    neighbors.push(state.grid[y + 1][x]); //up
  }
  return neighbors;
}

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
      if (`cell-${x}-${y}` !== cellToIgnore.id && !mineArray.includes([y, x])) {
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


 
  