import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styles from '../scss/base.scss';

const Scores = ({ scores }) => {
  let allScores;
  if (scores.length > 0) {
    allScores = scores.map((score, i) => {
      return (
        <div className={styles.scoreItem} key={i}>
          <div>Scores</div>
          <div className={styles.scoreDate}>
            Date: {moment(score.date).format('LLL')}
          </div>
          <div className={styles.firstRoundScore}>
            Jeopardy! Round: {score.firstRoundScore}
          </div>
          <div className={styles.secondRoundScore}>
            Double Jeopardy! Round: {score.secondRoundScore}
          </div>
          <div className={styles.secondRoundScore}>
            Final Score: {score.firstRoundScore + score.secondRoundScore}
          </div>
        </div>
      );
    });
  }
  return (
    <div id={styles.scores}>
      {allScores}
    </div>
  );
};

Scores.propTypes = {
  scores: PropTypes.arrayOf(PropTypes.array),
};

Scores.defaultProps = {
  scores: [],
};

export default Scores;
