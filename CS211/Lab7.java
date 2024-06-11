import java.util.*;
import java.io.*;
public class Lab7BT{
 public static void main(String[] args){

 File file = new File("C://EnglishSpanish.csv");
 int countlines =0;
 try {
 Scanner scan = new Scanner(file);
 while (scan.hasNextLine()) {
 scan.nextLine();
 countlines++;
 }
 scan.close();
 } catch (Exception e) {
 System.err.println(e);
 }
 //this piece of code above is just to count how many lines
there are
 //then we can create an array of that size and fill it with
all the Strings

 String[] input = new String[countlines];
 try {
 Scanner scan = new Scanner(file);
 for(int i = 0; i < input.length; i++) {
 input[i] = scan.nextLine();
 }
 scan.close();
 } catch (Exception e) {
 System.err.println(e);
 }

 BinaryTree mytree = new BinaryTree();
 //create a binary tree and call the recursiveInsert method
 recursiveInsert(input, 0, input.length-1, mytree);
 //that takes in the input array, the start and end position,
and the binary tree

 System.out.println("The resulting binary tree has
"+mytree.height()+" levels");
 //print out the height of the tree and then read in the
sentence to translate

 Scanner myscanner = new Scanner(System.in);
 System.out.println("Please enter your sentence: ");
 String[] words = myscanner.nextLine().toLowerCase().split("
");
 //split the words by spaces and then lookup the translation
for each
 for(int i=0;i<words.length;i++){
 String translation=mytree.lookup(words[i]);
 if(translation==null){
 System.out.print(words[i]+" ");
 }else{
 System.out.print(translation+" ");
 }
 //if there's no translation print out the original
English version
 //otherwise print the Spanish version
 }

 }


 //this method inserts the item in the middle
 //then it calls itself on the first half of the array
 //and on the second half
 //the base case is when the start and end parameters meet each
other
 public static void recursiveInsert(String[] input, int start,
int end, BinaryTree mytree){
 if(start>end){
 return;
 }

 int midpoint=start + (end-start)/2;
 mytree.insert(input[midpoint]);
 recursiveInsert(input, start, midpoint-1, mytree);
 recursiveInsert(input, midpoint+1, end, mytree);
 }
}
class Node {
 String value;
 Node left;
 Node right;
 public Node(String input) {
 value = input;
 left = null;
 right = null;
 }
}
class BinaryTree {
 Node root;
 public BinaryTree() {
 root = null;
 }
 // Method to insert a new node into the binary tree
 // The insertRecursive method returns what the new root should
be
 public void insert(String value) {
 root = insertRecursive(root, value);
 }
 // A recursive method to insert a new node into the binary tree
 // The method returns what the new current should be
 private Node insertRecursive(Node current, String insertValue) {
 if (current == null) {
 return new Node(insertValue);
 }
 //it returns the new node up a level so its parent can be
connected to it

 if (insertValue.compareTo(current.value)<0) {
 current.left = insertRecursive(current.left,
insertValue);
 } else if (insertValue.compareTo(current.value)>0) {
 current.right = insertRecursive(current.right,
insertValue);
 }
 return current;
 }

 // Method to get height of the binary tree
 public int height() {
 return heightRecursive(root);
 }

 // A recursive method to get the height
 private int heightRecursive(Node current) {
 if(current==null){
 return 0;
 }
 // Calculate the height of the left and right subtrees
recursively
 int leftHeight = heightRecursive(current.left);
 int rightHeight = heightRecursive(current.right);
 //the height here is 1 higher than the biggest height of the
two children
 return 1+ Math.max(leftHeight, rightHeight);
 }


 //this lookup method is not recursive
 //it keeps looping until it finds the word or goes off the end
of the tree
 //goes left or right depending on the whether the lookup word is
bigger or smaller
 //if it reaches a null it has gone off the end, so return null
 public String lookup(String lookup) {
 Node current = root;
 do{
 String english=current.value.split(",")[0];
 if(english.equals(lookup)){
 return current.value.split(",")[1];
 }
 if(english.compareTo(lookup)>0){
 current=current.left;
 }else{
 current=current.right;
 }
 }while(current!=null);
 return null;
 }
}
