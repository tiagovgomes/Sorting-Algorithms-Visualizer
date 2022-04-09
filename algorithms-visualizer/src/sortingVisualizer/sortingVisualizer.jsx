import React from 'react';
import './sortingVisualizer.css';

const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';

const SWAMP_NUMS = 0;
const COMPARE_NUMS_PRIMARY_COLOR = 1;
const COMPARE_NUMS_SECONDARY_COLOR = 2;

const NUMBER_OF_ARRAY_BARS = 95;

const ANIMATION_SPEED_MS = 5;



export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
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

            animations.push([left + indexOfSubArrayOne, mid + 1 + indexOfSubArrayTwo]);
            animations.push([left + indexOfSubArrayOne, mid + 1 + indexOfSubArrayTwo]);

            if (leftArray[indexOfSubArrayOne] <= rightArray[indexOfSubArrayTwo]) {

                animations.push([indexOfMergedArray, leftArray[indexOfSubArrayOne]]);

                array[indexOfMergedArray] = leftArray[indexOfSubArrayOne];
                indexOfSubArrayOne++;
            }
            else {
                animations.push([indexOfMergedArray, rightArray[indexOfSubArrayTwo]]);
                array[indexOfMergedArray] = rightArray[indexOfSubArrayTwo];
                indexOfSubArrayTwo++;
            }
            indexOfMergedArray++;
        }
        // Copy the remaining elements of
        // left[], if there are any
        while (indexOfSubArrayOne < leftArray.length) {

            animations.push([left + indexOfSubArrayOne, left + indexOfSubArrayOne]);
            animations.push([left + indexOfSubArrayOne, left + indexOfSubArrayOne]);
            animations.push([indexOfMergedArray, leftArray[indexOfSubArrayOne]]);

            array[indexOfMergedArray] = leftArray[indexOfSubArrayOne];
            indexOfSubArrayOne++;
            indexOfMergedArray++;
        }
        // Copy the remaining elements of
        // right[], if there are any
        while (indexOfSubArrayTwo < rightArray.length) {

            animations.push([mid + 1 + indexOfSubArrayTwo, mid + 1 + indexOfSubArrayTwo]);
            animations.push([mid + 1 + indexOfSubArrayTwo, mid + 1 + indexOfSubArrayTwo]);
            animations.push([indexOfMergedArray, rightArray[indexOfSubArrayTwo]]);


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

        animations.push([a,b]);
        animations.push([a,b]);
        animations.push([a,b]);

        let h = array[a];
        array[a] = array[b];
        array[b] = h;
    }

    partition(array, low, high, animations) {
        let pivot = array[high];
        let i = low - 1;

        for (let j = low; j <= high - 1; j++) {
            if (array[j] < pivot) {
                i++;
                this.swap(array, i, j, animations);
            }
        }
        this.swap(array, i + 1, high, animations);
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
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    mergeSortAlgorithm() {
        let array = this.state.array.slice();
        let animations = [];
        this.mergeSort(array, 0, array.length - 1, animations);
        this.animateActions(animations, array);
    }

    quickSortAlgorithm(){
        let array = this.state.array.slice();
        let animations = [];
        this.quickSort(array, 0, array.length -1, animations);
        
        this.setState({ array });
    }

    testSortingAlgorithms() {
        console.log('hehe');
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(5, 730));
        }
        this.setState({ array });
    }


    render() {
        const { array } = this.state;

        return (
            <div className="array-container">
                {array.map((value, idx) => (
                    <div
                        className="array-bar"
                        key={idx}
                        style={{
                            backgroundColor: PRIMARY_COLOR,
                            height: `${value}px`,
                        }}></div>
                ))}
                <button onClick={() => this.resetArray()}>Generate New Array</button>
                <button onClick={() => this.mergeSortAlgorithm()}>Merge Sort</button>
                <button onClick={() => this.quickSortAlgorithm()}>Quick Sort</button>
                <button onClick={() => this.heapSort()}>Heap Sort</button>
                <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                <button onClick={() => this.testSortingAlgorithms()}>
                    Test Sorting Algorithms (BROKEN)
                </button>

            </div>
        );
    }
}

function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}