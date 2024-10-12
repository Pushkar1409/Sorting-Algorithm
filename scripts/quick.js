async function lomuto(ele, l, h) {
    let i = l - 1;

    ele[h].style.background = 'red'; // Highlight the pivot
    for (let j = l; j <= h - 1; j++) {
        ele[j].style.background = 'brown'; // Highlight the current element
        await delay(time);

        if (parseInt(ele[j].style.height) < parseInt(ele[h].style.height)) {
            if (i >= l) {
                ele[i].style.background = 'yellow'; // Highlight the swapped element if necessary
            }
            i++;
            swap(ele[i], ele[j]); // Swap the elements
            ele[i].style.background = 'orange'; // Mark the swapped element
            await delay(time);
        }
        ele[j].style.background = 'yellow'; // Mark the current element as processed
    }

    if (i >= l) {
        ele[i].style.background = 'yellow'; // Highlight the last swapped element
    }

    await delay(time);
    swap(ele[i + 1], ele[h]); // Place the pivot in the correct position
    ele[h].style.background = 'yellow'; // Mark the pivot as processed

    await delay(time);
    return i + 1; // Return the pivot index
}

async function qsort(ele, l, h) {
    if (l < h) {
        let p = await lomuto(ele, l, h); // Partition the array
        await qsort(ele, l, p - 1); // Recursively sort the left part
        await qsort(ele, p + 1, h); // Recursively sort the right part
    } else {
        return;
    }
}

document.getElementById('quick').addEventListener('click', async function () {
    const ele = document.querySelectorAll('.sort');
    const l = 0;
    const h = ele.length - 1;

    // First display the code and image
    displayCodeAndImage();

    // Disable controls during sorting
    disableSizeSlider();
    disableSortingBtn();

    // Start the quicksort
    await qsort(ele, l, h);

    // Mark all elements as sorted
    for (let i = 0; i <= h; i++) {
        await delay(time);
        ele[i].style.background = 'green'; // Change color to indicate sorted
    }

    // Re-enable controls after sorting
    enableSizeSlider();
    enableSortingBtn();
});

// Function to display code and image in the respective boxes
function displayCodeAndImage() {
    // Display the code in the code-box
    const codeContent = `
        <h2>Quick Sort Algorithm </h2>
        <pre><code>
void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int p = lomutoPartition(arr, low, high);
        quickSort(arr, low, p - 1);
        quickSort(arr, p + 1, high);
    }
}

int lomutoPartition(int arr[], int low, int high) {
    int i = low - 1;
    int pivot = arr[high];
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}
        </code></pre>
    `;
    document.getElementById('code-box').innerHTML = codeContent;

    // Display the image in the image-box
    const imageBox = document.getElementById('image-box');
    imageBox.innerHTML = '<img src="sortingimages/quick.png" style="width:100%; height:auto;">'; // Ensure the image is responsive
}
