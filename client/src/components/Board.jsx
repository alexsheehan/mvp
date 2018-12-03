import React from 'react';
import Column from './Column';
import styles from '../scss/base.scss';

const Board = ({ board, round, clickCell }) => {
  const columns = [];
  for (let i = 0; i < 6; i += 1) {
    columns.push(<Column board={board} round={round} clickCell={clickCell} y={i} />);
  }
  return (
    <div id={styles.main} className={styles.someClass}>
      { columns }
    </div>
  );
};

export default Board;
