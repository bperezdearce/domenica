import React from 'react';
import styles from './ErrorPage.module.css';

function ErrorPage() {
  return (
    <div className={styles.title}>
        <h1>¡Error 404!</h1>
        <h2>No hay nada aquí...</h2>
    </div>
  )
}

export default ErrorPage;