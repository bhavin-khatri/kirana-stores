import { StatusBar } from "react-native";
import React from "react";
import { Colors } from "../res/styles/Colors";

interface HeaderProps{
    backgroundColor?:any
    headerIconColor?:any
}
export const HeaderView =(props:HeaderProps)=>{
    const {backgroundColor,headerIconColor}= props;
    return(
        <>
            <StatusBar backgroundColor={backgroundColor || Colors.defaultWhite} barStyle={'dark-content'}/>
        </>
    )
}

