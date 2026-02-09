import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  BackHandler,
} from 'react-native';

const HomeScreen: React.FC = () => {
  const handleBack = () => {
    Alert.alert(
      'Exit App',
      'Do you want to exit?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Exit', onPress: () => BackHandler.exitApp() },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      {/* Company Logo */}
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
      />

      {/* Title */}
      <Text style={styles.title}>Home</Text>

      {/* Back Button */}
      <TouchableOpacity onPress={handleBack}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  backText: {
    marginTop: 30,
    color: '#007bff',
    fontSize: 16,
  },
});
