import { useState } from 'react';
import { data, data2 } from './data';
import UpdateTableShow from "./showTable";
import ShowProgressTracker from "./progressTracker";
import "./mainpage.css";

function MainPageApp() {
    const [showUpdateWorkout, setShowUpdateWorkout] = useState(false);
    const [selectedDate, setselectedDate] = useState("");
    const [showDateField, setShowDateField] = useState(false);
    const [newDate, setNewDate] = useState("");
    const [progressTracker, setProgressTracker] = useState(false);

    const handleUpdateWorkout = (date) => {
        setselectedDate(date);
        setShowUpdateWorkout(true);
    };

    const popTracker = (e) => {
        e.preventDefault()
        setProgressTracker(true);
    };

    const popDateField = () =>{
        setShowDateField(true);
    };

    const addDate = (e) => {
        e.preventDefault();
        if (newDate){
            data2.dates.push(newDate);
            setNewDate("")
        }
        console.log(data2)
    };

    return (
        <div className='main-container'>
            <div className='content'>
                <div className='previous-workout-container'>
                    <h2>Previous Workouts</h2>
                    <div className='scrollableBar'>
                        <table className='ScrollBarTable'>
                            <thead>
                                <tr>
                                    <th colSpan={2}>Dates (YYYY-MM-DD)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data2 && data2.dates.length > 0 ? (
                                    data2.dates.map((date, rowIndex) => (
                                        <tr key={rowIndex}
                                        className={`table-row ${selectedDate === date ? 'selected' : ''}`}
                                        onClick={() => handleUpdateWorkout(date)}
                                        >
                                            <td>{date}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="100%">No workout data available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className='add-date-container'>
                        <button onClick={popDateField}>Add Date</button>
                        <br></br>

                        {showDateField && (
                        <form onClick={addDate} className='card'>
                            <input
                                type="date"
                                value={newDate}
                                onChange={(e) => setNewDate(e.target.value)}
                                required
                            >
                            </input>
                            
                            <button>Save</button>
                        </form>
                        )}
                    </div>
                    <button onClick={popTracker}>See Progess</button>                    
                </div>

                {showUpdateWorkout && (
                    <div className='update-workout-container'>
                        <UpdateTableShow date={selectedDate}  />
                    </div>
                )}

                {progressTracker && (
                    <div className='progress-container'>
                        <ShowProgressTracker data={data2.dates} />
                    </div>
                )}

            </div>
        </div>
    );
}

export default MainPageApp
