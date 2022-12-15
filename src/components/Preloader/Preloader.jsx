import React from 'react';
import preloader from '../../accets/loading-gif.gif'
import styles from './Preloader.module.css'

const Preloader = () => {
    return (
        <div className={styles.preloader}>
            <img src={preloader} className={styles.preloader}/>
        </div>
    );
};

export default Preloader;