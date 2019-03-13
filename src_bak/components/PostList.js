import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { get, post, put } from '../utils/request';
import PostEditor from './PostEditor';
import timeformat from '../utils/timeformat';
import { Button } from 'zent';
import '../css/app.css';
import like from '../images/like.png';
class PostList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            isEditing: false
        }
        this.handleSave = this.handleSave.bind(this);
        this.cancleEdit = this.cancleEdit.bind(this);
        this.handleVote = this.handleVote.bind(this);
    }
    componentDidMount() {
        get('/post').then(res => this.setState({ posts: res.result || [] }))
    }
    handleSave(title, content) {
        if (this.props.username) {
            post('/post', { title: title, author: this.props.username, content: content })
                .then(res => {
                    // console.log(res);
                    get('/post').then(res => {
                        if (res.code === 0) {
                            this.setState({ posts: res.result || [] });
                        } else {
                            console.log(res.result);
                        }
                        this.setState({ isEditing: false });
                    });
                });
        }
    }
    cancleEdit() {
        this.setState({ isEditing: false });
    }
    handleVote(post) {
        if (this.props.username) {
            put(`/post/${post.id}`, { vote: post.vote + 1 })
                .then(res => {
                    // console.log('handleSave, put post: ', res);
                    if (res.code === 0) {
                        get('/post').then(res => {
                            if (res.code === 0) {
                                this.setState({ posts: res.result || [] });
                            } else {
                                console.log(res.result);
                            }
                            this.setState({ isEditing: false });
                        });
                    } else {
                        console.log(res.result);
                    }
                });
        }
    }
    render() {
        console.log('PostList 被渲染了, this.state.posts: ', this.state.posts);
        return (
            <div id='post_list' className='mh5'>
                <h1 className='tc'>话题列表</h1>
                {this.props.username ? <Button type='primary' onClick={() => this.setState({ isEditing: true })} >发帖</Button> : null}
                {(this.props.username && this.state.isEditing) ?
                    <div>
                        <PostEditor handleSave={this.handleSave} cancleEdit={this.cancleEdit}></PostEditor>
                    </div> : null}
                <ul className='mt3'>
                    {this.state.posts.map(post => {
                        return (
                            <li key={post.id} className='mv3 bb b--gray'>
                                <Link to={{ pathname: `/post/${post.id}`, state: { post: post } }} className='f3'>{post.title}</Link>
                                <p>作者: {post.author}</p>
                                <p>更新时间: {timeformat(post.updatedAt)}</p>
                                <p className='vote'><img width='25px' height='25px' src={like} alt={'点赞'} onClick={()=>this.handleVote(post)}></img>{post.vote}</p>
                            </li>

                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default PostList;