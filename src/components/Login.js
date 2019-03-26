import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {post} from '../utils/request';
import {Input, Button} from 'zent';
import url from '../utils/url';
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
        post(url.login, {name: this.state.username, password: this.state.password}).then(res => {
            if (res.code === 1) {
                this.setState({showError: res.result});
            }
            if (res.code === 0) {
                const user = res.result;
                sessionStorage.setItem('user', JSON.stringify({id: user.id, name: user.name}));
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
        console.log('Login 被渲染了');
        if (this.state.isRidirect) {
            return <Redirect to={this.props.location.state.from || {pathname: '/'}}></Redirect>
        }
        return (
            <form onSubmit={this.handleSubmit} className='center mv6 tc' id='login_form'>
                <h1>请登录</h1>
                {this.state.showError ? <span id='show_error'>{this.state.showError}</span> : null}
                <Input id='input_username' type='text' onChange={this.handleChange} value={this.state.username} placeholder="请输入用户名"></Input>
                <Input id='input_password' type='password' onChange={this.handleChange} value={this.state.password} placeholder="请输入密码"></Input>
                <Button htmlType='submit'>登录</Button>
            </form>
        )
    }
}
export default Login;