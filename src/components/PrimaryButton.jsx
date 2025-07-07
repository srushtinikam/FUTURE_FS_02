
function PrimaryButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg shadow-md hover:shadow-xl transition duration-300"
    >
      {label}
    </button>
  );
}

export default PrimaryButton;

