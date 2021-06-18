import * as React from 'react';
import { StyleSheet, Text, View, Dimensions, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button} from 'react-native-elements';

import { useNavigation } from '@react-navigation/native';

import globalStyles from './styles/global';

import MapView from 'react-native-maps';
import {  Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
const haversine = require('haversine');

import  ModalWindow  from '../components/ModalWindow';

//Servidor Apollo 
import { gql, useMutation } from '@apollo/client';

const NUEVO_SERVICIO = gql`
    mutation crearServicio($input: ServicioInput) {
        crearServicio(input : $input) {
            numeroSolicitud
            id
        }
}
`;

// prettier-ignore
const Servicios = () => {

    //Numero de solicitud
    const numeroSolicitud = "2";

    //Apollo
    const [crearServicio] = useMutation(NUEVO_SERVICIO);

    //Para activar o desactivar la ventana modal
    const [visibility, setVisibility] = React.useState(false);

    //Para establecer el punto de partida
    const [lugarPartida, setlugarPartida] = React.useState('Jiquilpan');

    //Para establecer lugarDestino
    const [lugarDestino, setlugarDestino] = React.useState('¿Cuál es tu destino?');

    //Para obtener la distancia en Kilometros
    const [distancia, setDistancia] = React.useState(' mts. ');

    //Para el tiempo
    const [tiempoEstimado, setTiempoEstimado] = React.useState('5 Mins.');

    //Para establecer el costo de traslado
    const [costoTraslado, setCostoTraslado] = React.useState('$ 10.0')

    //Para establecer el punto en el mapa
    const [location, setLocation] = React.useState({
        latitude: 19.9877337, //37.78825,
        longitude: -102.7105572, //-122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const [marker, setMarker] = React.useState(null);

    //React Navigation
    const navigation = useNavigation();

    React.useEffect(() => {
        Geolocation.getCurrentPosition(info => {
            console.log(info);
            const body = {
                latitude: info.coords.latitude,
                longitude: info.coords.longitude,
                latitudeDelta: 0.0922, 
                longitudeDelta: 0.0421,
            }
            //Punto de solicitud de servicio
            setLocation(body);
            setlugarPartida(`Origen Latitud: ${(info.coords.latitude).toFixed(4)}`); //Longitud: ${info.coords.longitude}
        }, error => Alert.alert('Error', 'No se pudo obtener la localización'));
    }, [])

    React.useEffect(() => {
        if(marker){
            const distance = haversine(location, marker, {unit: 'meter'});
            setDistancia(`${(distance/1000).toFixed(2)} Kms.`);
            setTiempoEstimado( `${(distance /1000 * 5 + 5).toFixed(0)} Mins.`) // 5min por Km + 5 min de salida
            setCostoTraslado( () =>{
                if (distance/1000 < 5)
                    return `$ ${(distance/1000*8 + 10).toFixed(2)} `;
                else if ((distance/1000 > 5) && ( distance/1000 < 11 ))
                    return `$ ${(distance/1000*4 + 10).toFixed(2)} `;
                else if (distance/1000 > 11)
                    return `$ ${(distance/1000*3 + 10).toFixed(2)} `;
            }); //8 pesos por kilometro 
            //
            //setDistance(haversine(location, marker, {unit: 'meter'}))
            //Alert.alert(lugarDestino); //`la distancia en metros es ${distance}`
        }    
    }, [marker])

    const handleSubmit = () =>{
        
        if (lugarDestino !== '¿Cuál es tu destino?'){
            //alert(lugarDestino);
            setVisibility(true);
        }else{
            Alert.alert('debes seleccionar un lugar');
        }
            
    }

   
    const handleSubmitModalCancelar = ()  =>{
        setVisibility(false);
    }


    //Boton del Modal Aceptar
    const handleSubmitModalAceptar = () =>{
        setVisibility(false);
        crearNuevoServicio();
    }

 // Funcion para cfrear un nuevo servicio
    const crearNuevoServicio = async () =>{
        //Guardar el servicio en la Base de Datos
        try {
            //alert(`Solicitud:  ${numeroSolicitud} Inicio:  ${lugarPartida} Destino: ${lugarDestino} Distancia: ${distancia} tiempoEstimado: ${tiempoEstimado}`);
            const { data } = await crearServicio({
                variables: {
                    input: {
                        numeroSolicitud,
                        lugarPartida,
                        lugarDestino,
                        distancia,
                        tiempoEstimado
                    }
                }
            });
            
            console.log( data );
            Alert.alert('Tu servicio se ha registrado, ... ');
             //Redireccionar a Vista de Servicios de Usuario
             navigation.navigate("ServiciosRealizados");

        } catch (error) {
            console.log(error);
        }
        
    }

    return (
        <View style={styles.container}>
            {/* <View style = { globalStyles.fondoEncabezado} >
                <Text style= {globalStyles.titulo1} >Moto</Text>
                <Text style= {globalStyles.titulo2} >Movil </Text>
                
            </View> */}

            <View  style = { styles.fondoSeleccionarLugar}>
                <View  style = { styles.fondoTitulosDestino}>
                  
                    <Text style = { styles.tituloDestino} >
                            {lugarDestino}
                    </Text>

                    <Text style = { styles.subTituloDestino} >
                        selecciona un lugar en el mapa
                    </Text>

                    
                </View>
                <Button
                    icon={
                        <Icon
                        name="arrow-right"
                        size={15}
                        color="#9E9E9E"
                        />
                    }
                    buttonStyle = {{backgroundColor:'#9E9E9E'}}
                    title="   Ir   "
                    onPress = { () => handleSubmit() }
                />
            </View>
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
                    setMarker(body);
                    setlugarDestino(`Destino Latitud: ${(coordinate.latitude).toFixed(4)}`);
                }}
            >
                <Marker
                    coordinate={location}
                    title={"Mi ubicación"}
                    description={"marker.description"}
                />
                {marker && <Marker
                    coordinate={marker}
                    title={"Lugar Destino"}
                    description={"marker.description"}
                />}

            </MapView>
            <ModalWindow visibility={visibility}>
                <View style = { styles.cajaMensaje}>
                    <Text style = { styles.tituloMensaje}> Origen:</Text>
                    <Text style = { styles.subTituloMensaje}> {lugarPartida}</Text>
                </View>

                <View style = { styles.cajaMensaje}>
                    <Text style = { styles.tituloMensaje}> Destino:</Text>
                    <Text style = { styles.subTituloMensaje}> {lugarDestino}</Text>
                </View>

                <View style = { styles.cajaMensaje}>
                    <Text style = { styles.tituloMensaje}> Distancia:</Text>
                    <Text style = { styles.subTituloMensaje}> {distancia}</Text>
                </View>
                
                <View style = { styles.cajaMensaje}>
                    <Text style = { styles.tituloMensaje}> Tiempo estimado:</Text>
                    <Text style = { styles.subTituloMensaje}> {tiempoEstimado}</Text>
                </View>

                <View style = { styles.cajaMensaje}>
                    <Text style = { styles.tituloMensaje}> Costo del servicio:</Text>
                    <Text style = { styles.subTituloMensaje}>{costoTraslado}</Text>
                </View>

                <View  style = { styles.cajaBotones}>
                    <Button
                    title="Cancelar"
                    buttonStyle = { {marginTop:20} } 
                    onPress={ () => handleSubmitModalCancelar() }
                    />

                    <Button
                    title="Aceptar"
                    buttonStyle = { {marginTop:20} } 
                    onPress={ () => handleSubmitModalAceptar() }
                    />
                </View>
            </ModalWindow>

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height-124,
    },
    /* fondoEncabezado:{
        height: 50,
        width: '100%',
        backgroundColor: '#E4941B'
    }, */
    fondoSeleccionarLugar:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height:50,
    },
    tituloDestino:
    { 
        fontSize: 20,
        color: '#9E9E9E',
        fontWeight: 'bold'
    },
    subTituloDestino:{
        fontSize: 12,
        color: '#3C4EEF',
        fontWeight: 'normal'
    },
    fondoTitulosDestino:{
        flex: .9,
    },
    tituloMensaje:{
        
         fontSize: 18,
        color: '#071696',
        fontWeight: 'bold'
    },
    subTituloMensaje:{
        fontSize: 15,
        color: '#fff',
        fontWeight: 'normal',
    },
    cajaMensaje:{
        flex: 0,
        flexDirection:'row',
        alignItems: 'center',
    },
    cajaBotones:{
        flex:0,
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
});

export default Servicios;
