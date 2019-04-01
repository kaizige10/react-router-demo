// comments模块用于评论相关的状态管理
import {actions as appActions} from './app';
import { get, put, post } from '../../utils/request';
import url from '../../utils/url';
import {combineReducers} from 'redux';

const initialState = {
    ById: {},
    byPost: {}
}

export const types ={
    FETCH_COMMENTS: 'COMMENTS/FETCH_COMMENTS',
    CREATE_COMMENT: 'COMMENTS/CREATE_COMMENT'
}

export const actions = {
    fetchComments: (postId) => {
        return (dispatch, getState) => {
            if (shouldFetchComments(postId, getState())) {
                dispatch(appActions.startReqest());
                return get(url.getComments(postId)).then(data => {
                    dispatch(appActions.finishReqest());
                    //请求成功则发送fetchCommentsSuccess action
                    if (data.code == 0) {
                        const {comments, commentIds, authors, postId} = convertCommentsToPlain(data);
                        dispatch(fetchCommentsSuccess(comments, commentIds, authors, postId));
                    } else {
                        dispatch(appActions.setError(data.result));
                    }
                })
            }
        }
    },
    createComment: (comment) => {
        return (dispatch) => {
            dispatch(appActions.startReqest());
            return post(url.createComment, comment).then(data => {
                dispatch(appActions.finishReqest());
                //请求成功则发送createCommentSuccess action
                if (data.code == 0) {
                    const newComment = convertSingleCommentToPlain(data);
                    dispatch(createCommentSuccess(newComment));
                } else {
                    dispatch(appActions.setError(data.result));
                }
            })
        }
    }
}

// action creators inner
function fetchCommentsSuccess(comments, commentIds, authors, postId) {
    return {
        type: types.FETCH_COMMENTS,
        comments,
        commentIds,
        users: authors,
        postId
    }
}

function createCommentSuccess(comment) {
    return {
        type: types.CREATE_COMMENT,
        comment,
        postId: comment.postId
    }
}

//reducers
const byId = (state = initialState.byId, action) => {
    switch(action.type) {
        case types.FETCH_COMMENTS:
            return {...state, ...action.comments};
        case types.CREATE_COMMENT:
            return {...state, [action.comment.id]: action.comment}
        default: 
            return state;
    }
}
const byPost = (state = initialState.byPost, action) => {
    switch(action.type) {
        case types.FETCH_COMMENTS:
            return {...state, [action.postId]: action.commentIds}
        case types.CREATE_COMMENT:
            return {...state, [action.postId]: state[action.postId].concat(action.comment.id)}
        default: 
            return state;
    }
}
const reducer = combineReducers({byId, byPost});
export default reducer;

// util
function shouldFetchComments(postId, state) {
    const {comments} = state;
    return comments.byPost && comments.byPost[postId] && comments.byPost[postId].length > 0;
}

function convertCommentsToPlain(data) {
    const {result} = data;
    let comments = {}, commentIds = [], authors = {}, postId;
    result.forEach(comment => {
        postId = comment.postId;
        commentIds.push(comment.id);
        authors[comment.author.id] = comment.author;
        comments[comment.id] = {...comment, author: comment.author.id};
    })
    return {comments, commentIds, authors, postId};
}

function convertSingleCommentToPlain(data) {
    const {result} = data;
    const comment = {...result, author: result.author.id};
    return comment;
}

//selector
export const getCommentIdsByPostId = (state, postId) => (state.comments.byPost[postId]);
export const getCommentById = (state, id) => (state.comments.byId[id]);