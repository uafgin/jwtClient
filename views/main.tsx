
import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { infoResponse } from '../model/InfoResponse';

interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  }

export default class main extends Component<Props> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }
    private infoResponse: infoResponse = {
        firstName: '',
        lastName: ''
    }
    componentWillMount(){
        fetch('http://localhost:8080/info/getInfo/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem("token") as string
            },  
            body: null
        }).then(response => response.json())
        .then((res) => {
            if (!res.status) {
                this.infoResponse = res;
                this.setState(previousState => ({ error: '' }));
            }
            else {
                sessionStorage.removeItem("token");
                this.props.navigation.navigate('Login');
            }
        });
    }

    render() {
        return (
            <View>
                <Text>Hello: {this.infoResponse.firstName} {this.infoResponse.lastName}</Text>
            </View>
        )
    }
}