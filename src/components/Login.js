import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {post} from '../utils/request';
class Login extends Component {
    constructor(props) {
        super(props);
        // console.log(props);
        this.state = {username:'', password: '', showError: '', isRidirect: false};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        // console.log(this.state.username);
        // console.log(this.state.password);
        if (!this.state.username) {
            this.setState({showError: '请输入用户名！'});
            return;
        }
        if (!this.state.password) {
            this.setState({showError: '请输入密码！'});
            return;
        }
        post('/user/login', {name: this.state.username, password: this.state.password}).then(res => {
            if (res.code === 1) {
                this.setState({showError: res.result});
            }
            if (res.code === 0) {
                sessionStorage.setItem('username', this.state.username);
                this.setState({showError: '', isRidirect: true});
            }
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
        if (this.state.isRidirect) {
            return <Redirect to={this.props.location.state.from || {pathname: '/'}}></Redirect>
        }
        return (
            <form onSubmit={this.handleSubmit}>
                {this.state.showError ? <input id='show_error' type='text'  readOnly value={this.state.showError}></input> : null}
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