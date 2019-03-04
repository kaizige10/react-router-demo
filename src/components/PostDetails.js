import React, { Component } from 'react'
import PostEditor from './PostEditor';
import timeformat from '../utils/timeformat';
import like from '../images/like.png';
import { put } from '../utils/request';
class PostDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            post: props.location.state.post
        }
        this.handleEdit = this.handleEdit.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }
    handleEdit() {
        this.setState({ isEditing: true })
    }
    handleSave(title, content) {
        const { post } = this.state;
        if (this.props.username) {
            put(`/post/${post.id}`, { title: title, content: content })
                .then(res => {
                    console.log('handleSave, put post: ', res);
                    if (res.code === 0) {
                        this.setState({isEditing: false, post: res.result});
                    } else {
                        alert(res.result);
                    }
                });
        }
    }
    render() {
        const { post, isEditing } = this.state;
        const voteStyleP = {fontSize: '18px'};
        const voteStyleImg = {verticalAlign: '-8px'};
        return (
            <div>
                {isEditing ? <PostEditor handleSave={this.handleSave} title={post.title} content={post.content}></PostEditor> :
                    (<><h1>{post.title}</h1>
                        <div>
                            {post.author} * {timeformat(post.updatedAt)} * {post.author === this.props.username ? <button onClick={this.handleEdit}>编辑</button> : null}
                        </div></>)}
                {isEditing ? null : <p>{post.content}</p>}
                <p style={voteStyleP}><img src={like} style={voteStyleImg} alt={'点赞'}></img>{post.vote}</p>
            </div>
        )
    }
}

export default PostDetails;