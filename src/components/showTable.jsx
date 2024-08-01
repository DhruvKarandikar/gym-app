import { useState } from 'react';
import { data, data2, data3 } from './data';
import Select from 'react-select';
import "./showTable.css";


const exerciseOptions = data3.exerciseName.sort().map(exercise => ({
    value: exercise,
    label: exercise
}));

const customStyles = {
    control: (provided) => ({
        ...provided,
        backgroundColor: 'black',
        color: 'white',
        outerWidth: 100,
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'white'
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: 'black',
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#333' : 'black',
        color: 'white',
        '&:hover': {
            backgroundColor: '#555',
        },
    }),
    input: (provided) => ({
        ...provided,
        color: 'white',
    }),
    placeholder: (provided) => ({
        ...provided,
        color: 'white',
    }),
};


function UpdateTableShow({date}) {
    const [formData, setFormData] = useState({
        date: date,
        exercises: [],
    });

    const addExercise = () => {
        setFormData(prevState => ({
            ...prevState,
            exercises: [
                ...prevState.exercises,
                {
                    setNo: formData.exercises.length + 1,
                    exercise: "", 
                    weight: "",
                    reps: ""
                },
            ]
        }));
    };

    const handleInputChange = (index, field, value) => {
        const updatedExercises = [...formData.exercises];
        updatedExercises[index][field] = value;
        setFormData({ ...formData, exercises: updatedExercises });
    };

    const saveData = (e) => {
        e.preventDefault();
        setFormData({
            date: date,
            exercises: [],
        });
        console.log(formData);
        //if (onClose) onClose();
    };

    const handleSelectChange = (index, selectedOption) => {
        handleInputChange(index, 'exercise', selectedOption ? selectedOption.value : "");
    };
    
    return(
        <div className='main-body-update-workout'>
            <form onSubmit={saveData}>
                <div className='update-workout-container'>
                    <h2>Update Workout</h2>
                    <h3>Date: {date}</h3>
                    <div className='UpdateScrollableBar'>
                        <table className='update-workout-table' id='UpdateScrollBarTable'>
                            <thead>
                                <tr>
                                    <th>SET</th>
                                    <th>EXERCISE</th>
                                    <th>WEIGHT (KG)</th>
                                    <th>REPS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formData.exercises.map((exercise, index) => (
                                    <tr key={index}>
                                        <td>{exercise.setNo}</td>
                                        <td>
                                            <Select
                                                value={exerciseOptions.find(option => option.value === exercise.exercise)}
                                                onChange={(selectedOption) => handleSelectChange(index, selectedOption)}
                                                options={exerciseOptions}
                                                styles={customStyles}
                                                isClearable
                                                required
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                value={exercise.weight}
                                                onChange={(e) => handleInputChange(index, 'weight', e.target.value)}
                                                placeholder="Weight"
                                                required
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                value={exercise.reps}
                                                onChange={(e) => handleInputChange(index, 'reps', e.target.value)}
                                                placeholder="Reps"
                                                required
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button type="button" onClick={addExercise}>Add</button>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    );
}

export default UpdateTableShow
