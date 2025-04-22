import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Edit, Save } from 'lucide-react';
import Header from '../components/Header';
import { AuthContext } from '../contexts/AuthContext';
import { MusicContext } from '../contexts/MusicContext';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.background};
  display: flex;
  flex-direction: column;
`;

const Content = styled.main`
  flex: 1;
  padding: 24px;
  display: flex;
  justify-content: center;
`;

const ProfileCard = styled.div`
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadow};
  width: 100%;
  max-width: 600px;
  padding: 32px;
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
`;

const AvatarContainer = styled.div`
  position: relative;
  margin-bottom: 16px;
`;

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid ${({ theme }) => theme.primary};
`;

const EditAvatarButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const UserName = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  margin-bottom: 4px;
`;

const UserDetails = styled.div`
  color: ${({ theme }) => theme.text}80;
  font-size: 16px;
  text-align: center;
`;

const ProfileSection = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;

const EditButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const InfoItem = styled.div``;

const InfoLabel = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.text}80;
  margin-bottom: 4px;
`;

const InfoValue = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.text};
`;

const EditForm = styled.form`
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
  margin-bottom: 4px;
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

const TextArea = styled.textarea`
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 6px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  resize: vertical;
  min-height: 80px;
  
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const CancelButton = styled.button`
  padding: 10px 16px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 6px;
  background: none;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  cursor: pointer;
`;

const SaveButton = styled.button`
  padding: 10px 16px;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 32px;
`;

const StatCard = styled.div`
  background-color: ${({ theme }) => theme.accent};
  border-radius: 8px;
  padding: 16px;
  text-align: center;
`;

const StatValue = styled.h3`
  font-size: 28px;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 4px;
`;

const StatLabel = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`;

const ProfilePage: React.FC = () => {
  const { currentUser, updateProfile } = useContext(AuthContext);
  const { musicList, favorites } = useContext(MusicContext);
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    birthDate: currentUser?.birthDate || '',
    gender: currentUser?.gender || '',
    bio: currentUser?.bio || '',
    avatar: currentUser?.avatar || '',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };
  
  const cancelEditing = () => {
    setFormData({
      name: currentUser?.name || '',
      birthDate: currentUser?.birthDate || '',
      gender: currentUser?.gender || '',
      bio: currentUser?.bio || '',
      avatar: currentUser?.avatar || '',
    });
    setIsEditing(false);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };
  
  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    
    return age;
  };
  
  if (!currentUser) return null;
  
  return (
    <PageContainer>
      <Header />
      
      <Content>
        <ProfileCard>
          <ProfileHeader>
            <AvatarContainer>
              <Avatar src={currentUser.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'} alt="Avatar do usuário" />
              {isEditing && (
                <EditAvatarButton>
                  <Edit size={16} />
                </EditAvatarButton>
              )}
            </AvatarContainer>
            <UserName>{currentUser.name}</UserName>
            <UserDetails>{calculateAge(currentUser.birthDate)} anos • {currentUser.gender || 'Não informado'}</UserDetails>
          </ProfileHeader>
          
          {isEditing ? (
            <EditForm onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="name">Nome</Label>
                <Input 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="birthDate">Data de Nascimento</Label>
                <Input 
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="gender">Gênero</Label>
                <Select 
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Prefiro não informar</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Não-binário">Não-binário</option>
                  <option value="Outro">Outro</option>
                </Select>
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="bio">Biografia (max. 140 caracteres)</Label>
                <TextArea 
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  maxLength={140}
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="avatar">URL da foto de perfil</Label>
                <Input 
                  id="avatar"
                  name="avatar"
                  type="url"
                  value={formData.avatar}
                  onChange={handleInputChange}
                  placeholder="https://exemplo.com/avatar.jpg"
                />
              </FormGroup>
              
              <ButtonContainer>
                <CancelButton type="button" onClick={cancelEditing}>
                  Cancelar
                </CancelButton>
                <SaveButton type="submit">
                  <Save size={16} />
                  Salvar
                </SaveButton>
              </ButtonContainer>
            </EditForm>
          ) : (
            <>
              <ProfileSection>
                <SectionTitle>
                  <Title>Informações Pessoais</Title>
                  <EditButton onClick={() => setIsEditing(true)}>
                    <Edit size={16} />
                    Editar
                  </EditButton>
                </SectionTitle>
                
                <InfoGrid>
                  <InfoItem>
                    <InfoLabel>Nome</InfoLabel>
                    <InfoValue>{currentUser.name}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>E-mail</InfoLabel>
                    <InfoValue>{currentUser.email}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Data de Nascimento</InfoLabel>
                    <InfoValue>{formatDate(currentUser.birthDate)}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Gênero</InfoLabel>
                    <InfoValue>{currentUser.gender || 'Não informado'}</InfoValue>
                  </InfoItem>
                </InfoGrid>
                
                {currentUser.bio && (
                  <div style={{ marginTop: '16px' }}>
                    <InfoLabel>Biografia</InfoLabel>
                    <InfoValue>{currentUser.bio}</InfoValue>
                  </div>
                )}
              </ProfileSection>
              
              <StatsContainer>
                <StatCard>
                  <StatValue>{favorites.length}</StatValue>
                  <StatLabel>Músicas Favoritadas</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>{musicList.length}</StatValue>
                  <StatLabel>Músicas Adicionadas</StatLabel>
                </StatCard>
              </StatsContainer>
            </>
          )}
        </ProfileCard>
      </Content>
    </PageContainer>
  );
};

export default ProfilePage;