import { StyleSheet } from "react-native";

const Trans = StyleSheet.create({
    container: {
    //   flex: 1,
      padding: 20,
      backgroundColor: "#F1F5F9",
    },
    containers:{
        backgroundColor:"#fff",
        borderRadius:10
        // marginHorizontal:10
    },
    equipmentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: "montserratMedium",
        marginVertical: 10,
    },
    equipmentText: {
        fontSize: 12,
        fontFamily: "montserratMedium",
        color: '#334155',
    },
    imageContainer: {
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        overflow: 'hidden',
    },
    mainImage: {
        width: '100%',
        height: 250,
    },
    favButton: {
        position: 'absolute',
        top: '41%',
        right: "42%",
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: 11,
        borderRadius: 50,
        // opacity:0.7
    },
    Header:{
        color:"#0F172A",
        fontFamily:"montserratMeduim",
        fontSize:15,
        fontWeight:600
    },
    tabContainer: {
      paddingVertical: 10,
      paddingHorizontal: 10,
      flexDirection: "row",
      marginBottom: 20,
      backgroundColor: "#fff",
      
    },
    scrollContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
      },
    tab: {
       
      paddingVertical: 10,
      paddingHorizontal: 15,
      // backgroundColor: "#E5E7EB",
      borderRadius: 10,
      // marginRight: 10,
    },
    tabs: {
       
      paddingVertical: 7,
      paddingHorizontal: 23,
      backgroundColor: "#F1F5F9",
      borderRadius: 30,
      marginRight: 5,
      borderWidth:1,
      borderColor:"#F1F5F9"
    },
    activeTab: {
      backgroundColor: "#0F172A",
    },
    tabText: {
      fontSize: 13,
      fontWeight: "bold",
      fontFamily: "Montserrat-Medium",
      color: "#374151",
    },
    activeTabText: {
      color: "#FFF",
      fontFamily: "Montserrat-Medium",
    },
    content: {
      borderRadius: 10,
    },
    imageBackground: {
        height: 125,
        borderRadius: 13,
        overflow: "hidden",
         // justifyContent: "flex-end",
        // paddingTop: 4,
        paddingHorizontal: 13,
      },
      imageText: {
        color: "#fff",
        fontFamily: "montserratMedium",
        fontSize: 17,
        fontWeight: "700",
        lineHeight:18
      },
      contentContainer: {
        // padding: 16,
        backgroundColor: "#f5f5f5",
        borderRadius: 10,
      },
      btnss: {
        marginTop:"5%",
        flexDirection:"row",
        alignItems:"center",
        width: "35%",
        gap:5,
        paddingVertical: 7,
        paddingHorizontal:10,
        borderWidth: 1,
        borderRadius: 14.29,
        backgroundColor:"#fff",
        borderColor: "#fff",
      },
      buttons: {
        fontSize: 13,
        fontFamily:"montserratMeduim",
        fontWeight: "700",
        // textAlign: "center",
        color: "#0D9488",
      },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      fontFamily: "Montserrat-Medium",
    },
    dateText: {
      fontSize: 13,
      fontWeight: "400",
      color: "#6B7280",
      fontFamily: "Montserrat-Medium",
    },
 
      details: {
        paddingHorizontal: 10,
        paddingBottom: 20,
    
    },
    detailsText: {
      width: "90%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 10,
    },
    iconContainer: {
      backgroundColor: "#F6EAFE",
      padding: 5,
      borderRadius: 4,
    },
    icon: {
      width: 20,
      height: 20,
    },
    icons: {
        width: 15,
        height: 15,
        marginRight: 5,
    },
    flexD:{
        marginTop:5,
        flexDirection: "row",
        gap:5,
        // justifyContent: "space-between",
        alignItems: "center",
      },
    statusBadge: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 10,
      paddingVertical: 7,
      borderRadius: 10,
    },
    statusIcon: {
      width: 16,
      height: 16,
      marginRight: 5,
    },
    statusText: {
      fontSize: 12,
      fontFamily: "Montserrat-Medium",
      fontWeight: 500,
    },
    buttonContainer: {
        // marginTop:"5%",
        gap: 10,
        // paddingBottom: 20,
        flexDirection: "column",
        // alignItems: "center",
         marginBottom:"5%",
         paddingHorizontal:10
      },
    btns: {
        flexDirection:"row",
        width: "45%",
         alignItems: "center",
         justifyContent:"center",
         gap:5,
        paddingVertical: 10,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: "#8A2BE2",
      },
      button: {
        fontSize: 14,
        fontFamily:"montserratMeduim",
        fontWeight: "700",
        textAlign: "center",
        color: "#8A2BE2",
      },
  });

  export default Trans