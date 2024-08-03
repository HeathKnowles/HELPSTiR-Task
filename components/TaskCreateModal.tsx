import { FC, useState, ChangeEvent, FormEvent } from 'react'; // Import React hooks and types
import { Task } from '../types'; // Import the Task type definition

// Defines an interface for the Props of the TaskCreateModal
interface TaskCreateModalProps {
  isOpen: boolean; // Indicates whether the modal is open
  onClose: () => void; // Function to close the modal
  onCreate: (task: Task) => void; // Function to create a new task
}

const TaskCreateModal: FC<TaskCreateModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [title, setTitle] = useState<string>(''); // State to track the title input
  const [description, setDescription] = useState<string>(''); // State to track the description input

  // Handle changes to the title input
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // Handle changes to the description input
  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  // Handle cancel action: clear inputs and close modal
  const handleCancel = () => {
    setTitle('');
    setDescription('');
    onClose();
  };

  // Handle form submission: create new task, clear inputs, and close modal
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newTask: Task = {
      id: Date.now(), // Generate a unique ID for the task
      title,
      description,
      completed: false, // Default completion status
      updatedAt: new Date().toISOString(), // Current timestamp
    };
    onCreate(newTask); // Trigger the onCreate function with the new task
    setTitle(''); // Clear title input
    setDescription(''); // Clear description input
    onClose(); // Close the modal
  };

  if (!isOpen) return null; // Render nothing if the modal is not open

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-gray-700 p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Create Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="w-full p-2 border text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Description</label>
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              className="w-full p-2 border text-black"
              required
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={handleCancel} className="mr-2 bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskCreateModal; 