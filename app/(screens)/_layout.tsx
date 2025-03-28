import { Text, View } from 'react-native';
import React, { Component } from 'react';
import { Stack } from 'expo-router';

export default class _layout extends Component {
  render() {
    return (
      <Stack>
        <Stack.Screen
          name="checkin"
          options={{
            title: 'Checkin',
          }}
        />
        <Stack.Screen
          name="checkout"
          options={{
            title: 'Checkout',
          }}
        />
        <Stack.Screen
          name="holds"
          options={{
            title: 'Book Outside',
          }}
        />
        <Stack.Screen
          name="overdues"
          options={{
            title: 'Books Not Returned',
          }}
        />
        <Stack.Screen
          name="renew"
          options={{
            title: 'Renew Book',
          }}
        />
        <Stack.Screen
          name="patron"
          options={{
            title: 'Patron Profile',
          }}
        />
      </Stack>
    );
  }
}
