import classes from './CollegeList.module.css'

import ListItem from './ListItem'

const CollegeList = (props) => {
  return (
    <ul className={classes['holder-table']}>
      <ListItem 
        key = {0}
        id = {null}
        name = {'Name of College'}
        year = {'Founding Year'}
        state = {'State'}
        city = {'City'}
      />
      {props.list.map(item =>
        <ListItem 
          key = {item.id}
          id = {item.id}
          name = {item.name}
          year = {item.year_founded}
          state = {item.state}
          city = {item.city}
        />
      )}
    </ul>
  )
}

export default CollegeList