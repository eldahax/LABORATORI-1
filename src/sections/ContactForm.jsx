const ContactForm = (props) => {
  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xl">
      <form className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#0F766E] outline-none transition"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#0F766E] outline-none transition"
          />
        </div>
        <div>
          <input
            type="tel"
            placeholder="Phone"
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#0F766E] outline-none transition"
          />
        </div>
        <div>
          <textarea
            placeholder="Your message"
            rows="4"
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#0F766E] outline-none transition"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-[#0F766E] text-white font-bold py-3 rounded-full hover:scale-105 active:scale-95 transition-all duration-300"
        >
          {props.buttonText}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;