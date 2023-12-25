import React, { FC } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
type propsTypes = {
    title:string
    onPress?:any
    disabled:boolean
}

const BookButton:FC<propsTypes> = ({title,onPress,disabled}) => {
    const {height,width,fontScale} = useWindowDimensions()
    return (
    <TouchableOpacity activeOpacity={0.5} disabled={disabled} style={[{width:width*0.8,paddingVertical:height*0.02,marginBottom:height*0.03},styles.buttonStyle]} onPress={onPress}>
        <Text style={[{fontSize:fontScale*20},styles.titleStyle]}>{title}</Text>
    </TouchableOpacity> 
    );
}

const styles = StyleSheet.create({
    buttonStyle:{
        position:"absolute",
        bottom:0,
        backgroundColor:"#6CADDE",
        alignSelf:'center',
        borderRadius:50,
        elevation:5,
        shadowColor:'#6CADDE'   
    },
    titleStyle:{
        textAlign:'center',color:"#15144E",
    },

})
export default BookButton;