import React, { useEffect } from 'react'
import { View, FlatList, Pressable, Dimensions, Image, StyleSheet } from 'react-native'
import { Text, Card, Button, useTheme, TouchableRipple } from 'react-native-paper';

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../api/retailproduct';
import { useTranslation } from 'react-i18next';
import { APP_SCREENS, CUSTOM_MARGIN } from '../constants';

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;
const itemWidth = (WIDTH-60) / 2;

const ProductList = ({ navigation }) => {

    const { t } = useTranslation();
    const { productsList, isLoading } = useSelector(state => state.retailproduct);
    const { value } = useSelector(state => state.hostname);
    const { userData } = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const theme = useTheme();

    useEffect(() => {
        return navigation.addListener("focus", () => {
            console.log("inside line 26, ProductList.js")
            dispatch(getAllProduct({ hostname: value, userData }))
        });
    }, [navigation])


    // const productsList = [
    //     { name: "prdokasdkjashkjhd asdhakd asdagkcy", image_url: 'https://cdn.britannica.com/57/43857-050-9250A718/bar-code.jpg', id: 1 },
    //     { name: "prdocy", image_url: 'https://cdn.britannica.com/57/43857-050-9250A718/bar-code.jpg', id: 2 },
    //     { name: "prdocy", image_url: 'https://cdn.britannica.com/57/43857-050-9250A718/bar-code.jpg', id: 3 },
    //     { name: "prdocy", image_url: 'https://cdn.britannica.com/57/43857-050-9250A718/bar-code.jpg', id: 4 },
    //     { name: "prdocy", image_url: 'https://cdn.britannica.com/57/43857-050-9250A718/bar-code.jpg', id: 5 },
    //     { name: "prdocy", image_url: 'https://cdn.britannica.com/57/43857-050-9250A718/bar-code.jpg', id: 6 },
    //     { name: "prdocy", image_url: 'https://cdn.britannica.com/57/43857-050-9250A718/bar-code.jpg', id: 7 },
    //     { name: "prdocy", image_url: 'https://cdn.britannica.com/57/43857-050-9250A718/bar-code.jpg', id: 8 },
    // ]


    const renderProductItem = ({ item }) => {

        return (
            <TouchableRipple onPress={() => navigation.navigate(APP_SCREENS.PRODUCT_INFO_SCREEN, { source: APP_SCREENS.PRODUCTS_LIST, product: item })}>
                <View style={styles.itemContainer}>
                    <Image source={{ uri: item.image_url }} style={styles.image} />
                    <Text variant='titleMedium' numberOfLines={1} ellipsizeMode="tail" style={styles.name}>{item.name}</Text>
                    {/* <Text style={styles.price}>{item.id}</Text> */}
                </View>
            </TouchableRipple>
        )
    }
    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <FlatList
                data={productsList}
                renderItem={renderProductItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ marginHorizontal: CUSTOM_MARGIN / 2, backgroundColor: theme.colors.background }}
                horizontal={false}
                numColumns={2}
            // contentContainerStyle={styles.listContainer}
            // refreshing={isLoading}
            // onRefresh={() => dispatch(getAllProduct({ hostname: value, userData }))}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardView: {
        marginVertical: CUSTOM_MARGIN,
        width: 50,
        backgroundColor: 'red'
    },
    itemContainer: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 5,
        overflow: 'hidden',
        alignItems: 'center',
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.1,
        shadowRadius: 5,
        // elevation: 5,
        width: itemWidth,
        margin: CUSTOM_MARGIN / 2,
    },
    image: {
        width: '100%',
        height: 150,
    },
    name: {
        // fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
    },
    price: {
        fontSize: 14,
        color: '#888',
        marginBottom: 10,
        textAlign: 'center',
    },
})

export default ProductList