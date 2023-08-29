import { Container, Navbar, NavbarBrand } from "react-bootstrap";
import { User } from "../models/user";

interface NavBarProps {
    loggedInUser: User | null,
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
    onLogoutSuccessful: () => void,

}

const NavBar = ({loggedInUser, onSignUpClicked, onLoginClicked, onLogoutSuccessful}: NavBarProps) => {
    return (  
        <Navbar bg="primary" variant="dark" expand="lg" sticky="top" >
            <Container>
                <Navbar.Brand>
                    ThunkYard 2023
                </Navbar.Brand>
            </Container>

        </Navbar>
    );
}
 
export default NavBar;