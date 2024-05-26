import { StyleSheet } from 'react-native';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
//screen
import Signin from '../screens/Signin';
import Signup from '../screens/Signup';
import Home from '../screens/Home';
import ProductInfo from '../components/ProductInfo';
import ScanBarcode from '../screens/ScanBarcode';
import AddProduct from '../screens/AddProduct';
import ViewProduct from '../screens/ViewProduct';
import CustomDrawer from '../components/CustomDrawer';
import ScanProduct from '../screens/ScanProduct';
import VoiceAddProduct from '../screens/VoiceAddProduct';
import AnalyzeVoice from '../screens/AnalyzeVoice';
import { useTheme } from 'react-native-paper';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
import { APP_SCREENS } from '../constants';
import LanguageChange from '../screens/LanguageChange';
import Settings from '../screens/Settings';
import ProductSummary from '../screens/ProductSummary';
import ProductList from '../screens/ProductList';
import ProductInfoScreen from '../screens/ProductInfoScreen';
import OTPVerifyScreen from '../screens/OTPVerifyScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import TestScreen from '../screens/TestScreen';
import AddProductBulk from '../screens/AddProductBulk';
import AddCSV from '../screens/AddCSV';
import { useTranslation } from 'react-i18next';



// const AppStackNavigator = () => {
//     return (
//         <Drawer.Navigator screenOptions={{ headerShown: false }}>
//             <Drawer.Screen name={APP_SCREENS.PRODUCTINFO} component={ProductInfo} />
//             <Drawer.Screen name={APP_SCREENS.VIEW_PRODUCT} component={ViewProduct} options={{ unmountOnBlur: true }} />
//             <Drawer.Screen name={APP_SCREENS.PRODUCTS_LIST} component={ProductList} options={{ headerTitle: 'Products' }} />
//             <Drawer.Screen name={APP_SCREENS.PRODUCT_INFO_SCREEN} component={ProductInfoScreen} />

//         </Drawer.Navigator>
//     )
// }

//main Drawer navigator
const AppNavigation = () => {
    // const userData = false;
    const { userData, userVerified } = useSelector(state => state.auth);
    const theme = useTheme();
    const { t } = useTranslation()

    //console.log( '🚀 ~ file: AppNavigation.js:23 ~ AppNavigation ~ userData:', userData,);
    return (
        <NavigationContainer>
            {!(userData && userVerified) ? (
                <Stack.Navigator drawerContent={(props) => <CustomDrawer {...props} />}  >
                    <Stack.Group initialRouteName={APP_SCREENS.HOME} screenOptions={{
                        headerShown: true,
                        headerStyle: { backgroundColor: theme.colors.primary },
                        headerTintColor: theme.colors.background,
                        drawerStyle: {
                            width: "80%", // Change this value to the desired percentage
                        }

                    }}
                    >

                        <Stack.Screen name={APP_SCREENS.HOME} component={Home} options={{ headerShown: false }} />
                        <Stack.Screen name={APP_SCREENS.PRODUCTS_SUMMARY} component={ProductSummary} options={{ headerTitle: t('catalog_statistics') }} />
                        <Stack.Screen name={APP_SCREENS.SCANBARCODE} component={ScanBarcode} options={{ unmountOnBlur: true, headerShown: false }} />
                        <Stack.Screen name={APP_SCREENS.ENTER_MANUALLY} component={AddProduct} options={{ unmountOnBlur: true, headerShown: true, headerTitle: t("enter_product_details") }} />
                        <Stack.Screen name={APP_SCREENS.SCANPRODUCT} component={ScanProduct} options={{ unmountOnBlur: true, headerShown: false }} />
                        <Stack.Screen name={APP_SCREENS.ADD_BY_VOICE} component={TestScreen} options={{ unmountOnBlur: true, headerShown: false }} />
                        <Stack.Screen name={APP_SCREENS.LANGUAGE_CHANGE} component={LanguageChange} options={{ unmountOnBlur: true, headerTitle: t('select_language') }} />
                        <Stack.Screen name={APP_SCREENS.SETTINGS} component={Settings} options={{ unmountOnBlur: true, headerTitle: t('settings') }} />

                        <Stack.Screen name={APP_SCREENS.PRODUCTINFO} component={ProductInfo} />
                        <Stack.Screen name={APP_SCREENS.VIEW_PRODUCT} component={ViewProduct} options={{ unmountOnBlur: true }} />
                        <Stack.Screen name={APP_SCREENS.PRODUCTS_LIST} component={ProductList} options={{ headerTitle: t('products') }} />
                        <Stack.Screen name={APP_SCREENS.PRODUCT_INFO_SCREEN} component={ProductInfoScreen} options={{ unmountOnBlur: true }} />
                        <Stack.Screen name={APP_SCREENS.ADDPRODUCTBULK} component={AddProductBulk} options={{ headerTitle: t('review_product_details') }} />
                        <Stack.Screen name={APP_SCREENS.ADD_BY_CSV} component={AddCSV} options={{ headerTitle: t('upload_csv') }} />

                        <Stack.Screen name={APP_SCREENS.TESTSCREEN} component={TestScreen} options={{headerTitle:t("voice_input")}}/>

                        {/* <Stack.Screen name={APP_SCREENS.STACKNAV} component={AppStackNavigator} options={{ unmountOnBlur: true }} /> */}

                    </Stack.Group>
                </Stack.Navigator>
            ) : (
                <Stack.Navigator initialRouteName={APP_SCREENS.WELCOMESCREEN} screenOptions={{ headerShown: false }}>
                    <Stack.Screen name={APP_SCREENS.WELCOMESCREEN} component={WelcomeScreen} />
                    <Stack.Screen name={APP_SCREENS.SIGNIN} component={Signin} />
                    <Stack.Screen name={APP_SCREENS.SIGNUP} component={Signup} />
                    <Stack.Screen name={APP_SCREENS.OTPVERIFY} component={OTPVerifyScreen} />

                </Stack.Navigator>
            )
            }
        </NavigationContainer >
    );
};

export default AppNavigation;

const styles = StyleSheet.create({});