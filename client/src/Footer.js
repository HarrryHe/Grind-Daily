const Footer = () => {
    return (
        <footer className="mt-16 bg-neutral-800 text-gray-300 py-8">
            <div className="text-center">
                <p className="text-sm">&copy; {new Date().getFullYear()} GrindDaily</p>
            </div>
        </footer>
    );
};

export default Footer;