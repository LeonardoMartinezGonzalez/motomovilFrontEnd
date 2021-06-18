import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
//import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, ThemeProvider, Button, Overlay } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import globalStyles from './styles/global';

//import CrearCuenta from './CrearCuenta';
//import CrearServicio from './CrearServicio.js';

import AsyncStorage from '@react-native-async-storage/async-storage';

//Utilidades de Apollo
import {  useMutation, gql } from '@apollo/client';

const AUTENTICAR_USUARIO = gql`
    mutation  autenticarUsuario($input: AutenticarInput){
        autenticarUsuario(input: $input){
            token
        }
    }
`;

// prettier-ignore
const Login = () => {
    //Para manejar los mensajes del Overlay
   const [visible, setVisible] = useState(false);
   const [Mensaje, setMensaje] = useState('');
   const toggleOverlay = () => { setVisible(!visible); };

    //State del formulario
    const [correo, setcorreo] = useState('');
    const [password, setpassword] = useState('');

    //React Navigation
    const navigation = useNavigation();

    //Mutation de Apollo
    const [ autenticarUsuario ] = useMutation(AUTENTICAR_USUARIO);

    //Cuando el usuario presiona en iniciar sesion
    const handleSubmit = async () =>{
        
         //Validar formulario
        if ( correo === '' || password === '' ) {
            //Error
            
            setVisible(true);
            setMensaje('Debes llenar todos los campos');
            //alert('Debes llenar todos los campos');
            return;
        }

        try {
            //Autenticar Usuario
            
            const { data } = await autenticarUsuario({
                variables:{
                    input:{
                        correo,
                        password
                    }
                }
            });

            const { token } = data.autenticarUsuario;
            
            //Guardar el token en storage
            await AsyncStorage.setItem('token',token);

            //Redireccionar a Vista de Usuario
            navigation.navigate("CrearServicio");

        } catch (error) {
            //Si hay error mostrarlo
            setVisible(true);
            setMensaje(error.message.replace('GraphQL eror: ',''));
        }
    }

    return (

        <View style = {[globalStyles.contenedor, { backgroundColor: '#fff'}]}>
            <View style= { globalStyles.contenido}>
                
                <ScrollView>
                    <View style = { globalStyles.fondoEncabezado} >
                        <Text style= {globalStyles.titulo1} >Moto
                            <Text style= {globalStyles.titulo2} >Movil </Text>
                        </Text>
                    </View>

                    <View>
                    <ThemeProvider>
                        <Input
                        placeholder="Correo electrónico"
                        label="Correo electrónico"
                        labelStyle = {{fontSize:10, color:'#333', marginTop:40}}
                        onChangeText = { (text) => setcorreo(text)}
                        /* style={styles.inputIcono} */
                        /* leftIcon={
                            <Icon
                            name='user'
                            size={24}
                            color='gray'
                            />
                        } */
                        />
                    </ThemeProvider>

                    <ThemeProvider>
                        <Input
                        placeholder="Contraseña"
                        label="Contraseña"
                        labelStyle = {{fontSize:10, color:'#333'}}
                        secureTextEntry={true}
                        onChangeText = { (text) => setpassword(text)}
                        /* leftIcon={
                            <Icon
                            name='user'
                            size={24}
                            color='gray'
                            />
                        } */
                        />
                    </ThemeProvider>
                
                    <ThemeProvider>
                        <Button
                            title="Iniciar Sesión"
                            containerStyle={{ marginVertical: 10, alignItems:'center'}} 
                            underlayColor="transparent"
                            buttonStyle = { globalStyles.boton}
                            onPress = { () => handleSubmit() }
                            
                        />
                    </ThemeProvider>

                    <Text style= { globalStyles.enlace} >Recordar contraseña</Text>

                    <Text 
                        style = { globalStyles.enlace}
                        onPress = { () => navigation.navigate("CrearCuenta") }
                    >Registrarse</Text>

                    <Overlay 
                        isVisible={visible} 
                        onBackdropPress={toggleOverlay}
                        overlayStyle = { globalStyles.modal}
                     >
                        <Text style = { globalStyles.tituloModal }>{Mensaje}</Text>
                        <Button 
                           title="Cerrar" 
                           onPress={toggleOverlay}
                           style = {globalStyles.boton}
                           containerStyle={{ marginVertical: 10}}
                        />
                     </Overlay>
                     </View>
                     <View style = { globalStyles.fondoPie} >
                        
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};
export default Login;