import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";
import {getAllStores, isEmpty, updateStoreDetailsInFirebase} from "../../utils/Utils";
import {ResponsivePixels} from "../../res/styles/ResponsivePixels";
import PhotoPicker from "../../components/PhotoPicker";
import Images from "../../components/Images";
import storage from '@react-native-firebase/storage';
import database from "@react-native-firebase/database";

const StoreDetails =(props:any)=>{
    const {params} = props.route;
    const storeDetails:any = params.storeDetails;
    const [newStoreDetails,setNewStoreDetails]= useState(storeDetails)
    const [canOpenBottomSheet,setCanOpenBottomSheet]= useState(false)
    const [allStoresList,setAllStoresList]= useState<any>([
        {
            "address": "Nilesh Jain BHUMI KIRANA Ramghat Road, Vishnupuri, Near water tank, sector 5C, Agra, UP",
            "area": "HSR",
            "name": "U1_BHUMI KIRANA",
            "route": "r5",
            "storeId": "004d39b7-e35a-4d08-986f-2664c429e3b2",
            "type": "General Store"
        },
        {
            "address": "Lalit Gupta SHRI JI STORE Ramghat Road, Vishnupuri, Near water tank, sector 5C, Agra, UP",
            "area": "Koramangla",
            "name": "U1_SHRI JI STORE",
            "route": "r4",
            "storeId": "01bf27a8-ae9c-4863-ab52-c5c259a21514",
            "type": "General Store"
        },
        {
            "address": "Gajendra Singh RISHI KIRANA Ramghat Road, Vishnupuri, Near water tank, sector 5C, Agra, UP",
            "area": "HSR",
            "name": "U1_RISHI KIRANA",
            "route": "r4",
            "storeId": "03769e95-dac5-41df-98cb-e3110235ccb6",
            "type": "General Store"
        },
        {
            "address": "Santosh Kushwah MANOJ GENRAL Ramghat Road, Vishnupuri, Near water tank, sector 5C, Agra, UP",
            "area": "MG Road",
            "name": "U1_MANOJ GENRAL",
            "route": "r6",
            "storeId": "065e6e5c-534f-4b94-9599-c4af303aeec9",
            "type": "General Store"
        },
        {
            "address": "Kamal Chorasiya BHAVANI NOVELTY Ramghat Road, Vishnupuri, Near water tank, sector 5C, Agra, UP",
            "area": "MG Road",
            "name": "U1_BHAVANI NOVELTY",
            "route": "r5",
            "storeId": "066e6547-fa22-48c5-b339-129b71be5a45",
            "type": "General Store"
        },
        {
            "address": "MANISH KAMAD GIRI  GENRAL Ramghat Road, Vishnupuri, Near water tank, sector 5C, Agra, UP",
            "area": "Koramangla",
            "name": "U1_KAMAD GIRI  GENRAL",
            "route": "r2",
            "storeId": "080b6d99-455c-4042-9b99-50890f97e770",
            "type": "General Store"
        },
    ])

    console.log("params storeDetails ==== > ",storeDetails)

    useEffect(()=>{
        async function fetchData(){
            let allStoresList = await getAllStores()
            setAllStoresList(allStoresList)

        }
        fetchData()
    },[])

    const uploadImageToFirebase=async (image:any)=>{
        try {
            let imageUri = image.uri;
            const timestamp = Date.now();
            let filename = `${newStoreDetails.storeId}_${timestamp}`
            const reference = storage().ref().child(`images/${filename}`);
            await reference.putFile(imageUri.toString());
            console.log('Image uploaded to Firebase Storage');
            const downloadURL = await reference.getDownloadURL();
            console.log('Download URL:', downloadURL);
            const storeDetails = {
                ...newStoreDetails,
                storeImage:downloadURL
            }
            console.log("storeDetails ==== > ",storeDetails)
            setNewStoreDetails(storeDetails)
            await updateStoreDetailsInFirebase(storeDetails)
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    }

    return(
        <View style={myStyles.mainView}>
            <Text>{newStoreDetails.storeId}</Text>
            <TouchableOpacity
            onPress={()=>setCanOpenBottomSheet(true)}
            >
            {!isEmpty(newStoreDetails.storeImage) ?
                <Image
                    source={{uri:newStoreDetails.storeImage}}
                    style={{ width: 80, height: 80, borderRadius: 100 }}
                />
                :
                <Image
                    source={Images.ic_app_logo}
                    style={{ width: 80, height: 80, borderRadius: 100 }}
                />
            }
            </TouchableOpacity>

            <PhotoPicker
                canOpenBottomSheet={canOpenBottomSheet}
                openCloseBottomSheet={(canOpenBottomSheet: any) => {
                    setCanOpenBottomSheet(canOpenBottomSheet)
                }}
                onFileSelect={(res: any) => {
                    if (res) {
                        uploadImageToFirebase(res[0]);
                    }
                }}
            />
        </View>
    )
}
export default StoreDetails;

const myStyles = StyleSheet.create({
    mainView:{
        backgroundColor:'white',flex:1
    },
    storeItemStyle:{
        marginTop: ResponsivePixels.size20,
        marginHorizontal: ResponsivePixels.size20,
    }
})
