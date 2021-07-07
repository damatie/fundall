import { useState } from 'react';

export const useConvertToArray = () => {
  let number = []
  const convert = (num) => {
    switch(num) {
      case '1': {
        number = [1];
        // console.log(number)
      }
      case '2': {
        number = [1, 2];
      }
      case '3': {
        return ['', '', ''];
      }
      case '4': {
        return ['', '', '', ''];
      }
      case '5': {
        return ['', '', '', '', ''];
      }
      case '6': {
        return ['', '', '', '', '', ''];
      }
      case '7': {
        return ['', '', '', '', '', '', ''];
      }
      case '8': {
        return ['', '', '', '', '', '', '', ''];
      }
      case '9': {
        return ['', '', '', '', '', '', '', '', ''];
      }
      case '10': {
        return ['', '', '', '', '', '', '', '', '', ''];
      }
      default: {
        return [];
      }
    };
  }

  return { convert, number }
}