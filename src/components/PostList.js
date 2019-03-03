import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import { get } from '../utils/request';
class PostList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        }
    }
    componentDidMount() {
        get('/post').then(res => this.setState({ posts: res.result || [] }))
    }
    render() {
        return (
            <div>
                <h1>话题列表</h1>
                <ul>
                    {this.state.posts.map(post => {
                        return (
                            <Link to={`/post/${post.id}`} key={post.id}>
                                <li className='debug'>
                                    <p>title:{post.title}</p>
                                    <p>author:{post.author}</p>
                                    <p>vote:{post.vote}</p>
                                </li>
                            </Link>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default PostList;