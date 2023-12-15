import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getCurrentUserName, getUsersWithStoreData} from "../../utils/Utils";
import {ResponsivePixels} from "../../res/styles/ResponsivePixels";
import {navigationConstants} from "../../constants/NavigationConstant";

const StoreList = (props:any) => {
    const [storesData, setStoresData] = useState<any>([]);

    useEffect(() => {
        async function getData(){
            let currentUser :string= await getCurrentUserName() || ''
            getUsersWithStoreData('Ram').then(res => {
                console.log("res====>",res)
                setStoresData(res.matchingStoresData)
            })

        }
         getData()

    }, []);

    const navigateToStoreDetails=(storeItem:any)=>{
        props.navigation.navigate(navigationConstants.STORE_DETAILS,{storeDetails:storeItem})
    }

    const renderStoreItem=({item,index}:{item:any,index:number})=>{
        return(
            <TouchableOpacity onPress={()=>navigateToStoreDetails(item)} style={myStyles.storeItemStyle}>
                <Text>{item.storeId}</Text>
                <Text>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={myStyles.mainView}>
            <FlatList data={storesData} renderItem={renderStoreItem} keyExtractor={item => item.id = storesData.storeId}/>
        </View>
    );
};

export default StoreList;

const myStyles = StyleSheet.create({
    mainView:{
        backgroundColor:'white',flex:1
    },
    storeItemStyle:{
        marginTop: ResponsivePixels.size20,
        marginHorizontal: ResponsivePixels.size20,
    }
})
