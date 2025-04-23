import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
  import { router, useNavigation } from "expo-router";
import Header from "../../header/Header";
import Faq from "./Tabs/Faq";
import Email from "./Tabs/Email";
 import HeaderCheckoutStyl from "../../../styles/HeaderStyles/Headercheckout.jsx";
// import ExerciseMainPage from "./ExecriseMainPage";
// import HeaderCheckoutStyl from "../../styles/HeaderStyles/Headercheckout";
// import Header from "../header/ExecriseMainHeader";
// import filter from "../../assets/images/fitness/mdi_filter-outline.png"
// TabHeader Component
const TabHeader = ({ activeTab, setActiveTab }) => {
  const tabs = ["FAQ", "Email"];
   const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={{     backgroundColor:"#F8FAFC" , paddingHorizontal: "3.4%", paddingTop: 10, paddingBottom: 10 }}>
     <Header name="Support" arrow="arrow-back" />
      <View style={HeaderCheckoutStyl.tabContainer}>
        {tabs.map((tab) => (
          <React.Fragment key={tab}>
            <TouchableOpacity
              style={[
                HeaderCheckoutStyl.tabButtons,
                activeTab === tab && HeaderCheckoutStyl.activeTabs,
                
               ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  HeaderCheckoutStyl.tabButtonText,
                  activeTab === tab && HeaderCheckoutStyl.activeTabTexts,
                 ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
           </React.Fragment>
        ))}
        
      </View>
    </View>
  ); 
};
 
const Support = () => {
  const [activeTab, setActiveTab] = useState("FAQ");

  return (
    <View style={HeaderCheckoutStyl.contains}>
      {/* Header Section */}
      <TabHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Content Section */}
      {activeTab === "FAQ" && <Faq />}
      {activeTab === "Email" && <Email />}
 
     </View>
  );
};

export default Support;
