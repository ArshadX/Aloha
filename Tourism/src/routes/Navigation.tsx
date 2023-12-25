import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../screens/Home";
import LandingPage from "../screens/LandingPage";
import { baseUrl } from '../utils/apis';
import Icon from 'react-native-vector-icons/MaterialIcons'
import axios from 'axios';
import { Text, View, useColorScheme, useWindowDimensions } from 'react-native';

const Tab = createBottomTabNavigator();

// custom header
const Header = () =>{
    const isDarkMode = useColorScheme() === 'dark';
    const {fontScale} = useWindowDimensions()
    const backgroundStyle = {
      backgroundColor: isDarkMode ? "#090E34" : "#fff",
    };
    const textColor = {
        color:isDarkMode?"#fff":"#15144E"
    }
    return (
        <View style={[{paddingVertical:5,elevation:10},backgroundStyle]}>
            <Text style={[{fontSize:fontScale*50,textAlign:'center'},textColor]}>Aloha</Text>
        </View>
    )
}

const Navigation = () => {
    const [highlights,setHighLights] = useState([])
     const [Error,setError] = useState('')
    useEffect(()=>{
        axios.get(`${baseUrl}/v1/highlights`).then((res)=>{
            setHighLights(res.data)
        }).catch((res:any)=>{
            setError("request failed")
        })
    },[])

    return (       
          <Tab.Navigator screenOptions={({route})=>{
            return {
                header:()=><Header/>,
                tabBarIcon:({focused,color,size})=>{
                    if(route.name==='home'){
                        return <Icon name="home" size={size} color={color} />
                    }else if(route.name==='Surfing'){
                        return <Icon name="surfing" size={size} color={color} />
                         
                    }else if(route.name==='Volcanoes'){
                        return <Icon name="volcano" size={size} color={color} />

                    }else if(route.name==='Traditional Festivals'){
                        return <Icon name="wine-bar" size={size} color={color} />
                    }
                },
                tabBarStyle:{
                    backgroundColor:'#15144E'
                }
            }
          }}>
            <Tab.Screen name="home" component={Home} />
            {/** rendering screens based on highlights data it is just for demonstration purpose to show my skills */}  
            {highlights.map((item:any)=><Tab.Screen key={item.title} name={item.title} component={LandingPage} />)}
          </Tab.Navigator>
    );
}

export default Navigation;