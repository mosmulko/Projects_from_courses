import React from 'react';

const PlayNumber = props => (
  <button
    className="number"
    style={{ backgroundColor: colors[props.status]}}
    onClick={() => props.onClick(props.num, props.status)}>
    {props.num}
  </button>
)

// Color Theme
const colors = {
  available: 'lightgray',
  used: 'lightgreen',
  wrong: 'lightcoral',
  candidate: 'deepskyblue',
};

export default PlayNumber;