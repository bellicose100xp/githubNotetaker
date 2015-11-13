import React from 'react-native';
import Main from './app/components/main';


let {
    AppRegistry,
    StyleSheet,
    Text,
    NavigatorIOS,
    View
    } = React;

let styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111111'
    }
});

class githubNotetaker extends React.Component {
    render() {
        return (
            <NavigatorIOS
                style={styles.container}
                initialRoute={{
          title: 'Github NoteTaker',
          component: Main 
        }}/>
        );
    }
}


AppRegistry.registerComponent('githubNotetaker', () => githubNotetaker);