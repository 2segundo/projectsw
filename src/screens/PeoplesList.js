
import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView, 
  Button,
  Animated
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

import { getPeoples, addFavorites, removeFavorites } from '../redux/actions';

export default function PeoplesList() {
  
  const { peoples, favorites } = useSelector(state => state.peoplesReducer);
  const dispatch = useDispatch();
  
  const fetchPeoples = () => dispatch(getPeoples());
  const addToFavoritesList = people => dispatch(addFavorites(people));
  const removeFromFavoritesList = people => dispatch(removeFavorites(people));

  const [offSet] = useState(new Animated.ValueXY({x: 0, y: 95}));

  useEffect(() => {
    fetchPeoples();
    Animated.timing(offSet.y,{
      toValue: 0,
      speed: 4,
      bounciness: 30,
      duration: 1000,
      useNativeDriver: true
    }).start();
  }, []);

  const handleAddFavorites = people => {
    addToFavoritesList(people);
  };

  const handleRemoveFavorites = people => {
    removeFromFavoritesList(people);
  };

  const ifExists = people => {
  if (favorites.filter(item => item.height === people.height).length > 0) {
    return true; 
  }
    return false;
  };

  const renderItem = ({ item }) => {
    return (
      <View style={{ marginVertical: 10}}>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          {/* People Metadata */}
          <View style={{ flex: 1, marginLeft: 12 }}>
            {/* People Name */}
            <View>
              <Text style={{ fontSize: 22, paddingRight: 16, color: 'white' }}>
                {item.name}
              </Text>
            </View>
            {/* Meta info */}
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center'
              }}
            >
              <MaterialCommunityIcons
                color='#64676D'
                name='book-open-page-variant'
                size={20}
              />
              <Text style={{ fontSize: 14, paddingLeft: 10, color: '#64676D' }}>
                Heigth: {item.height} {/* item.num_pages */}
              </Text>
              <Text style={{ fontSize: 14, paddingLeft: 10, color: '#64676D' }}>
                Mass: {item.mass}
              </Text>
            </View>
            {/* Buttons */}
            <View style={{ marginTop: 14 }}>
              <TouchableOpacity
                onPress={() => 
                  ifExists(item) 
                    ? handleRemoveFavorites(item) 
                    : handleAddFavorites(item)
                }
                activeOpacity={0.7}
                style={{
                  flexDirection: 'row',
                  padding: 2,
                  backgroundColor: 'white',
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 40,
                  width: 40
                }}
              >
                <AntDesign
                  color={ifExists(item) ? 'gray' : '#64676D'}
                  size={24}
                  name={ifExists(item) ? 'heart' : 'hearto'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };  

  //console.log("Peoples: "+peoples[0].name)
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1E1B26' }}>
    
    <View style={{ flex: 1, paddingHorizontal: 16 }}>
      <Animated.View
        style = {{
          backgroundColor: '#1E1B26',
          transform: [
            {translateY: offSet.y}
          ] 
      }}>
      <Text></Text>
      <Text style={{ color: 'white', fontSize: 22, backgroundColor: '#1E1B26' }}>Characters list</Text>
      </Animated.View>
      <View style={{ flex: 1, marginTop: 8 }}>
        <FlatList
          data={peoples}
          keyExtractor={item => item.height}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
    
  </SafeAreaView>
  );
}