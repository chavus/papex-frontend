import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './styles.scss'

const DropdownCategory = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} >
      <DropdownToggle caret className='btn-p-primary'>
        Categoría
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem>Papel</DropdownItem>
        <DropdownItem>Libretas y cuadernos</DropdownItem>
        <DropdownItem>Arte y diseño</DropdownItem>
        <DropdownItem>Articulos de escritorio</DropdownItem>
        <DropdownItem>Articulos de escritura</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default DropdownCategory;