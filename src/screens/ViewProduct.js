import { View, Text, Button, Pressable, Alert, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { HomeStyles as styles } from './styles'
import ProductInfo from '../components/ProductInfo'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { deleteProduct, getProductById, updateProduct } from '../api/retailproduct'


const ViewProduct = ({ navigation, route }) => {

    const dispatch = useDispatch();
    const { value } = useSelector(state => state.hostname);
    const { userData } = useSelector(state => state.auth);
    const [isLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState(Object.fromEntries(Object.entries(route.params.item).map(([key, value]) => [key, String(value)])))
    const [tempProduct, setTempProduct] = useState(Object.fromEntries(Object.entries(route.params.item).map(([key, value]) => [key, String(value)])))
    const [editable, setEditable] = useState(false);
    const { t } = useTranslation();


    useEffect(() => {
        return navigation.addListener("focus", () => {
            getProductDetails()
        });
    }, [navigation])


    const getProductDetails = () => {
        setIsLoading(true);
        getProductById({ product, hostname: value, userData })
            .then((response) => {
                setIsLoading(false)

                for (const key in response) {
                    if (product.hasOwnProperty(key)) {
                        setProduct(prevData => ({
                            ...prevData,  // Spread previous data to keep unchanged keys
                            [key]: String(response[key])  // Update the specific key with the new value
                        }));
                    }
                }
                setTempProduct(product)
                //Alert.alert(t("success"), t("product_updated"))
            })
            .catch((error) => {
                setIsLoading(false);
                Alert.alert(t("fail"), t("display_offline_data"))
            })
    }
    

    const handleUpdateProduct = () => {

        //checks for field should not empty
        for (const key in tempProduct) {
            if (tempProduct.hasOwnProperty(key)) {
                if (tempProduct[key] === undefined || tempProduct[key] === null || tempProduct[key] === "null" || String(tempProduct[key]).trim() === '') {
                    Alert.alert(t("error:"), t("please_fill_all_details"))
                    return;
                }
            }
        }

        //Alert.alert(t("update product called"), tempProduct.name)

        //calling update product function
        setIsLoading(true);
        updateProduct({ product: tempProduct, hostname: value, userData })
            .then((response) => {
                setIsLoading(false);
                getProductDetails();
                setProduct(tempProduct)
                //Alert.alert("Success", "Product Updated")
                setEditable(false);
            })
            .catch((error) => {
                setIsLoading(false);
                Alert.alert(t("error"), t("failed_to_update_product"))
            })

    }
    const handleDeleteProduct = () => {
        //Alert.alert("Delete product called", product.name)
        //calling add product function
        setIsLoading(true);
        deleteProduct({ product, hostname: value, userData })
            .then((response) => {
                setIsLoading(false);
                Alert.alert(t("success"), t("product_deleted"))
                navigation.navigate("Home")
            })
            .catch((error) => {
                setIsLoading(false);
                Alert.alert(t("error"), t("fail_to_remove"))
            })

    }
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <Text style={styles.heading}>{editable ? t("update_Product_Details") : t("product_Details")}</Text>
            <ActivityIndicator animating={isLoading} size={"small"} />
            <ProductInfo editable={editable} productDetails={editable ? tempProduct : product} updateProductInfo={setTempProduct} />


            <View style={styles.optionsView}>
                {
                    editable ?
                        <>
                            <Pressable style={[styles.button, { backgroundColor: '#4caf50' }]} onPress={handleUpdateProduct} >
                                <Text style={{ color: "white", textAlign: 'center', fontSize: 20 }}>{t("update_Product")}</Text>
                            </Pressable>
                            <Pressable style={[styles.button, { backgroundColor: '#3397E8' }]} onPress={() => setEditable(false)}>
                                <Text style={{ color: "white", textAlign: 'center', fontSize: 20 }}>{t("cancel")}</Text>
                            </Pressable>
                        </>
                        : <>
                            <Pressable style={[styles.button, { backgroundColor: '#FF5733' }]} onPress={handleDeleteProduct}>
                                <Text style={{ color: "white", textAlign: 'center', fontSize: 20 }}>{t("delete")}</Text>
                            </Pressable>

                            <Pressable style={[styles.button, { backgroundColor: '#3397E8' }]} onPress={() => setEditable(true)}>
                                <Text style={{ color: "white", textAlign: 'center', fontSize: 20 }}>{t("edit")}</Text>
                            </Pressable>
                        </>
                }
            </View>



        </KeyboardAvoidingView>
    )
}

export default ViewProduct