import { Container } from 'react-bootstrap';
import LoginModal from './components/LoginModal';
import NavBar from './components/NavBar';
import SignUpModal from './components/SignUpModal';
import styles from "./styles/NotesPage.module.css";

function App() {

  return (
    <div>
      <NavBar
        loggedInUser={null}
        onLoginClicked={() => { }}
        onSignUpClicked={() => { }}
        onLogoutSuccessful={() => { }}
      />
      <Container className={styles.notesPage}>
        {
          false &&
          <SignUpModal
            onDismiss={() => { }}
            onSignUpSuccessful={() => { }}
          />
        }
        {
          false &&
          <LoginModal
            onDismiss={() => { }}
            onLoginSuccessful={() => { }}
          />
        }
      </Container>
    </div>
  );
}

export default App;
