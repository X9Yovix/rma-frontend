# Recipe Application Management - Frontend

This repository contains the frontend for the Recipe Application Management system built with Angular.

## Deployment

Both the frontend and backend applications are deployed and ready for use.

- **Frontend URL**: [https://rma-frontend-jtf5.onrender.com](https://rma-frontend-jtf5.onrender.com)
- **Backend URL**: [https://rma-backend-2bgd.onrender.com](https://rma-backend-2bgd.onrender.com)
- **Backend Documentation**: [https://rma-backend-2bgd.onrender.com/api-docs](https://rma-backend-2bgd.onrender.com/api-docs)

### Default Credentials

- **Email**: `test@test.com`
- **Password**: `test@test.com`

### User Creation

If the user doesn't exist, you can create it by sending a `POST` request to the backend API. Use the following `curl` command to seed the user:

```bash
curl -X POST https://rma-backend-2bgd.onrender.com/api/users/seed
```

## Features

- **Authentication**: User login and token management using JWT.
- **Recipe Management**: CRUD operations for recipes.
- **Search**: Search for recipes by name and ingredients.
- **Responsive Design**
- **Dark/Light Mode**
- **Progress Indicators**: Show progress spinners and progress bars during form submissions and data fetching.

## Used Packages

- **Angular Material**: A component library for building modern UI with Material Design.
- **Bootstrap**: For responsive layout and grid system.

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/) (v22 or higher)
- [Angular CLI](https://angular.dev/installation)

### Setup

1. Clone the repository:

```bash
git clone https://github.com/X9Yovix/rma-frontend.git

cd rma-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Run the app:

```bash
ng serve -o
```
