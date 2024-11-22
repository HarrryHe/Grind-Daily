import { Dialog, Slide } from '@mui/material';
import React, { useEffect, useState } from 'react';
import createIcon from '../assets/createCard.svg';
import CardIcon from '../assets/randomCard.svg';
import Card from './helper/Card';
import tasks from './helper/challenges.json';

function Challenge() {
    const [currentCard, setCurrentCard] = useState({
      image: '/images/anime0.jpg',
      task: tasks[0],
    });
    const [checked, setChecked] = useState(false);

    const [formData, setFormData] = useState({
      title: "Default Title",
      genre: "N/A",
      description: "Please complete the creation of your challenge card",
      duration: 1,
      difficulty: 1,
      generatedBy: 'user',
    });
    const [error, setError] = useState("");

    //Dialog part
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    //--------------------------------

    useEffect(() => {
      handleGenerateCard();
    }, []);

    const handleChange = (e) => {
      const { name, value } = e.target;
    
      if (name === "description" && value.length > 100) {
        setError("Description cannot exceed 100 characters.");
        return;
      }
    
      setFormData({ ...formData, [name]: value });
    };

    const handleGenerateCard = () => {
        const newCard = {
            image: `/images/anime${Math.floor(Math.random() * 3)}.jpg`,
            task: tasks[Math.floor(Math.random() * tasks.length)],
        };
        setCurrentCard(newCard);
        setChecked(false);
        setTimeout(() => setChecked(true), 500);

        setFormData({
          title: "Default Title",
          genre: "N/A",
          description: "Please complete the creation of your challenge card",
          duration: 1,
          difficulty: 1,
          generatedBy: 'user',
        })
    };

    //user can create their own challenge card
    const handleManualCard = (e) => {
      e.preventDefault();
      const newCard = {
        image: `/images/anime${Math.floor(Math.random() * 3)}.jpg`,
        task: formData,
      };
      setCurrentCard(newCard);
      setChecked(false);
      setTimeout(() => setChecked(true), 500);
      handleClose();
    }

    return (
      <div className="min-h-screen pb-2 my-10">
        <div className="flex flex-col lg:flex-row p-4 min-h-screen rounded-lg bg-neutral-800 mx-10 my-4">
            <div className="lg:w-1/5 w-full text-white flex flex-row lg:flex-col items-center justify-between py-4">
                <button
                    onClick={handleGenerateCard}
                    className="p-8 lg:m-8 flex flex-col text-slate-50 hover:scale-110 transition-transform duration-300 items-center rounded-md"
                >
                    <img src={CardIcon} width="50px" height="40px" alt="Generate Card" />
                    <p className="text-xs">Generate Random Challenge</p>
                </button>
                <button
                    onClick={handleClickOpen}
                    className="p-8 lg:m-8 flex flex-col text-slate-50 hover:scale-110 transition-transform duration-300 items-center rounded-md"
                >
                    <img src={createIcon} width="50px" height="40px" alt="Generate Card" />
                    <p className="text-xs">Customize Your Own Challenge</p>
                </button>
            </div>

            <div className="lg:w-4/5 w-full flex items-center justify-center">
              <Slide direction="right" in={checked} mountOnEnter unmountOnExit container={document.body}>
                <div style={{ backgroundColor: 'transparent'}}>
                    <Card
                        image={currentCard.image}
                        task={currentCard.task}
                        handleGenerateCard={handleGenerateCard}
                    />
                </div>
              </Slide>
            </div>

            <Dialog open={open} onClose={handleClose} className="fixed z-50 inset-0 flex items-center justify-center overflow-y-auto" PaperProps={{
              style: {
                borderRadius: "12px",
                backgroundColor: "rgb(38 38 38)",
              },
            }}>
              <div className="relative w-full max-w-md lg:max-w-2xl max-h-[120vh] overflow-y-auto bg-neutral-800 text-gray-200 p-6 rounded-lg">
                  <h2 className="text-xl font-bold text-center mb-4">Create a New Challenge</h2>
                  <form onSubmit={handleManualCard} className="space-y-4">
                    <div>
                      <label className="block font-semibold mb-1">Title:</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter challenge title here..."
                        className="w-full px-4 py-2 bg-neutral-700 text-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Genre:</label>
                      <input
                        type="text"
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        placeholder="Enter challenge genre here..."
                        className="w-full px-4 py-2 bg-neutral-700 text-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Description (max 100 chars):</label>
                      <textarea
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter challenge description here(max 100 characters)..."
                        className="w-full px-4 py-2 bg-neutral-700 text-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Duration (minutes):</label>
                      <input
                        type="number"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        min={1}
                        max={1440}
                        step={1}
                        placeholder="Enter duration"
                        className="w-full px-4 py-2 bg-neutral-700 text-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Difficulty:</label>
                      <select
                        type="number"
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-neutral-700 text-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      >
                        <option value={null} disabled>
                          Select difficulty
                        </option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                      </select>
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <div className="flex justify-between mt-4">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        onClick={handleClose}
                        className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
              </div>
            </Dialog>

        </div>
        </div>
    );
}

export default Challenge;
