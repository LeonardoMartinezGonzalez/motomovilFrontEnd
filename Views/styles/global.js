import { StyleSheet } from 'react-native';

// prettier-ignore
const globalStyles = StyleSheet.create({
    contenedor:{
        flex:1,
    },
    contenido:{
        flexDirection: 'column',
        justifyContent: 'center',
        marginHorizontal: '5%',
        flex:1
    },
    titulo:{
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000'
    },
    tituloModal :{
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000'
    },
    input:{

    },
    boton:{
        /* marginTop: 5, */
        width: '60%'
    },
    botonTexto:{
        fontWeight: 'bold'
    },
    enlace:{
        color: 'blue',
        marginTop: 50,
        textAlign: 'right',
        fontWeight: 'bold',
        fontSize: 18,
        /* textTransform: 'uppercase' */

    },
    modal:{
        flex: 0.5,
        justifyContent: 'space-evenly',
        backgroundColor: '#fff',
        borderRadius: 4,
        padding: 20,
        width: '80%',
        shadowColor: '#000',
        shadowOffset: { 
          width: 5,
          height: 5,
        }
    }
});

export default globalStyles;

