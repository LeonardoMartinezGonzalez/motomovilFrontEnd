import * as React from 'react';
import MapView from 'react-native-maps';
import {  Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
const haversine = require('haversine')

// prettier-ignore
const Servicios = () => {

    const [location, setLocation] = React.useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const [marker, setMarker] = React.useState(null);

    React.useEffect(() => {
        Geolocation.getCurrentPosition(info => {
            console.log(info);
            const body = {
                latitude: info.coords.latitude,
                longitude: info.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }
            setLocation(body)
        }, error => Alert.alert('Error', 'No se pudo obtener la localización'));
    }, [])

    React.useEffect(() => {
        if(marker){
           const distance = haversine(location, marker, {unit: 'meter'})
        Alert.alert(`la distancia en metros es ${distance}`); 
        }    
    }, [marker])

    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                initialRegion={location}
                onPress={({ nativeEvent }) => {
                    const { coordinate } = nativeEvent;
                    const body = {
                        latitude: coordinate.latitude,
                        longitude: coordinate.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }
                    setMarker(body)
                }}
            >
                <Marker
                    coordinate={location}
                    title={"Ejemplo"}
                    description={"marker.description"}
                />
                {marker && <Marker
                    coordinate={marker}
                    title={"Ejemplo"}
                    description={"marker.description"}
                />}
            </MapView>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});

export default Servicios;
