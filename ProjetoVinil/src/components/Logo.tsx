import React from 'react';
import styled from 'styled-components';
import { Disc } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  withText?: boolean;
}

const LogoContainer = styled(Link)<{ size: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ size }) => (size === 'small' ? '8px' : size === 'medium' ? '12px' : '16px')};
  color: ${({ theme }) => theme.primary};
`;

const LogoDisc = styled(Disc)<{ size: string }>`
  width: ${({ size }) => (size === 'small' ? '24px' : size === 'medium' ? '32px' : '48px')};
  height: ${({ size }) => (size === 'small' ? '24px' : size === 'medium' ? '32px' : '48px')};
  animation: pulse 4s infinite ease-in-out;
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
`;

const LogoText = styled.span<{ size: string }>`
  font-family: 'Gill Sans Ultra Bold', sans-serif;
  font-size: ${({ size }) => (size === 'small' ? '18px' : size === 'medium' ? '24px' : '32px')};
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
`;

const Logo: React.FC<LogoProps> = ({ size = 'medium', withText = true }) => {
  return (
    <LogoContainer to="/home" size={size}>
      <LogoDisc size={size} />
      {withText && <LogoText size={size}>VinilBox</LogoText>}
    </LogoContainer>
  );
};

export default Logo;