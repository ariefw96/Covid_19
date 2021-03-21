import React, { useState, useEffect } from 'react';

import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Picker,
    ActivityIndicator
} from 'react-native';
import { vw, vh, vmax, vmin } from 'react-native-expo-viewport-units'
import { Form, Input, Label, Item } from 'native-base'
import { useSelector, connect } from 'react-redux'
import axios from 'axios'
import { API_URL } from '@env'
import { logout } from '../../utils/redux/action/authAction'
import Card from './../../components/card'


const ProfileScreen = ({ navigation }) => {
    const auth = useSelector((state) => state.authReducer);
    const [victim, setVictim] = useState([])
    const [noData, setNoData] = useState(false)
    const [isLoading, setLoading] = useState(true)

    console.log(auth)

    useEffect(() => {
        axios.get(API_URL + '/victim/list')
            .then(({ data }) => {
                setVictim(data.content)
                setNoData(false)
                setLoading(false)
            }).catch(({ response }) => {
                console.log(response.data)
                if (response.status == 404) {
                    setNoData(true)
                }
            })
    }, [])

    return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', }}>
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.name}>COVID-19</Text>
                <Text style={styles.name}>DATA CENTER</Text>
            </View>
            <View style={styles.content2}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5, }}>List Of Victim</Text>
                {
                    noData == true ? (
                        <View style={{ alignItems: 'center', marginTop: vh(26) }}>
                            <Text style={{ color: '#f55742', fontSize: 32, fontWeight: 'bold' }}>404</Text>
                            <Text style={{ color: '#f55742', fontSize: 24 }}>Not Found </Text>
                        </View>
                    ) : (
                            <>
                            </>
                        )
                }
                {
                    isLoading != true ? (
                        <ScrollView>
                            {
                                victim.map(({ id, name, gender, age, location, photo }) => {
                                    return (
                                        <Card id={id} name={name} gender={gender} age={age} location={location} photo={photo} navigation={navigation} />
                                    )
                                })
                            }
                        </ScrollView>
                    ) : (
                            <View style={{ marginTop: vh(30) }}>
                                <ActivityIndicator size="large" color="#f55742" />
                            </View>
                        )
                }
            </View>
        </View>
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
        paddingTop: 10,
        paddingBottom: 30,
        height: vh(80),
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderTopWidth: 0.5,
        borderColor: '#EEEEEE',
        elevation: 1,
        paddingHorizontal: vw(3),
        alignItems:'center'
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
