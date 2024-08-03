import { FC, useState, ChangeEvent, FormEvent } from 'react'; 
import { Task } from '../types'; 

// Defines an interface for the Props of the TaskEditModal
interface TaskEditModalProps {
  task: Task; // The task to be edited
  onClose: () => void; // Function to close the modal
  onEdit: (id: number, updatedTask: Task) => void; // Function to handle task editing
}

const TaskEdit: FC<TaskEditModalProps> = ({ task, onClose, onEdit }) => {
  const [title, setTitle] = useState<string>(task.title); // State to track the title input, initialized with the current task title
  const [description, setDescription] = useState<string>(task.description); // State to track the description input, initialized with the current task description

  // Handle changes to the title input
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // Handle changes to the description input
  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  // Handle form submission: create updated task object and trigger onEdit function
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const updatedTask = { ...task, title, description, updatedAt: new Date().toISOString() }; // Create an updated task object
    onEdit(task.id, updatedTask); // Trigger the onEdit function with the updated task
    onClose(); // Close the modal
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-gray-700 p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Edit Task</h2>
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
            <button type="button" onClick={onClose} className="mr-2 bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskEdit; 
