# 🎬 Movie App Angular

A comprehensive movie management application built with Angular 20, featuring user authentication, movie search, and admin dashboard functionality.


## 🛠️ Technology Stack

- **Frontend**: Angular 20.2.0
- **Styling**: Tailwind CSS 4.1.12
- **Icons**: Lucide Angular
- **HTTP Client**: Angular HTTP Client
- **State Management**: RxJS & Observables
- **API**: OMDB API for movie data

##  Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)
- **Angular CLI** (version 20 or higher)

```bash
# Install Angular CLI globally
npm install -g @angular/cli
```

##  Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd movie-app-angular
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

The application is pre-configured with the following settings in `src/app/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  backendUrl: 'http://localhost:8080/api',
  omdbApiKey:  OMBdAPIKEY
};
```

**Important Notes:**
- **Backend API**: The app expects a backend server running on `http://localhost:8080/api`
- **OMDB API**: Uses a demo API key (consider getting your own from [OMDB API](http://www.omdbapi.com/))

### 4. Start the Development Server

```bash
ng serve

```

The application will be available at `http://localhost:4200/`


