import React from 'react';
import styled from 'styled-components';
import { Heart, Trash2, Music } from 'lucide-react';
import { Music as MusicType } from '../contexts/MusicContext';

interface MusicCardProps {
  music: MusicType;
  onToggleFavorite: (id: string) => void;
  onRemove: (id: string) => void;
}

const CardContainer = styled.div`
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadow};
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  width: 100%;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
`;

const CoverImage = styled.div<{ imageUrl: string }>`
  height: 180px;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  position: relative;
`;

const FallbackCover = styled.div`
  height: 180px;
  background-color: ${({ theme }) => theme.accent};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardContent = styled.div`
  padding: 16px;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 4px;
  color: ${({ theme }) => theme.text};
`;

const Artist = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.text}B0;
  margin-bottom: 8px;
`;

const AlbumInfo = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.text}90;
  margin-bottom: 8px;
`;

const Genre = styled.span`
  display: inline-block;
  background-color: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.primary};
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  margin-bottom: 12px;
`;

const LinksContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

const ServiceLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.primary};
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: white;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 4px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${({ theme }) => theme.accent};
  }
`;

const FavoriteButton = styled(ActionButton)<{ isFavorite: boolean }>`
  color: ${({ isFavorite, theme }) => (isFavorite ? theme.error : theme.text)};
  
  svg {
    fill: ${({ isFavorite, theme }) => (isFavorite ? theme.error : 'none')};
  }
`;

const RemoveButton = styled(ActionButton)`
  color: ${({ theme }) => theme.error};
`;

const MusicCard: React.FC<MusicCardProps> = ({ music, onToggleFavorite, onRemove }) => {
  const {
    id,
    title,
    artist,
    album,
    releaseDate,
    genre,
    coverImage,
    links,
    isFavorite
  } = music;
  
  const releaseYear = new Date(releaseDate).getFullYear();
  
  const getServiceIcon = (service: string) => {
    // In a real app, you'd use proper service logos
    return <Music size={18} />;
  };
  
  return (
    <CardContainer>
      {coverImage ? (
        <CoverImage imageUrl={coverImage} />
      ) : (
        <FallbackCover>
          <Music size={64} color="#9A00E7" />
        </FallbackCover>
      )}
      
      <CardContent>
        <Title>{title}</Title>
        <Artist>{artist}</Artist>
        <AlbumInfo>{album} ({releaseYear})</AlbumInfo>
        <Genre>{genre}</Genre>
        
        <LinksContainer>
          {links.spotify && (
            <ServiceLink href={links.spotify} target="_blank" rel="noopener noreferrer" title="Spotify">
              {getServiceIcon('spotify')}
            </ServiceLink>
          )}
          {links.youtube && (
            <ServiceLink href={links.youtube} target="_blank" rel="noopener noreferrer" title="YouTube Music">
              {getServiceIcon('youtube')}
            </ServiceLink>
          )}
          {links.amazonMusic && (
            <ServiceLink href={links.amazonMusic} target="_blank" rel="noopener noreferrer" title="Amazon Music">
              {getServiceIcon('amazon')}
            </ServiceLink>
          )}
          {links.applMusic && (
            <ServiceLink href={links.applMusic} target="_blank" rel="noopener noreferrer" title="Apple Music">
              {getServiceIcon('apple')}
            </ServiceLink>
          )}
          {links.deezer && (
            <ServiceLink href={links.deezer} target="_blank" rel="noopener noreferrer" title="Deezer">
              {getServiceIcon('deezer')}
            </ServiceLink>
          )}
        </LinksContainer>
        
        <ActionButtons>
          <FavoriteButton 
            isFavorite={isFavorite} 
            onClick={() => onToggleFavorite(id)}
          >
            <Heart size={18} />
            {isFavorite ? 'Favoritado' : 'Favoritar'}
          </FavoriteButton>
          
          <RemoveButton onClick={() => onRemove(id)}>
            <Trash2 size={18} />
            Remover
          </RemoveButton>
        </ActionButtons>
      </CardContent>
    </CardContainer>
  );
};

export default MusicCard;