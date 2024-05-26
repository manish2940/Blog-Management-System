import { useEffect, useState } from 'react';

import { Grid, Box } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';

import {API} from '../service/api';
//components
import Post from './Post';
import axios from 'axios';
const Posts = () => {
    const [posts, getPosts] = useState([]);
    
    const [searchParams] = useSearchParams();
    let category = searchParams.get('category');

   /* The `useEffect` hook in the code snippet is used to fetch posts from an API based on the selected
   category. Here's a breakdown of what it does: */
    useEffect(() => {
        const fetchData = async () => { 
            console.log("You started useffect in posts");
            // const response = await API.getAllPosts({ category : category || '' });
            // getPosts(response.data);
            console.log(category);
            axios.get('http://localhost:8000/posts',{params:{ category : category || '' }})
            .then(response => {
                // Handle successful response
                console.log('Response:', response.data);
                getPosts(response.data);
            })
            .catch(error => {
                // Handle error
                console.error('Error:', error);
            });
        }
        fetchData();
    }, [category]);
    return (
        <>
            {
                posts?.length ? posts.map(post => (
                    <Grid key={post._id} item lg={3} sm={4} xs={12}>
                        <Link style={{textDecoration: 'none', color: 'inherit'}} to={`details/${post._id}`}>
                            <Post post={post} />
                        </Link>
                    </Grid>
                )) : <Box style={{color: '878787', margin: '30px 80px', fontSize: 18}}>
                        No data is available for selected category
                    </Box>
            }
        </>
    )
}

export default Posts;