/*
 * Collection of functions that will be used in the games
 *
 * Aixa Elenka Mendoza Filisola
 * 2026-05-13 
 */

"use strict";

/*
 * Detect a collision of two box colliders accepting two arguments.
These areguments are instances of the RECT class with propoerties like width and height.
It returns true if the boxes ocerlap
 */
function boxOverlap(obj1, obj2) {
    const L1 = obj1.collider.x;
    const R1 = obj1.collider.x + obj1.collider.width;
    const T1 = obj1.collider.y;
    const B1 = obj1.collider.y + obj1.collider.height;

    const L2 = obj2.collider.x;
    const R2 = obj2.collider.x + obj2.collider.width;
    const T2 = obj2.collider.y;
    const B2 = obj2.collider.y + obj2.collider.height;

    // Compare the values to determine if the boxes overlap
    return L1 <= R2 && L2 <= R1 && T1 <= B2 && T2 <= B1;
}

/*
 * Generates a random integer in the range [start, start + size - 1] using the size and start as arguments and returning a random integer.
*/
function randomRange(size, start) {
    return Math.floor(Math.random() * size) + ((start === undefined) ? 0 : start);
}

