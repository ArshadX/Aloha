import React, { FC } from 'react';
import { ImageBackground, StyleSheet, Text, View, useColorScheme, useWindowDimensions } from 'react-native';

type propstypes = {
    image:string
    title:string
    description?:string
}
const Hero:FC<propstypes> = ({image,title,description}) => {
    
        const {width,height,fontScale}  = useWindowDimensions()
        const isDarkMode = useColorScheme() === 'dark';
         return (  
            <View style={styles.container}>
            <ImageBackground alt='Hawaii Beach' source={{uri:image}}style={{width:width,height:height/1.5}} >
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text style={[{fontSize:fontScale*80},styles.fontStyleBig]}>{title}</Text>
                </View>
            </ImageBackground>  
            {description?
            <Text style={{color:"#fff",marginBottom:height*0.05,marginHorizontal:width*0.02,fontSize:fontScale*20,paddingHorizontal:width*0.02}}>{description}</Text>
             :null}
            </View>
        );
    
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:"#15144E",
        rowGap:10,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20
    },
    fontStyleBig:{
        fontWeight:'bold',
        textAlign:'center'
    }
})
export default Hero;