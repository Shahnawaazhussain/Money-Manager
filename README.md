# 💰 Expense Buddy: Money Manager Capstone

A sophisticated, object-oriented web application designed to track personal finances. This project provides a seamless interface for managing income and expenses with local persistence and real-time financial summaries.

---

## 🚀 Features

### 1. Core CRUD Operations

* **Create:**
  Add new transactions with automated date-filling and dynamic sub-category switching.

* **Read:**
  View a comprehensive transaction history table and a *Bento-style* financial summary:

  * Total Income
  * Total Expense
  * Net Balance

* **Update:**
  Modify existing transactions via a pre-filled modal interface.

* **Delete:**
  Remove entries with a safety confirmation prompt.

---

### 2. Intelligent Data Management

* **Filtering:**
  View:

  * Income Only
  * Expense Only
  * All Transactions

* **Sorting:**
  Organize data by:

  * Date (Newest / Oldest)
  * Amount (Highest / Lowest)

* **Persistence:**
  Data is stored in the browser’s `localStorage`, ensuring it remains available after refresh.

---

### 3. Professional UI/UX

* **Responsive Design:**
  Optimized for Desktop, Tablet, and Mobile devices.
  Includes horizontal scroll-lock for tables on smaller screens.

* **Dynamic Logic:**
  The *Sub-Category* dropdown updates automatically based on:

  * Income selection
  * Expense selection

* **Micro-interactions:**

  * Smooth modal transitions
  * Interactive hover states

---

## 🛠️ Technical Implementation

### Object-Oriented Programming (JavaScript)

* **Transaction Class:**
  Represents a single financial record.

* **MoneyManager Class:**
  Handles:

  * Application state
  * DOM updates
  * Data synchronization

---

### Form Validation & Error Handling

* **Strict Validation:**

  * Prevents submission if amount ≤ 0
  * Prevents future dates

* **Visual Feedback:**

  * Invalid fields show red borders
  * Inline error messages for clarity

* **Resilience:**
  Core logic is wrapped in `try...catch` blocks for graceful error handling.

---

## 📂 Project Structure

```
project-folder/
│── index.html
│── style.css
│── script.js
```

---

## 📝 Setup Instructions

1. Download the project files:

   * `index.html`
   * `style.css`
   * `script.js`

2. Ensure all files are in the same folder.

3. Open `index.html` in any modern web browser:

   * Chrome
   * Firefox
   * Safari
   * Edge

> **Note:** An active internet connection is required to load the Material Symbols font.

