import React, { PropsWithChildren, useEffect, useState } from 'react';
import { Alert,ImageBackground, SafeAreaView, ScrollView, StatusBar, Text, View, useColorScheme, useWindowDimensions } from 'react-native';
import { instance } from '../utils/apis';

import BookButton from '../components/BookButton';
import ListWithArrow from '../components/ListWithArrow';
import GuideCard from '../components/GuideCard';
import CardList from '../components/CardList';
import { styles } from '../styles/globalStyles';
import Error from './Error';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, fetchHighLights, stateTypes } from '../redux/reducer';
import type { Dispatch } from '@reduxjs/toolkit';
type highProps = PropsWithChildren<{
    title: string;
    description:string,
    image:string
  }>;
type catProps = PropsWithChildren<{
    name: string;
    activities:{title:string}[]
}>;
const Home = () => {
   const highlightsList = useSelector((state:any)=>state.highlightsList)
   const categoryList = useSelector((state:any)=>state.categoryList)
   const dispatch:Dispatch = useDispatch()
    const isDarkMode = useColorScheme() === 'dark';
    const {height,width,fontScale} = useWindowDimensions()
    const [serverError,setServerError] = useState("")
    const backgroundStyle = {
      backgroundColor: isDarkMode ? "#000" : "#fff",
    };
   useEffect(()=>{
    fetchData()
   },[dispatch])
   function fetchData () {
    instance.get(`/v1/highlights`).then((res:any)=>{   
        dispatch(fetchHighLights(res.data))
        setServerError("")
    }).catch((error:any)=>{
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
    instance.get(`/v1/categories`).then((res:any)=>{
        dispatch(fetchCategories(res.data))
        setServerError("")
    }).catch((error:any)=>{
        if (error.response) {
            // The request was made and the server responded with a status code
            Alert.alert("Category","It's not you, it's us!")          
          } else if (error.request) {
            // The request was made but no response was received     
            setServerError("You are offiline")
        
          } else {        
            setServerError("Something went wrong")
          }
    })
   }
   if(serverError===""){
   
    return (
        <SafeAreaView>   
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={backgroundStyle.backgroundColor}
            />
            <ScrollView style={[backgroundStyle]} showsVerticalScrollIndicator={false}>
            {/** welcome cover image */}
            <ImageBackground alt='Hawaii Beach'  source={require('../assets/hawaiiImages/hawaiipic.png')} style={{width:width,height:height/1.5}} >
                <View style={styles.bgImgContent}>
                <Text style={{fontSize:fontScale*80,fontWeight:'bold',textAlign:'center'}}>Welcome to Hawaii</Text>
                </View>
            </ImageBackground>
            {/** list of highlight in horizontal card */}
            <ScrollView horizontal style={{marginTop:height*0.06}} showsHorizontalScrollIndicator={false}>
            {highlightsList.map((item:highProps,index:number)=>{
                return (
                 <CardList key={item.title+index} item={item} index={index} />
                )
            })}
            </ScrollView>
            <ScrollView >
                <Text style={{color:isDarkMode?"#6CADDE":"#15144E",fontSize:fontScale*25,marginLeft:width*0.04,marginBottom:height*0.03}}>Categories</Text>
             {categoryList.map((item:catProps,index:number)=>{
                return (
                   <ListWithArrow key={item.name+index} item={item} index={index}/>
                )
            })}
            </ScrollView>
            <GuideCard/>
            </ScrollView>
            <BookButton title='Book Now' disabled={false} />       
      </SafeAreaView>
    );
    }
    return <Error description={serverError} errorName='' retry={fetchData}/>
}

export default Home;