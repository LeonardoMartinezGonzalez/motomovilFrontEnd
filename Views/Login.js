import React from 'react';
import { View, Text, ScrollView } from 'react-native';
//import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, ThemeProvider, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import globalStyles from './styles/global';
import CrearCuenta from './CrearCuenta';

// prettier-ignore
const Login = () => {
    //React Navigation
    const navigation = useNavigation();

    return (

        <View style = {[globalStyles.contenedor, { backgroundColor: '#fff'}]}>
            <View style= { globalStyles.contenido}>
                <ScrollView>
                    <Text style= {globalStyles.titulo} >MotoMovil</Text>
                    
                    <ThemeProvider>
                        <Input
                        placeholder="Número de teléfono celular"
                        label="Número de teléfono celular"
                        labelStyle = {{fontSize:10, color:'#333'}}
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
                            
                        />
                    </ThemeProvider>

                    <Text style= { globalStyles.enlace} >Recordar contraseña</Text>

                    <Text 
                        style = { globalStyles.enlace}
                        onPress = { () => navigation.navigate(CrearCuenta) }
                    >Registrarse</Text>

                </ScrollView>
            </View>
        </View>
    );
};
export default Login;