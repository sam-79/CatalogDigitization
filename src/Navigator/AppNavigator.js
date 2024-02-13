import { StyleSheet } from 'react-native';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

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
const Drawer = createDrawerNavigator();

const AppNavigation = () => {
    // const userData = false;
    const { userData } = useSelector(state => state.auth);

    //console.log( '🚀 ~ file: AppNavigation.js:23 ~ AppNavigation ~ userData:', userData,);
    return (
        <NavigationContainer>
            <Drawer.Navigator screenOptions={{ headerShown: false }}
                drawerContent={(props) => <CustomDrawer {...props} />} >
                {userData ? (
                    <Drawer.Group initialRouteName="Home">

                        <Drawer.Screen name="Home" component={Home} options={{
                            title: "Home",
                            headerShown: false
                        }} />
                        <Drawer.Screen name="ProductInfo" component={ProductInfo} />
                        <Drawer.Screen name="ScanBarcode" component={ScanBarcode} options={{ unmountOnBlur: true }} />
                        <Drawer.Screen name="AddProduct" component={AddProduct} options={{ unmountOnBlur: true }} />
                        <Drawer.Screen name="ViewProduct" component={ViewProduct} options={{ unmountOnBlur: true }} />
                        <Drawer.Screen name="ScanProduct" component={ScanProduct} options={{ unmountOnBlur: true }} />
                        <Drawer.Screen name='VoiceAddProduct' component={VoiceAddProduct} options={{ unmountOnBlur: true }} />
                    </Drawer.Group>
                ) : (
                    <Drawer.Group>
                        <Drawer.Screen name="SignIn" component={Signin} />
                        <Drawer.Screen name="SignUp" component={Signup} />
                    </Drawer.Group>
                )}
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigation;

const styles = StyleSheet.create({});