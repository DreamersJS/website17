import { NavLink, useNavigate } from "react-router-dom";
import ResponsiveComponent from "./ResponsiveComponent";

const Header = ({ admin, userId }) => {
    const navigate = useNavigate();

    return (
        <ResponsiveComponent>
        {({ width, height }) => (
            // mobile

        <header>
           {/* no user */}
           <div className="">
            {/* Home */}
               <NavLink to="/" className="">
                   <span>
                       Home button icon
                   </span>
               </NavLink>
               {/* Login */}
                <NavLink to="/login" className="">
                     <span>
                          Login button icon
                     </span>
                </NavLink>
                {/* Register */}
                <NavLink to="/register" className="">
                    <span>
                        Register button icon
                    </span>
                </NavLink>
           </div>

           {/* user */}
           {
               userId && (
                   <div>
                       <NavLink to="/profile">Profile</NavLink>
                       <NavLink to="/logout">Logout</NavLink>
                       {/* + list of other pages? to map them for a reusable header component */}
                   </div>
               )
           }

           {/* admin ?with dropdown?*/}
           {
               admin && (
                   <div>
                       <NavLink to="/admin">Admin</NavLink>
                   </div>
               )
           }
        </header>
        )}
      </ResponsiveComponent>
       
    )
}
export default Header;