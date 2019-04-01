import {post} from '../../utils/request';
import url from '../../utils/url';
import {actions as appActions} from './app';

const initialState =  {
    userId: null,
    username: null
}

export const types = {
    LOGIN: 'AUTH/LOGIN',
    LOGOUT: 'AUTH/LOGOUT'
}

export const actions = {
    login: (username, password) => {
        return dispatch => {
            // api请求开始前调用app模块定义的startRequest action
            dispatch(appActions.startReqest());
            const params = {username, password};
            return post(url.login, params).then(data => {
                // api结束时前调用app模块定义的finishRequest action
                dispatch(appActions.finishRequest())
                // 请求成功时保存登录的用户信息，否则设置全局错误信息
                if (data.code == 0) {
                    dispatch(actions.setLoginInfo(data.result.id, data.result.name));
                } else {
                    dispatch(appActions.setError(data.result));
                }
            })
        }
    },
    logout: () => ({
        type: types.LOGOUT
    }),
    setLoginInfo: (userId, username) => ({
        type: types.LOGIN,
        userId,
        username
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case types.LOGIN:
            return {...state, userId: action.userId, username: action.username};
        case types.LOGOUT:
            return {...state, userId:null, username: null};
        default:
            return state;
    }
}
export default reducer;

//selector
export const getAuth = (state) => (state.auth);