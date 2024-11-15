import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import '../styles/task.css';

const Task = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [showTaskInput, setShowTaskInput] = useState(false);
  const [newTask, setNewTask] = useState({ description: '', time: '', priority: '' });
  const [clickedDate, setClickedDate] = useState(null);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear();
  };

  const getDateKey = (day) => {
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const Pad = String(day).padStart(2, '0');
    return `${currentDate.getFullYear()}-${month}-${Pad}`;
  };

  const handleDateClicked = (dateKey) => {
    setClickedDate(clickedDate === dateKey ? null : dateKey);
  };

  const addNewTask = () => {
    setShowTaskInput(true);
    setSelectedDate(null);
  };

  const closeNewTask = () => {
    setShowTaskInput(false);
    setSelectedDate(null);
    setNewTask({ description: '', time: '', priority: '' });
  };

  const insertNewTask = (e) => {
    e.preventDefault();
    if (selectedDate && newTask.description && newTask.priority && newTask.time) {
      setTasks(prev => ({
        ...prev,
        [selectedDate]: [...(prev[selectedDate] || []), { ...newTask }]
      }));
      setNewTask({ description: '', time: '', priority: '' });
      closeNewTask();
    }
  };

  // Function to check if a task is within the next 12 hours
  const isTaskWithinNext12Hours = (taskTime) => {
    const currentTime = new Date();
    const twelveHoursLater = new Date(currentTime.getTime() + 12 * 60 * 60 * 1000);

    // Convert task time into Date object
    const [hours, minutes] = taskTime.split(':').map(num => parseInt(num, 10));
    const taskDate = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), hours, minutes);

    return taskDate >= currentTime && taskDate <= twelveHoursLater;
  };

  // Function to get upcoming tasks for the next 12 hours
  const getUpcomingTasks = () => {
    const upcomingTasks = [];
    Object.keys(tasks).forEach(dateKey => {
      tasks[dateKey].forEach(task => {
        if (isTaskWithinNext12Hours(task.time)) {
          upcomingTasks.push({ dateKey, task });
        }
      });
    });
    return upcomingTasks;
  };

  const upcomingTasks = getUpcomingTasks();

  return (
    <div className="min-h-screen bg-[#25262E] flex items-center justify-center">
      <div className="w-full max-w-5xl calendar-container text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevMonth} className="p-2 hover:bg-[#ff76a3] rounded-full">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <h2 className="lg:text-8xl pixelify-sans second-header-text-gradient animate__animated animate__flipInX">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button onClick={nextMonth} className="p-2 hover:bg-[#ff76a3] rounded-full">
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
          <button onClick={addNewTask} className="p-2 hover:bg-[#ff76a3] rounded-full ml-4">
            <Plus className="plus-button w-10 h-10 text-white" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-2">
          {days.map(day => (
            <div key={day} className="days-of-week">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2 mb-4">
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <div key={`empty-${index}`} className="p-2"></div>
          ))}

          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const dateKey = getDateKey(day);
            const dayTasks = tasks[dateKey] || [];
            return (
              <div
                key={day}
                onClick={() => handleDateClicked(dateKey)}
                className={`days-of-month ${isToday(day) ? 'today' : ''} ${clickedDate === dateKey ? 'enlarged-date' : ''}`}
              >
                {day}
                {dayTasks.length > 0 && (
                  <div className={`priority-marker ${dayTasks[0].priority}`} />
                )}
                {clickedDate === dateKey && (
                  <div className="dated-tasks">
                    {dayTasks.length > 0 ? (
                      dayTasks.map((task, i) => (
                        <div key={i} className="task-item">
                          <p><strong>Time: </strong>{task.time}</p>
                          <p><strong>Description: </strong>{task.description}</p>
                        </div>
                      ))
                    ) : (
                      <p className="no-created-tasks">No tasks for today!</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {showTaskInput && (
          <form onSubmit={insertNewTask} className="insert-task mt-4 flex gap-2">
            <label className="text-white">Select Date:</label>
            <input
              type="date"
              value={selectedDate || ''}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="selected-task-date p-2 border rounded"
            />
            <label className="text-white">Time:</label>
            <input
              type="time"
              value={newTask.time}
              onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
              className="new-task-time p-2 border rounded"
            />
            <label className="text-white">Description:</label>
            <input
              type="text"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              placeholder="Enter the task's description..."
              className="new-task-description p-2 border rounded text-[#ff76a3]"
            />
            <label className="text-white">Priority:</label>
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              className="new-task-priority p-2 border rounded"
            >
              <option value="">Task Priority</option>
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
            </select>
            <button
              type="submit"
              className="add-button px-4 py-2 rounded flex items-center"
            >
              Add Task
            </button>
            <button type="button" onClick={closeNewTask} className="cancel-button px-4 py-2 rounded">
              Cancel
            </button>
          </form>
        )}

        {/* Display tasks for the next 12 hours below the calendar */}
        <div className="upcoming-tasks mt-6">
          <h3 className="text-xl font-semibold text-white mb-4">Upcoming Tasks in the Next 12 Hours</h3>
          {upcomingTasks.length > 0 ? (
            upcomingTasks.map((item, index) => (
              <div key={index} className="task-item mb-3">
                <p><strong>Date: </strong>{item.dateKey}</p>
                <p><strong>Time: </strong>{item.task.time}</p>
                <p><strong>Description: </strong>{item.task.description}</p>
                <p><strong>Priority: </strong>{item.task.priority}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No tasks in the next 12 hours.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Task;
