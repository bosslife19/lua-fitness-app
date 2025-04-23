import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';

const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
};

const IconSymbols = ({ name, size = 24, color, style }) => {
  return <MaterialIcons color={color} size={size} name={MAPPING[name] || name} style={style} />;
};

export default IconSymbols;
