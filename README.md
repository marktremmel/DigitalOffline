# Digital Worksheet System

A comprehensive, hybrid web application designed for Media Literacy education (Grades 5-8). This system allows teachers to easily manage, distribute, and grade interactive lesson materials.

## Features

- **Hybrid Online/Offline Design**: 
  - **Online Mode**: Students can access worksheets on their devices, engage with interactive components, and submit their work digitally.
  - **Offline Mode**: Pressing `Cmd+P` (or `Ctrl+P`) perfectly formats any worksheet for paper printing, automatically hiding buttons and converting digital inputs into lined spaces for handwriting.
- **Interactive Question Types**:
  - Drag & Drop Matching (`@dnd-kit`)
  - Clickable Multiple Choice Cards
  - Open-ended Text Areas
- **Smart QR Code Submission**: Instead of relying on a backend database, the system uses a serverless grading workflow. When a student finishes an assignment online, the app aggressively compresses their answers (using positional arrays and `lz-string` for text) into a tiny, easily scannable QR code. The student screenshots this code and submits it to the teacher.
- **Teacher Dashboard**: A unified hub to browse both Student Worksheets and Teacher Lesson Plans.

## Tech Stack

- **Framework**: React + Vite
- **Routing**: React Router (`react-router-dom`)
- **Drag & Drop**: `@dnd-kit/core`, `@dnd-kit/sortable`
- **QR Generation**: `qrcode.react`
- **Data Compression**: `lz-string`
- **Icons**: `lucide-react`

## How to Run Locally

1. Clone the repository and navigate into the project folder:
   ```bash
   cd worksheet-system
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the `localhost` URL provided in your terminal.

## How to Add New Materials

All worksheet and lesson plan data is stored locally in the `src/data/worksheetsData.js` file.

To add a new assignment or lesson plan, simply add a new object to the array following the established JSON schema. For example:

```javascript
{
  id: "new-assignment",
  title: "My New Assignment",
  type: "worksheet", // or "lesson-plan"
  grade: "7-8",
  subtitle: "Instructions go here.",
  content: [
    {
      type: "instruction",
      text: "Read the following carefully."
    },
    {
      type: "question",
      id: "q1",
      label: "What is your answer?",
      rows: 3
    }
  ]
}
```

The Dashboard will automatically detect the new entry and create a route for it!
