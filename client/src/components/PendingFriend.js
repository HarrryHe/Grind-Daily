import React, { useContext, useEffect, useState } from "react";
import defaultAvatar from '../assets/default-avatar.png';
import { AuthContext } from "./helper/auth";
import { acceptFriendRequest, declineFriendRequest, getPendingFriendRequest } from "./helper/FriendAPI";

function PendingFriend() {

    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPendingRequests = async () => {
            try {
                const userId = localStorage.getItem("userId");
                console.log(userId);
                if (!userId) {
                    setError("User not logged in");
                    return;
                }

                const data = await getPendingFriendRequest(userId);
                if(!data.error){
                    setPendingRequests(data.pending || []);
                    console.log(pendingRequests);
                }
                else {
                    setError(data.error);
                    return;
                }
            } catch (err) {
                setError(err.message || "Failed to fetch pending requests");
            } finally {
                setLoading(false);
            }
        };

        if (isLoggedIn) {
            fetchPendingRequests();
        } else {
            setError("User not logged in");
            setLoading(false);
        }
    }, []);

    const handleAccept = async (friendId) => {
        try {
            const userId = localStorage.getItem("userId");
            await acceptFriendRequest(userId, friendId);
            setPendingRequests((prev) => prev.filter((req) => req.id !== friendId));
        } catch (err) {
            console.error("Failed to accept friend request:", err);
        }
    }

    const handleDecline = async (friendId) => {
        try {
            const userId = localStorage.getItem("userId");
            await declineFriendRequest(userId, friendId);
            setPendingRequests((prev) => prev.filter((req) => req.id !== friendId));
        } catch (err) {
            console.error("Failed to decline friend request:", err);
        }
    }

    return (
        <div className="min-h-screen p-4 text-gray-300">
            <h1 className="text-3xl font-bold border-blue-600 border-l-4 mb-4 mt-8 text-left w-full px-4"> Friend List </h1>
            <div className="border-t-2 w-11/13 border-gray-500"></div>
            {pendingRequests.length === 0 ? (
                <p className="text-gray-500 mt-4">No pending friend requests</p>
            ) : (
                <div className="flex flex-col gap-4 mt-4">
                    {pendingRequests.map((request) => (
                        <div
                            key={request.id}
                            className="flex items-center justify-between p-4 bg-neutral-700 rounded-lg shadow-md"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={request.avatarUrl || defaultAvatar}
                                    alt="Avatar"
                                    className="w-12 h-12 rounded-full"
                                />
                                <div>
                                    <p className="text-lg font-medium">{request.username}</p>
                                    <p className="text-sm text-gray-400">{request.email}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleAccept(request.id)}
                                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-400 transition"
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={() => handleDecline(request.id)}
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400 transition"
                                >
                                    Decline
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default PendingFriend;