import React from 'react';
import videoInfo from '../../assets/video_track.mp4';
import './Home.css';
import { Typography } from '@material-ui/core';
class Home extends React.Component {

render(){
    return(

        <div>

            <div className="title-home">
            <Typography variant="h4" gutterBottom>
                    Track your job applications
                </Typography>
                <Typography variant="body" gutterBottom>
                    Keep your agenda clean
                </Typography>
            </div>
           <div className="video-container">

               <video className="video" autoPlay muted loop id="video">
               <source src={videoInfo} type="video/mp4" />

               </video>
            

            </div>

        </div>
    );
}
};

export default Home;