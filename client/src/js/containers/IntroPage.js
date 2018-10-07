
// import { Link } from 'react-router-dom';
import React from "react";
import Slider from "react-slick";
import Dialog from '@material-ui/core/Dialog';

import slide_1 from "../../css/images/Intro_0.png";
import slide_2 from "../../css/images/Intro_1.png";
import slide_3 from "../../css/images/Intro_2.png";
import slide_4 from "../../css/images/Intro_3.png";
import slide_5 from "../../css/images/Intro_4.png";
import slide_6 from "../../css/images/Intro_5.png";
import slide_7 from "../../css/images/Intro_6.png";
import check_gif from "../../css/images/animat-checkmark.gif"
// import logo  from "../../css/images/logo.png";

import { Button, DialogContent } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

class IntroPage extends React.Component {
    constructor(){
        super();

        this.state = {
            open: true,
            finished: false,
        }
    }

    closeCarousel = (event) => {
        event.preventDefault();

        this.setState({
            open: false,
        })
    }

    handleChange = (index) => {
        if(index > 6) {
            this.setState({
                finished: true,
            })
        }
    }

    render() {          
        const settings = {
            dots: false,
            arrows: false,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };

        return (
           <Dialog 
                aria-labelledby="simple-dialog-title"
                open={this.state.open}
                onClose={this.handleClose}
                scroll="paper"
                maxWidth="lg"
                fullWidth={true}
                adaptiveHeight={true}
            >
                <DialogTitle>Getting Started</DialogTitle>
                <DialogContent>
                    <Slider {...settings} afterChange={this.handleChange}>
                        <img src={slide_1} alt="slide_1"/>
                        <img src={slide_2} alt="slide_2"/>
                        <img src={slide_3} alt="slide_3"/>
                        <img src={slide_4} alt="slide_4"/>
                        <img src={slide_5} alt="slide_5"/>
                        <img src={slide_6} alt="slide_6"/>
                        <img src={slide_7} alt="slide_7"/>                      
                        <img src={check_gif} alt="check_gif"/>                      
                    </Slider>
                </DialogContent>
                <DialogActions style={{ justifyContent: "center" }} >
                    <Button disabled={!this.state.finished} onClick={this.closeCarousel} color="secondary" variant="contained" autoFocus>
                        Let's Go
                    </Button>
                </DialogActions>
            </Dialog>
            
        );
    }
}

export default IntroPage;