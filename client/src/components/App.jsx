import React from 'react';
import axios from 'axios';
import Board from './Board';
import Scores from './Scores';

import styles from '../scss/base.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstRoundScore: 0,
      secondRoundScore: 0,
      round: 'single',
      scores: [],
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
    this.reset = this.reset.bind(this);
    this.save = this.save.bind(this);
    this.previousScores = this.previousScores.bind(this);
  }

  componentDidMount() {
    console.log('ok');
  }

  clickCell(e) {
    const {
      board, round, firstRoundScore, secondRoundScore,
    } = this.state;
    const cellScore = Number(e.target.dataset.score);
    const cellX = e.target.dataset.x;
    const cellY = e.target.dataset.y;
    const newBoard = board.slice();
    const cellVal = newBoard[cellX][cellY];
    if (cellVal === 0) {
      e.target.className = `${styles.cellContent} ${styles.green}`;
      newBoard[cellX][cellY] = 1;
      if (round === 'single') {
        this.setState({
          board: newBoard,
          firstRoundScore: Number(firstRoundScore) + cellScore,
        });
      } else if (round === 'double') {
        this.setState({
          board: newBoard,
          secondRoundScore: Number(secondRoundScore) + cellScore,
        });
      }
    } else if (cellVal === 1) {
      e.target.className = `${styles.cellContent} ${styles.red}`;
      newBoard[cellX][cellY] = -1;
      if (round === 'single') {
        this.setState({
          board: newBoard,
          firstRoundScore: Number(firstRoundScore) - (2 * cellScore),
        });
      } else if (round === 'double') {
        this.setState({
          board: newBoard,
          secondRoundScore: Number(secondRoundScore) - (2 * cellScore),
        });
      }
    } else if (cellVal === -1) {
      e.target.className = `${styles.cellContent}`;
      newBoard[cellX][cellY] = 0;
      if (round === 'single') {
        this.setState({
          board: newBoard,
          firstRoundScore: Number(firstRoundScore) + cellScore,
        });
      } else if (round === 'double') {
        this.setState({
          board: newBoard,
          secondRoundScore: Number(secondRoundScore) + cellScore,
        });
      }
    }
  }

  nextRound() {
    const {
      board, firstRoundScore, secondRoundScore, round,
    } = this.state;
    const resetBoard = board.slice();
    for (let row = 0; row < resetBoard.length; row += 1) {
      for (let col = 0; col < resetBoard[row].length; col += 1) {
        resetBoard[row][col] = 0;
      }
    }
    if (round === 'single') {
      this.setState({
        firstRoundScore,
        board: resetBoard,
        round: 'double',
      });
    }
    if (round === 'double') {
      this.previousScores();
      this.setState({
        round: 'final',
        secondRoundScore,
      });
    }
  }

  reset() {
    const { board } = this.state;
    const resetBoard = board.slice();
    for (let row = 0; row < resetBoard.length; row += 1) {
      for (let col = 0; col < resetBoard[row].length; col += 1) {
        resetBoard[row][col] = 0;
      }
    }
    this.setState({
      board: resetBoard,
      firstRoundScore: 0,
      secondRoundScore: 0,
      round: 'single',
    });
  }

  save() {
    const { firstRoundScore, secondRoundScore } = this.state;
    axios({
      method: 'post',
      url: '/save',
      params: {
        firstRoundScore: firstRoundScore,
        secondRoundScore: secondRoundScore,
        date: Date.now(),
      },
    })
      .then((response) => {
        console.log(response);
        this.previousScores();
      });
  }

  previousScores() {
    this.setState({
      round: 'final',
    });
    axios.get('/scores')
      .then((response) => {
        this.setState({
          scores: response.data,
        });
      });
  }

  render() {
    const {
      board, firstRoundScore, round, secondRoundScore, scores,
    } = this.state;
    const roundScore = (
      <div>
        <Board board={board} clickCell={this.clickCell} round={round} />
        <div id={styles.round}>{round === 'single' ? 'Round: Jeopardy!' : 'Round: Double Jeopardy!'}</div>
        {round === 'double' ? (
          <div>
            <div id={styles.score}>
              First round:
              {firstRoundScore}
            </div>
            <div id={styles.score}>
              Double Jeopardy score:
              {secondRoundScore}
            </div>
          </div>
        ) : (
          <div id={styles.score}>
            Score:
            {firstRoundScore}
          </div>
        )}
        <div id={styles.next} onClick={this.nextRound} role="presentation">{round === 'single' ? 'Proceed to Double Jeopardy!' : 'Proceed to Final Jeopardy!'}</div>
        <div id={styles.reset} onClick={this.reset} role="presentation">Reset</div>
      </div>
    );
    const final = (
      <div>
        <div id={styles.score}>
          Final score:
          {firstRoundScore + secondRoundScore}
        </div>
        <div id={styles.save} onClick={this.save} role="presentation">{scores ? 'Save' : 'Save and return scores'}</div>
        <div id={styles.reset} onClick={this.reset} role="presentation">Reset</div>
        {scores ? <Scores scores={scores} /> : null}
      </div>
    );
    return (
      <div className={styles.mainDiv}>
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
