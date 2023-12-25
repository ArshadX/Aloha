import { createSlice } from "@reduxjs/toolkit";
export type stateTypes={
    categoryList:Array<{
        name: string;
        activities:{title:string}[]
    }>,
    highlightsList:Array<{
        title: string;
        description:string,
        image:string
    }>,
    activitiesList:Array<{
        name:string
        description:string
        image:string
        activities:{name:string}[]
    }>
}

export const appState = createSlice({
    name:'appState',
    initialState:{
        categoryList:[],
        highlightsList:[],
        activitiesList:{
            name:"",
            description:"",
            image:"",
            activities:[]
        }
    },
    reducers:{
        fetchHighLights:(prevState,action)=>{
            prevState.highlightsList=action.payload
        },
        fetchCategories:(prevState,action)=>{
            prevState.categoryList=action.payload
        },
        fetchActivities:(prevState,action)=>{
            prevState.activitiesList=action.payload
        }
    }
})

export const {fetchHighLights,fetchCategories,fetchActivities} = appState.actions
export default appState.reducer