import React, { Component } from 'react'
import PostEditor from './PostEditor';
import CommentList from './CommentList';
import timeformat from '../utils/timeformat';
import like from '../images/like.png';
import { put, get } from '../utils/request';
import '../css/app.css';
class PostDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            post: props.location.state.post
        }
        this.handleEdit = this.handleEdit.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.cancleEdit = this.cancleEdit.bind(this);
        this.handleVote = this.handleVote.bind(this);
    }
    handleEdit() {
        this.setState({ isEditing: true })
    }
    handleSave(title, content) {
        const { post } = this.state;
        if (this.props.username) {
            put(`/post/${post.id}`, { title: title, content: content })
                .then(res => {
                    // console.log('handleSave, put post: ', res);
                    if (res.code === 0) {
                        this.setState({isEditing: false, post: res.result});
                    } else {
                        console.log(res.result);
                    }
                });
        }
    }
    cancleEdit() {
        this.setState({isEditing: false});
    }
    handleVote(post) {
        if (this.props.username) {
            put(`/post/${post.id}`, { vote: post.vote + 1 })
                .then(res => {
                    // console.log('handleSave, put post: ', res);
                    if (res.code === 0) {
                        get(`/post/${post.id}`).then(res => {
                            if (res.code === 0) {
                                this.setState({ post: res.result });
                            } else {
                                console.log(res.result);
                            }
                        });
                    } else {
                        console.log(res.result);
                    }
                });
        }
    }
    render() {
        console.log('PostDetails 被渲染了');
        const { post, isEditing } = this.state;
        return (
            <div>
                {isEditing ? <PostEditor handleSave={this.handleSave} cancleEdit={this.cancleEdit} title={post.title} content={post.content}></PostEditor> :
                    (<><h1>{post.title}</h1>
                        <div>
                            {post.author} · {timeformat(post.updatedAt)} · {post.author === this.props.username ? <button onClick={this.handleEdit}>编辑</button> : null}
                        </div></>)}
                {isEditing ? null : <p>{post.content}</p>}
                <p className='vote'><img width='25px' height='25px' src={like} alt={'点赞'} onClick={()=>this.handleVote(post)}></img>{post.vote}</p>
                <CommentList postId={post.id} username={this.props.username}></CommentList>
            </div>
        )
    }
}

export default PostDetails;