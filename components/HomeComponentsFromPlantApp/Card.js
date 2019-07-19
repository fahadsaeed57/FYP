import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import Block from './Block';
import { theme } from '../../constants/constantsFromPlantApp';
import {LinearGradient} from 'expo';


export default class Card extends Component {
  render() {
    const { color, style, children, ...props } = this.props;
    const cardStyles = [
      styles.card,
      style,
    ];

    return (
      <Block color={color || theme.colors.white} style={cardStyles} {...props}>
      {/* <LinearGradient
                colors={['#494871', '#494871']} > */}
        {children}
        {/* </LinearGradient> */}
      </Block>
    )
  }
}

export const styles = StyleSheet.create({
  card: {
    borderRadius: theme.sizes.radius,
    padding: theme.sizes.base + 4,
    marginBottom: theme.sizes.base,
  },shadow: {
    shadowColor: theme.colors.black,
    shadowOpacity: 0.11,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 13,
  }
})
