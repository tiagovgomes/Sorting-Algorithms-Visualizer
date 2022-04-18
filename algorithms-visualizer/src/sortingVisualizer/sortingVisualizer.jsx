import React from 'react';
import './sortingVisualizer.scss';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import * as algos from '../sortingAlgorithms/sortingAlgorithms';


const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';

const ANIMATION_SPEED_MS = 4;



export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
            numberOfBars: 95
        };
    }




    animateActions(animations) {
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


    sortAlgorithm(algorithm) {
        let array = this.state.array.slice();
        let animations = [];
        switch (algorithm) {
            case 'Quick':
                algos.quickSort(array, 0, array.length - 1, animations);
                break;
            case 'Heap':
                algos.heapSort(array, animations);
                break;
            case 'Merge':
                algos.mergeSort(array, 0, array.length - 1, animations);
                break;
            case 'Bubble':
                algos.bubbleSort(array, array.length, animations);
                break;
        }
        this.animateActions(animations);
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < this.state.numberOfBars; i++) {
            array.push(randomIntFromInterval(5, 500));
        }
        this.setState({ array });
    }

    handleChange = (event, value) => {
        this.setState({ numberOfBars: value });
        this.resetArray();
    };


    render() {
        const { array } = this.state;

        return (
            <div className="visualizer-container">
                <div className="button-and-visualizer-container">
                    <ButtonGroup className="button-group-container" orientation="vertical" variant="contained" aria-label="outlined primary button group">
                        <Button onClick={() => this.resetArray()}>Generate New Array</Button>
                        <Button onClick={() => this.sortAlgorithm('Merge')}>Merge Sort</Button>
                        <Button onClick={() => this.sortAlgorithm('Quick')}>Quick Sort</Button>
                        <Button onClick={() => this.sortAlgorithm('Heap')}>Heap Sort</Button>
                        <Button onClick={() => this.sortAlgorithm('Bubble')}>Bubble Sort</Button>
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
                    <Slider onChange={this.handleChange} aria-labelledby="input-slider" valueLabelDisplay="on" defaultValue={95} min={20} max={200} aria-label="Default" />
                </div>
            </div>

        );
    }
}

function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}