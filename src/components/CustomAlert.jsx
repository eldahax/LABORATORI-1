import { useEffect } from "react";
import { CheckCircle, XCircle, AlertTriangle, X } from "lucide-react";

export default function CustomAlert({
    show,
    message,
    type = "success",
    onClose,
}) {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    if (!show) return null;

    const styles = {
        success: {
            bg: "bg-emerald-600",
            icon: <CheckCircle size={22} />,
        },
        error: {
            bg: "bg-red-500",
            icon: <XCircle size={22} />,
        },
        warning: {
            bg: "bg-yellow-500",
            icon: <AlertTriangle size={22} />,
        },
    };

    return (
        <div className="fixed top-5 right-5 z-50 animate-[slideIn_.4s_ease]">
            <div
                className={`${styles[type].bg}
        text-white rounded-2xl shadow-2xl
        px-5 py-4 min-w-[320px]
        flex items-center justify-between gap-4`}
            >
                <div className="flex items-center gap-3">
                    {styles[type].icon}

                    <p className="font-medium">
                        {message}
                    </p>
                </div>

                <button
                    onClick={onClose}
                    className="hover:scale-110 transition"
                >
                    <X size={20} />
                </button>
            </div>
        </div>
    );
}