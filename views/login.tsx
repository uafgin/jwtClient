
import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { State, TextInput } from 'react-native-gesture-handler';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { JwtTokenRequest } from '../model/JwtTokenRequest';

interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  }
  
export default class login extends Component<Props> {
    private loginCredentials: JwtTokenRequest = { userName: '', password: ''} ;
    constructor(props: Props) {
        super(props);
        this.state = { loginCredentials: this.loginCredentials, error: '' };
    }
    componentWillMount(){
        if (sessionStorage.getItem("token")) {
            this.props.navigation.navigate('Main');
        }
    }
    
    gettoken = () => {
        fetch('http://localhost:8080/token/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(this.loginCredentials)
        }).then(response => response.json())
        .then((res) => {
            if (res.token) {
                sessionStorage.setItem("token",'Token ' + res.token);
                this.props.navigation.navigate('Main');
            }
            else {
                this.setState(previousState => ({ error: res.message }));
            }
            
        });
    }

    onChangeUserMame (text: string) {
        this.loginCredentials.userName = text;
        this.setState(previousState => ({ loginCredentials: this.loginCredentials }));
    }

    onChangePassword (text: string) {
        this.loginCredentials.password = text;
        this.setState(previousState => ({ loginCredentials: this.loginCredentials }));
    }

    render() {
        return (
        <View>
            <TextInput
                placeholder="username"
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={(text) => this.onChangeUserMame(text)}
                value={this.loginCredentials.userName}
            />
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} 
                placeholder="password"
                secureTextEntry={true}
                onChangeText={(text) => this.onChangePassword(text)}
                value={this.loginCredentials.password}
            />
            <p>{this.state.error}</p>
            <Button title="login" onPress={this.gettoken} />
        </View>
        );
    }
  };