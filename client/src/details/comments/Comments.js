import { useState, useEffect, useContext } from 'react';
import { Box, TextareaAutosize, Button, styled } from '@mui/material';

import { DataContext } from '../../context/dataprovider';

import { API } from '../../service/api';
import axios from 'axios';

//components
import Comment from '../comments/Comment';

const Container = styled(Box)`
    margin-top: 100px;
    display: flex;
`;

const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%'
});

const StyledTextArea = styled(TextareaAutosize)`
    height: 100px !important;
    width: 100%; 
    margin: 0 20px;
`;

const initialValue = {
    name: '',
    postId: '',
    date: new Date(),
    comments: ''
}

const Comments = ({ post }) => {
    const url = 'https://static.thenounproject.com/png/12017-200.png'

    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);

    const { account } = useContext(DataContext);

    const checkPolarity = (comment)=>{
        let response = axios.post(`http://127.0.0.1:5001/predict?text=${comment.comments}`,"")
        .then(response =>{
            if(response.data.neg >= 0.5){
                alert("Your comment contains negative words .Please remove them");
            }
        })
    }

    useEffect(() => {
        const getData = async () => {
            // const response = await API.getAllComments(post._id);
            // if (response.isSuccess) {
            //     setComments(response.data);
            // }
            console.log("getcommenst all");
            const response = await axios.get(`http://localhost:8000/comments/${post._id}`);
            console.log(response.data);
            setComments(response.data);
        }
        getData();
    }, [toggle, post]);

    const handleChange = (e) => {
        setComment({
            ...comment,
            name: account.username,
            postId: post._id,
            comments: e.target.value
        });
    }

    const addComment = async() => {
        // checkPolarity(comment);
        console.log(comment.comments);
        let response = axios.post(`http://127.0.0.1:5000/predict?text=${comment.comments}`,"")
        .then(response =>{
            console.log(response.data.prediction.neg);
            if(response.data.prediction.neg >= 0.5){
                alert("Your comment contains negative words .Please remove them");
            }
            else{
                let reponse = axios.post('http://localhost:8000/comment/new',comment);
                setComment(initialValue)
                setToggle(prev => !prev);

            }
        })
    }
    
    return (
        <Box>
            <Container>
                <Image src={url} alt="dp" />   
                <StyledTextArea 
                    rowsmin={5} 
                    placeholder="what's on your mind?"
                    onChange={(e) => handleChange(e)} 
                    value={comment.comments}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    size="medium" 
                    style={{ height: 40 }}
                    onClick={(e) => addComment(e)}
                >Post</Button>             
            </Container>
            <Box >
                {
                    comments && comments.length > 0 && comments.map(comment => (
                        <Comment key={comment._id} comment={comment} setToggle={setToggle} />
                    ))
                }
            </Box>
        </Box>
    )
}

export default Comments;