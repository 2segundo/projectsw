import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,  
  Text, 
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Animated 
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

import { removeFavorites } from '../redux/actions';

export default function FavoritesList() {

  const { favorites } = useSelector(state => state.peoplesReducer);
  const dispatch = useDispatch();

  const removeFromFavoritesList = people => dispatch(removeFavorites(people));

  const [offSet] = useState(new Animated.ValueXY({x: 0, y: 95}));

  useEffect(() => {
    Animated.timing(offSet.y,{
      toValue: 0,
      speed: 4,
      bounciness: 30,
      duration: 1000,
      useNativeDriver: true
    }).start();
  }, []);

  const handleRemoveFavorites = people => {
    removeFromFavoritesList(people);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={{ marginVertical: 12 }}>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          {/* People Metadata */}
          <View style={{ flex: 1, marginLeft: 12 }}>
            {/* People name */}
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
                Height: {item.height}
              </Text>
              <Text style={{ fontSize: 14, paddingLeft: 10, color: '#64676D' }}>
                Mass: {item.mass}
              </Text>
            </View>
            {/* Buttons */}
            <View style={{ marginTop: 14 }}>
              <TouchableOpacity
                onPress={() => handleRemoveFavorites(item)}
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
                  color='#64676D'
                  size={24}
                  name='heart'
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1E1B26' }}>
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <Text></Text>
        <Animated.View
        style = {{
          backgroundColor: '#1E1B26',
          transform: [
            {translateY: offSet.y}
          ] 
        }}>
        <Text style={{ color: 'white', fontSize: 22 }}>Favorites list</Text>
        </Animated.View>
        <View style={{ flex: 1, marginTop: 8 }}>
          {favorites.length === 0 ? (
            <Text style={{ color: '#64676D', fontSize: 18 }}>
              Add a character to favorites list.
            </Text>
          ) : (
            <FlatList
              data={favorites}
              keyExtractor={item => item.height}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );

}