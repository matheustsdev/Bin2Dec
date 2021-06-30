
import React, { useState, useRef, useEffect } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Clipboard,
  TouchableOpacity,
  Alert,
  Image,
  Dimensions,
  Animated
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import screenImg from './src/assets/screenImg.png'

export default function App() {

  const [focus, isFocused] = useState(false);
  const [filled, isFilled] = useState(false);
  const [bin, setBin] = useState<number>(0);
  let dec = bin.toString()

  //Animação de entrada
  const fadeAnim = useRef(new Animated.Value(0)).current
  const imageAnim = useRef(new Animated.Value(350)).current

  useEffect(() => {
    Animated.timing(fadeAnim, {
      useNativeDriver: true,
      toValue: 1,
      duration: 3500
    }).start();
  }, [])

  useEffect(() => {
    Animated.timing(imageAnim, {
      useNativeDriver: true,
      toValue: 50,
      duration: 1500
    }).start();
  }, [])

  useEffect(() => {
    if (isNaN(bin)) {
      setBin(0)
    }
  }

  ), [bin]


  //Converter para binário e para número
  function converterBin(value: string) {
    if (value.match("2") || value.match("3") ||
      value.match("4") || value.match("5") ||
      value.match("6") || value.match("7") ||
      value.match("8") || value.match("9")) {
      Alert.alert("Error", "This is not a binary number")

    } else {

      isFilled(!!value);
      setBin(parseInt(value, 2))
    }
  }

  //Copiar número na base 10 e confirmar cópia
  function copy() {
    Clipboard.setString(bin.toString())
    Alert.alert(
      "",
      "Copyed",
      [],
      {
        cancelable: true
      }
    )
  }



  return (

    <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
      <KeyboardAvoidingView >
        <View style={styles.content}>
          <Animated.View style={[styles.image, { transform: [{ translateY: imageAnim }] }]}>
            <Image
              source={screenImg}
              style={styles.image}
            />
          </Animated.View>
          <Animated.View style={[styles.header, { opacity: fadeAnim }]} >



            <Text style={styles.titleheader}>
              Turn a Binary code to binimal base number
            </Text>
          </Animated.View>



          {/* Entrada do número binário */}
          <Animated.View style={{ opacity: fadeAnim }} >
            <Text style={styles.description}>
              Insert your binary number
          </Text>
            <View style={styles.row}>
              <TextInput
                style={[styles.input, (focus || filled) && { borderColor: "#61F919" }]}
                placeholder="Insert only 0 or 1"
                keyboardType="number-pad"
                maxLength={8}
                onChangeText={converterBin}
                onFocus={() => isFocused(true)}
                onBlur={() => isFocused(false)}
              />

            </View>
            <Text style={styles.description}>
              Number in decimal base
          </Text>

            {/* Saída do número já convertido */}
            <View style={styles.row}>

              <Text style={styles.outtext}>
                {bin.toString()}

              </Text>

              {/* Botão para copiar mais rapidamente */}
              <TouchableOpacity style={styles.button} onPress={copy}>
                <MaterialCommunityIcons name="clipboard-multiple-outline" size={24} color="green" />
              </TouchableOpacity>

            </View>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}


const styles = StyleSheet.create({
  content: {
    alignItems: 'center'
  },
  header: {
    marginTop: 50
  },
  titleheader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 100,
    textAlign: 'center',
    margin: 10,
    color: "#08085E"
  },
  description: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: "#08085E"
  },
  image: {
    width: Dimensions.get('window').width * 0.3,
    height: 140,
    alignSelf: 'center',


  },
  input: {
    alignSelf: 'center',
    borderBottomWidth: 1.5,
    borderColor: "gray",
    textAlign: 'center',
    width: 150,
    fontSize: 18,
    marginBottom: 50
  },
  row: {
    alignItems: "center",
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
  },
  outtext: {
    alignItems: "center",
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 24,
  },
  button: {
    marginLeft: 10,
  },

});
