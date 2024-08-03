// This shows the List of the tasks present

"use client"; // Indicates that this component is client-side only

import { FC, useState } from 'react'; 
import TaskItem from '@/components/TaskItem'; // Import the TaskItem component
import { Task } from '@/types'; // Imports the Task type definition

// Defines an interface for the Props of the tasks present
interface TaskListProps {
  tasks: Task[]; 
  onToggle: (id: number) => void; // Function to toggle task completion
  onEdit: (id: number, updatedTask: Task) => void; // Function to edit a task
  onDelete: (id: number) => void; // Function to delete a task
}

const TaskList: FC<TaskListProps> = ({ tasks, onToggle, onEdit, onDelete }) => {
  const [expandedId, setExpandedId] = useState<number | null>(null); // State to track the expanded task

  // Handle the expansion/collapse of a task
  const handleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id); // Toggle the expanded state
  };

  return (
    <div className="mt-4"> {/* Container for the task list */}
      {tasks.map((task) => (
        <div key={task.id}> {/* Unique key for each task */}
          <div
            className="flex justify-between items-center p-4 cursor-pointer border-b border-blue-600"
            onClick={() => handleExpand(task.id)} // Handle task expansion on click
          >
            <span className={task.completed ? 'line-through' : ''}>{task.title}</span> {/* Display task title, strikethrough if completed */}
            <span>{expandedId === task.id ? '-' : '+'}</span> {/* Display '-' if expanded, '+' if collapsed */}
          </div>
          {expandedId === task.id && ( // Show task details if expanded
            <div className="p-4">
              <TaskItem task={task} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} /> {/* Render TaskItem component */}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList; 
