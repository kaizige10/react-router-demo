import React, { Component } from 'react';
import { Input, Button } from 'zent';

class PostEditor extends Component {
    constructor(props) {
        super(props);
        const { title, content } = this.props;
        this.state = {
            title: title || '',
            content: content || ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
    }
    handleChange(e) {
        if (e.target.name === 'title') {
            this.setState({ 'title': e.target.value });
        }
        if (e.target.name === 'content') {
            this.setState({ 'content': e.target.value });
        }
    }
    save() {
        const { title, content } = this.state;
        this.props.handleSave(title, content);
    }
    render() {
        console.log('PostEditor 被渲染了');
        return (
            <section id='post_editor'>
                <Input name='title' type='text' placeholder='标题' onChange={this.handleChange} value={this.state.title}></Input>
                <Input name='content' type='textarea' placeholder='内容' onChange={this.handleChange} value={this.state.content}></Input>
                <div>
                    <Button onClick={this.props.cancleEdit}>取消</Button>
                    <Button onClick={this.save} type='primary' outline>保存</Button>
                </div>
            </section>
        )
    }
}

export default PostEditor;