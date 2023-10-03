import React from 'react';
import styles from './chat.module.css'


export const Chat = ({items = []}) => {
    const elements = items?.map(({id, type, username, message}) => {
        const className = type === 'you' ? styles.youMessage : styles.userMessage;
        const sender = type === 'you' ? 'You' : username;

        return <p key={id} className={className}>{sender}: {message}</p>
    })
    return (
        <div className={styles.chat}>
            {elements}
        </div>
    );
};
