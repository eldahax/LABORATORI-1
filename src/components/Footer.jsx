const Footer = (props) => {
    return (
        <footer className="bg-white shadow-2xl text-gray-900 mt-10 p-10 border-t">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h4 className="text-xl font-bold mb-4">Support</h4>

                    <p className="text-gray-600 leading-relaxed">
                        {props.support}
                    </p>
                </div>

                <div>
                    <h4 className="text-xl font-bold mb-4">Contact</h4>
                    <p>{props.email}</p>
                    <p>{props.appointments}</p>
                </div>

                <div className="md:col-span-2">
                    <h4 className="text-xl font-bold mb-4">About</h4>
                    <p className="text-gray-600">{props.about}</p>
                </div>
            </div>
            <div className="mt-10 text-center border-t border-gray-200/50 pt-4 text-gray-600">
                <p>© 2025 Agusholli Dental Clinic — All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;