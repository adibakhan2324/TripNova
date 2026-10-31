import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BottomNav from "../components/BottomNav";

type DestinationData = {
  country: string;
  emoji: string;
  description: string;
  rating: string;
  weather: string;
  budget: string;
  bestTime: string;
  highlights: string[];
};

const destinationInfo: Record<string, DestinationData> = {
  Paris: {
    country: "France",
    emoji: "🗼",
    description:
      "Paris is famous for its beautiful architecture, art, culture, food and unforgettable experiences.",
    rating: "4.8",
    weather: "18°C",
    budget: "₹8,000/day",
    bestTime: "Apr – Jun",
    highlights: [
      "Eiffel Tower",
      "Louvre Museum",
      "Seine River",
      "Notre-Dame",
    ],
  },

  Dubai: {
    country: "UAE",
    emoji: "🏙️",
    description:
      "Dubai is a modern destination known for luxury, shopping, beaches, amazing architecture and exciting experiences.",
    rating: "4.7",
    weather: "31°C",
    budget: "₹12,000/day",
    bestTime: "Nov – Mar",
    highlights: [
      "Burj Khalifa",
      "Dubai Mall",
      "Palm Jumeirah",
      "Dubai Marina",
    ],
  },

  Bali: {
    country: "Indonesia",
    emoji: "🌴",
    description:
      "Bali is a tropical destination known for beaches, temples, nature, culture and relaxing experiences.",
    rating: "4.8",
    weather: "27°C",
    budget: "₹5,000/day",
    bestTime: "Apr – Oct",
    highlights: [
      "Ubud",
      "Kuta Beach",
      "Tanah Lot",
      "Tegallalang",
    ],
  },

  London: {
    country: "United Kingdom",
    emoji: "🇬🇧",
    description:
      "London combines history, culture, iconic landmarks, shopping and world-class entertainment.",
    rating: "4.6",
    weather: "15°C",
    budget: "₹10,000/day",
    bestTime: "May – Sep",
    highlights: [
      "Big Ben",
      "London Eye",
      "Tower Bridge",
      "Buckingham Palace",
    ],
  },

  Switzerland: {
    country: "Europe",
    emoji: "🏔️",
    description:
      "Switzerland is known for spectacular mountains, beautiful lakes, charming towns and scenic train journeys.",
    rating: "4.9",
    weather: "12°C",
    budget: "₹15,000/day",
    bestTime: "Jun – Sep",
    highlights: [
      "Swiss Alps",
      "Interlaken",
      "Zermatt",
      "Lake Geneva",
    ],
  },

  "New York": {
    country: "USA",
    emoji: "🗽",
    description:
      "New York is a vibrant city famous for iconic landmarks, entertainment, food, shopping and culture.",
    rating: "4.7",
    weather: "20°C",
    budget: "₹13,000/day",
    bestTime: "Apr – Jun",
    highlights: [
      "Statue of Liberty",
      "Times Square",
      "Central Park",
      "Brooklyn Bridge",
    ],
  },
};

export default function DestinationDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const destinationName =
    typeof params.name === "string"
      ? params.name
      : "Dubai";

  const destination =
    destinationInfo[destinationName] ||
    destinationInfo.Dubai;

  const [isFavorite, setIsFavorite] = useState(false);

  /*
   * Check if this destination was already marked favorite.
   * This uses the same favorites utility used by the
   * Hotels and Restaurants screens.
   */
  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const favoritesModule = await import("../utils/favorites");

        const favorites = await favoritesModule.getFavorites();

        const exists = favorites.some(
          (item: any) =>
            item?.name === destinationName
        );

        setIsFavorite(exists);
      } catch (error) {
        // Favorites utility may not contain destinations yet.
        setIsFavorite(false);
      }
    };

    checkFavorite();
  }, [destinationName]);

  const toggleDestinationFavorite = async () => {
    try {
      const favoritesModule = await import("../utils/favorites");

      await favoritesModule.toggleFavorite({
        id: `destination-${destinationName}`,
        name: destinationName,
        type: "Destination",
      });

      setIsFavorite((previous) => !previous);
    } catch (error) {
      setIsFavorite((previous) => !previous);
    }
  };

  return (
    <View style={styles.screen}>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {/* =========================
            HEADER
           ========================= */}

        <View style={styles.header}>

          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Text style={styles.headerButtonText}>
              ←
            </Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Destination
          </Text>

          <TouchableOpacity
            style={styles.headerButton}
            onPress={toggleDestinationFavorite}
            activeOpacity={0.8}
          >
            <Text style={styles.favoriteIcon}>
              {isFavorite ? "❤️" : "🤍"}
            </Text>
          </TouchableOpacity>

        </View>

        {/* =========================
            DESTINATION HERO
           ========================= */}

        <View style={styles.hero}>

          <View style={styles.heroCircleOne} />
          <View style={styles.heroCircleTwo} />

          <Text style={styles.heroEmoji}>
            {destination.emoji}
          </Text>

          <Text style={styles.destinationName}>
            {destinationName}
          </Text>

          <Text style={styles.country}>
            {destination.country}
          </Text>

          <View style={styles.ratingBox}>

            <Text style={styles.star}>
              ⭐
            </Text>

            <Text style={styles.ratingText}>
              {destination.rating}
            </Text>

            <Text style={styles.ratingLabel}>
              / 5
            </Text>

          </View>

        </View>

        {/* =========================
            QUICK INFORMATION
           ========================= */}

        <View style={styles.infoRow}>

          <View style={styles.infoCard}>

            <Text style={styles.infoIcon}>
              🌤️
            </Text>

            <Text style={styles.infoValue}>
              {destination.weather}
            </Text>

            <Text style={styles.infoLabel}>
              Weather
            </Text>

          </View>

          <View style={styles.infoCard}>

            <Text style={styles.infoIcon}>
              💰
            </Text>

            <Text style={styles.infoValue}>
              {destination.budget}
            </Text>

            <Text style={styles.infoLabel}>
              Estimated
            </Text>

          </View>

          <View style={styles.infoCard}>

            <Text style={styles.infoIcon}>
              📅
            </Text>

            <Text style={styles.infoValue}>
              {destination.bestTime}
            </Text>

            <Text style={styles.infoLabel}>
              Best Time
            </Text>

          </View>

        </View>

        {/* =========================
            ABOUT
           ========================= */}

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            About {destinationName}
          </Text>

          <Text style={styles.description}>
            {destination.description}
          </Text>

        </View>

        {/* =========================
            TOP HIGHLIGHTS
           ========================= */}

        <View style={styles.sectionHeader}>

          <View>
            <Text style={styles.sectionTitle}>
              Top Highlights
            </Text>

            <Text style={styles.sectionSubtitle}>
              Places you shouldn't miss
            </Text>
          </View>

        </View>

        <View style={styles.highlightGrid}>

          {destination.highlights.map(
            (highlight, index) => (

              <View
                key={highlight}
                style={styles.highlightCard}
              >

                <View style={styles.highlightNumber}>
                  <Text style={styles.highlightNumberText}>
                    {index + 1}
                  </Text>
                </View>

                <Text style={styles.highlightIcon}>
                  {index === 0
                    ? "📍"
                    : index === 1
                    ? "⭐"
                    : index === 2
                    ? "🌟"
                    : "✨"}
                </Text>

                <Text style={styles.highlightText}>
                  {highlight}
                </Text>

              </View>

            )
          )}

        </View>

        {/* =========================
            EXPLORE OPTIONS
           ========================= */}

        <Text style={styles.sectionTitle}>
          Explore {destinationName}
        </Text>

        {/* HOTELS */}

        <TouchableOpacity
          style={styles.optionCard}
          onPress={() => router.push("/hotels")}
          activeOpacity={0.8}
        >

          <View style={styles.optionIconBox}>
            <Text style={styles.optionIcon}>
              🏨
            </Text>
          </View>

          <View style={styles.optionInfo}>

            <Text style={styles.optionTitle}>
              Hotels
            </Text>

            <Text style={styles.optionText}>
              Find comfortable places to stay
            </Text>

          </View>

          <Text style={styles.arrow}>
            →
          </Text>

        </TouchableOpacity>

        {/* RESTAURANTS */}

        <TouchableOpacity
          style={styles.optionCard}
          onPress={() => router.push("/restaurants")}
          activeOpacity={0.8}
        >

          <View style={styles.optionIconBox}>
            <Text style={styles.optionIcon}>
              🍽️
            </Text>
          </View>

          <View style={styles.optionInfo}>

            <Text style={styles.optionTitle}>
              Restaurants
            </Text>

            <Text style={styles.optionText}>
              Discover places to eat
            </Text>

          </View>

          <Text style={styles.arrow}>
            →
          </Text>

        </TouchableOpacity>

        {/* =========================
            PLAN TRIP
           ========================= */}

        <TouchableOpacity
          style={styles.planButton}
          onPress={() => router.push("/trip-planner")}
          activeOpacity={0.85}
        >

          <View style={styles.planIconBox}>
            <Text style={styles.planIcon}>
              🗺️
            </Text>
          </View>

          <View style={styles.planInfo}>

            <Text style={styles.planTitle}>
              Plan a Trip
            </Text>

            <Text style={styles.planText}>
              Create your {destinationName} itinerary
            </Text>

          </View>

          <Text style={styles.planArrow}>
            →
          </Text>

        </TouchableOpacity>

        {/* =========================
            FAVORITE BUTTON
           ========================= */}

        <TouchableOpacity
          style={[
            styles.favoriteButton,
            isFavorite && styles.favoriteButtonActive,
          ]}
          onPress={toggleDestinationFavorite}
          activeOpacity={0.85}
        >

          <Text style={styles.favoriteButtonIcon}>
            {isFavorite ? "❤️" : "🤍"}
          </Text>

          <Text
            style={[
              styles.favoriteButtonText,
              isFavorite &&
                styles.favoriteButtonTextActive,
            ]}
          >
            {isFavorite
              ? "Saved to Favorites"
              : "Save Destination"}
          </Text>

        </TouchableOpacity>

        {/* =========================
            FOOTER
           ========================= */}

        <View style={styles.footer}>

          <Text style={styles.footerLogo}>
            ✈️ TripNova
          </Text>

          <Text style={styles.footerText}>
            Discover. Plan. Travel.
          </Text>

        </View>

      </ScrollView>

      {/* =========================
          BOTTOM NAVIGATION
         ========================= */}

      <BottomNav />

    </View>
  );
}

const styles = StyleSheet.create({

  screen: {
    flex: 1,
    backgroundColor: "#F6F8FC",
  },

  scroll: {
    flex: 1,
  },

  content: {
    padding: 20,
    paddingBottom: 125,
  },

  /* HEADER */

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 18,
  },

  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },

  headerButtonText: {
    fontSize: 25,
    fontWeight: "800",
    color: "#172554",
  },

  favoriteIcon: {
    fontSize: 20,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#172554",
  },

  /* HERO */

  hero: {
    backgroundColor: "#2563EB",
    borderRadius: 27,
    minHeight: 270,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    position: "relative",
    marginBottom: 15,
  },

  heroCircleOne: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#3B82F6",
    right: -65,
    top: -55,
    opacity: 0.6,
  },

  heroCircleTwo: {
    position: "absolute",
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "#60A5FA",
    left: -45,
    bottom: -35,
    opacity: 0.4,
  },

  heroEmoji: {
    fontSize: 75,
  },

  destinationName: {
    fontSize: 31,
    fontWeight: "900",
    color: "#FFFFFF",
    marginTop: 8,
  },

  country: {
    fontSize: 14,
    color: "#DBEAFE",
    marginTop: 3,
  },

  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 12,
  },

  star: {
    fontSize: 14,
  },

  ratingText: {
    fontSize: 13,
    fontWeight: "900",
    color: "#172554",
    marginLeft: 5,
  },

  ratingLabel: {
    fontSize: 11,
    color: "#64748B",
    marginLeft: 2,
  },

  /* INFO */

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  infoCard: {
    width: "31.5%",
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    paddingVertical: 14,
    alignItems: "center",
    elevation: 2,
  },

  infoIcon: {
    fontSize: 21,
    marginBottom: 6,
  },

  infoValue: {
    fontSize: 11,
    fontWeight: "900",
    color: "#1E293B",
    textAlign: "center",
  },

  infoLabel: {
    fontSize: 9,
    color: "#94A3B8",
    marginTop: 3,
  },

  /* SECTION */

  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 19,
    padding: 19,
    marginBottom: 22,
    elevation: 2,
  },

  sectionHeader: {
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "900",
    color: "#172554",
  },

  sectionSubtitle: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 4,
  },

  description: {
    fontSize: 13,
    lineHeight: 21,
    color: "#64748B",
    marginTop: 8,
  },

  /* HIGHLIGHTS */

  highlightGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  highlightCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    padding: 15,
    marginBottom: 11,
    elevation: 2,
    position: "relative",
  },

  highlightNumber: {
    position: "absolute",
    right: 10,
    top: 10,
    width: 23,
    height: 23,
    borderRadius: 12,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
  },

  highlightNumberText: {
    fontSize: 10,
    fontWeight: "900",
    color: "#2563EB",
  },

  highlightIcon: {
    fontSize: 23,
    marginBottom: 8,
  },

  highlightText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#1E293B",
    paddingRight: 20,
  },

  /* OPTIONS */

  optionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 11,
    elevation: 2,
  },

  optionIconBox: {
    width: 53,
    height: 53,
    borderRadius: 15,
    backgroundColor: "#EAF2FF",
    alignItems: "center",
    justifyContent: "center",
  },

  optionIcon: {
    fontSize: 26,
  },

  optionInfo: {
    flex: 1,
    marginLeft: 13,
  },

  optionTitle: {
    fontSize: 15,
    fontWeight: "900",
    color: "#1E293B",
  },

  optionText: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 3,
  },

  arrow: {
    fontSize: 22,
    color: "#2563EB",
    fontWeight: "800",
  },

  /* PLAN */

  planButton: {
    backgroundColor: "#172554",
    borderRadius: 19,
    minHeight: 70,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },

  planIconBox: {
    width: 47,
    height: 47,
    borderRadius: 14,
    backgroundColor: "#263B6A",
    alignItems: "center",
    justifyContent: "center",
  },

  planIcon: {
    fontSize: 24,
  },

  planInfo: {
    flex: 1,
    marginLeft: 12,
  },

  planTitle: {
    fontSize: 15,
    fontWeight: "900",
    color: "#FFFFFF",
  },

  planText: {
    fontSize: 10,
    color: "#CBD5E1",
    marginTop: 3,
  },

  planArrow: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "800",
  },

  /* FAVORITE */

  favoriteButton: {
    height: 53,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 11,
  },

  favoriteButtonActive: {
    backgroundColor: "#FFF1F2",
    borderColor: "#FDA4AF",
  },

  favoriteButtonIcon: {
    fontSize: 19,
    marginRight: 8,
  },

  favoriteButtonText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#475569",
  },

  favoriteButtonTextActive: {
    color: "#E11D48",
  },

  /* FOOTER */

  footer: {
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    paddingTop: 20,
    marginTop: 22,
  },

  footerLogo: {
    fontSize: 17,
    fontWeight: "900",
    color: "#172554",
  },

  footerText: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 4,
  },

});