import React from 'react';
import pizza1 from '../../assets/pizza1.png';
import styles from './Home.module.css';

const Home = () => {
  return (
    <>
    <div className={styles.mainContainer}>
      <div className={styles.mainImg}>
        <img src={pizza1}/>
      </div>
      <div className={styles.mainText}>
        <div>Celebrando</div>
        <div>10 años de</div>
        <div>Domenica</div>
      </div>
    </div>
    </>
  );
};

export default Home;