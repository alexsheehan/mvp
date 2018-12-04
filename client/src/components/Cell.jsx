import React from 'react';
import PropTypes from 'prop-types';
import styles from '../scss/base.scss';

const Cell = ({
  board, val, clickCell, x, y,
}) => {
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

Cell.propTypes = {
  board: PropTypes.arrayOf(PropTypes.array),
  val: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  clickCell: PropTypes.func,
  x: PropTypes.number,
  y: PropTypes.number,
};

Cell.defaultProps = {
  board: [],
  val: 0,
  clickCell: () => {},
  x: 0,
  y: 0,
};


export default Cell;
