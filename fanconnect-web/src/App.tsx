import { useState } from 'react';
import ContentShell from './components/ContentShell';
import WelcomeScreen from './components/WelcomeScreen';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';

type LandingState = 'welcome' | 'app';
type AuthModal = 'login' | 'signup' | null;

function App() {
  const [landing, setLanding] = useState<LandingState>('welcome');
  const [authModal, setAuthModal] = useState<AuthModal>(null);

  const closeModal = () => setAuthModal(null);

  const finishAuth = () => {
    setLanding('app');
    setAuthModal(null);
  };

  return (
    <>
      {landing === 'welcome' && (
        <>
          <WelcomeScreen
            onLogin={() => setAuthModal('login')}
            onSignUp={() => setAuthModal('signup')}
            onDemo={() => setLanding('app')}
          />
          {authModal === 'login' && (
            <LoginForm
              onClose={closeModal}
              onSwitch={() => setAuthModal('signup')}
              onSuccess={finishAuth}
            />
          )}
          {authModal === 'signup' && (
            <SignUpForm
              onClose={closeModal}
              onSwitch={() => setAuthModal('login')}
              onSuccess={finishAuth}
            />
          )}
        </>
      )}

      {landing === 'app' && <ContentShell onSignOut={() => setLanding('welcome')} />}
    </>
  );
}

export default App;

