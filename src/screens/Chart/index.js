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
                        <View>
                            <Text>Covid-19 Victim Chart</Text>
                            <LineChart
                                data={{
                                    labels: labelData,
                                    datasets: [
                                        {
                                            data: victimData
                                        }
                                    ]
                                }}
                                width={vw(98)} // from react-native
                                height={220}
                                // yAxisLabel=""
                                // yAxisSuffix="k"
                                yAxisInterval={2} // optional, defaults to 1
                                chartConfig={{
                                    backgroundColor: "white",
                                    backgroundGradientFrom: "gray",
                                    backgroundGradientTo: "gray",
                                    decimalPlaces: 1,
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
                                    }
                                }}

                                style={{
                                    marginVertical: 8,
                                    borderRadius: 16
                                }}
                            />
                        </View>
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