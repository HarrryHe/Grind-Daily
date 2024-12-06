import React, { useState } from 'react';
import defaultAvatar from '../assets/default-avatar.png';

function Comment({ Comments = [], profileUser, commentUser }) {

  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

  const handleCommentPost = (e) => {
    console.log(profileUser, commentUser);
    const newComment = {
      owner: profileUser,
      guest: commentUser,
      comment: comment,
    }

    fetch('https://grinddaily.onrender.com/api/comment', {
      method: 'POST',
      headers: {
          'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON. stringify(newComment),
  })
    .then((response) => response.json())
    .then((data) => {
        if(!data.error) {
            console.log('Comment Successfully Stored!', data);
            setMessage('Comment Successfully Stored!');
        }
        else {
            console.log('Failed to store', data.error);
            setMessage('Failed to Send Comment.');
        }
    })
    .catch((err) => {
        console.log(err.message);
    });
  }

  return (
    <section class="bg-gray-900 py-8 lg:py-16 antialiased rounded-lg">
      <div class="max-w-2xl mx-auto px-4">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Comments {Comments ? Comments.length : 0}</h2>
        </div>
        <form class="mb-6" onSubmit={(e) => handleCommentPost(e)}>
          <div class="py-2 px-4 mb-4 rounded-lg rounded-t-lg border bg-gray-800 border-gray-700">
            <label for="comment" class="sr-only">Your comment</label>
            <textarea id="comment" rows="6"
              class="px-0 w-full text-sm border-0 focus:ring-0 focus:outline-none text-white placeholder-gray-400 bg-gray-800"
              placeholder="Write a comment..." onChange={(e)=> setComment(e.target.value)}required></textarea>
          </div>
          <div class="px-8 py-32">
            <div class="grid gap-8 items-start justify-center">
              <div class="relative group">
                <div class="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <button class="relative px-7 py-4 bg-black rounded-lg leading-none flex items-center divide-x divide-gray-600">
                  <span class="pl-6 text-indigo-400 group-hover:text-gray-100 transition duration-200">Post &rarr;</span>
                </button>
              </div>
            </div>
          </div>
          <p className="text-gray-400">{message}</p>
        </form>
        {Comments && Comments.map(comment => (
          <article key={comment._id} className="p-6 text-base bg-gray-900 border-b border-gray-400">
            <footer className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <p className="inline-flex items-center mr-3 text-sm text-white font-semibold">
                  <img
                    class="mr-2 w-6 h-6 rounded-full"
                    src={comment.guest.avatarUrl || defaultAvatar}
                    alt="pic"
                  />
                  {comment.guest.username}
                </p>
                <p className="text-sm text-gray-400">{new Date(comment.date).toLocaleString()}</p>
              </div>
            </footer>
            <p className="text-gray-400 text-left break-words">{comment.comment}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Comment;