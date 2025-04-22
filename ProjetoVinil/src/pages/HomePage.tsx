import React, { useState, useContext, useMemo } from 'react';
import styled from 'styled-components';
import { PlusCircle } from 'lucide-react';
import Header from '../components/Header';
import MusicCarousel from '../components/MusicCarousel';
import AddMusicForm from '../components/AddMusicForm';
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

const AddButtonContainer = styled.div`
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 100;
`;

const AddButton = styled.button`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s, background-color 0.2s;
  
  &:hover {
    background-color: ${({ theme }) => theme.secondary};
    transform: scale(1.05);
  }
`;

const HomePage: React.FC = () => {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilters, setSearchFilters] = useState({});
  
  const { musicList, toggleFavorite, removeMusic } = useContext(MusicContext);
  
  const filteredMusic = useMemo(() => {
    if (!searchQuery && Object.keys(searchFilters).length === 0) {
      return musicList;
    }
    
    return musicList.filter(music => {
      // Check if music matches text search
      const matchesQuery = !searchQuery || 
        music.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        music.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        music.album.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Check if music matches all filters
      const matchesFilters = Object.entries(searchFilters).every(([key, value]) => {
        if (!value) return true;
        const musicKey = key as keyof typeof music;
        return music[musicKey]?.toString().toLowerCase().includes(value.toString().toLowerCase());
      });
      
      return matchesQuery && matchesFilters;
    });
  }, [musicList, searchQuery, searchFilters]);
  
  const recentlyAdded = useMemo(() => {
    return [...filteredMusic].sort((a, b) => {
      return b.id.localeCompare(a.id); // Simple sorting by ID which contains timestamp
    });
  }, [filteredMusic]);
  
  const handleSearch = (query: string, filters: any) => {
    setSearchQuery(query);
    setSearchFilters(filters);
  };
  
  return (
    <PageContainer>
      <Header showSearchBar onSearch={handleSearch} />
      
      <Content>
        <MusicCarousel 
          musicList={recentlyAdded} 
          onToggleFavorite={toggleFavorite} 
          onRemove={removeMusic}
          title="Sua Coleção"
        />
      </Content>
      
      <AddButtonContainer>
        <AddButton onClick={() => setIsAddFormOpen(true)}>
          <PlusCircle size={24} />
        </AddButton>
      </AddButtonContainer>
      
      <AddMusicForm 
        isOpen={isAddFormOpen} 
        onClose={() => setIsAddFormOpen(false)} 
      />
    </PageContainer>
  );
};

export default HomePage;