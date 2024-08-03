"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TaskCreateModal from '@/components/TaskCreateModal';
import SearchBar from '@/components/Searchbar'
import TaskList from '../components/TaskList';
import { Task } from '@/types';

const TaskPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') ?? '';

  // This fetches the tasks
  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch('/tasks.json');
      const initialTasks: Task[] = await res.json();
      setTasks(initialTasks);
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    const query = searchParams.get('q') ?? '';
    setSearchQuery(query);
  }, [searchParams]);

  const handleToggle = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleEdit = (id: number, updatedTask: Task) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? updatedTask : task
    );
    setTasks(updatedTasks);
  };

  const handleDelete = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  // Handle Search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const params = new URLSearchParams();
    if (query) {
      params.set('q', query);
    }
    router.push(`/?${params.toString()}`);
  };

  // Handle Create tasks
  const handleCreate = async (newTask: Task) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    await fetch('/tasks.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTasks),
    });
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Create Task
        </button>
      </div>
      {/* Importing all the UseComponents */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={handleSearch} />
      <TaskList tasks={filteredTasks} onToggle={handleToggle} onEdit={handleEdit} onDelete={handleDelete} />
      <TaskCreateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreate={handleCreate} />
    </div>
  );
};

export default TaskPage;