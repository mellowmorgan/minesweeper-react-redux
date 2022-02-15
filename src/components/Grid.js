import React from 'react';
import Cell from './Cell'

const gridStyle = {
  display: "grid",
  gridTemplateRows: "repeat(16, 1fr)",
  gridTemplateColumns: "repeat(16, 1fr)"
};

function Grid(){
  return(
    <React.Fragment>
      {Object.values(props.grid).map((cell)=><Cell /> )}
    </React.Fragment>
  );
}
export default Grid;