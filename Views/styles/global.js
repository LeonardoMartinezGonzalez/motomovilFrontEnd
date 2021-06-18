import { StyleSheet } from 'react-native';

// prettier-ignore
const globalStyles = StyleSheet.create({
    contenedor:{
        flex:1,
    },
    contenido:{
        flexDirection: 'column',
        justifyContent: 'center',
        flex:1,
        /* height: '90%', */
    },
    titulo:{
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000'
    },
    titulo1:{
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff'
    },
    titulo2:{
        fontSize: 32,
        fontWeight: 'bold',
        color: '#3C4EEF'
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
        marginRight:10,
        /* textTransform: 'uppercase' */

    },
    fondoEncabezado:{
        flex:1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        height: 60,
        width:'100%',
        backgroundColor: '#E4941B'
    },
    fondoPie:{
        flex:1,
        height: 60,
        backgroundColor: '#9E9E9E',
        marginTop:70,
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

