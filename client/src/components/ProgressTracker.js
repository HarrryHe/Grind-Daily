import React, { useEffect, useState } from 'react';
import '../styles/progresstracker.css';

const ProgressTracker = ({ tasks = {} }) => {
    const [progress, setProgress] = useState({
        low: { total: 0, completed: 0},
        moderate: { total: 0, completed: 0},
        high: { total: 0, completed: 0},
    });

    useEffect(() => {
        const tasksByPriority = { low: { total: 0, completed: 0 }, moderate: { total: 0, completed: 0 }, high: { total: 0, completed: 0} };

        Object.values(tasks || {}).forEach(taskList => {
            taskList.forEach(Task => {
                if (tasksByPriority[Task.priority]){
                    tasksByPriority[Task.priority].total += 1;
                }
            });
        });

        setProgress(prev => ({
            ...prev,
            low: { ...prev.low, total: tasksByPriority.low.total },
            moderate: { ...prev.moderate, total: tasksByPriority.moderate.total },
            high: { ...prev.high, total: tasksByPriority.high.total },
        }));

    }, [tasks]);

    const handleTaskChecked = (priority) => {
        setProgress(prev => ({
            ...prev,
            [priority]: {
                ...prev[priority],
                completed: Math.min(prev[priority].completed + 1, prev[priority].total),
            },

        }));
    };

    const percentFinished = (priority) => {
        const { total, completed } = progress[priority];
        return total > 0 ? Math.round((completed / total) * 100) : 0;
    };

    return (
        <div className="progresstracker-container">
            <h3 className="progresstracker-h3">Grind Progress</h3>
            {["low", "moderate", "high"].map(priority => (
                <div key={priority} className="progresstracker-content">
                    <h4 className={`priority-title priority-${priority}`}>
                    </h4>
                    <div className="progressbar-container">
                        <div
                            className="progress-bar"
                            style={{ width: `${percentFinished(priority)}%`, backgroundColor: priority === 'low' ? 'green' : priority === 'moderate' ? 'yellow' : 'red'}}>
                        </div>
                    </div>
                    <div className="task-list">
                        {Object.values(tasks)
                        .flat()
                        .filter(task => task.priority === priority)
                        .map((task, index) => (
                            <div key={index} className="task-item">
                                <input 
                                    type="checkbox"
                                    onChange={() => handleTaskChecked(priority)}
                                />
                                <span>{task.description}</span>
                            </div>
                        ))}
                </div>
                </div>
            ))}
        </div>
    );
};

export default ProgressTracker;
