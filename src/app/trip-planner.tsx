import { useLocalSearchParams, useRouter } from "expo-router";
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
import { addTrip } from "../utils/trips";

export default function TripPlanner() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [destination, setDestination] = useState(
    typeof params.destination === "string"
      ? params.destination
      : ""
  );

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [travelers, setTravelers] = useState("2");
  const [budget, setBudget] = useState("");

  const [creating, setCreating] = useState(false);

  const handleCreateTrip = async () => {
    if (!destination.trim()) {
      Alert.alert(
        "Destination Required",
        "Please enter your destination."
      );
      return;
    }

    if (!startDate.trim()) {
      Alert.alert(
        "Start Date Required",
        "Please enter your trip start date."
      );
      return;
    }

    if (!endDate.trim()) {
      Alert.alert(
        "End Date Required",
        "Please enter your trip end date."
      );
      return;
    }

    if (!travelers.trim()) {
      Alert.alert(
        "Travelers Required",
        "Please enter the number of travelers."
      );
      return;
    }

    if (creating) {
      return;
    }

    setCreating(true);

    try {
      const newTrip = {
        id: Date.now().toString(),
        destination: destination.trim(),
        startDate: startDate.trim(),
        endDate: endDate.trim(),
        travelers: travelers.trim(),
        budget: budget.trim() || "Not specified",
        createdAt: new Date().toISOString(),
      };

      await addTrip(newTrip);

      Alert.alert(
        "Trip Created! 🎉",
        `Your trip to ${destination.trim()} has been saved.`,
        [
          {
            text: "View My Trips",
            onPress: () => router.push("/my-trips"),
          },
          {
            text: "Stay Here",
            style: "cancel",
          },
        ]
      );
    } catch (error) {
      console.log("Create trip error:", error);

      Alert.alert(
        "Something went wrong",
        "We could not save your trip. Please try again."
      );
    } finally {
      setCreating(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
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

      {/* HEADER */}
      <Text style={styles.title}>
        Plan Your Trip ✈️
      </Text>

      <Text style={styles.subtitle}>
        Create your perfect travel plan with TripNova.
      </Text>

      {/* DESTINATION */}
      <View style={styles.card}>
        <Text style={styles.label}>
          Destination *
        </Text>

        <TextInput
          style={styles.input}
          placeholder="e.g. Goa, Manali, Paris"
          placeholderTextColor="#94A3B8"
          value={destination}
          onChangeText={setDestination}
        />
      </View>

      {/* DATES */}
      <View style={styles.card}>
        <Text style={styles.label}>
          Start Date *
        </Text>

        <TextInput
          style={styles.input}
          placeholder="e.g. 10 September 2026"
          placeholderTextColor="#94A3B8"
          value={startDate}
          onChangeText={setStartDate}
        />

        <Text style={[styles.label, styles.secondLabel]}>
          End Date *
        </Text>

        <TextInput
          style={styles.input}
          placeholder="e.g. 15 September 2026"
          placeholderTextColor="#94A3B8"
          value={endDate}
          onChangeText={setEndDate}
        />
      </View>

      {/* TRAVELERS */}
      <View style={styles.card}>
        <Text style={styles.label}>
          Number of Travelers *
        </Text>

        <TextInput
          style={styles.input}
          placeholder="e.g. 2"
          placeholderTextColor="#94A3B8"
          value={travelers}
          onChangeText={setTravelers}
          keyboardType="number-pad"
        />
      </View>

      {/* BUDGET */}
      <View style={styles.card}>
        <Text style={styles.label}>
          Budget
        </Text>

        <TextInput
          style={styles.input}
          placeholder="e.g. ₹30,000"
          placeholderTextColor="#94A3B8"
          value={budget}
          onChangeText={setBudget}
        />

        <Text style={styles.helperText}>
          You can leave this blank if you haven't
          decided your budget yet.
        </Text>
      </View>

      {/* CREATE BUTTON */}
      <TouchableOpacity
        style={[
          styles.createButton,
          creating && styles.disabledButton,
        ]}
        onPress={handleCreateTrip}
        disabled={creating}
      >
        <Text style={styles.createButtonText}>
          {creating
            ? "Creating Trip..."
            : "Create My Trip ✨"}
        </Text>
      </TouchableOpacity>

      {/* MY TRIPS BUTTON */}
      <TouchableOpacity
        style={styles.myTripsButton}
        onPress={() => router.push("/my-trips")}
      >
        <Text style={styles.myTripsText}>
          🗺️ View My Trips
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
    marginBottom: 20,
  },

  backText: {
    color: "#2563EB",
    fontSize: 16,
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
    marginTop: 7,
    marginBottom: 22,
    lineHeight: 21,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 15,
    elevation: 3,
  },

  label: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1E293B",
    marginBottom: 9,
  },

  secondLabel: {
    marginTop: 17,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#D7DEE9",
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 14,
    color: "#1E293B",
    backgroundColor: "#F8FAFC",
  },

  helperText: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 8,
    lineHeight: 18,
  },

  createButton: {
    height: 54,
    backgroundColor: "#2563EB",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },

  disabledButton: {
    opacity: 0.6,
  },

  createButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  myTripsButton: {
    height: 52,
    borderWidth: 1.5,
    borderColor: "#2563EB",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },

  myTripsText: {
    color: "#2563EB",
    fontSize: 15,
    fontWeight: "800",
  },
});