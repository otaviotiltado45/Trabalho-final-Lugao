import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Menu, X, Moon, Sun, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import Sidebar from './Sidebar';
import { ThemeContext } from '../contexts/ThemeContext';
import { AuthContext } from '../contexts/AuthContext';
import SearchBar from './SearchBar';

interface HeaderProps {
  showSearchBar?: boolean;
  onSearch?: (query: string, filters: any) => void;
}

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background-color: ${({ theme }) => theme.headerBackground};
  box-shadow: ${({ theme }) => theme.shadow};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const ThemeToggle = styled(IconButton)`
  margin-left: 8px;
`;

const AvatarButton = styled(IconButton)`
  overflow: hidden;
  background-color: ${({ theme }) => theme.accent};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const MenuButton = styled(IconButton)`
  @media (max-width: 768px) {
    margin-right: 16px;
  }
`;

const SearchContainer = styled.div`
  margin-top: 16px;
  width: 100%;
`;

const Header: React.FC<HeaderProps> = ({ showSearchBar = false, onSearch }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleMenuClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const handleProfileClick = () => {
    navigate('/profile');
  };
  
  return (
    <>
      <HeaderContainer>
        <LeftSection>
          <MenuButton onClick={handleMenuClick}>
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </MenuButton>
          <Logo withText />
        </LeftSection>
        
        <RightSection>
          <ThemeToggle onClick={toggleTheme}>
            {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
          </ThemeToggle>
          
          <AvatarButton onClick={handleProfileClick}>
            {currentUser?.avatar ? (
              <Avatar src={currentUser.avatar} alt="Avatar" />
            ) : (
              <User size={24} />
            )}
          </AvatarButton>
        </RightSection>
      </HeaderContainer>
      
      {showSearchBar && (
        <SearchContainer>
          <SearchBar onSearch={onSearch} />
        </SearchContainer>
      )}
      
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default Header;