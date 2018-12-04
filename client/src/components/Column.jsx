import React from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';
import styles from '../scss/base.scss';

const Column = ({
  board, round, clickCell, y,
}) => {
  const cellsJ = ['Category', 200, 400, 600, 800, 1000];
  const cellsDoubleJ = ['Category', 400, 800, 1200, 1600, 2000];
  const columnJ = cellsJ.map((el, i) => (
    /* eslint-disable-next-line */
    <Cell board={board} val={el} key={i} x={i} y={y} clickCell={clickCell} />
  ));
  const columnDoubleJ = cellsDoubleJ.map((el, i) => (
    /* eslint-disable-next-line */
    <Cell board={board} val={el} key={i} x={i} y={y} clickCell={clickCell} />
  ));
  return (
    <div className={styles.column}>
      {round === 'single' ? columnJ : columnDoubleJ}
    </div>
  );
};

Column.propTypes = {
  board: PropTypes.arrayOf(PropTypes.array),
  round: PropTypes.string,
  clickCell: PropTypes.func,
  y: PropTypes.number,
};

Column.defaultProps = {
  board: [],
  round: 'single',
  clickCell: () => {},
  y: 0,
};


export default Column;
