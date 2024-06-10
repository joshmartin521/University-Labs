/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package lab2;
import java.util.Scanner;
/**
 *
 * @author joshm
 */
public class Lab2 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Scanner kb = new Scanner(System.in);
        
        String word1 = kb.nextLine();
        String word2 = kb.nextLine();
        char [] characters = new char [word1.length()+word2.length()];
        
        for(int i = 0; i<word1.length(); i++)
        {
            characters[i]=word1.charAt(i);
        }
        for(int i = word1.length(); i<characters.length;i++){
            characters[i]=word2.charAt(i-word1.length());
        }
        
        
        mergeSort(characters, characters.length);
        
        for(int i = 0; i<characters.length; i++) 
        {
            System.out.print(characters[i]);
        }
    }
    
    public static void mergeSort(char[] a, int n) {
        if (n < 2) {
            return;
        }
        int mid = n / 2;
        char[] l = new char[mid];
        char[] r = new char[n - mid];

        for (int i = 0; i < mid; i++) {
            l[i] = a[i];
        }
        for (int i = mid; i < n; i++) {
            r[i - mid] = a[i];
        }
        mergeSort(l, mid);
        mergeSort(r, n - mid);

        merge(a, l, r, mid, n - mid);
    }
    
   public static void merge(char[] a, char[] l, char[] r, int left, int right) {

      int i = 0, j = 0, k = 0;
      while (i < left && j < right) {
          if (l[i] <= r[j]) {
              a[k++] = l[i++];
          }
          else {
              a[k++] = r[j++];
          }
      }
      while (i < left) {
          a[k++] = l[i++];
      }
      while (j < right) {
          a[k++] = r[j++];
      }
  } 

    
}
