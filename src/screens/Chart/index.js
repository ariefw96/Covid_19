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
import { LineChart } from 'react-native-chart-kit'
import { API_URL } from '@env'


const Chart = ({ navigation, route }) => {
    const [loading, setLoading] = useState(true)
    const [labelData, setLabelData] = useState([])
    const [victimData, setVictimData] = useState([])

    const getChartData = () => {
        axios.get(API_URL + '/victim/countData')
            .then(({ data }) => {
                setLabelData(data.content.region)
                setVictimData(data.content.victimCount)
                setLoading(false)
            }).catch(({ response }) => {
                console.log(response.data)
            })
    }

    useEffect(() => {
        getChartData()
    }, [])


    return (
        <>
            {
                loading != true ? (
                    <>
                        <View style={{  borderBottomWidth: 1, borderColor: 'gray' }}>
                            <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 24, paddingVertical:vw(2) }}>Statistic and Summary</Text>
                        </View>
                        <ScrollView>
                            <View style={{ marginHorizontal: vw(5) }}>
                                <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 24, marginTop: 20 }}>Covid-19 Victim Chart</Text>
                                <LineChart
                                    data={{
                                        labels: labelData,
                                        datasets: [
                                            {
                                                data: victimData
                                            }
                                        ]
                                    }}
                                    width={vw(90)} // from react-native
                                    height={300}
                                    // yAxisLabel=""
                                    // yAxisSuffix="k"
                                    yAxisInterval={2} // optional, defaults to 1
                                    chartConfig={{
                                        backgroundColor: "white",
                                        backgroundGradientFrom: "gray",
                                        backgroundGradientTo: "gray",
                                        decimalPlaces: 0,
                                        barPercentage: 1,
                                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                        style: {
                                            borderRadius: 16
                                        },
                                        propsForDots: {
                                            r: "1",
                                            strokeWidth: "3",
                                            stroke: "black"
                                        },
                                        horizontalLabelRotation: 40,

                                    }}

                                    style={{
                                        marginVertical: 8,
                                        borderRadius: 16
                                    }}
                                />
                            </View>
                            <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 24, marginVertical: 15 }}>Covid-19 Victim Table</Text>
                            <View>
                                <View style={{ flexDirection: 'row', marginHorizontal: vw(5) }}>
                                    <View style={{ width: vw(10), borderWidth: 2, borderColor: 'gray', padding: 5 }}>
                                        <Text style={{ alignSelf: 'center' }}>No.</Text>
                                    </View>
                                    <View style={{ width: vw(50), borderWidth: 2, borderColor: 'gray', padding: 5 }}>
                                        <Text style={{ alignSelf: 'center' }}>Region</Text>
                                    </View>
                                    <View style={{ width: vw(30), borderWidth: 2, borderColor: 'gray', padding: 5 }}>
                                        <Text style={{ alignSelf: 'center' }}>Total Cases</Text>
                                    </View>
                                </View>
                                {
                                    labelData.length > 0 && labelData.map((item, index) => {
                                        return (
                                            <>
                                                <View style={{ flexDirection: 'row', marginHorizontal: vw(5) }}>
                                                    <View style={{ width: vw(10), borderWidth: 2, borderColor: 'gray', padding: 5 }}>
                                                        <Text style={{ alignSelf: 'center' }}>{index + 1}</Text>
                                                    </View>
                                                    <View style={{ width: vw(50), borderWidth: 2, borderColor: 'gray', padding: 5 }}>
                                                        <Text style={{ alignSelf: 'center' }}>{item}</Text>
                                                    </View>
                                                    <View style={{ width: vw(30), borderWidth: 2, borderColor: 'gray', padding: 5 }}>
                                                        <Text style={{ alignSelf: 'center' }}>{victimData[index]}</Text>
                                                    </View>
                                                </View>
                                            </>
                                        )
                                    })
                                }
                            </View>
                        </ScrollView>
                    </>
                ) : (
                        <View style={{ marginTop: vh(40) }}>
                            <ActivityIndicator size="large" color="#f55742" />
                        </View>
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
export default connect(null, mapDispatchToProps)(Chart);