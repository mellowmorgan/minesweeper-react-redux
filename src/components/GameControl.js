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
    
    if (!this.props.gameState.grid[y][x].flagged){
      document.getElementById(cellId).style.removeProperty("background-image");
      document.getElementById(cellId).style.removeProperty("background-repeat");
      document.getElementById(cellId).style.removeProperty("background-position");
      document.getElementById(cellId).style.removePropery("background-size");
    }
    else{
      document.getElementById(cellId).style.backgroundImage = "url('https://dougx.net/sweeper/flag.png')";
      document.getElementById(cellId).style.backgroundRepeat="no-repeat";
      document.getElementById(cellId).style.backgroundPosition="center";
      document.getElementById(cellId).style.backgroundSize="70% 70%";
    }
    
  }

  render(){
    let currentBoard;
    if (this.props.gameState.grid !== undefined){
      currentBoard = <Board rightClickHandler={this.rightClickHandler} grid={this.props.gameState.grid} mineCount={this.props.gameState.mineCount}/>
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
