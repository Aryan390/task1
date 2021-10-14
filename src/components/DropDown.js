import { useRef } from 'react';

import classes from './DropDown.module.css'

const DropDown = (props) => {
  let selectRef = useRef(null);

  const selectChangeHandler = () => {
    props.onStatesChange(selectRef.current.value);
  }

  return (
    <select 
      className={classes.dropdown}
      // value = {selectValue}
      defaultValue = {props.name}
      onChange={selectChangeHandler}
      ref = {selectRef}
    >
      <option disabled hidden value={props.name}>
        {props.name}
      </option>
      {props.place.map(item => 
        <option value={item.placeName} key={item.id}>
          {item.placeName}
        </option>
      )}
    </select>
  )
}

export default DropDown