import { Fragment } from 'react/cjs/react.development'

import classes from './CheckList.module.css'

const helperArr = [
  {id: 1, value: 'comp labs'},
  {id: 2, value: 'laboratory'},
  {id: 3, value: 'library'},
  {id: 4, value: 'hostel'},
  {id: 5, value: 'cafeteria'},
  {id: 6, value: 'canteen'},
  {id: 7, value: 'gym'},
  {id: 8, value: 'auditorium'},
  {id: 9, value: 'e-classroom'},
  {id: 10, value: 'transport'},
  {id: 11, value: 'sports'},
  {id: 12, value: 'medical'},
  {id: 13, value: 'banks'},
  {id: 14, value: 'classrooms'}
]

const CheckList = (props) => {
  // const [checkMap, setCheckMap] = useState(new Map());

  const checkValueChangeHandler = (e) => {
    let isChecked = e.target.checked;
    let item = e.target.value;

    // the below code is totally unrealted for a complete different feature, which took me 3 hours to build, it is sad, because the code is really good and interesting , but not needed
    
    // setCheckMap(prevState => prevState.set(item, isChecked))
    // // the first argument is the checkMap which tells the id => true/false,
    // // the second argument gives the helperArr, so that we can lift the state up in the original Home Component and assemble a facilityArr over there in Home.js
    // // all of this is really so DAMN GOOD!!
    // const newCheckMap = [...checkMap].filter((k,v) => isChecked)
    if(isChecked) props.onFacilityChange(helperArr[item-1], true)
    else props.onFacilityChange(helperArr[item-1], false)
  }

  return(
    <Fragment>
      <h2>Select Based on Facilites!</h2>
      <ul className={classes.checklist}>
        {helperArr.map((item, i) => (
          <li
            key = {item.id}
            className={classes.listitem}
          >
            <label>
              <input 
                type="checkbox"
                value={item.id}
                onChange = {checkValueChangeHandler}
              />
              {item.value}
            </label>
          </li>
        ))}
      </ul>
    </Fragment>
  )
}

export default CheckList