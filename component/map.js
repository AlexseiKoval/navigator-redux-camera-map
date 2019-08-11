

import React, { Fragment } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';


import MapView, { PROVIDER_GOOGLE, AnimatedRegion, Animated } from 'react-native-maps';

getInitialState = () => {
    return {
        region: new AnimatedRegion({
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        }),
    };
}


class AppMap extends React.Component {

    
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Карта GOOGLE ',
 
        };
    };
    render() {
        return (
            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    region={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                >
                </MapView>
            </View>
        )
    }

}

 

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 600,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default AppMap;
