import React, {Component, Fragment} from 'react';
import {deletePost, fetchNews} from "../../store/actions/newsActions";
import {connect} from "react-redux";
import {Button} from "reactstrap";
import {Link} from "react-router-dom";
import PostCard from "../../components/PostCard/PostCard";
import './News.css';

class News extends Component {

    componentDidMount() {
        this.props.getNews();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.props.getNews();
        }
    }

    render() {
        return (
            <Fragment>
                <div className='post-header'>
                    <p>Posts</p>
                    <Button className='new-post-btn'
                            tag={Link}
                            to={'/news/post'}
                    >Add new post
                    </Button>
                </div>
                {this.props.news.reverse().map(post => {
                        let datetime = new Date(post.date);
                        let hours = datetime.getUTCHours();
                        let minutes = datetime.getUTCMinutes();
                        let seconds = datetime.getUTCSeconds();
                        let date = datetime.getUTCDate();
                        let month = datetime.getUTCMonth();
                        let year = datetime.getUTCFullYear();
                        if (hours < 10) {
                            hours = '0' + hours;
                        }
                        if (minutes < 10) {
                            minutes = '0' + minutes;
                        }
                        if (seconds < 10) {
                            seconds = '0' + seconds;
                        }
                        if (month === 1) {
                            month = 'Feb'
                        }
                        datetime = date + ' ' + month + ' ' + year + ' ' + hours + ':' + minutes + ':' + seconds;
                        return (
                            <PostCard
                                key={post.id}
                                img={post.image}
                                title={post.title}
                                datetime={datetime}
                                link={post.id}
                                delete={() => this.props.deletePost(post.id)}
                            />
                        )
                    }
                )}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    news: state.news.news,
});

const mapDispatchToProps = dispatch => ({
    getNews: () => dispatch(fetchNews()),
    deletePost: (id) => dispatch(deletePost(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(News);