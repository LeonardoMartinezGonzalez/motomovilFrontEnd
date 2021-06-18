import React, { useState } from 'react';
import { View, Text, StyleSheet,  Modal } from 'react-native';
//import { Button } from 'react-native-elements';
//import globalStyles from '../Views/styles/global';

// prettier-ignore
export default ({ children, visibility }) => { 
    //const [visibility, setVisibility] = useState(visibility);
    return (
      <Modal
        animationType = "slide"
        transparent={true}
        visible= {visibility}
        
      >
        <View style = { styles.center }>
            <View style = { styles.modalView }>
              
              {children}

              {/* <Button
                  title="Cerrar"
                  containerStyle={{ marginVertical: 10, alignItems:'center'}} 
                  underlayColor="transparent"
                  buttonStyle = { globalStyles.boton}
                  onPress={ () => setVisibility(false)}

              /> */}
            </View>
        </View>
      </Modal>     
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView:{
    opacity: 0.8,
    borderRadius: 5,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { 
      width: 0,
      height: 3,
    },
    backgroundColor: '#9E9E9E'
  },
});