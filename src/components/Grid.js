import React from 'react';
import Cell from './Cell'
import PropTypes from 'prop-types';



function getGridStyle(length) {
  return (
    {
      display: "grid",
      gridTemplateRows: `repeat(${length}, 26px)`,
      gridTemplateColumns: `repeat(${length}, 26px)`,
      width: "50vw",
      gridColumnGap: "1px",
      gridRowGap: "1px"
    }
  );
}



function Grid(props){

  return(
    <React.Fragment>
      <div style={getGridStyle(props.grid.length)}>
        {props.grid.map((row) => {
          return row.map((cell)=> {return <Cell rightClickHandler={props.rightClickHandler} cell={cell} />});
        })}
      </div>
    </React.Fragment>
  );
}
Grid.propTypes = {
  grid: PropTypes.array,
  rightClickHandler: PropTypes.func
}
export default Grid;