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

export default function Destinations() {
  const router = useRouter();

  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const destinations = [
    {
      name: "Goa",
      description: "Beaches, nightlife and beautiful sunsets.",
      icon: "🏝️",
    },
    {
      name: "Manali",
      description: "Mountains, snow and peaceful valleys.",
      icon: "🏔️",
    },
    {
      name: "Jaipur",
      description: "Royal palaces, forts and rich culture.",
      icon: "🏰",
    },
    {
      name: "Kerala",
      description: "Backwaters, greenery and relaxing beaches.",
      icon: "🌴",
    },
    {
      name: "Paris",
      description: "Romantic streets, art and iconic landmarks.",
      icon: "🗼",
    },
    {
      name: "Dubai",
      description: "Luxury shopping, skyscrapers and adventure.",
      icon: "🏙️",
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
    destination: (typeof destinations)[number]
  ) => {
    const item: FavoriteItem = {
      id: `destination-${destination.name}`,
      name: destination.name,
      type: "Destination",
      location: destination.name,
      icon: destination.icon,
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
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.backButton}
      >
        <Text style={styles.backText}>
          ← Back
        </Text>
      </TouchableOpacity>

      <View style={styles.titleRow}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Destinations 🌍
          </Text>

          <Text style={styles.subtitle}>
            Discover amazing places around the world.
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

      {destinations.map((destination) => {
        const id = `destination-${destination.name}`;

        const favorite = favoriteIds.includes(id);

        return (
          <View
            key={destination.name}
            style={styles.card}
          >
            <View style={styles.iconBox}>
              <Text style={styles.icon}>
                {destination.icon}
              </Text>
            </View>

            <View style={styles.details}>
              <Text style={styles.name}>
                {destination.name}
              </Text>

              <Text style={styles.description}>
                {destination.description}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.heartButton}
              onPress={() =>
                handleFavorite(destination)
              }
            >
              <Text style={styles.heart}>
                {favorite ? "❤️" : "🤍"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.planButton}
              onPress={() =>
                router.push({
                  pathname: "/trip-planner",
                  params: {
                    destination: destination.name,
                  },
                })
              }
            >
              <Text style={styles.planText}>
                Plan
              </Text>
            </TouchableOpacity>
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

  backButton: {
    marginTop: 15,
    marginBottom: 20,
  },

  backText: {
    color: "#2563EB",
    fontSize: 16,
    fontWeight: "700",
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
    elevation: 3,
  },

  iconBox: {
    width: 65,
    height: 65,
    borderRadius: 15,
    backgroundColor: "#EAF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  icon: {
    fontSize: 34,
  },

  details: {
    marginBottom: 12,
  },

  name: {
    fontSize: 19,
    fontWeight: "800",
    color: "#1E293B",
  },

  description: {
    fontSize: 13,
    color: "#64748B",
    lineHeight: 19,
    marginTop: 5,
  },

  heartButton: {
    position: "absolute",
    right: 15,
    top: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
  },

  heart: {
    fontSize: 22,
  },

  planButton: {
    backgroundColor: "#2563EB",
    height: 45,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  planText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
});