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

export default function Hotels() {
  const router = useRouter();

  const [favoriteIds, setFavoriteIds] = useState<string[]>(
    []
  );

  const hotels = [
    {
      name: "Nova Grand Hotel",
      location: "Goa",
      rating: "4.8 ⭐",
      price: "₹3,500/night",
      icon: "🏨",
    },
    {
      name: "Mountain View Resort",
      location: "Manali",
      rating: "4.7 ⭐",
      price: "₹2,800/night",
      icon: "🏔️",
    },
    {
      name: "Royal Palace Hotel",
      location: "Jaipur",
      rating: "4.6 ⭐",
      price: "₹3,200/night",
      icon: "🏰",
    },
    {
      name: "Palm Paradise",
      location: "Kerala",
      rating: "4.9 ⭐",
      price: "₹4,000/night",
      icon: "🌴",
    },
  ];

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const favorites = await getFavorites();

    setFavoriteIds(
      favorites.map((item: any) => item.id)
    );
  };

  const handleFavorite = async (
    hotel: (typeof hotels)[number]
  ) => {
    const item: FavoriteItem = {
      id: `hotel-${hotel.name}`,
      name: hotel.name,
      type: "Hotel",
      location: hotel.location,
      icon: hotel.icon,
      rating: hotel.rating,
      price: hotel.price,
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
        <View>
          <Text style={styles.title}>
            Find Hotels 🏨
          </Text>

          <Text style={styles.subtitle}>
            Find comfortable stays for your journey.
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

      {hotels.map((hotel) => {
        const id = `hotel-${hotel.name}`;

        const favorite = favoriteIds.includes(id);

        return (
          <View
            key={hotel.name}
            style={styles.card}
          >
            <View style={styles.iconBox}>
              <Text style={styles.icon}>
                {hotel.icon}
              </Text>
            </View>

            <View style={styles.details}>
              <Text style={styles.name}>
                {hotel.name}
              </Text>

              <Text style={styles.location}>
                📍 {hotel.location}
              </Text>

              <Text style={styles.rating}>
                {hotel.rating}
              </Text>

              <Text style={styles.price}>
                {hotel.price}
              </Text>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.heartButton}
                onPress={() =>
                  handleFavorite(hotel)
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
                    pathname: "/hotel-details",
                    params: {
                      name: hotel.name,
                      location: hotel.location,
                      rating: hotel.rating,
                      price: hotel.price,
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

  rating: {
    fontSize: 12,
    color: "#2563EB",
    marginTop: 4,
    fontWeight: "700",
  },

  price: {
    fontSize: 13,
    color: "#1E293B",
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