import React, { Component } from "react";
import { Platform, StyleSheet, FlatList, Text, View, Alert, Image, Dimensions, Button, TouchableOpacity } from "react-native";
import { connect } from 'react-redux';

const noimg = require('.././assets/no-img.jpg');
const Skiingimg = require('.././assets/Skiing.jpg');
const googleMapimg = require('.././assets/googleMap.png');
 
export default class StartActivity extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Горнолыжное оборудование',
        };
    };

    

    render() {
        return (
            <View style={styles.container}>

                <TouchableOpacity onPress={() => { this.props.navigation.navigate('Home') }}>
        
                    <Text style={{ fontSize: 10, color: '#808080',textAlign:'center' }}>Cписок оборудования</Text>
                    <Text style={{ fontSize: 10, color: '#808080',textAlign:'center' }}>(нажмите на картинку)</Text>
                    <View style={styles.ViewShadow}>
                        <Image
                            style={styles.img15}
                            source={Skiingimg}
                        />
                    </View>
                </TouchableOpacity>
                <View style={{ height: 10 }}></View>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('Map') }}>
                     
                    <Text style={{ fontSize: 10, color: '#808080',textAlign:'center' }}>Карта GOOGLE</Text>
                    <Text style={{ fontSize: 10, color: '#808080',textAlign:'center' }}>(нажмите на картинку)</Text>
                    <View style={styles.ViewShadow}>
                        <Image
                            style={styles.img15}
                            source={googleMapimg}
                        />
                    </View>
                </TouchableOpacity>


            </View>)
    }
}


// основные стили
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#e5e5e5",
        alignItems: 'center',
    },
    img15: {
        width: Dimensions.get('window').width / 2,
        height: Dimensions.get('window').width / 2,
    },
    ViewShadow:
    {
        width: Dimensions.get('window').width / 2,
        height: Dimensions.get('window').width / 2,


        backgroundColor: '#808080',
        shadowColor: '#30C1DD',
        shadowRadius: 10,
        shadowOpacity: 0.6,
        elevation: 8,
        shadowOffset: { width: 0, height: 4 }
    }
})