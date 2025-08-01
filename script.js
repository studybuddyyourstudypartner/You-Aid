// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add click event listeners to navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinksContainer.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Initialize color display
    changeColor();
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Counter functionality
let counter = 0;

function updateCounter(change) {
    counter += change;
    document.getElementById('counter').textContent = counter;
    
    // Add animation effect
    const counterDisplay = document.querySelector('.counter-display');
    counterDisplay.style.transform = 'scale(1.1)';
    setTimeout(() => {
        counterDisplay.style.transform = 'scale(1)';
    }, 150);
}

function resetCounter() {
    counter = 0;
    document.getElementById('counter').textContent = counter;
    
    // Add reset animation
    const counterDisplay = document.querySelector('.counter-display');
    counterDisplay.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        counterDisplay.style.transform = 'rotate(0deg)';
    }, 300);
}

// Color changer functionality
const colors = [
    '#6366f1', '#8b5cf6', '#ec4899', '#ef4444', 
    '#f59e0b', '#10b981', '#06b6d4', '#3b82f6'
];

function changeColor() {
    const colorDisplay = document.getElementById('colorDisplay');
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    colorDisplay.style.background = randomColor;
    
    // Add pulse animation
    colorDisplay.style.transform = 'scale(1.1)';
    setTimeout(() => {
        colorDisplay.style.transform = 'scale(1)';
    }, 200);
}

// Todo list functionality
let todos = [];

function addTodo() {
    const input = document.getElementById('todoInput');
    const todoText = input.value.trim();
    
    if (todoText === '') {
        alert('Please enter a task!');
        return;
    }
    
    const todo = {
        id: Date.now(),
        text: todoText,
        completed: false
    };
    
    todos.push(todo);
    input.value = '';
    renderTodos();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

function toggleTodo(id) {
    todos = todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    renderTodos();
}

function renderTodos() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.style.opacity = todo.completed ? '0.6' : '1';
        li.style.textDecoration = todo.completed ? 'line-through' : 'none';
        
        li.innerHTML = `
            <span onclick="toggleTodo(${todo.id})" style="cursor: pointer; flex: 1;">
                ${todo.text}
            </span>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
        `;
        
        todoList.appendChild(li);
    });
}

// Allow adding todos with Enter key
document.addEventListener('DOMContentLoaded', function() {
    const todoInput = document.getElementById('todoInput');
    if (todoInput) {
        todoInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addTodo();
            }
        });
    }
});

// Contact form functionality
function handleSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all fields!');
        return;
    }
    
    // Simulate form submission
    alert(`Thank you, ${name}! Your message has been sent. We'll get back to you at ${email}.`);
    
    // Reset form
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
}

// Add some interactive animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards
    const cards = document.querySelectorAll('.about-card, .project-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Add particle effect to hero section
function createParticle() {
    const hero = document.querySelector('.hero');
    const particle = document.createElement('div');
    
    particle.style.position = 'absolute';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = 'rgba(255, 255, 255, 0.5)';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = '100%';
    particle.style.animation = 'particleFloat 8s linear infinite';
    
    hero.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 8000);
}

// Add particle animation CSS
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Create particles periodically
setInterval(createParticle, 2000);

// Add typing effect to hero text
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-content h2');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 1000);
    }
});