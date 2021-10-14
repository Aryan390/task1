import classes from './ListItem.module.css'

const ListItem = (props) => {
  return (
    <li className={classes['list-item']}>
      <div className={classes.names}>
        <div>{props.id}</div>
        <div>{props.name}</div>
      </div>
      <div className={classes.years}>
        <div>{props.year}</div>
        <div>{props.state}</div>
      </div>
      <div className={classes.lastItem}>{props.city}</div>
    </li>
  )
}

export default ListItem