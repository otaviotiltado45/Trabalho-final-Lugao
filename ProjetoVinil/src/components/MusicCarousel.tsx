import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MusicCard from './MusicCard';
import { Music } from '../contexts/MusicContext';

interface MusicCarouselProps {
  musicList: Music[];
  onToggleFavorite: (id: string) => void;
  onRemove: (id: string) => void;
  title: string;
}

const CarouselContainer = styled.div`
  margin: 0 24px;
  position: relative;
`;

const CarouselHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;

const Navigation = styled.div`
  display: flex;
  gap: 8px;
`;

const NavButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.borderColor};
    cursor: not-allowed;
  }
`;

const CarouselTrack = styled.div`
  display: flex;
  overflow-x: hidden;
  gap: 24px;
  scroll-behavior: smooth;
  padding: 8px 4px;
  -webkit-overflow-scrolling: touch;
`;

const CardWrapper = styled.div`
  flex: 0 0 300px;
  max-width: 300px;
  
  @media (max-width: 768px) {
    flex: 0 0 250px;
    max-width: 250px;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 8px;
  width: 100%;
  text-align: center;
`;

const EmptyStateText = styled.p`
  color: ${({ theme }) => theme.text}80;
  font-size: 16px;
  margin-top: 8px;
`;

const MusicCarousel: React.FC<MusicCarouselProps> = ({ 
  musicList, 
  onToggleFavorite, 
  onRemove, 
  title 
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = useState(0);
  const [cardWidth, setCardWidth] = useState(300);
  
  useEffect(() => {
    const calculateDimensions = () => {
      if (trackRef.current) {
        const track = trackRef.current;
        const newCardWidth = window.innerWidth < 768 ? 250 : 300;
        setCardWidth(newCardWidth + 24); // Card width + gap
        setMaxScroll(track.scrollWidth - track.clientWidth);
      }
    };
    
    calculateDimensions();
    
    window.addEventListener('resize', calculateDimensions);
    return () => window.removeEventListener('resize', calculateDimensions);
  }, [musicList]);
  
  const scrollLeft = () => {
    if (trackRef.current) {
      const newPosition = Math.max(0, scrollPosition - cardWidth * 2);
      trackRef.current.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };
  
  const scrollRight = () => {
    if (trackRef.current) {
      const newPosition = Math.min(maxScroll, scrollPosition + cardWidth * 2);
      trackRef.current.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };
  
  const handleScroll = () => {
    if (trackRef.current) {
      setScrollPosition(trackRef.current.scrollLeft);
    }
  };
  
  return (
    <CarouselContainer>
      <CarouselHeader>
        <Title>{title}</Title>
        {musicList.length > 0 && (
          <Navigation>
            <NavButton 
              onClick={scrollLeft} 
              disabled={scrollPosition <= 0}
            >
              <ChevronLeft size={20} />
            </NavButton>
            <NavButton 
              onClick={scrollRight} 
              disabled={scrollPosition >= maxScroll}
            >
              <ChevronRight size={20} />
            </NavButton>
          </Navigation>
        )}
      </CarouselHeader>
      
      {musicList.length > 0 ? (
        <CarouselTrack 
          ref={trackRef}
          onScroll={handleScroll}
        >
          {musicList.map(music => (
            <CardWrapper key={music.id}>
              <MusicCard 
                music={music} 
                onToggleFavorite={onToggleFavorite} 
                onRemove={onRemove} 
              />
            </CardWrapper>
          ))}
        </CarouselTrack>
      ) : (
        <EmptyState>
          <EmptyStateText>
            Não há músicas para exibir. Adicione novas músicas à sua coleção!
          </EmptyStateText>
        </EmptyState>
      )}
    </CarouselContainer>
  );
};

export default MusicCarousel;