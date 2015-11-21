/**
 * Created by HSO on 11/20/15.
 */
import React from 'react-native';

let {View, WebView, StyleSheet} = React;

let styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F6EF',
        flexDirection: 'column'
    }
});

export default class WebViewer extends React.Component {
    render(){
        return (
            <View style={styles.container}>
                <WebView url={this.props.url} />
            </View>
        );
    }
}

WebViewer.propTypes = {
    url: React.PropTypes.string.isRequired
};