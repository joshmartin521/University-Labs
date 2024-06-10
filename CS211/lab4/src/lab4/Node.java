/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package lab4;

/**
 *
 * @author joshm
 */
public class Node {
    public int data;
    public Node leftChild;
    public Node rightChild;
    
    public Node(int data)
    {
        this.data = data;
        this.rightChild=null;
        this.leftChild=null;
    }
}
