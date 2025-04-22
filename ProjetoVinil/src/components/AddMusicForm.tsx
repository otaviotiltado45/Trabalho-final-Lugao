import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { X, Plus, Link, Music } from 'lucide-react';
import { MusicContext } from '../contexts/MusicContext';

interface AddMusicFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')};
  transition: opacity 0.3s;
`;

const FormContainer = styled.div<{ isOpen: boolean }>`
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 24px;
  transform: translateY(${({ isOpen }) => (isOpen ? 0 : '20px')});
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition: transform 0.3s, opacity 0.3s;
`;

const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 6px;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 6px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const Select = styled.select`
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 6px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const LinksHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 8px;
`;

const LinksTitle = styled.h3`
  font-size: 18px;
  color: ${({ theme }) => theme.text};
`;

const AddLinkButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
`;

const LinkGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
`;

const LinkInput = styled(Input)`
  flex: 1;
`;

const LinkTypeSelect = styled(Select)`
  width: 30%;
`;

const RemoveLinkButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.error};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
`;

const CancelButton = styled.button`
  padding: 10px 20px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 6px;
  background: none;
  color: ${({ theme }) => theme.text};
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${({ theme }) => theme.borderColor};
  }
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  font-size: 16px;
  font-weight: bold;
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

interface MusicLink {
  url: string;
  type: string;
}

const AddMusicForm: React.FC<AddMusicFormProps> = ({ isOpen, onClose }) => {
  const { addMusic } = useContext(MusicContext);
  
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [genre, setGenre] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [links, setLinks] = useState<MusicLink[]>([{ url: '', type: 'spotify' }]);
  
  const resetForm = () => {
    setTitle('');
    setArtist('');
    setAlbum('');
    setReleaseDate('');
    setGenre('');
    setCoverImage('');
    setLinks([{ url: '', type: 'spotify' }]);
  };
  
  const handleClose = () => {
    resetForm();
    onClose();
  };
  
  const addLink = () => {
    setLinks([...links, { url: '', type: 'spotify' }]);
  };
  
  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };
  
  const updateLink = (index: number, field: keyof MusicLink, value: string) => {
    const updatedLinks = [...links];
    updatedLinks[index][field] = value;
    setLinks(updatedLinks);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formattedLinks: Record<string, string> = {};
    
    links.forEach(link => {
      if (link.url.trim() !== '') {
        formattedLinks[link.type] = link.url;
      }
    });
    
    addMusic({
      title,
      artist,
      album,
      releaseDate,
      genre,
      coverImage,
      links: formattedLinks,
    });
    
    handleClose();
  };
  
  const isFormValid = title && artist && album && releaseDate && genre;
  
  return (
    <Overlay isOpen={isOpen} onClick={handleClose}>
      <FormContainer isOpen={isOpen} onClick={e => e.stopPropagation()}>
        <FormHeader>
          <Title>Adicionar Música</Title>
          <CloseButton onClick={handleClose}>
            <X size={24} />
          </CloseButton>
        </FormHeader>
        
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="title">Nome da Música *</Label>
            <Input 
              id="title"
              type="text" 
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="artist">Artista *</Label>
            <Input 
              id="artist"
              type="text" 
              value={artist}
              onChange={e => setArtist(e.target.value)}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="album">Álbum *</Label>
            <Input 
              id="album"
              type="text" 
              value={album}
              onChange={e => setAlbum(e.target.value)}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="releaseDate">Data de Lançamento *</Label>
            <Input 
              id="releaseDate"
              type="date" 
              value={releaseDate}
              onChange={e => setReleaseDate(e.target.value)}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="genre">Gênero Musical *</Label>
            <Select 
              id="genre"
              value={genre}
              onChange={e => setGenre(e.target.value)}
              required
            >
              <option value="">Selecione um gênero</option>
              <option value="rock">Rock</option>
              <option value="pop">Pop</option>
              <option value="jazz">Jazz</option>
              <option value="blues">Blues</option>
              <option value="classical">Clássica</option>
              <option value="electronic">Eletrônica</option>
              <option value="hip-hop">Hip Hop</option>
              <option value="metal">Metal</option>
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="coverImage">URL da Imagem de Capa</Label>
            <Input 
              id="coverImage"
              type="url" 
              value={coverImage}
              onChange={e => setCoverImage(e.target.value)}
              placeholder="https://exemplo.com/imagem.jpg"
            />
          </FormGroup>
          
          <div>
            <LinksHeader>
              <LinksTitle>Links para serviços de streaming</LinksTitle>
              <AddLinkButton type="button" onClick={addLink}>
                <Plus size={16} />
                Adicionar link
              </AddLinkButton>
            </LinksHeader>
            
            {links.map((link, index) => (
              <LinkGroup key={index}>
                <LinkTypeSelect
                  value={link.type}
                  onChange={e => updateLink(index, 'type', e.target.value)}
                >
                  <option value="spotify">Spotify</option>
                  <option value="youtube">YouTube Music</option>
                  <option value="amazonMusic">Amazon Music</option>
                  <option value="applMusic">Apple Music</option>
                  <option value="deezer">Deezer</option>
                </LinkTypeSelect>
                <LinkInput 
                  type="url" 
                  value={link.url}
                  onChange={e => updateLink(index, 'url', e.target.value)}
                  placeholder="https://..."
                />
                {links.length > 1 && (
                  <RemoveLinkButton type="button" onClick={() => removeLink(index)}>
                    <X size={20} />
                  </RemoveLinkButton>
                )}
              </LinkGroup>
            ))}
          </div>
          
          <ButtonContainer>
            <CancelButton type="button" onClick={handleClose}>
              Cancelar
            </CancelButton>
            <SubmitButton type="submit" disabled={!isFormValid}>
              Adicionar
            </SubmitButton>
          </ButtonContainer>
        </Form>
      </FormContainer>
    </Overlay>
  );
};

export default AddMusicForm;