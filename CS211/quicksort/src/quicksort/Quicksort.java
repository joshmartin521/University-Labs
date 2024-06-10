/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package quicksort;

/**
 *
 * @author joshm
 */
public class Quicksort {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        int arr[] = {10, 7,33, 8, 9, 1, 5, 99};
        int n = arr.length;
 
        sort(arr, 0, n-1);
 
        System.out.println("sorted array");
        printArray(arr);
    }
    
    public static void sort(int[]a,int low, int high)
    {
        if(low<high)
        {
            int pi = partition(a,low,high);
            sort(a,low,pi-1);
            sort(a,pi+1,high);
        }
    }
    
    public static int partition(int[]a,int low,int high)
    {
        int pivot = a[high];
        int i = low-1;
        for(int j =low; j<high; j++)
        {
            if(a[j]<=pivot)
            {
                i++;
                int temp = a[i];
                a[i]=a[j];
                a[j]=temp;
            }
        }
        
        int temp = a[i+1];
        a[i+1]=a[high];
        a[high]=temp;
        return i+1;
    }
    
    public static void printArray(int arr[])
    {
        int n = arr.length;
        for (int i=0; i<n; ++i)
            System.out.print(arr[i]+" ");
        System.out.println();
    }
    
}
