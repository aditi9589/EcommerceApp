import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

const WelcomeScreen = () => {
  const nav1 = useNavigation();
  const [mydata, setmydata] = useState([]);
  const [categorydata, setCategorydata] = useState([]);
  const [dataByCategory, setDataByCategory] = useState([]);
  const [onpressCategory, setonpressCategory] = useState(0);

  const handleSearchPress = () => {
    nav1.navigate('FilterScreen', {searchData: mydata});
  };

  const displayProduct = item => {
    nav1.navigate('ProductDisplay', {data: item});
  };
  console.log('mydata', mydata);
  const getApiData = async () => {
    const url = 'https://dummyjson.com/products';
    let result = await fetch(url);

    console.log('result 11111', result);

    const result2 = await result.json();

    console.log('result 11111221111', result2);

    const temp = result2?.products?.map(item => item?.category);
    console.log('temp', temp); // this will create new array of category only

    const categoryData = temp?.filter(
      (item, index) => temp?.indexOf(item) === index,
    ); // filter the common category
    // console.log('abc', categoryData?.unshift('view All'));
    setmydata(result2?.products);
    categoryData?.unshift('View All');

    setCategorydata(categoryData); // filtered data

    // console.log('You are getting', result);
  };

  useEffect(() => {
    getApiData();
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: '#F0F8FF'}}>
      <Text
        style={{
          fontSize: 25,
          color: 'black',
          fontWeight: 700,
          marginLeft: 14,
          marginTop: 14,
        }}>
        Welcome 👋
      </Text>
      <Text style={{lineHeight: 52, color: 'black', marginLeft: 14}}>
        Let’s order and enjoy your order now.
      </Text>

      <TouchableOpacity
        style={{
          width: 357,
          height: 49,
          backgroundColor: 'white',
          alignSelf: 'center',
          flexDirection: 'row',
          borderRadius: 12,
        }}
        onPress={handleSearchPress}>
        <Image
          source={require('../assests/search.png')}
          style={{width: 18, height: 18, marginLeft: 14, marginTop: 18}}
        />
        <Text style={{fontSize: 14, marginLeft: 14, marginTop: 14}}>
          Type something...
        </Text>
      </TouchableOpacity>
      <ScrollView horizontal style={{minHeight: 50, marginTop: 5}}>
        {categorydata?.map((item, index) => {
          //item?.category = 'smartphone'

          return (
            <TouchableOpacity
              style={{
                marginHorizontal: 10,
                alignItems: 'center',
                height: 36,
                justifyContent: 'center',
                backgroundColor: onpressCategory == index ? '#00623B' : null,
                padding: 6,
                borderRadius: 14,
                marginTop: 12,
              }}
              onPress={() => {
                const temp1 = mydata.filter(data => {
                  console.log('we are getting', data.category, item);
                  if (data?.category == item) {
                    return data;
                  }
                });
                setDataByCategory(temp1);
                setonpressCategory(index);
                console.log('temp1', temp1);
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: onpressCategory == index ? 'white' : 'black',
                }}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <FlatList
        numColumns={2}
        data={dataByCategory?.length ? dataByCategory : mydata}
        renderItem={({item}) => {
          console.log('Item:', item);

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
              {/* <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  marginTop: 20,
                  backgroundColor: 'orange',
                  height: 25,
                  width: 85,
                  borderRadius: 8,
                }}>
                <Text style={{color: 'black', marginTop: 2}}> Add To Cart</Text>
              </TouchableOpacity> */}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default WelcomeScreen;
