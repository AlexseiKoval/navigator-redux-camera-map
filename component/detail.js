import React from "react";
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, Image, Dimensions, TextInput } from "react-native";
import { connect } from 'react-redux';


const noimg = require('.././assets/no-img.jpg');



class DetailsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title', '<< не заполнено >>'),
        };
    };

    constructor(props) {
        super(props);
        const { navigation } = this.props;
        const itemEl = navigation.getParam('item', null);
        const indexEl = navigation.getParam('index', null);
        this.state = { pict1: itemEl.pict1, title: itemEl.title, sum: itemEl.sum, indexEl };
    }


    setStateCamera = (base64) => {
        this.setState({ pict1: base64 })
    }

    buttonClickUpdate = () => {
        var newArray = this.props.FlatListItems.slice();
        if (this.state.indexEl == 'new') {
            newArray.push({ pict1: this.state.pict1, title: this.state.title, sum: this.state.sum })
        } else {
            newArray[this.state.indexEl] = { pict1: this.state.pict1, title: this.state.title, sum: this.state.sum };
        }

        this.props.getNewList(newArray);
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ height: 5 }}></View>
                <Text style={{ fontSize: 10, color: '#808080' }}> Для получения фото - нажмите на картинку</Text>

                <TouchableOpacity onPress={() => { this.props.navigation.navigate('PhotoCamera', { setStateCamera: this.setStateCamera }) }}>
                    <View style={styles.ViewShadow}>
                        {(!this.state.pict1) ?

                            <Image
                                style={styles.img15}
                                source={noimg}
                            /> :
                            <Image
                                style={styles.img15}
                                source={{
                                    uri: `data: image/jpeg;base64,${this.state.pict1}`
                                }}
                            />}
                    </View>
                </TouchableOpacity>
                <View style={{ height: 5 }}></View>
                <View style={{ alignItems: 'center', flexDirection: 'column' }}>
                    <View style={{ alignItems: 'center', flexDirection: 'row' }} >
                        <Text style={{ flex: 0.4 }}>описание:</Text>
                        <TextInput value={this.state.title} placeholder=' . . .' onChangeText={(elText) => { this.setState({ title: elText }) }} />

                    </View>

                    <View style={{ alignItems: 'center', flexDirection: 'row' }} >
                        <Text style={{ flex: 0.4 }}>Примерная стоимость:</Text>
                        <TextInput value={this.state.sum} placeholder='0' keyboardType='numeric' onChangeText={(elText) => { this.setState({ sum: elText }) }} />
                    </View>
                </View>
                <View style={{ height: 5 }}></View>
                <Button
                    onPress={this.buttonClickUpdate}
                    title="СОХРАНИТЬ"
                    color="red"
                    accessibilityLabel="Learn more about this purple button"
                />

            </View >
        );
    }
}


// Основной объект
export default connect(
    state => ({ FlatListItems: state.FlatListItems }),
    dispath => ({
        getNewList: (FlatListItems) => { dispath({ type: 'getNewList', FlatListItems: FlatListItems }) }
    }
    )
)(DetailsScreen)


// Основные Стили 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        //  justifyContent: 'center'

    },
    img15: {
        width: Dimensions.get('window').width / 1.5,
        height: Dimensions.get('window').width / 1.5,
    },
    ViewShadow:
    {
        width: Dimensions.get('window').width / 1.5,
        height: Dimensions.get('window').width / 1.5,


        backgroundColor: '#808080',
        shadowColor: '#30C1DD',
        shadowRadius: 10,
        shadowOpacity: 0.6,
        elevation: 8,
        shadowOffset: { width: 0, height: 4 }
    }
});