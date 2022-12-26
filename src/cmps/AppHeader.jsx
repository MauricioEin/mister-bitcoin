import { NavLink } from "react-router-dom"
export function AppHeader() {

    return (

        <header className='app-header'>
            <NavLink exact to="/"><button value='home' >Home</button></NavLink>
            <NavLink to="/contact"><button value='contact' >Contacts</button></NavLink>
            <NavLink to="/statistic"><button value='statistic' >Statistics</button></NavLink>
        </header>
    )
}
