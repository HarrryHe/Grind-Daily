import React, { useEffect, useState } from 'react';


function GithubProfile({ username = 'octocat'}){
    const [userData, setUserData] = useState(null);

    //fetch user profile from github
    useEffect(() => {
        fetch(`https://api.github.com/users/${username}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((data) => {
            const { login, name, avatar_url, html_url, email, public_repos, followers } = data;
            setUserData({ login, name, avatar_url, html_url, email, public_repos, followers });
        })
        .catch((err) => {
            console.log(err.message);
        });
    }, []);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="githubProfile bg-neutral-700 rounded-lg h-36 w-80 hover:scale-105 transition duration-500">
            <a href={userData.html_url || 'https://github.com'} className="block flex"> 
                <img className="size-28 rounded-full m-4" src={userData.avatar_url} alt="User Avatar"/>
                <div className="flex flex-col text-gray-300 m-2 justify-center w-56">
                    <span className="text-xl mb-4 font-bold break-all">{userData.name || userData.login}</span>
                    <span className="break-all text-sm">{userData.email || 'Email Not Provided'}</span>
                    <span className="text-sm"><strong>Repo Count:</strong> {userData.public_repos}</span>
                </div>
            </a>
        </div>
    )
}

export default GithubProfile;