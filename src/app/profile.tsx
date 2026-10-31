import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import BottomNav from "../components/BottomNav";

export default function Profile() {
  const router = useRouter();

  const [name, setName] = useState("Adiba Khan");
  const [email, setEmail] = useState("adiba@example.com");

  const [editMode, setEditMode] = useState(false);

  const [tempName, setTempName] = useState(name);
  const [tempEmail, setTempEmail] = useState(email);

  // =========================
  // SAVE PROFILE
  // =========================
  const saveProfile = () => {
    if (tempName.trim() === "") {
      Alert.alert("Error", "Please enter your name.");
      return;
    }

    if (tempEmail.trim() === "") {
      Alert.alert("Error", "Please enter your email.");
      return;
    }

    setName(tempName.trim());
    setEmail(tempEmail.trim());
    setEditMode(false);

    Alert.alert(
      "Profile Updated",
      "Your profile has been updated successfully."
    );
  };

  // =========================
  // CANCEL EDIT
  // =========================
  const cancelEdit = () => {
    setTempName(name);
    setTempEmail(email);
    setEditMode(false);
  };

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            router.replace("/login");
          },
        },
      ]
    );
  };

  return (
    <View style={styles.screen}>

      {/* =========================
          MAIN CONTENT
         ========================= */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {/* =========================
            HEADER
           ========================= */}
        <View style={styles.header}>

          <Text style={styles.headerTitle}>
            Profile
          </Text>

          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => router.push("/home")}
            activeOpacity={0.7}
          >
            <Text style={styles.headerButtonText}>
              🏠
            </Text>
          </TouchableOpacity>

        </View>

        {/* =========================
            PROFILE CARD
           ========================= */}
        <View style={styles.profileCard}>

          {/* AVATAR */}
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              👤
            </Text>
          </View>

          {/* NORMAL PROFILE */}
          {!editMode ? (
            <>
              <Text style={styles.name}>
                {name}
              </Text>

              <Text style={styles.email}>
                {email}
              </Text>

              <TouchableOpacity
                style={styles.editButton}
                onPress={() => {
                  setTempName(name);
                  setTempEmail(email);
                  setEditMode(true);
                }}
                activeOpacity={0.8}
              >
                <Text style={styles.editButtonText}>
                  ✏️ Edit Profile
                </Text>
              </TouchableOpacity>
            </>
          ) : (

            /* EDIT PROFILE */
            <View style={styles.editContainer}>

              {/* NAME */}
              <Text style={styles.inputLabel}>
                Name
              </Text>

              <TextInput
                style={styles.input}
                value={tempName}
                onChangeText={setTempName}
                placeholder="Enter your name"
                placeholderTextColor="#94A3B8"
              />

              {/* EMAIL */}
              <Text style={styles.inputLabel}>
                Email
              </Text>

              <TextInput
                style={styles.input}
                value={tempEmail}
                onChangeText={setTempEmail}
                placeholder="Enter your email"
                placeholderTextColor="#94A3B8"
                keyboardType="email-address"
                autoCapitalize="none"
              />

              {/* SAVE / CANCEL */}
              <View style={styles.editActions}>

                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={cancelEdit}
                  activeOpacity={0.8}
                >
                  <Text style={styles.cancelText}>
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={saveProfile}
                  activeOpacity={0.8}
                >
                  <Text style={styles.saveText}>
                    💾 Save
                  </Text>
                </TouchableOpacity>

              </View>

            </View>
          )}

        </View>

        {/* =========================
            ACCOUNT
           ========================= */}
        <Text style={styles.sectionTitle}>
          Account
        </Text>

        {/* MY TRIPS */}
        <TouchableOpacity
          style={styles.menuCard}
          onPress={() => router.push("/my-trips")}
          activeOpacity={0.7}
        >

          <View style={styles.menuIconBox}>
            <Text style={styles.menuIcon}>
              🗺️
            </Text>
          </View>

          <View style={styles.menuInfo}>

            <Text style={styles.menuTitle}>
              My Trips
            </Text>

            <Text style={styles.menuText}>
              View your planned trips
            </Text>

          </View>

          <Text style={styles.arrow}>
            →
          </Text>

        </TouchableOpacity>

        {/* FAVORITES */}
        <TouchableOpacity
          style={styles.menuCard}
          onPress={() => router.push("/favorites")}
          activeOpacity={0.7}
        >

          <View style={styles.menuIconBox}>
            <Text style={styles.menuIcon}>
              ❤️
            </Text>
          </View>

          <View style={styles.menuInfo}>

            <Text style={styles.menuTitle}>
              Favorites
            </Text>

            <Text style={styles.menuText}>
              View your saved places
            </Text>

          </View>

          <Text style={styles.arrow}>
            →
          </Text>

        </TouchableOpacity>

        {/* =========================
            PREFERENCES
           ========================= */}
        <Text style={styles.sectionTitle}>
          Preferences
        </Text>

        {/* SETTINGS */}
        <TouchableOpacity
          style={styles.menuCard}
          onPress={() => router.push("/settings")}
          activeOpacity={0.7}
        >

          <View style={styles.menuIconBox}>
            <Text style={styles.menuIcon}>
              ⚙️
            </Text>
          </View>

          <View style={styles.menuInfo}>

            <Text style={styles.menuTitle}>
              Settings
            </Text>

            <Text style={styles.menuText}>
              Manage your app preferences
            </Text>

          </View>

          <Text style={styles.arrow}>
            →
          </Text>

        </TouchableOpacity>

        {/* NOTIFICATIONS */}
        <TouchableOpacity
          style={styles.menuCard}
          onPress={() => router.push("/notifications")}
          activeOpacity={0.7}
        >

          <View style={styles.menuIconBox}>
            <Text style={styles.menuIcon}>
              🔔
            </Text>
          </View>

          <View style={styles.menuInfo}>

            <Text style={styles.menuTitle}>
              Notifications
            </Text>

            <Text style={styles.menuText}>
              Manage travel notifications
            </Text>

          </View>

          <Text style={styles.arrow}>
            →
          </Text>

        </TouchableOpacity>

        {/* =========================
            MORE
           ========================= */}
        <Text style={styles.sectionTitle}>
          More
        </Text>

        {/* ABOUT */}
        <TouchableOpacity
          style={styles.menuCard}
          onPress={() =>
            Alert.alert(
              "About TripNova",
              "TripNova is your travel companion for discovering destinations, hotels, restaurants and planning trips."
            )
          }
          activeOpacity={0.7}
        >

          <View style={styles.menuIconBox}>
            <Text style={styles.menuIcon}>
              ℹ️
            </Text>
          </View>

          <View style={styles.menuInfo}>

            <Text style={styles.menuTitle}>
              About TripNova
            </Text>

            <Text style={styles.menuText}>
              Learn more about TripNova
            </Text>

          </View>

          <Text style={styles.arrow}>
            →
          </Text>

        </TouchableOpacity>

        {/* =========================
            LOGOUT
           ========================= */}
        <TouchableOpacity
          style={styles.logoutCard}
          onPress={handleLogout}
          activeOpacity={0.7}
        >

          <Text style={styles.logoutIcon}>
            🚪
          </Text>

          <Text style={styles.logoutText}>
            Logout
          </Text>

        </TouchableOpacity>

        {/* =========================
            FOOTER
           ========================= */}
        <View style={styles.footer}>

          <Text style={styles.footerIcon}>
            ✈️
          </Text>

          <Text style={styles.footerTitle}>
            TripNova
          </Text>

          <Text style={styles.footerSubtitle}>
            Your Travel Companion
          </Text>

          <Text style={styles.version}>
            Version 1.0.0
          </Text>

        </View>

      </ScrollView>

      {/* =========================
          BOTTOM NAVIGATION
         ========================= */}
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
    paddingBottom: 120,
  },

  /* HEADER */

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 20,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#172554",
  },

  headerButton: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },

  headerButtonText: {
    fontSize: 20,
  },

  /* PROFILE */

  profileCard: {
    backgroundColor: "#2563EB",
    borderRadius: 24,
    alignItems: "center",
    padding: 25,
    marginBottom: 25,
  },

  avatar: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  avatarText: {
    fontSize: 42,
  },

  name: {
    fontSize: 23,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  email: {
    fontSize: 13,
    color: "#DBEAFE",
    marginTop: 5,
  },

  /* EDIT */

  editButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 22,
    paddingVertical: 11,
    marginTop: 17,
  },

  editButtonText: {
    color: "#2563EB",
    fontSize: 13,
    fontWeight: "800",
  },

  editContainer: {
    width: "100%",
  },

  inputLabel: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 6,
    marginTop: 5,
  },

  input: {
    width: "100%",
    height: 48,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 14,
    color: "#1E293B",
    marginBottom: 12,
  },

  editActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },

  cancelButton: {
    flex: 1,
    height: 45,
    backgroundColor: "#DBEAFE",
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },

  cancelText: {
    color: "#1E40AF",
    fontSize: 13,
    fontWeight: "800",
  },

  saveButton: {
    flex: 1,
    height: 45,
    backgroundColor: "#FFFFFF",
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
  },

  saveText: {
    color: "#2563EB",
    fontSize: 13,
    fontWeight: "800",
  },

  /* SECTIONS */

  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#172554",
    marginBottom: 12,
    marginTop: 3,
  },

  /* MENU */

  menuCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    elevation: 3,
  },

  menuIconBox: {
    width: 55,
    height: 55,
    borderRadius: 15,
    backgroundColor: "#EAF2FF",
    alignItems: "center",
    justifyContent: "center",
  },

  menuIcon: {
    fontSize: 27,
  },

  menuInfo: {
    flex: 1,
    marginLeft: 13,
  },

  menuTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1E293B",
  },

  menuText: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 4,
  },

  arrow: {
    fontSize: 23,
    color: "#2563EB",
    fontWeight: "700",
  },

  /* LOGOUT */

  logoutCard: {
    height: 55,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#FECACA",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 25,
  },

  logoutIcon: {
    fontSize: 20,
    marginRight: 8,
  },

  logoutText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#DC2626",
  },

  /* FOOTER */

  footer: {
    alignItems: "center",
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    paddingBottom: 15,
  },

  footerIcon: {
    fontSize: 28,
  },

  footerTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#172554",
    marginTop: 5,
  },

  footerSubtitle: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 3,
  },

  version: {
    fontSize: 10,
    color: "#CBD5E1",
    marginTop: 8,
  },

});