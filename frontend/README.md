# The Lume - Professional Weather Forecasting Platform

![The Lume](https://img.shields.io/badge/Weather-Intelligence-blue?style=for-the-badge&logo=cloud)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)

## 🌟 Overview

**The Lume** is a sophisticated, full-stack weather forecasting application that combines cutting-edge meteorological data with an elegant, user-friendly interface. Built with modern web technologies, it delivers comprehensive weather insights, real-time alerts, and personalized recommendations to help users make informed decisions about their daily activities.

### Key Highlights
- **Real-time Weather Data** - Live updates from OpenWeatherMap API
- **Advanced Forecasting** - Hourly, 5-day, and extended forecasts
- **Interactive Maps** - Dynamic weather visualization with Windy integration
- **Smart Features** - AI-powered clothing suggestions and air quality monitoring
- **Secure Authentication** - JWT-based user management system
- **Responsive Design** - Seamless experience across all devices

---

## 🚀 Features

### Core Weather Services
- **🌤 Current Conditions** - Real-time temperature, humidity, wind speed, and atmospheric pressure
- **📅 5-Day Forecast** - Detailed daily weather predictions with hourly breakdowns
- **⏰ 48-Hour Forecast** - Precise hourly weather updates
- **🌍 Global Coverage** - Weather data for cities worldwide

### Advanced Capabilities
- **🗺 Interactive Weather Maps** - Live global weather patterns with zoom functionality
- **👕 Smart Clothing Suggestions** - Personalized outfit recommendations based on current conditions
- **🌬 Air Quality Index** - Real-time pollution levels and health recommendations
- **📍 Geolocation Services** - Automatic weather detection using browser location
- **🔔 Weather Alerts** - Timely notifications for severe weather conditions

### User Experience
- **Secure Authentication** - JWT token-based login/register system
- **Personalized Dashboard** - Customizable weather overview
- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **Dark/Light Themes** - Eye-friendly interface options
- **Multi-language Support** - International user accessibility

---

## 🛠 Technology Stack

### Frontend
- **React 18** - Modern UI framework with hooks
- **React Router DOM** - Client-side routing
- **CSS3 & Animations** - Custom styling with advanced transitions
- **Geolocation API** - Browser location services
- **Pexels API** - Dynamic background imagery

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **JWT** - Secure authentication tokens
- **CORS** - Cross-origin resource sharing
- **Bcrypt** - Password hashing security

### APIs & Services
- **OpenWeatherMap API** - Primary weather data source
- **Windy Maps** - Interactive weather visualization
- **Nominatim Geocoding** - Location coordinate services
- **Pexels API** - Background image curation

### Development Tools
- **VS Code** - Primary development environment
- **Git** - Version control system
- **Chrome DevTools** - Debugging and performance monitoring

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- OpenWeatherMap API key
- Pexels API key (optional)

### Step-by-Step Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/aurorapixel341/the-lume.git
   cd the-lume
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_OPENWEATHER_API_KEY=your_openweather_api_key
   REACT_APP_PEXELS_API_KEY=your_pexels_api_key
   REACT_APP_BACKEND_URL=http://localhost:5000
   ```

4. **Backend Setup**
   ```bash
   cd backend
   npm install
   npm start
   ```

5. **Frontend Development**
   ```bash
   npm start
   ```

6. **Access Application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

---

## 🎯 Usage Guide

### Getting Started
1. **Registration** - Create a new account with email verification
2. **Dashboard** - Access personalized weather overview
3. **City Search** - Enter any city name for instant weather data
4. **Location Services** - Allow browser location for automatic weather detection

### Key Features Usage
- **Weather Maps**: Navigate to Map Service for interactive global weather visualization
- **Clothing Suggestions**: Get outfit recommendations based on current temperature
- **Air Quality**: Check real-time pollution levels and health advice
- **Extended Forecast**: Plan ahead with 5-day weather predictions

---

## 🔧 API Integration

### OpenWeatherMap Endpoints
```javascript
// Current Weather
https://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&appid={API_KEY}

// 5-Day Forecast
https://api.openweathermap.org/data/2.5/forecast?q={city}&units=metric&appid={API_KEY}

// Geocoding
https://api.openweathermap.org/geo/1.0/direct?q={city}&limit=1&appid={API_KEY}
```

### Backend API Routes
```javascript
// Authentication
POST /register - User registration
POST /login - User authentication
GET /get-profile - User profile verification

// Weather Data
GET /api/weather/current - Current conditions
GET /api/weather/forecast - Extended forecasts
GET /api/weather/air-quality - Pollution data
```

---

## 🎨 UI/UX Design

### Design Philosophy
- **Minimalist Interface** - Clean, distraction-free user experience
- **Intuitive Navigation** - Logical flow between features
- **Visual Hierarchy** - Clear information prioritization
- **Accessibility** - WCAG compliant design elements

### Color Scheme
- **Primary**: `#00bfff` (Azure Blue)
- **Secondary**: `#57769f` (Slate Blue)
- **Background**: Gradient overlays with dynamic imagery
- **Text**: High contrast white and light gray variants

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

---

## 🔒 Security Features

### Authentication & Authorization
- JWT token-based session management
- Secure password hashing with bcrypt
- Token expiration and refresh mechanisms
- Protected route implementation

### Data Protection
- Input sanitization and validation
- XSS prevention measures
- CORS configuration
- Secure API key handling

### Privacy Compliance
- GDPR-ready data handling
- Transparent data usage policies
- User data encryption
- Secure local storage practices

---

## 📱 Component Architecture

### Core Components
```
src/
├── components/
│   ├── Auth/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── LogoutButton.jsx
│   ├── Weather/
│   │   ├── WeatherCard.jsx
│   │   ├── HourlyForecast.jsx
│   │   └── DayForecast.jsx
│   ├── Maps/
│   │   └── Map.jsx
│   ├── Services/
│   │   ├── ClothingSuggestions.jsx
│   │   └── AirQualityIndex.jsx
│   ├── Layout/
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   └── Pages/
│       ├── HomePage.jsx
│       ├── LandingPage.jsx
│       ├── About.jsx
│       ├── Contact.jsx
│       └── Services.jsx
```

### State Management
- React hooks for local state
- Context API for global state (if needed)
- Prop drilling minimization
- Efficient re-rendering optimization

---

## 🚀 Performance Optimization

### Code Splitting
- React.lazy() for route-based splitting
- Dynamic imports for heavy components
- Bundle size optimization

### Caching Strategies
- API response caching
- Local storage for user preferences
- Memoized component rendering

### Loading Optimization
- Skeleton screens during data fetch
- Progressive image loading
- Optimized asset delivery

---

## 🧪 Testing Strategy

### Test Coverage
- Unit tests for utility functions
- Component testing with React Testing Library
- Integration tests for user workflows
- End-to-end testing with Cypress

### Quality Assurance
- ESLint for code quality
- Prettier for code formatting
- Accessibility testing
- Cross-browser compatibility checks

---

## 📈 Deployment

### Production Build
```bash
npm run build
```

### Deployment Options
- **Netlify** - Static site hosting
- **Vercel** - React-optimized deployment
- **Heroku** - Full-stack application hosting
- **AWS S3 + CloudFront** - Scalable cloud deployment

### Environment Variables
```env
# Production
REACT_APP_API_BASE_URL=https://api.thelume.com
REACT_APP_CDN_URL=https://cdn.thelume.com
NODE_ENV=production
```

---

## 🤝 Contributing

We welcome contributions from the community! Please follow these guidelines:

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Standards
- Follow React best practices
- Write meaningful commit messages
- Include appropriate documentation
- Add tests for new features

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

## 🏆 Team

**Aurora Pixel** - *Where code meets creativity, and pixels tell stories*

### Core Team Members
- **Tatheer Sabir** - Full-stack Development & Project Management
- **Amna Batool** - Frontend Development & UI/UX
- **Umara Riasat** - Backend Development & API Integration
- 

### Contact
- **Email**: aurorapixel341@gmail.com
- **GitHub**: [@aurorapixel341](https://github.com/aurorapixel341)
- **Website**: [Coming Soon]

---

## 🙏 Acknowledgments

- OpenWeatherMap for comprehensive weather data
- Windy.com for interactive map visualization
- Pexels for beautiful background imagery
- React community for excellent documentation
- All our beta testers and users for valuable feedback

---

## 🔮 Future Roadmap

### Planned Features
- [ ] Mobile application (React Native)
- [ ] Voice-activated weather queries
- [ ] Weather-based activity recommendations
- [ ] Social sharing capabilities
- [ ] Advanced analytics dashboard
- [ ] IoT weather station integration
- [ ] Machine learning weather predictions

### Technical Improvements
- [ ] GraphQL API implementation
- [ ] Progressive Web App (PWA) features
- [ ] Offline functionality
- [ ] Real-time notifications
- [ ] Advanced caching strategies

---

*Built with ❤️ by Aurora Pixel - Making weather intelligence accessible to everyone*