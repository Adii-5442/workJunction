import { View, Text, TouchableOpacity, StyleSheet, Animated, SafeAreaView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';

const PrimaryButton = ({ onPress, text, isPrimary = true }) => (
  <TouchableOpacity 
    style={[
      styles.buttonContainer, 
      isPrimary ? styles.primaryButton : styles.secondaryButton
    ]} 
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Text style={[
      styles.buttonText,
      isPrimary ? styles.primaryButtonText : styles.secondaryButtonText
    ]}>
      {text}
    </Text>
  </TouchableOpacity>
);

const LandingScreen = () => {
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(20);
  const [primaryButton, setprimaryButton] = useState<string>('owner')
  

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);
  const handleOwnerNavigation = () => {
    setprimaryButton("owner")
    //navigation.navigate('OwnerDashboard');
  };

  const handleLabourNavigation = () => {
    setprimaryButton("labour")
    //navigation.navigate('LabourDashboard');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[
        styles.contentContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }
      ]}>
        <View style={styles.logoContainer}>
        <Image
          source={require('../assets/labour.png')} // Replace with your image path
          style={styles.logo}
          resizeMode="contain"
          />
        </View>

        <View style={styles.headerContainer}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>Please select your account type</Text>
        </View>
        
        <View style={styles.buttonGroup}>
          <PrimaryButton 
            text="Sign in as Owner"
            onPress={handleOwnerNavigation}
            isPrimary={primaryButton === 'owner'}
          />
          <PrimaryButton 
            text="Sign in as Labour"
            onPress={handleLabourNavigation}
            isPrimary={primaryButton === 'labour'}
          />
        </View>

        <Text style={styles.footer}>
          By continuing, you agree to our Terms of Service
        </Text>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  logoContainer: {
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'blue',
    backgroundColor: '#f2f2f2',
    // Add your logo here
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
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 17,
    color: '#666666',
    textAlign: 'center',
  },
  buttonGroup: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  primaryButton: {
    backgroundColor: '#2563eb',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  secondaryButton: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  primaryButtonText: {
    color: '#ffffff',
  },
  secondaryButtonText: {
    color: '#475569',
  },
  footer: {
    marginTop: 32,
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
  },
});

export default LandingScreen;