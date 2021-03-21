import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, Image, TouchableOpacity, Alert, ToastAndroid} from 'react-native'
import { vw, vh, vmax, vmin } from 'react-native-expo-viewport-units'
import axios from 'axios'
import { API_URL } from '@env'

const Card = ({ id, photo, name, gender, age, location, navigation }) => {
    const auth = useSelector((state) => state.authReducer);

    const popConfirm = () => {
        Alert.alert(
            'Delete data?',
            'Data yang dihapus tidak dapat dikembalikan',
            [
                { text: 'NO', style: 'cancel' },
                { text: 'YES', onPress: () => deleteItems() },

            ])
    }

    const deleteItems = () => {
        axios.delete(API_URL + '/victim/delete/' + id)
            .then(({ data }) => {
                ToastAndroid.showWithGravity(
                    "Success delete Victim",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                  );
                navigation.replace('List')
            }).catch(({ response }) => {
                console.log(response.data)
            })
    }

    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('Details', {
                    victimId: id,
                })
            }}
        >
            <View style={{ flexDirection: 'row', height: vw(30), marginVertical: 5, borderWidth: 1, borderColor: 'gray', borderRadius: 10 }}>
                <View style={{ width: vw(30) }}>
                    {
                        photo == '' ? (
                            <Image
                                style={{ height: vw(29), width: vw(30), borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}
                                source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' }}
                            />
                        ) : (
                                <Image
                                    style={{ height: vw(29), width: vw(30), borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}
                                    source={{ uri: API_URL + photo }}
                                />
                            )
                    }
                </View>
                <View style={{ width: vw(63), backgroundColor: '#e8eaeb', paddingTop: vw(2), paddingLeft: vw(2), borderTopRightRadius: 10, borderBottomRightRadius: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'row', width: '73%', height: vw(7) }}>
                            <Text style={{ width: vw(15), }}>Name</Text>
                            <Text numberOfLines={1} style={{ width: vw(30) }}>: {name}</Text>
                        </View>
                        {
                            auth.type != 1 ? (
                                <TouchableOpacity
                                    style={{
                                        borderRadius: 10,
                                        borderColor: 'green',
                                        borderWidth: 0.1,
                                        backgroundColor: '#3291a8',
                                        width: vw(15),
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginVertical: vw(0.5),
                                        marginLeft: vw(1)
                                    }}
                                    onPress={() => {
                                        navigation.navigate('Edit', {
                                            victimId: id
                                        })
                                    }}
                                >
                                    <Text>Edit</Text>
                                </TouchableOpacity>
                            ) : (<></>)
                        }
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'row', width: '73%', height: vw(7) }}>
                            <Text style={{ width: vw(15) }}>Age</Text>
                            <Text>: {age}</Text>
                        </View>
                        {
                            auth.type != 1 ? (
                                <TouchableOpacity
                                    style={{
                                        borderRadius: 10,
                                        borderColor: 'green',
                                        borderWidth: 0.1,
                                        backgroundColor: '#f55742',
                                        width: vw(15),
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginVertical: vw(0.5),
                                        marginLeft: vw(1)
                                    }}

                                    onPress={popConfirm}
                                >
                                    <Text>Delete</Text>
                                </TouchableOpacity>
                            ) : (<></>)
                        }

                    </View>
                    <View style={{ flexDirection: 'row', width: '90%', height: vw(7) }}>
                        <Text style={{ width: vw(15) }}>Gender</Text>
                        <Text>: {gender}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '90%', height: vw(7) }}>
                        <Text style={{ width: vw(15) }}>Location</Text>
                        <Text>: {location}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity >
    )
}
export default Card;