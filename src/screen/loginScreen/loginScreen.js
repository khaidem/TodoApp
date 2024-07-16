import {
  View,
  StyleSheet,
  Image,
  Text,
  useWindowDimensions,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, { useState} from 'react';
import Logo from '../../../assets/images/logo.png';
import CustomInput from '../../component/CustomInput';

import CustomButton from '../../component/CustomButton';


import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';import { Button } from 'native-base';
function LoginScreen(){
  const {height} = useWindowDimensions();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
 

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify({username,password}));
      
      navigation.navigate('Home');
    } catch (erro) {
      console.log(erro);
    }
  };

  const onSignUpPressed = () => {
    console.log("checkUp",navigation);
    navigation.navigate('Register')
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#e8ecf4'}}>
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <View style={styles.header}>
            <Image
              source={Logo}
              style={[styles.logo, {height: height * 0.3}]}
              resizeMode="contain"
            />

            <Text style={styles.title}>
              Sign in to <Text style={{color: '#075eec'}}>Your Account</Text>
            </Text>

            <Text style={styles.subtitle}>
              Get access to your account and more offer
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>User name</Text>
              <CustomInput
                placeholder="username"
                value={username}
                setvalue={setUsername}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Password</Text>
              <CustomInput
                placeholder="password"
                value={password}
                setvalue={setPassword}
                secureTextEntry={true}
              />
            </View>
            <CustomButton
              text={'SigIn'}
              onPress={() => {
                saveData();
              }}></CustomButton>
          </View>
        </KeyboardAwareScrollView>
       
        <TouchableOpacity onPress={onSignUpPressed } style={{marginTop: 'auto'}}>
          <Text style={styles.formFooter}>
            Don't have an account?{' '}
            <Text style={{textDecorationLine: 'underline'}}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1D2A32',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
  },
  /** Header */
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  headerImg: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    marginBottom: 30,
  },
  /** Form */
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formFooter: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  /** Input */
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
});

export default LoginScreen;
