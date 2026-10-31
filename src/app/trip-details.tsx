import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { removeTrip } from "../utils/trips";

export default function TripDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [deleting, setDeleting] = useState(false);

  const tripId =
    typeof params.id === "string"
      ? params.id
      : "";

  const destination =
    typeof params.destination === "string"
      ? params.destination
      : "Your Destination";

  const startDate =
    typeof params.startDate === "string"
      ? params.startDate
      : "Not specified";

  const endDate =
    typeof params.endDate === "string"
      ? params.endDate
      : "Not specified";

  const travelers =
    typeof params.travelers === "string"
      ? params.travelers
      : "2";

  const budget =
    typeof params.budget === "string"
      ? params.budget
      : "Not specified";

  const getDestinationInfo = () => {
    const key = destination.toLowerCase();

    if (key.includes("goa")) {
      return {
        icon: "🏝️",
        description:
          "Relax on beautiful beaches, enjoy local food and experience Goa's vibrant atmosphere.",
        places: [
          "Baga Beach",
          "Calangute Beach",
          "Fort Aguada",
          "Basilica of Bom Jesus",
        ],
        hotel: "Nova Grand Hotel",
        restaurant: "Beachside Kitchen",
      };
    }

    if (key.includes("manali")) {
      return {
        icon: "🏔️",
        description:
          "Enjoy scenic mountains, peaceful valleys and exciting Himalayan adventures.",
        places: [
          "Solang Valley",
          "Hadimba Temple",
          "Mall Road",
          "Rohtang Pass",
        ],
        hotel: "Mountain View Resort",
        restaurant: "Mountain Cafe",
      };
    }

    if (key.includes("jaipur")) {
      return {
        icon: "🏰",
        description:
          "Explore royal palaces, historic forts and the colorful culture of Rajasthan.",
        places: [
          "Amber Fort",
          "City Palace",
          "Hawa Mahal",
          "Jantar Mantar",
        ],
        hotel: "Royal Palace Hotel",
        restaurant: "Royal Rajasthani",
      };
    }

    if (key.includes("kerala")) {
      return {
        icon: "🌴",
        description:
          "Experience peaceful backwaters, lush greenery, beaches and delicious South Indian food.",
        places: [
          "Alleppey Backwaters",
          "Munnar",
          "Kovalam Beach",
          "Mattancherry Palace",
        ],
        hotel: "Palm Paradise",
        restaurant: "Kerala Spice",
      };
    }

    if (key.includes("paris")) {
      return {
        icon: "🗼",
        description:
          "Discover iconic landmarks, beautiful streets, art, culture and French cuisine.",
        places: [
          "Eiffel Tower",
          "Louvre Museum",
          "Arc de Triomphe",
          "Notre-Dame",
        ],
        hotel: "Paris Central Hotel",
        restaurant: "Le Paris Cafe",
      };
    }

    if (key.includes("dubai")) {
      return {
        icon: "🏙️",
        description:
          "Enjoy luxury shopping, modern architecture, exciting attractions and desert adventures.",
        places: [
          "Burj Khalifa",
          "Dubai Mall",
          "Palm Jumeirah",
          "Dubai Marina",
        ],
        hotel: "Dubai Grand Hotel",
        restaurant: "Arabian Spice",
      };
    }

    return {
      icon: "🌍",
      description:
        "Explore the best attractions, local food and experiences at your destination.",
      places: [
        "Main City Attraction",
        "Local Market",
        "Historic Landmark",
        "Popular Viewpoint",
      ],
      hotel: "TripNova Recommended Hotel",
      restaurant: "TripNova Recommended Restaurant",
    };
  };

  const info = getDestinationInfo();

  const handleDelete = () => {
    if (!tripId) {
      Alert.alert(
        "Cannot Delete",
        "This trip does not have a saved ID."
      );
      return;
    }

    Alert.alert(
      "Delete Trip?",
      `Are you sure you want to delete your trip to ${destination}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            if (deleting) return;

            setDeleting(true);

            try {
              await removeTrip(tripId);

              Alert.alert(
                "Trip Deleted",
                "Your trip has been removed successfully.",
                [
                  {
                    text: "OK",
                    onPress: () =>
                      router.replace("/my-trips"),
                  },
                ]
              );
            } catch (error) {
              console.log(
                "Delete trip error:",
                error
              );

              setDeleting(false);

              Alert.alert(
                "Error",
                "Could not delete the trip."
              );
            }
          },
        },
      ]
    );
  };

  const handleEdit = () => {
    router.push({
      pathname: "/trip-planner",
      params: {
        id: tripId,
        destination,
        startDate,
        endDate,
        travelers,
        budget,
      },
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* BACK */}
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.backButton}
      >
        <Text style={styles.backText}>
          ← Back
        </Text>
      </TouchableOpacity>

      {/* HERO */}
      <View style={styles.hero}>
        <Text style={styles.heroIcon}>
          {info.icon}
        </Text>

        <Text style={styles.heroTitle}>
          {destination}
        </Text>

        <Text style={styles.heroSubtitle}>
          Your TripNova travel plan
        </Text>
      </View>

      {/* SUMMARY */}
      <Text style={styles.sectionTitle}>
        Trip Summary
      </Text>

      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryIcon}>
            📅
          </Text>

          <View style={styles.summaryContent}>
            <Text style={styles.summaryLabel}>
              Travel Dates
            </Text>

            <Text style={styles.summaryValue}>
              {startDate} → {endDate}
            </Text>
          </View>
        </View>

        <View style={styles.summaryItem}>
          <Text style={styles.summaryIcon}>
            👥
          </Text>

          <View style={styles.summaryContent}>
            <Text style={styles.summaryLabel}>
              Travelers
            </Text>

            <Text style={styles.summaryValue}>
              {travelers}
            </Text>
          </View>
        </View>

        <View style={styles.summaryItem}>
          <Text style={styles.summaryIcon}>
            💰
          </Text>

          <View style={styles.summaryContent}>
            <Text style={styles.summaryLabel}>
              Budget
            </Text>

            <Text style={styles.summaryValue}>
              {budget}
            </Text>
          </View>
        </View>
      </View>

      {/* ABOUT */}
      <Text style={styles.sectionTitle}>
        About {destination}
      </Text>

      <View style={styles.infoCard}>
        <Text style={styles.description}>
          {info.description}
        </Text>
      </View>

      {/* ITINERARY */}
      <Text style={styles.sectionTitle}>
        Suggested Itinerary 🗓️
      </Text>

      <View style={styles.dayCard}>
        <View style={styles.dayCircle}>
          <Text style={styles.dayNumber}>
            1
          </Text>
        </View>

        <View style={styles.dayContent}>
          <Text style={styles.dayTitle}>
            Arrival & Exploration
          </Text>

          <Text style={styles.dayText}>
            Arrive at {destination}, check into your
            hotel and explore the local area.
          </Text>
        </View>
      </View>

      <View style={styles.dayCard}>
        <View style={styles.dayCircle}>
          <Text style={styles.dayNumber}>
            2
          </Text>
        </View>

        <View style={styles.dayContent}>
          <Text style={styles.dayTitle}>
            Explore Popular Places
          </Text>

          <Text style={styles.dayText}>
            Visit some of the most popular attractions
            and landmarks in {destination}.
          </Text>
        </View>
      </View>

      <View style={styles.dayCard}>
        <View style={styles.dayCircle}>
          <Text style={styles.dayNumber}>
            3
          </Text>
        </View>

        <View style={styles.dayContent}>
          <Text style={styles.dayTitle}>
            Local Experience
          </Text>

          <Text style={styles.dayText}>
            Experience local culture, food and
            activities.
          </Text>
        </View>
      </View>

      {/* PLACES */}
      <Text style={styles.sectionTitle}>
        Places to Visit 🌍
      </Text>

      {info.places.map((place, index) => (
        <View
          key={place}
          style={styles.placeCard}
        >
          <View style={styles.placeNumber}>
            <Text style={styles.placeNumberText}>
              {index + 1}
            </Text>
          </View>

          <Text style={styles.placeName}>
            {place}
          </Text>
        </View>
      ))}

      {/* HOTEL */}
      <Text style={styles.sectionTitle}>
        Recommended Stay 🏨
      </Text>

      <View style={styles.recommendCard}>
        <Text style={styles.recommendIcon}>
          🏨
        </Text>

        <View style={styles.recommendContent}>
          <Text style={styles.recommendTitle}>
            {info.hotel}
          </Text>

          <Text style={styles.recommendText}>
            Comfortable stay recommended by TripNova
          </Text>
        </View>

        <TouchableOpacity
          style={styles.smallButton}
          onPress={() =>
            router.push("/hotels")
          }
        >
          <Text style={styles.smallButtonText}>
            View
          </Text>
        </TouchableOpacity>
      </View>

      {/* RESTAURANT */}
      <Text style={styles.sectionTitle}>
        Recommended Restaurant 🍽️
      </Text>

      <View style={styles.recommendCard}>
        <Text style={styles.recommendIcon}>
          🍽️
        </Text>

        <View style={styles.recommendContent}>
          <Text style={styles.recommendTitle}>
            {info.restaurant}
          </Text>

          <Text style={styles.recommendText}>
            A great place to enjoy local food.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.smallButton}
          onPress={() =>
            router.push("/restaurants")
          }
        >
          <Text style={styles.smallButtonText}>
            View
          </Text>
        </TouchableOpacity>
      </View>

      {/* EDIT */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={handleEdit}
        disabled={deleting}
      >
        <Text style={styles.editText}>
          ✏️ Edit Trip
        </Text>
      </TouchableOpacity>

      {/* DELETE */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDelete}
        disabled={deleting}
      >
        <Text style={styles.deleteText}>
          {deleting
            ? "Deleting..."
            : "🗑️ Delete Trip"}
        </Text>
      </TouchableOpacity>

      {/* HOME */}
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() =>
          router.replace("/home")
        }
        disabled={deleting}
      >
        <Text style={styles.homeText}>
          🏠 Back to Home
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
    paddingBottom: 50,
  },

  backButton: {
    marginTop: 15,
    marginBottom: 18,
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
    marginBottom: 25,
  },

  heroIcon: {
    fontSize: 50,
    marginBottom: 8,
  },

  heroTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
  },

  heroSubtitle: {
    color: "#DBEAFE",
    fontSize: 14,
    marginTop: 6,
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: "800",
    color: "#172554",
    marginBottom: 12,
    marginTop: 5,
  },

  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 24,
    elevation: 3,
  },

  summaryItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  summaryIcon: {
    fontSize: 21,
    width: 38,
  },

  summaryContent: {
    flex: 1,
  },

  summaryLabel: {
    fontSize: 11,
    color: "#94A3B8",
    fontWeight: "600",
  },

  summaryValue: {
    fontSize: 14,
    color: "#1E293B",
    fontWeight: "700",
    marginTop: 2,
  },

  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 24,
    elevation: 3,
  },

  description: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 22,
  },

  dayCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    marginBottom: 12,
    elevation: 2,
  },

  dayCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#DBEAFE",
    justifyContent: "center",
    alignItems: "center",
  },

  dayNumber: {
    color: "#2563EB",
    fontWeight: "800",
    fontSize: 16,
  },

  dayContent: {
    flex: 1,
    marginLeft: 12,
  },

  dayTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1E293B",
  },

  dayText: {
    fontSize: 13,
    color: "#64748B",
    lineHeight: 19,
    marginTop: 5,
  },

  placeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 9,
    elevation: 2,
  },

  placeNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#EAF2FF",
    justifyContent: "center",
    alignItems: "center",
  },

  placeNumberText: {
    color: "#2563EB",
    fontWeight: "800",
  },

  placeName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#334155",
    marginLeft: 12,
  },

  recommendCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    elevation: 3,
  },

  recommendIcon: {
    fontSize: 32,
  },

  recommendContent: {
    flex: 1,
    marginLeft: 11,
  },

  recommendTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1E293B",
  },

  recommendText: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 4,
    lineHeight: 16,
  },

  smallButton: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 9,
  },

  smallButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },

  editButton: {
    height: 52,
    backgroundColor: "#2563EB",
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },

  editText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  deleteButton: {
    height: 52,
    borderWidth: 1.5,
    borderColor: "#EF4444",
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },

  deleteText: {
    color: "#DC2626",
    fontSize: 15,
    fontWeight: "800",
  },

  homeButton: {
    height: 52,
    borderWidth: 1.5,
    borderColor: "#2563EB",
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },

  homeText: {
    color: "#2563EB",
    fontSize: 15,
    fontWeight: "800",
  },
});