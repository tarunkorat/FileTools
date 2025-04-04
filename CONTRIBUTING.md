# Contributing to FileTools

Thank you for your interest in contributing to FileTools! This document provides guidelines and instructions for contributing to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Pull Request Process](#pull-request-process)
- [Adding New Tools](#adding-new-tools)

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please be respectful and considerate of others.

## How to Contribute

1. **Fork the Repository**
   - Click the "Fork" button on the GitHub repository page
   - Clone your forked repository to your local machine

2. **Create a Branch**
   - Create a new branch for your feature or bugfix
   - Use a descriptive name (e.g., `feature/pdf-encryption` or `fix/image-compression`)

3. **Make Changes**
   - Follow the coding standards
   - Write clear commit messages
   - Add tests for new features
   - Update documentation

4. **Submit a Pull Request**
   - Push your changes to your fork
   - Create a pull request to the main repository
   - Follow the pull request template

## Development Setup

1. **Prerequisites**
   - Node.js 18.17 or later
   - npm or yarn
   - Git

2. **Installation**
   ```bash
   git clone https://github.com/yourusername/filetools.git
   cd filetools
   npm install
   ```

3. **Development Server**
   ```bash
   npm run dev
   ```

4. **Testing**
   ```bash
   npm run test
   ```

## Project Structure

```
filetools/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── (routes)/          # Page routes
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # UI components
│   └── ...               # Other components
├── lib/                  # Utility functions
├── public/               # Static assets
└── ...                   # Configuration files
```

## Coding Standards

1. **TypeScript**
   - Use strict mode
   - Add proper type annotations
   - Avoid `any` type

2. **React**
   - Use functional components
   - Follow React hooks rules
   - Use proper prop types

3. **Styling**
   - Use Tailwind CSS classes
   - Follow BEM naming convention for custom CSS
   - Keep styles modular

4. **Code Formatting**
   - Use Prettier for code formatting
   - Follow ESLint rules
   - Maximum line length: 80 characters

## Pull Request Process

1. **Before Submitting**
   - Run tests
   - Check for linting errors
   - Update documentation
   - Ensure all CI checks pass

2. **PR Description**
   - Describe the changes
   - Reference related issues
   - Add screenshots if applicable

3. **Review Process**
   - Address review comments
   - Keep PR focused and small
   - Update PR if needed

## Adding New Tools

1. **Create New Route**
   - Add new page in `app/(routes)/`
   - Follow existing pattern

2. **Add Processing Logic**
   - Create new function in `lib/file-processing.ts`
   - Add proper error handling
   - Add type definitions

3. **Update UI**
   - Add tool to navigation
   - Create tool-specific components
   - Add proper loading states

4. **Testing**
   - Add unit tests
   - Test edge cases
   - Add error handling tests

## Questions?

Feel free to open an issue or contact the maintainers if you have any questions about contributing to FileTools. 