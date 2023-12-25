import React, { FC } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, useColorScheme, useWindowDimensions } from 'react-native';
const GuideCard:FC = () => {
    const {width,height,fontScale}  = useWindowDimensions()
    const isDarkMode = useColorScheme() === 'dark';
     return (
        <>
        <Text style={{fontSize:fontScale*25,color:isDarkMode?"#6CADDE":"#15144E",marginLeft:width*0.04,marginBottom:height*0.03}}>Travel Guide</Text>
        <View style={[{marginHorizontal:width*0.02,backgroundColor:"#15144E",marginBottom:height*0.1},styles.cardView]}>
        <View>
        <Text style={[{fontSize:fontScale*30},styles.whiteText]}>Joe Dane</Text>
        <Text style={[{fontSize:fontScale*20},styles.whiteText]}>Guice since born</Text>
        <TouchableOpacity style={styles.button}><Text style={[{fontSize:fontScale*30},styles.buttonText]}>Contact</Text></TouchableOpacity>
        </View>
        <Image source={require("../assets/hawaiiImages/profilepic.png")} style={styles.imageStyle} />
    </View>
    </>
    );
}
const styles = StyleSheet.create({
    cardView:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:20,
        borderRadius:20
    },
    whiteText:{
        color:"#fff"
    },
    button:{
        borderWidth:1,
        borderColor:"#6CADDE",
        borderRadius:20,
        marginTop:20
    },
    buttonText:{   
        paddingHorizontal:10,
        paddingVertical:5,
        textAlign:'center',
        color:"#fff"
    },
    imageStyle:{
        width:100,
        height:100,
        borderRadius:60
    }
})
export default GuideCard;