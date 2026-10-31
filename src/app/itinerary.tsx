import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function Itinerary() {
  const router = useRouter();

  const {
    destination,
    days,
    budget,
    travelType,
  } = useLocalSearchParams<{
    destination?: string;
    days?: string;
    budget?: string;
    travelType?: string;
  }>();

  const place = destination || "Your Destination";
  const totalDays = Number(days) || 3;

  const activities = [
    {
      day: "Day 1",
      title: "Arrival & Local Exploration",
      places: [
        "🏨 Check-in at your hotel",
        "📍 Explore the city center",
        "🍽️ Try local cuisine",
        "🌆 Evening sightseeing",
      ],
    },
    {
      day: "Day 2",
      title: "Explore Popular Attractions",
      places: [
        "🌅 Start the day with breakfast",
        "🏛️ Visit a famous landmark",
        "📸 Explore popular tourist spots",
        "🍴 Enjoy a local lunch",
      ],
    },
    {
      day: "Day 3",
      title: "Culture, Shopping & Departure",
      places: [
        "☕ Enjoy a relaxed breakfast",
        "🛍️ Explore local markets",
        "🎁 Buy souvenirs",
        "✈️ Prepare for departure",
      ],
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>
        {place} ✈️
      </Text>

      <Text style={styles.subtitle}>
        Your personalized {totalDays}-day trip plan
      </Text>

      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryIcon}>📅</Text>
          <Text style={styles.summaryLabel}>
            Duration
          </Text>
          <Text style={styles.summaryValue}>
            {totalDays} Days
          </Text>
        </View>

        <View style={styles.summaryItem}>
          <Text style={styles.summaryIcon}>💰</Text>
          <Text style={styles.summaryLabel}>
            Budget
          </Text>
          <Text style={styles.summaryValue}>
            {budget || "Not specified"}
          </Text>
        </View>

        <View style={styles.summaryItem}>
          <Text style={styles.summaryIcon}>👥</Text>
          <Text style={styles.summaryLabel}>
            Travel Type
          </Text>
          <Text style={styles.summaryValue}>
            {travelType || "Solo"}
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>
        Your Itinerary
      </Text>

      {activities
        .slice(0, Math.min(totalDays, 3))
        .map((item) => (
          <View
            key={item.day}
            style={styles.dayCard}
          >
            <View style={styles.dayHeader}>
              <Text style={styles.day}>
                {item.day}
              </Text>

              <View style={styles.dayBadge}>
                <Text style={styles.dayBadgeText}>
                  PLAN
                </Text>
              </View>
            </View>

            <Text style={styles.dayTitle}>
              {item.title}
            </Text>

            {item.places.map(
              (activity, index) => (
                <View
                  key={index}
                  style={styles.activityRow}
                >
                  <Text style={styles.activity}>
                    {activity}
                  </Text>
                </View>
              )
            )}
          </View>
        ))}

      {totalDays > 3 && (
        <View style={styles.extraCard}>
          <Text style={styles.extraTitle}>
            ✨ More days to explore
          </Text>

          <Text style={styles.extraText}>
            TripNova will add personalized
            activities for the remaining{" "}
            {totalDays - 3}{" "}
            day{totalDays - 3 > 1 ? "s" : ""} in
            your complete itinerary.
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.exploreButton}
        onPress={() => router.push("/")}
      >
        <Text style={styles.exploreButtonText}>
          Back to Home
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
    fontSize: 16,
    color: "#2563EB",
    fontWeight: "700",
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#172554",
  },

  subtitle: {
    fontSize: 15,
    color: "#64748B",
    marginTop: 6,
    marginBottom: 22,
  },

  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 28,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },

  summaryItem: {
    alignItems: "center",
    flex: 1,
  },

  summaryIcon: {
    fontSize: 23,
    marginBottom: 7,
  },

  summaryLabel: {
    fontSize: 11,
    color: "#64748B",
    marginBottom: 4,
  },

  summaryValue: {
    fontSize: 13,
    fontWeight: "800",
    color: "#1E293B",
    textAlign: "center",
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#172554",
    marginBottom: 15,
  },

  dayCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },

  dayHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  day: {
    fontSize: 14,
    fontWeight: "800",
    color: "#2563EB",
  },

  dayBadge: {
    backgroundColor: "#EAF2FF",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },

  dayBadgeText: {
    color: "#2563EB",
    fontSize: 10,
    fontWeight: "800",
  },

  dayTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1E293B",
    marginTop: 10,
    marginBottom: 15,
  },

  activityRow: {
    borderTopWidth: 1,
    borderTopColor: "#EEF1F5",
    paddingVertical: 11,
  },

  activity: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 20,
  },

  extraCard: {
    backgroundColor: "#EAF2FF",
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
  },

  extraTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#172554",
    marginBottom: 7,
  },

  extraText: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 21,
  },

  exploreButton: {
    backgroundColor: "#2563EB",
    height: 54,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },

  exploreButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
});