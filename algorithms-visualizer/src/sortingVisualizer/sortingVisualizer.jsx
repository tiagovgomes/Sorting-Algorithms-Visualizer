import React, { useState, useEffect } from 'react';
import './sortingVisualizer.scss';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import * as algos from '../sortingAlgorithms/sortingAlgorithms';


const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';

const ANIMATION_SPEED_MS = 4;



export default function SortingVisualizer() {
    const [array, setArray] = useState([]);
    const [numberOfBars, setNumberOfBars] = useState(95);


    useEffect(() => {
        resetArray();
    }, []);


    function animateActions(animations) {
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            if (animations[i].action !== algos.SWAMP_NUMS) {
                const barOneStyle = arrayBars[animations[i].index].style;
                const color = animations[i].action === algos.COMPARE_NUMS_SECONDARY_COLOR ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const barOneStyle = arrayBars[animations[i].index].style;
                    barOneStyle.height = `${animations[i].value}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }


    function sortAlgorithm(algorithm) {
        let arrayCopy = array.slice();
        let animations = [];
        switch (algorithm) {
            case 'Quick':
                algos.quickSort(arrayCopy, 0, arrayCopy.length - 1, animations);
                break;
            case 'Heap':
                algos.heapSort(arrayCopy, animations);
                break;
            case 'Merge':
                algos.mergeSort(arrayCopy, 0, arrayCopy.length - 1, animations);
                break;
            case 'Bubble':
                algos.bubbleSort(arrayCopy, arrayCopy.length, animations);
                break;
            default:
                break;
        }
        animateActions(animations);
    }



    function resetArray() {
        const array = [];
        for (let i = 0; i < numberOfBars; i++) {
            array.push(randomIntFromInterval(5, 500));
        }
        setArray(array);
    }

    function handleChange(event, value) {
        setNumberOfBars(value);
        resetArray();
    };



    return (
        <div className="visualizer-container">
            <div className="button-and-visualizer-container">
                <ButtonGroup className="button-group-container" orientation="vertical" variant="contained" aria-label="outlined primary button group">
                    <Button onClick={() => resetArray()}>Generate New Array</Button>
                    <Button onClick={() => sortAlgorithm('Merge')}>Merge Sort</Button>
                    <Button onClick={() => sortAlgorithm('Quick')}>Quick Sort</Button>
                    <Button onClick={() => sortAlgorithm('Heap')}>Heap Sort</Button>
                    <Button onClick={() => sortAlgorithm('Bubble')}>Bubble Sort</Button>
                </ButtonGroup>
                <div className="array-container">
                    {array.map((value, idx) => (
                        <div
                            className="array-bar"
                            key={idx}
                            style={{
                                backgroundColor: PRIMARY_COLOR,
                                height: `${value}px`,
                            }}>
                        </div>
                    ))}
                </div>
            </div>
            <div className="slider-container">
                <Typography id="input-slider" gutterBottom>
                    Number of bars
                </Typography>
                <Slider onChange={handleChange} aria-labelledby="input-slider" valueLabelDisplay="on" defaultValue={95} min={20} max={200} aria-label="Default" />
            </div>
        </div>

    );

}

function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}