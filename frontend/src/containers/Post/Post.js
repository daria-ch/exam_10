import React, {Component, Fragment} from 'react';
import {fetchSinglePost} from "../../store/actions/newsActions";
import {connect} from "react-redux";
import './Post.css';
import {fetchComments} from "../../store/actions/commentsActions";
import CommentCard from "../../components/CommentCard/CommentCard";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";

class Post extends Component {

    state = {
        author: '',
        message: ''
    };

    componentDidMount() {
        this.props.getPost(this.props.match.params.id);
        this.props.getComments(this.props.match.params.id);
    }


    submitFormHandler = async event => {
        event.preventDefault();

        const comment = {
            author: this.state.author,
            message: this.state.message

        };
        // await this.props.addComment(comment);
        this.setState({author: '', message: ''});
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };


    render() {
        let post = null;
        let comments = null;

        if (this.props.comments.length > 0) {
            comments = this.props.comments.map(comment => (
                <CommentCard
                    key={comment.id}
                    author={comment.author}
                    message={comment.message}
                />
            ));
        } else {
            comments = <div>No comments</div>;
        }

        if (this.props.post) {
            post = (
                <Fragment>
                    <div className='full-post'>
                        <h1>{this.props.post.title}</h1>
                        <span>{this.props.post.datetime}</span>
                        <p>{this.props.post.text}</p>
                    </div>
                    <div>
                        <h3>Comments</h3>
                        {comments}
                    </div>
                    <div className='comment-form'>
                        <h3>Add Comment</h3>
                        <Form onSubmit={this.submitFormHandler}>
                            <FormGroup style={{marginBottom: 0}}>
                                <Label for="author" className='author'>Author</Label>
                                <Input type="text" name='author' id="author" placeholder="Anonymous"
                                       autoComplete='off'
                                       value={this.state.author}
                                       onChange={this.inputChangeHandler}/>
                            </FormGroup>
                            <FormGroup style={{marginBottom: 0}}>
                                <Label for="message" className='comment'>Comment</Label>
                                <Input type="textarea" name="message" id="message" required
                                       value={this.state.message}
                                       onChange={this.inputChangeHandler}/>
                            </FormGroup>
                            <Button>Add</Button>
                        </Form>
                    </div>
                </Fragment>
            );
        } else {
            post = (
                <h1>Post does not exist</h1>
            )
        }
        return (
            <div>
                {post}
            </div>
        );

    }
}

const mapStateToProps = state => ({
    post: state.news.post,
    comments: state.comments.comments
});

const mapDispatchToProps = dispatch => ({
    getPost: id => dispatch(fetchSinglePost(id)),
    getComments: (id) => dispatch(fetchComments(id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Post);