import React, { useState } from 'react';
import styled from 'styled-components';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

interface SearchBarProps {
  onSearch?: (query: string, filters: any) => void;
}

const SearchContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 8px;
  padding: 16px;
  box-shadow: ${({ theme }) => theme.shadow};
`;

const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.inputBackground};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 8px;
  padding: 8px 16px;
`;

const SearchIcon = styled(Search)`
  color: ${({ theme }) => theme.primary};
  margin-right: 8px;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  background: none;
  font-size: 16px;
  color: ${({ theme }) => theme.text};
  outline: none;
  
  &::placeholder {
    color: ${({ theme }) => theme.text}80;
  }
`;

const AdvancedFiltersToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.primary};
  font-size: 14px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${({ theme }) => theme.accent};
  }
  
  svg {
    margin-left: 4px;
  }
`;

const FiltersContainer = styled.div<{ isVisible: boolean }>`
  margin-top: ${({ isVisible }) => (isVisible ? '16px' : '0')};
  display: ${({ isVisible }) => (isVisible ? 'grid' : 'none')};
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  overflow: hidden;
  max-height: ${({ isVisible }) => (isVisible ? '300px' : '0')};
  transition: max-height 0.3s;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const FilterLabel = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.text};
  margin-bottom: 4px;
`;

const FilterInput = styled.input`
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  outline: none;
  
  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const FilterSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  outline: none;
  
  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`;

const SearchButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }
`;

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    genre: '',
    artist: '',
    album: '',
    releaseDate: '',
  });
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSearch = () => {
    if (onSearch) {
      onSearch(query, filters);
    }
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  return (
    <SearchContainer>
      <SearchInputContainer>
        <SearchIcon size={20} />
        <Input 
          type="text" 
          placeholder="Buscar músicas, artistas ou álbuns..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </SearchInputContainer>
      
      <AdvancedFiltersToggle onClick={toggleFilters}>
        Filtros avançados
        {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </AdvancedFiltersToggle>
      
      <FiltersContainer isVisible={showFilters}>
        <FilterGroup>
          <FilterLabel>Gênero</FilterLabel>
          <FilterSelect name="genre" value={filters.genre} onChange={handleFilterChange}>
            <option value="">Todos os gêneros</option>
            <option value="rock">Rock</option>
            <option value="pop">Pop</option>
            <option value="jazz">Jazz</option>
            <option value="blues">Blues</option>
            <option value="classical">Clássica</option>
            <option value="electronic">Eletrônica</option>
            <option value="hip-hop">Hip Hop</option>
            <option value="metal">Metal</option>
          </FilterSelect>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel>Artista</FilterLabel>
          <FilterInput 
            type="text" 
            name="artist"
            placeholder="Nome do artista" 
            value={filters.artist}
            onChange={handleFilterChange}
          />
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel>Álbum</FilterLabel>
          <FilterInput 
            type="text" 
            name="album"
            placeholder="Nome do álbum" 
            value={filters.album}
            onChange={handleFilterChange}
          />
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel>Ano de lançamento</FilterLabel>
          <FilterInput 
            type="number" 
            name="releaseDate"
            placeholder="Ex: 2023" 
            value={filters.releaseDate}
            onChange={handleFilterChange}
          />
        </FilterGroup>
        
        <ButtonContainer>
          <SearchButton onClick={handleSearch}>Buscar</SearchButton>
        </ButtonContainer>
      </FiltersContainer>
    </SearchContainer>
  );
};

export default SearchBar;