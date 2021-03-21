import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input } from 'react-native-elements';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ToastAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconUser from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux'
import { setEmailForgot } from '../../../utils/redux/action/authAction'
// import {API_URL} from '@env';
import { API_URL } from "@env"

const RegisterScreen = ({ navigation, setEmailForgot }) => {
  const [pass, setPass] = useState('');
  const [phone, setPhone] = useState('');
  const [show, setShow] = useState(true);
  const [errMsg, setErrMsg] = useState('');

  const empty = () => {
    if (phone === '' || pass === '') {
      return true;
    } else {
      return false;
    }
  };

  const register = () => {
    setErrMsg('')
    if (empty()) {
      setErrMsg('Please fill out this field!')
    } else {
      const signupData = {
        phone: phone,
        password: pass,
        user_type: 2
      }
      axios.post(API_URL + `/auth/signup`, signupData)
        .then(({ data }) => {
          ToastAndroid.showWithGravity(
            "User has been created",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
          navigation.navigate('Login')
        }).catch(({ response }) => {
          console.log(response.data)
          if (response.status == 401) {
            ToastAndroid.showWithGravity(
              "Phone number already taken!",
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );
          }
        })
    }
  };

  return (
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.name}>COVID-19</Text>
        <Text style={styles.name}>DATA CENTER</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.subContent}>
          <Text style={styles.header}>Sign Up</Text>
          <Text style={styles.subHeader}>
            Create your account to access
          </Text>
          <Text style={styles.subHeader}>
            COVID-19 Data Center
          </Text>
        </View>
        <View style={styles.form}>
          <Text
            style={{
              marginBottom: 10,
              color: 'red',
              paddingRight: 10,
              fontSize: 15,
              textAlign: 'center',
            }}>
            {errMsg}
          </Text>

          {/* username */}
          <Input
            placeholder="Enter your phone number"
            leftIcon={
              <IconUser
                name="user"
                size={24}
                color={phone === '' ? '#878787' : '#f55742'}
              />
            }
            onChangeText={(phone) => setPhone(phone)}
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
            onChangeText={(pass) => {
              setPass(pass);
            }}
            secureTextEntry={show}
          />
          {/* password */}
        </View>
        <TouchableOpacity
          style={empty() ? styles.btn : styles.btnActive}
          onPress={register}>
          <Text style={empty() ? styles.textNon : styles.textActive}>
            Sign Up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text style={styles.acc}>
            Already have an account? Let's
            <Text style={styles.login}> Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  name: {
    // marginBottom: 50,
    color: '#f55742',
    alignSelf: 'center',
    fontSize: 32,
    fontWeight: 'bold',
  },
  content: {
    paddingBottom: 30,
    padding: 10,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderTopWidth: 0.5,
    borderColor: '#EEEEEE',
    elevation: 1,
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
    setEmailForgot: (email) =>
      dispatch(setEmailForgot(email)),
  };
};
export default connect(null, mapDispatchToProps)(RegisterScreen);
