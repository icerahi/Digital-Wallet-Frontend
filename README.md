# **Digital Wallet Frontend**

[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?logo=redux)](https://redux-toolkit.js.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)](https://vitejs.dev/)

A secure, role-based, and user-friendly frontend application for a Digital Wallet System, built with React.js, Redux Toolkit, and RTK Query. This application provides a seamless interface for Users, Agents, and Admins to perform financial operations and manage wallets.

---

## **Live Demo**

 https://bondhu-pay.vercel.app/

---

## **Key Features**

### **Public & Authentication**
- **Polished Landing Page**: A beautiful homepage with smooth transitions, a sticky navbar, and a clear call-to-action.
- **Informational Pages**: About, Features, Contact, and FAQ sections.
- **Secure Authentication**: JWT-based login and registration for `Users` and `Agents`.
- **Persistent State**: Users remain logged in even after a page refresh.
- **Role-Based Access**: Automatic redirection to the appropriate dashboard upon login.

### **User Dashboard**
- **Financial Overview**: At-a-glance view of wallet balance and recent transactions.
- **Core Wallet Actions**: Deposit, Withdraw, and Send Money to other users.
- **Complete History**: View all transactions with pagination and filtering by type or date.
- **Profile Management**: Update name, phone number, and password.

### **Agent Dashboard**
- **Agent-Specific Overview**: Summary of cash-in/cash-out activities.
- **Facilitate Transactions**: Add money to a user's wallet or process withdrawals.
- **Transaction Monitoring**: View all transactions handled by the agent.
- **Profile Management**: Update personal and account information.

### **Admin Dashboard**
- **System-Wide Overview**: High-level stats on total users, agents, and transaction volume.
- **User & Agent Management**: View, block, unblock, approve, or suspend accounts.
- **Advanced Transaction View**: Access all system transactions with powerful filtering and search capabilities.
- **Data Visualization**: Dynamic cards, charts, and tables for intuitive data analysis.

### **General & UX Features**
- **Guided Tour**: An interactive tour for new users highlighting key features (powered by `react-joyride`).
- **Toast Notifications**: Instant feedback for user actions.
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices.
- **Loading Skeletons**: Smooth loading states for a better user experience.
- **Dark & Light Mode**: A theme toggle for user preference.

---

## **Technology Stack**

- **Framework**: [React.js](https://react.dev/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) & [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- **Routing**: [React Router](https://reactrouter.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Form Management**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for validation
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Linting**: [ESLint](https://eslint.org/)

---

## **Getting Started**

Follow these instructions to set up and run the project locally.

### **Prerequisites**

- [Node.js](https://nodejs.org/en) (v18 or higher recommended)
- [Bun](https://bun.sh/) or [NPM](https://www.npmjs.com/)/[Yarn](https://yarnpkg.com/)

### **1. Clone the Repository**

```bash
git clone https://github.com/your-username/digital-wallet-frontend.git
cd digital-wallet-frontend
```

### **2. Install Dependencies**

Using Bun (recommended):
```bash
bun install
```

Or with NPM:
```bash
npm install
```

### **3. Set Up Environment Variables**

Create a `.env` file in the root of the project and add the backend API URL.

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

*Note: Replace the URL with your actual backend server address if it's different.*

### **4. Run the Development Server**

```bash
bun run dev
```
or
```bash
npm run dev
```

The application should now be running on [http://localhost:5173](http://localhost:5173).

---

## **Available Scripts**

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run lint`: Lints the codebase using ESLint.
- `npm run preview`: Serves the production build locally.

---

## **Credentials for Testing**

You can use the following credentials to test the different roles:

- **Admin**:
  - **Email**: `admin@example.com`
  - **Password**: `password123`
- **Agent**:
  - **Email**: `agent@example.com`
  - **Password**: `password123`

*Note: Replace with your actual seed credentials if they differ.*
