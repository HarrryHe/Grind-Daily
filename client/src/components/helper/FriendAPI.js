const fetchData = async (endpoint, method = 'GET', body = null) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const options = { method, headers };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(endpoint, options);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Something went wrong');
        }

        return response.json();
    } catch (err) {
        console.error('Fetch error:', err.message);
        throw err;
    }
};

export const getFriendsList = async (userId) => {
    const endpoint = `https://grinddaily.onrender.com/api/friends/${userId}`;
    return fetchData(endpoint);
};

export const sendFriendRequest = async (userId1, userId2) => {
    const endpoint = `https://grinddaily.onrender.com/api/friends/request`;
    return fetchData(endpoint, 'POST', { userId1, userId2 });
};

export const acceptFriendRequest = async (userId1, userId2) => {
    const endpoint = `https://grinddaily.onrender.com/api/friends/accept`;
    return fetchData(endpoint, 'POST', { userId1, userId2 });
};

export const declineFriendRequest = async (userId1, userId2) => {
    const endpoint = `https://grinddaily.onrender.com/api/friends/decline`;
    return fetchData(endpoint, 'POST', { userId1, userId2 });
};

export const getPendingFriendRequest = async (userId) => {
    const endpoint = `https://grinddaily.onrender.com/api/friends/pending/${userId}`;
    return fetchData(endpoint);
};