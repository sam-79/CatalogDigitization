import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, Image, Pressable, Dimensions } from 'react-native';
import { CameraView as Camera, useCameraPermissions } from 'expo-camera/next';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { HomeStyles as styles } from './styles';
import { CameraType } from 'expo-camera';
import { useTranslation } from 'react-i18next';
const SCREENWIDTH = Dimensions.get("window").width;

//COMponent to scan product 
const ScanProduct = ({ navigation }) => {
    const [permission, requestPermission] = useCameraPermissions();
    const [imageUri, setImageUri] = useState(null);
    const [flash, setFlash] = useState(false);
    const cameraRef = useRef(null);
    const { t } = useTranslation();

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
        navigation.navigate("AddProduct", { ean: '', imageUri, source: "productImage" });
    };

    return (
        <View style={[styles.container, { alignItems: 'center' }]}>
            {!imageUri && <Text style={styles.heading}>{t("scan_product")}</Text>}
            {permission && permission.granted ? (
                <View style={[styles.container]}>
                    {imageUri ? (
                        <>
                            <Image source={{ uri: imageUri }} style={[styles.cameraView, { height: (4 * (SCREENWIDTH - 30)) / 3 }]} />
                            <View style={styles.optionsView}>
                                <Pressable onPress={retakePicture} style={[styles.button, { backgroundColor: '#FF5733' }]}>
                                    <Text style={{ color: 'white' }}>{t("retake")}</Text>
                                </Pressable>
                                <Pressable onPress={handleImageSubmit} style={[styles.button, { backgroundColor: '#32CD32' }]}>
                                    <Text style={{ color: 'white' }} >{t("proceed")}</Text>
                                </Pressable>
                            </View>
                        </>
                    ) : (
                        <Camera style={[styles.cameraView, { height: (4 * (SCREENWIDTH - 30)) / 3, marginVertical: 10 }]}
                            ref={cameraRef}
                            type={"back"}
                            ratio='4:3'
                            enableTorch={flash}
                        >
                            <View>

                                <Pressable
                                    onPress={() => setFlash(!flash)}
                                    style={[{
                                        backgroundColor: flash ? '#fff' : '#ffffff00',
                                        borderColor: !flash ? '#fff' : '#000'
                                    }, styles.cameraBtn]}
                                >
                                    <MaterialCommunityIcons name='torch' size={30} color={flash ? '#000000' : '#fff'} />
                                </Pressable>
                            </View>
                        </Camera>
                    )}
                    {!imageUri && (
                        // <Pressable styles={styles.continueButton} onPress={takePicture}>
                        //     <Text style={styles.continueButtonText}>Take Picture</Text>
                        // </Pressable>
                        <Button title={t('take_picture')} onPress={takePicture} />
                    )}
                </View>
            ) : (
                // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                //     <Text>Please grant camera permission</Text>
                //     <Button title="Grant Permission" onPress={requestPermission} />
                // </View>
                <View style={styles.container}>
                    <Text style={{ textAlign: 'center' }}>{t("need_permission_for_camera")}</Text>
                    <Button onPress={requestPermission} title={t("grant_permission")} />
                </View>
            )}
        </View>
    );
};

export default ScanProduct;
