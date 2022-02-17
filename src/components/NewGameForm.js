import React from "react";
import PropTypes from "prop-types";


function newGameForm(props){
  function formSubmissionHandler(event) {
    event.preventDefault();
    props.onNewGameCreation({
      w: event.target.w.value,
      h: event.target.h.value,
      mines: event.target.mines.value,
    });
  }
  return(
    <React.Fragment>
      <form onSubmit={formSubmissionHandler}>
        <input
          type='number'
          name='w'
          placeholder='W' />
          <br/>
        <input
          type='number'
          name='h'
          placeholder='H' />
          <br/>
          <input
          type='number'
          name='mines'
          placeholder='Mines' />
          <br/>
        <button type='submit'>New Game</button>
      </form>
    </React.Fragment>
  );
}

newGameForm.propTypes = {
  onNewGameCreation: PropTypes.func
}
export default newGameForm;