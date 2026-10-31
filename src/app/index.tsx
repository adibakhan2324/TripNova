import { router } from 'expo-router';
import React from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        <View style={styles.logoCircle}>
          <Text style={styles.logo}>✈</Text>
        </View>

        <Text style={styles.title}>TripNova</Text>

        <Text style={styles.subtitle}>
          AI-Powered Smart Travel Planner
        </Text>

        <Text style={styles.description}>
          Plan your trips, discover amazing destinations,
          organize itineraries, check weather and get
          intelligent travel assistance — all in one place.
        </Text>

        <Pressable
          style={styles.button}
          onPress={() => router.push('/login')}
        >
          <Text style={styles.buttonText}>
            Get Started
          </Text>
        </Pressable>

        <Text style={styles.footer}>
          Your journey. Your plan. Your Nova.
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },

  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },

  logo: {
    fontSize: 46,
    color: '#FFFFFF',
  },

  title: {
    fontSize: 38,
    fontWeight: '800',
    color: '#172554',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#2563EB',
    textAlign: 'center',
    marginBottom: 20,
  },

  description: {
    fontSize: 15,
    lineHeight: 24,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 35,
  },

  button: {
    width: '100%',
    backgroundColor: '#2563EB',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },

  footer: {
    marginTop: 25,
    fontSize: 13,
    color: '#94A3B8',
  },
});