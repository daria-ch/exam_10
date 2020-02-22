import React, {Component, Fragment} from 'react';
import {fetchSinglePost} from "../../store/actions/newsActions";
import {connect} from "react-redux";
import './Post.css';
import {deleteComment, fetchComments, postComment} from "../../store/actions/commentsActions";
import CommentCard from "../../components/CommentCard/CommentCard";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";

class Post extends Component {

    state = {
        author: '',
        message: '',
        post_id: ''
    };

    componentDidMount() {
        this.props.getPost(this.props.match.params.id);
        this.props.getComments(this.props.match.params.id);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.props.getComments(this.props.match.params.id);
        }
    }

    submitFormHandler = event => {
        event.preventDefault();

        const comment = {
            author: this.state.author,
            message: this.state.message,
            post_id: this.props.match.params.id
        };
        this.props.postComment(comment);
        this.setState({author: '', message: '', post_id: ''});
    };

    valueChanged = (event) => this.setState({[event.target.name]: event.target.value});

    render() {
        let post = null;
        let comments = null;

        if (this.props.comments.length > 0) {
            comments = this.props.comments.map(comment => (
                <CommentCard
                    key={comment.id}
                    author={comment.author}
                    message={comment.message}
                    remove={() => this.props.deleteComment(comment.id)}
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
                        <span>{this.props.post.date}</span>
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
                                       onChange={this.valueChanged}/>
                            </FormGroup>
                            <FormGroup style={{marginBottom: 0}}>
                                <Label for="message" className='comment'>Comment</Label>
                                <Input type="textarea" name="message" id="message" required
                                       value={this.state.message}
                                       onChange={this.valueChanged}/>
                            </FormGroup>
                            <Button style={{margin: '10px 0'}}>Add</Button>
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
    postComment: (comment) => dispatch(postComment(comment)),
    deleteComment: (id) => dispatch(deleteComment(id))
});


export default connect(mapStateToProps, mapDispatchToProps)(Post);