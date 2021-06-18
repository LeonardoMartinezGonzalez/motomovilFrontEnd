import React from 'react';
import {  StyleSheet, View, Text, Dimensions } from 'react-native';

//import { ListItem, Avatar } from 'react-native-elements';

//import { View, Text } from 'native-native-elements';
//import globalStyles from '../styles/global';
//import { useNavigation } from '@react-navigation/native';
import { gql, useQuery } from '@apollo/client';

const OBTENER_SERVICIOS = gql`
    query obtenerServicios { 
        obtenerServicios {
            numeroSolicitud
            lugarPartida
            lugarDestino
            distancia
            tiempoEstimado
            id: ID
        }
    }
`;



const ServiciosRealizados = () => {



    const navigation = useNavigation();

    // Apollo
    const  { data, loading, error } = useQuery(OBTENER_SERVICIOS); // data --> Informacion,  loading -->cargando,  error --> Error

    console.log(data);
    console.log(loading);
    console.log(error); 
    
    if(loading) return <Text>Cargando...</Text>


   return ( 
    <View >
        <Text>Encabezado</Text>
    </View>
           
   )

}
export default ServiciosRealizados;