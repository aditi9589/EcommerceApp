import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Modal} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const FilterScreen = ({route}) => {
  const nav2 = useNavigation();

  const displayProduct = item => {
    // console.log('item dsdsdsds', item);
    nav2.navigate('ProductDisplay', {data: item});
    
  };

 
  // console.log('routes data', route.params);
  const {searchData} = route?.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [buttonPressed, setButtonPressed] = useState();
  const [buttonPressed1, setButtonPressed1] = useState();
  const [filterData, setFilteData] = useState(searchData);
  const [filterRate, setFilterRate] = useState([]);
  const [filtStock, setFilterStock] = useState([]);

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    console.log('buttonPressed2222222', buttonPressed, buttonPressed1);
    applyFilter();
  }, [buttonPressed, buttonPressed1]);

  console.log('dataaaaaa', filterData);
  const applyFilter = text => {
    const search = text || searchText;
    console.log('text', search);

    console.log('buttonPressed rating', buttonPressed);
    console.log('buttonPressed1 stock', buttonPressed1);
    const temp = searchData?.filter(item => {
      if (search != '' && search) {
        if (item.title.toLowerCase().includes(search.toLowerCase())) {
          if (buttonPressed && buttonPressed1) {
            if (
              item?.rating >= buttonPressed - 1 &&
              item?.rating < buttonPressed &&
              item.title.toLowerCase().includes(search.toLowerCase())
            ) {
              if (
                buttonPressed1 === '0 - 49' &&
                item?.stock > 0 &&
                item?.stock <= 49
              ) {
                return item;
              }

              if (
                buttonPressed1 === '50 - 99' &&
                item?.stock >= 50 &&
                item?.stock <= 99
              ) {
                return item;
              }

              if (buttonPressed1 === '100 more' && item?.stock >= 100) {
                return item;
              }
            }
          } else if (buttonPressed) {
            if (
              item?.rating >= buttonPressed - 1 &&
              item?.rating < buttonPressed &&
              item.title.toLowerCase().includes(search.toLowerCase())
            ) {
              return item;
            }
          } else if (buttonPressed1) {
            if (
              buttonPressed1 === '0 - 49' &&
              item?.stock > 0 &&
              item?.stock <= 49
            ) {
              return item;
            }

            if (
              buttonPressed1 === '50 - 99' &&
              item?.stock >= 50 &&
              item?.stock <= 99
            ) {
              return item;
            }

            if (buttonPressed1 === '100 more' && item?.stock >= 100) {
              return item;
            }
          } else {
            if (item.title.toLowerCase().includes(search.toLowerCase())) {
              return item;
            }
          }
        }
      } else if (buttonPressed && buttonPressed1) {
        if (
          item?.rating >= buttonPressed - 1 &&
          item?.rating < buttonPressed &&
          item.title.toLowerCase().includes(search.toLowerCase())
        ) {
          if (
            buttonPressed1 === '0 - 49' &&
            item?.stock > 0 &&
            item?.stock <= 49
          ) {
            return item;
          }

          if (
            buttonPressed1 === '50 - 99' &&
            item?.stock >= 50 &&
            item?.stock <= 99
          ) {
            return item;
          }

          if (buttonPressed1 === '100 more' && item?.stock >= 100) {
            return item;
          }
        }
      } else if (buttonPressed) {
        if (
          item?.rating >= buttonPressed - 1 &&
          item?.rating < buttonPressed &&
          item.title.toLowerCase().includes(search.toLowerCase())
        ) {
          return item;
        }
      } else if (buttonPressed1) {
        if (
          buttonPressed1 === '0 - 49' &&
          item?.stock > 0 &&
          item?.stock <= 49
        ) {
          return item;
        }

        if (
          buttonPressed1 === '50 - 99' &&
          item?.stock >= 50 &&
          item?.stock <= 99
        ) {
          return item;
        }

        if (buttonPressed1 === '100 more' && item?.stock >= 100) {
          return item;
        }
      } else {
        if (item.title.toLowerCase().includes(search.toLowerCase())) {
          return item;
        }
      }
    });
    setFilteData(temp);
  };

  const filterRating = searchData?.map(item => item?.rating);
  //console.log('Filter Rating', filterRating);

  const filterStock = searchData?.map(item => item?.stock);
  // console.log('Filter Stock', filterStock);

  const dummyArrayrating = [1, 2, 3, 4, 5];

  const stockData = ['Out Of Stock', '0 - 49', '50 - 99', '100 more'];

  // const sortData = route?.params?.searchData?.map(item => {
  //   item?.rating;
  // });

  // console.log('in rating', sortData);

  return (
    <View style={{flex: 1, marginTop: 5}}>
      <View
        style={{
          width: 357,
          height: 49,
          backgroundColor: 'white',
          alignSelf: 'center',
          flexDirection: 'row',
          borderRadius: 12,
          marginBottom: 8,
        }}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            source={require('../assests/search.png')}
            style={{width: 18, height: 18, marginLeft: 14, marginTop: 18}}
          />
        </TouchableOpacity>

        <TextInput
          placeholder="Type something..."
          style={{fontSize: 14, marginLeft: 14, marginTop: 14}}
          value={searchText}
          onChangeText={txt => {
            applyFilter(txt), setSearchText(txt);
          }}
        />
      </View>

      {(buttonPressed || buttonPressed1) && (
        <View style={{flexDirection: 'row', height: 50}}>
          {buttonPressed && (
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#00623B',
                width: '20%',
                left: 30,
                justifyContent: 'space-evenly',
                height: 33,
                alignItems: 'center',
                top: 6,
                borderRadius: 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setButtonPressed(null);
                  applyFilter();
                }}>
                <Image
                  source={require('../assests/close.png')}
                  style={{width: 12, height: 12, tintColor: 'white'}}
                />
              </TouchableOpacity>
              <Text style={{Width: 16.28, Height: 27.72, color: 'white'}}>
                {buttonPressed}
              </Text>
              <Image
                source={require('../assests/star.png')}
                style={{width: 12, height: 12}}
              />
            </View>
          )}

          {buttonPressed1 && (
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#00623B',
                width: '20%',
                left: 35,
                justifyContent: 'space-evenly',
                height: 33,
                alignItems: 'center',
                top: 6,
                borderRadius: 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setButtonPressed1(null);
                  applyFilter();
                }}>
                <Image
                  source={require('../assests/close.png')}
                  style={{width: 12, height: 12, tintColor: 'white'}}
                />
              </TouchableOpacity>
              <Text style={{Width: 16.28, Height: 27.72, color: 'white'}}>
                {buttonPressed1}
              </Text>
            </View>
          )}
        </View>
      )}

      <FlatList
        numColumns={2}
        data={filterData}
        renderItem={({item}) => {
          // console.log('Item.....:', item);

          return (
            <TouchableOpacity
              style={{
                width: 171,
                height: 204,
                backgroundColor: 'white',
                marginLeft: 16,
                marginTop: 24,
                borderWidth: 1,
                borderRadius: 15,
                borderColor: 'white',
                flexShrink: 0,
              }}
              onPress={() => displayProduct(item)}>
              <Image
                source={{uri: item?.thumbnail}}
                style={{
                  width: 151,
                  height: 134,
                  alignSelf: 'center',
                  resizeMode: 'contain',
                  marginTop: 20,
                  flexShrink: 0,
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 8,
                  marginTop: 10,
                }}>
                <Text style={{color: 'black'}}>
                  {item.title.substring(0, 11)}
                </Text>

                <Text style={{color: 'green', fontWeight: 'bold'}}>
                  ${item.price}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.7)'}}>
          <View
            style={{
              width: '100%',
              height: 350,
              backgroundColor: 'white',
              position: 'absolute',
              bottom: 0,
              borderTopEndRadius: 50,
              borderTopLeftRadius: 50,
            }}>
            <Text
              style={{
                fontSize: 24,
                color: 'black',
                fontWeight: 'bold',
                alignSelf: 'center',
                marginTop: 40,
              }}>
              Filter by
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: 'black',
                fontWeight: 'bold',
                marginLeft: 10,
                marginTop: 40,
              }}>
              Rating
            </Text>
            <ScrollView horizontal>
              {dummyArrayrating?.map(item => {
                return (
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      width: 50,
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      borderRadius: 10,
                      marginLeft: 10,
                      marginTop: 10,
                      height: 25,
                      padding: 3,
                      backgroundColor:
                        buttonPressed == item ? 'green' : 'white',
                    }}
                    onPress={() => setButtonPressed(item)}>
                    <Text
                      style={{
                        color: buttonPressed == item ? 'white' : 'black',
                        fontWeight: 'bold',
                      }}>
                      {item}
                    </Text>
                    <Image
                      source={require('../assests/star.png')}
                      style={{width: 16, height: 16, marginTop: 2}}
                    />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <Text
              style={{
                fontSize: 16,
                color: 'black',
                fontWeight: 'bold',
                marginLeft: 10,
                marginTop: 30,
              }}>
              Stock
            </Text>

            <ScrollView horizontal>
              {stockData?.map(item => {
                return (
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      borderRadius: 10,
                      marginLeft: 10,
                      marginTop: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingHorizontal: 10,
                      backgroundColor:
                        buttonPressed1 == item ? 'green' : 'white',
                    }}
                    onPress={() => setButtonPressed1(item)}>
                    <Text
                      style={{
                        color: buttonPressed1 == item ? 'white' : 'black',
                        fontWeight: 'bold',
                      }}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <TouchableOpacity
              style={{
                alignSelf: 'center',
                marginTop: 40,
                backgroundColor: 'green',
                width: '30%',
                height: 40,
                borderRadius: 10,
                bottom: 10,
              }}
              // onPress={() => setModalVisible(false)}
              onPress={() => {
                applyFilter(), setModalVisible(false);
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 18,
                  alignSelf: 'center',
                  marginTop: 8,
                }}>
                Apply
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FilterScreen;
