import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Eye, EyeOff, Mail, Lock, User, Image, AlertCircle, DiamondPlus } from 'lucide-react';
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../provider/AuthProvider";
import Lottie from "lottie-react";
import LottieLogin from '../assets/login.json'

const Register = () => {
    const { createNewUser, setUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [isNameFocused, setIsNameFocused] = useState(false);
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPhotoFocused, setIsPhotoFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

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
        <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 flex flex-col md:flex-row items-center justify-center p-6">
            <div className="w-full md:w-1/2 max-w-md transform hover:scale-105 transition-transform duration-500">
                <div className="w-full max-w-sm mx-auto relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
                    <Lottie animationData={LottieLogin} loop={true} />
                </div>
            </div>
            
            <div className="w-full md:w-1/2 max-w-md z-10">
                <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full transform transition-all duration-300 hover:shadow-2xl">
                    <h2 className="text-4xl font-bold text-center text-gray-800 mb-2">
                        Create Account
                    </h2>
                    <p className="text-center text-gray-600 mb-8">Register to start your journey</p>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative">
                            <div className={`relative group ${isNameFocused ? 'focused' : ''}`}>
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-700 group-hover:text-primary transition-colors duration-200" />
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                                    required
                                    onChange={() => setError((prev) => ({ ...prev, name: null }))}
                                    onFocus={() => setIsNameFocused(true)}
                                    onBlur={() => setIsNameFocused(false)}
                                />
                                <label className="absolute left-10 -top-2.5 bg-white px-2 text-sm text-gray-600 transition-all duration-200">
                                    Full Name
                                </label>
                            </div>
                            {error.name && (
                                <div className="flex items-center gap-2 text-red-500 text-sm mt-1">
                                    <AlertCircle className="w-4 h-4" />
                                    <span>{error.name}</span>
                                </div>
                            )}
                        </div>

                        <div className="relative">
                            <div className={`relative group ${isEmailFocused ? 'focused' : ''}`}>
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-700 group-hover:text-primary transition-colors duration-200" />
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                                    required
                                    onFocus={() => setIsEmailFocused(true)}
                                    onBlur={() => setIsEmailFocused(false)}
                                />
                                <label className="absolute left-10 -top-2.5 bg-white px-2 text-sm text-gray-600 transition-all duration-200">
                                    Email Address
                                </label>
                            </div>
                        </div>

                        <div className="relative">
                            <div className={`relative group ${isPhotoFocused ? 'focused' : ''}`}>
                                <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-700 group-hover:text-primary transition-colors duration-200" />
                                <input
                                    name="photo"
                                    type="url"
                                    placeholder="Enter photo URL"
                                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                                    required
                                    onFocus={() => setIsPhotoFocused(true)}
                                    onBlur={() => setIsPhotoFocused(false)}
                                />
                                <label className="absolute left-10 -top-2.5 bg-white px-2 text-sm text-gray-600 transition-all duration-200">
                                    Photo URL
                                </label>
                            </div>
                        </div>

                        <div className="relative">
                            <div className={`relative group ${isPasswordFocused ? 'focused' : ''}`}>
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-700 group-hover:text-primary transition-colors duration-200" />
                                <input
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                                    required
                                    onChange={() => setError((prev) => ({ ...prev, password: null }))}
                                    onFocus={() => setIsPasswordFocused(true)}
                                    onBlur={() => setIsPasswordFocused(false)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                                <label className="absolute left-10 -top-2.5 bg-white px-2 text-sm text-gray-600 transition-all duration-200">
                                    Password
                                </label>
                            </div>
                            {error.password && (
                                <div className="flex items-center gap-2 text-red-500 text-sm mt-1">
                                    <AlertCircle className="w-4 h-4" />
                                    <span>{error.password}</span>
                                </div>
                            )}
                        </div>

                        {error.register && (
                            <div className="flex items-center gap-2 text-red-500 text-sm p-3 bg-red-50 rounded-lg">
                                <AlertCircle className="w-5 h-5" />
                                <span>{error.register}</span>
                            </div>
                        )}

                        <button 
                            type="submit"
                            className="w-full bg-primary text-white py-3 px-4 rounded-xl hover:bg-primary-dark transform hover:-translate-y-0.5 transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:outline-none shadow-lg hover:shadow-xl"
                        >
                            <DiamondPlus className="w-6 h-6 inline mr-1" />
                             Create Account
                        </button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transform hover:-translate-y-0.5 transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 focus:outline-none bg-white/50 backdrop-blur-sm"
                        >
                            <FaGoogle className="text-xl text-primary" />
                            <span className="text-gray-700 font-medium">Continue with Google</span>
                        </button>
                    </form>
                    
                    <p className="mt-8 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link 
                            to="/auth/login" 
                            className="text-primary hover:text-primary-dark font-medium transition-colors"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
            <Toaster 
                position="top-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#333',
                        color: '#fff',
                        borderRadius: '10px',
                        padding: '16px',
                    },
                }}
            />
        </div>
    );
};

export default Register;