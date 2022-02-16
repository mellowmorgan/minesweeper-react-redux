import React from 'react';
import Cell from './Cell'
import PropTypes from 'prop-types';

const gridStyle = {
  display: "grid",
  gridTemplateRows: "repeat(16, 1fr)",
  gridTemplateColumns: "repeat(16, 1fr)"
};

const cellStyle = {
  background: "#c0c0c0",
  borderLeft: "1px solid #FFF",
  borderTop: "1px solid #FFF",
  borderRight: "1px solid #6e6e6e",
  borderBottom: "1px solid #6e6e6e",
  width: "25px",
  height: "25px"
};

function Grid(props){
  return(
    <React.Fragment>
      <div style={gridStyle}>
        {props.grid.map((row) => {
          return row.map((cell)=> {return <div style={cellStyle}><Cell cell={cell} /> </div>});
        })}
      </div>
    </React.Fragment>
  );
}
Grid.propTypes = {
  grid: PropTypes.array
}
export default Grid;