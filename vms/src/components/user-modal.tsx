interface UserModalProps {
  user: { name: string; email: string };
  onClose: () => void;
}

export const UserModal: React.FC<UserModalProps> = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-2">User Information</h2>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
          Close
        </button>
      </div>
    </div>
  );
};
