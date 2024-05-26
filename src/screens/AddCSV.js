import React, { useState, } from 'react';
import { View, StyleSheet, Linking, Alert } from 'react-native';
import { Button, Text, Paragraph, Title, useTheme } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import { addProductCSV } from '../api/retailproduct';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { CUSTOM_MARGIN } from '../constants';

const AddCSV = () => {

  const { t } = useTranslation();
  const { value } = useSelector(state => state.hostname);
  const { userData } = useSelector(state => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();


  const handleUpload = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'text/comma-separated-values',
      copyToCacheDirectory: true,
    });

    if (result.assets) {
      // Handle the uploaded CSV file here
      const { uri, name, mimeType } = result.assets[0];
      const fileToUpload = {
        uri: uri,
        name: name,
        type: mimeType
      };
      isLoading(true);
      addProductCSV({ file: fileToUpload, hostname: value, access_token: useDrawerStatus.access_token })
        .then((response => {
          isLoading(false);
          console.log('response by add csv:', response);
        }))
        .catch(error => {
          isLoading(false);
          Alert.alert("Error", error.msg)
        })

    }
  };

  const handleViewSample = () => {
    const sampleUrl = 'https://example.com/sample-catalog.csv'; // Replace with your sample file URL
    Linking.openURL(sampleUrl);
  };

  return (
    <View style={styles.container}>
      <Title>{t('upload_catalog')}</Title>
      <Paragraph style={styles.description}>
        {t('upload_catalog_para')}
      </Paragraph>
      <Button
        mode="contained"
        onPress={handleUpload}
        style={styles.uploadButton}
      >
        {t('upload_csv')}
      </Button>
      <Button
        mode="outlined"
        onPress={handleViewSample}
        style={styles.sampleButton}
      >
        {t("view_sample_csv")}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  description: {
    textAlign: 'center',
    marginVertical: CUSTOM_MARGIN,
  },
  uploadButton: {
    marginVertical: 10,
  },
  sampleButton: {
    marginVertical: 10,
  },
});

export default AddCSV;
