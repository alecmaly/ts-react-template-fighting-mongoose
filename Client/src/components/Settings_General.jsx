import React, { Component } from 'react';
import { POINT_CONVERSION_UNCOMPRESSED } from 'constants';
import {
    Alert,
    UncontrolledAlert,
    Form,
    FormGroup,
    InputGroup,
    Button,
    Label,
    Input } from 'reactstrap';

class Settings_General extends Component {
    constructor(props) {
        super(props);
        this.dismissAlerts = this.dismissAlerts.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { 
            background: '',
            alertSuccess: false
        };
    }


    handleSubmit(event) {
        this.setState({
            alertSuccess: true,
            backgroundColor: event.target.background
        });
        setInterval(() => { 
            this.setState({alertSuccess: false});
        }, 2750);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    dismissAlerts() {
        this.setState({
            alertSuccess: false
        });
    }

    render() {
                return (
            <div className='componentTest'>
                <Alert color='success' isOpen={this.state.alertSuccess} toggle={this.dismissAlerts} >Save Successful</Alert>
                {/* <Form action='/signup/insert' method='POST'> */}
                <Form onSubmit={this.state.handleSubmit}>
                    <FormGroup>
                        <Label for='Background Color'>Background Color</Label>
                        <InputGroup>
                            <span style={{'backgroundColor':`${this.state.background}`, 'borderRadius':'10px'}}>Preview</span>&nbsp;&nbsp;
                            <Input name='background' type='text' id='backgroundColor' placeholder='Input color here (color name OR #_HEX_)'  onChange={this.handleInputChange} />
                        </InputGroup>
                    </FormGroup>
                    <Button color='info' onClick={this.handleSubmit}>Save</Button>
                </Form>
                <p>{this.state.background}</p>
                <p>final answer {this.state.background}</p>
            </div>  
        );
    }
}

export default Settings_General;