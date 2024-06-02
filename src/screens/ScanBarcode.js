import React, { useState, useRef, useEffect } from 'react';
import { View, Pressable, Dimensions, Image, StyleSheet, StatusBar, Linking, Alert } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import { CameraView as Camera, useCameraPermissions } from 'expo-camera';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { HomeStyles } from './styles';
import { useTranslation } from 'react-i18next';
import { APP_SCREENS } from '../constants';


const SCREENWIDTH = Dimensions.get("window").width;
const SCREENHEIGHT = Dimensions.get("window").height;
const CUSTOM_MARGIN = 20;


const ScanBarcode = ({ navigation }) => {
    const [barcodeValue, setBarcodeValue] = useState(null);
    const [permission, requestPermission] = useCameraPermissions();
    const [flash, setFlash] = useState(false);
    const [imageUri, setImageUri] = useState(null);
    const cameraRef = useRef(null);
    const { t } = useTranslation();
    const theme = useTheme();

    // Reset values when component is mounted or navigated back to
    useEffect(() => {
        setBarcodeValue(null);
        setFlash(false);
        setImageUri(null);
    }, []);

    useEffect(() => {
        requestPermission();
    }, []);


    const onBarCodeScanned = async ({ data }) => {
        setBarcodeValue(data);
        try {
            if (cameraRef.current) {
                const { uri } = await cameraRef.current.takePictureAsync();
                setImageUri(uri);
            }
        } catch (error) {
            // Alert.alert("Error", "failed to capture barcode")
            console.log("fail to capture bbarcode")
        }
    };

    const onBarCodeRescan = () => {
        setBarcodeValue(null);
        setImageUri(null);

    };

    return (
        <View style={styles.container}>
            {/* {!barcodeValue && <Text variant='headlineMedium' >{t("scan_product_barcode")}</Text>} */}
            {/* {!barcodeValue && <Camera
                style={[, { height: SCREENWIDTH - 30 }]}
                type={CameraType.back}
                ratio="1:1"
                ref={cameraRef}
                enableTorch={flash}
                barCodeScannerSettings={{
                    barCodeTypes: ['aztec', 'ean13', 'ean8', 'qr', 'pdf417', 'upc_e', 'datamatrix', 'code39', 'code93', 'itf14', 'codabar', 'code128', 'upc_a'],
                }}
                onBarcodeScanned={onBarCodeScanned}
            >
                <Pressable
                    onPress={() => setFlash(!flash)}
                    style={[{
                        backgroundColor: flash ? '#fff' : '#ffffff00',
                        borderColor: !flash ? '#fff' : '#000',
                    }, ]}
                >
                    <MaterialCommunityIcons name='torch' size={30} color={flash ? '#000000' : '#fff'} />
                </Pressable>
            </Camera>} */}

            {
                permission && permission.granted ?
                    barcodeValue && imageUri ?
                        <>
                            <Text variant='headlineMedium' style={{ textAlign: 'center' }} >{t("result")}</Text>
                            <Image source={{ uri: imageUri }} style={styles.cameraView} />
                            <Text style={{ textAlign: 'center', fontSize: 30 }}>{t("code_value")} {barcodeValue}</Text>
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
                                <Button icon='torch'
                                    mode='elevated'
                                    // dark={true}
                                    buttonColor={'#FF5733'}
                                    textColor={theme.colors.background}
                                    onPress={onBarCodeRescan}
                                    style={{ height: 50, justifyContent: 'center', margin: CUSTOM_MARGIN }}>
                                    {/* {t("rescan")} */}
                                    <Text variant='titleLarge' style={{ color: theme.colors.background }}>{t("rescan")}</Text>
                                </Button>
                                <Button icon='torch'
                                    mode='elevated'
                                    // dark={true}
                                    buttonColor={'#32CD32'}
                                    textColor={theme.colors.background}
                                    onPress={() => navigation.navigate(APP_SCREENS.ENTER_MANUALLY, { ean: barcodeValue, source: "barcodeImage" })}
                                    style={{ height: 50, justifyContent: 'center', margin: CUSTOM_MARGIN }}>
                                    {/* {t("proceed")} */}
                                    <Text variant='titleLarge' style={{ color: theme.colors.background }}>{t("proceed")}</Text>
                                </Button>
                            </View>
                        </> :
                        <>
                            <Text variant='headlineMedium' style={{ textAlign: 'center' }}>{t("scan_product_barcode")}</Text>
                            <Camera
                                style={styles.cameraView}
                                facing={'back'}
                                ratio="4:3"
                                ref={cameraRef}
                                enableTorch={flash}
                                barCodeScannerSettings={{
                                    barCodeTypes: ['ean13', 'ean8', 'upc_e', 'upc_a'],
                                    // barCodeTypes: ['aztec', 'ean13', 'ean8', 'qr', 'pdf417', 'upc_e', 'datamatrix', 'code39', 'code93', 'itf14', 'codabar', 'code128', 'upc_a'],
                                }}
                                onBarcodeScanned={onBarCodeScanned}
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
                            <Text style={{ textAlign: 'center' }} >If barcode is not getting scanned click on the torch button</Text>
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
                        </> :
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
            }


        </View>
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

export default ScanBarcode;
