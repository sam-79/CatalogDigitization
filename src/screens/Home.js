import { View, Share, Pressable, Dimensions, Image, StyleSheet, ScrollView, Alert, Platform } from 'react-native'
import React, { useEffect } from 'react'


import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct, getProductStats } from '../api/retailproduct';
import { useTranslation } from 'react-i18next';
import { TouchableRipple, useTheme } from 'react-native-paper';
import Svg, { Ellipse, Defs, LinearGradient, Stop } from "react-native-svg"
import { Text, Card, Divider, Button } from 'react-native-paper';
import * as FileSystem from 'expo-file-system';
import { logout } from '../../redux/features/authSlice';
import { APP_SCREENS, CUSTOM_MARGIN } from '../constants';
const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

// const Home = ({ navigation }) => {

//   const { t } = useTranslation();

//   const { productsList, isLoading } = useSelector(state => state.retailproduct);
//   const { value } = useSelector(state => state.hostname);
//   const { userData } = useSelector(state => state.auth)
//   const dispatch = useDispatch();

//   useEffect(() => {
//     return navigation.addListener("focus", () => {
//       dispatch(getAllProduct({ hostname: value, userData }))
//     });
//   }, [navigation])

//   //function called when action button of floating add product btn is click
//   const OnActionButtonClick = (name) => {
//     switch (name) {
//       case 'barcode_scan':
//         navigation.navigate("ScanBarcode", { source: "barcode" })
//         break;
//       case 'manual_enter':
//         navigation.navigate("AddProduct", { source: "manual" })
//         break;
//       case 'product_scan':
//         navigation.navigate("ScanProduct", { source: "image" });
//         break;
//       // case 'product_voice':
//       //   navigation.navigate("VoiceAddProduct", { source: "voice" });
//       //   break;
//       case 'analyze_voice':
//         navigation.navigate("AnalyzeVoice", { source: "voice" });
//         break;

//       default:
//         break;
//     }
//   }

//   //ProductCard
//   const ProductCard = ({ item }) => {
//     return (
//       <Pressable onPress={() => navigation.navigate("ViewProduct", { item })}>
//         <View style={styles.productCard}>
//           <Image source={{ uri: item.image_url }} style={styles.productImage} />
//           <View style={styles.productInfo}>
//             <Text style={styles.productName}>{item.name}</Text>
//             <Text style={styles.productDescription}>{item.description}</Text>
//             <Text style={styles.productPrice}>₹{item.price}
//             </Text>
//           </View>
//         </View>
//       </Pressable>
//     );
//   };

//   const renderProductItem = ({ item }) => (
//     <ProductCard item={item} />
//   );


//   return (
//     <View style={styles.container}>

//       <View style={styles.productCard}>
//         <Pressable onPress={navigation.openDrawer} style={{ position: 'absolute', left: 10 }}>
//           <MaterialCommunityIcons name='menu' size={25} />
//         </Pressable>
//         <Text style={[styles.productName, { fontSize: 30, textAlign: 'center' }]}>{t("catalog")}</Text>
//       </View>


//       <Text style={{ textAlign: "center", color: '#999999' }}> {t('pull_down_to_refresh')}</Text>
//       {/* <Pressable onPress={() => navigation.navigate("ProductInfo")}>
//         <View style={styles.productCard}>
//           <Image source={{ uri: productsList[0].image_url }} style={styles.productImage} />
//           <View style={styles.productInfo}>
//             <Text style={styles.productName}>{productsList[0].name}</Text>
//             <Text style={styles.productDescription}>{productsList[0].description}</Text>
//             <Text style={styles.productPrice}>₹{productsList[0].price}
//             </Text>
//           </View>
//         </View>
//       </Pressable> */}


//       <FlatList
//         data={productsList}
//         style={styles.productList}
//         renderItem={renderProductItem}
//         keyExtractor={(item) => item.id.toString()}
//         contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
//         refreshing={isLoading}
//         onRefresh={() => dispatch(getAllProduct({ hostname: value, userData }))}
//       />

//       {/* Add Product Button */}
//       <FloatingAction
//         color='#4caf50'
//         actions={[
//           {
//             text: t("scan_product_barcode"),
//             icon: <MaterialCommunityIcons name='barcode-scan' size={25} />,
//             name: "barcode_scan",
//             position: 1,
//             color: '#4caf50',

//           },
//           {
//             text: t("analyze_product_image"),
//             icon: <MaterialCommunityIcons name='magnify-scan' size={25} />,
//             name: "product_scan",
//             position: 2,
//             color: '#4caf50',
//           },
//           {
//             text: t("enter_manually"),
//             icon: <MaterialCommunityIcons name='pen-plus' size={25} />,
//             name: "manual_enter",
//             position: 1,
//             color: '#4caf50',

//           },
//           // {
//           //   text: t("enter_voice"),
//           //   icon: <MaterialCommunityIcons name='microphone' size={25} />,
//           //   name: "product_voice",
//           //   position: 1,
//           //   color: '#4caf50',

//           // },
//           {
//             text: t("enter_voice"),
//             icon: <MaterialCommunityIcons name='microphone' size={25} />,
//             name: "analyze_voice",
//             position: 1,
//             color: '#4caf50',

//           }
//         ]}
//         onPressItem={OnActionButtonClick}
//       />
//     </View>
//   )
// }


const SvgComponent = (props) => {
  return (
    <Svg
      width={WIDTH} //360
      height={HEIGHT / 3} //260
      viewBox="0 0 360 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Ellipse
        cx={180.5}
        cy={53.5}
        rx={411.5}
        ry={206.5}
        fill="url(#paint0_linear_2_2)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_2_2"
          x1={-195.729}
          y1={-97.8155}
          x2={473.729}
          y2={217.816}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.299852} stopColor="#5E73E8" />
          <Stop offset={0.740022} stopColor="#BC62F2" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

const shareApp = async () => {
  try {
    const result = await Share.share({
      message:
        'Download the catalog digitization app ',
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    Alert.alert(error.message);
  }
};




const Home = ({ navigation }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const { productStats, isLoading } = useSelector(state => state.retailproduct);
  const { value } = useSelector(state => state.hostname);
  const { userData } = useSelector(state => state.auth)
  const dispatch = useDispatch();

  useEffect(() => {
    // used to fetch product list 
    return navigation.addListener("focus", () => {
      dispatch(getProductStats({ hostname: value, userData }))
    });
  }, [navigation])

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
      console.log("response", response)

      // Read response body as text
      const csvData = await response.text();
      // getting storage opermission
      if (Platform.OS === "android") {
        const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

        if (permissions.granted) {

          await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, "Catalog.csv", "text/comma-separated-values")
            .then(async (uri) => {
              //await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
              // Write CSV data to file
              await FileSystem.writeAsStringAsync(uri, csvData, {
                encoding: FileSystem.EncodingType.UTF8,
              }).then(() => {
                Alert.alert(t('success'))
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

  const shareCatalog = async () => {
    const userCatalogURL = `${value}/viewcatalog/${userData.id}`;
    try {
      const result = await Share.share({
        message:
          `View out Catalog: ${userCatalogURL} `,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }

  }
  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>


      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        {/* <Pressable onPress={navigation.openDrawer} style={{ marginHorizontal: CUSTOM_MARGIN }}>
          <MaterialCommunityIcons name='menu' size={30} color={"#fff"} />
        </Pressable> */}
        {/* <Image source={require('../../assets/icon.png')} style={{ width: 50, height: 50 }} /> */}
        <Text style={[styles.productName, { fontSize: 30, textAlign: 'center', marginHorizontal: CUSTOM_MARGIN, color: "#fff" }]}>{t("Catalog Digitization")}</Text>
      </View>


      <ScrollView>
        <View style={{ marginBottom: CUSTOM_MARGIN, marginHorizontal: CUSTOM_MARGIN, flexDirection: 'row' }}>
          {/* infoBox : White box displaying info */}
          <Card style={[styles.infoBox, { marginRight: 10 }]}>
            <Card.Content>
              <Text variant='displayLarge' style={{ textAlign: "center", marginVertical: CUSTOM_MARGIN }} >{productStats ? productStats.product_total_count : 'NA'}</Text>
              <Text variant="titleLarge" style={{ textAlign: 'center' }}>{t('total_products')}</Text>
              <Button mode="outlined"
                onPress={() => navigation.navigate(APP_SCREENS.PRODUCTS_SUMMARY, { source: APP_SCREENS.HOME })}
                style={{ marginVertical: CUSTOM_MARGIN }}>
                {t('view_all')}
              </Button>
            </Card.Content>
          </Card>
          <Card style={[styles.infoBox, { marginLeft: 10 }]}>
            <Card.Content>
              <Text variant='displayLarge' style={{ textAlign: "center", marginVertical: CUSTOM_MARGIN }} >{productStats ? productStats.product_category_count : 'NA'}</Text>
              <Text variant="titleLarge" style={{ textAlign: 'center' }}>{t('total_category')}</Text>
              <Button mode="outlined"
                onPress={() => navigation.navigate(APP_SCREENS.PRODUCTS_SUMMARY, { source: APP_SCREENS.HOME })}
                style={{ marginVertical: CUSTOM_MARGIN }}>
                {t('view_all')}
              </Button>
            </Card.Content>
          </Card>
        </View>

        <Divider />

        <View style={{ margin: CUSTOM_MARGIN }}>
          {/* Add Product options */}
          <Text variant='titleLarge' style={{marginVertical:10}}>Add Products</Text>
          <View style={styles.optionsCardConatiner}>
            {
              [{ name: t("scan_product_barcode"), icon: <MaterialCommunityIcons name='barcode-scan' size={30} color={theme.colors.primary} />, id: APP_SCREENS.SCANBARCODE },
              { name: t("enter_manually"), icon: <MaterialCommunityIcons name='pen-plus' size={30} color={theme.colors.primary} />, id: APP_SCREENS.ENTER_MANUALLY },
              { name: t("analyze_product_image"), icon: <MaterialCommunityIcons name='magnify-scan' size={30} color={theme.colors.primary} />, id: APP_SCREENS.SCANPRODUCT },
              { name: t("enter_voice"), icon: <MaterialCommunityIcons name='microphone' size={30} color={theme.colors.primary} />, id: APP_SCREENS.TESTSCREEN },
              { name: t("upload_csv"), icon: <MaterialCommunityIcons name='upload' size={30} color={theme.colors.primary} />, id: APP_SCREENS.ADD_BY_CSV },
              ].map((item, index) => {
                return (
                  <Pressable key={item.id} onPress={() => navigation.navigate(item.id, { source: item.id })}>
                    <View style={styles.optionsCard} >
                      {item.icon}
                      <Text variant='titleSmall' style={{ textAlign: 'center' }}>{item.name}</Text>
                    </View>
                  </Pressable>

                )
              })
            }
          </View>
        </View>
        <Divider />


        <View style={{ margin: CUSTOM_MARGIN }}>
          {/* Add Product options */}
          <Text variant='titleLarge' style={{marginVertical:10}}>{t("other_option")}</Text>

          <View style={styles.optionsCardConatiner}>

            {
              [{ name: t("setting"), icon: <MaterialCommunityIcons name='tools' size={25} />, id: APP_SCREENS.SETTINGS },
              { name: t("change_language"), icon: <MaterialCommunityIcons name='web' size={25} />, id: APP_SCREENS.LANGUAGE_CHANGE },
              ].map((item, index) => {
                return (
                  <Pressable key={item.id} onPress={() => navigation.navigate(item.id, { source: item.id })}>
                    <View style={styles.optionsCard} >
                      {item.icon}
                      <Text variant='titleSmall' style={{ textAlign: 'center' }}>{item.name}</Text>
                    </View>
                  </Pressable>

                )
              })
            }

            <Pressable onPress={() => downloadCSV()}>
              <View style={styles.optionsCard} >
                <MaterialCommunityIcons name='download' size={25} />
                <Text variant='titleSmall' style={{ textAlign: 'center' }}>{t("download_catalog")}</Text>
              </View>
            </Pressable>
            
            <Pressable onPress={() => shareCatalog()}>
              <View style={styles.optionsCard} >
                <MaterialCommunityIcons name='share' size={25} />
                <Text variant='titleSmall' style={{ textAlign: 'center' }}>{t("share_catalog")}</Text>
              </View>
            </Pressable>



            <Pressable onPress={() => {
              dispatch(logout());
            }}>
              <View style={styles.optionsCard} >
                <MaterialCommunityIcons name='logout' size={25} />
                <Text variant='titleSmall' style={{ textAlign: 'center' }}>{t("log_out")}</Text>
              </View>
            </Pressable>

            {/* TestScreen */}
            {/* <Pressable onPress={() => {
              navigation.navigate(APP_SCREENS.TESTSCREEN)
            }}>
              <View style={styles.optionsCard} >
                <MaterialCommunityIcons name='logout' size={25} />
                <Text variant='titleSmall' style={{ textAlign: 'center' }}>{t("testscreen")}</Text>
              </View>
            </Pressable> */}


          </View>
        </View>


        <View style={[styles.shareView, { backgroundColor: theme.colors.primary }]}>
          <Text style={{ color: theme.colors.background }}>{t('share_app')}</Text>
          <Button icon='share'
            mode='elevated'
            // dark={true}
            buttonColor={'#FFC300'}
            textColor={theme.colors.primary}
            onPress={shareApp}
            style={{ height: 50, justifyContent: 'center', margin: CUSTOM_MARGIN }}
          >
            {t("share")}
          </Button>
        </View>

        <View>

          <Text variant='titleMedium' style={styles.footerText}>{t('follow_us')}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: CUSTOM_MARGIN }}>
            <TouchableRipple onPress={() => console.log('facebook')}><MaterialCommunityIcons name={'facebook'} size={45} color={'#1877F2'} /></TouchableRipple>
            <TouchableRipple onPress={() => console.log('instagram')}><MaterialCommunityIcons name={'instagram'} size={45} color={'#cd486b'} /></TouchableRipple>
            <TouchableRipple onPress={() => console.log('linkedin')}><MaterialCommunityIcons name={'linkedin'} size={45} color={'#0762C8'} /></TouchableRipple>
            <TouchableRipple onPress={() => console.log('github')}><MaterialCommunityIcons name={'github'} size={45} color={'#2b3137'} /></TouchableRipple>
          </View>

          <Divider />
          <Text variant='titleMedium' style={styles.footerText}>
            {t('made_with_love')}
          </Text>

          <Text variant='titleMedium' style={[styles.footerText, { marginTop: 0 }]}>
            {/* {t('open_source')}
            {t('open_source')} */}
            #beopen #opensource #ONDC
          </Text>

        </View>

      </ScrollView>
    </View>
  )

}

const styles = StyleSheet.create({
  header: {
    height: 100 + 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: CUSTOM_MARGIN,
    paddingHorizontal: CUSTOM_MARGIN

  },
  bgHeadSVG: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoBox: {
    height: 250,
    width: (WIDTH - (CUSTOM_MARGIN * 2) - 20) / 2,
    backgroundColor: "white",
    borderRadius: 20,
  },
  optionsCardConatiner: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  optionsCard: {
    width: (WIDTH - CUSTOM_MARGIN * 2 - 30) / 3,
    height: (WIDTH - CUSTOM_MARGIN * 2 - 30) / 3,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 5,
    padding: 5
  },
  shareView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: CUSTOM_MARGIN,
    paddingLeft: 10,
    borderRadius: 10
  },
  footerText: {
    textAlign: 'center',
    margin: CUSTOM_MARGIN

  }

})

export default Home;

