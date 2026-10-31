import { usePathname, useRouter } from "expo-router";
import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.navBar}>

      {/* HOME */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => router.push("/home")}
        activeOpacity={0.7}
      >
        <Text style={styles.icon}>🏠</Text>

        <Text
          style={[
            styles.label,
            pathname === "/home" && styles.activeLabel,
          ]}
        >
          Home
        </Text>
      </TouchableOpacity>

      {/* MY TRIPS */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => router.push("/my-trips")}
        activeOpacity={0.7}
      >
        <Text style={styles.icon}>🗺️</Text>

        <Text
          style={[
            styles.label,
            pathname === "/my-trips" && styles.activeLabel,
          ]}
        >
          My Trips
        </Text>
      </TouchableOpacity>

      {/* FAVORITES */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => router.push("/favorites")}
        activeOpacity={0.7}
      >
        <Text style={styles.icon}>❤️</Text>

        <Text
          style={[
            styles.label,
            pathname === "/favorites" && styles.activeLabel,
          ]}
        >
          Favorites
        </Text>
      </TouchableOpacity>

      {/* PROFILE */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => router.push("/profile")}
        activeOpacity={0.7}
      >
        <Text style={styles.icon}>👤</Text>

        <Text
          style={[
            styles.label,
            pathname === "/profile" && styles.activeLabel,
          ]}
        >
          Profile
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    height: 75,
    width: "100%",

    backgroundColor: "#FFFFFF",

    borderTopWidth: 1,
    borderTopColor: "#D9E1EC",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",

    paddingHorizontal: 5,

    elevation: 10,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  navItem: {
    flex: 1,
    height: 75,

    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    fontSize: 23,
    marginBottom: 4,
  },

  label: {
    fontSize: 11,
    fontWeight: "600",
    color: "#64748B",
  },

  activeLabel: {
    color: "#2563EB",
    fontWeight: "800",
  },
});