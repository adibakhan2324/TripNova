import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import BottomNav from "../components/BottomNav";

type NotificationItem = {
  id: number;
  icon: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
};

export default function Notifications() {
  const router = useRouter();

  const [enabled, setEnabled] = useState(true);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 1,
      icon: "✈️",
      title: "Trip Reminder",
      message: "Your upcoming trip is ready. Check your itinerary before travelling.",
      time: "Today",
      read: false,
    },
    {
      id: 2,
      icon: "🏨",
      title: "Hotel Recommendation",
      message: "New hotels are available for your destination.",
      time: "Yesterday",
      read: false,
    },
    {
      id: 3,
      icon: "🍽️",
      title: "Restaurant Suggestion",
      message: "Discover highly rated restaurants near your destination.",
      time: "2 days ago",
      read: true,
    },
    {
      id: 4,
      icon: "🗺️",
      title: "Explore TripNova",
      message: "Discover destinations and create your next trip.",
      time: "3 days ago",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter(
    (item) => !item.read
  ).length;

  const markAsRead = (id: number) => {
    setNotifications((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, read: true }
          : item
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((item) => ({
        ...item,
        read: true,
      }))
    );

    Alert.alert(
      "Done",
      "All notifications have been marked as read."
    );
  };

  const clearNotifications = () => {
    if (notifications.length === 0) {
      Alert.alert(
        "Notifications",
        "There are no notifications to clear."
      );
      return;
    }

    Alert.alert(
      "Clear Notifications",
      "Are you sure you want to clear all notifications?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear",
          style: "destructive",
          onPress: () => {
            setNotifications([]);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.screen}>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {/* HEADER */}
        <View style={styles.header}>

          <View style={styles.headerLeft}>

            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Text style={styles.backIcon}>
                ←
              </Text>
            </TouchableOpacity>

            <View>
              <Text style={styles.headerTitle}>
                Notifications
              </Text>

              {unreadCount > 0 && (
                <Text style={styles.unreadText}>
                  {unreadCount} unread notification
                  {unreadCount > 1 ? "s" : ""}
                </Text>
              )}
            </View>

          </View>

          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => router.push("/home")}
          >
            <Text style={styles.homeIcon}>
              🏠
            </Text>
          </TouchableOpacity>

        </View>

        {/* NOTIFICATION SETTING */}
        <View style={styles.settingCard}>

          <View style={styles.settingIconBox}>
            <Text style={styles.settingIcon}>
              🔔
            </Text>
          </View>

          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>
              Travel Notifications
            </Text>

            <Text style={styles.settingDescription}>
              Receive reminders and travel updates
            </Text>
          </View>

          <Switch
            value={enabled}
            onValueChange={setEnabled}
            trackColor={{
              false: "#CBD5E1",
              true: "#93C5FD",
            }}
            thumbColor={
              enabled ? "#2563EB" : "#F8FAFC"
            }
          />

        </View>

        {/* ACTIONS */}
        {notifications.length > 0 && (
          <View style={styles.actionRow}>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={markAllAsRead}
            >
              <Text style={styles.actionText}>
                ✓ Mark all read
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.clearButton}
              onPress={clearNotifications}
            >
              <Text style={styles.clearText}>
                Clear all
              </Text>
            </TouchableOpacity>

          </View>
        )}

        {/* NOTIFICATION TITLE */}
        <View style={styles.titleRow}>
          <Text style={styles.sectionTitle}>
            Recent Notifications
          </Text>

          {notifications.length > 0 && (
            <Text style={styles.count}>
              {notifications.length}
            </Text>
          )}
        </View>

        {/* NOTIFICATIONS */}
        {notifications.length === 0 ? (

          <View style={styles.emptyCard}>

            <Text style={styles.emptyIcon}>
              🔔
            </Text>

            <Text style={styles.emptyTitle}>
              No Notifications
            </Text>

            <Text style={styles.emptyText}>
              You're all caught up!
            </Text>

            <TouchableOpacity
              style={styles.exploreButton}
              onPress={() => router.push("/home")}
            >
              <Text style={styles.exploreButtonText}>
                Explore TripNova
              </Text>
            </TouchableOpacity>

          </View>

        ) : (

          notifications.map((item) => (

            <TouchableOpacity
              key={item.id}
              style={[
                styles.notificationCard,
                !item.read && styles.unreadCard,
              ]}
              activeOpacity={0.75}
              onPress={() => markAsRead(item.id)}
            >

              <View style={styles.notificationIconBox}>
                <Text style={styles.notificationIcon}>
                  {item.icon}
                </Text>
              </View>

              <View style={styles.notificationInfo}>

                <View style={styles.notificationTitleRow}>

                  <Text style={styles.notificationTitle}>
                    {item.title}
                  </Text>

                  {!item.read && (
                    <View style={styles.unreadDot} />
                  )}

                </View>

                <Text style={styles.notificationMessage}>
                  {item.message}
                </Text>

                <Text style={styles.notificationTime}>
                  {item.time}
                </Text>

              </View>

            </TouchableOpacity>

          ))

        )}

        {/* FOOTER */}
        <View style={styles.footer}>

          <Text style={styles.footerIcon}>
            ✈️
          </Text>

          <Text style={styles.footerTitle}>
            TripNova
          </Text>

          <Text style={styles.footerText}>
            Your Travel Companion
          </Text>

          <Text style={styles.version}>
            Version 1.0.0
          </Text>

        </View>

      </ScrollView>

      {/* BOTTOM NAVIGATION */}
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
    paddingBottom: 110,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 20,
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    elevation: 3,
  },

  backIcon: {
    fontSize: 25,
    color: "#172554",
    fontWeight: "700",
  },

  headerTitle: {
    fontSize: 25,
    fontWeight: "800",
    color: "#172554",
  },

  unreadText: {
    fontSize: 11,
    color: "#2563EB",
    marginTop: 3,
    fontWeight: "600",
  },

  homeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },

  homeIcon: {
    fontSize: 20,
  },

  settingCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    elevation: 3,
  },

  settingIconBox: {
    width: 53,
    height: 53,
    borderRadius: 15,
    backgroundColor: "#EAF2FF",
    alignItems: "center",
    justifyContent: "center",
  },

  settingIcon: {
    fontSize: 26,
  },

  settingInfo: {
    flex: 1,
    marginLeft: 13,
    marginRight: 8,
  },

  settingTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1E293B",
  },

  settingDescription: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 4,
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 22,
  },

  actionButton: {
    flex: 1,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#EAF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },

  actionText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#2563EB",
  },

  clearButton: {
    flex: 1,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#FECACA",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
  },

  clearText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#DC2626",
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#172554",
  },

  count: {
    minWidth: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: "#2563EB",
    color: "#FFFFFF",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 12,
    fontWeight: "800",
    marginLeft: 9,
    paddingTop: 5,
  },

  notificationCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 15,
    flexDirection: "row",
    marginBottom: 12,
    elevation: 2,
  },

  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#2563EB",
  },

  notificationIconBox: {
    width: 52,
    height: 52,
    borderRadius: 15,
    backgroundColor: "#EAF2FF",
    alignItems: "center",
    justifyContent: "center",
  },

  notificationIcon: {
    fontSize: 25,
  },

  notificationInfo: {
    flex: 1,
    marginLeft: 13,
  },

  notificationTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  notificationTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1E293B",
  },

  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#2563EB",
    marginLeft: 7,
  },

  notificationMessage: {
    fontSize: 12,
    lineHeight: 17,
    color: "#64748B",
    marginTop: 5,
  },

  notificationTime: {
    fontSize: 10,
    color: "#94A3B8",
    marginTop: 6,
  },

  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    elevation: 2,
  },

  emptyIcon: {
    fontSize: 45,
  },

  emptyTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#172554",
    marginTop: 12,
  },

  emptyText: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 5,
  },

  exploreButton: {
    backgroundColor: "#2563EB",
    borderRadius: 12,
    paddingHorizontal: 22,
    paddingVertical: 12,
    marginTop: 18,
  },

  exploreButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },

  footer: {
    alignItems: "center",
    paddingTop: 25,
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    paddingBottom: 15,
  },

  footerIcon: {
    fontSize: 28,
  },

  footerTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#172554",
    marginTop: 5,
  },

  footerText: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 3,
  },

  version: {
    fontSize: 10,
    color: "#94A3B8",
    marginTop: 8,
  },
});