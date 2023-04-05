import React, {useEffect, useState} from 'react';
import Contacts from 'react-native-contacts';
import {View, Text, FlatList, PermissionsAndroid, StyleSheet, Image} from 'react-native';

const App = () => {

  const [myContacts, setMyContacts] = useState();
  
  const getAllContacts = () => {

    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
    }).then(res => {
      if (res == 'granted') {
        Contacts.getAll()
          .then(contactdata => {
            
            console.log(contactdata);
            setMyContacts(contactdata);
          })
          .catch(e => {
            console.log(e);
          });
      }
    });
  };

  useEffect(() => {
    getAllContacts();
  }, []);

  const renderContacts = ({item}) => {
    
    console.log(item.phoneNumbers);
    console.log(item);
    const fletter = item.givenName;
    const fl = fletter.charAt(0).toUpperCase();
    
    const lletter = item.familyName;
    const ll = lletter.charAt(0).toUpperCase();
    
    return (
      
      <View style={styles.container}>
        
        <View style={styles.container1}>
          <View style={[styles.image]}>
            {item.hasThumbnail ? (
              <Image
                style={[styles.contactimage, {flex: 1}]}
                source={{uri: item.thumbnailPath}}/>
            ) : (
              <View
                style={[styles.noimgtxt,]}>
                <Text style={styles.dptext}>{fl}</Text>
                <Text style={styles.dptext}>{ll}</Text>
              </View>
            )}
          </View>
          <View style={styles.info}>
            <Text style={styles.contacttext1}>{item.displayName}</Text>
            <Text style={styles.contacttext2}>
              {item.phoneNumbers[0].number}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View>
      <View>
        <Text style={styles.contactlist}>
          Contact List
        </Text>
      <FlatList data={myContacts} renderItem={renderContacts} />
      </View>
    </View>
  );
}

export default App


const styles = StyleSheet.create({

  container:{
    backgroundColor: 'white',
    marginTop: 10,
    borderBottomColor: 'rgb(10,0,10)',
    borderRadius: 5,
    marginHorizontal: 20,
    elevation: 5,
    marginBottom: 5,
  },

  container1:{
    flexDirection: 'row',
  },

  image:{
    width: 40,
    height: 40,
    margin: 10,
  },

  contactimage:{
    borderRadius: 5,
  },

  dptext:{
    fontSize: 20,
    fontWeight: '500',
    color:'black',
  },

  info:{
    flex: 1,
    justifyContent: 'space-between',
    marginVertical: 5,
    paddingHorizontal: 10,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },

  contacttext1:{
    fontSize: 19,
    fontWeight: '500',
    color:'black',
  },

  contacttext2:{
    fontSize: 19,
    fontWeight: '500',
    color:'grey',
  },

  outerpic:{
    height: 50,
    width: 50,
    borderRadius: 18,
    borderWidth: 1,
  },
  
  noimgtxt:{
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'pink',
    flex: 1,
    alignItems: 'center',
    borderRadius: 5,
  },

  contactlist:{
    fontSize: 30,
    color: 'black',
    backgroundColor:'pink',
    textAlign: 'center',
    padding: 12,
    fontWeight: '500',
  },
  
});