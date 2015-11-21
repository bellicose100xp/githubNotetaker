/**
 * Created by HSO on 11/20/15.
 */
import React from 'react-native';
import api from '../utils/api';
import Separator from './helpers/separator';

let {View,
    ScrollView,
    ListView,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    Dimensions,
    DeviceEventEmitter}= React;

let styles = StyleSheet.create({
    container: {
        flex: 1
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
    rowText: {
        fontSize: 18,
        paddingBottom: 10
    },
    listView: {
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
            note: '',
            visibleHeight: Dimensions.get('window').height
        }
    }

    componentDidMount() {
        this.keyboardShowListener = DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
        this.keyboardHideListener = DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
    }

    keyboardWillShow(e) {
        let newSize = Dimensions.get('window').height - e.endCoordinates.height;
        this.setState({visibleHeight: newSize})
    }

    keyboardWillHide(e) {
        this.setState({visibleHeight: Dimensions.get('window').height})
    }

    componentWillUnmount() {
        this.keyboardShowListener.remove();
        this.keyboardHideListener.remove();
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
                    ref="note"
                    style={styles.searchInput}
                    value={this.state.note}
                    onChange={this.handleChange.bind(this)}
                    //    onFocus={this.inputFocused.bind(this, 'note')}
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

    handleDelete(rowData, sectionID, rowID) {
       // console.log(`rowData: ${rowData}, sectionID: ${sectionID}, rowID: ${rowID}`);
        api.deleteNote(this.props.user, rowID).then(() => {
            api.getNotes(this.props.user)
                .then(res => {
                    this.setState({dataSource: this.ds.cloneWithRows(res || {})})
                })
        })
    }

    renderRow(rowData, sectionID, rowID) {
        return (
            <View style={styles.rowContainer}>
                <TouchableHighlight
                    onPress={this.handleDelete.bind(this, rowData, sectionID, rowID)}
                    underlayColor="transparent">
                    <Text style={styles.rowText}>{rowData}</Text>
                </TouchableHighlight>
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
        return (
            <View style={{height: this.state.visibleHeight}}>
                <ListView
                    style={styles.listView}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    renderHeader={this.renderHeader.bind(this)}
                />
                {this.footer()}
            </View>
        );
    }
}

Notes.propType = {
    notes: React.PropTypes.object.isRequired,
    user: React.PropTypes.string.isRequired
};