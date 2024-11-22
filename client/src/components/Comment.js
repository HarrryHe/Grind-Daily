function Comment() {
  return (
    <section class="bg-gray-900 py-8 lg:py-16 antialiased rounded-lg">
      <div class="max-w-2xl mx-auto px-4">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Comments (3)</h2>
        </div>
        <form class="mb-6">
          <div class="py-2 px-4 mb-4 rounded-lg rounded-t-lg border bg-gray-800 border-gray-700">
            <label for="comment" class="sr-only">Your comment</label>
            <textarea id="comment" rows="6"
              class="px-0 w-full text-sm border-0 focus:ring-0 focus:outline-none text-white placeholder-gray-400 bg-gray-800"
              placeholder="Write a comment..." required></textarea>
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
        </form>
        <article class="p-6 text-base rounded-lg bg-gray-900">
          <footer class="flex justify-between items-center mb-2">
            <div class="flex items-center">
              <p class="inline-flex items-center mr-3 text-sm text-white font-semibold">
                <img
                  class="mr-2 w-6 h-6 rounded-full"
                  src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                  alt="Michael Gough"
                />
                Michael Gough
              </p>
              <p class="text-sm text-gray-400"><time pubdate datetime="2022-02-08"
                title="February 8th, 2022">Nov. 8, 2024</time></p>
            </div>
          </footer>
          <p class="text-gray-400">Epic Profile bro</p>
        </article>
        
        <article class="p-6 mb-3 text-base border-t border-gray-200 border-gray-700 bg-gray-900">
          <footer class="flex justify-between items-center mb-2">
            <div class="flex items-center">
              <p class="inline-flex items-center mr-3 text-sm text-white font-semibold">
                <img
                  class="mr-2 w-6 h-6 rounded-full"
                  src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                  alt="Bonnie Green"
                />
                Bonnie Green
              </p>
              <p class="text-sm text-gray-400"><time pubdate datetime="2022-03-12"
                title="March 12th, 2022">Mar. 12, 2024</time></p>
            </div>
          </footer>
          <p class="text-gray-400">Sick profile man you are a grinder for real</p>
        </article>
        <article class="p-6 text-base border-t border-gray-200 border-gray-700 bg-gray-900">
          <footer class="flex justify-between items-center mb-2">
            <div class="flex items-center">
              <p class="inline-flex items-center mr-3 text-sm text-white font-semibold">
                <img
                  class="mr-2 w-6 h-6 rounded-full"
                  src="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
                  alt="Helene Engels"
                />
                Helene Engels
              </p>
              <p class="text-sm text-gray-400"><time pubdate datetime="2022-06-23"
                title="June 23rd, 2022">Nov. 12, 2024</time></p>
            </div>
          </footer>
          <p class="text-gray-400">Keep up the grinding man.</p>
        </article>
      </div>
    </section>
  );
}

export default Comment;
