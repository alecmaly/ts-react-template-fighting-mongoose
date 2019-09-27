import React, { Component } from 'react';
import { POINT_CONVERSION_UNCOMPRESSED } from 'constants';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
    } from 'reactstrap';

class ComponentTest extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            modalOpen: false,
            myValue: '',
        };
        this.changeStuff = this.changeStuff.bind(this);
        this.alert = this.alert.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    changeStuff(evt) {
        this.setState({
            myValue: evt.target.value
        });
    }

    alert() {
        alert(this.state.myValue);
    }

    toggle() {
        this.setState({
            modalOpen: !this.state.modalOpen
        });
    }

    render() {
                return (
            <div className='componentTest'>
                <p>I love Olga -- This is top navigation: {this.props.name}</p>
                <input id='myText' type='text' onChange={this.changeStuff} value={this.state.myValue} />
                <button type='button' className={'btn btn-danger'} onClick={this.toggle}>Click Me</button>
                <p id='myID'>{this.state.myValue}</p>


                <Modal isOpen={this.state.modalOpen} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                    <ModalBody>
                        {this.state.myValue}
                    </ModalBody>
                    <ModalFooter>
                        <Button color='primary' onClick={this.toggle}>Do Something</Button>{' '}
                        <Button color='secondary' onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>


            </div>  
        );
    }
}

export default ComponentTest;