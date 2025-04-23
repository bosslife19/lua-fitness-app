import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // For checkbox icons
import SectionsLogin from "../../../styles/Login/Login.styles";
import { useRequest } from "../../../hooks/useRequest";

export default function PhysicalActivity({ onNext }) {
  const [answers, setAnswers] = useState({});

  const questions = [
    "Has your doctor ever said that you have a heart condition or high blood pressure?",
    "Do you feel pain in your chest at rest, during daily activities, or when you do physical activity?",
    "Do you lose balance because of dizziness or have you lost consciousness in the last 12 months?",
    "Have you ever been diagnosed with another chronic medical condition (other than heart disease or high blood pressure)?",
    "Are you currently taking prescribed medications for a chronic medical condition?",
    "Do you currently have (or have had within the past 12 months) a bone, joint or soft tissue (muscle, ligament, or tendon) problem that could be made worse by becoming more physically active?",
    "Has your doctor ever said that you should only do medically supervised physical activity?",
  ];
  const { makeRequest } = useRequest();
  const handleAnswer = (question, answer) => {
    setAnswers((prev) => ({ ...prev, [question]: answer }));
  };

  const handleNext = async () => {
    const { response } = await makeRequest("/register/questionnaire", {
      answers,
    });
    if (response) {
      return onNext();
    }
    onNext();
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>
          Physical Activity Readiness Questionnaire
        </Text>
        {questions.map((question, index) => (
          <View key={index} style={styles.questionContainer}>
            <Text style={styles.questionText}>
              {index + 1}. {question}
            </Text>
            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                style={styles.checkboxWrapper}
                onPress={() => handleAnswer(question, "Yes")}
              >
                <View
                  style={[
                    styles.checkbox,
                    answers[question] === "Yes" && styles.checkedBox,
                  ]}
                >
                  {answers[question] === "Yes" && (
                    <Ionicons name="checkmark" size={10} color="white" />
                  )}
                </View>
                <Text style={styles.checkboxText}>Yes</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.checkboxWrapper}
                onPress={() => handleAnswer(question, "No")}
              >
                <View
                  style={[
                    styles.checkbox,
                    answers[question] === "No" && styles.checkedBox,
                  ]}
                >
                  {answers[question] === "No" && (
                    <Ionicons name="checkmark" size={10} color="white" />
                  )}
                </View>
                <Text style={styles.checkboxText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
      <TouchableOpacity
        style={[SectionsLogin.loginButton]}
        onPress={handleNext}
      >
        <Text
          style={[
            SectionsLogin.loginButtonText,
            { fontFamily: "montserratMeduim" },
          ]}
        >
          Proceed
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#F8F8F8",
    // padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#334155",
    fontFamily: "montserratMeduim",
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#334155",
    marginBottom: 10,
    fontFamily: "montserratMeduim",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    // alignItems
    // justifyContent: "space-between",
  },
  checkboxWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 12,
    height: 12,
    borderWidth: 1,
    borderColor: "#888",
    // borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },
  checkedBox: {
    backgroundColor: "#334155",
    borderColor: "#334155",
  },
  checkboxText: {
    fontSize: 13,
    color: "#334155",
    fontWeight: "500",
    fontFamily: "montserratMeduim",
  },
});
