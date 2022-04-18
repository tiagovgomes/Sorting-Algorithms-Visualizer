//sorting algorithms learned from https://www.geeksforgeeks.org/

export const SWAMP_NUMS = 0;
export const COMPARE_NUMS_PRIMARY_COLOR = 1;
export const COMPARE_NUMS_SECONDARY_COLOR = 2;

export function bubbleSort(array, length, animations) {
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
        swap(array, j, j + 1, animations);

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

export function heapSort(array, animations) {
  let n = array.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
    heapify(array, n, i, animations);

  for (let i = n - 1; i > 0; i--) {
    swap(array, i, 0, animations);
    heapify(array, i, 0, animations);
  }
}

export function quickSort(array, low, high, animations) {
  if (low < high) {
    let pi = partition(array, low, high, animations);

    quickSort(array, low, pi - 1, animations);
    quickSort(array, pi + 1, high, animations);
  }
}

export function mergeSort(array, begin, end, animations) {
  if (begin >= end)
    return; // Returns recursively

  const mid = Math.floor((begin + end) / 2);
  mergeSort(array, begin, mid, animations);
  mergeSort(array, mid + 1, end, animations);
  merge(array, begin, mid, end, animations);
}

function partition(array, low, high, animations) {
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
      swap(array, i, j, animations);
    }
    animations.push({
      action: COMPARE_NUMS_PRIMARY_COLOR,
      index: j
    });
  }
  swap(array, i + 1, high, animations);

  animations.push({
    action: COMPARE_NUMS_PRIMARY_COLOR,
    index: high
  });
  return (i + 1);
}

function heapify(array, n, i, animations) {
  let largest = i;
  let l = 2 * i + 1;
  let r = 2 * i + 2;

  animations.push({
    action: COMPARE_NUMS_SECONDARY_COLOR,
    index: largest
  });

  if (l < n && array[l] > array[largest])
    largest = l;

  if (l < array.length) {
    animations.push({
      action: COMPARE_NUMS_SECONDARY_COLOR,
      index: l
    });
    animations.push({
      action: COMPARE_NUMS_PRIMARY_COLOR,
      index: l
    });
  }

  if (r < n && array[r] > array[largest])
    largest = r;

  if (r < array.length) {
    animations.push({
      action: COMPARE_NUMS_SECONDARY_COLOR,
      index: r
    });
    animations.push({
      action: COMPARE_NUMS_PRIMARY_COLOR,
      index: r
    });
  }

  animations.push({
    action: COMPARE_NUMS_PRIMARY_COLOR,
    index: largest
  });

  if (largest !== i) {
    swap(array, i, largest, animations);
    heapify(array, n, largest, animations);
  }
}


function merge(array, left, mid, right, animations) {

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




function swap(array, a, b, animations) {
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