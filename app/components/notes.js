/**
 * Created by HSO on 11/20/15.
 */
import React from 'react-native';
import api from '../utils/api';
import Separator from './helpers/separator';

let {View, ScrollView, ListView, StyleSheet, Text, TextInput, TouchableHighlight} = React;

let styles = StyleSheet.create({
    container: {
        flex: 1
        //    marginTop: 65
    },
    footerContainer: {
        flexDirection: 'row',
        backgroundColor: '#e3e3e3'
    },
    button: {
        height: 60,
        backgroundColor: '#48BBEC',
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 18
    },
    searchInput: {
        height: 60,
        padding: 10,
        fontSize: 18,
        color: '#111',
        flex: 10
    },
    rowContainer: {
        padding: 5
    },
    rowText:{
        fontSize: 18,
        paddingBottom: 10
    },
    listView:{
      flex: 1
    },
    headerContainer: {
        padding: 10,
        alignItems: 'stretch',
        backgroundColor: 'tomato'
    },
    headerText: {
        fontSize: 24,
        alignSelf: 'center',
        color: 'white'
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

    handleChange(event) {
        this.setState({note: event.nativeEvent.text})
    }

    handleSubmit() {
        let note = this.state.note;
        this.setState({note: ''});
        api.addNote(this.props.user, note)
            .then(() => {
                api.getNotes(this.props.user)
                    .then(res => {
                        this.setState({dataSource: this.ds.cloneWithRows(res || {})})
                    })
            })
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
                    underlayColor="transparent">
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableHighlight>
            </View>
        );
    }

    renderRow(rowData) {
        return (
            <View style={styles.rowContainer}>
                <Text style={styles.rowText}>{rowData}</Text>
                <Separator />
            </View>
        )
    }

    renderHeader() {
        return (
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>My notes for {this.props.user}</Text>
            </View>
        )
    }


    render() {
       // console.log(this.props.notes);
        return (
            <ScrollView style={styles.container}>
                <ListView
                    style={styles.listView}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    renderHeader={this.renderHeader.bind(this)}
                />
                {this.footer()}
            </ScrollView>
        );
    }
}

Notes.propType = {
    notes: React.PropTypes.object.isRequired,
    user: React.PropTypes.string.isRequired
};