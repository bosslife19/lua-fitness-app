import { StyleSheet } from "react-native";

 const SectionsLogin = StyleSheet.create({
    welcomeText: {
      textAlign: "center",
      fontSize: 26,
      fontFamily:"montserratMeduim"
    },
    learningText: {   
      fontFamily:"montserratMeduim",
      textAlign: "center",
      color: "#575757",
      fontSize: 15,
      marginTop: 5,
    }, 
    imageContainer: {
      position: "relative",
      width: "100%",
      height: 300, // Adjust based on your layout
    },
    img:{
      width:"100%",
      height:"100%",
      borderRadius: 10, // Match with shadow container for a clean look
      // padding:20
    },
    
    inputContainer: {
      // marginHorizontal: 16,
      marginTop: 30,
    },
    inputContainers: {
      // marginHorizontal: 16,
      marginTop: 0,
    },
    contains:{
      marginTop: 15 ,
      flexDirection:"row",
      alignItems:"center",
      borderWidth:1,
       borderColor:"#ECDAFE",
      //  marginHorizontal:"5%",
       padding:"3%", 
       width:"100%",
       borderRadius:25,
      backgroundColor:"#F8F1FF",
       paddingHorizontal: 15,
    },
    input: {
      width:"80%",
      padding:"2%",
      // height: 63,
      marginHorizontal: 5,
      borderRadius: 8,
     
      fontSize: 14,
      backgroundColor: "#F8F1FF",
      color: " #A4A9AE",
    },
    inputs: {
      height: 63,
      marginHorizontal: 16,
      borderRadius: 8,
      paddingLeft: 15,
      fontSize: 14,
      backgroundColor: "#F8F1FF",
      color: " #A4A9AE",
    },
    visibleIcon: {
      position: "absolute",
      right: 30,
      top: 17,
    },
    icon2: {
      position: "absolute",
      left: 24,
      top: 17.8,
    },
    forgotSection: {
      marginHorizontal: 16,
      textAlign: "center",
      fontWeight:600,
      lineHeight:26.37,
      fontSize: 15,
      color:'#8A2BE2',
      marginTop: 20,
    },
    loginButton: {
      padding: 19,
      borderRadius: 30,
       backgroundColor: "#8A2BE2",
      marginTop: 19,
    },
    loginButtons: {
      padding: 19,
      borderRadius: 8,
      marginHorizontal: 5,
      backgroundColor: "#8A2BE2",
      marginTop: 19,
    },
    loginButtonText: {
      color: "white",
      fontWeight:700,
      fontSize:18,
      textAlign: "center",
      fontFamily: "montserratMeduim",
    },
    socialLogin: {
    //   flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical:30,
      gap: 10,
    },
    signupRedirect: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 10,
      marginBottom: 20,
    },
    signUpText: {
      fontWeight:700,
      fontSize: 18,
      fontFamily: "montserratMeduim",
      color: "#8A2BE2",
      marginLeft: 5,
    },
    errorContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 5,
      marginHorizontal: 16,
    },
  });


  export default SectionsLogin;   