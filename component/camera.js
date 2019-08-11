
import React, { Component } from 'react';
import { Button, Text, View, AsyncStorage } from 'react-native';
import { RNCamera } from 'react-native-camera';

import { connect } from 'react-redux';

var cameraPhoto = null;

class PhotoCamera extends Component {
    static navigationOptions = {
        title: 'ФОТО . . . ',
      };
    constructor(props) {

        super(props);

        const { navigation } = this.props;
        this.setStateCamera = navigation.getParam('setStateCamera', null);

        this.camera = null;
        this.barcodeCodes = [];

        this.state = {
            camera: {
                type: RNCamera.Constants.Type.back,
                flashMode: RNCamera.Constants.FlashMode.auto,
                barcodeFinderVisible: true,
                cardnumber: ''
            }
        };
    }



 
    pressPicture = async () => {

        var base64 = '';
        if (cameraPhoto) {0
            const options = { quality: 0.5, base64: true };
            const data = await cameraPhoto.takePictureAsync(options);
            this.setStateCamera(data.base64);
        }


        this.props.navigation.goBack(null);
  
    }


    pendingView() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'lightgreen',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text>Waiting</Text>
            </View>
        );
    }

    render() {
        return (
            < View style={{ flex: 1 }}>
                <View style={styles.container}>
                    <RNCamera
                        ref={ref => {
                            cameraPhoto = ref
                        }}
                        
                        defaultTouchToFocus
                        flashMode={this.state.camera.flashMode}
                        mirrorImage={false}

                        onFocusChanged={() => { }}
                        onZoomChanged={() => { }}
                        permissionDialogTitle={'Permission to use camera'}
                        permissionDialogMessage={'We need your permission to use your camera phone'}
                        style={styles.preview}
                        type={this.state.camera.type}
                    />
            
                    <View style={[styles.overlay, styles.bottomOverlay]}>
                        <Button
                            onPress={this.pressPicture}
                            title="ФОТО"
                            color="blue"
                            accessibilityLabel="ФОТО"
                        />
                    </View>


                </View>
            </View>
        );
    }
}
// основной Объект
export default connect(
    state => ({ }),
    dispath => ({} )
)(PhotoCamera)

// Основные стили 
const styles = {
    container: {
        flex: 1
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    overlay: {
        position: 'absolute',
        padding: 16,
        right: 0,
        left: 0,
        alignItems: 'center'
    },
    topOverlay: {
        top: 0,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    bottomOverlay: {
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    enterBarcodeManualButton: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 40
    },
    scanScreenMessage: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    }
};



 



