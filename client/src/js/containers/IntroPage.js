import React from "react";
import Slider from "react-slick";
import { Link } from 'react-router-dom';

import slide_1 from "../../css/images/Intro_0.png";
import slide_2 from "../../css/images/Intro_1.png";
import slide_3 from "../../css/images/Intro_2.png";
import slide_4 from "../../css/images/Intro_3.png";
import slide_5 from "../../css/images/Intro_4.png";
import slide_6 from "../../css/images/Intro_5.png";
import slide_7 from "../../css/images/Intro_6.png";
import logo  from "../../css/images/logo.png";

class IntroPage extends React.Component {
    render() {
        var settings = {
            dots: false,
            arrows: false,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <div className="bg-purple vertical-center">
                <div className="container-fluid pad-0">
                    <Slider {...settings} className="size-100">
                        <div>
                            <img className="img-fluid d-block mx-auto size-100" src={slide_1} alt="slideOne" />
                        </div>
                        <div>
                            <img className="img-fluid d-block mx-auto size-100" src={slide_2} alt="slideTwo" />
                        </div>
                        <div>
                            <img className="img-fluid d-block mx-auto size-100" src={slide_3} alt="slideThree" />
                        </div>
                        <div>
                            <img className="img-fluid d-block mx-auto size-100" src={slide_4} alt="slideFour" />
                        </div>
                        <div>
                            <img className="img-fluid d-block mx-auto size-100" src={slide_5} alt="slideFive" />
                        </div>
                        <div>
                            <img className="img-fluid d-block mx-auto size-100" src={slide_6} alt="slideSix" />
                        </div>
                        <div>
                            <img className="img-fluid d-block mx-auto size-100" src={slide_7} alt="slideSeven" />
                        </div>
                        <div className="txt-center">
                            <div className="vertical-center bg-purple">
                                <div className="container-fluid">
                                    <div className="row">
                                        <img className="img-fluid d-block mx-auto mbottom-2rem" src={logo} alt="carpool_logo" id="logo-256" />
                                    </div>
                                    <p className="txt-center txt-white mx-auto">Now that you now how the Carpool Platform works, all you need to do is log into your account to get started!</p>
                                    <div className="row">
                                        <Link to={`/Login`} className="btn btn-primary mx-auto width-15rem brad-2rem bg-aqua txt-purple fw-bold" id="btnLoginPage">
                                            Proceed to Login
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Slider>
                </div>
            </div>
        );
    }
}

export default IntroPage;