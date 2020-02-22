import React from 'react';
import './CommentCard.css';

const CommentCard = props => {
    return (
        <div className='comment-card'>
            <span><b>{props.author}</b> wrote:</span>
            <span className='message'>{props.message}</span>
            <button className='comment-button' onClick={props.remove}>Delete</button>
        </div>
    );
};

export default CommentCard;