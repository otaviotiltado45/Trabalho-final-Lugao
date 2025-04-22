import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import styled from 'styled-components';
import { Disc } from 'lucide-react';

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.background};
`;

const RotatingDisc = styled(Disc)`
  color: ${({ theme }) => theme.primary};
  animation: spin 2s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  margin-top: 16px;
  font-size: 18px;
  color: ${({ theme }) => theme.primary};
`;

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, isLoading } = useContext(AuthContext);
  
  if (isLoading) {
    return (
      <LoadingContainer>
        <RotatingDisc size={48} />
        <LoadingText>Carregando VinilBox...</LoadingText>
      </LoadingContainer>
    );
  }
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;