import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { get, post } from '../utils/request';
import PostEditor from './PostEditor';
class PostList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
        this.handleSave = this.handleSave.bind(this);
    }
    componentDidMount() {
        get('/post').then(res => this.setState({ posts: res.result || [] }))
    }
    handleSave(title, content) {
        if (this.props.username) {
            post('/post', { title: title, author: this.props.username, content: content })
                .then(res => {
                    // console.log(res);
                    get('/post').then(res => this.setState({ posts: res.result || [] }));
                });
        }
    }
    render() {
        return (
            <div>
                <h1>话题列表</h1>
                {this.props.username ? <PostEditor handleSave={this.handleSave}></PostEditor> : null}
                <ul>
                    {this.state.posts.map(post => {
                        return (
                            <li className='debug' key={post.id}>
                                <Link to={{pathname: `/post/${post.id}`, state: {post: post}}} ><p>title:{post.title}</p></Link>
                                <p>author:{post.author}</p>
                                <p>vote:{post.vote}</p>
                            </li>

                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default PostList;