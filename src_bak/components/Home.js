import React, {Component} from 'react'
import {Route} from 'react-router-dom';
import Header from './Header';
import PostList from './PostList';
import PostDetails from './PostDetails';
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
                <Route path={this.props.match.url} exact render={props => <PostList username={username} {...props}></PostList>}></Route>
                <Route path={this.props.match.url + '/:id'} render={props => <PostDetails username={username} {...props}></PostDetails>}></Route>
            </>
        )
    }
}
export default Home;