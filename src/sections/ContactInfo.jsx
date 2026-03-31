
const ContactInfo = (props) => {
    return (
        <div className="bg-white p-8 rounded-3xl border border-gray-200 flex flex-col justify-center space-y-8">
            <h3 className="text-2xl font-bold text-gray-800">{props.title}</h3>
            <div className="space-y-6">

                <div className="flex items-center space-x-4">
                    <img src="/images/location.png" className="w-10 h-10 rounded-full" alt="Location" />
                    <p className="font-medium text-gray-700">{props.address}</p>
                </div>

                <div className="flex items-center space-x-4">
                    <img src="/images/phone.png" className="w-10 h-10 rounded-full" alt="Phone" />
                    <p className="font-medium text-gray-700">{props.phone}</p>
                </div>

                <div className="flex items-center space-x-4">
                    <img src="/images/gmail.png" className="w-10 h-10 rounded-full" alt="Email" />
                    <p className="font-medium text-gray-700">{props.email}</p>
                </div>

                <div>
                    <p className="text-gray-600 mb-2">Follow our social media</p>
                    <div className="flex space-x-4">
                        <img src="/images/icons8-facebook-50.png" className="w-6 h-6" alt="FB" />
                        <img src="/images/tiktok.png" className="w-6 h-6" alt="Tiktok" />
                        <img src="/images/icons8-instagram-logo-60.png" className="w-6 h-6" alt="IG" />
                    </div>
                </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <p className="font-semibold text-sm italic text-gray-600">
                    {props.emergencyNote}
                </p>
            </div>
        </div>
    );
};

export default ContactInfo;