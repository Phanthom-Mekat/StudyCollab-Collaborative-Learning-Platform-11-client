import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../provider/AuthProvider";

const Login = () => {
    const { userLogin, setUser, signInWithGoogle, setEmail } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        setSuccess(false);
        setError('');
        if (password.length < 6) {
            setError('Password should be at least 6 characters');
            return;
        }
        if (!/[A-Z]/.test(password)) {
            setError('Password should have at least one uppercase letter');
            return;
        }
        if (!/[a-z]/.test(password)) {
            setError('Password should have at least one lowercase letter');
            return;
        }

        userLogin(email, password)
            .then((result) => {
                const user = result.user;
                setSuccess(true);
                setUser(user);
                toast.success('Signed in successfully.');
                navigate(location?.state ? location.state : "/");
            })
            .catch((err) => {
                setSuccess(false);
                setError(err.message);
                toast.error(`Invalid Password or User `);
            });
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then((result) => {
                const user = result.user;
                setUser(user);
                toast.success('Signed in successfully with Google!');
                navigate(location?.state ? location.state : "/");
            })
            .catch((err) => {
                console.log(err);
                toast.error('This is an error!');
            });
    };

    const handleEmailChange = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="card bg-base-100 w-full max-w-lg shrink-0 rounded-none p-10">
                <h2 className="text-2xl font-semibold text-center">
                    Login to your account
                </h2>
                <form onSubmit={handleSubmit} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            className="input input-bordered"
                            required
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            className="input input-bordered"
                            required
                        />

                        {success && <p className="text-green-500 text-sm">Sign in successful!</p>}
                        {error && <p className="text-red-600 text-sm">{error}</p>}
                        <label className="label">
                            <Link to="/auth/forgot" className="label-text-alt link link-hover">
                                Forgot password?
                            </Link>
                        </label>
                    </div>
                    <div
                        onClick={handleGoogleSignIn}
                        className="btn w-1/4 mx-auto flex items-center gap-2"
                    >
                        <FaGoogle className="text-2xl text-primary " />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-primary rounded-none">Login</button>
                    </div>
                </form>
                <p className="text-center font-semibold">
                    Don’t have an account?{" "}
                    <Link className="text-red-500" to="/auth/register">
                        Register
                    </Link>
                </p>
            </div>
            <Toaster />
        </div>
    );
};

export default Login;