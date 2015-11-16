/**
 * Created by buggy on 11/13/15.
 */
import React from 'react-native';

let {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableHighlight
    } = React;

let styles = StyleSheet.create({
    container: {
        marginTop: 65,
        flex: 1
    },
    image: {
        height: 350
    },
    buttonText: {
        fontSize: 24,
        color: 'white',
        alignSelf: 'center'
    }
});

export default class Dashboard extends React.Component {

    makeBackground(btn) {
        let obj = {
            flexDirection: 'row',
            alignSelf: 'stretch',
            justifyContent: 'center',
            flex: 1
        };

        switch(btn){
            case 0:
                obj.backgroundColor = '#48BBEC';
                break;
            case 1:
                obj.backgroundColor = '#E77AAE';
                break;
            default:
                obj.backgroundColor = '#758BF4';
        }

        return obj;
    }

    goToProfile(){
        console.log('Going to Profile Page');
    }

    goToRepos(){
        console.log('Going to Repos Page');
    }

    goToNotes(){
        console.log('Going to Notes Page');
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={{uri: this.props.userInfo.avatar_url}} style={styles.image}/>
                <TouchableHighlight
                    style={this.makeBackground(0)}
                    onPress={this.goToProfile.bind(this)}
                    underlayColor="#88D4F5">
                    <Text style={styles.buttonText}>View Profiles</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={this.makeBackground(1)}
                    onPress={this.goToRepos.bind(this)}
                    underlayColor="#88D4F5">
                    <Text style={styles.buttonText}>View Repos</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={this.makeBackground(2)}
                    onPress={this.goToNotes.bind(this)}
                    underlayColor="#88D4F5">
                    <Text style={styles.buttonText}>View Notes</Text>
                </TouchableHighlight>
            </View>
        )
    }
}