import { useEffect, useState } from "react";
import CustomAlert from "../components/CustomAlert";

export default function ReviewSection({ image }) {

  const [treatment, setTreatment] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");

  const [treatments, setTreatments] = useState([]);

  const [treatmentError, setTreatmentError] = useState("");
  const [ratingError, setRatingError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [submitError, setSubmitError] = useState("");

  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {

    const fetchTreatments = async () => {
      try {

        const res = await fetch(
          "http://localhost:5000/api/treatments"
        );

        const data = await res.json();

        setTreatments(data);

      } catch (err) {

        console.error(
          "Failed to fetch treatments:",
          err
        );
      }
    };

    fetchTreatments();

  }, []);

  const showAlert = (
    message,
    type = "success"
  ) => {

    setAlert({
      show: true,
      message,
      type,
    });

    setTimeout(() => {

      setAlert({
        show: false,
        message: "",
        type: "success",
      });

    }, 2500);
  };

  const validate = () => {

    let hasError = false;

    setTreatmentError("");
    setRatingError("");
    setDescriptionError("");
    setSubmitError("");

    if (treatment === "") {

      setTreatmentError(
        "Please select a treatment"
      );

      hasError = true;
    }

    if (rating === "") {

      setRatingError(
        "Please select a rating"
      );

      hasError = true;

    } else if (
      Number(rating) < 1 ||
      Number(rating) > 5
    ) {

      setRatingError(
        "Rating must be between 1 and 5"
      );

      hasError = true;
    }

    if (description.trim() === "") {

      setDescriptionError(
        "Review is required"
      );

      hasError = true;

    } else if (
      description.trim().length < 10
    ) {

      setDescriptionError(
        "Review must contain at least 10 characters"
      );

      hasError = true;

    } else if (
      description.trim().length > 255
    ) {

      setDescriptionError(
        "Maximum 255 characters allowed"
      );

      hasError = true;
    }

    return !hasError;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {

      const res = await fetch(
        "http://localhost:5000/api/reviews",
        {
          method: "POST",

          credentials: "include",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            treatment_id: Number(treatment),
            rating: Number(rating),
            description:
              description.trim(),
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {

        setSubmitError(
          data.error ||
          "Something went wrong"
        );

        showAlert(
          data.error || "Error",
          "error"
        );

        setLoading(false);

        return;
      }

      showAlert(
        "Review created successfully",
        "success"
      );

      setTreatment("");
      setRating("");
      setDescription("");

    } catch (err) {

      console.error(err);

      setSubmitError(
        "Failed to connect to server"
      );

      showAlert(
        "Server error",
        "error"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-gray-50 py-20">

      <CustomAlert
        show={alert.show}
        message={alert.message}
        type={alert.type}
        onClose={() =>
          setAlert({
            show: false,
            message: "",
            type: "success",
          })
        }
      />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

        <div className="w-full">

          <img
            src={image}
            alt="review"
            className="w-full h-[650px] object-cover rounded-3xl shadow-lg"
          />
        </div>

        <div className="w-full h-[650px] bg-white rounded-3xl shadow-xl p-8 md:p-10 overflow-y-auto">

          <div className="mb-8">

            <p className="text-teal-700 font-semibold uppercase tracking-widest text-sm">
              Patient Feedback
            </p>

            <h2 className="text-4xl font-bold text-black mt-2">
              Leave Your Review
            </h2>

            <p className="text-gray-500 mt-3 leading-relaxed">
              Share your experience with our
              dental treatments and help
              other patients make informed
              decisions.
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="flex flex-col mb-5">

              <label className="mb-2 font-bold text-black">
                Treatment
              </label>

              <select
                value={treatment}
                onChange={(e) => {
                  setTreatment(
                    e.target.value
                  );

                  setTreatmentError("");
                }}
                className={`w-full border-2 rounded-xl px-4 py-3 outline-none transition-all duration-200 ${treatmentError
                    ? "border-red-500"
                    : "border-gray-300 focus:border-teal-700"
                  }`}
              >
                <option value="">
                  Select treatment
                </option>

                {treatments.map((t) => (
                  <option
                    key={t.treatment_id}
                    value={t.treatment_id}
                  >
                    {t.treatment_name}
                  </option>
                ))}
              </select>

              <span className="text-red-500 text-sm mt-1">
                {treatmentError}
              </span>
            </div>

            <div className="flex flex-col mb-5">

              <label className="mb-2 font-bold text-black">
                Rating
              </label>

              <select
                value={rating}
                onChange={(e) => {
                  setRating(
                    e.target.value
                  );

                  setRatingError("");
                }}
                className={`w-full border-2 rounded-xl px-4 py-3 outline-none transition-all duration-200 ${ratingError
                    ? "border-red-500"
                    : "border-gray-300 focus:border-teal-700"
                  }`}
              >
                <option value="">
                  Select rating
                </option>

                <option value="1">
                  1 ★
                </option>

                <option value="2">
                  2 ★★
                </option>

                <option value="3">
                  3 ★★★
                </option>

                <option value="4">
                  4 ★★★★
                </option>

                <option value="5">
                  5 ★★★★★
                </option>
              </select>

              <span className="text-red-500 text-sm mt-1">
                {ratingError}
              </span>
            </div>

            <div className="flex flex-col mb-5">

              <label className="mb-2 font-bold text-black">
                Your Review
              </label>

              <textarea
                rows={6}
                value={description}
                onChange={(e) => {
                  setDescription(
                    e.target.value
                  );

                  setDescriptionError(
                    ""
                  );
                }}
                placeholder="Write your experience here..."
                className={`w-full border-2 rounded-xl px-4 py-3 resize-none outline-none transition-all duration-200 ${descriptionError
                    ? "border-red-500"
                    : "border-gray-300 focus:border-teal-700"
                  }`}
              />

              <div className="flex justify-between items-center mt-1">

                <span className="text-red-500 text-sm">
                  {descriptionError}
                </span>

                <span className="text-gray-400 text-sm">
                  {
                    description.length
                  }
                  /255
                </span>
              </div>
            </div>

            {submitError && (
              <p className="text-red-600 text-center mb-4 font-medium">
                {submitError}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-bold text-white transition-all duration-200 ${loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-teal-700 hover:bg-teal-800"
                }`}
            >
              {loading
                ? "Submitting..."
                : "SUBMIT REVIEW"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}