import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import React, { useState } from 'react';
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

  const markCompleted = (dateKey, index) => {
    setTasks((prev) => {
      const updatedTasks = { ...prev };
      updatedTasks[dateKey] = updatedTasks[dateKey].map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      );
      return updatedTasks;
    });
  };

  const priorityProgress = () => {
    const progress = { high: { total: 0, completed: 0}, moderate: {total: 0, completed: 0}, low: { total: 0, completed: 0 } };
    Object.values(tasks).forEach(taskList => {
      taskList.forEach(task => {
        if(task.priority) {
          progress[task.priority].total += 1;
          if(task.completed){
            progress[task.priority].completed += 1;
          }
        }
      });
    });
    return progress;

  };
  const progress = priorityProgress();

  // Function to check if a task is within the next 12 hours
  const isTaskWithinNext12Hours = (taskTime, dateKey) => {
    const currentTime = new Date();
    const twelveHoursLater = new Date(currentTime.getTime() + 12 * 60 * 60 * 1000);

    // Check if the task is for today
    const today = new Date();
    const taskDate = new Date(dateKey + 'T' + taskTime);
    
    // Only consider tasks from today
    if (taskDate.getDate() !== today.getDate() ||
        taskDate.getMonth() !== today.getMonth() ||
        taskDate.getFullYear() !== today.getFullYear()) {
      return false;
    }

    return taskDate >= currentTime && taskDate <= twelveHoursLater;
  };

 // Modified function to get upcoming tasks for the next 12 hours of the current day only
 const getUpcomingTasks = () => {
  const upcomingTasks = [];
  const today = new Date();
  const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  
  if (tasks[todayKey]) {
    tasks[todayKey].forEach(task => {
      if (isTaskWithinNext12Hours(task.time, todayKey)) {
        upcomingTasks.push({ dateKey: todayKey, task });
      }
    });
  }
  
  // Sort tasks by time
  upcomingTasks.sort((a, b) => {
    const timeA = new Date(`1970-01-01T${a.task.time}`);
    const timeB = new Date(`1970-01-01T${b.task.time}`);
    return timeA - timeB;
  });

  return upcomingTasks;
};

  const upcomingTasks = getUpcomingTasks();

  return (
    <div className="min-h-screen-a">
        <div className="calendar-container">
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
                            className={`days-of-month ${isToday(day) ? 'today' : ''} ${
                                clickedDate === dateKey ? 'enlarged-date' : ''
                            }`}
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
                                                <p>
                                                    <strong>Time: </strong>
                                                    {task.time}
                                                </p>
                                                <p>
                                                    <strong>Description: </strong>
                                                    {task.description}
                                                </p>
                                                <button
                                                  onClick={() => markCompleted(dateKey, i)}
                                                  className={`toggle-completed-button ${task.completed ? "completed" : ""}`}
                                                  >
                                                    {task.completed ? "Mark Incomplete" : "Mark Completed"}
                                                  </button>
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
                <form onSubmit={insertNewTask} className="insert-task">
                    <label>Select Date:</label>
                    <input
                        type="date"
                        value={selectedDate || ''}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="p-2 border rounded"
                    />
                    <label>Time:</label>
                    <input
                        type="time"
                        value={newTask.time}
                        onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
                        className="p-2 border rounded"
                    />
                    <label>Description:</label>
                    <input
                        type="text"
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        placeholder="Enter the task's description..."
                        className="p-2 border rounded"
                    />
                    <label>Priority:</label>
                    <select
                        value={newTask.priority}
                        onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                        className="p-2 border rounded"
                    >
                        <option value="">Task Priority</option>
                        <option value="low">Low</option>
                        <option value="moderate">Moderate</option>
                        <option value="high">High</option>
                    </select>
                    <button type="submit" className="add-button px-4 py-2 rounded">
                        Add Task
                    </button>
                    <button type="button" onClick={closeNewTask} className="cancel-button px-4 py-2 rounded">
                        Cancel
                    </button>
                </form>
            )}
        </div>
        <div className="lg:text-2xl pixelify-sans second-header-text-gradient animate__animated animate__flipInX">
            <h3>Upcoming Tasks in the Next 12 Hours</h3>
            {upcomingTasks.length > 0 ? (
                upcomingTasks.map((item, index) => (
                    <div key={index} className="task-item mb-3">
                        <p><strong>Date: </strong>{item.dateKey}</p>
                        <p><strong>Time: </strong>{item.task.time}</p>
                        <p><strong>Description: </strong>{item.task.description}</p>
                        <p><strong>Priority: </strong>{item.task.priority}</p>
                        <p><strong>Completed: </strong>{item.task.completed ? "Yes" : "No"}</p>
                        <button onClick={() => markCompleted(item.dateKey, index)}
                        className={`toggle-completed-button ${item.task.completed ? "completed" : ""}`}
                        >
                          {item.task.completed ? "Mark Incomplete" : "Mark Completed"}
                        </button>
                    </div>
                ))
            ) : (
                <p className="text-gray-400">No tasks in the next 12 hours.</p>
            )}
        </div>
        <div className="lg:text-6xl pixelify-sans second-header-text-gradient animate__animated animate__flipInX">
            <h3>Progress Tracker</h3>
            {['high', 'moderate', 'low'].map(priority => (
                <div key={priority} className="progressBar">
                    <div className="flex justify-between">
                        <span className="capitalize">{priority} Priority</span>
                        <span>{`${progress[priority].completed}/${progress[priority].total}`}</span>
                    </div>
                    <div className="w-full bg-gray-700">
                        <div
                            className={`${
                                priority === 'high'
                                    ? 'bg-red-500'
                                    : priority === 'moderate'
                                    ? 'bg-yellow-500'
                                    : 'bg-green-500'
                            }`}
                            style={{
                                width: `${
                                    (progress[priority].completed /
                                        (progress[priority].total || 1)) *
                                    100
                                }%`,
                            }}
                        ></div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};
export default Task;
