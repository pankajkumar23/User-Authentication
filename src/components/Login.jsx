import { useState } from "react";

const Login = () => {
  const [userlogin, setuserLogin] = useState({
    email: "",
    password: "",
  });

  const onhandleChange = (e) => {
    setuserLogin({ ...userlogin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    

      try {
        const response = await fetch("https://your-vercel-backend.vercel.app/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userlogin),
        });
        
      const data = await response.json()
      if (response.ok) {
        console.log("Login successful", data);
        alert(`Welcome ${data.user?.name || "User"}`);
      } else {
        console.log("Login failed:", data.message);
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    
      <div className="text-center h-auto  flex  items-center  flex-col gap-5">
        <h1 className="text-4xl">Login User</h1>
        <form onSubmit={handleSubmit}>
          <div className=" px-10 w-96 h-64 border-2 border-amber-200 flex justify-center items-baseline flex-col">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              value={userlogin.email}
              onChange={onhandleChange}
            />
            <br />
            <label htmlFor="password">Password: </label>
            <input
              type="password "
              placeholder="Enter password"
              name="password"
              value={userlogin.password}
              onChange={onhandleChange}
            />
            <br />
            <button
              type="submit"
              className="cursor-pointer bg-amber-300 outline-0 text-black rounded-4xl p-2 "
            >
              Login
            </button>
          </div>
        </form>
      </div>
    
  );
};
export default Login;
