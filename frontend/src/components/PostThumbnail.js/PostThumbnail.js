import React from 'react';
import imageNotAvailable from '../../assets/images/default-image.jpg'
import axiosApi from "../../axios-api";

const styles = {
    width: '100px',
    height: '100px',
    marginRight: '10px'
};

const PostThumbnail = props => {
    let image = imageNotAvailable;

    if (props.img) {
        image = axiosApi + '/uploads/' + props.img;
    }

    return <img alt="thumbnail" src={image} style={styles} className="img-thumbnail"/>;
};

export default PostThumbnail;