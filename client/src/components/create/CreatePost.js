import React, { useState, useEffect, useContext } from 'react';

import { styled, Box, TextareaAutosize, Button, InputBase, FormControl, IconButton, colors  } from '@mui/material';
import { AddCircle as Add ,Mic} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

import { API } from '../../service/api';
import { DataContext } from '../../context/dataprovider';
import axios from 'axios';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';



const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}));
const IconButton1 = styled(IconButton)`
    background-color: red;
    margin-right:20px;
    border: 2px solid black;
`;

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`;

const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`;

const Textarea = styled(TextareaAutosize)`
    width: 100%;
    border: none;
    margin-top: 50px;
    font-size: 18px;
    &:focus-visible {
        outline: none;
    }
`;

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date()
}

const CreatePost = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    const { account } = useContext(DataContext);

    const [focusedField, setFocusedField] = useState(null);

    const handleFocus = (fieldName) => {
        setFocusedField(fieldName);
    };

    const handleBlur = () => {
        setFocusedField(null);
    };
    console.log("You entered createPost");
    console.log(account.username);
    // const url = post.picture ? post.picture : 'http://localhost:8000/file/1712780541721-blog-images%20(1).png';
    const [url,setUrl] = useState('https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80');
    const [text,setText] = useState('');
    useEffect(() => {
        const getImage = async () => { 
            if(file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);
                console.log(data.get("file"));
                // const response = await API.uploadFile(data);
                // post.picture = response.data;
                //  await axios.post('http://localhost:8000/file/upload', data,{
                //     headers:{"Content-Type":"multipart/form-data"}
                // })
                // .then(result =>{
                //     console.log(result);
                //     post.picture = result.data;
                //  });
                const response = await axios.post('http://localhost:8000/file/upload', data, {
                    headers: {
                    'Content-Type': 'multipart/form-data'
                    }
                });
                console.log(response.data.imageUrl);
                console.log("you are in center");

                post.picture = response.data.imageUrl;
                console.log(post);
                setUrl(post.picture);
                // url = post.picture;
                console.log(url);
                
            }
        }
        getImage();
        post.categories = location.search?.split('=')[1] || 'All';
        post.username = account.username;
        console.log("reav=ched the bottom of code");
        console.log(post);
    }, [file])
    

    const savePost = async () => {
        console.log(post.description);
        await API.createPost(post);
        navigate('/');
    }

    const { transcript, resetTranscript } = useSpeechRecognition();
    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value  });
        
    }
    const CaptureSpeech = ()=>{
        
        // if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        //     alert("Your browser don't support speech recognition");
        // }

        // SpeechRecognition.startListening();
        // setTimeout(() => {

        //     SpeechRecognition.stopListening();
           
        
        //     }, 5000);

        // // if(focusedField != null){
        // //     if(focusedField == 'title'){

        // //     }
        // //     else{

        // //     }
        // // }
        if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
            alert("Your browser doesn't support speech recognition");
        } else {

            SpeechRecognition.startListening();
            console.log("yiu vcalled to recoed speech");
            setTimeout(() => {
                SpeechRecognition.stopListening();
                console.log(transcript);
                let st1 = text + ' ' + transcript;
                setText(st1);
            
            }, 5000);
        }

    }

    return (
        <Container>
            <Image src={url}  alt="post"/>

            <StyledFormControl>
                <label htmlFor="fileInput">
                    <Add fontSize="large" color="action" />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <InputTextField onChange={(e) => handleChange(e)} onFocus={() => handleFocus('title')} name='title' placeholder="Title" onBlur={handleBlur} />
                <IconButton1 onClick={()=>CaptureSpeech()}><Mic/></IconButton1>
                <Button onClick={() => savePost()} variant="contained" color="primary">Publish</Button>
            </StyledFormControl>

            <Textarea
                rowsmin={5}
                placeholder="Tell your story..."
                name='description'
                onChange={(e) => handleChange(e)} 
                onFocus={() => handleFocus('description')}
                onBlur={handleBlur}
                value={text}
            />
        </Container>
    )
}

export default CreatePost;