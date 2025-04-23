import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; 
import { router } from "expo-router";

export default function OrderSummary() {
  const subscriptionDetails = {
    date: "November, 2026",
    price: "$299.99",
  };

  const paymentDetails = {
    paymentMethod: "PayPal",
    nextChargeDate: "09/11/2026",
    billingCycle: "Yearly",
  };

  // Manage checkboxes in a single state
  const [checkboxes, setCheckboxes] = useState({
    agreeToCharge: false,
    understandPolicy: false,
    clearStatement: false,
  });

  const toggleCheckbox = (key) => {
    setCheckboxes((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleConfirm = () => {
    router.push("/(routes)/get-started");
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Order Summary</Text>

      <View style={styles.summaryBox}>
        {/* Subscription Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Subscription Plan</Text>
          <InfoRow label="Price" value={subscriptionDetails.price} />
          <InfoRow label="Auto-renews on" value={subscriptionDetails.date} />
        </View>

        {/* Payment Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Details</Text>
          <InfoRow label="Payment Method" value={paymentDetails.paymentMethod} />
          <InfoRow label="Billing Cycle" value={paymentDetails.billingCycle} />
          <InfoRow label="Next Charge Date" value={paymentDetails.nextChargeDate} />
        </View>
      </View>

      {/* Checkboxes Section */}
      {[
        { key: "agreeToCharge", text: "I agree to recurring monthly charge" },
        { key: "understandPolicy", text: "I understand the cancellation policy" },
        { key: "clearStatement", text: "Clear statement of when first payment will be processed" },
      ].map(({ key, text }) => (
        <Checkbox key={key} checked={checkboxes[key]} onPress={() => toggleCheckbox(key)} text={text} />
      ))}

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.btnConfirm} onPress={handleConfirm}>
          <Text style={styles.buttonText}>Confirm Payment</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnCancel} onPress={handleCancel}>
          <Text style={[styles.buttonText, { color: "#fff" }]}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Reusable Component for displaying row data
const InfoRow = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.text}>{label}</Text>
    <Text style={[styles.text, { color: "#0F172A" }]}>{value}</Text>
  </View>
);

// Reusable Checkbox Component
const Checkbox = ({ checked, onPress, text }) => (
  <TouchableOpacity style={styles.checkboxContainer} onPress={onPress}>
    <View style={[styles.checkbox, checked && styles.checkedBox]}>
      {checked && <Ionicons name="checkmark" size={12} color="white" />}
    </View>
    <Text style={styles.checkboxText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F6EBFE",
    borderRadius: 10,
    // padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "montserratMeduim",
    marginBottom: 15,
    color: "#0F172A",
  },
  summaryBox: {
    borderWidth: 1,
    borderColor: "#8A2BE2",
    paddingVertical: 20,
    paddingHorizontal: 5,
    borderRadius: 8,
    backgroundColor: "#F1E2FF",
  },
  section: {
    marginBottom: 15,
    gap: 10,
    borderRadius: 8,
    borderColor: "#ECDAFE",
    borderWidth: 1,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F172A",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 14,
    fontFamily: "montserratMeduim",
    color: "#64748B",
  },
  buttonContainer: {
    marginTop: 20,
  },
  btnConfirm: {
    width: "100%",
    paddingVertical: 17,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#8A2BE2",
  },
  btnCancel: {
    width: "100%",
    paddingVertical: 17,
    borderRadius: 30,
    backgroundColor: "#8A2BE2",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    color: "#8A2BE2",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: "#0D9488",
    borderRadius: 30,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkedBox: {
    backgroundColor: "#0D9488",
  },
  checkboxText: {
    fontSize: 14,
    fontFamily: "montserratMeduim",
    color: "#475569",
    flexWrap: "wrap",
    paddingRight: 20,
  },
});

