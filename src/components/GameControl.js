import React from 'react';
import Board from './Board';
//import NewGameForm from './NewGameForm'
import PropTypes from "prop-types";
import { connect } from 'react-redux';
const flagStyle = {
  //backgroundImage: "url('https://dougx.net/sweeper/flag.png')"
};
//handClickCell for cells will live here and be passed down as props function


class GameControl extends React.Component{

  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    const action = {
      type: 'START_GAME',
      w: 16,
      h: 16,
      mineCount:40
    }
    dispatch(action);
  } 
  
  refreshHandler = () => {
    const { dispatch } = this.props;
    const action = {
      type: 'START_GAME',
      w: this.props.gameState.w,
      h: this.props.gameState.h,
      mineCount:this.props.gameState.mineCount
    }
    dispatch(action);
  }

  leftClickHandler = (cellClicked) => {
    const { dispatch } = this.props;
    if (!this.props.gameState.minesPlaced && (!cellClicked.flagged)){
      const action = {
        type: 'PLACE_MINES',
        cellToIgnore: cellClicked,
        mineCount: this.props.gameState.mineCount,
        w:this.props.gameState.w,
        h:this.props.gameState.h
      }
      dispatch(action);
      if(!cellClicked.flagged){
      const action2 = {
        type: 'CELL_CLICKED',
        x: cellClicked.x,
        y: cellClicked.y
      }
      dispatch(action2);

    }}
    else{
      if (cellClicked.mine){

        const action = {
        type: 'GAME_OVER'
      }
      dispatch(action);
      }
      else if (!cellClicked.flagged){
      const action = {
        type: 'CELL_CLICKED',
        x: cellClicked.x,
        y: cellClicked.y
      }
      dispatch(action);
      }
    }
  }
  
  rightClickHandler = (x, y, cellId) => {
    const { dispatch } = this.props;
    // e.preventDefault();
    //alert("right click works")
    
    const action = {
      type: 'TOGGLE_FLAG',
      x: x,
      y: y
    }
    dispatch(action);
    
    // if (!this.props.gameState.grid[y][x].flagged){
    //   document.getElementById(cellId).style.removeProperty("background-image");
    //   document.getElementById(cellId).style.removeProperty("background-repeat");
    //   document.getElementById(cellId).style.removeProperty("background-position");
    // }
    // else{
    //   document.getElementById(cellId).style.backgroundImage = "url('https://dougx.net/sweeper/flag.png')";
    //   document.getElementById(cellId).style.backgroundRepeat="no-repeat";
    //   document.getElementById(cellId).style.backgroundPosition="center";
    //   document.getElementById(cellId).style.backgroundSize="70% 70%";
    // }
    
  }

  render(){
    
    let currentBoard;
    let display;
    
    if (this.props.gameState.lost){
      display = "You R A Loser"
    }
    else if(this.props.gameState.won){
      display = "You R A Winner"
    }
    else{
     display = "Reset";
    }

    if (this.props.gameState.grid !== undefined){
      currentBoard = (
        <Board 
          refresh={this.refreshHandler} 
          display={display} 
          flagsCount={this.props.gameState.flagsCount}
          disabled={this.props.gameState.lost} 
          leftClickHandler={this.leftClickHandler} 
          rightClickHandler={this.rightClickHandler} 
          grid={this.props.gameState.grid} 
          mineCount={this.props.gameState.mineCount}
          gameOver={this.props.gameState.lost}
        />)
    }else{
      currentBoard=<div>empty</div>
    }
     
    return(
    
      <React.Fragment>
        {currentBoard}
        {/* <NewGameForm /> */}
      </React.Fragment>

    );
  }
} 

GameControl.propTypes = {
  gameState: PropTypes.object
}

const mapStateToProps = state =>{
  return{
    gameState: state
  }
}

GameControl = connect(mapStateToProps)(GameControl);

export default GameControl;
