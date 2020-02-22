import React, {Component, Fragment} from 'react';
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";
import './NewPost.css';
import {postNews} from "../../store/actions/newsActions";
import {connect} from "react-redux";

class NewPost extends Component {
    inputKey = '';

    state = {
        title: '',
        text: '',
        image: ''
    };

    submitFormHandler = event => {
        event.preventDefault();

        const formData = new FormData();

        Object.keys(this.state).forEach(key => {
            formData.append(key, this.state[key]);
        });

        this.props.postNews(formData);
        this.setState({title: '', text: '', image: ''});
        this.inputKey = Date.now();
        this.props.history.push('/');
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        })
    };


    render() {
        return (
            <Fragment>
                <h1>Add new post</h1>
                <Form onSubmit={this.submitFormHandler}>
                    <FormGroup row>
                        <Label sm={2} for="title">Title</Label>
                        <Col sm={10}>
                            <Input
                                type="text" required
                                name="title" id="title"
                                placeholder="Enter post title"
                                autoComplete='off'
                                value={this.state.title}
                                onChange={this.inputChangeHandler}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={2} for="text">Content</Label>
                        <Col sm={10}>
                            <Input
                                type="textarea" required
                                name="text" id="text"
                                placeholder="Enter text"
                                value={this.state.text}
                                onChange={this.inputChangeHandler}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={2} for="image">
                            Image
                        </Label>
                        <Col sm={10}>
                            <Input
                                type="file"
                                name="image" id="image"
                                key={this.inputKey}
                                onChange={this.fileChangeHandler}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={{offset: 2, size: 10}}>
                            <Button className='post-form-button'>Save</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    postNews: post => dispatch(postNews(post))
});

export default connect(null, mapDispatchToProps)(NewPost);