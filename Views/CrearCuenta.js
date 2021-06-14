import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
//import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, ThemeProvider, Button, Overlay } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import globalStyles from './styles/global';

//Utilidades de Apollo
import {  useMutation, gql } from '@apollo/client';

const NUEVA_CUENTA = gql`
   mutation crearUsuario($input: UsuarioInput) {
      crearUsuario(input:$input)
}
`;

// prettier-ignore
const CrearCuenta =  () => {
   //Para manejar los mensajes del Overlay
   const [visible, setVisible] = useState(false);
   const [Mensaje, setMensaje] = useState('');
   const toggleOverlay = () => { setVisible(!visible); };
   
   //State del formulario
   const [nombre, setNombre] = useState('');
   const [apellidos, setApellidos] = useState('');
   const [numeroTelefono, setnumeroTelefono] = useState('');
   const [correo, setcorreo] = useState('');
   const [password, setpassword] = useState('');

    //React Navigation
    const navigation = useNavigation();

    //Mutation de Apollo
    const [ crearUsuario ] = useMutation(NUEVA_CUENTA);

    // Cuando el usuario presiona el boton de crear Usuario
    const handleSubmit = async () =>{
       //Validar formulario
   if (nombre === ''  || apellidos === '' || numeroTelefono === '' || correo === '' || password === '') {
         //Error
         
         setVisible(true);
         setMensaje('Debes llenar todos los campos');
         //alert('Debes llenar todos los campos');
         return;
      }

       //Password de almenos 6 caracteres
      if (password.length < 6){
         setVisible(true);
        // setMensaje('Debes llenar todos los campos');
         setMensaje('La clave debe ser al menos de 6 caracteres');
         return;
      }


       //Guardar el usuario
       try {
          const { data } = await crearUsuario({
             variables:{
                input:{
                   nombre,
                   apellidos,
                   numeroTelefono,
                   correo,
                   password
                }
             }
          });

          setVisible(true);
          setMensaje(data.crearUsuario);

          navigation.navigate('Login');

       } catch (error) {
          setVisible(true);
          setMensaje(error.message.replace('GraphQL error: ', ''));
       }
    }

    return (

        <View style = {[globalStyles.contenedor, { backgroundColor: '#fff'}]}>
            <View style= { globalStyles.contenido}>
                <ScrollView>
                  <Text style = { globalStyles.titulo } >Registro de Usuarios</Text>
                     <ThemeProvider>
                        <Input
                           placeholder="Nombre(s)"
                           label="Nombre(s)"
                           labelStyle = {{fontSize:10, color:'#333'}}
                           underlineColorAndroid="#fff"
                           onChangeText = { texto => setNombre(texto)}
                        />
                     </ThemeProvider>
                        {/* <Text style = { styles.tituloInput } >Nombre(s)</Text> */}

                     <ThemeProvider>
                        <Input
                           placeholder="Apellidos"
                           label="Apellidos"
                           labelStyle = {{fontSize:10, color:'#333'}}
                           onChangeText = { texto => setApellidos(texto)}
                        />
                     </ThemeProvider>
                        {/* <Text style = { styles.tituloInput } >Apellidos</Text> */}

                     <ThemeProvider>
                        <Input
                           placeholder="Número de teléfono celular"
                           label="Número de teléfono celular"
                           labelStyle = {{fontSize:10, color:'#333'}}
                           onChangeText = { texto => setnumeroTelefono(texto)}
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
                        {/* <Text style = { styles.tituloInput } >Número de teléfono celular</Text> */}

                     <ThemeProvider>
                        <Input
                           placeholder="Correo electrónico"
                           label="Correo electrónico"
                           labelStyle = {{fontSize:10, color:'#333'}}
                           /* style={styles.inputIcono} */
                           onChangeText = { texto => setcorreo(texto)}
                          /*  leftIcon={
                              <Icon
                              name='user'
                              size={24}
                              color='gray'
                              />
                           } */
                        />
                     </ThemeProvider>
                        {/* <Text style = { styles.tituloInput } >Correo electrónico</Text> */}

                     <ThemeProvider>
                        <Input
                           placeholder="Clave"
                           label="Clave"
                           labelStyle = {{fontSize:10, color:'#333'}}
                           /* style={styles.inputIcono} */
                           secureTextEntry={true}
                           onChangeText = { texto => setpassword(texto)}
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
                            onPress={ () => handleSubmit()}

                        />
                    </ThemeProvider>

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

                </ScrollView>
            </View>
        </View>
    );
}

//bandera = {isModalOpened}
//handleClose = { () => setIsModalOpened(false)}
//mensaje = 'Mensaje para la ventana modal'
export default CrearCuenta;