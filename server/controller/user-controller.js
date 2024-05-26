/**
 * The above code defines functions for user signup, login, image upload, post creation, post
 * retrieval, post update, and post deletion.
 * @param request - The `request` parameter in your functions contains information about the HTTP
 * request that triggered the function. It includes details such as the request body, parameters, query
 * strings, headers, and more. You can access specific data from the request object based on your
 * requirements to process the incoming request effectively.
 * @param response - The `response` parameter in your functions is used to send back a response to the
 * client making the request. It is typically used to send status codes, JSON data, or error messages
 * back to the client. In your code, you are using `response.status()` to set the HTTP status code of
 * @returns The `signupUser` function is being exported as the default export from this module.
 */
import user from '../model/user.js';
import Post from '../model/post.js';
const signupUser = async (request,response)=>{
    console.log("signup user called");
    
    try{
        console.log("entered try block");
        const User = request.body;
        // const User = {
        //     name:"Manish",
        //     username:"mansh",
        //     password:"dgsg"
        // }

        console.log(User);
        const newUser = new user(User);
        await newUser.save();
        return response.status(200).json({msg:'signup successful'});
        
    }catch(error){
        console.log("You are generatinge erorr 500");
        console.log(error);
        // return response.status(500).json({msg:'Error while signup the user'});
        return response.status(500).json({msg:'Error while signup the user'});

    }
}
export const loginUserData = async (request,response)=>{
    console.log("You entered loginUserdata");
    console.log(request);
    const {username,password} = request.body;
    user.findOne({username:username})
    .then(data =>{
        if(data){
            if(data.password === password){
                response.json("Successful");
            }
            else{
                response.json("The password is incorrect");
            }
        }
        else{
            response.json({msg:"No record existed"});
        }
    })
}
const url = 'http://localhost:8000';
export const uploadImage = (request,response)=>{
    console.log("entered upload Image");
    console.log(request.file.filename);
    console.log(request.file);
    if(!request.file){
        return response.status(404).json({msg:"File not found"});

    }
    const imageUrl = `${url}/file/${request.file.filename}`;
    return response.status(200).json({imageUrl});
}
export const createPost = async (request, response) => {
    try {
        console.log("create Post called ");
        const post = await new Post(request.body);
        post.save();

        response.status(200).json('Post saved successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}
export const getAllPosts = async (request, response) => {
    console.log("get ALL posts called");
    console.log(request.query.category);
    let username = request.query.username;
    console.log(username);
    let category = request.query.category;
    console.log(category);
    let posts;
    // try {
    //     if(username) 
    //         posts = await Post.find({ username: username });
    //     else if (category) 
    //         console.log("You enetered category section");
    //         posts = await Post.find({ categories: category });
    //     else 
    //         console.log("you entered else section of ghetallpost");
    //         posts = await Post.find({});
    //         console.log(posts);
            
    //     response.status(200).json(posts);
    // } 
    // catch (error) {
    //     response.status(500).json(error);
    // }
    try {
        if (username) {
            posts = await Post.find({ username: username });
        } else if (category) {
            console.log("You entered category section");
            posts = await Post.find({ categories: category });
        } else {
            console.log("You entered the else section of getAllPosts");
            posts = await Post.find({});
            console.log(posts);
        }
        
        response.status(200).json(posts);
    } catch (error) {
        response.status(500).json(error);
    }
    
}
export const getPost = async (request,response)=>{
    console.log("Hi  buddy");
    try {
        console.log("Ypu  are inside getPost");
        console.log(request.params.id);
        const post = await Post.findById(request.params.id);
        console.log(post);

        response.status(200).json(post);
    } catch (error) {
        response.status(500).json(error)
    }
}
export const updatePost = async (request, response) => {
    try {
        console.log("you entered update post");
        console.log(request.params.id);
        
        const post = await Post.findById(request.params.id);
        console.log(post);
       

        if (!post) {
            response.status(404).json({ msg: 'Post not found' })
        }
        // await Post.findByIdAndUpdate( request.params.id, { $set: request.body })
        console.log(request.body);
        await Post.findByIdAndUpdate( request.params.id, request.body);

        response.status(200).json('post updated successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}
export default signupUser;
