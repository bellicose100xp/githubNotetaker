/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

'use strict';
import React from 'react-native';
import Main from './app/components/main';

var {
    AppRegistry,
    StyleSheet,
    NavigatorIOS,
    Text,
    View,
    } = React;

class githubNotetaker extends React.Component {
    render() {
        return (
            <NavigatorIOS
                initialRoute={{
                title: 'Github Notetaker',
                component: Main
                }}/>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});

AppRegistry.registerComponent('githubNotetaker', () => githubNotetaker);
