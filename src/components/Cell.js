import React from 'react';
import PropTypes from "prop-types";


const cellStyle = {
  background: "#c0c0c0",
  borderLeft: "1px solid #FFF",
  borderTop: "1px solid #FFF",
  borderRight: "1px solid #6e6e6e",
  borderBottom: "1px solid #6e6e6e",
  width: "25px",
  height: "25px"
};

const flagStyle = {
  //backgroundImage: "url('https://dougx.net/sweeper/flag.png')"
};

function getStyle(isFlagged) {
  if (isFlagged) {
    console.log("true");
    return {...cellStyle, ...flagStyle};
  } else {
    return cellStyle;
  }
}

function Cell(props){      
  return(
    <React.Fragment>
      <div id={props.cell.id} onClick={() => props.leftClickHandler(props.cell)} onContextMenu={(e) => (e.preventDefault(), props.rightClickHandler(props.cell.x, props.cell.y, props.cell.id))} style={getStyle(props.cell.flagged)}></div>
    </React.Fragment>
  );
}

Cell.propTypes = {
  cell: PropTypes.object,
  rightClickHandler: PropTypes.func,
  leftClickHandler: PropTypes.func
}

export default Cell;
