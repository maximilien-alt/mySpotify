import React, { Component } from 'react';
import { StyleSheet , Text , View , Image, ScrollView} from 'react-native';
import { TextInput } from 'react-native';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Audio } from 'expo-av';
import ytdl from 'react-native-ytdl';
import { elementAt } from 'rxjs/operator/elementAt';

export default class Home extends Component {
    state = {
        list: []
    }
    on_change_text = async (params) => {
        let request = params.nativeEvent.text
        const Response = await axios.get(`https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&maxResults=10&q=${request}&key=AIzaSyB-umPnY0GbfP1R7GLvlUYj3-FYcp8IQH4`);
        let list = []

        for (let index = 0; index < Response.data.items.length ; index += 1) {
            list.push({
                title: Response.data.items[index].snippet.title,
                id: Response.data.items[index].id.videoId,
                url: Response.data.items[index].snippet.thumbnails.high.url
            })
        }
        this.setState({
            list: list
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput style = {styles.edit}
                    onSubmitEditing={this.on_change_text}
                />
                <ScrollView style={{width: '100%', paddingTop: 10}}>
                    {
                        this.state.list.map(elem =>
                            <TouchableOpacity
                                onPress ={() => {
                                    this.props.navigation.navigate('Music', {
                                        musicID: elem.id,
                                        musicTitle: elem.title,
                                        musicUrl: elem.url
                                    })
                                }}
                                style = {styles.box}
                            >
                                <Image source = {{uri: elem.url}} style= {{width: 100, height: 100}}>
                                </Image>
                                <Text>
                                    {elem.title}
                                </Text>
                            </TouchableOpacity>
                        )
                    }
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    container : {
        flex : 1,
        alignItems : "center",
        marginTop: 20,
        marginLeft: 50,
        marginRight: 50,
    },
    edit : {
        width: "100%",
        backgroundColor: "black",
        color: "white",
        borderRadius: 25,
        paddingLeft: 15
    },
    box : {
        backgroundColor: 'pink',
        alignItems: "center",
        marginBottom: 25,
        borderRadius: 10,
        borderColor: '#d6d7da',
        paddingLeft: 15,
        paddingBottom: 50,
        justifyContent : "center"
    },
    clean: {
        backgroundColor: 'red'
    }
});