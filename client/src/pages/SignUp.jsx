import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { toast } from "react-toastify";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  // console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault(); // to prevent the refreshing after submitting form
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        // console.log("hey");
        setLoading(false);
        setError(data.message);
        return;
      }

      setLoading(false);
      setError(null);

      toast.success("User Created Successfully");
      navigate("/sign-in");
    } catch (error) {
      // console.log("hey");
      setLoading(false);
      toast.error(error.message);
      setError(error.message);
    }
  };
  return (
    <div className="p-3 px-3 max-w-lg mx-auto mt-20 bg-white shadow-lg transition-shadow rounded-xl w-full sm:w-[550px]">
      <h1 className="text-3xl font-semibold my-7 text-center">Signup</h1>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          className="border rounded-lg p-3"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className="border rounded-lg p-3"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border rounded-lg p-3"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 rounded-lg p-3 border text-white uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "loading..." : "Signup"}
        </button>
        <OAuth />
      </form>
      <div className="mt-3">
        Have an account?
        <Link to={"/sign-in"}>
          <span className="text-blue-700"> Sign in </span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-3">{error}</p>}
    </div>
  );
}
