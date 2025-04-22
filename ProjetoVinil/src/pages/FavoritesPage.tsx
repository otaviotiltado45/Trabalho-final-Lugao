import React, { useContext } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import MusicCarousel from '../components/MusicCarousel';
import { MusicContext } from '../contexts/MusicContext';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.background};
  display: flex;
  flex-direction: column;
`;

const Content = styled.main`
  flex: 1;
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const FavoritesPage: React.FC = () => {
  const { favorites, toggleFavorite, removeMusic } = useContext(MusicContext);
  
  return (
    <PageContainer>
      <Header />
      
      <Content>
        <MusicCarousel 
          musicList={favorites}
          onToggleFavorite={toggleFavorite}
          onRemove={removeMusic}
          title="Músicas Favoritas"
        />
      </Content>
    </PageContainer>
  );
};

export default FavoritesPage;