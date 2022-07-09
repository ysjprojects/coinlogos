import React from "react";
import {
    Navbar,
    NavItem,
    NavbarToggler,
    Collapse,
    NavLink,
    Nav,
    NavbarBrand, Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
const Header = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isDropdown, setIsDropdown] = React.useState(false);
    return (
        <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Home</NavbarBrand>
            <NavbarToggler onClick={() => { setIsOpen(!isOpen) }} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink href="/about">About</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/api">API</NavLink>
                    </NavItem>


                    <Dropdown inNavbar className="nav-item" isOpen={isDropdown} toggle={() => setIsDropdown(!isDropdown)}>
                        <DropdownToggle className="nav-link" nav caret>
                            Kekapi Projects
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem tag={NavLink} href="http://kekapi.com" target="_blank" className="ms-2">Kekapi</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem disabled tag={NavLink} className="text-muted ms-2">Coinlogos</DropdownItem>
                            <DropdownItem tag={NavLink} href="http://worldometerlive.kekapi.com" target="_blank" className="ms-2">Worldometer Live</DropdownItem>
                            <DropdownItem tag={NavLink} href="http://covidata.kekapi.com" target="_blank" className="ms-2">Covidata</DropdownItem>
                            <DropdownItem tag={NavLink} href="http://parserc20.kekapi.com" target="_blank" className="ms-2">ParsERC20</DropdownItem>

                        </DropdownMenu>
                    </Dropdown>

                </Nav>
            </Collapse>
        </Navbar>
    )
}

export default Header;