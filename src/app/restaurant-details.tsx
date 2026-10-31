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

export default function RestaurantDetails() {
  const router = useRouter();

  const { name, location, cuisine, rating } =
    useLocalSearchParams<{
      name?: string;
      location?: string;
      cuisine?: string;
      rating?: string;
    }>();

  const restaurantName =
    name || "Beachside Kitchen";

  const restaurantLocation =
    location || "Goa";

  const restaurantCuisine =
    cuisine || "Indian & Seafood";

  const restaurantRating =
    rating || "4.8 ⭐";

  const reserveTable = () => {
    Alert.alert(
      "Table Request 🍽️",
      `You selected ${restaurantName}.`
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
        <Text style={styles.heroIcon}>🍽️</Text>

        <Text style={styles.heroTitle}>
          {restaurantName}
        </Text>

        <Text style={styles.heroLocation}>
          📍 {restaurantLocation}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          Restaurant Overview
        </Text>

        <Text style={styles.description}>
          Enjoy delicious local cuisine in a welcoming
          atmosphere. Discover popular dishes and
          authentic flavors during your journey.
        </Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>
            Cuisine
          </Text>

          <Text style={styles.infoValue}>
            {restaurantCuisine}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>
            Rating
          </Text>

          <Text style={styles.infoValue}>
            {restaurantRating}
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          Popular Choices
        </Text>

        <Text style={styles.food}>🍛 Local Special</Text>
        <Text style={styles.food}>🥗 Fresh Salad</Text>
        <Text style={styles.food}>🍲 Traditional Meal</Text>
        <Text style={styles.food}>🍰 Dessert</Text>
        <Text style={styles.food}>☕ Coffee & Beverages</Text>
      </View>

      <TouchableOpacity
        style={styles.reserveButton}
        onPress={reserveTable}
      >
        <Text style={styles.reserveText}>
          Reserve a Table
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.planButton}
        onPress={() =>
          router.push({
            pathname: "/trip-planner",
            params: {
              destination: restaurantLocation,
            },
          })
        }
      >
        <Text style={styles.planText}>
          Plan Trip to {restaurantLocation}
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
    maxWidth: "60%",
    textAlign: "right",
  },

  food: {
    fontSize: 14,
    color: "#475569",
    paddingVertical: 8,
  },

  reserveButton: {
    backgroundColor: "#2563EB",
    height: 54,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },

  reserveText: {
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