import React, { useState, useEffect } from 'react';

import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Switch,
    Alert,
    ActivityIndicator
} from 'react-native';
import { vw, vh, vmax, vmin } from 'react-native-expo-viewport-units'
import { useSelector, connect } from 'react-redux'
import axios from 'axios'
import { API_URL } from '@env'
import { logout } from '../../utils/redux/action/authAction'
import ImagePicker from 'react-native-image-crop-picker'

import Icon from 'react-native-vector-icons/Feather';
import profile from '../../assets/images/profile-img.png';


const ListRegion = ({ navigation, logout }) => {
    const auth = useSelector((state) => state.authReducer);
    const [region, setRegion] = useState([])
    const [isLoading, setLoading] = useState(true)


    useEffect(() => {
        axios.get(API_URL + '/region')
            .then(({ data }) => {
                setRegion(data.content)
                setLoading(false)
            }).catch(({ response }) => {
                console.log(response.data)
            })
    }, [])


    return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.name}>COVID-19</Text>
                <Text style={styles.name}>DATA CENTER</Text>
            </View>
            <View style={styles.content2}>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>List Region</Text>
                </View>
                {
                    isLoading != true ? (
                        <ScrollView>
                            {
                                region.map(({ id, region }) => {
                                    return (
                                        <TouchableOpacity
                                            style={styles.listOperation}
                                            onPress={() => {
                                                navigation.navigate('ListByRegion', {
                                                    regionId: region
                                                })
                                            }}
                                        >
                                            <Text style={styles.nameOperation}>{region}</Text>
                                            <Icon name="arrow-right" size={20} color="#4D4B57" />
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </ScrollView>
                    ) : (
                            <View style={{marginTop:vh(30)}}>
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
        padding: 10,
        paddingTop: 20,
        paddingBottom: 10,
        height: vh(80),
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderTopWidth: 0.5,
        borderColor: '#EEEEEE',
        elevation: 1,
    },
    imguser: {
        height: 80,
        width: 80,
        borderRadius: 10,
    },
    edit: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    txtedit: {
        marginLeft: 10,
        fontSize: 16,
        color: '#7A7886',
    },
    phone: {
        fontSize: 16,
        color: '#7A7886',
        marginBottom: 30,
    },
    listOperation: {
        backgroundColor: '#E5E8ED',
        paddingHorizontal: 27,
        paddingVertical: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    nameOperation: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#4D4B57',
    },
});

const mapDispatchToProps = (dispatch) => {
    return {
        logout: (token, id) =>
            dispatch(logout(token, id)),
    };
};
export default connect(null, mapDispatchToProps)(ListRegion);

// export default ProfileScreen
