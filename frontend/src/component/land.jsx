import  {Link} from "react-router-dom"

const Land = () => {
    return ( 
        <div className="land">
            <h1>Land</h1>
            <div className="admin">
            <Link to="/adminlog" >Admin login</Link></div>

            <div className="user">
                <Link to="/userlog">user Login</Link>
            </div>

        </div>
     );
}
 
export default Land;