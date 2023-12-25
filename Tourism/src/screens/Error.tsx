import React, { FC } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, useColorScheme } from 'react-native';

type proptypes = {
    errorName:string,
    description:string
    retry:any
}
const Error:FC<proptypes> = ({errorName,description,retry}) => {
    
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? "#000" : "#fff",
      };
    const messageStyle={
        color: isDarkMode ? "#fff" : "#15144E",
        fontSize:20
    }
    return (
        <SafeAreaView style={[styles.container,backgroundStyle]}>   
            <Image source={require("../assets/errorImages/offline.png")} style={styles.bgImg}/>
            <Text style={messageStyle}>{description}</Text>   
            <TouchableOpacity activeOpacity={0.5} style={styles.button} onPress={retry}><Text style={[styles.buttonText,messageStyle]}>Retry</Text></TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    bgImg:{
        width:150,
        height:150
    },
    button:{
        borderWidth:1,
        borderColor:"#6CADDE",
        borderRadius:20,
        marginTop:20,
        paddingHorizontal:20,
        paddingVertical:10
    },
    buttonText:{   
        paddingHorizontal:10,
        paddingVertical:5,
        textAlign:'center',
    },
})

export default Error;