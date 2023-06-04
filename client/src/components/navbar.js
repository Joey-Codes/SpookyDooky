import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
 
export const Navbar = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const logout = () => {
        setCookies("access_token", "")
        window.localStorage.removeItem("userID");
        navigate("/auth");
    };
    return (
        <div className='navbar carterone'>
            <Link to="/home"> REAL HOME</Link>
            <Link to="/places">PLACES</Link>
            <Link to="/about">ABOUT</Link>
            <Link to="/"> HOME </Link>
            <Link to="/create-recipe"> NEW RECIPE</Link>
            {!cookies.access_token ? (
                <Link to="/auth"> LOGIN</Link>
            ) : ( 
            <>
                <Link to="/saved-recipes"> Saved Recipes </Link>
                <button onClick={logout}>Logout</button>
            </>
            )}
        </div>
    );
};