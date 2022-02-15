import React from 'react';
import Board from './Board';
import NewGameForm from './NewGameForm'
//handClickCell for cells will live here and be passed down as props function
class GameControl extends React.Component{
  render(){
    return(
      <React.Fragment>
        <Board />
        <NewGameForm />
      </React.Fragment>

    );
  }
}
export default GameControl;
