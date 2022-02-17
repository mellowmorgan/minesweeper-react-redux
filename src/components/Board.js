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
        <div onClick={props.refresh} id="state-display">{props.display}</div>
      </div>
      <Grid leftClickHandler={props.leftClickHandler} rightClickHandler={props.rightClickHandler} grid={props.grid} />
    </React.Fragment>
  );
}

Board.propTypes = {
  grid: PropTypes.array,
  mineCount: PropTypes.number,
  rightClickHandler: PropTypes.func,
  leftClickHandler: PropTypes.func,
  display: PropTypes.string,
  refresh: PropTypes.func,
  
}
export default Board;