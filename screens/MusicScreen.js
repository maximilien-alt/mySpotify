import React, { Component } from 'react';
import { StyleSheet , Text , View , Image } from 'react-native';
import { Audio } from 'expo-av';
import ytdl from 'react-native-ytdl';
import Home from './HomeScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Music extends Component {
    state = {
        playingStatus: true,
        sound: {},
        id: this.props.navigation.state.params.musicID
    }
    play_music = (id) => {
        ytdl.getInfo(id, {}, async (err, info) => {
            if (err) console.log( err );
            let audioFormats = ytdl.filterFormats(info.formats,'audioonly');
            const music = new Audio.Sound();

            await music.loadAsync({ uri: audioFormats[0].url }) ;
            await music.playAsync();
            this.setState({sound: music})
        });
    }
    pause_music = () => {
        if (this.state.playingStatus == false) {
            this.state.sound.playAsync()
            this.setState({playingStatus: true})
        } else {
            this.state.sound.pauseAsync()
            this.setState({playingStatus: false})
        }
    }
    componentDidMount = () => {
        this.play_music(this.state.id)
    }
    render() {
        const musicTitle = this.props.navigation.state.params.musicTitle;
        const musicUrl = this.props.navigation.state.params.musicUrl;
        return (
            <View style={styles.container}>
                <Image 
                    style = {styles.image}
                    source= {{uri: musicUrl}}>
                </Image>
                <Text 
                    style={styles.text}>
                    You're curently listening : {musicTitle}
                </Text>
                <TouchableOpacity 
                    onPress= {this.pause_music}>
                    <Image
                        style= {styles.pause}
                        source= {require ('../assets/pause.png')}>
                    </Image>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create ({
    container : {
        flex : 1,
        justifyContent : "center",
        alignItems : "center",
        backgroundColor: "black",
        paddingLeft: 25,
        paddingRight: 25
    },
    text: {
        color: "white",
        paddingTop: 50
    },
    image: {
        width: 400,
        height: 300,
        borderRadius: 50,
        paddingBottom: 25
    },
    pause: {
        width: 100,
        height: 100,
        paddingTop: 20
    }
});