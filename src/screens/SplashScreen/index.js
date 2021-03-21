import React, {useEffect} from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 1500);
  }, [navigation]);
  return (
    <View style={styles.background}>
      {/* <Image source={LogoSplash} /> */}
      <Text style={{fontSize: 30, color: 'white', fontWeight:'bold'}}>COVID-19</Text>
      <Text style={{fontSize: 30, color: 'white'}}>DATA CENTER</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f55742',
  },
});
