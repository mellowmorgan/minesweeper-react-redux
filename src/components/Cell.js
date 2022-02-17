import React from 'react';
import PropTypes from "prop-types";

const mineStyle = {
  backgroundImage: "url('http://old.no/icon/entertainment/mini-mine.gif')",
  backgroundColor: "red",
  backgroundRepeat:"no-repeat",
  backgroundPosition:"center",
  backgroundSize:"70% 70%"
};

const cellStyle = {
  backgroundColor: "#c0c0c0",
  borderLeft: "1px solid #FFF",
  borderTop: "1px solid #FFF",
  borderRight: "1px solid #6e6e6e",
  borderBottom: "1px solid #6e6e6e",
  width: "25px",
  height: "25px",
  textAlign: "center",
  paddingTop: "2px",
  paddingBottom: "2px"
};
const cellRevealedStyle = {
  backgroundColor: "darkgray"
}

const flagStyle = {
  backgroundImage: "url('https://dougx.net/sweeper/flag.png')",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "70% 70%"
};

function getStyle(cell, gameOver) {
  if (cell.flagged) {
    console.log("true");
    return {...cellStyle, ...flagStyle};
  } 
  else if (cell.mine && (cell.revealed || gameOver)) {
    return {...cellStyle, ...mineStyle};
  } else if (cell.revealed) {
    return {...cellStyle, ...cellRevealedStyle};
  }
  else {
    return cellStyle;
  }
}

function Cell(props){      
  return(
    <React.Fragment>
      <div className="cell" id={props.cell.id} onClick={() => props.leftClickHandler(props.cell)} onContextMenu={(e) => (e.preventDefault(), props.rightClickHandler(props.cell.x, props.cell.y, props.cell.id))} style={getStyle(props.cell, props.gameOver)}>{props.cell.revealed && props.cell.number>0 ? props.cell.number : ""}</div>
    </React.Fragment>
  );
}

Cell.propTypes = {
  gameOver: PropTypes.bool,
  cell: PropTypes.object,
  rightClickHandler: PropTypes.func,
  leftClickHandler: PropTypes.func,
  gameOver: PropTypes.bool
}

export default Cell;
