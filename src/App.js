import './App.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useCallback } from 'react';

function App() {

  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const details = {
    level: selectedOptions[1],
    category: selectedOptions[0]
  }

  const handleClick = () => {
    navigate('/quiz', { state: details });
  }



  const handleOption = useCallback((cardTitle, cardClass) => {
    if (cardClass === 'genre') {
      setSelectedOptions((prevOptions) => {
        const updatedOptions = prevOptions.filter((option) => option !== 'History' && option !== 'Sports' && option !== 'Technology' && option !== 'General knowledge' && option !== 'Science');
        return [...updatedOptions, cardTitle];
      });
    } else if (cardClass === 'level') {
      setSelectedOptions((prevOptions) => {
        const updatedOptions = prevOptions.filter((option) => option !== 'easy' && option !== 'medium' && option !== 'hard');
        return [...updatedOptions, cardTitle];
      });
    }
  }, []);


  return (
    <div className="App">
      <div className="background d-flex align-items-center justify-content-center">
        <div className='categories p-3'>
          
          <h1 className='header mb-3 d-none d-sm-block'>Welcome to Kwizzy</h1>
          
          <h2>Select a category</h2>
          <div className="row m-3">
            <div className="col-sm-6 mb-3 mb-sm-0">
              <div className={`genre card ${selectedOptions.includes('History') ? `selected` : ''}`} onClick={() => handleOption('History', 'genre')}>
                <div className="card-body">
                  <h5 className="card-title">History</h5>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className={`genre card ${selectedOptions.includes('Sports') ? `selected` : ''}`} onClick={() => handleOption('Sports', 'genre')}>
                <div className="card-body">
                  <h5 className="card-title">Sports</h5>
                </div>
              </div>
            </div>
          </div>

          <div className="row m-3">
            <div className="col-sm-6 mb-3 mb-sm-0">
              <div className={`genre card ${selectedOptions.includes('Science') ? `selected` : ''}`} onClick={() => handleOption('Science', 'genre')}>
                <div className="card-body">
                  <h5 className="card-title">Science</h5>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className={`genre card ${selectedOptions.includes('Technology') ? `selected` : ''}`} onClick={() => handleOption('Technology', 'genre')}>
                <div className="card-body">
                  <h5 className="card-title">Technology</h5>
                </div>
              </div>
            </div>
          </div>

          <div className="row m-3">
            <div className="col-sm-6 mb-3 mb-sm-0">
              <div className={`genre card ${selectedOptions.includes('General knowledge') ? `selected` : ''}`} onClick={() => handleOption('General knowledge', 'genre')}>
                <div className="card-body">
                  <h5 className="card-title">General knowledge</h5>
                </div>
              </div>
            </div>
          </div>
          <h2>Select Level</h2>
          <div className="row m-3">
            <div className="col-sm-4 mb-3 mb-sm-0">
              <div className={`level card ${selectedOptions.includes('easy') ? `selected` : ''}`} onClick={() => handleOption('easy', 'level')}>
                <div className="card-body">
                  <h5 className="card-title">easy</h5>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className={`level card ${selectedOptions.includes('medium') ? `selected` : ''}`} onClick={() => handleOption('medium', 'level')}>
                <div className="card-body">
                  <h5 className="card-title">medium</h5>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className={`level card ${selectedOptions.includes('hard') ? `selected` : ''}`} onClick={() => handleOption('hard', 'level')}>
                <div className="card-body">
                  <h5 className="card-title">hard</h5>
                </div>
              </div>
            </div>
          </div>
          <button onClick={handleClick}>Start Quiz</button>
        </div>
      </div>
    </div>
  );
}

export default App;
