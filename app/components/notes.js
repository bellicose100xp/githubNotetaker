/**
 * Created by HSO on 11/20/15.
 */
import React from 'react-native';
import api from '../utils/api';

let {View, ListView, StyleSheet, Text, TextInput, TouchableHighlight} = React;

let styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    footerContainer: {
        paddingTop: 100,
        flexDirection: 'row'
    },
    button: {
        height: 60,
        backgroundColor: '#48BBEC',
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize:18
    },
    searchInput: {
        height: 60,
        padding: 10,
        fontSize: 18,
        color: '#111',
        flex: 10
    }

});

export default class Notes extends React.Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: this.ds.cloneWithRows(this.props.notes || {}),
            note: ''
        }
    }

    handleChange(event){
        this.setState({note: event.nativeEvent.text})
    }

    handleSubmit(){
        let note = this.state.note;
        this.setState({note: ''});
        api.addNote(this.props.user, note);
    }

    footer() {
        return (
            <View style={styles.footerContainer}>
                <TextInput
                    style={styles.searchInput}
                    value={this.state.note}
                    onChange={this.handleChange.bind(this)}
                    placeholder="Add New Note"
                />
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.handleSubmit.bind(this)}
                    underlayColor="transparent" >
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableHighlight>
            </View>
        );
    }


    render() {
        return (
            <View style={styles.container}>
                {this.footer()}
            </View>
        );
    }
}

Notes.propType = {
    notes: React.PropTypes.object.isRequired,
    user: React.PropTypes.string.isRequired
}