import { DefaultTheme } from 'styled-components';

export interface Theme extends DefaultTheme {
  background: string;
  text: string;
  primary: string;
  secondary: string;
  tertiary: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
  cardBackground: string;
  headerBackground: string;
  borderColor: string;
  inputBackground: string;
  shadow: string;
}

export const lightTheme: Theme = {
  background: '#f5f5f5',
  text: '#333333',
  primary: '#9A00E7',
  secondary: '#7B00B8',
  tertiary: '#BF5DFF',
  accent: '#E5D4F0',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  cardBackground: '#ffffff',
  headerBackground: '#ffffff',
  borderColor: '#e0e0e0',
  inputBackground: '#ffffff',
  shadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
};

export const darkTheme: Theme = {
  background: '#1a1a1a',
  text: '#f5f5f5',
  primary: '#9A00E7',
  secondary: '#BF5DFF',
  tertiary: '#7B00B8',
  accent: '#462661',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  cardBackground: '#2c2c2c',
  headerBackground: '#252525',
  borderColor: '#444444',
  inputBackground: '#333333',
  shadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
};