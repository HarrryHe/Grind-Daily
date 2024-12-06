import React from 'react';
import defaultAvatar from '../../assets/default-avatar.png';

function Friend({ friend }) {

    return (
        <div className="flex space-x-4">
            <img
                src={friend.avatarUrl || defaultAvatar}
                alt={friend.username}
                className="w-12 h-12 rounded-full"
            />
            <div>
                <p className="text-base lg:text-base sm:text-sm font-semibold text-wrap">{friend.username}</p>
                <p className="text-xs lg:text-sm text-gray-500 sm:text-xs text-wrap">{friend.email}</p>
            </div>
        </div>
    )
}

export default Friend;