import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialIcons, Ionicons, Feather, EvilIcons } from "@expo/vector-icons";
import MoreOptionsModal from "./Modal/MoreOption";
import { supabase } from "../../supabase";
import { AuthContext } from "../../context/AuthContex";

const ChatScreen = () => {
  const { user } = useLocalSearchParams();
  const router = useRouter();
  const parsedUser = user ? JSON.parse(user) : null;

  const [messages, setMessages] = useState([

  ]);
  const [messageInput, setMessageInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  //  const [messages, setMessages] = useState([])
  const { userDetails } = useContext(AuthContext);
  useEffect(() => {
    const changeRead = async () => {
      const { error } = await supabase
        .from("messages")
        .update({ read: true })
        .eq("read", false); // Only update rows where read is false

      if (error) {
        console.error("Failed to update read status:", error);
      }
    };
    const getMessages = async () => {
      const { data } = await supabase
        .from("messages")
        .select()
        .or(
          `sender_id.eq.${userDetails?.id},receiver_id.eq.${userDetails?.id}`
        );
      // .eq('sender', 'admin')
      
      setMessages(data);
    };
    changeRead();
    getMessages();
  }, []);
  useEffect(() => {
    if (!userDetails) {
      return;
    }
    const channel = supabase.channel("chat");
    console.log("eer");
    channel
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          console.log(payload);
          console.log("message");
          const newMessage = payload.new;

          if (newMessage.receiver_id == userDetails.id) {
            setMessages((prev) => [...prev, newMessage]);
          } else if (newMessage.sender_id == userDetails.id) {
            setMessages((prev) => [...prev, newMessage]);
          }
        }
      )
      .subscribe((status) => {
        console.log("subscribed", status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const sendMessage = async () => {
    if (messageInput.trim()) {
      const { data, error } = await supabase
        .from("messages")
        .insert({
          sender_id: userDetails.id,
          sender: userDetails.name,
          content: messageInput,
          receiver_id:2,
        })
        .single();

      if (error) {
        return Alert.alert("Error", "Error sending message");
      }
      // const newMessage = {
      //   id: `${messages.length + 1}`,
      //   text: messageInput,
      //   sender: "me",
      //   time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      // };
      // setMessages([...messages, newMessage]);
      setMessageInput("");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back-ios" size={18} color="black" />
        </TouchableOpacity>
        {parsedUser?.image && (
         <EvilIcons name="user" size={50} color="black" />
        )}

        <View style={styles.userDetails}>
          <Text style={styles.userName}>{parsedUser?.name || "Unknown"}</Text>
          <Text
            style={{
              fontFamily: "montserratMeduim",
              color: parsedUser?.isOnline ? "#0D9488" : "gray",
              fontSize: 12,
              fontWeight: 500,
            }}
          >
            {parsedUser?.isOnline ? "Online" : "Offline"}
          </Text>
        </View>

        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Feather name="more-vertical" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Chat Messages */}

      <FlatList
        data={messages}
        keyExtractor={(item) => item?.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.chatBubble,
              {
                alignSelf:
                  item?.sender_id === userDetails?.id
                    ? "flex-end"
                    : "flex-start",
                backgroundColor:
                  item?.sender_id === userDetails?.id ? "#F1F5F9" : "#8A2BE2",
              },
            ]}
          >
            <Text
              style={{
                color: item?.sender_id === userDetails?.id ? "#000" : "#000",
              }}
            >
              {item?.content}
            </Text>
            <Text style={styles.timestamp}>
              {new Date(item?.created_at).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      {/* Message Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={messageInput}
          onChangeText={setMessageInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <MaterialIcons name="send" size={24} color="#8A2BE2" />
        </TouchableOpacity>
      </KeyboardAvoidingView>

      {/* Modal */}
      <MoreOptionsModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E2E8F0" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    paddingTop: 40,
    backgroundColor: "#fff",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  userDetails: { flex: 1 },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "montserratMeduim",
  },
  chatBubble: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    margin: 5,
    width: "60%",
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  timestamp: {
    fontSize: 10,
    color: "gray",
    marginTop: 2,
    alignSelf: "flex-end",
    fontFamily: "montserratMeduim",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  input: { flex: 1, padding: 10, borderRadius: 10, backgroundColor: "#fff" },
  sendButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
  },
});

export default ChatScreen;
