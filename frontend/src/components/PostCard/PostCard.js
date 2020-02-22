import React from 'react';
import './PostCard.css';
import PostThumbnail from "../PostThumbnail.js/PostThumbnail";
import {Link} from "react-router-dom";

const PostCard = props => {
    return (
        <div className='post-card'>
            <PostThumbnail image={props.img}/>
            <div>
                <p className='post-card-title'>{props.title}</p>
                <div className='post-card-footer'>
                    <span className='post-card-date'>{props.datetime}</span>
                    <Link to={'/news/' + props.link}>
                        Read full post >>
                    </Link>
                </div>

                <Link className='post-card-button' to={"/news/"}>
                    Delete
                </Link>
            </div>
        </div>
    );
};

export default PostCard;