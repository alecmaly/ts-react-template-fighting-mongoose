import React, { Component } from 'react';
import { POINT_CONVERSION_UNCOMPRESSED } from 'constants';
import { Container, Button } from 'reactstrap'; 
import '../Styles/Navigation.css';


class Home extends Component {
    render() {
        return (
            <div className='myTheme'>
                    <div>
                        <h1>Home TEST</h1>
                        <p>this is the home page</p>
                        <button type='button' className={'btn btn-primary'}>test</button>
                       
                        
                        <br /><br /><br /><br /><br /><br /><br /><br />
                        <br /><br /><br /><br /><br /><br /><br /><br />
                        <br /><br /><br /><br /><br /><br /><br /><br />
                        <br /><br /><br /><br /><br /><br /><br /><br />
                        <br /><br /><br /><br /><br /><br /><br /><br />
                    </div>
            </div>
        );
    }
}

export default Home;