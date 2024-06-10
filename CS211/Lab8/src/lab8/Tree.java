/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package lab8;

/**
 *
 * @author joshm
 */

public class Tree implements Comparable<Tree>{
   public Node root;             //first node of tree
   public int frequency=0;	//this is the weighting of the tree so that it can be ordered


   public Tree(){                // constructor
	root = null;             // no nodes in tree yet
   }

//the PriorityQueue needs to be able to somehow rank the objects in it
//thus, the objects in the PriorityQueue must implement an interface called Comparable
//the interface requires you to write a compareTo() method so here it is:

   public int compareTo(Tree object){ //
       if(frequency-object.frequency>0){ //compare the cumulative frequencies of the tree
           return 1;
        }else if(frequency-object.frequency<0){
           return -1;   //return 1 or -1 depending on whether these frequencies are bigger or smaller
        }
        return 0;   //return 0 if they're the same
   }
}  

class Node{
   
   public char letter='@';         //stores the letter for this leaf
   
   public Node leftChild;         // this node's left child
   public Node rightChild;        // this node's right child

}

