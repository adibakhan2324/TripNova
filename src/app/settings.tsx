import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import BottomNav from "../components/BottomNav";

export default function Settings() {
  const router = useRouter();

  const [notifications, setNotifications] = useState(true);
  const [location, setLocation] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleDarkMode = (value: boolean) => {
    setDarkMode(value);

    Alert.alert(
      value ? "Dark Mode" : "Light Mode",
      value
        ? "Dark Mode is enabled for this prototype."
        : "Light Mode is enabled."
    );
  };

  const handlePrivacy = () => {
    Alert.alert(
      "Privacy",
      "Your TripNova information is kept private in this prototype."
    );
  };

  const handleAbout = () => {
    Alert.alert(
      "About TripNova",
      "TripNova helps you discover destinations, hotels and restaurants and create your travel plans."
    );
  };

  return (
    <View style={styles.screen}>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>

            <Text style={styles.headerTitle}>
              Settings
            </Text>
          </View>

          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => router.push("/home")}
          >
            <Text style={styles.homeIcon}>
              🏠
            </Text>
          </TouchableOpacity>
        </View>

        {/* GENERAL */}
        <Text style={styles.sectionTitle}>
          General
        </Text>

        {/* NOTIFICATIONS */}
        <View style={styles.settingCard}>
          <View style={styles.settingIconBox}>
            <Text style={styles.settingIcon}>
              🔔
            </Text>
          </View>

          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>
              Notifications
            </Text>

            <Text style={styles.settingText}>
              Receive travel updates and reminders
            </Text>
          </View>

          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{
              false: "#CBD5E1",
              true: "#93C5FD",
            }}
            thumbColor={
              notifications ? "#2563EB" : "#F8FAFC"
            }
          />
        </View>

        {/* LOCATION */}
        <View style={styles.settingCard}>
          <View style={styles.settingIconBox}>
            <Text style={styles.settingIcon}>
              📍
            </Text>
          </View>

          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>
              Location Services
            </Text>

            <Text style={styles.settingText}>
              Use location for nearby travel suggestions
            </Text>
          </View>

          <Switch
            value={location}
            onValueChange={setLocation}
            trackColor={{
              false: "#CBD5E1",
              true: "#93C5FD",
            }}
            thumbColor={
              location ? "#2563EB" : "#F8FAFC"
            }
          />
        </View>

        {/* DARK MODE */}
        <View style={styles.settingCard}>
          <View style={styles.settingIconBox}>
            <Text style={styles.settingIcon}>
              🌙
            </Text>
          </View>

          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>
              Dark Mode
            </Text>

            <Text style={styles.settingText}>
              Change the appearance of TripNova
            </Text>
          </View>

          <Switch
            value={darkMode}
            onValueChange={handleDarkMode}
            trackColor={{
              false: "#CBD5E1",
              true: "#93C5FD",
            }}
            thumbColor={
              darkMode ? "#2563EB" : "#F8FAFC"
            }
          />
        </View>

        {/* PRIVACY */}
        <Text style={styles.sectionTitle}>
          Privacy & Security
        </Text>

        <TouchableOpacity
          style={styles.menuCard}
          onPress={handlePrivacy}
          activeOpacity={0.7}
        >
          <View style={styles.settingIconBox}>
            <Text style={styles.settingIcon}>
              🔒
            </Text>
          </View>

          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>
              Privacy
            </Text>

            <Text style={styles.settingText}>
              Manage your privacy information
            </Text>
          </View>

          <Text style={styles.arrow}>
            →
          </Text>
        </TouchableOpacity>

        {/* APP */}
        <Text style={styles.sectionTitle}>
          About
        </Text>

        <TouchableOpacity
          style={styles.menuCard}
          onPress={handleAbout}
          activeOpacity={0.7}
        >
          <View style={styles.settingIconBox}>
            <Text style={styles.settingIcon}>
              ℹ️
            </Text>
          </View>

          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>
              About TripNova
            </Text>

            <Text style={styles.settingText}>
              Learn more about the application
            </Text>
          </View>

          <Text style={styles.arrow}>
            →
          </Text>
        </TouchableOpacity>

        {/* APP VERSION */}
        <View style={styles.versionCard}>
          <Text style={styles.versionIcon}>
            ✈️
          </Text>

          <Text style={styles.versionTitle}>
            TripNova
          </Text>

          <Text style={styles.versionText}>
            Your Travel Companion
          </Text>

          <Text style={styles.versionNumber}>
            Version 1.0.0
          </Text>
        </View>

      </ScrollView>

      {/* BOTTOM NAV */}
      <BottomNav />

    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F6F8FC",
  },

  scroll: {
    flex: 1,
  },

  content: {
    padding: 20,
    paddingBottom: 110,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginTop: 15,
    marginBottom: 25,
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  backButton: {
    width: 42,
    height: 42,

    borderRadius: 21,

    backgroundColor: "#FFFFFF",

    alignItems: "center",
    justifyContent: "center",

    marginRight: 12,

    elevation: 3,
  },

  backIcon: {
    fontSize: 25,
    color: "#172554",
    fontWeight: "700",
  },

  headerTitle: {
    fontSize: 27,
    fontWeight: "800",
    color: "#172554",
  },

  homeButton: {
    width: 44,
    height: 44,

    borderRadius: 22,

    backgroundColor: "#FFFFFF",

    alignItems: "center",
    justifyContent: "center",

    elevation: 3,
  },

  homeIcon: {
    fontSize: 20,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",

    color: "#172554",

    marginBottom: 12,
    marginTop: 5,
  },

  settingCard: {
    backgroundColor: "#FFFFFF",

    borderRadius: 18,

    padding: 15,

    flexDirection: "row",
    alignItems: "center",

    marginBottom: 12,

    elevation: 3,
  },

  menuCard: {
    backgroundColor: "#FFFFFF",

    borderRadius: 18,

    padding: 15,

    flexDirection: "row",
    alignItems: "center",

    marginBottom: 12,

    elevation: 3,
  },

  settingIconBox: {
    width: 53,
    height: 53,

    borderRadius: 15,

    backgroundColor: "#EAF2FF",

    alignItems: "center",
    justifyContent: "center",
  },

  settingIcon: {
    fontSize: 26,
  },

  settingInfo: {
    flex: 1,

    marginLeft: 13,
    marginRight: 8,
  },

  settingTitle: {
    fontSize: 15,

    fontWeight: "800",

    color: "#1E293B",
  },

  settingText: {
    fontSize: 12,

    color: "#64748B",

    lineHeight: 17,

    marginTop: 4,
  },

  arrow: {
    fontSize: 23,

    color: "#2563EB",

    fontWeight: "700",
  },

  versionCard: {
    alignItems: "center",

    marginTop: 20,

    paddingTop: 25,

    borderTopWidth: 1,

    borderTopColor: "#E2E8F0",

    paddingBottom: 20,
  },

  versionIcon: {
    fontSize: 30,
  },

  versionTitle: {
    fontSize: 18,

    fontWeight: "800",

    color: "#172554",

    marginTop: 5,
  },

  versionText: {
    fontSize: 12,

    color: "#64748B",

    marginTop: 3,
  },

  versionNumber: {
    fontSize: 10,

    color: "#94A3B8",

    marginTop: 8,
  },
});