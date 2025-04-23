import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Transes from '../../../../styles/Traning/Transes';
import { Feather, Ionicons } from '@expo/vector-icons';
import Header from '../../../header/Header';

const AccordionItem = ({ title, imageSource, content }) => {
    const [expanded, setExpanded] = useState(false);
    
    const toggleAccordion = () => {
        setExpanded(!expanded);
     };
    
    return (
        <View style={Transes.accordionContainer}>
      <TouchableOpacity onPress={toggleAccordion} style={[Transes.header,{backgroundColor:"#fff"}]}>
        <View style={{ flexDirection: "row", gap: 5 }}>
       
      <Text style={[Transes.headerText,{fontSize:14}]}>{title}</Text>
        </View>
        {/* Arrows */}
        <View style={Transes.headerRight}>
          <Ionicons
            name={expanded ? "remove" : "add"} // 'remove' for minus, 'add' for plus
            size={24}
            color="black"
            style={{ marginLeft: 10 }}
          />
        </View>
      </TouchableOpacity>

      {/* image, execrise and contents */}
      {expanded && (
        <View style={Transes.content}>
           <Text style={Transes.contentText}>{content}</Text>
        </View>
      )}
    </View>
    );
}

const Faq = () => {
    return (
      <>
         <ScrollView>
          <View style={Transes.container}>
            <AccordionItem
              title="How do I start streaming live video?"
               content="It's important to address common questions and concerns that users may have about the app. Here are some necessary questions to include"
            />
            <AccordionItem
              title="How do I start streaming live video?"
               content="It's important to address common questions and concerns that users may have about the app. Here are some necessary questions to include"
            />
            <AccordionItem
              title="How do I start streaming live video?"
               content="It's important to address common questions and concerns that users may have about the app. Here are some necessary questions to include"
            />
          </View>
        </ScrollView>
      </>
    );
  };

 
export default Faq;
