import React, { useContext, useState } from 'react'
import { View, Linking, Image, Platform, Alert, StyleSheet } from 'react-native'
import { Text, Divider, TouchableRipple } from 'react-native-paper';
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
import { useTheme } from 'react-native-paper';
const CUSTOM_MARGIN = 20;

function CustomDrawer(props) {

    const { userData } = useSelector(state => state.auth);
    const { value } = useSelector(state => state.hostname);
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const { t } = useTranslation();
    const theme = useTheme();


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
        <View style={{ backgroundColor: theme.colors.primary, }}>
            <View
                style={{
                    // height: 100,
                    alignItems: 'center',
                    // justifyContent: 'center',
                    marginHorizontal: CUSTOM_MARGIN / 2,
                    marginVertical: CUSTOM_MARGIN*2,
                    flexDirection: 'row',
                    // backgroundColor: "red"

                }}
            >
                <Image
                    source={require('../../assets/profile.png')}
                    defaultSource={require('../../assets/profile.png')}
                    style={{ height: 50, width: 50 }}
                />

                <View style={{ marginHorizontal: CUSTOM_MARGIN / 2 }}>
                    <Text variant='headlineSmall' style={{ color: theme.colors.background, fontWeight: '600' }}>
                        {/* Hello, {userData.email} */}
                        {t("sameer borkar")}
                    </Text>
                    <Text variant='titleSmall' style={{ color: theme.colors.background, fontWeight: '600' }}>
                        {/* Hello, {userData.email} */}
                        {t("sameer borkar")}
                    </Text>

                </View>
                {/* <MaterialCommunityIcons name='chevron-right' size={30} /> */}
            </View>

            <View style={{
                borderTopStartRadius: 20,
                borderTopEndRadius: 20,
                backgroundColor: '#fff',
                paddingTop: 10
            }}>
                {/* <TouchableRipple rippleColor="rgba(0, 0, 0, .32)">
                    <View style={{ flexDirection: 'row', alignItems: 'center', margin: CUSTOM_MARGIN / 2, }}>
                        <MaterialCommunityIcons name='account' size={35} />
                        <Text style={{ marginLeft: 10, fontSize: 20 }}>{'Unfocused text'}</Text>
                    </View>
                </TouchableRipple>

                <TouchableRipple rippleColor="rgba(0, 0, 0, .32)">
                    <View style={{ flexDirection: 'row', alignItems: 'center', margin: CUSTOM_MARGIN / 2, }}>
                        <MaterialCommunityIcons name='account' size={35} />
                        <Text style={{ marginLeft: 10, fontSize: 20 }}>{'Unfocused text'}</Text>
                    </View>
                </TouchableRipple>

                <TouchableRipple rippleColor="rgba(0, 0, 0, .32)">
                    <View style={{ flexDirection: 'row', alignItems: 'center', margin: CUSTOM_MARGIN / 2, }}>
                        <MaterialCommunityIcons name='account' size={35} />
                        <Text style={{ marginLeft: 10, fontSize: 20 }}>{'Unfocused text'}</Text>
                    </View>
                </TouchableRipple> */}

              

                <DrawerItem
                    label={t('profile')}
                    onPress={() => { }}
                    icon={({ focused, size }) => (
                        <MaterialCommunityIcons name='account' size={30} />
                    )}
                    style={styles.itemViewStyle}
                    labelStyle={styles.itemTextStyle}
                />

                <DrawerItem
                    label={t("home")}
                    onPress={() => navigateToScreen("Home")}
                    icon={({ focused, size }) => (
                        <MaterialCommunityIcons name='home' size={30} />
                    )}
                    style={styles.itemViewStyle}
                    labelStyle={styles.itemTextStyle}
                />

                <DrawerItem
                    label={t("scan_barcode")}
                    onPress={() => navigateToScreen("ScanBarcode")}
                    icon={({ focused, size }) => (
                        <MaterialCommunityIcons name='barcode' size={30} />
                    )}
                    style={styles.itemViewStyle}
                    labelStyle={styles.itemTextStyle}
                />

                <DrawerItem
                    label={t("analyze_product_image")}
                    onPress={() => navigateToScreen("ScanProduct")}
                    icon={({ focused, size }) => (
                        <MaterialCommunityIcons name='magnify-scan' size={30} />
                    )}
                    style={styles.itemViewStyle}
                    labelStyle={styles.itemTextStyle}
                />

                <DrawerItem
                    label={t("enter_voice")}
                    onPress={() => navigateToScreen("VoiceAddProduct")}
                    icon={({ focused, size }) => (
                        <MaterialCommunityIcons name='microphone' size={30} />
                    )}
                    style={styles.itemViewStyle}
                    labelStyle={styles.itemTextStyle}
                />

                <DrawerItem
                    label={t("change_language")}
                    onPress={() => {
                        navigation.dispatch(DrawerActions.closeDrawer());
                        setModalVisible(true)
                    }}
                    icon={({ focused, size }) => (
                        <MaterialCommunityIcons name='earth' size={30} />
                    )}
                    style={styles.itemViewStyle}
                    labelStyle={styles.itemTextStyle}
                />

                <DrawerItem
                    label={t("download_catalog")}
                    onPress={downloadCSV}
                    icon={({ focused, size }) => (
                        <MaterialCommunityIcons name='download' size={30} />
                    )}
                    style={styles.itemViewStyle}
                    labelStyle={styles.itemTextStyle}
                />

                <DrawerItem
                    label={t("log_out")}
                    onPress={() => {
                        navigation.dispatch(DrawerActions.closeDrawer());
                        dispatch(logout());

                    }}
                    icon={({ focused, size }) => (
                        <MaterialCommunityIcons name='logout' size={30} />
                    )}
                    style={styles.itemViewStyle}
                    labelStyle={styles.itemTextStyle}
                />

            </View>
            <LanguageSelectModal visible={modalVisible} setVisible={setModalVisible} />

        </View>

    );
}

const styles = StyleSheet.create({
    itemTextStyle: {
        fontSize: 20,

    },
    itemViewStyle: {
        marginVertical: CUSTOM_MARGIN / 2,
    }
})

export default CustomDrawer