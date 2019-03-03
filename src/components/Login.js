import React, {Component} from 'react';
import {post} from '../utils/request';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {username:'', password: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log('submit');
        console.log(this.state.username);
        console.log(this.state.password);
        post('/user/login', {name: this.state.username, password: this.state.password}).then(res => {
            console.log(res);
        })
    }
    handleChange(e) {
        if (e.target.id === 'input_username') {
            this.setState({username: e.target.value});
        } else if (e.target.id === 'input_password') {
            this.setState({password: e.target.value});
        }
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor='input_username'>用户名</label>
                <input id='input_username' type='text' onChange={this.handleChange} value={this.state.username}></input>
                <label htmlFor='input_password'>密码</label>
                <input id='input_password' type='password' onChange={this.handleChange} value={this.state.password}></input>
                <button type='submit'>登录</button>
            </form>
        )
    }
}
export default Login;