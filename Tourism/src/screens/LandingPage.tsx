import { useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated,Easing, FlatList,SafeAreaView,Text, View, useColorScheme, useWindowDimensions } from 'react-native';
import { instance } from '../utils/apis';
import GuideCard from '../components/GuideCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Hero from '../components/Hero';
import BookButton from '../components/BookButton';
import Error from './Error';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { fetchActivities } from '../redux/reducer';
type dataProps = {
    name:string
    description:string
    image:string
    activities:{name:string}[]
}
const LandingPage = () => {
    const currentData:dataProps = useSelector((state:any)=>state.activitiesList)
    const dispatch:Dispatch = useDispatch()
    const isDarkMode = useColorScheme() === 'dark';
    const {height,width,scale,fontScale} = useWindowDimensions()
    const fadeAnim = useRef(new Animated.Value(0));
    const [isLoading,setIsLoading] = useState(false)
    const [serverError,setServerError] = useState("")
    const route = useRoute()
    const backgroundStyle = {
    backgroundColor: isDarkMode ? "#000" : "#fff",
  };
   useEffect(()=>{
    setIsLoading(true)
    fetchData()
     runAnimation()
     return ()=>{
        Animated.timing(fadeAnim.current, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver:true
          }).stop()
     }
},[])
function runAnimation() {
    fadeAnim.current.setValue(0)
    Animated.timing(fadeAnim.current, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver:true
    }).start(() => runAnimation());
}
function fetchData (){
    instance.get(`/v1/activities/${route.name}`).then((res)=>{
        setIsLoading(false)
        dispatch(fetchActivities(res.data))
        setServerError("")
    }).catch((error:any)=>{      
        setIsLoading(false)
        if (error.response) {
            // The request was made and the server responded with a status code
            Alert.alert("Highlights","It's not you, it's us!")   
          } else if (error.request) {
            // The request was made but no response was received 
            setServerError("You are offiline")
          } else {        
            setServerError("Something went wrong")
          }
    })   
}
  function renderActivities({item,index}:{item:any,index:any}){
    return (
        <View key={item.name+index} style={{flexDirection:'row',backgroundColor:"#15144E",marginBottom:height*0.01,paddingVertical:height*0.03,marginHorizontal:width*0.02,paddingHorizontal:width*0.04,borderRadius:10,elevation:10}} >
            <Text style={{color:'#fff',fontSize:fontScale*15,marginRight:width*0.02}}>{index+1+"."}</Text>
            <Text style={{color:'#fff',fontSize:fontScale*15}}>{item.name}</Text>
        </View>
    )
  }
  function Header(){
    return(
        <>   
        {isLoading && currentData.image===""?
        <Animated.View style={{width:width,height:height/1.5,marginBottom:height*0.02,opacity:fadeAnim.current,alignItems:'center',justifyContent:'center'}}>
            <Icon name='image-outline' size={fontScale*100} color={"#fff"} />
        </Animated.View>
        :
         <Hero title={currentData.name} image={currentData.image} description={currentData.description}/>
         }  
        <Text style={{fontSize:fontScale*25,color:isDarkMode?"#6CADDE":"#15144E",marginLeft:width*0.04,marginBottom:height*0.03, marginTop:height*0.06}}>Top Spots</Text>
        </>
    )
  }
  if(serverError===""){
    return (
        <SafeAreaView style={[backgroundStyle]}>   
            <FlatList bounces ListHeaderComponent={<Header/>} data={currentData?.activities} renderItem={renderActivities}  keyExtractor={(item,index)=>item.name+index} ListFooterComponent={<GuideCard/>} />  
            <BookButton title='Book Now' disabled={false} />     
        </SafeAreaView>
    );
  }
    return <Error description={serverError} errorName='' retry={fetchData}/>
}

export default LandingPage;