import React, { useContext } from 'react';
import styled from 'styled-components';
import { Home, Heart, UserCircle, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SidebarOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 150;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')};
  transition: opacity 0.3s ease;
`;

const SidebarContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 270px;
  background-color: ${({ theme }) => theme.cardBackground};
  box-shadow: ${({ theme }) => theme.shadow};
  z-index: 200;
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '-100%')});
  transition: transform 0.3s ease;
  padding: 24px 0;
  display: flex;
  flex-direction: column;
`;

const UserSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
  padding: 0 16px;
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 16px;
  border: 3px solid ${({ theme }) => theme.primary};
`;

const UserName = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  margin-bottom: 4px;
`;

const UserEmail = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.text}80;
`;

const MenuSection = styled.nav`
  flex: 1;
`;

const MenuItem = styled.a`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  color: ${({ theme }) => theme.text};
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${({ theme }) => theme.accent};
  }
  
  svg {
    margin-right: 12px;
    color: ${({ theme }) => theme.primary};
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  color: ${({ theme }) => theme.text};
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  
  &:hover {
    background-color: ${({ theme }) => theme.accent};
  }
  
  svg {
    margin-right: 12px;
    color: ${({ theme }) => theme.error};
  }
`;

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { currentUser, logout } = useContext(AuthContext);
  
  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };
  
  const handleLogout = () => {
    logout();
    navigate('/login');
    onClose();
  };
  
  return (
    <>
      <SidebarOverlay isOpen={isOpen} onClick={onClose} />
      <SidebarContainer isOpen={isOpen}>
        <UserSection>
          <Avatar src={currentUser?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'} alt="Avatar" />
          <UserName>{currentUser?.name || 'Usuário'}</UserName>
          <UserEmail>{currentUser?.email || 'email@exemplo.com'}</UserEmail>
        </UserSection>
        
        <MenuSection>
          <MenuItem onClick={() => handleNavigation('/home')}>
            <Home size={20} />
            Início
          </MenuItem>
          <MenuItem onClick={() => handleNavigation('/favorites')}>
            <Heart size={20} />
            Favoritos
          </MenuItem>
          <MenuItem onClick={() => handleNavigation('/profile')}>
            <UserCircle size={20} />
            Perfil
          </MenuItem>
        </MenuSection>
        
        <LogoutButton onClick={handleLogout}>
          <LogOut size={20} />
          Sair
        </LogoutButton>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;