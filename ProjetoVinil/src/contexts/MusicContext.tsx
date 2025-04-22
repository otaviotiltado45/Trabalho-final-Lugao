import React, { createContext, useState, useContext } from 'react';
import { AuthContext } from './AuthContext';

export interface Music {
  id: string;
  title: string;
  artist: string;
  album: string;
  releaseDate: string;
  genre: string;
  coverImage: string;
  links: {
    youtube?: string;
    spotify?: string;
    amazonMusic?: string;
    applMusic?: string;
    deezer?: string;
  };
  createdBy: string;
  isFavorite: boolean;
}

interface MusicContextType {
  musicList: Music[];
  favorites: Music[];
  addMusic: (musicData: Omit<Music, 'id' | 'createdBy' | 'isFavorite'>) => void;
  removeMusic: (id: string) => void;
  toggleFavorite: (id: string) => void;
  searchMusic: (query: string, filters?: Partial<Music>) => Music[];
}

export const MusicContext = createContext<MusicContextType>({
  musicList: [],
  favorites: [],
  addMusic: () => {},
  removeMusic: () => {},
  toggleFavorite: () => {},
  searchMusic: () => [],
});

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [musicList, setMusicList] = useState<Music[]>(() => {
    const storedMusic = localStorage.getItem('vinilbox_music');
    return storedMusic ? JSON.parse(storedMusic) : [];
  });

  const { currentUser } = useContext(AuthContext);

  // Calculated favorites based on musicList
  const favorites = musicList.filter(music => music.isFavorite);

  const addMusic = (musicData: Omit<Music, 'id' | 'createdBy' | 'isFavorite'>) => {
    if (!currentUser) return;
    
    const newMusic: Music = {
      ...musicData,
      id: `music_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdBy: currentUser.id,
      isFavorite: false,
    };
    
    const updatedMusicList = [...musicList, newMusic];
    setMusicList(updatedMusicList);
    localStorage.setItem('vinilbox_music', JSON.stringify(updatedMusicList));
  };

  const removeMusic = (id: string) => {
    const updatedMusicList = musicList.filter(music => music.id !== id);
    setMusicList(updatedMusicList);
    localStorage.setItem('vinilbox_music', JSON.stringify(updatedMusicList));
  };

  const toggleFavorite = (id: string) => {
    const updatedMusicList = musicList.map(music => 
      music.id === id ? { ...music, isFavorite: !music.isFavorite } : music
    );
    setMusicList(updatedMusicList);
    localStorage.setItem('vinilbox_music', JSON.stringify(updatedMusicList));
  };

  const searchMusic = (query: string, filters?: Partial<Music>) => {
    if (!query && !filters) return musicList;
    
    return musicList.filter(music => {
      // First check if music matches text query
      const matchesQuery = query ? 
        music.title.toLowerCase().includes(query.toLowerCase()) ||
        music.artist.toLowerCase().includes(query.toLowerCase()) ||
        music.album.toLowerCase().includes(query.toLowerCase()) : true;
      
      // Then check if it matches all specified filters
      if (!filters) return matchesQuery;
      
      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        const musicKey = key as keyof Music;
        return music[musicKey]?.toString().toLowerCase().includes(value.toString().toLowerCase());
      });
      
      return matchesQuery && matchesFilters;
    });
  };

  const value = {
    musicList,
    favorites,
    addMusic,
    removeMusic,
    toggleFavorite,
    searchMusic
  };

  return (
    <MusicContext.Provider value={value}>
      {children}
    </MusicContext.Provider>
  );
};