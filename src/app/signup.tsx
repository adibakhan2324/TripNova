import { router } from 'expo-router';
import React from 'react';
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

export default function SignupScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>

          {/* Back Button */}
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backText}>‹ Back</Text>
          </Pressable>

          {/* Header */}
          <View style={styles.header}>

            <View style={styles.logoCircle}>
              <Text style={styles.logo}>✈</Text>
            </View>

            <Text style={styles.title}>
              Create Your Account
            </Text>

            <Text style={styles.subtitle}>
              Start planning smarter journeys with TripNova
            </Text>

          </View>

          {/* Form */}
          <View style={styles.form}>

            <Text style={styles.label}>
              Full Name
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              placeholderTextColor="#94A3B8"
              autoCapitalize="words"
            />

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
              placeholder="Create a password"
              placeholderTextColor="#94A3B8"
              secureTextEntry
            />

            <Text style={styles.label}>
              Confirm Password
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              placeholderTextColor="#94A3B8"
              secureTextEntry
            />

            {/* Create Account */}
            <Pressable
              style={styles.createButton}
              onPress={() => router.push('/home')}
            >
              <Text style={styles.createButtonText}>
                Create Account
              </Text>
            </Pressable>

            {/* Login Link */}
            <View style={styles.loginRow}>
              <Text style={styles.loginText}>
                Already have an account?
              </Text>

              <Pressable
                onPress={() => router.back()}
              >
                <Text style={styles.loginLink}>
                  Login
                </Text>
              </Pressable>
            </View>

          </View>

          <Text style={styles.footer}>
            Your journey. Your plan. Your Nova.
          </Text>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },

  scrollContainer: {
    flexGrow: 1,
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
    marginTop: 15,
  },

  logoCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },

  logo: {
    fontSize: 32,
    color: '#FFFFFF',
  },

  title: {
    fontSize: 27,
    fontWeight: '800',
    color: '#172554',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 21,
  },

  form: {
    marginTop: 30,
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    fontSize: 15,
    marginBottom: 18,
    color: '#0F172A',
  },

  createButton: {
    height: 54,
    backgroundColor: '#2563EB',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },

  createButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },

  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },

  loginText: {
    fontSize: 14,
    color: '#64748B',
  },

  loginLink: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '700',
    marginLeft: 5,
  },

  footer: {
    textAlign: 'center',
    color: '#94A3B8',
    fontSize: 13,
    marginTop: 25,
    marginBottom: 20,
  },
});