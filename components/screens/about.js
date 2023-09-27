import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import { COLORS, icons, images, SIZES } from "../../constants";
import { FontAwesome } from "@expo/vector-icons"; // Import the icon library you're using
import { Stack } from "expo-router";
import { ScreenHeaderBtn } from "../../components";

const AboutScreen = ({ navigation }) => {
  const handleChatPress = () => {
    navigation.navigate("Chat");
  };

  const handleJobsPress = () => {
    navigation.navigate("Home");
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension='60%' />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimension='100%' />
          ),
          headerTitle: "",
        }}
      />

      <View style={styles.header}>
        <Text style={styles.title}>Welcome to the Cybersecurity Assistant</Text>
        <Text style={styles.subtitle}>
          Your Digital Companion for Cybersecurity
        </Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>What We Offer:</Text>
        <Text style={styles.infoText}>
          - Real-time cybersecurity information and advice.
        </Text>
        <Text style={styles.infoText}>
          - Instant answers to your cybersecurity questions.
        </Text>
        <Text style={styles.infoText}>
          - Chat with cybersecurity experts 24/7.
        </Text>
        <Text style={styles.infoText}>
          - Stay updated with the latest security threats and solutions.
        </Text>
        <Text style={styles.infoText}>
          - Stay updated with the latest opening jobs in IT world{" "}
          <TouchableOpacity style={styles.jobsButton} onPress={handleJobsPress}>
            <View style={{ marginLeft: 5, marginRight: 10 }}>
              <FontAwesome name="linkedin" size={28} color={COLORS.primary} />
            </View>
          </TouchableOpacity>
        </Text>
        <Image
          source={{
            uri: "https://www.simplilearn.com/ice9/free_resources_article_thumb/Top_Cybersecurity_Projects.jpg",
          }}
          resizeMode="contain"
          style={styles.image}
        />
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.chatButton} onPress={handleChatPress}>
          <FontAwesome
            name="comments"
            size={SIZES.iconSize}
            color={COLORS.white}
          />
          <Text style={styles.chatButtonText}>Start Chatting</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: COLORS.lightWhite,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: COLORS.primary,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: COLORS.secondary,
  },
  infoSection: {
    marginTop: 30,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: COLORS.primary,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
    color: COLORS.secondary,
  },
  chatButton: {
    backgroundColor: COLORS.tertiary,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 10,
    alignItems: "center",
  },
  jobsButton: {
    backgroundColor: COLORS.tertiary,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    borderColor: COLORS.primary,
  },
  chatButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  image: {
    alignItems: "center",
    width: "90%",
    height: 200,
    marginBottom: 20,
  },
});
