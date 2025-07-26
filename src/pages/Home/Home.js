import React from "react";
import Navbar from "../../components/Navbar/Navbar"; // Updated path
import TitleCards from "../../components/TitleCards/TitleCards"; // Updated path
import "./Home.css";
import heroBanner from '../../assets/hero_banner.jpg';
import Footer from "../../components/Footer/Footer"; // Updated path
import playIcon from "../../assets/play_icon.png";
import InfoIcon from "../../assets/info_icon.png";
import heroTitle from "../../assets/hero_title.png";

const Home = () => {
    return (
        <div className="home">
            <Navbar />
            <div className="hero">
                <img src={heroBanner} alt="" className="banner_img" />
                <div className="hero-caption">
                    <img src={heroTitle} alt="" className="caption-img"/>
                    <p>Discovering the</p>
                    <div className="hero-btns">
                        <button className="btn"><img src={playIcon} alt=" " />Play</button>
                        <button className="btn btn-dark"><img src={InfoIcon} alt=" " />More Info</button>
                    </div>
                    <TitleCards />
                </div>
            </div>
            <div className="more-cards">
                <TitleCards title={"Blockbuster Movies"} category={"top_rated"} />
                <TitleCards title={"Only on Netflix"}  category={"popular"}/>
                <TitleCards title={"Upcoming"} category={"upcoming"}/>
                <TitleCards title={"Top Picks for you"} category={"now_playing"}/>
            </div>
            <Footer />
        </div>
    )
}

export default Home;