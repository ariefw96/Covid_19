import React, { useState, useEffect } from 'react';

import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Picker,
    ToastAndroid,
    TextInput
} from 'react-native';
import { vw, vh, vmax, vmin } from 'react-native-expo-viewport-units'
import { Form, Input, Label, Item } from 'native-base'
import { useSelector, connect } from 'react-redux'
import axios from 'axios'
import ImagePicker from 'react-native-image-crop-picker'
import { API_URL } from '@env'
import { logout } from '../../utils/redux/action/authAction'


const ProfileScreen = ({ navigation, route }) => {
    const auth = useSelector((state) => state.authReducer);
    const [btnText, setBtnText] = useState('Submit')
    const [loadRegion, setLoadRegion] = useState([])
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [region, setRegion] = useState('')
    const [gender, setGender] = useState('')
    const [address, setAddress] = useState('')
    const [photo, setPhoto] = useState([])
    const [thumb, setThumb] = useState('')

    // console.log(auth)

    useEffect(() => {
        getRegion()
        getData()
    }, [])

    const getRegion = () => {
        axios.get(API_URL + '/region')
            .then(({ data }) => {
                // console.log(data)
                setLoadRegion(data.content)
            }).catch(({ response }) => {
                console.log(response.data)
            })
    }

    const getData = () => {
        axios.get(API_URL + '/victim/single/' + route.params.victimId)
            .then(({ data }) => {
                const info = data.content
                setName(info.name)
                setAge(info.age)
                setRegion(info.location)
                setGender(info.gender)
                setThumb(info.photo)
                setAddress(info.address)
            }).catch(({ response }) => {
                console.log(response.data)
            })
    }

    const uploadPhoto = () => {
        ImagePicker.openPicker({
            multiple: true,
            mediaType: 'photo',
        })
            .then((images) => {
                setPhoto(images)
                setThumb('')
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const config = {
        headers: {
            'Content-type': 'multipart/form-data',
        },
    };

    const submitVictim = () => {
        setBtnText('Please Wait')
        const data = new FormData()
        data.append('name', name)
        data.append('age', age)
        data.append('address', address)
        if (photo.length > 0) {
            for (let i = 0; i < photo.length; i++) {
                data.append('photo',
                    {
                        name: photo[i].path.split('/').pop(),
                        type: photo[i].mime,
                        uri:
                            Platform.OS === 'android'
                                ? photo[i].path
                                : photo[i].path.replace('file://', ''),
                    }
                );
            }
        }
        data.append('gender', gender)
        data.append('location', region)
        data.append('created_by', auth.id)
        axios.patch(API_URL + '/victim/update/' + route.params.victimId, data, config)
            .then(({ data }) => {
                console.log(data)
                setBtnText('Submit')
                ToastAndroid.showWithGravity(
                    "Success Update Victim",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
                navigation.replace('List')
            }).catch(({ response }) => {
                console.log(response.data)
            })
    }

    return (
        <ScrollView style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{  flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginVertical:vh(5) }}>
                <Text style={styles.name}>COVID-19</Text>
                <Text style={styles.name}>DATA CENTER</Text>
            </View>
            <View style={styles.content2}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Edit Victim</Text>
                </View>
                <View>
                    <Form>
                        <Item floatingLabel>
                            <Label>Name</Label>
                            <Input value={name} onChangeText={(text) => { setName(text) }} />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Age</Label>
                            <Input keyboardType="numeric" value={age} onChangeText={(text) => { setAge(text) }} />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Address</Label>
                            <Input value={address} onChangeText={(text) => { setAddress(text) }} />
                        </Item>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Item style={{ marginLeft: 0 }}>
                                <Label style={{ marginLeft: 10 }}>Gender</Label>
                            </Item>
                            <Picker
                                selectedValue={gender}
                                style={{ width: '50%' }}
                                onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
                            >
                                <Picker.Item label="Select" value="0" />
                                <Picker.Item label="Male" value="Male" />
                                <Picker.Item label="Female" value="Female" />
                            </Picker>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Item style={{ marginLeft: 0 }}>
                                <Label style={{ marginLeft: 10 }}>Location</Label>
                            </Item>
                            <Picker
                                selectedValue={region}
                                style={{ width: '50%' }}
                                onValueChange={(itemValue, itemIndex) => setRegion(itemValue)}
                            >
                                <Picker.Item label="Select" value="0" />
                                {
                                    loadRegion.map(({ region }) => {
                                        return (
                                            <Picker.Item label={region} value={region} />
                                        )
                                    })
                                }
                            </Picker>
                        </View>
                        {
                            thumb != '' ?
                                (
                                    <Image source={{ uri: API_URL + thumb }} style={{ width: vw(20), height: vw(20) }} />
                                ) : (
                                    <>
                                        {
                                            photo.length > 0 ? (

                                                <>
                                                    <Image source={{ uri: photo[0].path }} style={{ width: vw(20), height: vw(20) }} />
                                                </>
                                            ) : (
                                                    <></>
                                                )
                                        }
                                    </>
                                )
                        }
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#f5aa42',
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 10,
                                paddingVertical: 10,
                                borderRadius: 20
                            }}
                            onPress={uploadPhoto}
                        >
                            <Text>Upload Photo</Text>
                        </TouchableOpacity>
                    </Form>
                    <TouchableOpacity
                        style={styles.btnActive}
                        onPress={submitVictim}
                    >
                        <Text style={styles.textActive}>
                            {btnText}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'white',
    },
    name: {
        color: '#eb4034',
        alignSelf: 'center',
        fontSize: 26,
        fontWeight: 'bold',
    },
    content: {
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: vh(8),
    },
    content2: {
        padding: 10,
        paddingTop: 50,
        paddingBottom: 30,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderTopWidth: 0.5,
        borderColor: '#EEEEEE',
        elevation: 1,
        paddingHorizontal: '7%'
    },
    nameOperation: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#4D4B57',
    },
    btnActive: {
        width: '100%',
        backgroundColor: '#f55742',
        padding: 10,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 25,
        borderRadius: 12,
    },
    textActive: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 20,
    },
});

const mapDispatchToProps = (dispatch) => {
    return {
        logout: (token, id) =>
            dispatch(logout(token, id)),
    };
};
export default connect(null, mapDispatchToProps)(ProfileScreen);

// export default ProfileScreen
