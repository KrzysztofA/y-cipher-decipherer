# Y-Cipher-Decipherer

Application for encrypting and decrypting messages using the **Hill Cipher**, **Caesar Cipher**, and **Rail Fence Cipher**. The project was originally created as a first-year university assignment for a Mathematics module, but it evolved into a full-stack web application built with **React** and **Node.js** to explore modern JavaScript technologies beyond the original coursework requirements.

---

## Stack

* **React** 18.2
* **Node.js** 16.13
* **Express** 4.18

---

## Background

This application began as coursework for the **Thinking Like a Programmer** module during the first year of my Mathematics degree. The original assignment required implementing a Hill Cipher decoder in either **MATLAB** or **Python**.

At the time, I was learning **JavaScript** and **Node.js**, so instead of following the assignment literally, I decided to build a complete web application around the problem. This allowed me to gain practical experience with frontend and backend development while still fulfilling the mathematical requirements of the assignment.

The initial version featured a simple user interface written in vanilla JavaScript. Later, after learning React, I redesigned the application, refactored the backend, improved the project structure, reduced algorithmic overhead where possible, and applied better software engineering practices.

---

## Supported Ciphers

The application currently supports:

* **Hill Cipher** (2×2 matrix implementation)
* **Caesar Cipher**
* **Rail Fence Cipher**

---

## Mathematical Background

The most interesting aspect of the project is the implementation of the **Hill Cipher**, which relies heavily on **modular arithmetic** and **linear algebra**.

Since the English alphabet contains **26 letters**, calculations are performed modulo 26. Unlike prime moduli, 26 introduces additional complications because it has several divisors, meaning that not every value has a modular inverse. This makes certain matrix operations significantly more challenging than in fields based on prime numbers.

The original implementation relied on relatively expensive mathematical computations to handle modular inverses, fractions, and negative values. During later revisions, much of this work was replaced with lookup tables and simplified algorithms, reducing computational cost while improving readability and maintainability.

The project also implements the matrix multiplication and modular arithmetic required by the Hill Cipher algorithm.

For more information:

* https://en.wikipedia.org/wiki/Hill_cipher

---

## Features

### Frontend

* Responsive React interface
* Accessible UI with ARIA support
* Modern component-based architecture

### Backend

* RESTful API built with Express
* Asynchronous request handling
* Independent API that can be used separately from the frontend

---

## Usage

After launching the application, select one of the available ciphers from the navigation.

Each cipher requires different parameters:

### Caesar Cipher

* Encoded message
* Shift value

### Rail Fence Cipher

* Encoded message
* Number of rails

### Hill Cipher

* Encoded message
* Optional known plaintext (up to four characters)

The application also includes several sample inputs collected from online resources as well as examples created during development.

Once the required values have been entered, press **Compute** to decode the message.

---

## Running the Project

### Frontend

Navigate to:

```text
y-cipher-decipherer/y-cipher-decipherer-ui
```

Install dependencies and start the development server:

```bash
npm install
npm start
```

The React application will start on **http://localhost:3000**.

### Backend

Open a second terminal and navigate to:

```text
y-cipher-decipherer/y-cipher-decipherer-api
```

Install dependencies and start the API:

```bash
npm install
npm run dev
```

The API will start on **http://localhost:8000**.

### Configuration

The frontend can be configured to use a different backend by setting the `DECIPHERER_BACKEND` environment variable or by modifying:

```text
y-cipher-decipherer-ui/src/Constants.js
```

The backend port can be changed by editing:

```text
y-cipher-decipherer-api/app.js
```

---

## Notes

This project was originally based on an older university assignment. During later revisions I discovered that some of the sample data provided with the coursework produced inconsistent results, and the original answer sheet was no longer available for verification.

Because of this, a small number of the bundled sample inputs may not decode to the expected output. Revisiting and validating these examples is something I would like to do in the future.

---

## Project Reflection

I enjoy evaluating my personal projects as a way of tracking my progress over time. Looking back, I would rate this project as follows:

| Category         |   Score | Comments                                                                                                                                                                |
| ---------------- | ------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Satisfaction** | **4/10** | A rewarding project that introduced me to full-stack JavaScript development, although it now reflects an earlier stage of my experience.                                |
| **Difficulty**   | **2/10** | The cryptographic algorithms are well documented, and the React application is relatively straightforward by today's standards.                                         |
| **Challenge**    | **3/10** | Building a complete application instead of a simple coursework solution added useful engineering challenges and provided valuable learning opportunities.               |
| **Complexity**   | **4/10** | Despite its modest size, the project combines multiple cryptographic algorithms, mathematical concepts, custom React hooks, and a REST API into a cohesive application. |

