import React from 'react-native';
import Main from './app/components/main';
//import Notes from './app/components/notes'; // Test

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

        // ======== TEST ============

        //    <NavigatorIOS
        //        style={styles.container}
        //        initialRoute={{
        //        title: 'Notes',
        //        component: Notes,
        //        passProps: {user: 'bellicose100xp', notes:{a: 'first', b: 'second', c: 'third'}}
        //}}/>

        );
    }
}


AppRegistry.registerComponent('githubNotetaker', () => githubNotetaker);