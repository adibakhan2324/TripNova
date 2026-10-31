import AsyncStorage from "@react-native-async-storage/async-storage";

const TRIPS_KEY = "@tripnova_trips";

export type Trip = {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelers: string;
  budget: string;
  createdAt: string;
};

export async function getTrips(): Promise<Trip[]> {
  try {
    const stored = await AsyncStorage.getItem(TRIPS_KEY);

    if (!stored) {
      return [];
    }

    return JSON.parse(stored);
  } catch (error) {
    console.log("Error loading trips:", error);
    return [];
  }
}

export async function addTrip(
  trip: Trip
): Promise<void> {
  try {
    const trips = await getTrips();

    trips.unshift(trip);

    await AsyncStorage.setItem(
      TRIPS_KEY,
      JSON.stringify(trips)
    );
  } catch (error) {
    console.log("Error adding trip:", error);
  }
}

export async function removeTrip(
  id: string
): Promise<void> {
  try {
    const trips = await getTrips();

    const updatedTrips = trips.filter(
      (trip) => trip.id !== id
    );

    await AsyncStorage.setItem(
      TRIPS_KEY,
      JSON.stringify(updatedTrips)
    );
  } catch (error) {
    console.log("Error removing trip:", error);
  }
}