import { View, Text, FlatList, Pressable, Dimensions, Image, Button } from 'react-native'
import React, { useEffect } from 'react'
import { FloatingAction } from "react-native-floating-action";
import { HomeStyles as styles } from './styles';

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../api/retailproduct';
import { useTranslation } from 'react-i18next';

const Home = ({ navigation }) => {

  const { t } = useTranslation();

  const { productsList, isLoading } = useSelector(state => state.retailproduct);
  const { value } = useSelector(state => state.hostname);
  const { userData } = useSelector(state => state.auth)
  const dispatch = useDispatch();

  useEffect(() => {
    return navigation.addListener("focus", () => {
      dispatch(getAllProduct({ hostname: value, userData }))
    });
  }, [navigation])

  //function called when action button of floating add product btn is click
  const OnActionButtonClick = (name) => {
    switch (name) {
      case 'barcode_scan':
        navigation.navigate("ScanBarcode", { source: "barcode" })
        break;
      case 'manual_enter':
        navigation.navigate("AddProduct", { source: "manual" })
        break;
      case 'product_scan':
        navigation.navigate("ScanProduct", { source: "image" });
        break;
      // case 'product_voice':
      //   navigation.navigate("VoiceAddProduct", { source: "voice" });
      //   break;
      case 'analyze_voice':
        navigation.navigate("AnalyzeVoice", { source: "voice" });
        break;

      default:
        break;
    }
  }

  //ProductCard
  const ProductCard = ({ item }) => {
    return (
      <Pressable onPress={() => navigation.navigate("ViewProduct", { item })}>
        <View style={styles.productCard}>
          <Image source={{ uri: item.image_url }} style={styles.productImage} />
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>
            <Text style={styles.productPrice}>₹{item.price}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  const renderProductItem = ({ item }) => (
    <ProductCard item={item} />
  );


  return (
    <View style={styles.container}>

      <View style={styles.productCard}>
        <Pressable onPress={navigation.openDrawer} style={{ position: 'absolute', left: 10 }}>
          <MaterialCommunityIcons name='menu' size={25} />
        </Pressable>
        <Text style={[styles.productName, { fontSize: 30, textAlign: 'center' }]}>{t("catalog")}</Text>
      </View>


      <Text style={{ textAlign: "center", color: '#999999' }}> {t('pull_down_to_refresh')}</Text>
      {/* <Pressable onPress={() => navigation.navigate("ProductInfo")}>
        <View style={styles.productCard}>
          <Image source={{ uri: productsList[0].image_url }} style={styles.productImage} />
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{productsList[0].name}</Text>
            <Text style={styles.productDescription}>{productsList[0].description}</Text>
            <Text style={styles.productPrice}>₹{productsList[0].price}
            </Text>
          </View>
        </View>
      </Pressable> */}


      <FlatList
        data={productsList}
        style={styles.productList}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
        refreshing={isLoading}
        onRefresh={() => dispatch(getAllProduct({ hostname: value, userData }))}
      />

      {/* Add Product Button */}
      <FloatingAction
        color='#4caf50'
        actions={[
          {
            text: t("scan_product_barcode"),
            icon: <MaterialCommunityIcons name='barcode-scan' size={25} />,
            name: "barcode_scan",
            position: 1,
            color: '#4caf50',

          },
          {
            text: t("analyze_product_image"),
            icon: <MaterialCommunityIcons name='magnify-scan' size={25} />,
            name: "product_scan",
            position: 2,
            color: '#4caf50',
          },
          {
            text: t("enter_manually"),
            icon: <MaterialCommunityIcons name='pen-plus' size={25} />,
            name: "manual_enter",
            position: 1,
            color: '#4caf50',

          },
          // {
          //   text: t("enter_voice"),
          //   icon: <MaterialCommunityIcons name='microphone' size={25} />,
          //   name: "product_voice",
          //   position: 1,
          //   color: '#4caf50',

          // },
          {
            text: t("enter_voice"),
            icon: <MaterialCommunityIcons name='microphone' size={25} />,
            name: "analyze_voice",
            position: 1,
            color: '#4caf50',

          }
        ]}
        onPressItem={OnActionButtonClick}
      />
    </View>
  )
}

export default Home