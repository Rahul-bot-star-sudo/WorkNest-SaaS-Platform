/*
Question:
Insert an element into a sorted array without breaking order.

Example:
Input:  [10, 20, 30, 40], value = 25
Output: [10, 20, 25, 30, 40]
*/

class InsertSorted {
    public static void main(String[] args) {

        int[] arr = new int[10];
        int size = 4;

        arr[0] = 10;
        arr[1] = 20;
        arr[2] = 30;
        arr[3] = 40;

        int value = 25;

        // Step 1: Find position
        int pos = 0;
        while (pos < size && arr[pos] < value) {
            pos++;
        }

        // Step 2: Shift elements
        for (int i = size - 1; i >= pos; i--) {
            arr[i + 1] = arr[i];
        }

        // Step 3: Insert value
        arr[pos] = value;
        size++;

        // Step 4: Print array
        for (int i = 0; i < size; i++) {
            System.out.print(arr[i] + " ");
        }
    }
}