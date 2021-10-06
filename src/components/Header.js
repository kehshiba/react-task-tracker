import Button from "./Button"

const Header = ({title, onAdd, ShowAdd}) => {

    return (
        <header className='header'>
            <h1>{title}</h1>
           <Button color = {ShowAdd? 'brown' : 'indigo'}
            text={ShowAdd ? 'Close' : 'Add'} onClick = {onAdd} />
        </header>
    )
}
Header.defaultProps= {
    title:'Event Tracker',
}
// css inside js
// const headingStyle={
//     color:'red'
// }

export default Header
