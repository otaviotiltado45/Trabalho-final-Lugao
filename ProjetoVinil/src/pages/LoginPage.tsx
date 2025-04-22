import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { AuthContext } from '../contexts/AuthContext';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.background};
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  padding: 32px 0;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
`;

const FormContainer = styled.div`
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadow};
  width: 100%;
  max-width: 500px;
  padding: 32px;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
`;

const Tab = styled.button<{ active: boolean }>`
  background: none;
  border: none;
  border-bottom: 2px solid ${({ active, theme }) => (active ? theme.primary : 'transparent')};
  color: ${({ active, theme }) => (active ? theme.primary : theme.text)};
  font-size: 18px;
  font-weight: bold;
  padding: 8px 0;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
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
  margin-bottom: 4px;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  padding: 12px;
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

const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 6px;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 16px;
  
  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.borderColor};
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.error};
  font-size: 14px;
  margin-top: 8px;
  padding: 8px;
  background-color: ${({ theme }) => theme.error}20;
  border-radius: 4px;
`;

enum FormMode {
  LOGIN,
  SIGNUP
}

const LoginPage: React.FC = () => {
  const [mode, setMode] = useState<FormMode>(FormMode.LOGIN);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, signup } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const validateForm = () => {
    if (!email.includes('@')) {
      setError('Por favor, insira um email válido.');
      return false;
    }
    
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return false;
    }
    
    if (mode === FormMode.SIGNUP) {
      if (!name) {
        setError('Por favor, insira seu nome.');
        return false;
      }
      
      if (!birthDate) {
        setError('Por favor, insira sua data de nascimento.');
        return false;
      }
    }
    
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      if (mode === FormMode.LOGIN) {
        await login(email, password);
      } else {
        await signup(email, name, birthDate, password);
      }
      navigate('/home');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocorreu um erro durante a autenticação.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <PageContainer>
      <Header>
        <Logo size="large" />
      </Header>
      
      <ContentContainer>
        <FormContainer>
          <TabsContainer>
            <Tab 
              active={mode === FormMode.LOGIN} 
              onClick={() => setMode(FormMode.LOGIN)}
            >
              Login
            </Tab>
            <Tab 
              active={mode === FormMode.SIGNUP} 
              onClick={() => setMode(FormMode.SIGNUP)}
            >
              Cadastro
            </Tab>
          </TabsContainer>
          
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="email">E-mail</Label>
              <Input 
                id="email"
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </FormGroup>
            
            {mode === FormMode.SIGNUP && (
              <>
                <FormGroup>
                  <Label htmlFor="name">Nome</Label>
                  <Input 
                    id="name"
                    type="text" 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="birthDate">Data de Nascimento</Label>
                  <Input 
                    id="birthDate"
                    type="date" 
                    value={birthDate}
                    onChange={e => setBirthDate(e.target.value)}
                    required
                  />
                </FormGroup>
              </>
            )}
            
            <FormGroup>
              <Label htmlFor="password">Senha</Label>
              <Input 
                id="password"
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </FormGroup>
            
            {error && <ErrorMessage>{error}</ErrorMessage>}
            
            <SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? 'Carregando...' : mode === FormMode.LOGIN ? 'Entrar' : 'Cadastrar'}
            </SubmitButton>
          </Form>
        </FormContainer>
      </ContentContainer>
    </PageContainer>
  );
};

export default LoginPage;