import React, { useContext, useState } from 'react'
import { View, Text, Linking, Image, Platform, Alert } from 'react-native'

import {
    DrawerContentScrollView, DrawerItem, DrawerView
} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/features/authSlice';
import LanguageSelectModal from './LanguageSelectModal';
import { useTranslation } from 'react-i18next';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';


function CustomDrawer(props) {

    const { userData } = useSelector(state => state.auth);
    const { value } = useSelector(state => state.hostname);
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const { t } = useTranslation();



    const navigateToScreen = (screenName) => {
        navigation.navigate(screenName);
        navigation.dispatch(DrawerActions.closeDrawer());
    };

    const downloadCSV = async () => {
        try {

            const response = await fetch(`${value}/get_catalog`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${userData.access_token}`,
                    Accept: 'text/csv', // Ensure the response is treated as CSV
                },
            });

            if (!response.ok) {
                throw new Error('Failed to download CSV file');
            }

            // Read response body as text
            const csvData = await response.text();

            // getting storage opermission
            if (Platform.OS === "android") {
                const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

                if (permissions.granted) {

                    await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, "Catalog.csv", "text/csv")
                        .then(async (uri) => {
                            //await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
                            // Write CSV data to file
                            await FileSystem.writeAsStringAsync(uri, csvData, {
                                encoding: FileSystem.EncodingType.UTF8,
                            })

                        })
                        .catch(e => Alert.alert(t('fail'), t("fail_save_file")));



                } else {
                    throw new Error('Failed to download CSV file');
                }
            }
        } catch (error) {
            Alert.alert(t('fail'), t("fail_save_file"))
            // Handle error appropriately
        }
    }

    return (
        <View style={{ backgroundColor: '#deebf7', }}>
            <View
                style={{
                    height: 200,
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    paddingLeft: 20

                }}
            >
                <Image
                    source={{ uri: "https://s3-ap-south-1.amazonaws.com/ondc-static-web-bucket/ondc-website-media/2023/09/blog-image-1.png" }}
                    style={{ height: 150, width: 150 }}
                />

                <View style={{}}>
                    <Text style={{ fontSize: 20, textAlign: 'left', }}>
                        {/* Hello, {userData.email} */}
                        {t("hello")}
                    </Text>

                </View>
            </View>

            <View style={{
                borderTopStartRadius: 20,
                borderTopEndRadius: 20,
                backgroundColor: '#fff',
                paddingTop: 10
            }}>
                <DrawerItem
                    label={t("profile")}
                    onPress={() => { }}
                    icon={({ focused, size }) => (
                        <MaterialCommunityIcons name='account' size={25} />
                    )}
                />

                <DrawerItem
                    label={t("home")}
                    onPress={() => navigateToScreen("Home")}
                    icon={({ focused, size }) => (
                        <MaterialCommunityIcons name='home' size={25} />
                    )}
                />

                <DrawerItem
                    label={t("scan_barcode")}
                    onPress={() => navigateToScreen("ScanBarcode")}
                    icon={({ focused, size }) => (
                        <MaterialCommunityIcons name='barcode' size={25} />
                    )}
                />

                <DrawerItem
                    label={t("analyze_product_image")}
                    onPress={() => navigateToScreen("ScanProduct")}
                    icon={({ focused, size }) => (
                        <MaterialCommunityIcons name='magnify-scan' size={25} />
                    )}
                />

                <DrawerItem
                    label={t("enter_voice")}
                    onPress={() => navigateToScreen("VoiceAddProduct")}
                    icon={({ focused, size }) => (
                        <MaterialCommunityIcons name='microphone' size={25} />
                    )}
                />

                <DrawerItem
                    label={t("change_language")}
                    onPress={() => {
                        navigation.dispatch(DrawerActions.closeDrawer());
                        setModalVisible(true)
                    }}
                    icon={({ focused, size }) => (
                        <MaterialCommunityIcons name='earth' size={25} />
                    )}
                />

                <DrawerItem
                    label={t("download_catalog")}
                    onPress={downloadCSV}
                    icon={({ focused, size }) => (
                        <MaterialCommunityIcons name='download' size={25} />
                    )}
                />

                <DrawerItem
                    label={t("log_out")}
                    onPress={() => {
                        navigation.dispatch(DrawerActions.closeDrawer());
                        dispatch(logout());

                    }}
                    icon={({ focused, size }) => (
                        <MaterialCommunityIcons name='logout' size={25} />
                    )}
                />

            </View>
            <LanguageSelectModal visible={modalVisible} setVisible={setModalVisible} />

        </View>

    );
}

export default CustomDrawer