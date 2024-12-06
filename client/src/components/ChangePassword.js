import emailjs from 'emailjs-com';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import SpaceBg from '../assets/earth.png';

function ChangePassword() {
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [step, setStep] = useState(1); // Step 1: Request code, Step 2: Verify code & change password

    const navigate = useNavigate(); // Hook for navigation

    const handlePasswordMatch = () => {
        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match.');
            return false;
        }
        return true;
    };

    const handleSendCode = async (e) => {
        e.preventDefault();

        const code = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit code
        try {
            await emailjs.send(
                'service_d46nppi', // EmailJS Service ID
                'template_gz4s5ue', // EmailJS Template ID
                {
                    to_email: email,
                    verification_code: code,
                },
                'uvWiNhqJbdHLFIU5T' // EmailJS Public Key
            );

            console.log('Email sent successfully!');
            setMessage('Verification code sent to your email.');

            // Store the verification code after success
            localStorage.setItem('verificationCode', code);
            setStep(2); // Move to Step 2
        } catch (error) {
            console.error('Error sending email:', error);
            setMessage('Failed to send email. Please check your email and try again.');
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (!handlePasswordMatch()) {
            return;
        }

        const storedCode = localStorage.getItem('verificationCode');
        if (storedCode !== verificationCode) {
            setMessage('Invalid or expired verification code.');
            return;
        }

        try {
            const response = await fetch('https://grinddaily-backend.onrender.com/api/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, newPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Password changed successfully! Redirecting to login...');
                setTimeout(() => {
                    navigate('/login');
                }, 2000); 
            } else {
                setMessage(data.error || 'Failed to change password.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="flex flex-col min-h-screen lg:flex-row">
            <div className="left relative flex flex-col items-center justify-center w-full min-h-screen bg-neutral-900 p-8 lg:h-full lg:w-1/2">
                <form
                    onSubmit={step === 1 ? handleSendCode : handleChangePassword}
                    className="mt-8 w-11/12 max-w-md space-y-4 bg-neutral-800 p-6 rounded-lg shadow-lg"
                >
                    <h2 className="text-2xl font-bold text-white text-center mb-5">Change Password</h2>

                    {step === 1 && (
                        <div>
                            <label htmlFor="email" className="block text-gray-200 font-semibold mb-1">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Please enter your email here..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-2 bg-neutral-700 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400"
                            />
                            <button
                                type="submit"
                                className="w-full py-2 mt-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:bg-gradient-to-r hover:from-violet-400 hover:to-fuchsia-400 text-white font-bold rounded-md transition-transform duration-500 transform hover:scale-105"
                            >
                                Send Verification Code
                            </button>
                            <NavLink to="/login">
                                <button
                                    type="button"
                                    className="w-full py-2 mt-4 bg-gradient-to-r from-teal-500 to-blue-400 hover:bg-gradient-to-r hover:from-teal-400 hover:to-blue-400 text-white font-bold rounded-md transition-transform duration-500 transform hover:scale-105"
                                >
                                    Back To Login
                                </button>
                            </NavLink>
                        </div>
                    )}

                    {step === 2 && (
                        <>
                            <div>
                                <label htmlFor="verificationCode" className="block text-gray-200 font-semibold mb-1">Verification Code</label>
                                <input
                                    type="text"
                                    id="verificationCode"
                                    name="verificationCode"
                                    placeholder="Enter the code sent to your email..."
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 bg-neutral-700 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400"
                                />
                            </div>
                            <div>
                                <label htmlFor="newPassword" className="block text-gray-200 font-semibold mb-1">New Password</label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    name="newPassword"
                                    placeholder="Enter your new password..."
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 bg-neutral-700 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400"
                                />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="block text-gray-200 font-semibold mb-1">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="Confirm your new password..."
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 bg-neutral-700 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:bg-gradient-to-r hover:from-violet-400 hover:to-fuchsia-400 text-white font-bold rounded-md transition-transform duration-500 transform hover:scale-105"
                            >
                                Change Password
                            </button>
                        </>
                    )}

                    <p className="mt-2 text-sm text-gray-300 text-center h-4">{message}</p>
                </form>
            </div>

            <div
                className="right w-1/2 bg-cover bg-center lg:min-h-screen lg:w-1/2"
                style={{
                    backgroundImage: `url(${SpaceBg})`,
                }}
            ></div>
        </div>
    );
}

export default ChangePassword;