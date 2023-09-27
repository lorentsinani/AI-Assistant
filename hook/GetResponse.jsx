import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Image,
} from "react-native";
import React, { useState, useRef } from "react";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons"; // Import the icon library you're using
import { COLORS, icons, images, SIZES, FONT } from "../constants";
import { Stack } from "expo-router";
import { ScreenHeaderBtn } from "../components";

const ChatBot = () => {
  const [data, setData] = useState([]);
  const [textInput, setTextInput] = useState("");
  const componentRef = useRef(null);

  const apiKey = "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";
  const apiUrl =
    "https://api.openai.com/v1/chat/completions";

  const handleSend = async () => {
    if (!textInput.trim()) return;

    try {
      const prompt = textInput;
      const response = await axios.post(
        apiUrl,
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              "role": "system",
              "content": "You are a helpful assistant."
            },
            {
              "role": "user",
              "content": `${prompt}`
            }],
          max_tokens: 1024,
          temperature: 0.5,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      
      const text = response.data.choices[0].message.content;
      setData((prevData) => [
        ...prevData,
        { type: "user", text: textInput },
        { type: "bot", text },
      ]);
      setTextInput("");

      // Force a re-render of the component
      if (componentRef.current) {
        componentRef.current.forceUpdate();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      enabled
    >
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
        <Text style={styles.headerTitle}>Cyber Security Assistant</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          style={styles.body}
          keyboardShouldPersistTaps="always"
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent:
                  item.type === "user" ? "flex-end" : "flex-start",
                paddingHorizontal: 5,
                marginBottom: 10,
              }}
            >
              {item.type === "user" ? (
                // User's message with the icon outside
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={images.profile} // Use your user's icon here
                    style={{ width: 40, height: 40, marginRight: 5 }}
                    resizeMode="contain"
                  />
                  <View
                    style={{
                      backgroundColor: "#007bff",
                      borderRadius: 8,
                      padding: 8,
                      maxWidth: "80%", // Limit the width of user messages
                      marginRight: 15
                    }}
                  >
                    <Text style={{ color: "#fff" }}>{item.text}</Text>
                  </View>
                </View>
              ) : (
                // Bot's response with the icon inside
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={icons.bot} // Use your bot's icon here
                    style={{ width: 40, height: 40, marginRight: 8 }}
                    resizeMode="contain"
                  />
                  <View
                    style={{
                      backgroundColor: "#ccc",
                      borderRadius: 8,
                      padding: 8,
                      maxWidth: "80%", // Limit the width of bot messages
                    }}
                  >
                    <Text style={{ color: "#000" }}>{item.text}</Text>
                  </View>
                </View>
              )}
            </View>
          )}
        />
      </ScrollView>
      <View style={styles.textInputNButton}>
        <TextInput
          style={styles.input}
          value={textInput}
          onChangeText={(text) => setTextInput(text)}
          placeholder="Ask me anything about Cyber Security"
        />
        <TouchableOpacity style={styles.circularButton} onPress={handleSend}>
          <FontAwesome name="telegram" size={50} color={COLORS.tertiary} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatBot;

const styles = StyleSheet.create({
  header: {
    // flexGrow: 1, // Use flex: 1 to make the container take up all available space
    backgroundColor: COLORS.lightWhite,
    alignItems: "center",
    height: "10%",
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
    color: COLORS.primary,
  },
  container: {
    flexGrow: 1, // Use flex: 1 to make the container take up all available space
    backgroundColor: COLORS.lightWhite,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
    marginTop: 10,
    alignItems: "center",
    color: "#bfc0c0",
  },
  body: {
    backgroundColor: COLORS.lightWhite,
    width: "100%", // Use 100% instead of "102%" to ensure it takes full width
    flexGrow: 1, // Allow the body to take up available vertical space
    margin: 10,
    paddingTop: 10, // Add some padding at the top to separate from the title
    paddingBottom: 10, // Add some padding at the bottom for input/button
  },
  bot: {
    fontSize: 16,
    color: COLORS.primary,
    fontFamily: FONT.medium,
  },
  input: {
    flex: 1, // Allow the input to take up available space
    borderWidth: 1,
    borderColor: "#ccc",
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginRight: 10, // Add margin to separate input from button,
    backgroundColor: COLORS.white,
    color: COLORS.secondary,
    fontFamily: FONT.regular,
  },
  button: {
    backgroundColor: "#49d4a1",
    width: "100%",
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  textInputNButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingBottom: 10, // Add some padding to push the text input above the device keyboard
    backgroundColor: COLORS.lightWhite,
  },
  circularButton: {
    backgroundColor: "#007bff",
    borderRadius: 50, // Make it circular by setting borderRadius to half the button's width/height
    width: 50, // Adjust the width and height as needed
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
});
