import React, { Component } from 'react';
import { POINT_CONVERSION_UNCOMPRESSED } from 'constants';
import { 
    Container,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input } from 'reactstrap';
import '../Styles/Navigation.css';


class NewsDetail extends Component {
    render() {
        return (
            <div>
            <Container className='myTheme'>
                <h2>News Detail</h2>
                <p>Messages</p>
            </Container>
            </div>
        );
    }
}


export default NewsDetail;