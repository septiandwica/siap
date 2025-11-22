import { useState } from 'react';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import logo from "../assets/logo.svg";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch("http://localhost:2005/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Login failed");
                setIsLoading(false);
                return;
            }

            localStorage.setItem("user", JSON.stringify(data.user));
            // Also store uid and role separately for API calls
            if (data.user.uid) localStorage.setItem("uid", data.user.uid);
            if (data.user.role) localStorage.setItem("role", data.user.role);
            window.location.href = "/dashboard";

        } catch (err) {
            alert("Server error");
            console.log(err);
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#b31f5e] to-[#d3543c] flex items-center justify-center p-4 relative overflow-hidden">

            {/* Soft floating circles */}
            <div className="absolute top-16 left-16 w-72 h-72 bg-[#b31f5e]/30 rounded-full mix-blend-multiply filter blur-[90px] opacity-30"></div>
            <div className="absolute bottom-16 right-16 w-72 h-72 bg-[#d3543c]/30 rounded-full mix-blend-multiply filter blur-[90px] opacity-30"></div>

            {/* Card */}
            <div className="relative w-full max-w-md">
                <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-white/10">

                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 
                        bg-gradient-to-br from-[#ff217b] to-[#ff645b] rounded-2xl shadow-lg mb-4">
                            <img src={logo} alt="" className="w-10 h-10" />
                        </div>

                        <h1 className="text-3xl font-bold text-white mb-1">Siap Nikah</h1>

                        <p className="text-white/70 text-sm">
                            This action requires administrator privileges.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/15 
                                    rounded-xl text-white placeholder-white/60 focus:outline-none 
                                    focus:ring-2 focus:ring-[#d3543c] transition"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/15 
                                    rounded-xl text-white placeholder-white/60 focus:outline-none 
                                    focus:ring-2 focus:ring-[#d3543c] transition"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 bg-gradient-to-br from-[#ff217b] to-[#ff645b]
                            text-white rounded-xl font-semibold shadow-lg hover:opacity-90 
                            hover:scale-[1.02] transition disabled:opacity-50 disabled:hover:scale-100"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing in...
                                </span>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
