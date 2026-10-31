import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {
    getTrips,
    removeTrip,
    Trip,
} from "../utils/trips";

export default function MyTrips() {
  const router = useRouter();

  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTrips = async () => {
    try {
      setLoading(true);

      const savedTrips = await getTrips();

      setTrips(savedTrips);
    } catch (error) {
      console.log("Error loading trips:", error);
      setTrips([]);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadTrips();
    }, [])
  );

  const handleDelete = (trip: Trip) => {
    Alert.alert(
      "Delete Trip?",
      `Are you sure you want to delete your trip to ${trip.destination}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await removeTrip(trip.id);

              setTrips((currentTrips) =>
                currentTrips.filter(
                  (item) => item.id !== trip.id
                )
              );
            } catch (error) {
              console.log(
                "Error deleting trip:",
                error
              );

              Alert.alert(
                "Error",
                "Could not delete this trip."
              );
            }
          },
        },
      ]
    );
  };

  const openTrip = (trip: Trip) => {
    router.push({
      pathname: "/trip-details",
      params: {
        id: String(trip.id),
        destination: String(trip.destination),
        startDate: String(trip.startDate),
        endDate: String(trip.endDate),
        travelers: String(trip.travelers),
        budget: String(trip.budget),
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
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backText}>
          ← Back
        </Text>
      </TouchableOpacity>

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <Text style={styles.title}>
            My Trips 🗺️
          </Text>

          <Text style={styles.subtitle}>
            All your planned journeys in one place.
          </Text>
        </View>

        <View style={styles.countCircle}>
          <Text style={styles.countText}>
            {trips.length}
          </Text>
        </View>
      </View>

      {/* LOADING */}
      {loading ? (
        <View style={styles.messageCard}>
          <Text style={styles.messageText}>
            Loading your trips...
          </Text>
        </View>
      ) : trips.length === 0 ? (
        /* EMPTY */
        <View style={styles.emptyCard}>
          <Text style={styles.emptyIcon}>
            ✈️
          </Text>

          <Text style={styles.emptyTitle}>
            No trips yet
          </Text>

          <Text style={styles.emptyText}>
            Start planning your next adventure and
            your trip will appear here.
          </Text>

          <TouchableOpacity
            style={styles.createButton}
            onPress={() =>
              router.push("/trip-planner")
            }
          >
            <Text style={styles.createButtonText}>
              Create My Trip ✨
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        /* TRIPS */
        <View>
          {trips.map((trip, index) => (
            <View
              key={trip.id}
              style={styles.tripCard}
            >
              {/* TOP */}
              <View style={styles.tripTop}>
                <View style={styles.destinationIcon}>
                  <Text style={styles.icon}>
                    ✈️
                  </Text>
                </View>

                <View style={styles.destinationInfo}>
                  <Text style={styles.destination}>
                    {trip.destination}
                  </Text>

                  <Text style={styles.tripNumber}>
                    Trip #{trips.length - index}
                  </Text>
                </View>

                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>
                    Planned
                  </Text>
                </View>
              </View>

              {/* DETAILS */}
              <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailIcon}>
                    📅
                  </Text>

                  <View style={styles.detailContent}>
                    <Text style={styles.detailLabel}>
                      Dates
                    </Text>

                    <Text style={styles.detailValue}>
                      {trip.startDate} → {trip.endDate}
                    </Text>
                  </View>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailIcon}>
                    👥
                  </Text>

                  <View style={styles.detailContent}>
                    <Text style={styles.detailLabel}>
                      Travelers
                    </Text>

                    <Text style={styles.detailValue}>
                      {trip.travelers}
                    </Text>
                  </View>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailIcon}>
                    💰
                  </Text>

                  <View style={styles.detailContent}>
                    <Text style={styles.detailLabel}>
                      Budget
                    </Text>

                    <Text style={styles.detailValue}>
                      {trip.budget}
                    </Text>
                  </View>
                </View>
              </View>

              {/* BUTTONS */}
              <View style={styles.buttons}>
                <TouchableOpacity
                  style={styles.viewButton}
                  onPress={() => openTrip(trip)}
                >
                  <Text style={styles.viewText}>
                    View Trip
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() =>
                    handleDelete(trip)
                  }
                >
                  <Text style={styles.deleteText}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* CREATE ANOTHER */}
      {!loading && trips.length > 0 && (
        <TouchableOpacity
          style={styles.anotherButton}
          onPress={() =>
            router.push("/trip-planner")
          }
        >
          <Text style={styles.anotherText}>
            + Create Another Trip
          </Text>
        </TouchableOpacity>
      )}
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
    marginBottom: 20,
  },

  backText: {
    color: "#2563EB",
    fontSize: 16,
    fontWeight: "700",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },

  headerInfo: {
    flex: 1,
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
  },

  countCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
  },

  countText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  messageCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 30,
    alignItems: "center",
  },

  messageText: {
    color: "#64748B",
    fontSize: 15,
  },

  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 30,
    alignItems: "center",
    elevation: 3,
  },

  emptyIcon: {
    fontSize: 55,
    marginBottom: 15,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#172554",
  },

  emptyText: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 21,
    marginTop: 8,
    marginBottom: 22,
  },

  createButton: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 24,
    height: 50,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },

  createButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  tripCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 17,
    marginBottom: 16,
    elevation: 3,
  },

  tripTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  destinationIcon: {
    width: 58,
    height: 58,
    borderRadius: 15,
    backgroundColor: "#EAF2FF",
    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    fontSize: 30,
  },

  destinationInfo: {
    flex: 1,
    marginLeft: 12,
  },

  destination: {
    fontSize: 20,
    fontWeight: "800",
    color: "#172554",
  },

  tripNumber: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 4,
  },

  statusBadge: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },

  statusText: {
    color: "#15803D",
    fontSize: 11,
    fontWeight: "800",
  },

  detailsContainer: {
    marginTop: 18,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    paddingTop: 15,
  },

  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 13,
  },

  detailIcon: {
    fontSize: 18,
    width: 32,
  },

  detailContent: {
    flex: 1,
  },

  detailLabel: {
    fontSize: 11,
    color: "#94A3B8",
    fontWeight: "600",
  },

  detailValue: {
    fontSize: 13,
    color: "#334155",
    fontWeight: "700",
    marginTop: 2,
  },

  buttons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 5,
  },

  viewButton: {
    flex: 1,
    backgroundColor: "#2563EB",
    height: 45,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
  },

  viewText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },

  deleteButton: {
    width: 85,
    height: 45,
    borderWidth: 1,
    borderColor: "#FCA5A5",
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
  },

  deleteText: {
    color: "#DC2626",
    fontSize: 13,
    fontWeight: "700",
  },

  anotherButton: {
    height: 52,
    borderWidth: 1.5,
    borderColor: "#2563EB",
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },

  anotherText: {
    color: "#2563EB",
    fontSize: 15,
    fontWeight: "800",
  },
});