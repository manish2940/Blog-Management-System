//API_NOTIFICATION_MESSAGES
export const API_NOTIFICATION_MESSAGES = {
    loading:{
        title:'Loading...',
        message:'Data is being loaded, Please wait'
    },
    success:{
        title:'Success',
        message:'Data Successfully loaded'
    },
    responseFailure:{
        title:'Error',
        message:'An error occured while fetching response from the server.Please try again'
    },
    requestFailure:{
        title:'Error',
        message:'An error occured while parsing request data'
    },
    networkError:{
        title:'Error',
        message:'Unable to connect with the server.Please check internet connectivity and try again later'
    }
}

export const SERVICE_URLS = {
    userSignup:{
        url:'/signup',method:'POST'
    },
    uploadFile:{
        url:'/file/upload',method:'POST'
    },
    createPost:{
        url:'/create',
        method:'POST'
    },
    getAllPosts:{
        url:'/posts',
        method:'GET'
    },
    getPostById:{
        url:'/post/:id',
        method:'GET',
        query:true
    },
    deletePost: { url: '/delete/:id', method: 'DELETE', query: true },
    newComment: { url: '/comment/new', method: 'POST' },
    getAllComments: { url: '/comments/:id', method: 'GET', query: true },
    deleteComment: { url: '/comment/delete', method: 'DELETE', query: true },
    updatePost: { url: 'update', method: 'PUT', query: true }

}
