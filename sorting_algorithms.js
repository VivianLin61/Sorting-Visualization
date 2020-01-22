//Merge Sort
	function doMergeSort(arr) {
		const animations = [];
		if (arr.length <= 1) return arr;
		const auxArray = arr.slice();
		sortHelper(arr, 0, arr.length - 1, auxArray, animations);

		return animations;

	}

	function sortHelper(arr, start, end, auxArray, animations) {
		if (start == end) return;
		const mid = Math.floor((start + end) / 2);
		sortHelper(auxArray, start, mid, arr, animations);
		sortHelper(auxArray, mid + 1, end, arr, animations);
		merge(arr, start, mid, end, auxArray, animations);

	}

	function merge(arr, start, mid, end, auxArray, animations){
		let k = start;
		let i = start;
		let j = mid + 1;

		while (i <= mid && j <=end) {
			//in the sorted auxillary array it chooses the lower value (from L and R)and puts it in the main array.
			if (auxArray[i] <= auxArray[j]) {
				animations.push([k, UNIT *auxArray[i]]);
				arr[k] = auxArray[i];
				k++;
				i++;
			} else {
				animations.push([k,UNIT * auxArray[j]]);
				arr[k] = auxArray[j];
				k++;
				j++;
			}
		}


		//The remaining elements to be copied.
		while (i <= mid) {
			animations.push([k, UNIT *auxArray[i]]);
			arr[k] = auxArray[i];
			k ++;
			i ++;
		}

		while (j <= end) {
			animations.push([k, UNIT *auxArray[j]]);
			arr[k] = auxArray[j];
			k ++;
			j++;
		}
		
	}

//QUICK SORT- Divide and Conquer algorithm

	function quick(arr, start, end) {
		if (start >= end) {
			return;
		}

		let index = partition(arr, start,end);
		//index is the correct position of the pivot. All smaller elements are put before.
		//all greater elements are put after this index.
		quick(arr, start, index - 1);
		quick(arr, index + 1, end);

	}
	//Partions the array such that all the values less than the pivot are to the left
	//of the pivot and all values greater than are to the right of the pivot.
	function partition(arr, start,end) {
		//pick the last element as pivotValue/
		let pivotValue = arr[end];
		//pick start as pivotIndex;
		let pivotIndex = start;

		for (let i = start; i < end; i ++) {
			//if current is smaller than the pivot.
			if (arr[i] < pivotValue) {
				swap(arr,i, pivotIndex);//swap the current element and pivotIndex.
				animations.push([pivotIndex, i]);
				pivotIndex ++; //increment the pivotIndex;
			}
		}
		//swap the value at pivotIndex with pivotValue.
		swap(arr, pivotIndex, end);
		animations.push([pivotIndex,end]);
		return pivotIndex;
		
	}

//INSERTION SORT
	function doInsertionSort(arr) {
		clearArr();
		displayArray(ARR);
			insertions = [];
			for (var i = 1; i < LENGTH; i++) {
				var key = arr[i]; //the current element to be sorted.
				var j = i - 1;
				while (j >= 0 && arr[j] > key) { //if arr[j] is greater than current
					arr[j + 1] = arr[j]; //shift elements left until element smaller than current is found or at front of array.
					j --;
				}
				var insert = j + 1; //the postion the current element is inserted.
				arr[insert] = key; //insert element.
				insertions.push([i, insert]);
			}
		
		return insertions;

	}

//BUBBLE SORT
//Repeatdly swaps adjacent elements if they are in the wrong order. 
	function doBubbleSort(arr) {
		let swaps = [];
		clearArr();
		displayArray(ARR);
		swaps = [];
				for (let i = 0; i < LENGTH-1; i++) {
					for(let j = 0; j < LENGTH-i-1; j++) {
						if(arr[j] > arr[j+1]) {
							swap(arr, j, j + 1);
							swaps.push([j, j+1]);
						}
					}
				}
		return swaps;

	}

//SELECTION SORT
//Sorts an array by repeatedly finding the minimum element from unsorted part and putting
//it at the beginning.
function doSelectionSort(arr){
		let swaps = [];
		clearArr();
		displayArray(ARR);
				for (var i = 0; i < LENGTH-1; i++) {
					let min_idx = i; 
					for (var j = i + 1; j < LENGTH; j++) {
						if (arr[j] < arr[min_idx]) {
							min_idx = j;
						}
					}
					temp = arr[min_idx];
					arr[min_idx] = arr[i];
					arr[i] = temp;
					swaps.push([i,min_idx]);
				}
		return swaps;
	}	