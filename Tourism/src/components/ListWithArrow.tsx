import React, { FC, useState } from 'react';
import { FlatList, LayoutAnimation, Platform, StyleSheet, Text, TouchableOpacity, UIManager, View, useWindowDimensions } from 'react-native';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
type propTypes={
    item:{
        name:string  
        activities:{title:string}[]  
    },
    index:number
}
type activitiesPropTypes = {
  item:{
    title:string
  },
  index:number
}
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ListWithArrow:FC<propTypes> = ({item,index}) => {
    const {height,width,fontScale} = useWindowDimensions()
    const [hideActivities,setHideActivities] = useState(true)

    //collapsing activities and showing it on conditions
    function collapseActivities(){
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      setHideActivities((prev)=>!prev)
    }

    //rendering actvities on pressing actvities
    function renderActivities({item,index}:activitiesPropTypes){
      return (
        <View key={item.title+index} style={[{marginBottom:height*0.01,paddingVertical:height*0.02,marginHorizontal:width*0.02,paddingHorizontal:width*0.04},styles.activitesListItem]}>
        <Text style={{color:'#fff',fontSize:fontScale*15,marginRight:width*0.02}}>{index+1+"."}</Text>
        <Text style={[{fontSize:fontScale*20},styles.textWhite]}>{item.title}</Text>
    </View>
      )
    }
    
    return (
    <View>
      <TouchableOpacity onPress={collapseActivities} activeOpacity={0.7} key={item.name+index} style={[{marginBottom:height*0.01,paddingVertical:height*0.03,marginHorizontal:width*0.02,paddingHorizontal:width*0.04},styles.container]}>
        <Text style={[{fontSize:fontScale*20},styles.textWhite]}>{item.name}</Text>
        <Icon name={hideActivities?'arrow-right':'arrow-down'} size={fontScale*30} color={"#fff"}  />
      </TouchableOpacity>
        {hideActivities?null:<FlatList data={item.activities} renderItem={renderActivities} collapsable={true} alwaysBounceVertical={true} contentContainerStyle={[styles.activitiesList,{marginHorizontal:width*0.02}]} />}
    </View>
    );
}

const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:"#15144E",
    borderRadius:10,
    shadowColor:"#fff"
  },
  textWhite:{
    color:"#fff"
  },
  activitesListItem:{
    flexDirection:'row',
    backgroundColor:"#090E34",
    borderRadius:10,
    shadowColor:"#fff"
  },
  activitiesList:{
    rowGap:10,
  }
})
export default ListWithArrow;