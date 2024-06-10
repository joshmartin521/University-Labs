/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package lab3;

/**
 *
 * @author joshm
 */
public class LinkedList {
    public Link first;
    
    public LinkedList()
    {
        first = null;
    }
    
    public void insertAtHead(String data)
    {
        Link newLink = new Link(data);
        newLink.next=first;
        first = newLink;
    }
    
    public Link removeAtHead(){
        Link temp = first;
        first = first.next;
        return temp;
    }
    
    public void print()
    {
        Link current = first;
        while(current!=null)
        {
            System.out.println(current.data);
            current=current.next;
        }
    }
}
