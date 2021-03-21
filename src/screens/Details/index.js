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
    ActivityIndicator
} from 'react-native';
import { vw, vh, vmax, vmin } from 'react-native-expo-viewport-units'
import { Form, Input, Label, Item } from 'native-base'
import { useSelector, connect } from 'react-redux'
import axios from 'axios'
import ImagePicker from 'react-native-image-crop-picker'
import { API_URL } from '@env'
import { logout } from '../../utils/redux/action/authAction'

const Details = ({ navigation, route }) => {
    const [victimData, setVictimData] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(API_URL + '/victim/single/' + route.params.victimId)
            .then(({ data }) => {
                setVictimData(data.content)
                setLoading(false)
            }).catch(({ response }) => {
                console.log(response.data)
            })
    }, [])

    return (
        <>
            {
                loading ? (
                    <View style={{ marginTop: vh(40) }}>
                        <ActivityIndicator size="large" color="#f55742" />
                    </View>
                ) : (
                        <>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: vw(13), backgroundColor: '#f7f7f7' }}>
                                <TouchableOpacity
                                    style={{ width: vw(15), justifyContent: 'center', alignItems: 'center' }}
                                    onPress={() => { navigation.goBack() }}
                                >
                                    <Text style={{ fontWeight: 'bold' }}>BACK</Text>
                                </TouchableOpacity>
                                <View style={{ justifyContent: 'center' }}>
                                    <Text style={{ fontWeight: 'bold' }}>{victimData.name != null ? victimData.name : '...'}</Text>
                                </View>
                                <View style={{ width: vw(15) }}></View>
                            </View>
                            {
                                victimData.photo == '' ? (
                                    <Image
                                        style={{ height: vw(100), width: vw(100), borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}
                                        source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' }}
                                    />
                                ) : (
                                        <Image
                                            style={{ height: vw(100), width: vw(100), borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}
                                            source={{ uri: API_URL + victimData.photo }}
                                        />
                                    )
                            }
                            <View style={{ marginLeft: vw(5), marginTop: vw(5) }}>
                                <View style={{ marginTop: 10 }}></View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.text}>Name</Text>
                                    <Text style={styles.text2}>: {victimData.name}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.text}>Age</Text>
                                    <Text style={styles.text2}>: {victimData.age}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.text}>Gender</Text>
                                    <Text style={styles.text2}>: {victimData.gender}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.text}>Address</Text>
                                    <Text style={styles.text2}>: {victimData.address}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.text}>Location</Text>
                                    <Text style={styles.text2}>: {victimData.location}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.text}>Date Added</Text>
                                    <Text style={styles.text2}>: {new Date(victimData.date_added).toDateString()}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.text}>Date Updated</Text>
                                    <Text style={styles.text2}>: {new Date(victimData.date_updated).toDateString()}</Text>
                                </View>
                            </View>
                        </>
                    )
            }
        </>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        width: vw(32)
    },
    text2: {
        fontSize: 20,
        fontWeight: 'bold',
        width: vw(55)
    }
})
const mapDispatchToProps = (dispatch) => {
    return {
        logout: (token, id) =>
            dispatch(logout(token, id)),
    };
};
export default connect(null, mapDispatchToProps)(Details);