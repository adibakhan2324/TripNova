import { router } from 'expo-router';
import React from 'react';
import {
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backText}>‹ Back</Text>
        </Pressable>

        <View style={styles.header}>

          <View style={styles.logoCircle}>
            <Text style={styles.logo}>✈</Text>
          </View>

          <Text style={styles.title}>
            Welcome to TripNova
          </Text>

          <Text style={styles.subtitle}>
            Your smart journey starts here
          </Text>

        </View>

        <View style={styles.form}>

          <Text style={styles.label}>
            Email
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#94A3B8"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>
            Password
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#94A3B8"
            secureTextEntry
          />

          <Pressable
            style={styles.loginButton}
            onPress={() => router.push('/home')}
          >
            <Text style={styles.loginButtonText}>
              Login
            </Text>
          </Pressable>

          <Text style={styles.orText}>
            OR
          </Text>

          <Pressable
            style={styles.signupButton}
            onPress={() => router.push('/signup')}
          >
            <Text style={styles.signupButtonText}>
              Create New Account
            </Text>
          </Pressable>

        </View>

        <Text style={styles.footer}>
          Plan smarter. Travel better.
        </Text>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },

  container: {
    flex: 1,
    paddingHorizontal: 28,
  },

  backButton: {
    marginTop: 10,
    paddingVertical: 10,
  },

  backText: {
    fontSize: 17,
    color: '#2563EB',
    fontWeight: '600',
  },

  header: {
    alignItems: 'center',
    marginTop: 25,
  },

  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },

  logo: {
    fontSize: 34,
    color: '#FFFFFF',
  },

  title: {
    fontSize: 27,
    fontWeight: '800',
    color: '#172554',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 15,
    color: '#64748B',
    marginTop: 8,
  },

  form: {
    marginTop: 40,
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },

  input: {
    height: 54,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 20,
    color: '#0F172A',
  },

  loginButton: {
    height: 54,
    backgroundColor: '#2563EB',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },

  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },

  orText: {
    textAlign: 'center',
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '600',
    marginVertical: 18,
  },

  signupButton: {
    height: 54,
    borderWidth: 1.5,
    borderColor: '#2563EB',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  signupButtonText: {
    color: '#2563EB',
    fontSize: 16,
    fontWeight: '700',
  },

  footer: {
    textAlign: 'center',
    color: '#94A3B8',
    fontSize: 13,
    marginTop: 'auto',
    marginBottom: 25,
  },
});