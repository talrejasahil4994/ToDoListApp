# ✨ Beautiful To-Do List App

A stunning, modern to-do list application with glass morphism design, animated gradients, dark/light mode, and smooth drag-and-drop functionality.

![Beautiful Todo App Demo](demo.gif)


## 🌟 Features

### ✨ **Beautiful Design**
- **Animated gradient backgrounds** that smoothly transition between colors
- **Glass morphism UI** with backdrop blur and transparency effects
- **Dark/Light mode toggle** with smooth theme transitions
- **Modern typography** and carefully crafted spacing
- **Smooth animations** for all interactions

### 🚀 **Core Functionality**
- ➕ **Add tasks** with Enter key or click
- ✏️ **Edit tasks** by double-clicking
- ✅ **Toggle completion** with satisfying animations  
- 🗑️ **Delete tasks** with smooth removal effects
- 🔄 **Drag & drop reordering** (fully working!)
- 🔍 **Filter tasks** (All/Active/Completed)
- 🧹 **Clear completed** tasks in bulk
- 📊 **Live task counter** and progress tracking

### 📱 **User Experience**
- **Mobile responsive** design
- **Touch-friendly** drag and drop
- **Keyboard shortcuts** support
- **Visual feedback** for all actions
- **Empty states** with encouraging messages

## 🛠️ Installation & Setup

### Prerequisites
- **VS Code** (recommended)
- **Live Server extension** for VS Code

### Quick Start

1. **Clone or download** the repository
```bash
git clone https://github.com/yourusername/beautiful-todo-app.git
cd beautiful-todo-app
```

2. **Open in VS Code**
```bash
code .
```

3. **Install Live Server extension** (if not already installed)
   - Go to Extensions (Ctrl+Shift+X)
   - Search for "Live Server" by Ritwick Dey
   - Click Install

4. **Run the app**
   - Right-click on `index.html`
   - Select "Open with Live Server"
   - App opens automatically at `http://127.0.0.1:5500`

## 📁 Project Structure

```
beautiful-todo-app/
├── index.html          # Main HTML structure
├── style.css           # All styling and themes
├── app.js             # JavaScript functionality
└── README.md          # This file
```

## 🎯 How to Use

### Adding Tasks
1. Type your task in the input field
2. Press **Enter** or click **"Add Task"**
3. Watch it animate smoothly into the list!

### Managing Tasks
- **Complete**: Click the checkbox or task text
- **Edit**: Double-click the task text
- **Delete**: Click the trash icon (🗑️)
- **Reorder**: Drag tasks using the handle (⋮⋮)

### Theme Switching
- Click the **sun/moon icon** in the header
- Enjoy the smooth transition between themes!

### Filtering
- Use **All/Active/Completed** buttons to filter tasks
- Watch smooth content transitions

## 🎨 Themes

### 🌅 Light Mode
- Soft gradient from blue to purple
- Clean, bright interface
- Perfect for daytime use

### 🌙 Dark Mode  
- Deep space gradient with cosmic colors
- Easy on the eyes for night use
- Premium dark aesthetics

## 🔧 Customization

### Changing Colors
Edit the CSS custom properties in `style.css`:

```css
/* Light theme */
.light-theme {
  --background-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --container-bg: rgba(255, 255, 255, 0.25);
}

/* Dark theme */
.dark-theme {
  --background-gradient: linear-gradient(135deg, #0F0C29 0%, #24243e 50%, #302B63 100%);
  --container-bg: rgba(255, 255, 255, 0.1);
}
```

### Adding New Features
The code is modular and easy to extend:
- Add new methods to the `BeautifulTodoApp` class
- Create new CSS classes for styling
- Extend the task object with new properties

## 🚀 Performance Features

- **Efficient rendering** - only updates changed elements
- **Smooth 60fps animations** with CSS transforms
- **Optimized drag & drop** with proper event handling
- **Debounced inputs** for better performance

## 📱 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox  
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Design inspired by modern glass morphism trends
- Animations crafted for smooth 60fps performance
- Built with vanilla JavaScript for maximum compatibility

---

**Made with ❤️ and lots of CSS magic**

⭐ **Star this repo if you found it helpful!**
