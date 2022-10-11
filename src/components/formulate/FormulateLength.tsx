import React from 'react';

export function formulateLength(num: number, formula: string): number {
  switch (formula) {
    case 'kilometer-meter':
      return num * 1000;
    case 'kilometer-centimeter':
      return num * 100000;
    case 'kilometer-millimeter':
      return num * 0.000001;
    case 'kilometer-micrometer':
      return num * 0.000000001;
    case 'kilometer-nanometer':
      return num * 1000000000000;
    case 'kilometer-mile':
      return num * 1.609;
    case 'kilometer-yard':
      return num * 1094;
    case 'kilometer-foot':
      return num * 3281;
    case 'kilometer-inch':
      return num * 39370;
    case 'kilometer-nauticalmile':
      return num * 1.852;
  }
  return NaN;
}
