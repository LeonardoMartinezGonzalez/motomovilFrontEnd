//import 'react-native-gesture-handler';
import React from 'react';
//import { StyleSheet, Text, View, ScrollView} from 'react-native';
//import Icon from 'react-native-vector-icons/FontAwesome';
//import { Input, ThemeProvider, Button } from 'react-native-elements';

import { NavigationContainer } from '@react-navigation/native';
import {  createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import Login from './Views/Login';
import CrearCuenta from './Views/CrearCuenta';
import CrearServicio  from './Views/CrearServicio';
import ServiciosRealizados  from './Views/ServiciosRealizados';

// prettier-ignore
const App = () =>  {
  return (
    <>

      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" >
          <Stack.Screen
            name="Login"
            component = {Login}
            options = {{
              title: "Iniciar Sesión",
              headerShown: false
            }}
          />

          <Stack.Screen
            name="CrearCuenta"
            component = {CrearCuenta}
            options = {{
              title: "", //Registro de Usuarios
              headerShown: false
            }}
          />

          <Stack.Screen
            name="CrearServicio"
            component = {CrearServicio}
            options = {{
              title: "MotoMovil", //Registro de Usuarios
              headerStyle: {
                backgroundColor: '#E4941B'
              },
              headerShown: true,
              headerTintColor: '#fff',
              headerTitleStyle:{
                fontWeight: 'bold'
              }
            }}
          />

          <Stack.Screen
            name="ServiciosRealizados"
            component = {ServiciosRealizados}
            options = {{
              title: "Servicios Solicitados", //Servicios solicitados por usuarios
              headerShown: true
            }}
          />
        
        </Stack.Navigator>
      </NavigationContainer>

    </>
  );
};

export default App;
