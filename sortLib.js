function generateArray(length = 100, sparse = false) {
  const arr = new Array(length).fill(0).map((_, i) => Math.floor(Math.random() * 1000));
  if (sparse) {
    for (let i = 0; i < arr.length; i += 10) {
      arr[i] = undefined;
    }
  }
  return arr;
}

function checkSparse(arr) {
  const undefinedIndexes = [];
  arr.forEach((el, idx) => {
    if (el === undefined) undefinedIndexes.push(idx);
  });
  if (undefinedIndexes.length > 0) {
    console.warn(`Масив містить undefined-елементи на позиціях: ${undefinedIndexes.join(', ')}`);
    return `Масив містить undefined-елементи на позиціях: ${undefinedIndexes.join(', ')}`;
  }
  return null;
}

function exchangeSort(arr, asc = true) {
  let compare = 0, swaps = 0;
  const len = arr.length;
  const res = arr.slice();

  for (let i = 0; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      compare++;
      if ((asc && res[i] > res[j]) || (!asc && res[i] < res[j])) {
        [res[i], res[j]] = [res[j], res[i]];
        swaps++;
      }
    }
  }

  return { sorted: res, compare, swaps };
}

function selectionSort(arr, asc = true) {
  let compare = 0, swaps = 0;
  const len = arr.length;
  const res = arr.slice();

  for (let i = 0; i < len - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < len; j++) {
      compare++;
      if ((asc && res[j] < res[minIdx]) || (!asc && res[j] > res[minIdx])) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [res[i], res[minIdx]] = [res[minIdx], res[i]];
      swaps++;
    }
  }

  return { sorted: res, compare, swaps };
}

function insertionSort(arr, asc = true) {
  let compare = 0, swaps = 0;
  const res = arr.slice();

  for (let i = 1; i < res.length; i++) {
    let key = res[i];
    let j = i - 1;
    compare++;
    while (j >= 0 && ((asc && res[j] > key) || (!asc && res[j] < key))) {
      res[j + 1] = res[j];
      j--;
      swaps++;
      compare++;
    }
    res[j + 1] = key;
    swaps++;
  }

  return { sorted: res, compare, swaps };
}

function shellSort(arr, asc = true) {
  let compare = 0, swaps = 0;
  const res = arr.slice();
  let gap = Math.floor(res.length / 2);

  while (gap > 0) {
    for (let i = gap; i < res.length; i++) {
      let temp = res[i];
      let j = i;

      compare++;
      while (j >= gap && ((asc && res[j - gap] > temp) || (!asc && res[j - gap] < temp))) {
        res[j] = res[j - gap];
        j -= gap;
        swaps++;
        compare++;
      }

      res[j] = temp;
      swaps++;
    }

    gap = Math.floor(gap / 2);
  }

  return { sorted: res, compare, swaps };
}

function quickSort(arr, asc = true) {
  let compare = 0, swaps = 0;

  const sort = (array) => {
    if (array.length <= 1) return array;

    const pivot = array[0];
    const left = [];
    const right = [];

    for (let i = 1; i < array.length; i++) {
      compare++;
      if ((asc && array[i] < pivot) || (!asc && array[i] > pivot)) {
        left.push(array[i]);
      } else {
        right.push(array[i]);
      }
    }

    const sortedLeft = sort(left);
    const sortedRight = sort(right);

    return [...sortedLeft, pivot, ...sortedRight];
  };

  const sorted = sort(arr.slice());
  return { sorted, compare, swaps };
}

function runSorts(sparse = false) {
  const original = generateArray(100, sparse);
  const checkMessage = checkSparse(original);
  const results = [];

  const methods = [
    { name: "Exchange Sort", func: exchangeSort },
    { name: "Selection Sort", func: selectionSort },
    { name: "Insertion Sort", func: insertionSort },
    { name: "Shell Sort", func: shellSort },
    { name: "Quick Sort", func: quickSort },
  ];

  methods.forEach(({ name, func }) => {
    const { compare, swaps } = func(original, true);
    results.push(`${name} - порівнянь: ${compare}, обмінів: ${swaps}`);
  });

  const output = checkMessage ? [checkMessage, ...results] : results;
  document.getElementById("results").innerHTML = `<pre>${output.join('\n')}</pre>`;
}
