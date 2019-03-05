import React, { Component } from 'react'
import timeformat from '../utils/timeformat';
import { get, post } from '../utils/request';
import '../css/app.css';
class CommentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            commentContent: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        get(`/comment/${this.props.postId}`).then(res => {
            console.log(res);
            if (res.code === 0) {
                this.setState({comments: res.result});
            } else {
                console.log(res.result);
            }
            
        })
    }
    handleChange(e) {
        this.setState({commentContent: e.target.value});
    }
    handleSubmit(e) {
        e.preventDefault();
        post(`/comment`, { postId: this.props.postId, content: this.state.commentContent, author: this.props.username })
                .then(res => {
                    console.log('handleSubmit, post comment: ', res);
                    if (res.code === 0) {
                        get(`/comment/${this.props.postId}`).then(resp => {
                            console.log(resp);
                            if (resp.code === 0) {
                                this.setState({comments: resp.result});
                            } else {
                                console.log(resp.result);
                            }
                        })
                    } else {
                        console.log(res.result);
                    }
                });
    }
    render() {
        return (
            <div>
                <h2>评论</h2>
                {this.props.username ? (<div>
                    <textarea value={this.state.commentContent} onChange={this.handleChange}></textarea>
                    <button onClick={this.handleSubmit}>提交</button>
                </div>) : null}
                <ul>
                    {this.state.comments.map(comment => {
                        return <li key={comment.id}>
                                <p>{comment.content}</p>
                                <p>{comment.author} · {timeformat(comment.updatedAt)}</p>
                            </li>
                    })}
                </ul>
            </div>
        )
    }
}

export default CommentList;