import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {getCurrentUserName, getUsersWithStoreData} from "../../utils/Utils";

const Dashboard = () => {
    const [storesData, setStoresData] = useState({});

    useEffect(() => {
        async function getData(){
            let currentUser :string= await getCurrentUserName() || ''
            getUsersWithStoreData(currentUser).then(res => {
                console.log("res====>",res)
                setStoresData(res.matchingStoresData)
            })

        }
         getData()

    }, []);

    return (
        <View style={{backgroundColor:'white'}}>
            <Text>Stores Data:</Text>
            <Text>{JSON.stringify(storesData, null, 2)}</Text>
        </View>
    );
};

export default Dashboard;
