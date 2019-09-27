import React, { Component } from 'react';
import { Jumbotron, Button, Container } from 'reactstrap';
import '../Styles/Banner.css';


class Banner extends Component {



    render() {
        return (
            //{/* <Jumbotron style={{'backgroundImage': `url('${this.props.bannerURL}')` }} className='topBanner' fluid> */}
            <Jumbotron style={{'backgroundImage': `url('${this.props.bannerURL}')` }} className='topBanner' fluid>
                <h1 className="display-3"><b>{this.props.bannerTitle}</b></h1>
                <p>{this.props.bannerDescription}</p>
            </Jumbotron>
        );
    }

}


export default Banner;
