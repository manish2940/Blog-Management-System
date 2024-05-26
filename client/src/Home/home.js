import Banner from "../components/banner/banner";
import Header from "../components/header/header";
import Categories from "./categories";
import { Grid } from '@mui/material';
import Posts from "./Posts";
const Homepage = ()=>{
    return (
        <div>
            {/* <Header/> */}
            <Banner/>
            <Grid container> 
                <Grid item lg={2} xs={12} sm={2}>
                    <Categories/>
                
                </Grid>
                <Grid container item xs={12} sm={10} lg={10}>
                    <Posts/>
                </Grid>
            </Grid>
        </div>
    );

}
export default Homepage;