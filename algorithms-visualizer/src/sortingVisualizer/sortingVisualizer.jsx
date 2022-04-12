import React from 'react';
import './sortingVisualizer.scss';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

//sorting algorithms learned from https://www.geeksforgeeks.org/

const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';

const SWAMP_NUMS = 0;
const COMPARE_NUMS_PRIMARY_COLOR = 1;
const COMPARE_NUMS_SECONDARY_COLOR = 2;


const ANIMATION_SPEED_MS = 5;



export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
            numberOfBars: 95
        };
    }

    merge(array, left, mid, right, animations) {

        // Create temp arrays
        let leftArray = array.slice(left, mid + 1);
        let rightArray = array.slice(mid + 1, right + 1);

        let indexOfSubArrayOne = 0; // Initial index of first sub-array
        let indexOfSubArrayTwo = 0; // Initial index of second sub-array
        let indexOfMergedArray = left; // Initial index of merged array

        // Merge the temp arrays back into array[left..right]
        while (indexOfSubArrayOne < leftArray.length && indexOfSubArrayTwo < rightArray.length) {

            animations.push({
                index: left + indexOfSubArrayOne,
                action: COMPARE_NUMS_SECONDARY_COLOR
            });
            animations.push({
                index: mid + 1 + indexOfSubArrayTwo,
                action: COMPARE_NUMS_SECONDARY_COLOR
            });
            animations.push({
                index: left + indexOfSubArrayOne,
                action: COMPARE_NUMS_PRIMARY_COLOR
            });
            animations.push({
                index: mid + 1 + indexOfSubArrayTwo,
                action: COMPARE_NUMS_PRIMARY_COLOR
            });

            if (leftArray[indexOfSubArrayOne] <= rightArray[indexOfSubArrayTwo]) {

                animations.push({
                    index: indexOfMergedArray,
                    value: leftArray[indexOfSubArrayOne],
                    action: SWAMP_NUMS
                });

                array[indexOfMergedArray] = leftArray[indexOfSubArrayOne];
                indexOfSubArrayOne++;
            }
            else {
                animations.push({
                    index: indexOfMergedArray,
                    value: rightArray[indexOfSubArrayTwo],
                    action: SWAMP_NUMS
                });
                array[indexOfMergedArray] = rightArray[indexOfSubArrayTwo];
                indexOfSubArrayTwo++;
            }
            indexOfMergedArray++;
        }
        // Copy the remaining elements of
        // left[], if there are any
        while (indexOfSubArrayOne < leftArray.length) {

            animations.push({
                index: left + indexOfSubArrayOne,
                action: COMPARE_NUMS_SECONDARY_COLOR
            });

            animations.push({
                index: left + indexOfSubArrayOne,
                action: COMPARE_NUMS_PRIMARY_COLOR
            });

            animations.push({
                index: indexOfMergedArray,
                value: leftArray[indexOfSubArrayOne],
                action: SWAMP_NUMS
            });

            array[indexOfMergedArray] = leftArray[indexOfSubArrayOne];
            indexOfSubArrayOne++;
            indexOfMergedArray++;
        }
        // Copy the remaining elements of
        // right[], if there are any
        while (indexOfSubArrayTwo < rightArray.length) {

            animations.push({
                index: mid + 1 + indexOfSubArrayTwo,
                action: COMPARE_NUMS_SECONDARY_COLOR
            });

            animations.push({
                index: mid + 1 + indexOfSubArrayTwo,
                action: COMPARE_NUMS_PRIMARY_COLOR
            });

            animations.push({
                index: indexOfMergedArray,
                value: rightArray[indexOfSubArrayTwo],
                action: SWAMP_NUMS
            });


            array[indexOfMergedArray] = rightArray[indexOfSubArrayTwo];
            indexOfSubArrayTwo++;
            indexOfMergedArray++;
        }
    }

    mergeSort(array, begin, end, animations) {
        if (begin >= end)
            return; // Returns recursively

        const mid = Math.floor((begin + end) / 2);
        this.mergeSort(array, begin, mid, animations);
        this.mergeSort(array, mid + 1, end, animations);
        this.merge(array, begin, mid, end, animations);
    }

    swap(array, a, b, animations) {

        animations.push({
            action: SWAMP_NUMS,
            index: a,
            value: array[b]
        });

        animations.push({
            action: SWAMP_NUMS,
            index: b,
            value: array[a]
        })

        let temp = array[a];
        array[a] = array[b];
        array[b] = temp;
    }

    partition(array, low, high, animations) {
        let pivot = array[high];
        let i = low - 1;
        animations.push({
            action: COMPARE_NUMS_SECONDARY_COLOR,
            index: high
        });
        for (let j = low; j <= high - 1; j++) {
            animations.push({
                action: COMPARE_NUMS_SECONDARY_COLOR,
                index: j
            });
            if (array[j] < pivot) {
                i++;
                this.swap(array, i, j, animations);
            }
            animations.push({
                action: COMPARE_NUMS_PRIMARY_COLOR,
                index: j
            });
        }
        this.swap(array, i + 1, high, animations);

        animations.push({
            action: COMPARE_NUMS_PRIMARY_COLOR,
            index: high
        });
        return (i + 1);
    }

    quickSort(array, low, high, animations) {
        if (low < high) {
            let pi = this.partition(array, low, high, animations);

            this.quickSort(array, low, pi - 1, animations);
            this.quickSort(array, pi + 1, high, animations);
        }
    }

    animateActions(animations) {
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            if (animations[i].action !== SWAMP_NUMS) {
                const barOneStyle = arrayBars[animations[i].index].style;
                const color = animations[i].action === COMPARE_NUMS_SECONDARY_COLOR ? SECONDARY_COLOR : PRIMARY_COLOR;
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

    bubbleSort(array, length, animations) {
        for (let i = 0; i < length - 1; i++) {
            for (let j = 0; j < length - i - 1; j++) {
                animations.push({
                    action: COMPARE_NUMS_SECONDARY_COLOR,
                    index: j
                });
                animations.push({
                    action: COMPARE_NUMS_SECONDARY_COLOR,
                    index: j + 1
                });
                if (array[j] > array[j + 1]) {
                    this.swap(array, j, j + 1, animations);

                }
                animations.push({
                    action: COMPARE_NUMS_PRIMARY_COLOR,
                    index: j
                });
                animations.push({
                    action: COMPARE_NUMS_PRIMARY_COLOR,
                    index: j + 1
                });
            }

        }
    }

    bubbleSortAlgorithm() {
        let array = this.state.array.slice();
        let animations = [];
        this.bubbleSort(array, array.length, animations);
        this.animateActions(animations);
    }

    mergeSortAlgorithm() {
        let array = this.state.array.slice();
        let animations = [];
        this.mergeSort(array, 0, array.length - 1, animations);
        this.animateActions(animations);
    }

    quickSortAlgorithm() {
        let array = this.state.array.slice();
        let animations = [];
        this.quickSort(array, 0, array.length - 1, animations);
        this.animateActions(animations);

    }

    testSortingAlgorithms() {
        console.log('hehe');
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
        console.log(this.state);
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
                    <ButtonGroup className="button-group-container"  orientation="vertical" variant="contained" aria-label="outlined primary button group">
                        <Button onClick={() => this.resetArray()}>Generate New Array</Button>
                        <Button onClick={() => this.mergeSortAlgorithm()}>Merge Sort</Button>
                        <Button onClick={() => this.quickSortAlgorithm()}>Quick Sort</Button>
                        <Button onClick={() => this.heapSort()}>Heap Sort</Button>
                        <Button onClick={() => this.bubbleSortAlgorithm()}>Bubble Sort</Button>
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