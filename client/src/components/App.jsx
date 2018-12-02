import React from 'react';
import styles from '../scss/base.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: null,
    };
  }

  componentDidMount() {
    this.clickCell();
  }

  clickCell() {
    const { score } = this.state;
    this.setState({
      score: score + 1,
    });
  }

  render() {
    return (
      <div id={styles.main} className={styles.someClass}>
        <div className={styles.column}>
          <div className={styles.item}>Category</div>
          <div className={styles.item}>$100</div>
          <div className={styles.item}>$200</div>
          <div className={styles.item}>$300</div>
          <div className={styles.item}>$400</div>
          <div className={styles.item}>$500</div>
        </div>
        <div className={styles.column}>
          <div className={styles.item}>Category</div>
          <div className={styles.item}>$100</div>
          <div className={styles.item}>$200</div>
          <div className={styles.item}>$300</div>
          <div className={styles.item}>$400</div>
          <div className={styles.item}>$500</div>
        </div>
        <div className={styles.column}>
          <div className={styles.item}>Category</div>
          <div className={styles.item}>$100</div>
          <div className={styles.item}>$200</div>
          <div className={styles.item}>$300</div>
          <div className={styles.item}>$400</div>
          <div className={styles.item}>$500</div>
        </div>
        <div className={styles.column}>
          <div className={styles.item}>Category</div>
          <div className={styles.item}>$100</div>
          <div className={styles.item}>$200</div>
          <div className={styles.item}>$300</div>
          <div className={styles.item}>$400</div>
          <div className={styles.item}>$500</div>
        </div>
        <div className={styles.column}>
          <div className={styles.item}>Category</div>
          <div className={styles.item}>$100</div>
          <div className={styles.item}>$200</div>
          <div className={styles.item}>$300</div>
          <div className={styles.item}>$400</div>
          <div className={styles.item}>$500</div>
        </div>
        <div className={styles.column}>
          <div className={styles.item}>Category</div>
          <div className={styles.item}>$100</div>
          <div className={styles.item}>$200</div>
          <div className={styles.item}>$300</div>
          <div className={styles.item}>$400</div>
          <div className={styles.item}>$500</div>
        </div>
      </div>
    );
  }
}

export default App;
