//our MineCount and Reset/GameStateDisplay will be in here
import React from 'react';
import Grid from './Grid';
import PropTypes from 'prop-types';
//mine-count passed as prop from GameControl

const refreshStyle = {
  border: "1px black solid"
};

function Board(props){

  return(
    <React.Fragment>
   
      <div>
        <div id="mine-count">{props.mineCount - props.flagsCount}</div>
        <div onClick={props.refresh} id="state-display" style={refreshStyle}>{props.display}</div>
      </div>
      <Grid gameOver={props.gameOver} leftClickHandler={props.leftClickHandler} rightClickHandler={props.rightClickHandler} grid={props.grid} />
    </React.Fragment>
  );
}

Board.propTypes = {
  gameOver: PropTypes.bool,
  grid: PropTypes.array,
  mineCount: PropTypes.number,
  rightClickHandler: PropTypes.func,
  leftClickHandler: PropTypes.func,
  display: PropTypes.string,
  refresh: PropTypes.func,
  flagsCount: PropTypes.number
  
}
export default Board;