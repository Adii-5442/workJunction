import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Image,
  Dimensions,
} from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const LoginScreen = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const handleLogin = () => {
    // Add your login logic here
    console.log('Login attempted with:', { phone, password });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.content}
        >
          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/labour.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* Header Section */}
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Welcome</Text>
            <Text style={styles.subtitle}>Please sign in to continue</Text>
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            <TextInput
              mode="outlined"
              label="Phone Number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              maxLength={10}
              left={<TextInput.Affix text="+91 " />}
              style={styles.input}
              outlineStyle={styles.inputOutline}
              theme={{
                colors: {
                  primary: '#2563eb',
                  background: '#ffffff',
                }
              }}
            />

            <TextInput
              mode="outlined"
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              style={styles.input}
              outlineStyle={styles.inputOutline}
              theme={{
                colors: {
                  primary: '#2563eb',
                  background: '#ffffff',
                }
              }}
              right={
                <TextInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(!showPassword)}
                  color="#666666"
                />
              }
            />
          </View>

          {/* Action Buttons */}
          <View style={styles.actionContainer}>
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={handleLogin}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Sign In</Text>
              <Icon name="arrow-forward" size={20} color="#ffffff" style={styles.buttonIcon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Create Account Link */}
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.createAccountText}>Don't have an account? Create an account</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  logoContainer: {
    width: 80,
    height: 80,
    marginTop: 40,
    marginBottom: 40,
    alignSelf: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 17,
    color: '#666666',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#ffffff',
    marginBottom: 16,
  },
  inputOutline: {
    borderRadius: 12,
    borderWidth: 1,
  },
  actionContainer: {
    alignItems: 'center',
  },
  primaryButton: {
    flexDirection: 'row',
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  buttonIcon: {
    marginLeft: 4,
  },
  forgotPassword: {
    marginTop: 16,
    padding: 8,
  },
  forgotPasswordText: {
    color: '#666666',
    fontSize: 14,
    fontWeight: '500',
  },
  createAccountText: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 24,
  },
});

export default LoginScreen;