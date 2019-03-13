import React, {Component} from 'react'
import {Route} from 'react-router-dom';
import asyncComponent from '../utils/asyncComponent';
import Header from './Header';

const AsyncPostList = asyncComponent(() => import('./PostList'));
const AsyncPostDetails = asyncComponent(() => import('./PostDetails'));

class Home extends Component {
    constructor(props) {
        super(props);
        const username = sessionStorage.getItem('username');
        this.state = {
            username: username ? username : ''
        }
        this.onLogout = this.onLogout.bind(this);
        // console.log('Home props: ', props);
    }
    onLogout() {
        this.setState({
            username: ''
        });
        sessionStorage.removeItem('username');
    }
    render() {
        console.log('Home 被渲染了');
        const username = this.state.username;
        return (
            <>
                <Header username={username} onLogout={this.onLogout} location={this.props.location} history={this.props.history}></Header>
                <Route path={this.props.match.url} exact render={props => <AsyncPostList username={username} {...props}></AsyncPostList>}></Route>
                <Route path={this.props.match.url + '/:id'} render={props => <AsyncPostDetails username={username} {...props}></AsyncPostDetails>}></Route>
            </>
        )
    }
}
export default Home;