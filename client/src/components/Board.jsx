import React from 'react';
import PropTypes from 'prop-types';
import Column from './Column';
import styles from '../scss/base.scss';

const Board = ({ board, round, clickCell }) => {
  const columns = [];
  for (let i = 0; i < 6; i += 1) {
    columns.push(<Column board={board} round={round} clickCell={clickCell} y={i} key={i} />);
  }
  return (
    <div id={styles.main}>
      { columns }
    </div>
  );
};

Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.array),
  round: PropTypes.string,
  clickCell: PropTypes.func,
};

Board.defaultProps = {
  board: [],
  round: 'single',
  clickCell: () => {},
};

export default Board;
