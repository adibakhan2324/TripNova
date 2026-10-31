import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function Search() {
  const router = useRouter();

  const [searchText, setSearchText] = useState("");

  const items = [
    {
      name: "Goa",
      type: "Destination",
      icon: "🏝️",
      action: "destination",
    },
    {
      name: "Manali",
      type: "Destination",
      icon: "🏔️",
      action: "destination",
    },
    {
      name: "Jaipur",
      type: "Destination",
      icon: "🏰",
      action: "destination",
    },
    {
      name: "Kerala",
      type: "Destination",
      icon: "🌴",
      action: "destination",
    },
    {
      name: "Paris",
      type: "Destination",
      icon: "🗼",
      action: "destination",
    },
    {
      name: "Dubai",
      type: "Destination",
      icon: "🏙️",
      action: "destination",
    },
    {
      name: "Nova Grand Hotel",
      type: "Hotel",
      icon: "🏨",
      action: "hotel",
    },
    {
      name: "Mountain View Resort",
      type: "Hotel",
      icon: "🏔️",
      action: "hotel",
    },
    {
      name: "Royal Palace Hotel",
      type: "Hotel",
      icon: "🏰",
      action: "hotel",
    },
    {
      name: "Palm Paradise",
      type: "Hotel",
      icon: "🌴",
      action: "hotel",
    },
    {
      name: "Beachside Kitchen",
      type: "Restaurant",
      icon: "🍽️",
      action: "restaurant",
    },
    {
      name: "Mountain Cafe",
      type: "Restaurant",
      icon: "☕",
      action: "restaurant",
    },
    {
      name: "Royal Rajasthani",
      type: "Restaurant",
      icon: "🍛",
      action: "restaurant",
    },
    {
      name: "Kerala Spice",
      type: "Restaurant",
      icon: "🥘",
      action: "restaurant",
    },
  ];

  const filteredItems = useMemo(() => {
    const text = searchText.trim().toLowerCase();

    if (!text) {
      return items;
    }

    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(text) ||
        item.type.toLowerCase().includes(text)
    );
  }, [searchText]);

  const openItem = (item: (typeof items)[number]) => {
    if (item.action === "destination") {
      router.push({
        pathname: "/trip-planner",
        params: {
          destination: item.name,
        },
      });
    }

    if (item.action === "hotel") {
      const hotelData = {
        "Nova Grand Hotel": {
          location: "Goa",
          rating: "4.8 ⭐",
          price: "₹3,500/night",
        },
        "Mountain View Resort": {
          location: "Manali",
          rating: "4.7 ⭐",
          price: "₹2,800/night",
        },
        "Royal Palace Hotel": {
          location: "Jaipur",
          rating: "4.6 ⭐",
          price: "₹3,200/night",
        },
        "Palm Paradise": {
          location: "Kerala",
          rating: "4.9 ⭐",
          price: "₹4,000/night",
        },
      };

      const hotel =
        hotelData[item.name as keyof typeof hotelData];

      router.push({
        pathname: "/hotel-details",
        params: {
          name: item.name,
          location: hotel?.location || "India",
          rating: hotel?.rating || "4.8 ⭐",
          price: hotel?.price || "₹3,000/night",
        },
      });
    }

    if (item.action === "restaurant") {
      const restaurantData = {
        "Beachside Kitchen": {
          location: "Goa",
          cuisine: "Indian & Seafood",
          rating: "4.8 ⭐",
        },
        "Mountain Cafe": {
          location: "Manali",
          cuisine: "Indian & Cafe",
          rating: "4.7 ⭐",
        },
        "Royal Rajasthani": {
          location: "Jaipur",
          cuisine: "Rajasthani",
          rating: "4.9 ⭐",
        },
        "Kerala Spice": {
          location: "Kerala",
          cuisine: "South Indian",
          rating: "4.8 ⭐",
        },
      };

      const restaurant =
        restaurantData[
          item.name as keyof typeof restaurantData
        ];

      router.push({
        pathname: "/restaurant-details",
        params: {
          name: item.name,
          location:
            restaurant?.location || "India",
          cuisine:
            restaurant?.cuisine || "Indian",
          rating:
            restaurant?.rating || "4.8 ⭐",
        },
      });
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.backButton}
      >
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Search 🔍</Text>

      <Text style={styles.subtitle}>
        Find destinations, hotels and restaurants.
      </Text>

      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>🔍</Text>

        <TextInput
          style={styles.input}
          placeholder="Search Goa, hotel, restaurant..."
          placeholderTextColor="#94A3B8"
          value={searchText}
          onChangeText={setSearchText}
          autoCapitalize="none"
          returnKeyType="search"
        />

        {searchText.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearchText("")}
          >
            <Text style={styles.clear}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {searchText.length === 0 && (
        <Text style={styles.popularTitle}>
          Popular Searches
        </Text>
      )}

      {filteredItems.length === 0 ? (
        <View style={styles.noResults}>
          <Text style={styles.noResultsIcon}>
            🔎
          </Text>

          <Text style={styles.noResultsTitle}>
            No results found
          </Text>

          <Text style={styles.noResultsText}>
            Try searching for another destination,
            hotel or restaurant.
          </Text>
        </View>
      ) : (
        <View style={styles.results}>
          {filteredItems.map((item) => (
            <TouchableOpacity
              key={`${item.type}-${item.name}`}
              style={styles.resultCard}
              onPress={() => openItem(item)}
            >
              <View style={styles.iconBox}>
                <Text style={styles.icon}>
                  {item.icon}
                </Text>
              </View>

              <View style={styles.details}>
                <Text style={styles.name}>
                  {item.name}
                </Text>

                <Text style={styles.type}>
                  {item.type}
                </Text>
              </View>

              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
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

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#172554",
  },

  subtitle: {
    fontSize: 15,
    color: "#64748B",
    marginTop: 6,
    marginBottom: 20,
  },

  searchBox: {
    height: 56,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    elevation: 2,
  },

  searchIcon: {
    fontSize: 19,
    marginRight: 10,
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: "#1E293B",
  },

  clear: {
    fontSize: 17,
    color: "#64748B",
    padding: 5,
  },

  popularTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#172554",
    marginTop: 25,
    marginBottom: 13,
  },

  results: {
    marginTop: 20,
  },

  resultCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 13,
    backgroundColor: "#EAF2FF",
    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    fontSize: 27,
  },

  details: {
    flex: 1,
    marginLeft: 14,
  },

  name: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1E293B",
  },

  type: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 4,
  },

  arrow: {
    fontSize: 21,
    color: "#2563EB",
    fontWeight: "700",
  },

  noResults: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 30,
    alignItems: "center",
    marginTop: 25,
  },

  noResultsIcon: {
    fontSize: 40,
    marginBottom: 12,
  },

  noResultsTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#172554",
  },

  noResultsText: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 20,
    marginTop: 7,
  },
});