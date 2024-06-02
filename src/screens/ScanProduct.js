import React, { useState, useEffect, useRef } from 'react';
import { View, Image, StyleSheet, StatusBar, Dimensions, Linking } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { CameraView as Camera, useCameraPermissions } from 'expo-camera';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { HomeStyles } from './styles';
import { CameraType } from 'expo-camera';
import { useTranslation } from 'react-i18next';
const SCREENWIDTH = Dimensions.get("window").width;
const SCREENHEIGHT = Dimensions.get("window").height;
import { APP_SCREENS, CUSTOM_MARGIN } from '../constants';

//COMponent to scan product 
const ScanProduct = ({ navigation }) => {
    const [permission, requestPermission] = useCameraPermissions();
    const [imageUri, setImageUri] = useState(null);
    const [flash, setFlash] = useState(false);
    const cameraRef = useRef(null);
    const { t } = useTranslation();
    const theme = useTheme();

    useEffect(() => {
        requestPermission();
    }, []);

    useEffect(() => {
        return navigation.addListener("focus", () => {
            setImageUri(null);
        });
    }, [navigation])

    const takePicture = async () => {
        if (cameraRef.current) {
            const { uri } = await cameraRef.current.takePictureAsync();
            setImageUri(uri);
        }
    };

    const retakePicture = () => {
        setImageUri(null);
    };

    const handleImageSubmit = () => {
        // You can pass the captured image URI to the next screen or perform any other action here
        //console.log("Image submitted:", imageUri);
        // Navigate to the next screen
        navigation.navigate(APP_SCREENS.ENTER_MANUALLY, { ean: '', imageUri, source: "productImage" });
    };

    return (
        <View style={styles.container}>

            {
                permission && permission.granted ?
                    imageUri ? (
                        <>
                            <Text variant='headlineMedium' style={{ textAlign: 'center' }} >{t("result")}</Text>
                            <Image source={{ uri: imageUri }} style={styles.cameraView} />
                            {/* <Text style={{ textAlign: 'center', fontSize: 30 }}>{t("code_value")} {barcodeValue}</Text> */}
                            <View style={{}}>
                                {/* <Pressable
                                onPress={onBarCodeRescan}
                                style={[, { backgroundColor: '#FF5733' }]}
                            >
                                <Text style={{ color: 'white' }}>{t("rescan")}</Text>
                            </Pressable>

                            <Pressable
                                onPress={() => navigation.navigate("AddProduct", { ean: barcodeValue, source: "barcodeImage" })}
                                style={[{ backgroundColor: '#32CD32' }]}
                            >
                                <Text style={{ color: 'white' }}>{t("proceed")}</Text>
                            </Pressable> */}
                                <Button
                                    mode='elevated'
                                    // dark={true}
                                    buttonColor={'#FF5733'}
                                    textColor={theme.colors.background}
                                    onPress={retakePicture}
                                    style={{ height: 50, justifyContent: 'center', margin: CUSTOM_MARGIN }}>
                                    {/* {t("retake")} */}
                                    <Text variant='titleLarge' style={{ color: theme.colors.background }}>{t("retake")}</Text>
                                </Button>
                                <Button
                                    mode='elevated'
                                    // dark={true}
                                    buttonColor={'#32CD32'}
                                    textColor={theme.colors.background}
                                    onPress={handleImageSubmit}
                                    style={{ height: 50, justifyContent: 'center', margin: CUSTOM_MARGIN }}>
                                    {/* {t("proceed")} */}
                                    <Text variant='titleLarge' style={{ color: theme.colors.background }}>{t("proceed")}</Text>
                                </Button>
                            </View>
                        </>) : (
                        <>
                            <Text variant='headlineMedium' style={{ textAlign: 'center' }}>{t("scan_product")}</Text>
                            <Camera
                                style={styles.cameraView}
                                facing={'back'}
                                ratio="4:3"
                                ref={cameraRef}
                                enableTorch={flash}
                            />
                            {/* <Pressable
                                onPress={() => setFlash(!flash)}
                                style={[{
                                    backgroundColor: flash ? '#fff' : '#ffffff00',
                                    borderColor: !flash ? '#fff' : '#000',
                                },]}
                            >
                                <MaterialCommunityIcons name='torch' size={30} color={flash ? '#000000' : '#fff'} />
                            </Pressable> */}

                            <Button icon='torch'
                                mode='elevated'
                                // dark={true}
                                buttonColor={theme.colors.primary}
                                textColor={theme.colors.background}
                                onPress={() => setFlash(!flash)}
                                style={{ height: 50, justifyContent: 'center', margin: CUSTOM_MARGIN }}
                            >
                                {t("torch")}
                            </Button>
                            <Button icon='camera'
                                mode='elevated'
                                // dark={true}
                                buttonColor={theme.colors.primary}
                                textColor={theme.colors.background}
                                onPress={takePicture}
                                style={{ height: 50, justifyContent: 'center', margin: CUSTOM_MARGIN }}
                            >
                                {t("capture")}
                            </Button>
                        </>

                    ) : (
                        <View style={[styles.container, { justifyContent: 'center', margin: CUSTOM_MARGIN }]}>
                            <Text style={{ textAlign: 'center', margin: CUSTOM_MARGIN }}>{t("need_permission_for_camera")}</Text>
                            <Button mode="contained" onPress={() => {
                                if (!permission.canAskAgain) {
                                    Linking.openSettings();
                                }
                                requestPermission();
                            }}>
                                {t("grant_permission")}
                            </Button>
                        </View>
                    )

            }


        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        // alignItems: 'center'
    },
    cameraView: {
        flex: 1,
        // width: SCREENWIDTH - CUSTOM_MARGIN * 10,
        // height: ((SCREENWIDTH - CUSTOM_MARGIN * 2) * 3) / 4,
    }
})

export default ScanProduct;
