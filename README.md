# Video Diary App 📱

Video Diary App is a modern mobile application developed with React Native and Expo that allows you to manage and edit your daily video recordings.

## 🚀 Features

- 📹 Video recording and uploading
- 🎬 Video editing and management
- 💾 Local storage support
- 🎨 Modern and user-friendly interface
- 📱 iOS and Android support

## 🛠 Tech Stack

- React Native
- Expo
- TypeScript
- FFMPEG (Video Processing)
- NativeWind (TailwindCSS)
- Zustand (State Management)
- React Query
- React Hook Form
- Zod (Form Validation)

## 📋 Requirements

- Node.js (v16 or higher)
- npm or yarn
- Xcode for iOS (macOS)
- Android Studio for Android
- Expo CLI

## 🔧 Installation

1. Clone the project:
```bash
git clone [repo-url]
cd video-diary-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Pod installation for iOS (iOS development only):
```bash
cd ios
pod install
cd ..
```

4. Start the application:
```bash
# To start in development mode
npm start
# or
yarn start

# For iOS
npm run ios
# or
yarn ios

```

## 📱 Usage

1. When you first open the application, you'll see your trimmed videos on the home screen.
2. Navigate to the "Add" section using the tab navigation to open the new video upload page.
3. Add your video and select the desired 5-second segment to trim.
4. Enter a title and description for your video.
5. Save your video to add it to your collection.
6. On the home screen, tap any video to open its detail page where you can:
   - Watch the video
   - Edit video details (title and description)
   - Delete the video