import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Pressable, Button, Dimensions, Image } from 'react-native';
import { CameraView as Camera, useCameraPermissions } from 'expo-camera/next';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { HomeStyles as styles } from './styles';
const SCREENWIDTH = Dimensions.get("window").width;
import { useTranslation } from 'react-i18next';


const ScanBarcode = ({ navigation }) => {
    const [barcodeValue, setBarcodeValue] = useState(null);
    const [permission, requestPermission] = useCameraPermissions();
    const [flash, setFlash] = useState(false);
    const [imageUri, setImageUri] = useState(null);
    const cameraRef = useRef(null);
    const { t } = useTranslation();

    // Reset values when component is mounted or navigated back to
    useEffect(() => {
        setBarcodeValue(null);
        setFlash(false);
        setImageUri(null);
    }, []);

    if (!permission) {
        // Camera permissions are still loading
        return (
            <View>
                <Text>{t("wait_permission")}</Text>
                <Button onPress={requestPermission} title={t("grant_permission")} />
            </View>
        );
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>{t("need_permission_for_camera")}</Text>
                <Button onPress={requestPermission} title={t("grant_permission")} />
            </View>
        );
    }

    const onBarCodeScanned = async ({ data }) => {
        setBarcodeValue(data);
        try {
            if (cameraRef.current) {
                const { uri } = await cameraRef.current.takePictureAsync();
                setImageUri(uri);
            }
        } catch (error) {
            
        }
    };

    const onBarCodeRescan = () => {
        setBarcodeValue(null);
        setImageUri(null);

    };

    return (
        <View style={[styles.container, { alignItems: 'center' }]}>
            {!barcodeValue && <Text style={styles.heading}>{t("scan_product_barcode")}</Text>}
            {/* {!barcodeValue && <Camera
                style={[styles.cameraView, { height: SCREENWIDTH - 30 }]}
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
                    }, styles.cameraBtn]}
                >
                    <MaterialCommunityIcons name='torch' size={30} color={flash ? '#000000' : '#fff'} />
                </Pressable>
            </Camera>} */}

            {
                barcodeValue && imageUri ?
                    <>
                        <Image source={{ uri: imageUri }} style={[styles.cameraView, { height: SCREENWIDTH - 30 }]} />
                        <Text style={{ textAlign: 'center', fontSize: 30 }}>{t("code_value")} {barcodeValue}</Text>
                        <View style={styles.optionsView}>
                            <Pressable
                                onPress={onBarCodeRescan}
                                style={[styles.button, { backgroundColor: '#FF5733' }]}
                            >
                                <Text style={{ color: 'white' }}>{t("rescan")}</Text>
                            </Pressable>

                            <Pressable
                                onPress={() => navigation.navigate("AddProduct", { ean: barcodeValue, source: "barcodeImage" })}
                                style={[styles.button, { backgroundColor: '#32CD32' }]}
                            >
                                <Text style={{ color: 'white' }}>{t("proceed")}</Text>
                            </Pressable>
                        </View>
                    </> :
                    <Camera
                        style={[styles.cameraView, { height: SCREENWIDTH - 30 }]}
                        facing={'back'}
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
                            }, styles.cameraBtn]}
                        >
                            <MaterialCommunityIcons name='torch' size={30} color={flash ? '#000000' : '#fff'} />
                        </Pressable>
                    </Camera>
            }
        </View>
    );
};

export default ScanBarcode;
