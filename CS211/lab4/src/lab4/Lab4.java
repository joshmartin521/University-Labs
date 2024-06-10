/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package lab4;
import java.util.Scanner;
/**
 *
 * @author joshm
 */
public class Lab4 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Scanner kb = new Scanner(System.in);
        System.out.println("Enter numbers");
        String nums = kb.nextLine();
        String[] numbers = nums.split(",");
        BinaryTree bt = new BinaryTree();
        for(int i =0; i< numbers.length; i++)
        {
            bt.insert(Integer.parseInt(numbers[i]));
        }
        
        System.out.println(bt.levels(bt.root));
        bt.preOrder(bt.root);
        System.out.println("");
        bt.inOrder(bt.root);
        System.out.println("");
        bt.postOrder(bt.root);
    }
    
}
