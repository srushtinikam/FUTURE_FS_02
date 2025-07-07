import { useLocation, Link } from "react-router-dom";

function Confirmation() {
  const location = useLocation();
  const { formData } = location.state || {};

  return (
    <div className="p-6 min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-4 text-purple-700">🎉 Order Confirmed!</h2>
      <p className="text-center mb-2">Thank you, <strong>{formData?.name}</strong>!</p>
      <p className="text-center mb-2">Your order will be delivered to:</p>
      <p className="text-center mb-4 font-semibold">{formData?.address}</p>

      <Link
        to="/"
        className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default Confirmation;

