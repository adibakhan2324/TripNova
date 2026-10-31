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
import BottomNav from "../components/BottomNav";

type Destination = {
  id: number;
  name: string;
  country: string;
  emoji: string;
};

const destinations: Destination[] = [
  {
    id: 1,
    name: "Paris",
    country: "France",
    emoji: "🗼",
  },
  {
    id: 2,
    name: "Dubai",
    country: "UAE",
    emoji: "🏙️",
  },
  {
    id: 3,
    name: "Bali",
    country: "Indonesia",
    emoji: "🌴",
  },
  {
    id: 4,
    name: "London",
    country: "United Kingdom",
    emoji: "🇬🇧",
  },
  {
    id: 5,
    name: "Switzerland",
    country: "Europe",
    emoji: "🏔️",
  },
  {
    id: 6,
    name: "New York",
    country: "USA",
    emoji: "🗽",
  },
];

export default function Home() {
  const router = useRouter();

  const [search, setSearch] = useState("");

  // =========================
  // SEARCH DESTINATIONS
  // =========================
  const filteredDestinations = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return destinations;
    }

    return destinations.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.country.toLowerCase().includes(query)
    );
  }, [search]);

  // =========================
  // OPEN DESTINATION DETAILS
  // =========================
  const openDestination = (destination: Destination) => {
    router.push({
      pathname: "/destination-details",
      params: {
        name: destination.name,
      },
    });
  };

  return (
    <View style={styles.screen}>

      {/* =========================
          MAIN SCROLL
         ========================= */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {/* =========================
            HEADER
           ========================= */}
        <View style={styles.header}>

          <View>
            <Text style={styles.smallGreeting}>
              Welcome back 👋
            </Text>

            <Text style={styles.logo}>
              TripNova
            </Text>

            <Text style={styles.tagline}>
              Your Travel Companion
            </Text>
          </View>

          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => router.push("/profile")}
            activeOpacity={0.8}
          >
            <Text style={styles.profileIcon}>
              👤
            </Text>
          </TouchableOpacity>

        </View>

        {/* =========================
            HERO SECTION
           ========================= */}
        <View style={styles.heroCard}>

          <View style={styles.heroContent}>

            <Text style={styles.heroSmall}>
              PLAN • EXPLORE • TRAVEL
            </Text>

            <Text style={styles.heroTitle}>
              Your next adventure
              {"\n"}
              starts here ✈️
            </Text>

            <Text style={styles.heroText}>
              Discover amazing places and create
              personalized travel plans.
            </Text>

            <TouchableOpacity
              style={styles.heroButton}
              onPress={() => router.push("/trip-planner")}
              activeOpacity={0.85}
            >
              <Text style={styles.heroButtonText}>
                Create My Trip
              </Text>

              <Text style={styles.heroArrow}>
                →
              </Text>
            </TouchableOpacity>

          </View>

          <Text style={styles.heroEmoji}>
            🌍
          </Text>

        </View>

        {/* =========================
            SEARCH
           ========================= */}
        <View style={styles.searchContainer}>

          <Text style={styles.searchIcon}>
            🔍
          </Text>

          <TextInput
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
            placeholder="Search destinations..."
            placeholderTextColor="#94A3B8"
          />

          {search.length > 0 && (
            <TouchableOpacity
              style={styles.clearSearch}
              onPress={() => setSearch("")}
              activeOpacity={0.7}
            >
              <Text style={styles.clearSearchText}>
                ✕
              </Text>
            </TouchableOpacity>
          )}

        </View>

        {/* =========================
            QUICK ACTIONS
           ========================= */}
        <View style={styles.quickRow}>

          {/* HOTELS */}
          <TouchableOpacity
            style={styles.quickCard}
            onPress={() => router.push("/hotels")}
            activeOpacity={0.8}
          >
            <Text style={styles.quickEmoji}>
              🏨
            </Text>

            <Text style={styles.quickTitle}>
              Hotels
            </Text>

            <Text style={styles.quickText}>
              Find stays
            </Text>
          </TouchableOpacity>

          {/* RESTAURANTS */}
          <TouchableOpacity
            style={styles.quickCard}
            onPress={() => router.push("/restaurants")}
            activeOpacity={0.8}
          >
            <Text style={styles.quickEmoji}>
              🍽️
            </Text>

            <Text style={styles.quickTitle}>
              Restaurants
            </Text>

            <Text style={styles.quickText}>
              Find food
            </Text>
          </TouchableOpacity>

          {/* MY TRIPS */}
          <TouchableOpacity
            style={styles.quickCard}
            onPress={() => router.push("/my-trips")}
            activeOpacity={0.8}
          >
            <Text style={styles.quickEmoji}>
              🗺️
            </Text>

            <Text style={styles.quickTitle}>
              My Trips
            </Text>

            <Text style={styles.quickText}>
              Your plans
            </Text>
          </TouchableOpacity>

        </View>

        {/* =========================
            POPULAR DESTINATIONS
           ========================= */}
        <View style={styles.sectionHeader}>

          <View>
            <Text style={styles.sectionTitle}>
              Popular Destinations
            </Text>

            <Text style={styles.sectionSubtitle}>
              Explore places around the world
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => setSearch("")}
            activeOpacity={0.7}
          >
            <Text style={styles.seeAll}>
              Explore
            </Text>
          </TouchableOpacity>

        </View>

        {/* DESTINATION CARDS */}

        {filteredDestinations.length === 0 ? (

          <View style={styles.noResults}>

            <Text style={styles.noResultsEmoji}>
              🔍
            </Text>

            <Text style={styles.noResultsTitle}>
              No destinations found
            </Text>

            <Text style={styles.noResultsText}>
              Try searching for another destination.
            </Text>

          </View>

        ) : (

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.destinationScroll}
          >

            {filteredDestinations.map(
              (destination) => (

                <TouchableOpacity
                  key={destination.id}
                  style={styles.destinationCard}
                  onPress={() =>
                    openDestination(destination)
                  }
                  activeOpacity={0.85}
                >

                  {/* DESTINATION IMAGE */}
                  <View style={styles.destinationImage}>

                    <Text style={styles.destinationEmoji}>
                      {destination.emoji}
                    </Text>

                  </View>

                  {/* NAME */}
                  <Text style={styles.destinationName}>
                    {destination.name}
                  </Text>

                  {/* COUNTRY */}
                  <Text style={styles.destinationCountry}>
                    {destination.country}
                  </Text>

                  {/* EXPLORE */}
                  <View style={styles.destinationBottom}>

                    <Text style={styles.exploreText}>
                      Explore
                    </Text>

                    <Text style={styles.destinationArrow}>
                      →
                    </Text>

                  </View>

                </TouchableOpacity>
              )
            )}

          </ScrollView>
        )}

        {/* =========================
            YOUR TRAVEL PLANS
           ========================= */}
        <View style={styles.tripSectionHeader}>

          <View>
            <Text style={styles.sectionTitle}>
              Your Travel Plans
            </Text>

            <Text style={styles.sectionSubtitle}>
              Continue planning your next adventure
            </Text>
          </View>

        </View>

        <TouchableOpacity
          style={styles.myTripCard}
          onPress={() => router.push("/my-trips")}
          activeOpacity={0.85}
        >

          <View style={styles.myTripIconBox}>
            <Text style={styles.myTripIcon}>
              🧳
            </Text>
          </View>

          <View style={styles.myTripInfo}>

            <Text style={styles.myTripTitle}>
              My Trips
            </Text>

            <Text style={styles.myTripText}>
              View your saved and planned trips
            </Text>

          </View>

          <View style={styles.myTripArrowBox}>
            <Text style={styles.myTripArrow}>
              →
            </Text>
          </View>

        </TouchableOpacity>

        {/* =========================
            EXPLORE TRIPNOVA
           ========================= */}
        <View style={styles.exploreSection}>

          <Text style={styles.exploreIcon}>
            ✈️
          </Text>

          <Text style={styles.exploreTitle}>
            Explore TripNova
          </Text>

          <Text style={styles.exploreDescription}>
            Discover destinations, hotels, restaurants
            and create unforgettable travel experiences.
          </Text>

          <View style={styles.exploreButtons}>

            {/* PLAN A TRIP */}
            <TouchableOpacity
              style={styles.explorePrimary}
              onPress={() => router.push("/trip-planner")}
              activeOpacity={0.85}
            >
              <Text style={styles.explorePrimaryText}>
                Plan a Trip
              </Text>
            </TouchableOpacity>

            {/* FAVORITES */}
            <TouchableOpacity
              style={styles.exploreSecondary}
              onPress={() => router.push("/favorites")}
              activeOpacity={0.85}
            >
              <Text style={styles.exploreSecondaryText}>
                ❤️ Favorites
              </Text>
            </TouchableOpacity>

          </View>

        </View>

        {/* =========================
            FOOTER
           ========================= */}
        <View style={styles.footer}>

          <Text style={styles.footerLogo}>
            ✈️ TripNova
          </Text>

          <Text style={styles.footerText}>
            Plan smarter. Travel better.
          </Text>

          <Text style={styles.footerVersion}>
            Version 1.0.0
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
    paddingBottom: 115,
  },

  /* =========================
     HEADER
     ========================= */

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 20,
  },

  smallGreeting: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 2,
  },

  logo: {
    fontSize: 28,
    fontWeight: "900",
    color: "#172554",
  },

  tagline: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 2,
  },

  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },

  profileIcon: {
    fontSize: 23,
  },

  /* =========================
     HERO
     ========================= */

  heroCard: {
    backgroundColor: "#2563EB",
    borderRadius: 25,
    padding: 22,
    minHeight: 235,
    overflow: "hidden",
    marginBottom: 18,
  },

  heroContent: {
    width: "75%",
  },

  heroSmall: {
    fontSize: 10,
    fontWeight: "800",
    color: "#BFDBFE",
    letterSpacing: 1,
    marginBottom: 9,
  },

  heroTitle: {
    fontSize: 25,
    lineHeight: 31,
    fontWeight: "900",
    color: "#FFFFFF",
  },

  heroText: {
    fontSize: 12,
    lineHeight: 18,
    color: "#DBEAFE",
    marginTop: 9,
  },

  heroButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 11,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: 16,
  },

  heroButtonText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#2563EB",
  },

  heroArrow: {
    fontSize: 17,
    fontWeight: "800",
    color: "#2563EB",
    marginLeft: 9,
  },

  heroEmoji: {
    position: "absolute",
    right: -5,
    bottom: 8,
    fontSize: 85,
    opacity: 0.25,
  },

  /* =========================
     SEARCH
     ========================= */

  searchContainer: {
    height: 54,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 18,
    elevation: 2,
  },

  searchIcon: {
    fontSize: 19,
    marginRight: 9,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#1E293B",
  },

  clearSearch: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  clearSearchText: {
    fontSize: 15,
    color: "#64748B",
  },

  /* =========================
     QUICK ACTIONS
     ========================= */

  quickRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 27,
  },

  quickCard: {
    width: "31.5%",
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    paddingVertical: 15,
    paddingHorizontal: 8,
    alignItems: "center",
    elevation: 2,
  },

  quickEmoji: {
    fontSize: 25,
    marginBottom: 7,
  },

  quickTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: "#1E293B",
    textAlign: "center",
  },

  quickText: {
    fontSize: 9,
    color: "#94A3B8",
    marginTop: 3,
    textAlign: "center",
  },

  /* =========================
     SECTION
     ========================= */

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 13,
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

  seeAll: {
    fontSize: 12,
    fontWeight: "800",
    color: "#2563EB",
  },

  /* =========================
     DESTINATIONS
     ========================= */

  destinationScroll: {
    paddingBottom: 5,
    paddingRight: 10,
  },

  destinationCard: {
    width: 165,
    backgroundColor: "#FFFFFF",
    borderRadius: 19,
    padding: 10,
    marginRight: 13,
    elevation: 3,
  },

  destinationImage: {
    height: 105,
    borderRadius: 15,
    backgroundColor: "#EAF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  destinationEmoji: {
    fontSize: 55,
  },

  destinationName: {
    fontSize: 15,
    fontWeight: "900",
    color: "#1E293B",
  },

  destinationCountry: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 3,
  },

  destinationBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  exploreText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#2563EB",
  },

  destinationArrow: {
    fontSize: 17,
    color: "#2563EB",
    fontWeight: "800",
  },

  /* =========================
     NO RESULTS
     ========================= */

  noResults: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 30,
    alignItems: "center",
    marginBottom: 25,
  },

  noResultsEmoji: {
    fontSize: 35,
  },

  noResultsTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#172554",
    marginTop: 8,
  },

  noResultsText: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 4,
  },

  /* =========================
     MY TRIPS
     ========================= */

  tripSectionHeader: {
    marginTop: 25,
    marginBottom: 13,
  },

  myTripCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
    marginBottom: 25,
  },

  myTripIconBox: {
    width: 58,
    height: 58,
    borderRadius: 17,
    backgroundColor: "#EAF2FF",
    alignItems: "center",
    justifyContent: "center",
  },

  myTripIcon: {
    fontSize: 29,
  },

  myTripInfo: {
    flex: 1,
    marginLeft: 13,
  },

  myTripTitle: {
    fontSize: 15,
    fontWeight: "900",
    color: "#1E293B",
  },

  myTripText: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 4,
    lineHeight: 16,
  },

  myTripArrowBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
  },

  myTripArrow: {
    fontSize: 18,
    color: "#2563EB",
    fontWeight: "800",
  },

  /* =========================
     EXPLORE TRIPNOVA
     ========================= */

  exploreSection: {
    backgroundColor: "#172554",
    borderRadius: 23,
    padding: 24,
    alignItems: "center",
    marginBottom: 25,
  },

  exploreIcon: {
    fontSize: 34,
  },

  exploreTitle: {
    fontSize: 21,
    fontWeight: "900",
    color: "#FFFFFF",
    marginTop: 8,
  },

  exploreDescription: {
    fontSize: 11,
    lineHeight: 17,
    color: "#CBD5E1",
    textAlign: "center",
    marginTop: 7,
  },

  exploreButtons: {
    width: "100%",
    flexDirection: "row",
    marginTop: 18,
  },

  explorePrimary: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },

  explorePrimaryText: {
    fontSize: 12,
    fontWeight: "900",
    color: "#2563EB",
  },

  exploreSecondary: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#263B6A",
    borderWidth: 1,
    borderColor: "#475A88",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
  },

  exploreSecondaryText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  /* =========================
     FOOTER
     ========================= */

  footer: {
    alignItems: "center",
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    paddingBottom: 15,
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

  footerVersion: {
    fontSize: 9,
    color: "#94A3B8",
    marginTop: 7,
  },

});