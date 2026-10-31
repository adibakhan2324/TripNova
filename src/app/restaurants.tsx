import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {
    FavoriteItem,
    getFavorites,
    toggleFavorite,
} from "../utils/favorites";

export default function Restaurants() {
  const router = useRouter();

  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const restaurants = [
    {
      name: "Beachside Kitchen",
      location: "Goa",
      cuisine: "Indian & Seafood",
      rating: "4.8 ⭐",
      icon: "🍽️",
    },
    {
      name: "Mountain Cafe",
      location: "Manali",
      cuisine: "Indian & Cafe",
      rating: "4.7 ⭐",
      icon: "☕",
    },
    {
      name: "Royal Rajasthani",
      location: "Jaipur",
      cuisine: "Rajasthani",
      rating: "4.9 ⭐",
      icon: "🍛",
    },
    {
      name: "Kerala Spice",
      location: "Kerala",
      cuisine: "South Indian",
      rating: "4.8 ⭐",
      icon: "🥘",
    },
  ];

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const favorites = await getFavorites();

    setFavoriteIds(
      favorites.map((item) => item.id)
    );
  };

  const handleFavorite = async (
    restaurant: (typeof restaurants)[number]
  ) => {
    const item: FavoriteItem = {
      id: `restaurant-${restaurant.name}`,
      name: restaurant.name,
      type: "Restaurant",
      location: restaurant.location,
      icon: restaurant.icon,
      rating: restaurant.rating,
      cuisine: restaurant.cuisine,
    };

    const added = await toggleFavorite(item);

    setFavoriteIds((current) => {
      if (added) {
        return [...current, item.id];
      }

      return current.filter(
        (id) => id !== item.id
      );
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <TouchableOpacity
        onPress={() => router.back()}
      >
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.titleRow}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Restaurants 🍽️
          </Text>

          <Text style={styles.subtitle}>
            Discover delicious food during your trip.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.favoritesButton}
          onPress={() => router.push("/favorites")}
        >
          <Text style={styles.favoritesIcon}>
            ❤️
          </Text>
        </TouchableOpacity>
      </View>

      {restaurants.map((restaurant) => {
        const id = `restaurant-${restaurant.name}`;

        const favorite = favoriteIds.includes(id);

        return (
          <View
            key={restaurant.name}
            style={styles.card}
          >
            <View style={styles.iconBox}>
              <Text style={styles.icon}>
                {restaurant.icon}
              </Text>
            </View>

            <View style={styles.details}>
              <Text style={styles.name}>
                {restaurant.name}
              </Text>

              <Text style={styles.location}>
                📍 {restaurant.location}
              </Text>

              <Text style={styles.cuisine}>
                🍴 {restaurant.cuisine}
              </Text>

              <Text style={styles.rating}>
                {restaurant.rating}
              </Text>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.heartButton}
                onPress={() =>
                  handleFavorite(restaurant)
                }
              >
                <Text style={styles.heart}>
                  {favorite ? "❤️" : "🤍"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.viewButton}
                onPress={() =>
                  router.push({
                    pathname: "/restaurant-details",
                    params: {
                      name: restaurant.name,
                      location: restaurant.location,
                      cuisine: restaurant.cuisine,
                      rating: restaurant.rating,
                    },
                  })
                }
              >
                <Text style={styles.viewText}>
                  View
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
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

  back: {
    color: "#2563EB",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 15,
    marginBottom: 20,
  },

  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },

  titleContainer: {
    flex: 1,
    paddingRight: 10,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#172554",
  },

  subtitle: {
    fontSize: 15,
    color: "#64748B",
    marginTop: 7,
  },

  favoritesButton: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },

  favoritesIcon: {
    fontSize: 19,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
  },

  iconBox: {
    width: 65,
    height: 65,
    borderRadius: 14,
    backgroundColor: "#EAF2FF",
    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    fontSize: 32,
  },

  details: {
    flex: 1,
    marginLeft: 12,
  },

  name: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1E293B",
  },

  location: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 4,
  },

  cuisine: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 4,
  },

  rating: {
    fontSize: 12,
    color: "#2563EB",
    marginTop: 4,
    fontWeight: "700",
  },

  actions: {
    alignItems: "center",
    marginLeft: 8,
  },

  heartButton: {
    width: 38,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },

  heart: {
    fontSize: 22,
  },

  viewButton: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 10,
  },

  viewText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 12,
  },
});