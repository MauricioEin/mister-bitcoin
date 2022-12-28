import { NavLink } from "react-router-dom"
export function AppHeader() {
    const onLogout = () => {
        window.localStorage.clear()
        window.location.reload()
    }
    return (

        <header className='app-header'>
            <NavLink exact to="/"><button>Home</button></NavLink>
            <NavLink to="/contact"><button>Contacts</button></NavLink>
            <NavLink to="/statistic"><button>Statistics</button></NavLink>
            <button onClick={onLogout} >Log out</button>
        </header>
    )
}
