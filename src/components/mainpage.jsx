import { useState, useRef  } from 'react';
import { data, data2 } from './data';
import moment from 'moment-timezone';
import UpdateTableShow from "./showTable";
import ShowProgressTracker from "./progressTracker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./mainpage.css";
import Modal from 'react-modal';


function MainPageApp() {
    const [showUpdateWorkout, setShowUpdateWorkout] = useState(false);
    const [selectedDate, setselectedDate] = useState("");
    const [newDate, setNewDate] = useState(new Date());
    const datePickerRef = useRef(null);
    const [progressTracker, setProgressTracker] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleUpdateWorkout = (date) => {
        setselectedDate(date);
        setShowUpdateWorkout(true);
    };

    const popTracker = (e) => {
        e.preventDefault()
        setProgressTracker(true);
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const addDate = (e) => {
        e.preventDefault();
        if (newDate){
            const formattedDate = moment(newDate).tz('Asia/Kolkata').format('YYYY-MM-DD');
            data2.dates.push(formattedDate);
            setNewDate(new Date());
            closeModal();
        }
        console.log(data2)
    };

    return (
        <div className='main-body'>

            <div className='main-button'>
                <button className='click-button' onClick={openModal}>ADD WORKOUT PLAN</button>
                <br></br>
                <br></br>
                <button className='click-button' onClick={popTracker}>PROGRESS</button> 
            </div>

            <div className='content-wrapper'>
                <div className='previous-workouts'>
                    <h2>Your Previous Workouts</h2>
                
                    <div className='table-container'>
                        <table className='workout-prev-table'>
                            <thead>
                                <tr>
                                    <th colSpan={2}>DATE</th>
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
                </div>
            </div>
            

            <div className='right-panel'>

                {showUpdateWorkout && (
                    <div className='update-container'>
                        <UpdateTableShow date={selectedDate}  />
                    </div>
                )}

                {progressTracker && (
                    <div className='progress-container'>
                        <ShowProgressTracker data={data2.dates} />
                    </div>
                )}
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Add Workout Plan"
                className="modal"
                overlayClassName="overlay"
                >
                <div className="modal-content">
                    <h2>Workout Plan New</h2>
                    <form onSubmit={addDate}>
                        <div className="date-picker-container">
                            <label>
                                Select Date
                                <DatePicker
                                    selected={newDate}
                                    onChange={(date) => setNewDate(date)}
                                    dateFormat="yyyy-MM-dd"
                                    ref={datePickerRef}
                                    required
                                />
                                <i className="fas fa-calendar-alt calendar-icon"
                                    onClick={() => datePickerRef.current.focus()}
                                ></i>
                            </label>
                        </div>
                        <div className="modal-buttons">
                            <button type='submit' className="save-button">Save</button>
                            <button type='button' onClick={closeModal} className="cancel-button">Cancel</button>
                        </div>
                    </form>
                </div>
            </Modal>

        </div>
    );
}

export default MainPageApp
