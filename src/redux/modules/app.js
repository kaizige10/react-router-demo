const initialState =  {
    requestQuantity: 0,
    error: null
}

export const types = {
    START_REQUEST: 'APP/START_REQUEST',//开始发送请求
    FINISH_REQUEST: 'APP/FINISH_REQUEST',
    SET_ERROR: 'APP/SET_ERROR',//设置错误信息
    REMOVE_ERROR: 'APP/REMOVE_ERROR'//移除错误信息
}

export const actions = {
    startReqest = () => {
        return {type: types.START_REQUEST}
    },
    finishRequest = () => {
        return {type: types.FINISH_REQUEST}
    },
    setError = (error) => {
        return {type: types.SET_ERROR, error}
    },
    removeError = () => {
        return {type: types.REMOVE_ERROR}
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case types.START_REQUEST: 
            // 每当接收一个请求开始，requestQuantity数量加1
            return {...state, requestQuantity: state.requestQuantity + 1};
        case types.FINISH_REQUEST:
            return {...state, requestQuantity: state.requestQuantity - 1};
        case types.SET_ERROR:
            return {...state, error: action.error};
        case types.REMOVE_ERROR:
            return {...state, error: null};
        default:
            return state;
    }
}

export default reducer;

// selector
export const getRequestQuantity = (state) => (state.app.requestQuantity);
export const getError = (state) => (state.app.error);