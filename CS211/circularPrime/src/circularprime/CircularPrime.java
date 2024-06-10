/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package circularprime;

/**
 *
 * @author joshm
 */
import java.util.ArrayList;

public class CircularPrime {
    public static void main(String[] args) {
        int limit = 100;
        int count = 0;

        // Sieve of Eratosthenes to generate primes up to limit
        boolean[] isPrime = new boolean[limit];
        for (int i = 2; i < limit; i++) {
            isPrime[i] = true;
        }
        for (int i = 2; i * i < limit; i++) {
            if (isPrime[i]) {
                for (int j = i * i; j < limit; j += i) {
                    isPrime[j] = false;
                }
            }
        }

        // Check for circular primes
        for (int i = 2; i < limit; i++) {
            if (isPrime[i] && isCircularPrime(i, isPrime)) {
                count++;
            }
        }

        System.out.println("Number of circular primes below " + limit + ": " + count);
    }

    // Function to check if a number is a circular prime
    public static boolean isCircularPrime(int n, boolean[] isPrime) {
        String numStr = String.valueOf(n);
        for (int i = 0; i < numStr.length(); i++) {
            if (!isPrime[Integer.parseInt(numStr.substring(i) + numStr.substring(0, i))]) {
                return false;
            }
        }
        return true;
    }
}
