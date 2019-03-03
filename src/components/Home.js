import React, {Component} from 'react'
import Header from './Header';
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
                <Header>
                    
                </Header>
            </>
        )
    }
}
export default Home;