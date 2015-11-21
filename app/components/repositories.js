/**
 * Created by buggy on 11/20/15.
 */
import React from 'react-native';
import Badge from './badge';
import Separator from './helpers/separator';
import WebViewer from './helpers/webView';

let {Text, View, ScrollView, TouchableHighlight, StyleSheet} = React;

let styles = StyleSheet.create({
    container: {
        flex: 1
    },
    rowContainer: {
        flexDirection: 'column',
        flex: 1,
        padding: 10
    },
    name: {
        color: '#48BBEC',
        fontSize: 18,
        paddingLeft: -5,
        paddingBottom: 3
    },
    stars: {
        color: 'salmon',
        fontSize: 14,
        paddingBottom: 5
    },
    description: {
        fontSize: 14,
        paddingBottom: 5
    }

});

export default class Repositories extends React.Component {
    openPage(url) {
        console.log(url);
        this.props.navigator.push({
            component: WebViewer,
            title: 'Github Page',
            passProps: {url} // same as saying {url: url}
        });
    }
    render() {
        let repos = this.props.repos;
        let list = repos.map((item, index) => {
            let desc = item.description ? <Text style={styles.description}>{item.description}</Text> : <View />;
            return (
                <View key={index}>
                    <View style={styles.rowContainer}>
                        <TouchableHighlight
                        onPress={this.openPage.bind(this, item.html_url)}
                        underlayColor="transparent"
                        >
                            <Text style={styles.name}> {item.name}</Text>
                        </TouchableHighlight>
                        <Text style={styles.stars}>Stars: {item.stargazers_count}</Text>
                        {desc}
                    </View>
                    <Separator />
                </View>
            );
        });
        //console.log(this.props.repos);
        return (
            <ScrollView styles={styles.container}>
                <Badge userInfo={this.props.userInfo}/>
                {list}
            </ScrollView>
        );
    }
}

Repositories.propTypes = {
    userInfo: React.PropTypes.object.isRequired,
    repos: React.PropTypes.array.isRequired
}