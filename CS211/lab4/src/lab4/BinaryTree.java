/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package lab4;

/**
 *
 * @author joshm
 */
public class BinaryTree {
    public Node root;
    
    public BinaryTree()
    {
        root=null;
    }
    
    public void insert(int data)
    {
        Node newNode = new Node(data);
        
        if(root == null)
        {
            root = newNode;
        }
        else
        {
            Node current = root;
            Node parent;
            while(true)
            {
                parent=current;
                if(data<current.data)
                {
                    current=current.leftChild;
                    if(current == null)
                    {
                        parent.leftChild=newNode;
                        return;
                    }
                }
                else
                {
                    current = current.rightChild;
                    if(current==null)
                    {
                        parent.rightChild=newNode;
                        return;
                    }
                }
            }
        }
    }
    
    public int levels(Node current)
    {
        if(current==null)
        {
            return 0;
        }
        int left = levels(current.leftChild);
        int right = levels(current.rightChild);
        return 1+Math.max(left, right);
    }
    
    public void inOrder(Node localRoot)
    {
        if(localRoot!=null)
        {
            inOrder(localRoot.leftChild);
            System.out.println(localRoot.data+" ");
            inOrder(localRoot.rightChild);
        }
    }
    
    public void preOrder(Node localRoot)
    {
        if(localRoot!=null)
        {
            System.out.println(localRoot.data+" ");
            preOrder(localRoot.leftChild);
            preOrder(localRoot.rightChild);
        }
    }
    
    public void postOrder(Node localRoot)
    {
        if(localRoot!=null)
        {
            postOrder(localRoot.leftChild);
            postOrder(localRoot.rightChild);
            System.out.println(localRoot.data+" ");
        }
    }
}
