/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package lab3;
import java.util.Scanner;
/**
 *
 * @author joshm
 */
public class Lab3 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Scanner kb = new Scanner(System.in);
        String word = "";
        LinkedList list = new LinkedList();
        while(true)
        {
            System.out.println("Enter a word");
            word = kb.nextLine();
            if(word.equals("END"))
            {
                break;
            }
            list.insertAtHead(word);
        }
        
        list.print();
    }
    
}
