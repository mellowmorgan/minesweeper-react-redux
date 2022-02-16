export default (state = {}, action) => {
  const { w, h, mineCount, lost, won, minesPlaced,x,y, cellToIgnore} = action; //id is coords "X-Y"
  
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
        //  let thisCell = [y, x];
         let thisCell = `cell-${x}-${y}`;
         
        // if (isInArray(minesArray, thisCell)){
          if (minesArray.includes(thisCell)) {
      
          return {
            id: `cell-${x}-${y}`,
            x, y,
            flagged: false,
            mine: true,
            revealed: false
          };
        } else {
          
          return {
            id: `cell-${x}-${y}`,
            x, y,
            flagged: false,
            mine: false,
            revealed: false
          };
        }
    }))
  });
  // case 'GAME_OVER':
  default:
    return state;
  }
};


// function isInArray(minesArr,cell){
//   let bigResult = false;
//   minesArr.forEach((e) =>{
//     let result = e.length === cell.length &&
//     e.every(function (element) {
//     return cell.includes(element);
//   });
//     if (result){
//       bigResult=true; 
//     }
//   });
//   if (bigResult){return true;}
//   else{return false;}
// }

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
  return mineArray; // [[1, 4], [2, 5]]
}

function range(num) {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(i);
  }
  return arr;
}

// return {
//   id: `cell-${x}-${y}`,
//   x, y,
//   flagged: false,
//   mine: false,
//   revealed: false

 
  