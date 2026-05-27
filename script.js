// Local JSON Model Dataset Object Configuration
const courseDataset = [
    { id: "C001", title: "Introduction to HTML5 & Semantic Web", category: "School Education", platform: "NDLI-Swayam", duration: "6 Weeks", level: "Beginner" },
    { id: "C002", title: "Advanced Data Structures & Algorithms", category: "Higher Education", platform: "IIT Kharagpur", duration: "12 Weeks", level: "Advanced" },
    { id: "C003", title: "Research Methodology & Ethics", category: "Research", platform: "UGC-Infilbnet", duration: "8 Weeks", level: "Intermediate" },
    { id: "C004", title: "Python Programming for Data Science", category: "Higher Education", platform: "IIT Madras", duration: "10 Weeks", level: "Intermediate" },
    { id: "C005", title: "Resume Building & Corporate Etiquette", category: "Career Development", platform: "National Career Service", duration: "4 Weeks", level: "Beginner" },
    { id: "C006", title: "Machine Learning Foundations", category: "Research", platform: "IISc Bangalore", duration: "14 Weeks", level: "Advanced" }
];

// Structural Content Route Trigger Processing Initializations
document.addEventListener("DOMContentLoaded", () => {
    const pageName = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);

    // Run active engine conditional routines
    if (document.getElementById("ndlCarouselContainer")) {
        runNativeCarouselEngine();
    }
    if (pageName === "courses.html") {
        runCoursesEngine();
    }
    if (pageName === "login.html" || pageName === "register.html") {
        runAuthEngine(pageName);
    }
    if (pageName === "dashboard.html") {
        runDashboardEngine();
    }
    if (pageName === "contact.html") {
        runContactEngine();
    }
    if (pageName === "feedback.html") {
        runFeedbackEngine();
    }
});

// 1. CAROUSEL ENGINE (Replaces Bootstrap Carousel)
function runNativeCarouselEngine() {
    const container = document.getElementById("ndlCarouselContainer");
    const slides = document.querySelectorAll(".carousel-slide");
    const nextBtn = document.getElementById("carouselNext");
    const prevBtn = document.getElementById("carouselPrev");
    
    let activeIndex = 0;
    const totalSlides = slides.length;

    const updateSlideView = () => {
        container.style.transform = `translateX(-${activeIndex * 100}%)`;
    };

    nextBtn.addEventListener("click", () => {
        activeIndex = (activeIndex + 1) % totalSlides;
        updateSlideView();
    });

    prevBtn.addEventListener("click", () => {
        activeIndex = (activeIndex - 1 + totalSlides) % totalSlides;
        updateSlideView();
    });

    // Automatic transition timer
    setInterval(() => {
        activeIndex = (activeIndex + 1) % totalSlides;
        updateSlideView();
    }, 5000);
}

// 2. COURSES PAGE ENGINE (Dynamic DOM Generation & Filters)
function runCoursesEngine() {
    const searchInput = document.getElementById("courseSearch");
    const categoryFilter = document.getElementById("categoryFilter");

    const processFilter = () => {
        const query = searchInput.value.toLowerCase();
        const categorySelection = categoryFilter.value;

        const filteredResults = courseDataset.filter(course => {
            const matchesSearch = course.title.toLowerCase().includes(query) || course.platform.toLowerCase().includes(query);
            const matchesCategory = (categorySelection === "All") || (course.category === categorySelection);
            return matchesSearch && matchesCategory;
        });

        renderGridCards(filteredResults);
        renderTableRows(filteredResults);
    };

    if (searchInput) searchInput.addEventListener("input", processFilter);
    if (categoryFilter) categoryFilter.addEventListener("change", processFilter);

    // Structural First-render initialization calls
    renderGridCards(courseDataset);
    renderTableRows(courseDataset);
}

function renderGridCards(data) {
    const grid = document.getElementById("dynamicCourseGrid");
    if (!grid) return;
    grid.innerHTML = "";

    if (data.length === 0) {
        grid.innerHTML = "<p style='grid-column: 1/-1; text-align:center; color:#777;'>No available database records conform to selected constraints.</p>";
        return;
    }

    data.forEach(course => {
        grid.innerHTML += `
            <div class="domain-card">
                <div class="icon-frame">📖</div>
                <h3>${course.title}</h3>
                <p><strong>Hub:</strong> ${course.platform}<br><strong>Duration:</strong> ${course.duration} (${course.level})</p>
                <button class="gov-btn btn-green" style="width:100%;" onclick="alert('Routing to asset storage layer Node ${course.id}...')">Access Resource</button>
            </div>`;
    });
}

function renderTableRows(data) {
    const tableBody = document.getElementById("courseTableBody");
    if (!tableBody) return;
    tableBody.innerHTML = "";

    data.forEach((course, index) => {
        tableBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td><strong>${course.id}</strong></td>
                <td>${course.title}</td>
                <td>${course.category}</td>
                <td>${course.platform}</td>
                <td>${course.level}</td>
            </tr>`;
    });
}

// 3. SECURE AUTH ENGINE (Password Show/Hide and Validations)
function runAuthEngine(page) {
    const toggleBtn = document.getElementById("togglePasswordBtn");
    const passwordInput = document.getElementById("password");
    const form = document.getElementById(page === "login.html" ? "loginForm" : "registerForm");
    const feedback = document.getElementById("formFeedback");

    if (toggleBtn && passwordInput) {
        toggleBtn.addEventListener("click", () => {
            const isPass = passwordInput.type === "password";
            passwordInput.type = isPass ? "text" : "password";
            toggleBtn.textContent = isPass ? "Hide" : "Show";
        });
    }

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const emailValue = document.getElementById("email").value.trim();

            if (passwordInput.value.length < 6) {
                feedback.innerHTML = `<p style="color:red; margin-top:15px; font-weight:600;">Validation Failure: Password length must be ≥ 6 tracking characters.</p>`;
                return;
            }

            if (page === "register.html") {
                const confirmPass = document.getElementById("confirmPassword").value;
                if (passwordInput.value !== confirmPass) {
                    feedback.innerHTML = `<p style="color:red; margin-top:15px; font-weight:600;">Validation Failure: Input passwords do not match.</p>`;
                    return;
                }
            }

            localStorage.setItem("portalUser", emailValue.split("@")[0]);
            feedback.innerHTML = `<p style="color:green; margin-top:15px; font-weight:600;">Authorized. Transferring system control routing state context...</p>`;
            setTimeout(() => { window.location.href = "dashboard.html"; }, 1000);
        });
    }
}

// 4. SCHOLAR CONTROL HUB CONSOLE ENGINE
function runDashboardEngine() {
    const welcome = document.getElementById("dashboardWelcome");
    if (!welcome) return;
    const sessionIdentity = localStorage.getItem("portalUser") || "Academic Scholar Instance";
    welcome.innerHTML = `Welcome Back, <span>${sessionIdentity}</span>!`;
}

// 5. SECURE COMMUNICATIONS SUPPORT ENGINE
function runContactEngine() {
    const form = document.getElementById("contactForm");
    const feedback = document.getElementById("contactFeedback");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            feedback.innerHTML = `<p style="color:green; font-weight:600; margin-top:15px;">System notification: Secure transmission token successfully dispatched.</p>`;
            form.reset();
        });
    }
}

// 6. LOCAL REVIEWS LOGIC PERSISTENCE ENGINE
function runFeedbackEngine() {
    const form = document.getElementById("feedbackForm");
    const feedContainer = document.getElementById("localFeedbackList");

    const refreshFeedDisplay = () => {
        if (!feedContainer) return;
        const currentDataArray = JSON.parse(localStorage.getItem("portalFeedbacks")) || [];
        
        if (currentDataArray.length === 0) {
            feedContainer.innerHTML = `<p style="color:#777; font-size:0.9rem;">No feedback arrays found in local browser state memory.</p>`;
            return;
        }

        feedContainer.innerHTML = "";
        currentDataArray.forEach(item => {
            feedContainer.innerHTML += `
                <div style="border-bottom: 1px solid #ddd; padding-bottom:15px; margin-bottom:15px;">
                    <div style="display:flex; justify-content:space-between; font-weight:bold; color:var(--primary-green);">
                        <span>👤 ${item.user}</span>
                        <span style="color:var(--accent-orange);">Score: ${item.rating}/5</span>
                    </div>
                    <p style="margin-top:5px; font-size:0.9rem; color:#444;">${item.comment}</p>
                </div>`;
        });
    };

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const rating = document.getElementById("ratingSelect").value;
            const comment = document.getElementById("commentText").value.trim();
            const user = localStorage.getItem("portalUser") || "Anonymous Scholar";

            const dataLog = JSON.parse(localStorage.getItem("portalFeedbacks")) || [];
            dataLog.push({ user, rating, comment });
            localStorage.setItem("portalFeedbacks", JSON.stringify(dataLog));

            form.reset();
            refreshFeedDisplay();
        });
    }

    refreshFeedDisplay();
}