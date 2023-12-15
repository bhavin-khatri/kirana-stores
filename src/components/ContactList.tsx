import { SectionList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions";
import Contacts from "react-native-contacts";
import { Colors } from "../res/styles/Colors";
import { ResponsivePixels } from "../res/styles/ResponsivePixels";
import { createFilter } from "react-native-search-filter";

const KEYS_TO_FILTERS = [
  "displayName",
  "phoneNumber",
  "phoneNumbers.number",
  "dialCode",
];
const ContactList = () => {
  const [selectionList, setSelectionList]:Array<any> = useState([]);
  const [contactsListFromDevice, setContactsListFromDevice] = useState([]);

  useEffect(() => {
    const requestContactPermission = async () => {
      try {
        const permissionStatus = await check(PERMISSIONS.ANDROID.READ_CONTACTS);
        if (permissionStatus === RESULTS.GRANTED) {
          fetchContacts();
        } else {
          const newPermissionStatus = await request(PERMISSIONS.ANDROID.READ_CONTACTS);
          if (newPermissionStatus === RESULTS.GRANTED) {
            fetchContacts();
          }
        }
      } catch (error) {
        console.error('Error requesting contacts permission:', error);
      }
    };


    requestContactPermission();
  }, []);

  const fetchContacts = () => {
    Contacts.getAll().then((contacts) => {
      const allContacts:any = [];
      if (contacts && contacts.length > 0) {
        contacts.map((value) => {
          value.phoneNumbers.map((number) => {
            allContacts.push({
              displayName: `${value.givenName} ${value.familyName}`,
              phoneNumbers: [
                {
                  number: value?.phoneNumbers[0]?.number,
                  label: value?.phoneNumbers[0]?.label,
                },
              ],
              isContactSelected: false,
            });
          });
        });
        setContactsListFromDevice(allContacts);
        setSelectionList(prepareSectionedList(contacts))
        ;
      }
    })
  }

  const prepareSectionedList = (contacts:Array<any>) => {
    const sections :any= {};
    contacts.forEach((contact) => {

        const firstLetter = contact.displayName.charAt(0).toUpperCase();
        if (!sections[firstLetter]) {
          sections[firstLetter] = [];
        }
        sections[firstLetter].push(contact);

    });

    const sectionKeys = Object.keys(sections).sort();


    return sectionKeys.map((key,index) => ({
      title: `${key}`,
      data: sections[key],
      index: index, // Adding index to each section
    }));
  };


  const renderContactItem = ({ item, index,sectionIndex }:{ item:any, index:number,sectionIndex:number }) => {
    console.log("sectionIndex ==== > ",sectionIndex);

    const generateRandomColor = () => {
      const colors = ['#FF5733', '#33FF57', '#5733FF', '#33B8FF', '#FF33D1', '#FFD133']; // Add more colors as needed
      return colors[Math.floor(Math.random() * colors.length)];
    };

    const randomBackgroundColor = generateRandomColor();

    const isFirstInSection = index === 0;
    const isLastInSection = index === selectionList[sectionIndex].data.length - 1;

    const contactItemStyle = {
      backgroundColor: Colors.backgroundLowOpacity,
      paddingHorizontal: ResponsivePixels.size20,
      paddingVertical: ResponsivePixels.size5,
      borderRadius: 0,
      borderTopLeftRadius:0,
      borderBottomLeftRadius:0,
      borderBottomRightRadius:0,
      borderTopRightRadius:0
    };

    if (isFirstInSection) {
      contactItemStyle.borderTopLeftRadius = ResponsivePixels.size10;
      contactItemStyle.borderTopRightRadius = ResponsivePixels.size10;
    }

    if (isLastInSection) {
      contactItemStyle.borderBottomLeftRadius = ResponsivePixels.size10;
      contactItemStyle.borderBottomRightRadius = ResponsivePixels.size10;
    }


    return (
      <View style={contactItemStyle}>
        <TouchableOpacity
          style={myStyles.topView}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",

            }}
          >
            <View style={myStyles.titleView}>
              <View style={[myStyles.contactLetterView,{backgroundColor:randomBackgroundColor}]}>
                <Text style={myStyles.contactLetterText}>{item.displayName.charAt(0).toUpperCase()}</Text>
              </View>
              <Text style={myStyles.textUserName}>{item.displayName}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={myStyles.mainContentView}>

      {contactsListFromDevice && contactsListFromDevice.length > 0 ? (
        <>
          <Text style={myStyles.titleText}>Contact</Text>
          <SectionList
            sections={selectionList}
            renderItem={({ item, index,section }) => {
              return(
                renderContactItem({
                  item,
                  index,
                  sectionIndex:section.index
                }));
            }
            }
            renderSectionHeader={({ section }) => (
              <View style={myStyles.SectionView}>
                <Text style={myStyles.sectionText}>{section.title}</Text>
              </View>
            )}
          />
        </>
          ) : null}


    </View>
  );
};


const myStyles = StyleSheet.create({
  mainContentView: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
    elevation: 20,
    paddingHorizontal:ResponsivePixels.size20,
    paddingVertical:ResponsivePixels.size20,
    shadowColor: Colors.defaultBlack,
  },
  contactLetterView:{
    height:ResponsivePixels.size35,
    width:ResponsivePixels.size35,
    borderRadius:ResponsivePixels.size17,
    justifyContent:'center',
    backgroundColor:"red",
    alignItems:'center'
  },
  searchView: {
    backgroundColor: Colors.backgroundLowOpacity,
    height: ResponsivePixels.size36,
    justifyContent: "center",
    borderRadius:ResponsivePixels.size20
  },
  txtSearch: {
    fontSize: ResponsivePixels.size14,
    color: Colors.defaultBlack,
    padding:ResponsivePixels.size5,
    margin:ResponsivePixels.size5,
    alignItems: "center",
  },
  clearIcon: {
    position: "absolute",
    right: 24,
    top: 5,
    zIndex: 1,
  },
  titleView: {
    flexDirection: "row",
    flex: 1,
    paddingVertical: ResponsivePixels.size20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  contactLetterText:{
    fontSize: ResponsivePixels.size16,
    color: Colors.defaultWhite,
    fontWeight:'bold',
  },
  contactItemView: {
    backgroundColor:Colors.backgroundLowOpacity,
    paddingHorizontal:ResponsivePixels.size20,
    paddingVertical:ResponsivePixels.size5,
    borderRadius:ResponsivePixels.size10
  },
  topView: {
    // flexDirection: 'row'
    // marginTop: 10,

    alignItems: "center",
    // marginBottom: 10,
  },
  textUserName: {
    fontSize: ResponsivePixels.size18,
    color: Colors.shadeGray,
    flex: 1,
    paddingBottom:ResponsivePixels.size10,
    marginHorizontal:ResponsivePixels.size5,
    paddingHorizontal:ResponsivePixels.size10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.shadeGray,
  },
  titleText:{
    fontSize: ResponsivePixels.size20,
    fontWeight:"bold",
    color: Colors.defaultWhite,
    alignSelf:'center'
  },
  sectionText: {
    fontSize: ResponsivePixels.size18,
    color: Colors.defaultWhite,
    marginHorizontal: ResponsivePixels.size10,
    marginVertical: ResponsivePixels.size5,
    alignItems: "center",

  },
  SectionView: {
    // backgroundColor: Colors.defaultWhite,

  },
  textDescription: {
    fontSize: ResponsivePixels.size17,
    color: Colors.defaultBlack,
  },
});




export default ContactList;
