import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
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
    removeFavorite,
} from "../utils/favorites";

export default function Favorites() {
  const router = useRouter();

  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = async () => {
    setLoading(true);

    const saved = await getFavorites();

    setFavorites(saved);

    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const handleRemove = async (id: string) => {
    await removeFavorite(id);

    setFavorites((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  const openFavorite = (item: FavoriteItem) => {
    if (item.type === "Destination") {
      router.push({
        pathname: "/trip-planner",
        params: {
          destination: item.name,
        },
      });

      return;
    }

    if (item.type === "Hotel") {
      router.push({
        pathname: "/hotel-details",
        params: {
          name: item.name,
          location: item.location,
          rating: item.rating || "4.8 ⭐",
          price: item.price || "₹3,000/night",
        },
      });

      return;
    }

    if (item.type === "Restaurant") {
      router.push({
        pathname: "/restaurant-details",
        params: {
          name: item.name,
          location: item.location,
          cuisine: item.cuisine || "Indian",
          rating: item.rating || "4.8 ⭐",
        },
      });
    }
  };

  const getTypeIcon = (type: FavoriteItem["type"]) => {
    if (type === "Hotel") {
      return "🏨";
    }

    if (type === "Restaurant") {
      return "🍽️";
    }

    return "🌍";
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

      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.title}>
            Favorites ❤️
          </Text>

          <Text style={styles.subtitle}>
            Your saved places in one place.
          </Text>
        </View>

        <Text style={styles.count}>
          {favorites.length}
        </Text>
      </View>

      {loading ? (
        <View style={styles.messageCard}>
          <Text style={styles.messageText}>
            Loading favorites...
          </Text>
        </View>
      ) : favorites.length === 0 ? (
        <>
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>
              ❤️
            </Text>

            <Text style={styles.emptyTitle}>
              No favorites yet
            </Text>

            <Text style={styles.emptyText}>
              Save your favorite destinations, hotels
              and restaurants to find them here.
            </Text>

            <TouchableOpacity
              style={styles.exploreButton}
              onPress={() =>
                router.push("/destinations")
              }
            >
              <Text style={styles.exploreText}>
                Explore Destinations
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>
              💡 Tip
            </Text>

            <Text style={styles.tipText}>
              Tap the ❤️ button on a destination,
              hotel or restaurant to save it.
            </Text>
          </View>
        </>
      ) : (
        <View>
          {favorites.map((item) => (
            <View
              key={item.id}
              style={styles.favoriteCard}
            >
              <TouchableOpacity
                style={styles.cardMain}
                onPress={() =>
                  openFavorite(item)
                }
              >
                <View style={styles.iconBox}>
                  <Text style={styles.icon}>
                    {item.icon ||
                      getTypeIcon(item.type)}
                  </Text>
                </View>

                <View style={styles.details}>
                  <Text style={styles.name}>
                    {item.name}
                  </Text>

                  <Text style={styles.type}>
                    {getTypeIcon(item.type)}{" "}
                    {item.type}
                  </Text>

                  <Text style={styles.location}>
                    📍 {item.location}
                  </Text>

                  {item.rating && (
                    <Text style={styles.rating}>
                      {item.rating}
                    </Text>
                  )}

                  {item.price && (
                    <Text style={styles.price}>
                      {item.price}
                    </Text>
                  )}

                  {item.cuisine && (
                    <Text style={styles.cuisine}>
                      🍴 {item.cuisine}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>

              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() =>
                    handleRemove(item.id)
                  }
                >
                  <Text style={styles.removeIcon}>
                    ❤️
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.viewButton}
                  onPress={() =>
                    openFavorite(item)
                  }
                >
                  <Text style={styles.viewText}>
                    View
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
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

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },

  headerText: {
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

  count: {
    minWidth: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#2563EB",
    color: "#FFFFFF",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 16,
    fontWeight: "800",
    paddingTop: 10,
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
    fontSize: 21,
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

  exploreButton: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 22,
    height: 50,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },

  exploreText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  tipCard: {
    backgroundColor: "#EFF6FF",
    borderRadius: 18,
    padding: 20,
    marginTop: 18,
  },

  tipTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#172554",
  },

  tipText: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 20,
    marginTop: 7,
  },

  favoriteCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 15,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
  },

  cardMain: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  iconBox: {
    width: 62,
    height: 62,
    borderRadius: 14,
    backgroundColor: "#EAF2FF",
    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    fontSize: 31,
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

  type: {
    fontSize: 12,
    color: "#2563EB",
    marginTop: 3,
    fontWeight: "700",
  },

  location: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 3,
  },

  rating: {
    fontSize: 12,
    color: "#2563EB",
    marginTop: 3,
    fontWeight: "700",
  },

  price: {
    fontSize: 12,
    color: "#1E293B",
    marginTop: 3,
    fontWeight: "700",
  },

  cuisine: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 3,
  },

  actions: {
    alignItems: "center",
    marginLeft: 8,
  },

  removeButton: {
    width: 40,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },

  removeIcon: {
    fontSize: 20,
  },

  viewButton: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 9,
  },

  viewText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
});