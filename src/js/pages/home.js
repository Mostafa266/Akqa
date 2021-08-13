import Navbar from "./../components/navbar";
import Slider from './../utils/slider';
import Video from './../components/video';
import  './../components/references';

const Home = _ => {
    Navbar();
    Video();
    Slider('features_slider',3);
}


export default Home;
