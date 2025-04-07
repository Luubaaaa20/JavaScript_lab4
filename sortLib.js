var SortLib = {
  checkSparse: function(arr) {
    for (var i = 0; i < arr.length; i++) {
      if (!(i in arr) || typeof arr[i] === "undefined") {
        console.warn("Масив містить undefined-елементи на позиції " + i);
        return true;
      }
    }
    return false;
  },
  exchangeSort: function(arr, order) {
    var n = arr.length, comparisons = 0, swaps = 0;
    SortLib.checkSparse(arr);
    var a = arr.slice();
    for (var i = 0; i < n - 1; i++) {
      for (var j = 0; j < n - i - 1; j++) {
        comparisons++;
        if ((order === "asc") ? a[j] > a[j+1] : a[j] < a[j+1]) {
          [a[j], a[j+1]] = [a[j+1], a[j]];
          swaps++;
        }
      }
    }
    console.log("Exchange Sort - порівнянь: " + comparisons + ", обмінів: " + swaps);
    return {sorted: a, stats: "Exchange Sort - порівнянь: " + comparisons + ", обмінів: " + swaps};
  },
  selectionSort: function(arr, order) {
    var n = arr.length, comparisons = 0, swaps = 0;
    SortLib.checkSparse(arr);
    var a = arr.slice();
    for (var i = 0; i < n - 1; i++) {
      var selected = i;
      for (var j = i + 1; j < n; j++) {
        comparisons++;
        if ((order === "asc") ? a[j] < a[selected] : a[j] > a[selected]) {
          selected = j;
        }
      }
      if (selected !== i) {
        [a[i], a[selected]] = [a[selected], a[i]];
        swaps++;
      }
    }
    console.log("Selection Sort - порівнянь: " + comparisons + ", обмінів: " + swaps);
    return {sorted: a, stats: "Selection Sort - порівнянь: " + comparisons + ", обмінів: " + swaps};
  },
  insertionSort: function(arr, order) {
    var comparisons = 0, moves = 0;
    SortLib.checkSparse(arr);
    var a = arr.slice();
    for (var i = 1; i < a.length; i++) {
      var key = a[i], j = i - 1;
      while (j >= 0) {
        comparisons++;
        if (!((order === "asc") ? a[j] > key : a[j] < key)) break;
        a[j+1] = a[j];
        moves++;
        j--;
      }
      a[j+1] = key;
      moves++;
    }
    console.log("Insertion Sort - порівнянь: " + comparisons + ", переміщень: " + moves);
    return {sorted: a, stats: "Insertion Sort - порівнянь: " + comparisons + ", переміщень: " + moves};
  },
  shellSort: function(arr, order) {
    var comparisons = 0, moves = 0;
    SortLib.checkSparse(arr);
    var a = arr.slice(), n = a.length, gap = Math.floor(n/2);
    while (gap > 0) {
      for (var i = gap; i < n; i++) {
        var temp = a[i], j = i;
        while (j >= gap) {
          comparisons++;
          if (!((order === "asc") ? a[j-gap] > temp : a[j-gap] < temp)) break;
          a[j] = a[j-gap];
          moves++;
          j -= gap;
        }
        a[j] = temp;
        moves++;
      }
      gap = Math.floor(gap/2);
    }
    console.log("Shell Sort - порівнянь: " + comparisons + ", переміщень: " + moves);
    return {sorted: a, stats: "Shell Sort - порівнянь: " + comparisons + ", переміщень: " + moves};
  },
  quickSort: function(arr, order) {
    SortLib.checkSparse(arr);
    var comparisons = 0, moves = 0;
    function partition(a, low, high) {
      var pivot = a[high], i = low - 1;
      for (var j = low; j < high; j++) {
        comparisons++;
        if ((order === "asc") ? a[j] < pivot : a[j] > pivot) {
          i++;
          [a[i], a[j]] = [a[j], a[i]];
          moves++;
        }
      }
      [a[i+1], a[high]] = [a[high], a[i+1]];
      moves++;
      return i+1;
    }
    function quickSortRec(a, low, high) {
      if (low < high) {
        var pi = partition(a, low, high);
        quickSortRec(a, low, pi-1);
        quickSortRec(a, pi+1, high);
      }
    }
    var a = arr.slice();
    quickSortRec(a, 0, a.length - 1);
    console.log("Quick Sort - порівнянь: " + comparisons + ", переміщень: " + moves);
    return {sorted: a, stats: "Quick Sort - порівнянь: " + comparisons + ", переміщень: " + moves};
  }
};

function createResultBlock(title, before, after, stats) {
  var block = document.createElement("div");
  block.className = "result-block";
  var header = document.createElement("div");
  header.className = "result-header";
  header.textContent = title;
  header.onclick = function() {
    var content = this.nextElementSibling;
    content.style.display = (content.style.display === "block") ? "none" : "block";
  };
  var content = document.createElement("div");
  content.className = "result-content";
  content.innerHTML = "<p><strong>До сортування:</strong> " + before.join(", ") + "</p>" +
                      "<p><strong>Після сортування:</strong> " + after.join(", ") + "</p>" +
                      "<p><em>" + stats + "</em></p>";
  block.appendChild(header);
  block.appendChild(content);
  return block;
}

function runSorts(type) {
  var resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  var arr = [];
  for (var i = 0; i < 100; i++) {
    arr.push(Math.floor(Math.random() * 100));
  }
  if (type === "sparse") {
    delete arr[10];
    delete arr[25];
    delete arr[50];
  }

  var algorithms = [
    {name: "Exchange Sort (" + (type === "dense" ? "asc" : "desc") + ")", func: SortLib.exchangeSort, order: (type === "dense" ? "asc" : "desc")},
    {name: "Selection Sort (" + (type === "dense" ? "asc" : "desc") + ")", func: SortLib.selectionSort, order: (type === "dense" ? "asc" : "desc")},
    {name: "Insertion Sort (" + (type === "dense" ? "asc" : "desc") + ")", func: SortLib.insertionSort, order: (type === "dense" ? "asc" : "desc")},
    {name: "Shell Sort (" + (type === "dense" ? "asc" : "desc") + ")", func: SortLib.shellSort, order: (type === "dense" ? "asc" : "desc")},
    {name: "Quick Sort (" + (type === "dense" ? "asc" : "desc") + ")", func: SortLib.quickSort, order: (type === "dense" ? "asc" : "desc")}
  ];

  algorithms.forEach(function(algo) {
    var result = algo.func(arr, algo.order);
    resultsDiv.appendChild(createResultBlock(algo.name, arr, result.sorted, result.stats));
  });
}
