import React, {Component} from 'react'
import {Route} from 'react-router-dom';
import asyncComponent from '../utils/asyncComponent';
import Header from './Header';

const AsyncPostList = asyncComponent(() => import('./PostList'));
const AsyncPostDetails = asyncComponent(() => import('./PostDetails'));

class Home extends Component {
    constructor(props) {
        super(props);
        const user = JSON.parse(sessionStorage.getItem('user'));
        this.state = {
            user: user
        }
        this.onLogout = this.onLogout.bind(this);
        // console.log('Home props: ', props);
    }
    onLogout() {
        this.setState({
            user: null
        });
        sessionStorage.removeItem('user');
    }
    render() {
        console.log('Home 被渲染了');
        const user = this.state.user;
        return (
            <>
                <Header user={user} onLogout={this.onLogout} location={this.props.location} history={this.props.history}></Header>
                <Route path={this.props.match.url} exact render={props => <AsyncPostList user={user} {...props}></AsyncPostList>}></Route>
                <Route path={this.props.match.url + '/:id'} render={props => <AsyncPostDetails user={user} {...props}></AsyncPostDetails>}></Route>
            </>
        )
    }
}
export default Home;