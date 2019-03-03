import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Home from './Home';
import Login from './Login';

class Header extends Component {
    render() {
        return (
            <div>
                <Link to="/" component={Home}>首页</Link>
                {this.props.username ?
                    (<div>"当前用户：" + {this.props.username}<button onClick={this.props.onLogout}>注销</button></div>) : <Link to="/login" component={Login}>登录</Link>}
            </div>
        )
    }
}

export default Header;