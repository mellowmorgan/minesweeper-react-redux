//our MineCount and Reset/GameStateDisplay will be in here
import React from 'react';
import Grid from './Grid';
//mine-count passed as prop from GameControl
function Board(){
  return(
    <React.Fragment>
      <div>
        <div id="mine-count">16</div>
        <div id="state-display">Reset</div>
      </div>
      <Grid />
    </React.Fragment>
  );
}
export default Board;