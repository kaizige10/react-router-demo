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
    }
    onLogout() {
        this.setState({
            username: ''
        })
    }
    render() {
        return (
            <>
                <Header username={this.state.username} onLogout={this.onLogout}></Header>
                <Route path={this.props.match.url} component={PostList} exact></Route>
                <Route path={this.props.match.url + '/:id'} component={PostDetails}></Route>
            </>
        )
    }
}
export default Home;