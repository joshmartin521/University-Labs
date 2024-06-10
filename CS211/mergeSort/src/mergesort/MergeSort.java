/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package mergesort;

/**
 *
 * @author joshm
 */
public class MergeSort {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        int [] nums = {1,6,2,98,2,1,4,23,6,34,1};
        
        mergeSort(nums, nums.length);
        
        for(int i= 0; i<nums.length;i++)
        {
            System.out.print(nums[i]+" ");
        }
    }
    
    public static void mergeSort(int [] a, int n)
    {
        if(n<2)
        {
            return;
        }
        int mid = n/2;
        int[]L= new int[mid];
        int[]R = new int[n-mid];
        for(int i =0; i<mid;i++)
        {
            L[i]=a[i];
        }
        for(int i = mid; i<n; i++)
        {
            R[i-mid]=a[i];
        }
        mergeSort(L,mid);
        mergeSort(R,n-mid);
        merge(a,L,R,mid,n-mid);
    }
    
    public static void merge(int[]a,int[]L,int[]R,int low,int high)
    {
        int i=0, j=0,k=0;
        while(i<low && j<high)
        {
            if(L[i]<R[j])
            {
                a[k++]=L[i++];
            }
            else
            {
                a[k++]=R[j++];
            }
        }
        while(i<low)
        {
            a[k++]=L[i++];
        }
        while(j<high)
        {
            a[k++]=R[j++];
        }
    }
    
}
