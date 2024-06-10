/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package lab8;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;
import java.util.Scanner;
/**
 *
 * @author joshm
 */
public class Lab8 {

    /**
     * @param args the command line arguments
     */
public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter your sentence: ");
        String text = scanner.nextLine();
        scanner.close();
        ArrayList<Character> charList = new ArrayList<>();
        HashMap<Character, Integer> myHashMap = new HashMap<>();
        
        for(int i = 0; i<text.length(); i++)
        {
            if(!charList.contains(text.charAt(i)))
            {
                charList.add(text.charAt(i));
                myHashMap.put(text.charAt(i), 1);
            }
            else
            {
                myHashMap.put(text.charAt(i), myHashMap.get(text.charAt(i)) + 1);
            }
        }
        
        char[] keys = new char [charList.size()];
        int [] values = new int [charList.size()];
        
        for(int i = 0; i<keys.length; i++)
        {
            keys[i] = charList.removeFirst();
            values[i] = myHashMap.get(keys[i]);
        }

        for(int i = 0; i<keys.length; i++)
        {
            for(int j=0; j<keys.length-1; j++)
            {
                if(values[j]<values[j+1])
                {
                    int temp = 0;
                    temp = values[j+1];
                    values[j+1]=values[j];
                    values[j]=temp;
                    
                    char temp2;
                    temp2 = keys[j+1];
                    keys[j+1]=keys[j];
                    keys[j]=temp2;
                }
            }
        }
        
        for(int i = 0; i<keys.length; i++)
        {
            System.out.println("'" + keys[i] + "'" + " has a frequency of " + values[i]);
        }

        PriorityQueue<Tree> forest = new PriorityQueue<>();
        for(int i = 0; i<keys.length; i++)
        {
            Tree tree = new Tree();
            Node node = new Node();
            node.letter = keys[i];
            tree.root = node;
            tree.frequency=values[i];
            forest.add(tree);
        }
        
        while (forest.size() > 1) {
            
            Tree tree1 = forest.poll();
            Tree tree2 = forest.poll();
            
            System.out.println("selected " + tree1.root.letter + " and " + tree2.root.letter);
            Tree combinedTree = new Tree();
            
            combinedTree.root = new Node();
            if(tree1.compareTo(tree2)==1)
            {
               combinedTree.root.leftChild = tree1.root;
               combinedTree.root.rightChild = tree2.root;
               
            }
            else if(tree1.compareTo(tree2)==-1)
            {
               combinedTree.root.leftChild = tree2.root;
               combinedTree.root.rightChild = tree1.root;
            }
            else
            {
                if (tree1.root.letter < tree2.root.letter) {
                    combinedTree.root.leftChild = tree1.root;
                    combinedTree.root.rightChild = tree2.root;
                } else {
                    combinedTree.root.leftChild = tree2.root;
                    combinedTree.root.rightChild = tree1.root;
                }
            }
            combinedTree.frequency = tree1.frequency + tree2.frequency;
            
            forest.add(combinedTree);
        }

        // Huffman Tree
        Tree huffmanTree = forest.poll();
        System.out.println("\nHuffman Tree:");
        HashMap<Character, String> encoderMap = new HashMap<>();
        printTree(huffmanTree.root, "", encoderMap);
        
        System.out.println("--------------------------");
        int sum = 0;
        for(int i = 0; i<text.length(); i++)
        {
            System.out.print(encoderMap.get(text.charAt(i)) + " ");
            sum+= encoderMap.get(text.charAt(i)).length();
        }
        System.out.println(sum);
    }

    // Utility function to print Huffman Tree
    public static HashMap<Character, String> printTree(Node node, String code, HashMap encoderMap) {
        if (node != null) {
            if (node.letter != '@') {
                System.out.println("'" + node.letter + "' : " + code);
                encoderMap.put(node.letter, code);
            } else {
                printTree(node.leftChild, code + "0", encoderMap);
                printTree(node.rightChild, code + "1", encoderMap);
            }
        }
        
        return encoderMap;
    }
    
}
