import { Container, Nav, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBeerMugEmpty } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <>
      <Navbar fixed="top" bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand href="#home" className="text-success">
            <FontAwesomeIcon icon={faBeerMugEmpty} className="mx-3" />
            Beer lovers
          </Navbar.Brand>
          <Nav className="me-auto">
            {/* <Nav.Link href="#home">Home</Nav.Link> */}
            {/* <Nav.Link href="#features">Features</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
