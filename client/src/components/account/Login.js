import { Box,TextField,Button,styled,Typography,} from "@mui/material";
import { useContext, useState } from "react";
import { API } from "../../service/api";
import axios from "axios";
import {useNavigate } from 'react-router-dom';
import { DataContext } from "../../context/dataprovider";
const Component = styled(Box)`
    width:400px;
    margin:auto;
    box-shadow:5px 2px 5px 2px rgb(0 0 0/ 0.6);`;
const Image =  styled('img')({
    width:100,
    margin:'auto',
    display:'flex',
    padding:'50px 0 0'
});
const Wrapper = styled(Box)`
    padding:25px 35px;
    display:flex;
    flex:1;
    flex-direction:column;
    &>button,&>p,&>div{
        margin-top:20px;
    }
    `;  
const LoginButton = styled(Button)`
    text-transform:none;
    background:#FB641B;
    color:#fff;
    height:48px;
    border-radius:2px;`; 
const SignupButton = styled(Button)`
    text-transform:none;
    background:#fff;
    color:#2874f0;
    height:48px;
    border-radius:2px;
    box-shadow:0 2px 4px 0 rgb(0 0 0/20%)` ;   
const text = styled(Typography)`
    color:#878787;
    font-size:10px`;       
const Login = ()=>{
    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';
    const [account,toggleAccount] = useState('login');
    const navigate = useNavigate();
    const loginInitialValues = {
        username:'',
        password:''
    }
    const {setAccount} = useContext(DataContext);
    const [login,setLogin]= useState(loginInitialValues);
    const signUpInitialValues = {
        name:'',
        username:'',
        password:''
    }
    const [signup,setsignup]= useState(signUpInitialValues);
    const toggleSignUp = (e)=>{
        account === 'login'? toggleAccount('signUp'):toggleAccount('login');
    }
    const onInputChange = (e)=>{
        setsignup({...signup,[e.target.name]:e.target.value});
    }
    const onValueChange = (e)=>{
        setLogin({...login,[e.target.name]:e.target.value});
    }
    
    const loginUser = async (e)=>{
        console.log("you clicked on login button");
        axios.post('http://localhost:8000/login',login)
        .then(result=>{
            console.log(result);
            if(result.data === "Successful"){
                console.log(login.username);
                setAccount({username:login.username,name:login.password});
                navigate('/');
            }
            else{
                alert("User does not exist please try signing in");
                
            }
        })
        .catch(err=>console.log(err));
    }
    const signupUser = async ()=>{
        console.log("you called signup method");
        console.log(signup);
        // 
        //   let response = await API.userSignup(signup);
        
        // console.log("Signup fn finished");
        try {  
            // Send data to the backend server using Axios
            await axios.post('http://localhost:8000/signup', signup);
            alert('Data inserted successfully');
            setsignup(signUpInitialValues);
            toggleAccount('login');
            } catch (error) {
            console.error('Error inserting data:', error);
            alert('Error inserting data');

            setLogin(loginInitialValues);
            
            }
    }
    return(
        <Component>
            <Box>
                <Image src={imageURL} alt ="Login"/>
                {
                    account === 'login'?
                        <Wrapper>
                            <TextField variant="standard"  onChange={(e)=>onValueChange(e)}  label="Enter Username" name="username"></TextField>
                            <TextField variant="standard" onChange={(e)=>onValueChange(e)} label="Enter Password" name="password" type="password"></TextField>
                            <LoginButton variant="contained" onClick={(e)=>loginUser(e)}>Login</LoginButton>
                            <Typography style={{textAlign:'center'}}>OR</Typography>
                            <SignupButton onClick={()=>toggleSignUp()}>Create an Account</SignupButton>
                        </Wrapper>
                    :
                        <Wrapper>
                            <TextField variant="standard" onChange={(e)=>onInputChange(e)} label="Enter Name" name="name"></TextField>
                            <TextField variant="standard" onChange={(e)=>onInputChange(e)} label="Enter Username" name="username"></TextField>
                            <TextField variant="standard" onChange={(e)=>onInputChange(e)} label="Enter Password" name="password" type="password"></TextField>
                            <SignupButton onClick={()=>signupUser()}>SignUp</SignupButton>
                            <Typography style={{textAlign:'center'}}>OR</Typography>
                            <LoginButton variant="contained" onClick={()=>toggleSignUp()}>Already have an Account</LoginButton>
                        </Wrapper>
                }
            </Box>

        </Component>
    );
}
export default Login;