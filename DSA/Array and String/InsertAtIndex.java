/*
Question:
Insert an element at a specific index in an array.

Example:
Input:  [10, 20, 30, 40], index = 2, value = 25
Output: [10, 20, 25, 30, 40]
*/

class InsertAtIndex {
    public static void main(String[] args) {

        int[] arr = new int[10]; // extra space
        int size = 4;

        arr[0] = 10;
        arr[1] = 20;
        arr[2] = 30;
        arr[3] = 40;

        int index = 2;
        int value = 25;

        // Step 1: Shift elements to the right
        for (int i = size - 1; i >= index; i--) {
            arr[i + 1] = arr[i];
        }

        // Step 2: Insert value
        arr[index] = value;
        size++;

        // Step 3: Print array
        for (int i = 0; i < size; i++) {
            System.out.print(arr[i] + " ");
        }
    }
}