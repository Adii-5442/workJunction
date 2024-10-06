import React, {useRef, useState} from 'react';
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
  ScrollView,
} from 'react-native';
import {TextInput, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const {width} = Dimensions.get('window');

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    name: '',
    dob: new Date(),
    address: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [image, setImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const navigation = useNavigation();

  // Refs for each input field
  const scrollViewRef = useRef();
  const nameInputRef = useRef();
  const addressInputRef = useRef();
  const phoneInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const pickImage = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    try {
      const response = await launchImageLibrary(options);
      if (!response.didCancel && !response.error) {
        setImage(response.assets[0].uri);
      }
    } catch (error) {
      console.log('Error picking image:', error);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFormData(prev => ({...prev, dob: selectedDate}));
    }
  };

  const handleCreateAccount = () => {
    console.log('Create account attempted with:', formData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.content}>
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={{paddingBottom: 50}}>
            {/* Header Section */}
            <View style={styles.headerContainer}>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Please fill in your details</Text>
            </View>

            {/* Image Upload Section */}
            <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
              {image ? (
                <Image source={{uri: image}} style={styles.profileImage} />
              ) : (
                <View style={styles.placeholderContainer}>
                  <Icon name="camera" size={30} color="#666666" />
                  <Text style={styles.uploadText}>Add Photo</Text>
                </View>
              )}
            </TouchableOpacity>

            {/* Form Section */}
            <View style={styles.formContainer}>
              <TextInput
                ref={nameInputRef}
                mode="outlined"
                label="Full Name"
                value={formData.name}
                onChangeText={text =>
                  setFormData(prev => ({...prev, name: text}))
                }
                style={styles.input}
                outlineStyle={styles.inputOutline}
                theme={{colors: {primary: '#2563eb', background: '#ffffff'}}}
                onFocus={() =>
                  scrollViewRef.current.scrollTo({y: 0, animated: true})
                }
              />

              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <TextInput
                  mode="outlined"
                  label="Date of Birth"
                  value={formData.dob.toLocaleDateString()}
                  editable={false}
                  style={styles.input}
                  outlineStyle={styles.inputOutline}
                  right={<TextInput.Icon icon="calendar" />}
                  theme={{colors: {primary: '#2563eb', background: '#ffffff'}}}
                />
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={formData.dob}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}

              <TextInput
                ref={addressInputRef}
                mode="outlined"
                label="Address"
                value={formData.address}
                onChangeText={text =>
                  setFormData(prev => ({...prev, address: text}))
                }
                multiline
                numberOfLines={3}
                style={styles.input}
                outlineStyle={styles.inputOutline}
                theme={{colors: {primary: '#2563eb', background: '#ffffff'}}}
                onFocus={() =>
                  scrollViewRef.current.scrollTo({y: 100, animated: true})
                }
              />

              <TextInput
                ref={phoneInputRef}
                mode="outlined"
                label="Phone Number"
                value={formData.phone}
                onChangeText={text =>
                  setFormData(prev => ({...prev, phone: text}))
                }
                keyboardType="phone-pad"
                maxLength={10}
                left={<TextInput.Affix text="+91 " />}
                style={styles.input}
                outlineStyle={styles.inputOutline}
                theme={{colors: {primary: '#2563eb', background: '#ffffff'}}}
                onFocus={() =>
                  scrollViewRef.current.scrollTo({y: 200, animated: true})
                }
              />

              <TextInput
                ref={passwordInputRef}
                mode="outlined"
                label="Password"
                value={formData.password}
                onChangeText={text =>
                  setFormData(prev => ({...prev, password: text}))
                }
                secureTextEntry={!showPassword}
                style={styles.input}
                outlineStyle={styles.inputOutline}
                theme={{colors: {primary: '#2563eb', background: '#ffffff'}}}
                right={
                  <TextInput.Icon
                    icon={showPassword ? 'eye-off' : 'eye'}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
                onFocus={() =>
                  scrollViewRef.current.scrollTo({y: 300, animated: true})
                }
              />

              <TextInput
                ref={confirmPasswordInputRef}
                mode="outlined"
                label="Confirm Password"
                value={formData.confirmPassword}
                onChangeText={text =>
                  setFormData(prev => ({...prev, confirmPassword: text}))
                }
                secureTextEntry={!showConfirmPassword}
                style={styles.input}
                outlineStyle={styles.inputOutline}
                theme={{colors: {primary: '#2563eb', background: '#ffffff'}}}
                right={
                  <TextInput.Icon
                    icon={showConfirmPassword ? 'eye-off' : 'eye'}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                }
                onFocus={() =>
                  scrollViewRef.current.scrollTo({y: 400, animated: true})
                }
              />
            </View>

            {/* Action Buttons */}
            <View style={styles.actionContainer}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={handleCreateAccount}>
                <Text style={styles.buttonText}>Create Account</Text>
                <Icon
                  name="arrow-forward"
                  size={20}
                  color="#ffffff"
                  style={styles.buttonIcon}
                />
              </TouchableOpacity>

              {/* Login Link */}
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginText}>
                  Already have an account? Sign in
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
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
    padding: 14,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
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
  imageContainer: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 24,
    borderRadius: 60,
    overflow: 'hidden',
    backgroundColor: '#f2f2f2',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 60,
  },
  uploadText: {
    color: '#666666',
    fontSize: 14,
    marginTop: 8,
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
  loginText: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 24,
  },
});

export default CreateAccount;
