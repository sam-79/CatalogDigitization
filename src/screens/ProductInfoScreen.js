import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button, Text, Divider, useTheme, Dialog, Portal } from 'react-native-paper';
import { APP_SCREENS, CUSTOM_MARGIN } from '../constants';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct, getProductById, updateProduct } from '../api/retailproduct'
import ProductInfo from '../components/ProductInfo';


const ProductInfoScreen = ({ navigation, route }) => {
    // Sample product data
    const [product, setProduct] = useState({
        name: null,
        ean: null,
        brand: null,
        category: null,
        description: '',
        price: null,
        image: null,
    })
    const [tempProduct, setTempProduct] = useState(Object.fromEntries(Object.entries(product).map(([key, value]) => [key, String(value)]))); //used to update product details
    const [editable, setEditable] = useState(false);
    const { t } = useTranslation();
    const { value } = useSelector(state => state.hostname);
    const { userData } = useSelector(state => state.auth);
    const [isLoading, setIsLoading] = useState(false);
    const theme = useTheme();
    const [deleteDialog, setDeleteDialog] = useState(false); // dialog used to ask use to confirm delete product


    useEffect(() => {
        return navigation.addListener("focus", () => {
            navigation.setOptions({ title: route.params.product.name })
            if (route.params.source == APP_SCREENS.PRODUCTS_LIST) {
                setIsLoading(true);
                console.log("Getting product details", route.params.product)
                setProduct(route.params.product)
                setTempProduct(route.params.product)
            }
        })
    }, [navigation])

    const [showFullDescription, setShowFullDescription] = useState(false);

    const handleDeleteProduct = () => {
        //Alert.alert("Delete product called", product.name)
        //calling add product function
        setIsLoading(true);
        deleteProduct({ product, hostname: value, userData })
            .then((response) => {
                setIsLoading(false);
                setDeleteDialog(false);
                Alert.alert(t("success"), t("product_deleted"))
                navigation.goBack();
            })
            .catch((error) => {
                setIsLoading(false);
                setDeleteDialog(false);
                Alert.alert(t("error"), t("fail_to_remove"))
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
                // getProductDetails();
                setProduct(tempProduct)
                Alert.alert(t('success'), t('product_updated'))
                setEditable(false);
            })
            .catch((error) => {
                setIsLoading(false);
                Alert.alert(t("error"), t("failed_to_update_product"))
            })

    }

    return (
        editable ?
            <View>
                <ScrollView contentContainerStyle={{ paddingVertical: CUSTOM_MARGIN }}>
                    <ProductInfo editable={editable} productDetails={editable ? tempProduct : product} updateProductInfo={setTempProduct} />
                    <View style={styles.actions}>
                        <Button mode="contained" onPress={() => setEditable(false)} style={styles.modifyButton}>
                            {t('cancel')}
                        </Button>
                        <Button mode="contained" buttonColor="red" onPress={handleUpdateProduct} style={styles.deleteButton}>
                            {t('update')}
                        </Button>
                    </View>
                </ScrollView>
            </View>
            : <View style={styles.container}>
                <Image source={{ uri: product.image_url }} style={styles.image} />
                <ScrollView>

                    <View style={styles.content}>
                        <Title style={styles.title}>{product.name}</Title>
                        <Divider style={styles.divider} />
                        <Paragraph style={styles.paragraph}><Text style={styles.label}>{t("ean")}:</Text> {product.ean}</Paragraph>
                        <Paragraph style={styles.paragraph}><Text style={styles.label}>{t("brand")}:</Text> {product.brand}</Paragraph>
                        <Paragraph style={styles.paragraph}><Text style={styles.label}>{t("category")}:</Text> {product.category}</Paragraph>
                        <Paragraph style={styles.description}>
                            <Text style={styles.label}>{t("description")}: </Text>
                            {showFullDescription ? product.description : `${product.description.slice(0, 100)}...`}
                            {product.description.length > 20 ? <TouchableOpacity onPress={() => setShowFullDescription(!showFullDescription)}>
                                <Text style={styles.moreLess}>
                                    {showFullDescription ? t('less') : t('more')}
                                </Text>
                            </TouchableOpacity> : <></>}
                        </Paragraph>
                        <Text style={styles.label}>{t("price")}: </Text>
                        <Text style={styles.price}>{product.price}</Text>

                        {/* dialog window */}
                        <Portal>
                            <Dialog visible={deleteDialog} onDismiss={() => setDeleteDialog(false)}>
                                <Dialog.Content>
                                    <Text variant="bodyMedium">{t('deleting_product')}, {product.name}</Text>
                                </Dialog.Content>
                                <Dialog.Actions>
                                    <Button onPress={() => setDeleteDialog(false)}>{t("cancel")}</Button>
                                    <Button buttonColor='#EA3C53' textColor="white" onPress={handleDeleteProduct}>{t('delete')}</Button>
                                </Dialog.Actions>
                            </Dialog>
                        </Portal>


                        <View style={styles.actions}>
                            <Button mode="contained" onPress={() => setEditable(true)} style={styles.modifyButton}>
                                {t("modify")}
                            </Button>
                            <Button mode="contained" buttonColor="red" onPress={() => setDeleteDialog(true)} style={styles.deleteButton}>
                                {t("delete")}
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </View>
    )
        ;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    image: {
        width: '100%',
        height: Dimensions.get('screen').height * 0.4,
        resizeMode: 'cover',
    },
    content: {
        flex: 1,
        width: '100%',
        padding: 20,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 10,
        alignItems: 'center',
    },
    title: {
        marginVertical: 10,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
    },
    divider: {
        width: '80%',
        marginVertical: 10,
    },
    paragraph: {
        marginVertical: 5,
        fontSize: 16,
        textAlign: 'center',
    },
    label: {
        fontWeight: 'bold',
    },
    description: {
        marginVertical: 10,
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    moreLess: {
        color: '#1e90ff',
        textAlign: 'center',
        marginTop: 5,
    },
    price: {
        marginVertical: 10,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#4CAF50',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
    },
    modifyButton: {
        flex: 1,
        marginHorizontal: 10,
    },
    deleteButton: {
        flex: 1,
        marginHorizontal: 10,
    },
});

export default ProductInfoScreen;
