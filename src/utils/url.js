const url = {
    login: '/user/login',
    createComment: '/comment',
    getComments: (postId) => { return '/comment/' + postId },
    modifyPost: (postId) => { return '/post/' + postId },
    getPost: (postId) => { return '/post/' + postId },
    createPost: '/post',
    getPosts: '/post'
}

export default url;