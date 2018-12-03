import React from 'react';
import styles from '../scss/base.scss';

const Cell = ({ board, val, clickCell, x, y }) => {
  let cellStyle = styles.cellContent;
  if (board[x][y] === 1) {
    cellStyle = `${styles.cellContent} ${styles.green}`;
  } else if (board[x][y] === -1) {
    cellStyle = `${styles.cellContent} ${styles.red}`;
  } else {
    cellStyle = `${styles.cellContent}`;
  }
  return val === 'Category' ? (
    <div className={styles.cell}>
      <div className={styles.cellContent}>
        {val.toString()}
      </div>
    </div>
  ) : (
    <div className={styles.cell}>
      <div className={cellStyle} data-x={x} data-y={y} data-score={val} onClick={clickCell} role="presentation">
        $
        {val.toString()}
      </div>
    </div>
  );
};

export default Cell;
