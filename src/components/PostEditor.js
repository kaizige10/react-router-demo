import React, {Component} from 'react';

class PostEditor extends Component {
    constructor(props) {
        super(props);
        const {title, content} = this.props;
        this.state = {
            title: title || '',
            content: content || ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.clear = this.clear.bind(this);
        this.save = this.save.bind(this);
    }
    handleChange(e) {
        if (e.target.name === 'title'){
            this.setState({'title': e.target.value});
        }
        if (e.target.name === 'content'){
            this.setState({'content': e.target.value});
        }
    }
    clear() {
        this.setState({'title': '', 'content': ''});
    }
    save() {
        const {title, content} = this.state;
        this.props.handleSave(title, content);
    }
    render() {
        return (
            <>
                <div>
                    <input name='title' type='text' placeholder='标题' onChange={this.handleChange} value={this.state.title}></input>
                </div>
                <div>
                    <textarea name='content' placeholder='内容' onChange={this.handleChange} value={this.state.content}></textarea>
                </div>
                <div>
                    <button onClick={this.clear}>清空</button>
                    <button onClick={this.save}>保存</button>
                </div>
            </>
        )
    }
}

export default PostEditor;