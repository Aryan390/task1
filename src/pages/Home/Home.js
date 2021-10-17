import classes from './Home.module.css'
import CollegeList from '../../components/List/CollegeList'
import DropDown from '../../components/DropDown'

import collegeDetails from '../../College_details_Task.json'
import { useRef, useState, useContext } from 'react'
import AuthContext from '../../store/auth-context'
import { useHistory } from 'react-router-dom'
import CheckList from '../../components/CheckList/CheckList'

let counter = 1;

// appending id's for the given array
const newCollegeDetails = collegeDetails.map(item =>({id: counter++ ,...item}))

// states
counter = 1;
let states = collegeDetails.map(item => item.state)
states = [...new Set(states)]
states.sort()
states = states.map(item => ({id: counter++, placeName: item}))

// cities
counter = 1
let cities = collegeDetails.map(item => ({city: item.city, state: item.state}))
cities = [ ...new Map(cities.map(item => [item['city'], item])).values() ]
cities.sort( (a,b) => {
  if ( a.city < b.city ){
    return -1;
  }
  if ( a.city > b.city ){
    return 1;
  }
  return 0;
})
cities = cities.map(item => ({id: counter++, placeName: item.city, state: item.state}))


const Home = () => {
  const [colleges, setColleges] = useState(newCollegeDetails);
  const [previousColleges, setPreviousColleges] = useState([]);
  const [cityArray, setCityArray] = useState(cities);
  // const [facilities, setFacilities] = useState([]);
  const inputRef = useRef(null)

  const history = useHistory();
  const authCtx = useContext(AuthContext)

  // handles searching of colleges from the original dataset
  const collegesChangeHandler = () => {
    let newCollegeArr = [...newCollegeDetails]

    // checks for a substring and also filtering out the college
    newCollegeArr = newCollegeArr.filter(item => {
      return item.name.toLowerCase().split(' ').join('').includes(inputRef.current.value.toLowerCase().split(' ').join(''))
    })

    setColleges(newCollegeArr)
  }

  // state change function for handling select state
  const statesChangeHandler = (newState) => {
    let newCollegeArr = [...newCollegeDetails]

    // state change for filtering out the colleges
    newCollegeArr = newCollegeArr.filter(item => item.state === newState)
    setColleges(newCollegeArr)
    

    // city filtering out
    newCollegeArr = [...cities]
    newCollegeArr = newCollegeArr.filter(item => item.state === newState)
    setCityArray(newCollegeArr)
  }

  const citiesChangeHandler = (newCity) => {
    let newCollegeArr = [...newCollegeDetails]

    // state change for filtering out the colleges
    newCollegeArr = newCollegeArr.filter(item => item.city === newCity)
    setColleges(newCollegeArr)
  }

  const logoutHandler = () => {
    authCtx.logout();
    history.push('/login')
  }

  const facilitiesChangeHandler = (comingFacility, check) => {
    // below code is to obtain the facilityArr, OMG so much for so less , LOL
    // let facilityArr = [...helperArr]
    // let newRealTimeArr = [...realTimeArr]
    // newRealTimeArr = newRealTimeArr.map(item => parseInt(item[0]))

    // facilityArr = facilityArr.filter(item => newRealTimeArr.includes(item.id))
    // facilityArr = facilityArr.map(item => item.value);
    let facility = comingFacility.value
    // here take the original state of app for colleges , rather than the original dataset from .json file, because it filters out from city
    let newCollegeArr = [...colleges]
    let collegeArr = [];
    let previousCollegeArr = [...previousColleges]

    console.log(newCollegeArr);
    console.log(facility, check);


    // so, if check is true, we are filtering out colleges, and adding the previous state to previouColleges state, so that when check = false, we can retain the previous array 
    if(check){
      // getting the arrays in collegeArr
      for(let i =0; i<newCollegeArr.length; i++){
        let fac = newCollegeArr[i].facilities.split(',')
        let counter = 0;
        for(let j = 0; j < fac.length; j++){
          if(facility === fac[j]){
            let newCollege = collegeArr.find(item => item.id === newCollegeArr[i].id)
            if(newCollege) newCollege.counter++
            else collegeArr.push({...newCollegeArr[i], counter: ++counter})
          }
        }
      }
      // sorting the arrays in descending order using counter property in collegeArr
      collegeArr.sort((a,b) => b.counter - a.counter)

      // a kind of caching mechanism to keep track of all the previous college arrays
      previousCollegeArr.push([[...newCollegeArr], facility])
      setPreviousColleges(previousCollegeArr)
      setColleges(collegeArr)
    }else {
      let newPreviousCollegeArr = [...previousColleges]
      let collegeVar, collegeIndex;

      newPreviousCollegeArr.forEach((item, index) => {
        if(item[1] === facility) {
          collegeVar = item;
          collegeIndex = index
        }
      })

      newPreviousCollegeArr.splice(collegeIndex,1);
      setPreviousColleges(newPreviousCollegeArr)
      setColleges(collegeVar[0])
    }

    console.log(previousColleges);
  }

  return (
    <div className={classes.main}>
      <button className={classes.logout} onClick={logoutHandler}>Logout</button>
      <div className={classes['search-bar']}>
        <input 
          type="text" 
          placeholder= 'Search Colleges...' 
          className={classes.search}
          ref = {inputRef}
        />
        <button className={classes.btn} onClick={collegesChangeHandler}>Search</button>
      </div>
      
      <div className={classes.dropdowns}>
        <DropDown 
          name = {'Select State'}
          place = {states}
          onStatesChange = {statesChangeHandler}
        />
        <DropDown 
          name ={'Select cities'}
          place = {cityArray}
          onStatesChange = {citiesChangeHandler}
        />
      </div>

      <div>
        <CheckList onFacilityChange = {facilitiesChangeHandler} />
      </div>

      <h1>List Of Available Colleges</h1>
      <CollegeList 
        list = {colleges}
      />
    </div>
  )
}

export default Home;