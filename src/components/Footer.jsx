import img1 from "../assets/images/icons8-facebook-50.png";
import img2 from "../assets/images/icons8-instagram-logo-60.png";
import img3 from "../assets/images/tiktok.png";

const Footer = () => {
    return (
        <footer class="bg-white shadow-2xl text-gray-900 mt-10 p-10">
            <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
                <div>
                    <h4 class="text-xl font-bold mb-4">Support</h4>
                    <ul class="space-y-2">
                        <li><a href="#" class="hover:text-green-600 transition">FAQs</a></li>
                        <li><a href="#" class="hover:text-green-600 transition">Appointments</a></li>
                        <li><a href="#" class="hover:text-green-600 transition">Privacy Policy</a></li>
                        <li><a href="#" class="hover:text-green-600 transition">Terms & Conditions</a></li>
                    </ul>
                </div>

                <div>
                    <h4 class="text-xl font-bold mb-4">Contact</h4>
                    <p class="mb-2">Email us for updates & offers</p>
                    <p>info@agusholli-dent.com</p>
                    <p>appointments@agusholli-dent.com</p>
                    <div class="flex justify-center md:justify-start space-x-4 mt-4">
                        <a href="https://facebook.com" target="_blank" class="hover:opacity-80 transition">
                            <img src={img1} alt="Facebook" class="w-7 h-7" />
                        </a>
                        <a href="https://tiktok.com" target="_blank" class="hover:opacity-80 transition">
                            <img src={img2} alt="Instagram" class="w-7 h-7" />
                        </a>
                        <a href="https://instagram.com" target="_blank" class="hover:opacity-80 transition">
                            <img src={img3} alt="tiktok" class="w-7 h-7" />
                        </a>
                    </div>
                </div>

                <div class="md:col-span-2">
                    <h4 class="text-xl font-bold mb-4">About</h4>
                    <p class="mb-2">
                        Our dental clinic provides top-quality care with expert dentists and modern facilities. We are
                        dedicated to giving every patient a confident and healthy smile.
                    </p>
                    <p>
                        Our team is passionate about dental health, using the latest technology and techniques to ensure
                        comfort and excellence in every treatment.
                    </p>
                </div>
            </div>

            <div class="mt-10 text-center border-t border-gray-200/50 pt-4 text-gray-600">
                <p>© 2025 Agusholli Dental Clinic — All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;