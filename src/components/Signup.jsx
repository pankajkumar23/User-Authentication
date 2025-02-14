import { useState } from "react";

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const onhandleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.name || !user.email || !user.password || !user.confirm_password) {
      alert("All fields are required");
      return;
    }
  
    if (user.password !== user.confirm_password) {
      alert("Passwords do not match.");
      return;
    }
    try {
      const response = await fetch("https://your-vercel-backend.vercel.app/api/signup"
, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const text = await response.text();
      console.log(text);
      
      const data = text ? JSON.parse(text) : {};
      
      if (response.ok) {
        console.log("Signup successful", data);
        alert("Signup Successful");

      }else{
        alert(data.message)
      }
      
    } catch (err) {
      console.log(err);
    }

  };

  return (
    <>
      <div className="text-center h-auto flex  items-center justify-center flex-col gap-5 ">
        <h1 className="text-4xl">Signup User</h1>
        <form onSubmit={handleSubmit}>
          <div className="px-10 w-96 h-90  border-2 border-amber-300 flex  justify-center items-baseline flex-col">
            <label htmlFor="text">Name: </label>
            <input
              type="text"
              placeholder="Enter name"
              name="name"
              value={user.name}
              onChange={onhandleChange}
            />
            <br />
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              value={user.email}
              onChange={onhandleChange}
            />
            <br />
            <label htmlFor="password">Password: </label>
            <input
              type="password "
              placeholder="Enter password"
              name="password"
              value={user.password}
              onChange={onhandleChange}
            />
            <br />
            <label htmlFor="password">Confirm Password: </label>
            <input
              type="password"
              placeholder="Enter password again"
              name="confirm_password"
              value={user.confirm_password}
              onChange={onhandleChange}
            />
            <br />
            <button
              type="submit"
              className="cursor-pointer bg-amber-300 outline-0 text-black rounded-4xl p-2 "
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default Signup;
