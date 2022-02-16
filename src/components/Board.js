//our MineCount and Reset/GameStateDisplay will be in here
import React from 'react';
import Grid from './Grid';
import PropTypes from 'prop-types';
//mine-count passed as prop from GameControl
function Board(props){
  
  return(
    <React.Fragment>
   
      <div>
        <div id="mine-count">{props.mineCount}</div>
        <div id="state-display">Reset</div>
      </div>
      <Grid grid={props.grid} />
    </React.Fragment>
  );
}

Board.propTypes = {
  grid: PropTypes.array,
  mineCount: PropTypes.number
}
export default Board;