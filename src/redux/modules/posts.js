//posts模块用于帖子相关的状态管理
import {actions as appActions} from './app';
import { get, put, post } from '../../utils/request';
import url from '../../utils/url';
import {combineReducers} from 'redux';

const initialState = {
    allIds: [],
    byId: {}
}
// action types
export const types = {
    CREATE_POST: 'POSTS/CREATE_POST',
    UPDATE_POST: 'POSTS/UPDATE_POST',
    FETCH_POST: 'POSTS/FETCH_POST',
    FETCH_ALL_POST: 'POSTS/FETCH_ALL_POST'
}

// action creators
export const actions = {
    fetchAllPosts: () => {
        return (dispatch, getState) => {
            if (shouldFetchAllPosts(getState())) {
                dispatch(appActions.startReqest());
                return get(url.getPosts).then(data => {
                    dispatch(appActions.finishReqest());
                    //请求成功则发送fetchAllPostsSuccess action
                    if (data.code == 0) {
                        const {posts, postIds, authors} = convertPostsToPlain(data);
                        dispatch(fetchAllPostsSuccess(posts, postIds, authors));
                    } else {
                        dispatch(appActions.setError(data.result));
                    }
                })
            }
        }
    },
    fetchPost: (id) => {
        return (dispatch, getState) => {
            if (shouldFetchPost(id, getState)) {
                dispatch(appActions.startReqest());
                return get(url.getPost).then(data => {
                    dispatch(appActions.finishReqest());
                    //请求成功则发送fetchPostSuccess action
                    if (data.code == 0) {
                        const {post, author} = convertSinglePostToPlain(data);
                        dispatch(fetchPostSuccess(post, author));
                    } else {
                        dispatch(appActions.setError(data.result));
                    }
                })
            }
        }
    },
    createPost: (title, content) => {
        return (dispatch, getState) => {
            const state = getState();
            const userId = state.auth.userId;
            const param = {
                title,
                content,
                userId: userId
            }
            dispatch(appActions.startReqest());
            return post(url.createPost, param).then(data => {
                dispatch(appActions.finishReqest());
                //请求成功则发送createPostSuccess action
                if (data.code == 0) {
                    const {post} = convertSinglePostToPlain(data);
                    dispatch(createPostSuccess(post));
                } else {
                    dispatch(appActions.setError(data.result));
                }
            })
        }
    },
    updatePost: (post) => {
        return (dispatch) => {
            dispatch(appActions.startReqest());
            return put(url.modifyPost(post.id), post).then(data => {
                dispatch(appActions.finishReqest());
                //请求成功则发送updatePostSuccess action
                if (data.code == 0) {
                    const {post} = convertSinglePostToPlain(data);
                    dispatch(updatePostSuccess(post));
                } else {
                    dispatch(appActions.setError(data.result));
                }
            })
        }
    }
}

// action creators inner
function fetchAllPostsSuccess(posts, postIds, authors) {
    return {
        type: types.FETCH_ALL_POST,
        posts,
        postIds,
        users: authors
    }
}
function fetchPostSuccess(post, author) {
    return {
        type: types.FETCH_POST,
        post, 
        user: author
    }
}
function createPostSuccess(post) {
    return {
        type: types.CREATE_POST,
        post
    }
}
function updatePostSuccess(post) {
    return {
        type: types.UPDATE_POST,
        post
    }
}

// reducers
const allIds = (state = initialState.allIds, action) => {
    switch(action.type) {
        case types.FETCH_ALL_POST:
            return action.postIds;
        case types.CREATE_POST:
            return [action.post.id, ...state];
        default: 
            return state;
    }
}
const byId = (state = initialState.byId, action) => {
    switch(action.type) {
        case types.FETCH_ALL_POST:
            return action.posts;
        case types.CREATE_POST:
        case types.FETCH_POST:
        case types.UPDATE_POST:
            return {...state, [action.post.id]: action.post};
        default: 
            return state;
    }
}
const reducer = combineReducers({allIds, byId});
export default reducer;

// help function
// posts.allIds有值，说明不需要获取全部post
function shouldFetchAllPosts(state) {
    const {posts} = state;
    if (posts.allIds && posts.allIds.length > 0) {
        return false;
    } else {
        return true;
    }
}
// byId中post的content字段有值，说明不需要请求该post了
function shouldFetchPost(id, state) {
    const {posts} = state;
    if (posts.byId && posts.byId[id] && posts.byId[id].content) {
        return false;
    } else {
        return true;
    }
}
function convertPostsToPlain(data) {
    const {result} = data;
    const posts = {}, postIds = [], authors = {};
    result.forEach(post => {
        postIds.push(post.id);
        authors[post.author.id] = post.author;
        posts[post.id] = {...post, author: post.author.id};
    })
    return {posts, postIds, authors};
}
function convertSinglePostToPlain(data) {
    const {result} = data;
    let post = {...result, author: result.author.id};
    let author = result.author;
    return {post, author};
}

// selector
export const getPostIds = (state) => (state.posts.addIds);
export const getPostById = (state, id) => (state.posts.byId[id]);