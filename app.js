// Enhanced Beautiful To-Do List Application - Fixed Version
class BeautifulTodoApp {
    constructor() {
        this.tasks = [];
        this.currentFilter = 'all';
        this.currentTheme = 'light';
        this.nextId = 1;
        this.draggedElement = null;
        this.draggedTaskId = null;
        this.dropIndicator = null;
        
        this.initializeElements();
        this.loadSampleData();
        this.initializeTheme();
        this.attachEventListeners();
        this.render();
    }

    initializeElements() {
        this.taskInput = document.getElementById('taskInput');
        this.addBtn = document.getElementById('addBtn');
        this.taskList = document.getElementById('taskList');
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.taskCounter = document.getElementById('taskCounter');
        this.taskProgress = document.getElementById('taskProgress');
        this.clearCompletedBtn = document.getElementById('clearCompletedBtn');
        this.emptyState = document.getElementById('emptyState');
        this.themeToggle = document.getElementById('themeToggle');
        this.dropZone = document.getElementById('dropZone');
    }

    loadSampleData() {
        const sampleTasks = [
            {
                id: 1,
                text: "Design a beautiful UI",
                completed: false,
                timestamp: "2025-08-25T06:00:00.000Z"
            },
            {
                id: 2, 
                text: "Implement drag and drop",
                completed: true,
                timestamp: "2025-08-25T07:00:00.000Z"
            },
            {
                id: 3,
                text: "Add dark mode toggle",
                completed: false,
                timestamp: "2025-08-25T08:00:00.000Z"
            },
            {
                id: 4,
                text: "Create smooth animations",
                completed: false,
                timestamp: "2025-08-25T08:30:00.000Z"
            }
        ];
        
        this.tasks = [...sampleTasks];
        this.nextId = Math.max(...sampleTasks.map(task => task.id)) + 1;
    }

    initializeTheme() {
        // Initialize theme without localStorage
        this.updateThemeDisplay();
    }

    toggleTheme() {
        console.log('Theme toggle clicked'); // Debug log
        const body = document.body;
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        
        this.updateThemeDisplay();
        
        // Add a subtle animation to the toggle
        this.themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.themeToggle.style.transform = 'scale(1)';
        }, 150);
    }

    updateThemeDisplay() {
        const body = document.body;
        if (this.currentTheme === 'dark') {
            body.classList.add('dark-theme');
        } else {
            body.classList.remove('dark-theme');
        }
    }

    attachEventListeners() {
        // Theme toggle - Fixed
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleTheme();
            });
        }

        // Add task events - Fixed
        if (this.addBtn) {
            this.addBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.addTask();
            });
        }
        
        if (this.taskInput) {
            this.taskInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.addTask();
                }
            });
        }

        // Filter events
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const filterValue = btn.getAttribute('data-filter');
                this.setFilter(filterValue);
            });
        });

        // Clear completed event
        if (this.clearCompletedBtn) {
            this.clearCompletedBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.clearCompleted();
            });
        }

        // Task list events (using event delegation)
        if (this.taskList) {
            this.taskList.addEventListener('click', (e) => this.handleTaskClick(e));
            this.taskList.addEventListener('dblclick', (e) => this.handleTaskDoubleClick(e));
            
            // Enhanced drag and drop events - Fixed
            this.taskList.addEventListener('dragstart', (e) => this.handleDragStart(e));
            this.taskList.addEventListener('dragover', (e) => this.handleDragOver(e));
            this.taskList.addEventListener('dragenter', (e) => this.handleDragEnter(e));
            this.taskList.addEventListener('dragleave', (e) => this.handleDragLeave(e));
            this.taskList.addEventListener('drop', (e) => this.handleDrop(e));
            this.taskList.addEventListener('dragend', (e) => this.handleDragEnd(e));
        }
    }

    addTask() {
        console.log('Add task called'); // Debug log
        const text = this.taskInput.value.trim();
        console.log('Task text:', text); // Debug log
        
        if (!text) {
            console.log('No text entered'); // Debug log
            return;
        }

        const newTask = {
            id: this.nextId++,
            text: text,
            completed: false,
            timestamp: new Date().toISOString()
        };

        console.log('Adding new task:', newTask); // Debug log
        this.tasks.unshift(newTask);
        this.taskInput.value = '';
        this.render();

        // Add enhanced animation to the new task
        setTimeout(() => {
            const taskElement = this.taskList.querySelector(`[data-task-id="${newTask.id}"]`);
            if (taskElement) {
                taskElement.classList.add('adding');
                setTimeout(() => taskElement.classList.remove('adding'), 500);
            }
        }, 10);

        // Add a subtle shake to the add button for feedback
        this.addBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.addBtn.style.transform = 'scale(1)';
        }, 100);
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            
            // Add completion animation
            const taskElement = this.taskList.querySelector(`[data-task-id="${id}"]`);
            if (taskElement) {
                taskElement.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    taskElement.style.transform = 'scale(1)';
                }, 200);
            }
            
            this.render();
        }
    }

    editTask(id, newText) {
        const task = this.tasks.find(t => t.id === id);
        if (task && newText.trim()) {
            task.text = newText.trim();
            this.render();
            return true;
        }
        return false;
    }

    deleteTask(id) {
        const taskElement = this.taskList.querySelector(`[data-task-id="${id}"]`);
        if (taskElement) {
            taskElement.classList.add('removing');
            setTimeout(() => {
                this.tasks = this.tasks.filter(t => t.id !== id);
                this.render();
            }, 400);
        }
    }

    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update filter button states with smooth transition
        this.filterBtns.forEach(btn => {
            const btnFilter = btn.getAttribute('data-filter');
            const isActive = btnFilter === filter;
            
            if (isActive) {
                btn.classList.add('active');
                btn.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    btn.style.transform = 'scale(1)';
                }, 150);
            } else {
                btn.classList.remove('active');
            }
        });
        
        this.render();
    }

    clearCompleted() {
        const completedTasks = this.tasks.filter(task => task.completed);
        
        if (completedTasks.length === 0) return;
        
        // Animate out completed tasks
        completedTasks.forEach(task => {
            const taskElement = this.taskList.querySelector(`[data-task-id="${task.id}"]`);
            if (taskElement) {
                taskElement.classList.add('removing');
            }
        });
        
        setTimeout(() => {
            this.tasks = this.tasks.filter(task => !task.completed);
            this.render();
        }, 400);
    }

    getFilteredTasks() {
        switch (this.currentFilter) {
            case 'active':
                return this.tasks.filter(task => !task.completed);
            case 'completed':
                return this.tasks.filter(task => task.completed);
            default:
                return this.tasks;
        }
    }

    updateTaskStats() {
        const totalTasks = this.tasks.length;
        const activeTasks = this.tasks.filter(task => !task.completed).length;
        const completedTasks = totalTasks - activeTasks;
        
        // Update counter
        let counterText;
        if (totalTasks === 0) {
            counterText = 'No tasks yet';
        } else if (activeTasks === 0) {
            counterText = 'All tasks completed! 🎉';
        } else if (activeTasks === 1) {
            counterText = '1 task remaining';
        } else {
            counterText = `${activeTasks} tasks remaining`;
        }
        
        if (this.taskCounter) {
            this.taskCounter.textContent = counterText;
        }
        
        // Update progress
        if (this.taskProgress) {
            if (totalTasks > 0) {
                const progressPercent = Math.round((completedTasks / totalTasks) * 100);
                this.taskProgress.textContent = `${completedTasks}/${totalTasks} completed (${progressPercent}%)`;
            } else {
                this.taskProgress.textContent = '';
            }
        }
    }

    updateClearButton() {
        if (!this.clearCompletedBtn) return;
        
        const hasCompleted = this.tasks.some(task => task.completed);
        this.clearCompletedBtn.disabled = !hasCompleted;
        this.clearCompletedBtn.style.opacity = hasCompleted ? '1' : '0.3';
    }

    createTaskElement(task) {
        const li = document.createElement('li');
        li.className = `task-item${task.completed ? ' completed' : ''}`;
        li.setAttribute('data-task-id', task.id);
        li.draggable = true;
        
        li.innerHTML = `
            <span class="drag-handle" title="Drag to reorder">⋮⋮</span>
            <label class="checkbox-container">
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                <span class="checkmark"></span>
            </label>
            <div class="task-content">
                <span class="task-text">${this.escapeHtml(task.text)}</span>
                <input type="text" class="task-edit-input" value="${this.escapeHtml(task.text)}">
            </div>
            <button class="delete-btn" type="button" title="Delete task">🗑️</button>
        `;
        
        return li;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    render() {
        const filteredTasks = this.getFilteredTasks();
        
        // Clear existing tasks
        if (this.taskList) {
            this.taskList.innerHTML = '';
        }
        
        // Show/hide empty state
        if (this.emptyState) {
            if (filteredTasks.length === 0) {
                this.emptyState.classList.remove('hidden');
                // Update empty state message based on filter
                const emptyMessages = {
                    all: { icon: '🌟', title: 'Ready to be productive?', text: 'Add your first task above and let\'s get started!' },
                    active: { icon: '✨', title: 'All caught up!', text: 'No active tasks remaining. Time to add some new ones!' },
                    completed: { icon: '🎉', title: 'No completed tasks', text: 'Complete some tasks to see them here!' }
                };
                const message = emptyMessages[this.currentFilter];
                this.emptyState.innerHTML = `
                    <div class="empty-icon">${message.icon}</div>
                    <h3>${message.title}</h3>
                    <p>${message.text}</p>
                `;
            } else {
                this.emptyState.classList.add('hidden');
            }
        }
        
        // Render tasks
        if (this.taskList) {
            filteredTasks.forEach(task => {
                const taskElement = this.createTaskElement(task);
                this.taskList.appendChild(taskElement);
            });
            
            // Re-attach edit input event listeners after rendering
            this.attachEditListeners();
        }
        
        // Update stats and clear button
        this.updateTaskStats();
        this.updateClearButton();
    }

    attachEditListeners() {
        const editInputs = this.taskList.querySelectorAll('.task-edit-input');
        editInputs.forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.saveEdit(e.target);
                }
            });
            
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    e.preventDefault();
                    this.cancelEdit(e.target);
                }
            });
            
            input.addEventListener('blur', (e) => {
                setTimeout(() => {
                    if (e.target.closest('.task-item') && e.target.closest('.task-item').classList.contains('editing')) {
                        this.saveEdit(e.target);
                    }
                }, 100);
            });
        });
    }

    handleTaskClick(e) {
        e.stopPropagation();
        
        const taskItem = e.target.closest('.task-item');
        if (!taskItem) return;
        
        const taskId = parseInt(taskItem.dataset.taskId);
        
        if (e.target.classList.contains('task-checkbox')) {
            e.preventDefault();
            this.toggleTask(taskId);
        } else if (e.target.classList.contains('task-text')) {
            this.toggleTask(taskId);
        } else if (e.target.classList.contains('delete-btn') || e.target.closest('.delete-btn')) {
            e.preventDefault();
            this.deleteTask(taskId);
        }
    }

    handleTaskDoubleClick(e) {
        if (e.target.classList.contains('task-text')) {
            e.preventDefault();
            e.stopPropagation();
            
            const taskItem = e.target.closest('.task-item');
            const editInput = taskItem.querySelector('.task-edit-input');
            
            taskItem.classList.add('editing');
            editInput.focus();
            editInput.select();
        }
    }

    saveEdit(input) {
        const taskItem = input.closest('.task-item');
        const taskId = parseInt(taskItem.dataset.taskId);
        const newText = input.value.trim();
        
        taskItem.classList.remove('editing');
        
        if (newText && newText !== this.tasks.find(t => t.id === taskId).text) {
            this.editTask(taskId, newText);
        } else {
            this.render();
        }
    }

    cancelEdit(input) {
        const taskItem = input.closest('.task-item');
        taskItem.classList.remove('editing');
        this.render();
    }

    // Enhanced Drag and Drop functionality - Fixed
    handleDragStart(e) {
        // Only allow dragging from the drag handle
        if (!e.target.classList.contains('drag-handle')) {
            e.preventDefault();
            return;
        }

        const taskItem = e.target.closest('.task-item');
        if (!taskItem) {
            e.preventDefault();
            return;
        }
        
        this.draggedElement = taskItem;
        this.draggedTaskId = parseInt(taskItem.dataset.taskId);
        
        taskItem.classList.add('dragging');
        
        // Set drag data
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', taskItem.outerHTML);
        
        console.log('Drag started for task:', this.draggedTaskId); // Debug log
    }

    handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        
        if (!this.draggedElement) return;
        
        const afterElement = this.getDragAfterElement(this.taskList, e.clientY);
        this.showDropIndicator(afterElement);
    }

    handleDragEnter(e) {
        e.preventDefault();
    }

    handleDragLeave(e) {
        e.preventDefault();
    }

    handleDrop(e) {
        e.preventDefault();
        console.log('Drop event triggered'); // Debug log
        
        if (!this.draggedElement || !this.draggedTaskId) {
            console.log('No dragged element or task ID'); // Debug log
            return;
        }
        
        const afterElement = this.getDragAfterElement(this.taskList, e.clientY);
        const draggedTask = this.tasks.find(t => t.id === this.draggedTaskId);
        
        if (draggedTask) {
            console.log('Reordering task:', draggedTask.text); // Debug log
            
            // Remove task from current position
            this.tasks = this.tasks.filter(t => t.id !== this.draggedTaskId);
            
            // Find new position
            let newIndex = 0;
            
            if (afterElement) {
                const afterTaskId = parseInt(afterElement.dataset.taskId);
                const afterTaskIndex = this.tasks.findIndex(t => t.id === afterTaskId);
                newIndex = afterTaskIndex;
            } else {
                // Dropped at the end
                newIndex = this.tasks.length;
            }
            
            // Insert task at new position
            this.tasks.splice(newIndex, 0, draggedTask);
            
            console.log('Task reordered successfully'); // Debug log
            this.render();
        }
    }

    handleDragEnd(e) {
        console.log('Drag end'); // Debug log
        
        if (this.draggedElement) {
            this.draggedElement.classList.remove('dragging');
        }
        
        this.hideDropIndicator();
        
        this.draggedElement = null;
        this.draggedTaskId = null;
    }

    getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.task-item:not(.dragging)')];
        
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    showDropIndicator(afterElement) {
        this.hideDropIndicator();
        
        const indicator = document.createElement('div');
        indicator.className = 'drop-zone-indicator active';
        indicator.id = 'dropIndicator';
        
        if (afterElement) {
            this.taskList.insertBefore(indicator, afterElement);
        } else {
            this.taskList.appendChild(indicator);
        }
        
        this.dropIndicator = indicator;
    }

    hideDropIndicator() {
        if (this.dropIndicator) {
            this.dropIndicator.remove();
            this.dropIndicator = null;
        }
    }
}

// Initialize the enhanced app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing app'); // Debug log
    const app = new BeautifulTodoApp();
    
    // Add a subtle loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});