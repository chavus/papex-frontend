import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './styles.scss'

const DropdownCategory = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [category, setCategory] = useState('Categoría')


  const toggle = () => setDropdownOpen(prevState => !prevState);

  const cateroryPrinter = event => {
    const { value } = event.target
    setCategory(value)
  }

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} className='category'>
      <DropdownToggle caret className='btn-p-primary' value='category' >
        {category}
      </DropdownToggle>
      <DropdownMenu right>
          <DropdownItem 
            value='Papel' 
            onClick={cateroryPrinter}>
              Papel
            </DropdownItem>
          <DropdownItem 
            value='Libretas y cuadernos' 
            onClick={cateroryPrinter}>
              Libretas y cuadernos
            </DropdownItem>
          <DropdownItem 
            value='Arte y diseño' 
            onClick={cateroryPrinter}>
              Arte y diseño
            </DropdownItem>
          <DropdownItem 
            value='Articulos de escritorio' 
            onClick={cateroryPrinter}>
              Articulos de escritorio
            </DropdownItem>
          <DropdownItem 
            value='Articulos de escritura' 
            onClick={cateroryPrinter}>
              Articulos de escritura
            </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default DropdownCategory;