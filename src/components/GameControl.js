import React from 'react';
import Board from './Board';
//import NewGameForm from './NewGameForm'
import PropTypes from "prop-types";
import { connect } from 'react-redux';

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
 

  render(){
    let currentBoard;
    if (this.props.gameState.grid != undefined){
      currentBoard = <Board grid={this.props.gameState.grid} mineCount={this.props.gameState.mineCount}/>
    }else{
      currentBoard=<div>empty</div>
    }
     
    return(
    
      <React.Fragment>
        <div>hello</div>
        {currentBoard};
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
