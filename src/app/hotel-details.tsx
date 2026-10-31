import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function HotelDetails() {
  const router = useRouter();

  const { name, location, rating, price } =
    useLocalSearchParams<{
      name?: string;
      location?: string;
      rating?: string;
      price?: string;
    }>();

  const hotelName = name || "Nova Grand Hotel";
  const hotelLocation = location || "Goa";
  const hotelRating = rating || "4.8 ⭐";
  const hotelPrice = price || "₹3,500/night";

  const bookHotel = () => {
    Alert.alert(
      "Booking Request 🏨",
      `${hotelName} has been selected for your trip.`
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.backButton}
      >
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.hero}>
        <Text style={styles.heroIcon}>🏨</Text>

        <Text style={styles.heroTitle}>{hotelName}</Text>

        <Text style={styles.heroLocation}>
          📍 {hotelLocation}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          Hotel Overview
        </Text>

        <Text style={styles.description}>
          Enjoy a comfortable and relaxing stay with
          modern rooms, convenient facilities and easy
          access to popular attractions.
        </Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Rating</Text>
          <Text style={styles.infoValue}>
            {hotelRating}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Price</Text>
          <Text style={styles.infoValue}>
            {hotelPrice}
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          Amenities
        </Text>

        <Text style={styles.amenity}>📶 Free Wi-Fi</Text>
        <Text style={styles.amenity}>🍳 Breakfast Available</Text>
        <Text style={styles.amenity}>🏊 Swimming Pool</Text>
        <Text style={styles.amenity}>🚗 Parking</Text>
        <Text style={styles.amenity}>🛎️ 24/7 Reception</Text>
      </View>

      <TouchableOpacity
        style={styles.bookButton}
        onPress={bookHotel}
      >
        <Text style={styles.bookText}>
          Select This Hotel
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.planButton}
        onPress={() =>
          router.push({
            pathname: "/trip-planner",
            params: {
              destination: hotelLocation,
            },
          })
        }
      >
        <Text style={styles.planText}>
          Plan Trip to {hotelLocation}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F8FC",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  backButton: {
    marginTop: 15,
    marginBottom: 20,
  },

  backText: {
    color: "#2563EB",
    fontSize: 16,
    fontWeight: "700",
  },

  hero: {
    backgroundColor: "#2563EB",
    borderRadius: 22,
    padding: 25,
    alignItems: "center",
    marginBottom: 18,
  },

  heroIcon: {
    fontSize: 55,
    marginBottom: 12,
  },

  heroTitle: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "800",
    textAlign: "center",
  },

  heroLocation: {
    color: "#DBEAFE",
    fontSize: 14,
    marginTop: 8,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#172554",
    marginBottom: 12,
  },

  description: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 21,
    marginBottom: 15,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#EEF1F5",
    paddingVertical: 12,
  },

  infoLabel: {
    fontSize: 14,
    color: "#64748B",
  },

  infoValue: {
    fontSize: 14,
    color: "#1E293B",
    fontWeight: "800",
  },

  amenity: {
    fontSize: 14,
    color: "#475569",
    paddingVertical: 8,
  },

  bookButton: {
    backgroundColor: "#2563EB",
    height: 54,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },

  bookText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  planButton: {
    borderWidth: 1,
    borderColor: "#2563EB",
    height: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },

  planText: {
    color: "#2563EB",
    fontSize: 15,
    fontWeight: "800",
  },
});