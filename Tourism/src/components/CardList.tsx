import React, { FC, PropsWithChildren } from 'react';
import { Image, StyleSheet, Text, View, useColorScheme, useWindowDimensions } from 'react-native';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';

type propTypes=PropsWithChildren<{
    item:{
        title: string;
        description:string,
        image:string
    }
    index:number 
}>

const CardList:FC<propTypes> = ({item,index}) => {
    const isDarkMode = useColorScheme() === 'dark';
    const {height,width,scale,fontScale} = useWindowDimensions()
    return (
        <View key={item.title+index} style={{width:width,height:height*0.5}}>
        <View style={[{marginHorizontal:width*0.07,paddingVertical:height*0.01,height:height*0.45},styles.cardView]}>
            <Image alt={item.title} source={{uri:item.image}} style={{width:width*0.7,height:height*0.3}}/>
            <View style={[{marginVertical:height*0.03,marginHorizontal:width*0.09},styles.contentView]}>
                <View style={styles.detailsView}>
                    <Text style={{color:isDarkMode?"#6CADDE":"#15144E",fontSize:fontScale*25}}>{item.title}</Text>
                    <Text style={{color:isDarkMode?"#fff":"#15144E",fontSize:fontScale*20}}>{item.description}</Text>
                </View>
                <Icon name='arrow-right' size={fontScale*30} color={"#fff"} />
            </View>
        </View>
    </View>
    );
}


const styles = StyleSheet.create({
    cardView:{
        borderRadius:10,
        alignItems:"center",
        backgroundColor:"#15144E",
        elevation:10,
        shadowColor:"#fff"
    },
    contentView:{
        display:'flex',
        flexDirection:'row',
    },
    detailsView:{
       alignItems:'flex-start'
    }
})
export default CardList;