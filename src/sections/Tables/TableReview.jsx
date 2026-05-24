import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Sidebar from "../sideBar";
import CustomAlert from "../../components/CustomAlert";

function ConfirmModal({
  show,
  onConfirm,
  onCancel,
}) {

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg">

        <h2 className="text-lg font-bold mb-2">
          Confirm Delete
        </h2>

        <p className="text-gray-600 mb-6">
          Are you sure you want to delete
          this review?
        </p>

        <div className="flex justify-end gap-3">

          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ReviewTable() {

  const [reviews, setReviews] = useState([]);

  const [user, setUser] = useState(null);

  const [confirmOpen, setConfirmOpen] =
    useState(false);

  const [selectedId, setSelectedId] =
    useState(null);

  const navigate = useNavigate();

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {

    fetch(
      "http://localhost:5000/api/users/me",
      {
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) =>
        console.log(err)
      );

  }, []);

  const roles = user?.roles || [];

  useEffect(() => {

    fetch(
      "http://localhost:5000/api/reviews",
      {
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch(() =>
        setAlert({
          show: true,
          message:
            "Failed to load reviews",
          type: "error",
        })
      );

  }, []);

  const deleteReview = async () => {

    try {

      const res = await fetch(
        `http://localhost:5000/api/reviews/${selectedId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) {

        setAlert({
          show: true,
          message: "Delete failed",
          type: "error",
        });

        return;
      }

      setReviews((prev) =>
        prev.filter(
          (review) =>
            review.reviews_id !==
            selectedId
        )
      );

      setAlert({
        show: true,
        message:
          "Review deleted successfully",
        type: "success",
      });

    } catch (err) {

      setAlert({
        show: true,
        message: "Server error",
        type: "error",
      });
    }

    setConfirmOpen(false);
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md mb-8 overflow-x-auto">

      <Navbar />

      <div className="min-h-screen flex w-full mt-[50px]">

        <Sidebar />

        <div className="w-3/4 p-10 ml-[25%]">

          <div className="flex justify-between items-center mb-6">

            <h1 className="text-lg sm:text-xl font-bold text-[#0F766E]">
              Reviews
            </h1>

          </div>

          <CustomAlert
            show={alert.show}
            message={alert.message}
            type={alert.type}
            onClose={() =>
              setAlert((p) => ({
                ...p,
                show: false,
              }))
            }
          />

          <ConfirmModal
            show={confirmOpen}
            onCancel={() =>
              setConfirmOpen(false)
            }
            onConfirm={deleteReview}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {reviews.map((review) => (

              <div
                key={review.reviews_id}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 hover:shadow-md transition"
              >

                <div className="flex justify-between items-start mb-4">

                  <div>

                    <h2 className="text-lg font-bold text-[#0F766E]">
                      {
                        review.Treatment
                          ?.treatment_name
                      }
                    </h2>

                    <p className="text-sm text-gray-500">
                      {new Date(
                        review.created_at
                      ).toLocaleString()}
                    </p>
                  </div>

                  <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full font-semibold">
                    ⭐ {review.rating}/5
                  </span>
                </div>

                <div className="space-y-3 text-sm">

                  <p>
                    <span className="font-semibold">
                      Patient:
                    </span>{" "}
                    {
                      review.Patient
                        ?.User?.first_name
                    }{" "}
                    {
                      review.Patient
                        ?.User?.last_name
                    }
                  </p>

                  <p>
                    <span className="font-semibold">
                      Treatment:
                    </span>{" "}
                    {
                      review.Treatment
                        ?.treatment_name
                    }
                  </p>

                  <div>
                    <span className="font-semibold">
                      Review:
                    </span>

                    <p className="mt-1 text-gray-700 leading-relaxed">
                      {
                        review.description
                      }
                    </p>
                  </div>

                  <div className="flex items-center gap-1 pt-1">

                    {[1, 2, 3, 4, 5].map(
                      (star) => (
                        <span
                          key={star}
                          className={`text-lg ${star <=
                              review.rating
                              ? "text-yellow-500"
                              : "text-gray-300"
                            }`}
                        >
                          ★
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div className="mt-6">

                  {(roles.includes("patient") ||
                    roles.includes("admin")) && (
                      <button
                        onClick={() => {
                          setSelectedId(
                            review.reviews_id
                          );

                          setConfirmOpen(true);
                        }}
                        className="w-full bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition py-2 rounded-xl"
                      >
                        Delete
                      </button>
                    )}

                </div>
              </div>
            ))}
          </div>

          {reviews.length === 0 && (
            <div className="w-full text-center py-16">

              <h2 className="text-2xl font-bold text-gray-700">
                No Reviews Found
              </h2>

              <p className="text-gray-500 mt-2">
                There are currently no
                reviews available.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}