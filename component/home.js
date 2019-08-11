import React, { Component } from "react";
import { Platform, StyleSheet, FlatList, Text, View, Alert, Image, Dimensions, Button, TouchableHighlight } from "react-native";
import { connect } from 'react-redux';

const noimg = require('.././assets/no-img.jpg');

class HomeActivity extends Component {


    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Оборудование',

            headerRight: (
                <Button
                    onPress={() => {
                        navigation.navigate('Details', { item: { pict1: null, title: null, sum: null }, index: 'new', title: null })
                    }}
                    title="Добавить"
                    color="#008000"
                />
            ),
        };
    };



    constructor(props) {
        super(props);
        this.state = { FlatListItems: props.FlatListItems };

    }

    FlatListItemSeparator = () => {
        return (
            <View style={{ height: 1, width: "100%", backgroundColor: "#607D8B" }} />
        );
    };

    FlatListRenderItem = ({ item, index }) => {
        return (
            <View style={styles.itemlist} key={index}>
                <View style={styles.ViewShadow}>
                    {(!item.pict1) ?
                        <Image
                            style={styles.img5}
                            source={noimg}
                        /> :
                        <Image
                            style={styles.img5}
                            source={{
                                uri: `data: image/jpeg;base64,${item.pict1}`
                            }}
                        />}
                </View>
                <TouchableHighlight
                    onPress={this.GetItem.bind(this, { item, index })}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.item} > {item.title} </Text>
                        <Text style={Object.assign({}, styles.item, { fontSize: 10, color: '#D2691E' })}   >
                            примерная стоимость {item.sum} </Text>
                    </View>
                </TouchableHighlight>

                <View style={{ flexDirection: 'column' }}>
                    <Text style={Object.assign({}, styles.item, { fontSize: 30 })} onPress={this.GetItem.bind(this, { item, index })} >  &#9998;</Text>
                    <Text style={Object.assign({}, styles.item, { fontSize: 30 })} onPress={this.DeleteGetItem.bind(this, { item, index })} >  &#10008; </Text>
                </View>
            </View>)
    }

    GetItem(objItemInd) {
        this.props.navigation.navigate('Details', { item: objItemInd.item, index: objItemInd.index, title: objItemInd.item.title })
    }

    DeleteGetItem(objItemInd) {
        Alert.alert(
            'Удалить ? ',
            'Вы уверены ?',
            [
                { text: 'НЕТ', onPress: () => { }, style: 'cancel' },
                {
                    text: 'ДА', onPress: () => {

                        var newArray = this.props.FlatListItems.filter((el, index) => { return index != objItemInd.index }).slice();
                        this.props.getNewList(newArray);
                    }
                },
            ],

            { cancelable: false }
        )


    }

    // Функция отправки данных на сервер 
    sendDataPost = () => {
        Alert.alert(
            'Отправить данные ? ',
            'Вы уверены ?',
            [
                { text: 'НЕТ', onPress: () => { }, style: 'cancel' },
                {
                    text: 'ДА', onPress: () => {
                        var formData = new FormData();
                        formData.append('datajson', JSON.stringify(this.props.FlatListItems));              
                        fetch("https://server.kov-al.in.ua/snowdata.php",
                            {
                                method: "POST",
                                body: formData
                            })
                            .then((res) => { return res.json(); })
                            .then((data) => {
                                var  FlatListItems = [];
                                this.props.getNewList(FlatListItems);
                                Alert.alert('Данные отправлены');
                            })
                    }
                },
            ],

            { cancelable: false }
        )


      
    }


    render() {
        return (
            <View style={styles.container}>
                {(this.props.FlatListItems.length > 0) ?
                    <FlatList
                        data={this.props.FlatListItems}
                        ItemSeparatorComponent={this.FlatListItemSeparator}
                        renderItem={this.FlatListRenderItem}
                    />
                    : <View><Text style={{ fontSize: 20, color: '#808080', textAlign: 'center' }} >Список пуст. Добавте оборудованиие  </Text>
                        <Text style={{ fontSize: 12, color: '#808080', textAlign: 'center' }} >оборудование можно добавить нажав кнпку</Text>
                        <Text style={{ fontSize: 12, color: 'gren', textAlign: 'center' }} >"ДОБАВИТЬ"  </Text>
                        <Text style={{ fontSize: 12, color: '#808080', textAlign: 'center' }} > (в верхнем правом углу екрана) </Text>
                    </View>}

                {(this.props.FlatListItems.length > 0) ? <Button
                    onPress={this.sendDataPost}
                    title="Отправить данные на сервер"
                    color="#008000"
                /> : <Text style={{ fontSize: 10, color: '#808080', textAlign: 'center' }} > Данных для отправки нет </Text>}


            </View>
        );
    }

}

// Основной оьбъект
export default connect(
    state => ({
        myname: state,
        FlatListItems: state.FlatListItems
    }),
    dispath => ({
        getNewList: (FlatListItems) => { dispath({ type: 'getNewList', FlatListItems: FlatListItems }) }
    }
    )
)(HomeActivity)

// основные стили
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#e5e5e5",
        // alignItems: 'center',
    },
    itemlist: {
        paddingLeft: 5,
        flex: 1,
        justifyContent: "space-between",
        alignItems: 'center',
        height: (Dimensions.get('window').width / 3) + 5,
        backgroundColor: "#e5e5e5",
        flexDirection: 'row'
    },

    headerText: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
        fontWeight: "bold"
    },
    item: {

        fontSize: 20,

        textAlignVertical: 'center'
    },
    img5: {

        width: Dimensions.get('window').width / 4,
        height: Dimensions.get('window').width / 4,
        alignItems: 'center',

    },
    ViewShadow:
    {
        width: Dimensions.get('window').width / 4,
        height: Dimensions.get('window').width / 4,


        backgroundColor: '#808080',
        shadowColor: '#30C1DD',
        shadowRadius: 10,
        shadowOpacity: 0.6,
        elevation: 8,
        shadowOffset: { width: 0, height: 4 }
    }

});