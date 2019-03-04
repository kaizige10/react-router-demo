import React, { Component } from 'react'
import PostEditor from './PostEditor';
import timeformat from '../utils/timeformat';
class PostDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false
        }
        this.handleEdit = this.handleEdit.bind(this);
    }
    handleEdit() {
        this.setState({ isEditing: true })
    }
    render() {
        const { post } = this.props.location.state;
        return (
            <div>
                {this.state.isEditing ? <PostEditor></PostEditor> :
                    (<><h1>{post.title}</h1>
                        <div>
                            {post.author} * {timeformat(post.updatedAt)} * {post.author === this.props.username ? <button onClick={this.handleEdit}>编辑</button> : null}
                        </div></>)}

            </div>
        )
    }
}

export default PostDetails;