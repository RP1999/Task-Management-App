# 🏥 Task Manager

A beautiful, user-friendly mobile task management application built with React Native. Designed specifically for busy medical professionals who need to efficiently organize and track their tasks.

## 📱 Screenshots

*(Add screenshots here after testing the app)*

## ✨ Features

### Core Functionality
- ✅ **Create, Read, Update, Delete** tasks with ease
- 🔄 **Toggle task completion** status with a single tap
- 🎯 **Priority levels** (High, Medium, Low) with color-coded indicators
- 🔍 **Search** tasks by title or description
- 📊 **Filter** tasks (All, Active, Completed)
- 🔃 **Pull-to-refresh** to sync with server
- 💾 **Real-time API integration** with MockAPI

### User Experience
- 🎨 **Modern, clean medical-inspired UI** with calming colors
- ⚡ **Smooth animations** and transitions
- 📱 **Responsive design** optimized for mobile devices
- 🌟 **Empty states** with helpful messages
- 🎯 **Intuitive navigation** with React Navigation
- ⌨️ **Keyboard-aware** forms for easy data entry

### Technical Features
- 🏗️ **Component-based architecture** for maintainability
- 🔌 **RESTful API integration** using Axios
- 🎨 **Theming system** with consistent design tokens
- 🛡️ **Input validation** and error handling
- 📐 **Responsive layouts** that work on all screen sizes

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** package manager
- **React Native CLI** - `npm install -g react-native-cli`
- **Android Studio** (for Android development) - [Download](https://developer.android.com/studio)
- **Xcode** (for iOS development, macOS only) - [Download](https://developer.apple.com/xcode/)
- **Android Emulator** or **Physical Device** for testing

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-github-repository-url>
   cd DrNimalTaskManager
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install iOS dependencies** (macOS only)
   ```bash
   cd ios
   pod install
   cd ..
   ```

### Running the Application

#### For Android:
```bash
# Start Metro bundler
npm start

# In a new terminal, run Android
npm run android
# or
yarn android
```

#### For iOS (macOS only):
```bash
# Start Metro bundler
npm start

# In a new terminal, run iOS
npm run ios
# or
yarn ios
```

### Troubleshooting

**Metro bundler issues:**
```bash
# Clear cache
npm start -- --reset-cache
```

**Android build errors:**
```bash
cd android
./gradlew clean
cd ..
```

**iOS build errors:**
```bash
cd ios
pod deintegrate
pod install
cd ..
```

## 📁 Project Structure

```
TaskManager/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── TaskCard.js
│   │   ├── TaskForm.js
│   │   ├── SearchBar.js
│   │   ├── FilterButtons.js
│   │   └── EmptyState.js
│   ├── screens/            # Screen components
│   │   ├── HomeScreen.js
│   │   ├── TaskDetailScreen.js
│   │   └── CreateEditTaskScreen.js
│   ├── services/           # API services
│   │   └── api.js
│   ├── utils/              # Utility functions
│   │   ├── constants.js
│   │   └── helpers.js
│   ├── styles/             # Theme and styling
│   │   └── theme.js
│   └── App.js              # Root component
├── android/                # Android native code
├── ios/                    # iOS native code
├── index.js                # Entry point
├── package.json            # Dependencies
├── app.json                # App configuration
└── README.md               # This file
```

## 🎨 Design System

### Color Palette
- **Primary Blue**: #2C5F8D (Professional, trustworthy)
- **Accent Orange**: #FF8C42 (Call-to-action)
- **Success Green**: #52C997 (Completed tasks)
- **Background**: #F8FAFB (Soft, easy on eyes)
- **Surface**: #FFFFFF (Cards, containers)

### Typography
- **Headers**: Poppins (Bold, 600)
- **Body Text**: Inter (Regular, 400)
- **Font Sizes**: 10px - 32px scale

### Spacing
Based on 8px grid system for consistent rhythm.

## 🔌 API Integration

### Base URL
```
https://60a21a08745cd70017576014.mockapi.io/api/v1
```

### Endpoints

#### Get All Tasks
```http
GET /todo
```

#### Get Single Task
```http
GET /todo/:id
```

#### Create Task
```http
POST /todo
Content-Type: application/json

{
  "title": "Task Title",
  "description": "Task Description",
  "priority": "high|medium|low"
}
```

#### Update Task
```http
PUT /todo/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated Description",
  "priority": "medium",
  "completed": true
}
```

#### Delete Task
```http
DELETE /todo/:id
```

## 📱 Usage Guide

### Creating a Task
1. Tap the **orange "+" button** at the bottom right
2. Enter a **task title** (required)
3. Add optional **description** for details
4. Select **priority level** (Low, Medium, High)
5. Tap **"Create Task"** to save

### Viewing Tasks
- Tasks are displayed on the **Home Screen**
- **Search** using the search bar at the top
- **Filter** by All/Active/Completed using filter buttons
- Pull down to **refresh** and sync with server

### Editing a Task
1. Tap on any task card
2. View task details
3. Tap **"✎ Edit Task"** button
4. Make your changes
5. Tap **"Save Changes"**

### Completing a Task
- **Method 1**: Tap the checkbox on the task card
- **Method 2**: Open task details and tap "✓ Mark as Complete"

### Deleting a Task
1. Open task details
2. Tap **"🗑 Delete Task"** button
3. Confirm deletion

## 🧪 Testing

### Manual Testing Checklist
- [ ] Create a new task
- [ ] Edit an existing task
- [ ] Delete a task
- [ ] Mark task as complete/incomplete
- [ ] Search for tasks
- [ ] Filter tasks by status
- [ ] Pull to refresh
- [ ] Test on different screen sizes
- [ ] Test with network errors
- [ ] Test empty states

### Future: Automated Testing
```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration
```

## 🚧 Future Enhancements

### Phase 2
- [ ] Task categories (Patients, Admin, Personal)
- [ ] Due dates with calendar integration
- [ ] Push notifications for reminders
- [ ] Dark mode support
- [ ] Voice-to-text for quick task creation

### Phase 3
- [ ] Team collaboration features
- [ ] Task assignment
- [ ] Analytics dashboard
- [ ] Offline mode with sync
- [ ] Multi-device synchronization
- [ ] Export tasks to PDF/CSV

## 🐛 Known Issues

1. **API Rate Limiting**: MockAPI may have rate limits
2. **Offline Support**: Currently requires internet connection
3. **Real-time Sync**: Manual refresh required to see changes

## 📚 Technologies Used

- **React Native** (0.72.0) - Mobile framework
- **React Navigation** - Navigation library
- **Axios** - HTTP client
- **React Hooks** - State management
- **MockAPI** - Backend API

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**[Your Name]**
- GitHub: [@yourusername]
- Email: your.email@example.com

## 🙏 Acknowledgments

- **Delivergate** for the internship opportunity
- **Dr. Nimal** for inspiring the project concept
- React Native community for excellent documentation
- All contributors who helped with testing and feedback

## 📞 Support

For questions or issues:
- Email: hasitha@delivergate.com
- Create an issue in the GitHub repository

---

**Made with ❤️ for busy medical professionals**

*Last Updated: December 2025*
