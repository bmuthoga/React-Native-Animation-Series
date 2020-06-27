import React from 'react';
import Image from '../../components/Image/';
import {images} from '../../api/images';

export default function() {
  return images.map((image, index) => (
    <Image key={index} imageUri={image.uri} />
  ));
}
