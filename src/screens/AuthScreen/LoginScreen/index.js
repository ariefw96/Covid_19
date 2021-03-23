import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  ActivityIndicator
} from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconUser from 'react-native-vector-icons/Feather';
import { vw, vh } from 'react-native-expo-viewport-units'
import { useSelector } from 'react-redux';
import { API_URL } from "@env";

// redux
import { connect } from 'react-redux';
import { login } from '../../../utils/redux/action/authAction';

const LoginScreen = ({ navigation, login }) => {
  const [phone, setPhone] = useState('');
  const [pass, setPass] = useState('');
  const [show, setShow] = useState(true);
  const [errMsg, setErrMsg] = useState('');
  const [btnText, setBtnText] = useState('Login')

  const isLogin = useSelector((state) => state.authReducer.isLogin);

  const empty = () => {
    if (phone === '' || pass === '') {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (isLogin != false) {
      navigation.replace('Home')
    }
  }, [])

  const submitLogin = () => {
    setBtnText('Please Wait')
    setErrMsg('')
    if (empty()) {
      setErrMsg('Please fill out this field!')
    } else {
      const dataLogin = {
        phone: phone,
        password: pass
      }
      axios.post(API_URL + `/auth/login`, dataLogin)
        .then(({ data }) => {
          if (data.user_type == 1) {
            ToastAndroid.showWithGravity(
              "Welcome back Admin :)",
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );
          } else {
            ToastAndroid.showWithGravity(
              "Login success!",
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );
          }
          login(data.content.user_id, data.content.user_type, data.content.phone)
          navigation.replace('Home')
        }).catch(({ response }) => {
          if (response.status == 404) {
            setBtnText('Login')
            ToastAndroid.showWithGravity(
              "Phone/password wrong!",
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );
            console.log(response.data)
          }else{
            ToastAndroid.showWithGravity(
              "Internal Server ERROR",
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );
          }
        })
    }
  }



  return (
    <>
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.name}>COVID-19</Text>
          <Text style={styles.name}>DATA CENTER</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.subContent}>
            <Text style={styles.header}>Login</Text>
            <Text style={styles.subHeader}>
              Login to your existing account to access
              </Text>
            <Text style={styles.subHeader}>
              COVID-19 Data Center
          </Text>
          </View>
          <Text style={{ color: 'red', textAlign: 'center', marginTop: 5 }}>{errMsg}</Text>
          <View style={styles.form}>
            <Input
              placeholder="Enter your phone number"
              keyboardAppearance="dark"
              keyboardType={"number-pad"}
              leftIcon={
                <IconUser
                  name="user"
                  size={24}
                  color={phone === '' ? '#878787' : '#eb4034'}
                />
              }
              onChangeText={(text) => setPhone(text)}
            />
            <Input
              placeholder="Enter your password"
              leftIcon={
                <Icon
                  name="lock-outline"
                  size={24}
                  color={pass === '' ? '#878787' : '#f55742'}
                />
              }
              rightIcon={
                <Icon
                  name={!show ? 'eye-outline' : 'eye-off-outline'}
                  size={24}
                  color="#878787"
                  onPress={() => {
                    setShow(!show);
                  }}
                />
              }
              onChangeText={(text) => {
                setPass(text);
              }}
              secureTextEntry={show}
            />
          </View>
          <Text
            style={styles.forgot}
            onPress={() => {
              navigation.navigate('Forgot');
            }}>
            Forgot password?
            </Text>
          <TouchableOpacity
            style={empty() ? styles.btn : styles.btnActive}
            onPress={submitLogin}
          >
            <Text style={empty() ? styles.textNon : styles.textActive}>
              {btnText}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Register');
            }}>
            <Text style={styles.acc}>
              Don't have an account? Let's
                <Text style={styles.login}> Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  name: {
    // marginBottom: 50,
    color: '#eb4034',
    alignSelf: 'center',
    fontSize: 26,
    fontWeight: 'bold',
  },
  content: {
    padding: 10,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderTopWidth: 0.5,
    borderColor: '#EEEEEE',
    elevation: 1,
    paddingBottom: vh(5)
  },
  subContent: {
    marginTop: 30,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  subHeader: {
    fontSize: 16,
    color: '#878787',
  },
  form: {
    marginTop: 10,
  },
  forgot: {
    alignSelf: 'flex-end',
    paddingRight: 15,
    top: -8,
  },
  btn: {
    width: '90%',
    backgroundColor: '#DADADA',
    padding: 18,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 25,
    borderRadius: 12,
  },
  btnActive: {
    width: '90%',
    backgroundColor: '#f55742',
    padding: 18,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 25,
    borderRadius: 12,
  },
  textNon: {
    fontWeight: 'bold',
    color: '#88888F',
    fontSize: 20,
  },
  textActive: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
  acc: {
    alignSelf: 'center',
    marginTop: 20,
    color: '#5D5757',
  },
  login: {
    color: '#f55742',
    fontWeight: 'bold',
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    login: (id, type, phone) =>
      dispatch(login(id, type, phone)),
  };
};
export default connect(null, mapDispatchToProps)(LoginScreen);

