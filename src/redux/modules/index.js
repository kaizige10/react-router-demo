import {combineReducers} from 'redux';
import app from './app';
import auth from './auth';
import comments from './comments';
import posts from './posts';
import ui from './ui';
import users from './users';

const rootReducers = combineReducers({
    app,
    auth,
    comments,
    posts,
    ui,
    users
})

export default rootReducers;