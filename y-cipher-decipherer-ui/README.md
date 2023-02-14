# Y-Cipher-Decipherer-UI

React-based user interface (UI) application for y-cipher-decipherer with custom
hooks, a customised fetch hook, and CSS modules for styling.

## Description

The user interface provides input functionality for deciphering messages
encrypted with Hill Cipher, Caesar Cipher, and Rails Cipher. Messages were
frequently encrypted and decrypted using these cyphers.

## Ciphers

- Hill Cipher: a polygraphic substitution cypher that employs matrix
  multiplication to convert plaintext to ciphertext.

- Caesar Cipher: a simple substitution cypher that replaces each letter in the
  plaintext with a letter that is a predetermined number of positions further
  down the alphabet.

- Rails Cipher aka Fence Cipher: a transposition cypher that rearranges the
  plaintext's letters by writing them in a zigzag pattern.

## Features

### Accessability

The UI is responsive and supports devices of all sizes; it also includes ARIA
controls, which provide accessibility features for users who rely on assistive
technology, such as screen readers.

### Optimization

To manage API calls and retrieve data from the backend, custom hooks and a fetch
hook are utilised. CSS modules are used as a styling option to ensure that each
component is encapsulated and does not affect the styling of other components.

### Input

The user interface is intuitive and user-friendly, providing a straightforward
and efficient method for inputting encoded messages and hints for deciphering
the aforementioned cyphers.

## Summing Up

The UI is well-optimized with React and custom hooks and can efficiently process
user input. The incorporation of ARIA controls guarantees that the user
interface is accessible to all users regardless of their abilities.
