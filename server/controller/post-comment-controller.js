import Comment from '../model/comment.js';
import Post from "../model/post.js";
// export const updatePost = async (request, response) => {
//     try {
//         console.log("you entered update post");
//         console.log(request.params.id);
//         const post = await Post.findById(request.params.id);

//         if (!post) {
//             response.status(404).json({ msg: 'Post not found' })
//         }
        
//         await Post.findByIdAndUpdate( request.params.id, { $set: request.body })

//         response.status(200).json('post updated successfully');
//     } catch (error) {
//         response.status(500).json(error);
//     }
// }

export const deletePost = async (request, response) => {
    try {
        console.log("delete post");
        console.log(request.params.id);
        const post = await Post.findByIdAndDelete(request.params.id);
        // console.log(post);
        // await post.delete();
        console.log("ypu deleted the post");
        response.status(200).json('post deleted successfully');
    } catch (error) {
        response.status(500).json(error)
    }
}
export const newComment = async (request, response) => {
    try {
        const comment = await new Comment(request.body);
        comment.save();

        response.status(200).json('Comment saved successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}


export const getComments = async (request, response) => {
    try {
        console.log("get comments called");
        const comments = await Comment.find({ postId: request.params.id });  
        console.log(comments); 

              
        response.status(200).json(comments);
    } catch (error) {
        response.status(500).json(error)
    }
}

export const deleteComment = async (request, response) => {
    try {
        console.log("you entered delete comment");
        console.log(request.params.id);
        // const comment = await Comment.findById(request.params.id);
        // console.log(comment);
        
        await Comment.findByIdAndDelete(request.params.id);

        response.status(200).json('comment deleted successfully');
    } catch (error) {
        response.status(500).json(error)
    }
}
