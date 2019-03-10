import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Button } from 'zent';
// import Home from './Home';
// import Login from './Login';

class Header extends Component {
    handleHome = () => { 
        this.props.history.push('/') 
    }
    handleLogin = () => {
        this.props.history.push('/login', { from: this.props.location });
    }
    render() {
        console.log('Header 被渲染了');
        // const toLogin = {
        //     pathname: "/login",
        //     state: { from: this.props.location }
        // }
        return (
            <header className="bb b--gray pv2">
                <div className="flex ml5 mr5 justify-between flex-wrap">
                    <Button onClick={this.handleHome}>首页</Button>
                    {this.props.username ?
                        (<div className='gray'>当前用户： {this.props.username}<Button onClick={this.props.onLogout} className='ml2'>注销</Button></div>) : <Button onClick={this.handleLogin} >登录</Button>}
                </div>
            </header>
        )
    }
}

export default Header;