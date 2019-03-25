import React, { Component } from 'react'
import timeformat from '../utils/timeformat';
import { get, post } from '../utils/request';
import {Input, Button} from 'zent';
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
            // console.log(res);
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
        post(`/comment`, { postId: this.props.postId, content: this.state.commentContent, userId: this.props.user.id })
                .then(res => {
                    // console.log('handleSubmit, post comment: ', res);
                    if (res.code === 0) {
                        get(`/comment/${this.props.postId}`).then(resp => {
                            // console.log(resp);
                            if (resp.code === 0) {
                                this.setState({comments: resp.result, commentContent: ''});
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
        console.log('CommentList 被渲染了，this.state.comments: ', this.state.comments);
        return (
            <section id='comment_list'>
                <h2>评论</h2>
                {this.props.user ? (<>
                    <Input htmlType='textarea' value={this.state.commentContent} onChange={this.handleChange} placeholder='说说你的看法'></Input>
                    <Button type='primary' onClick={this.handleSubmit}>提交</Button>
                </>) : null}
                <ul>
                    {this.state.comments.map(comment => {
                        return <li key={comment.id} className='bb b--gray'>
                                <p className='mb2'>{comment.content}</p>
                                <p>{comment.author.name} · {timeformat(comment.updatedAt)}</p>
                            </li>
                    })}
                </ul>
            </section>
        )
    }
}

export default CommentList;