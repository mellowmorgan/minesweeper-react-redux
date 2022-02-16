import React from 'react';
import PropTypes from "prop-types";
function Cell(props){
  return(
    <React.Fragment>
      <p></p>
    </React.Fragment>
  );
}
Cell.propTypes = {
  cell: PropTypes.object
}
export default Cell;
