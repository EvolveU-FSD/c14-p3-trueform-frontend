// src/components/common/CrossImage.tsx
import React from 'react';
import { Image, ImageProps, ImageBackground, ImageBackgroundProps } from 'react-native';
import { processImageSource } from '../utils/imageUtils';

type CrossImageProps = Omit<ImageProps, 'source'> & {
  source: any;
};

/**
 * Cross-platform Image component that handles different image source formats
 */
export function CrossImage(props: CrossImageProps) {
  const { source, ...otherProps } = props;
  const processedSource = processImageSource(source);
  return <Image source={processedSource} {...otherProps} />;
}

type CrossImageBackgroundProps = Omit<ImageBackgroundProps, 'source'> & {
  source: any;
};

/**
 * Cross-platform ImageBackground component that handles different image source formats
 */
export function CrossImageBackground(props: CrossImageBackgroundProps) {
  const { source, children, ...otherProps } = props;
  const processedSource = processImageSource(source);
  return (
    <ImageBackground source={processedSource} {...otherProps}>
      {children}
    </ImageBackground>
  );
}