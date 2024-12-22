import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";
import { AuthContext } from "../provider/AuthProvider";

const Register = () => {
    const { createNewUser, setUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState({});
    const [showPassword, setShowPassword] = useState(false)

    const validatePassword = (password) => {
        if (password.length < 6) {
            return "Password should be at least 6 characters";
        }
        if (!/[A-Z]/.test(password)) {
            return "Password should have at least one uppercase letter";
        }
        if (!/[a-z]/.test(password)) {
            return "Password should have at least one lowercase letter";
        }
        return null;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = new FormData(e.target);
        const name = form.get("name");
        const email = form.get("email");
        const photo = form.get("photo");
        const password = form.get("password");

        setError({});

        if (name.length < 3) {
            setError({ name: "Name should be more than 3 characters" });
            return;
        }

        const passwordError = validatePassword(password);
        if (passwordError) {
            setError({ password: passwordError });
            return;
        }

        createNewUser(email, password)
            .then((result) => {
                const user = result.user;
                setUser(user);
                console.log(user);
                updateUserProfile({ displayName: name, photoURL: photo })
                    .then(() => {
                        navigate(location?.state ? location.state : "/");
                        toast.success("Registered successfully.");

                        const newUser = { name, email, photo }
                        fetch('https://batch-10-assignment-10-server.vercel.app/users', {
                            method: "POST",
                            headers: {
                                "content-type": "application/json"
                            },
                            body: JSON.stringify(newUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                console.log(data);
                            })
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => {
                console.log(err);
                setError({ register: err.message });
            });
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then((result) => {
                const user = result.user;
                setUser(user);
                navigate(location?.state ? location.state : "/");
                toast.success("Signed in successfully with Google!");
            })
            .catch((err) => {
                console.log(err);
                setError({ google: err.message });
            });
    };

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="card bg-base-100 w-full max-w-lg shrink-0 rounded-none p-10">
                <h2 className="text-2xl font-semibold text-center">
                    Register your account
                </h2>
                <form onSubmit={handleSubmit} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            name="name"
                            type="text"
                            placeholder="name"
                            className="input input-bordered"
                            onChange={() => setError((prev) => ({ ...prev, name: null }))}
                            required
                        />
                        {error.name && (
                            <label className="label text-sm text-red-500">{error.name}</label>
                        )}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            name="email"
                            type="email"
                            placeholder="email"
                            className="input input-bordered"
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input
                            name="photo"
                            type="url"
                            placeholder="photo-url"
                            className="input input-bordered"
                            required
                        />
                    </div>

                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="password"
                            className="input input-bordered"
                            onChange={() => setError((prev) => ({ ...prev, password: null }))}
                            required
                        />
                        <button className="absolute btn btn-ghost bottom-0 right-0" onClick={(e) => {
                            e.preventDefault();
                            setShowPassword(!showPassword);
                        }}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />} </button>
                        {error.password && (
                            <label className="label text-sm text-red-500">{error.password}</label>
                        )}
                    </div>

                    {error.register && (
                        <label className="label text-sm text-red-500">{error.register}</label>
                    )}

                    <div
                        onClick={handleGoogleSignIn}
                        className="btn w-1/4 mt-2 mx-auto "
                    >
                        <FaGoogle className="text-2xl text-primary" />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-primary rounded-none">Register</button>
                    </div>
                </form>
                <p className="text-center font-semibold">
                    Already Have An Account?{" "}
                    <Link className="text-red-500" to="/auth/login">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;