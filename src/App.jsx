import { useState } from "react"
import Login from "./components/Login"
import Profile from "./components/Profile"
import Signup from "./components/Signup"

const App = () => {
  const [activeComponent , setActiveComponent] = useState("login")
  return (
   <>
   <div>
    <h1 className="text-center text-2xl">
      User Authentication
    </h1>

    <div>
      <button  className="bg-amber-300 rounded-2xl p-2 text-black cursor-pointer my-3" onClick={()=>setActiveComponent("login")}>Login</button>
    <br />
      <button className="bg-amber-300 rounded-2xl p-2 text-black cursor-pointer"onClick={()=>setActiveComponent("signup")}>SignUp</button>
    </div>
    <div className="mt-4">
        {activeComponent === "login" ? <Login /> : <Signup />}
      </div>
   </div>
   </>
  )
}
export default App