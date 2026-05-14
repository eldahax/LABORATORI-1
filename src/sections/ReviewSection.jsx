import { useState } from "react";

const ReviewSection = ({ image }) => {
    const [rating, setRating] = useState(0);
    const [description, setDescription] = useState("");

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">

                <div className="grid md:grid-cols-2 gap-12 items-center">

                    <div className="w-full h-full">
                        <img
                            src={image}
                            alt="Leave a review"
                            className="rounded-2xl shadow-xl object-cover w-full h-[500px]"
                        />
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-lg">

                        <h2 className="text-3xl font-bold mb-2">
                            Leave Your Review
                        </h2>

                        <p className="text-gray-500 mb-6">
                            We value your feedback
                        </p>

                        <div className="mb-4">
                            <label className="block mb-2 font-medium">Rating</label>
                            <select
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                className="w-full border p-3 rounded-lg"
                            >
                                <option value="0">Select rating</option>
                                <option value="1">1 - Poor</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5 - Excellent</option>
                            </select>
                        </div>

                        <div className="mb-6">
                            <label className="block mb-2 font-medium">Review</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows="5"
                                className="w-full border p-3 rounded-lg"
                                placeholder="Write your experience..."
                            />
                        </div>

                        <button
                            className="w-full bg-[#0F766E] text-white py-3 rounded-xl hover:bg-[#115e59] transition"
                        >
                            Submit Review
                        </button>

                    </div>
                </div>

            </div>
        </section>
    );
};

export default ReviewSection;