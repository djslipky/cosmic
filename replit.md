# Overview

This is a full-stack web application for a space-themed entertainment venue called "Space Bowling" that offers bowling, billiards, and arcade facilities with futuristic cosmic theming. The application provides a reservation system with pricing tiers, facility management, and contact functionality. Built as a modern React single-page application with an Express.js backend and PostgreSQL database integration.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript, built using Vite for development and bundling
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent design system
- **Styling**: Tailwind CSS with custom space-themed color palette and animations
- **State Management**: TanStack Query (React Query) for server state management and API caching
- **Form Handling**: React Hook Form with Zod validation for type-safe form management

## Backend Architecture
- **Framework**: Express.js with TypeScript running on Node.js
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL with Neon serverless integration
- **API Design**: RESTful API with JSON responses
- **Session Management**: PostgreSQL-backed sessions using connect-pg-simple
- **Error Handling**: Centralized error middleware with structured error responses

## Data Storage Solutions
- **Primary Database**: PostgreSQL hosted on Neon serverless platform
- **Schema Management**: Drizzle migrations with version control
- **Backup Strategy**: In-memory storage fallback for development (MemStorage class)
- **Data Models**: 
  - Users with authentication
  - Facilities (bowling, billiards, arcade)
  - Reservations with pricing tiers
  - Contact messages

## Authentication and Authorization
- **Session-based Authentication**: Server-side sessions stored in PostgreSQL
- **Password Security**: Plain text storage in current implementation (development phase)
- **User Management**: Basic user creation and retrieval system

## Design System
- **Theme**: Space/cosmic theme with custom CSS variables
- **Typography**: Orbitron and Exo 2 fonts for futuristic aesthetic
- **Color Scheme**: Dark theme with cyan, purple, and neon accents
- **Animations**: Custom CSS animations for glowing effects and particle systems
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting platform
- **Connection**: @neondatabase/serverless driver for database connectivity

## UI and Styling
- **Radix UI**: Comprehensive set of unstyled, accessible React components
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Icon library for consistent iconography
- **Google Fonts**: Orbitron and Exo 2 fonts for space theme

## Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Static type checking and enhanced developer experience
- **ESBuild**: Fast JavaScript bundler for production builds
- **Drizzle Kit**: Database schema management and migration tool

## Runtime Dependencies
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form state management and validation
- **Zod**: Runtime type validation and schema definition
- **Date-fns**: Date manipulation and formatting utilities
- **Wouter**: Lightweight routing library for React

## Replit Integration
- **Replit Vite Plugins**: Runtime error overlay and cartographer for development
- **Environment**: Configured for Replit hosting with automatic deployments