import React, { Component } from 'react';
import { POINT_CONVERSION_UNCOMPRESSED } from 'constants';
import { Container } from 'reactstrap';

import ComponentTest from '../Components/ComponentTest.jsx'; 

class Messages extends Component {
    render() {
        return (
            <Container className='myTheme'>
                <h2>Messages</h2>
                <p>Messages</p>
                <ComponentTest className='navTheme' name='test' />
            </Container>
        );
    }
}


export default Messages;