import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';

import Carousel from 'react-native-snap-carousel';
import {useNavigation} from '@react-navigation/native';

const ProductDisplay = ({route}) => {
  const nav3 = useNavigation();

  console.log('hiiii', route);
  const {
    brand,
    category,
    description,
    discountPercentage,
    id,
    images,
    price,
    rating,
    stock,
    thumbnail,
    title,
  } = route?.params?.data;
  console.log('images,images', images);
  return (
    <View style={{flex: 1, marginTop: 20}}>
      <View
        style={{
          flexDirection: 'row',
          left: 12,
        }}>
        <TouchableOpacity onPress={() => nav3.goBack()}>
          <Image
            source={require('../assests/backbutton.png')}
            style={{width: 24, height: 24}}
          />
        </TouchableOpacity>
        <Text
          style={{fontSize: 20, color: 'black', fontWeight: 'bold', left: 120}}>
          {title}
        </Text>
      </View>
      <View>
        <Carousel
          data={images}
          sliderWidth={800}
          itemWidth={700}
          renderItem={({item}) => {
            console.log('cara...', item);
            return (
              <View
                style={{
                  width: 280,
                  height: 270,
                  marginTop: 50,
                }}>
                <Image
                  source={{uri: item}}
                  style={{
                    width: 280,
                    height: 240,
                    padding: 20,
                    resizeMode: 'contain',
                  }}
                />
              </View>
            );
          }}
        />
      </View>

      <View style={{left: 12, justifyContent: 'center'}}>
        <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
          Description
        </Text>
        <View
          style={{
            flexDirection: 'row',

            justifyContent: 'space-between',
          }}>
          <Text style={{width: '70%'}}> {description}</Text>
          <Text
            style={{
              color: 'green',
              fontWeight: 'bold',
              fontSize: 20,
              marginRight: 24,
            }}>
            $ {price}
          </Text>
        </View>
        <View
          style={{
            width: '90%',
            borderTopWidth: 0.5,
            marginTop: 20,
            color: 'grey',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: 20,
              marginTop: 20,
            }}>
            Stock
          </Text>
          <Text
            style={{
              color: 'green',
              fontWeight: 'bold',
              fontSize: 20,
              marginTop: 20,
            }}>
            {stock}
          </Text>
        </View>

        <View style={{flexDirection: 'row', marginTop: 20}}>
          <TouchableOpacity
            style={{backgroundColor: 'green', borderRadius: 10}}>
            <Text style={{color: 'white', fontWeight: 'bold', padding: 8}}>
              In Stock
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{backgroundColor: 'red', left: 10, borderRadius: 10}}>
            <Text style={{color: 'white', fontWeight: 'bold', padding: 8}}>
              Out Of Stock
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: '90%',
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: 20,
              marginTop: 20,
            }}>
            Rating
          </Text>
          <Text
            style={{
              color: 'green',
              fontWeight: 'bold',
              fontSize: 20,
              marginTop: 20,
            }}>
            {rating}
          </Text>
        </View>
        <View
          style={{
            width: '90%',
            marginTop: 10,
          }}>
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: 20,
              marginTop: 20,
            }}>
            Discount Percentage
          </Text>
          <Text
            style={{
              color: 'green',
              fontWeight: 'bold',
              fontSize: 20,
              marginTop: 5,
            }}>
            {discountPercentage}%
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProductDisplay;
