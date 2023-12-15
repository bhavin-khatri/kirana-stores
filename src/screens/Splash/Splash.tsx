import {View} from "react-native";
import {useEffect} from "react";
import {getCurrentUserName, isEmpty} from "../../utils/Utils";
import {navigationConstants} from "../../constants/NavigationConstant";

const Splash =(props:any)=>{
    useEffect(()=>{
        async function fetchData() {

            try {
                let currentUser: string = await getCurrentUserName() || '';
                if (isEmpty(currentUser)) {
                    navigateToNextScreen(navigationConstants.LOGIN);
                } else {
                    navigateToNextScreen(navigationConstants.DASHBOARD);
                }
            } catch (error) {
                // Handle errors if getCurrentUserName() fails
                console.error('Error:', error);
            }
        }
        setTimeout(()=>{
            fetchData()
        },500)
    },[])

    const navigateToNextScreen=(screenName:any)=>{
        props.navigation.navigate(screenName)
    }

    return (
        <View>

        </View>
    )
}

export default Splash;
