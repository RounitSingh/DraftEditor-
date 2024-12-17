# Draft Editor with React
Deployed link : https://glowing-squirrel-fd4206.netlify.app/

This is a simple rich text editor built using **React** and **Draft.js**. It allows users to input a title, write rich text, and save the content to the browser's local storage. The editor supports custom styles, such as **bold**, **underline**, and **red text**, as well as a basic **header** feature. This project demonstrates how to manage editor state and handle text formatting with Draft.js.

![image](https://github.com/user-attachments/assets/959215b4-425b-4f3e-8378-04fd3d4eb949)

## Features

- **Title input**: Users can enter a title for their document.
- **Rich text editing**: Supports inline text styling (bold, underline, red text) and header formatting.
- **Markdown-like syntax**:
  - `#` followed by a space creates a heading.
  - `*` followed by a space makes the text **bold**.
  - `**` followed by a space turns the text red.
  - `***` followed by a space makes the text **underline**.
- **Local Storage**: Automatically saves the title and editor content to the browser's local storage.
## Usage

1. **Enter a Title**: Input the title for your document in the text field at the top.
2. **Edit Rich Text**: Use the editor to format text:
   - Type `#` followed by a space to create a **Heading** (The `#` will disappear after pressing space).
   - Type `*` followed by a space to make the text **bold**.
   - Type `**` followed by a space to make the text **red**.
   - Type `***` followed by a space to make the text **underline**.
3. **Save Content**: Click the **Save** button to save the title and editor content to `localStorage`. The content will persist even after refreshing the page.
4. **Content Persistence**: After refreshing, the saved content and title will be automatically loaded back into the editor.
