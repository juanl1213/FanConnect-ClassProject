import './welcome.css';

interface Props {
  onLogin: () => void;
  onSignUp: () => void;
  onDemo: () => void;
}

function WelcomeScreen({ onLogin, onSignUp, onDemo }: Props) {
  return (
    <div className="welcome gradient-bg">
      <div className="welcome__content">
        <div className="welcome__logo">
          <span role="img" aria-label="soccer ball">
            ⚽
          </span>
        </div>
        <h1>FanConnect</h1>
        <p>Connect with fans and never watch alone</p>
        <div className="welcome__actions">
          <button className="welcome__primary" onClick={onSignUp}>
            Sign Up
          </button>
          <button className="welcome__ghost" onClick={onLogin}>
            Log In
          </button>
          <button className="welcome__demo" onClick={onDemo}>
            <span aria-hidden>▶</span> Try Demo Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomeScreen;

