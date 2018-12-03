import React from 'react';
import Board from './Board';
import styles from '../scss/base.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      firstRoundScore: 0,
      round: 'single',
      board: [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ],
    };
    this.clickCell = this.clickCell.bind(this);
    this.nextRound = this.nextRound.bind(this);
  }

  componentDidMount() {
    console.log('ok');
  }

  clickCell(e) {
    const { score, board } = this.state;
    const cellScore = Number(e.target.dataset.score);
    console.log(cellScore, Number(score));
    const cellX = e.target.dataset.x;
    const cellY = e.target.dataset.y;
    const newBoard = board.slice();
    const cellVal = newBoard[cellX][cellY];
    console.log(cellVal);
    if (cellVal === 0) {
      e.target.className = `${styles.cellContent} ${styles.green}`;
      newBoard[cellX][cellY] = 1;
      this.setState({
        board: newBoard,
        score: Number(score) + cellScore,
      });
    } else if (cellVal === 1) {
      e.target.className = `${styles.cellContent} ${styles.red}`;
      newBoard[cellX][cellY] = -1;
      this.setState({
        board: newBoard,
        score: Number(score) - (2 * cellScore),
      });
    } else if (cellVal === -1) {
      e.target.className = `${styles.cellContent}`;
      newBoard[cellX][cellY] = 0;
      this.setState({
        board: newBoard,
        score: Number(score) + cellScore,
      });
    }
  }

  nextRound() {
    const {
      board, firstRoundScore, score, round,
    } = this.state;
    const resetBoard = board.slice();
    for (let row = 0; row < resetBoard.length; row += 1) {
      for (let col = 0; col < resetBoard[row].length; col += 1) {
        resetBoard[row][col] = 0;
      }
    }
    if (round === 'single') {
      this.setState({
        firstRoundScore: score,
        board: resetBoard,
        round: 'double',
        score: 0,
      });
    }
    if (round === 'double') {
      this.setState({
        round: 'final',
        score: firstRoundScore + score,
      });
    }
  }

  render() {
    const {
      board, firstRoundScore, round, score,
    } = this.state;
    const roundScore = (
      <div>
        <div id={styles.round}>{round === 'single' ? 'Jeopardy!' : 'Double Jeopardy!'}</div>
        {round === 'double' ? (
          <div>
            <div id={styles.score}>
              First round:
              {firstRoundScore}
            </div>
            <div id={styles.score}>
              Double Jeopardy score:
              {score}
            </div>
          </div>
        ) : (
          <div id={styles.score}>
            Score:
            {score}
          </div>
        )}
        <div id={styles.next} onClick={this.nextRound} role="presentation">{round === 'single' ? 'Proceed to Double Jeopardy!' : 'Proceed to Final Jeopardy!'}</div>
      </div>

    );
    const final = (
      <div>
        <div id={styles.round}>Final Jeopardy!</div>
        <div id={styles.score}>
          Final score:
          {score}
        </div>
        <div id={styles.save}>Save</div>
        <div id={styles.reset}>Reset</div>
      </div>
    );
    return (
      <div>
        <Board board={board} clickCell={this.clickCell} round={round} />
        {round === 'final' ? (
          final
        ) : (
          roundScore
        )}
      </div>
    );
  }
}

export default App;
