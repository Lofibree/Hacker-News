import React from 'react';
import styles from './NestedComments.module.css'

const NestedComment = ({nestedComments}) => {
    return (
        <div className={styles.nestedItem}>
            <h3>{nestedComments.by}</h3>
            <div>{nestedComments.text}</div>
        </div>
    );
};

export default NestedComment;