import React from 'react';
import { Svg, Rect, Defs, RadialGradient, Stop } from 'react-native-svg';

interface DecorationSvgProps {
  width?: number;
  height?: number;
}

export default function DecorationSvg({
  width = 380,
  height = 251,
}: DecorationSvgProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 380 251" fill="none">
      <Rect
        width="380"
        height="251"
        fill="url(#paint0_radial_295_17)"
        fillOpacity="0.2"
      />
      <Defs>
        <RadialGradient
          id="paint0_radial_295_17"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(190 125.5) rotate(90) scale(125.5 190)"
        >
          <Stop stopColor="#00A3FF" />
          <Stop offset="0.956731" stopColor="#00A3FF" stopOpacity="0" />
        </RadialGradient>
      </Defs>
    </Svg>
  );
}
