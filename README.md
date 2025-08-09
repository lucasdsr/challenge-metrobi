# Metrobi Challenge Project

This is a Vite project created in TypeScript to solve the challenges presented

The project is structured to separate the logical solutions from the component implementations, following a clean and organized folder structure.

## Folder Structure

The project follows a standard Vite structure with a few additions to organize the solutions:

- `src/`: Contains all the application source code.

  - `components/`: React components.

    - `FlexLayout/`: The component for Question 3.

    - `Zenos/`: The component for Question 6, which animates Zeno's Paradox.

  - `questions/`: This folder contains the direct solutions for most of the questions.

    - `question1.ts`: Solution for Question 1.

    - `question2.ts`: Solution for Question 2.

    - `question4.ts`: Solution for Question 4.

    - `question5.ts`: Solution for Question 5.

    - `question7.ts`: Solution for Question 7.

- `public/`: Static assets.

- `index.html`: The main HTML file.

- `package.json`: Project dependencies and scripts.

- `tsconfig.json`: TypeScript configuration files.

- `vite.config.ts`: Vite configuration.

## Solutions

### Text/Function Solutions

The solutions for the JavaScript/TypeScript functions and logic-based problems are located in the `src/questions/` directory. Each file is named to correspond with the question number from the PDF.

- **Question 1: Duplicate Items in an Array**

  - Solution file: `src/questions/question1.ts`

- **Question 2: Asynchronous Array Iteration**

  - Solution file: `src/questions/question2.ts`

- **Question 4: Bracket Validation**

  - Solution file: `src/questions/question4.ts`

- **Question 5: Two-Egg Problem**

  - Solution file: `src/questions/question5.ts`

- **Question 7: Knapsack Problem (Carrots)**

  - Solution file: `src/questions/question7.ts`

### Component Solutions

The solutions that require a React component implementation are located in the `src/components/` directory.

- **Question 3: Flexbox Layout**

  - The solution for this layout is implemented in the `src/components/FlexLayout/` folder, which contains the React component to generate the figure using Flexbox.

- **Question 6: Zeno's Paradox Animation**

  - The animation for "Zeno's Paradox of Achilles and the Tortoise" is a self-contained React component located in the `src/components/Zenos/` folder. It provides an interface to start and reset the simulation.

## How to Run the Project

1. **Clone the repository:**

   ```bash
   git clone [your-repo-url]
   ```

2. **Navigate to the project directory:**

   ```bash
   cd [your-project-folder]
   ```

3. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

This will start a local server, and you can view the components and run the functions to test the solutions.
