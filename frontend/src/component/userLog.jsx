import { useNavigate } from "react-router-dom";

const User = () => {

    let navigate=useNavigate()
let log=()=>{
    navigate()
}
    

    return ( 
        <div className="user">
            <h1>USER login</h1>
            <form onSubmit={log}>
                <div className="email">
                    <input type="email" placeholder="enter email" />
                </div>
                <div className="pass">
                    <input type="pass" placeholder="enter pass" />
                </div>
                <button>LOGIN</button>

            </form>
        </div>
     );
}
 
export default User;