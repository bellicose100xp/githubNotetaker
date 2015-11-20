/**
 * Created by buggy on 11/20/15.
 */
import React from 'react-native';
import Badge from './badge';
import Separator from '../helpers/separator';

let {Text, View, ScrollView, TouchableHighlights, StyleSheet} = React;

let styles = StyleSheet.create({});

export default class Repositories extends React.Component {
    render(){
        return(
            <ScrollView>
                <Badge userInfo={this.props.userInfo} />
            </ScrollView>
        );
    }
}