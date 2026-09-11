/*
Question:
Insert an element into a sorted array using Binary Search 
to find correct position.

Example:
Input:  [10, 20, 30, 40], value = 25
Output: [10, 20, 25, 30, 40]
*/

class InsertSortedBinary {

    // Function to find correct position using Binary Search
    public static int findPosition(int[] arr, int size, int value) {
        int low = 0, high = size - 1;

        while (low <= high) {
            int mid = (low + high) / 2;

            if (arr[mid] == value) {
                return mid;
            } else if (arr[mid] < value) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return low; // correct insert position
    }

    public static void main(String[] args) {

        int[] arr = new int[10];
        int size = 4;

        arr[0] = 10;
        arr[1] = 20;
        arr[2] = 30;
        arr[3] = 40;

        int value = 25;

        int pos = findPosition(arr, size, value);

        // Shift elements
        for (int i = size - 1; i >= pos; i--) {
            arr[i + 1] = arr[i];
        }

        // Insert value
        arr[pos] = value;
        size++;

        // Print array
        for (int i = 0; i < size; i++) {
            System.out.print(arr[i] + " ");
        }
    }
}