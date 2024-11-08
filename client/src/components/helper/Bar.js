function Bar({ title = "default" }) {

    return (
        <div className="flex items-center w-10/12 lg:mt-32 sm:mt-24">
            <div className="flex-grow border-t-2 border-gray-500"></div>
            <span className="px-2 text-gray-500 text-lg font-semibold">{ title }</span>
            <div className="flex-grow border-t-2 border-gray-500"></div>
        </div>
    );
}

export default Bar;