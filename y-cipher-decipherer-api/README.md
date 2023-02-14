# Y-Cipher-Decipherer-API

My API that serves as the backend for deciphering Hill Cipher, Caesar Cipher,
and Rails Cipher encoded messages. Messages were frequently encrypted and
decrypted using these cyphers.

## Ciphers

- Hill Cipher: a polygraphic substitution cypher that employs matrix
  multiplication to convert plaintext to ciphertext
- Caesar Cipher: a simple substitution cypher that replaces each letter in the
  plaintext with a letter that is a predetermined number of positions further
  down the alphabet
- Rails Cipher aka Fence Cipher: a transposition cypher that rearranges the
  plaintext's letters by writing them in a zigzag pattern.

## Technologies

The API is a multithreaded CPU application with employed optimisation
techniques.

### Main technologies used:

- Node JS
- Express

### Framework

API is designed as Rest API, this indicates that the API is effective and
capable of handling multiple requests concurrently, allowing it to respond
rapidly to user input.

## Background

I originally developed the API as a final assignment for my first-year
mathematics course computing module, and have since added UI and multithreading
functionality. This demonstrates both my understanding of the mathematical
concepts underlying these cyphers and my ability to apply that understanding in
a practical setting.

## Final Words

The API is designed to be efficient and to handle multiple requests
concurrently, making it a useful tool for deciphering messages encrypted with
Hill Cipher, Caesar Cipher, and Rails Cipher. Its use of multithreading and
optimization techniques makes it well-suited for concurrently processing
multiple requests, while its integration with a Rest framework makes it simple
to use and integrate with other applications.
