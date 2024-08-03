import { useState, FC } from 'react'; 
import TaskEdit from './TaskEdit'; 
import { Task } from '@/types'; 

// Defines an interface for the Props of the task item
interface TaskItemProps {
  task: Task; // Task object
  onToggle: (id: number) => void; // Function to toggle task completion
  onEdit: (id: number, updatedTask: Task) => void; // Function to edit a task
  onDelete: (id: number) => void; // Function to delete a task
}

const TaskItem: FC<TaskItemProps> = ({ task, onToggle, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false); // State to track if the task is in edit mode

  // Toggles the completion state of the task
  const handleToggle = () => {
    onToggle(task.id);
  };

  // Sets the task to edit mode
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Deletes the task
  const handleDelete = () => {
    onDelete(task.id);
  };

  // Saves the edited task and exits edit mode
  const handleSave = (id: number, updatedTask: Task) => {
    onEdit(id, updatedTask);
    setIsEditing(false);
  };

  // Cancels the edit mode
  const handleCancel = () => {
    setIsEditing(false);
  };

  // If the task is in edit mode, render the TaskEdit component
  return isEditing ? (
    <TaskEdit task={task} onEdit={handleSave} onClose={handleCancel} />
  ) : (
    <div className="flex justify-between items-center p-4 border-b">
      <div className=''>
        <h3 className={task.completed ? 'line-through' : ''}>{task.title}</h3> {/* Task title, strikethrough if completed */}
        <p>{task.description}</p> 
        <small>Last updated: {task.updatedAt}</small> {/* Last updated timestamp */}
      </div>
      <div>
        <button onClick={handleToggle} className="mr-2 bg-green-500 text-black px-4 py-2 rounded">
          {task.completed ? 'Undo' : 'Done'} {/* Toggle button text based on completion state */}
        </button>
        <button onClick={handleEditClick} className="mr-2 bg-yellow-500 text-black px-4 py-2 rounded">
          Edit {/* Edit button */}
        </button>
        <button onClick={handleDelete} className="bg-red-500 text-black px-4 py-2 rounded">
          Delete {/* Delete button */}
        </button>
      </div>
    </div>
  );
};

export default TaskItem; // Export the TaskItem component
