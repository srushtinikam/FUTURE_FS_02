

function OutlineButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="border border-purple-600 text-purple-600 px-5 py-2 rounded-lg hover:bg-purple-600 hover:text-white transition duration-300"
    >
      {label}
    </button>
  );
}

export default OutlineButton;

