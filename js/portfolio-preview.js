
//=============Current Year================
const previewYear = document.getElementById("preview-year");

previewYear.textContent = new Date().getFullYear();



//================ Navbar =================

//============= Navbar Elements ============

const portfolioNavLinks = document.querySelectorAll(".portfolio-nav a");

//============= Smooth Scroll ==============

portfolioNavLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {
        event.preventDefault();
        const targetId = link.getAttribute("href");
        const targetSection = document.querySelector(targetId);
        if (!targetSection) {
            return;
        }
        targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});

//============= Sections ==================

const navSectionIds = [
    "home-section",
    "about-section",
    "projects-section",
    "skills-section",
    "experience-section",
    "resume-section",
    "contact-section"
];

const navSections = navSectionIds
    .map(function (id) {
        return document.getElementById(id);
    })
    .filter(Boolean);


//============= Active Navigation =========

function updateActiveNav() {

    let currentSection = "";

    navSections.forEach(function (section) {

        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 180) {
            currentSection = section.id;
        }

    });


    portfolioNavLinks.forEach(function (link) {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {
            link.classList.add("active");
        }

    });

}


//============= Scroll Event ==============

window.addEventListener(
    "scroll",
    updateActiveNav
);


//============= Initial Active Link =======

updateActiveNav();


//================ Theme Switcher ====================

//================ Theme Elements ====================

const previewThemeBtn = document.getElementById("preview-theme-btn");

const previewThemeIcon = document.getElementById("preview-theme-icon");


//================ Apply Theme =======================

function applyPreviewTheme(theme) {

    if (theme === "dark") {
        document.body.classList.add("dark-theme");
        previewThemeIcon.classList.remove("ri-sun-line");
        previewThemeIcon.classList.add("ri-moon-line");

    } else {
       document.body.classList.remove("dark-theme");
        previewThemeIcon.classList.remove("ri-moon-line");
        previewThemeIcon.classList.add("ri-sun-line");
    }
}


//================ Load Theme ========================

function loadPreviewTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        applyPreviewTheme("dark");
    } else {
        applyPreviewTheme("light");
    }

}


//================ Toggle Theme ======================

previewThemeBtn.addEventListener("click", function () {
    const isDark = document.body.classList.contains("dark-theme");
    if (isDark) {
        applyPreviewTheme("light");

    } else {
        applyPreviewTheme("dark");
    }
});

//================ Initialize Theme ==================
loadPreviewTheme();





//===============Hero (About) Section==============

//=============About Data==================
const previewName = document.getElementById("preview-name");
const previewTitle = document.getElementById("preview-title");
const previewDescription = document.getElementById("preview-description");
const previewProfileImage = document.getElementById("preview-profile-image");

//============Load About Data=============
function loadPreviewAbout() {

    const savedAbout = localStorage.getItem("aboutData");

    if (!savedAbout) {
        return;
    }

    const aboutData = JSON.parse(savedAbout);

    previewName.textContent = aboutData.fullName;
    previewTitle.textContent = aboutData.profession;
    previewDescription.textContent = aboutData.bio;

//============Profile Image================
    const savedImage = localStorage.getItem("profileImage");

    if (savedImage) {
        previewProfileImage.src = savedImage;
    } else {
        previewProfileImage.style.display = "none";
    }
}
//===============Initialize About=============
loadPreviewAbout();



//================Header and Footer Name================
const previewLogoName = document.getElementById("preview-logo-name");
const footerName = document.getElementById("footer-name");

function loadPreviewName() {

    const savedAbout = localStorage.getItem("aboutData");

    if (!savedAbout) {
        return;
    }

    const aboutData = JSON.parse(savedAbout);

    previewLogoName.textContent = aboutData.fullName;
    footerName.textContent = aboutData.fullName;
}

loadPreviewName();






//=====================Statistics Section====================
const projectCount = document.getElementById("project-count");
const experienceCount = document.getElementById("experience-count");
const skillCount = document.getElementById("skill-count");
const technologyCount = document.getElementById("technology-count");


function loadStatistics() {

    //===========Projects=========
    const savedProjects = localStorage.getItem("projects");

    const projects = savedProjects
        ? JSON.parse(savedProjects)
        : [];


   //============Experiences======
    const savedExperiences = localStorage.getItem("experiences");

    const experiences = savedExperiences
        ? JSON.parse(savedExperiences)
        : [];


    //============Skills============
    const savedSkills = localStorage.getItem("skills");

    const skills = savedSkills
        ? JSON.parse(savedSkills)
        : [];


    //============Technologies==========
    const technologies = new Set();

    projects.forEach(function (project) {

        if (Array.isArray(project.technologies)) {

            project.technologies.forEach(function (technology) {
                technologies.add(technology.trim());
            });

        }

    });


    //============Display Staistics=========
    projectCount.textContent = `${projects.length}+`;

    experienceCount.textContent = `${experiences.length}+`;

    skillCount.textContent = `${skills.length}+`;

    technologyCount.textContent = `${technologies.size}+`;
}
//=============Initialize Staistics==============
loadStatistics();





//=================About Me Section Js =======================

const previewAboutDescription = document.getElementById("preview-about-description");

function loadPreviewAboutSection() {

    const savedAbout = localStorage.getItem("aboutData");

    if (!savedAbout) {
        return;
    }

    const aboutData = JSON.parse(savedAbout);

    previewAboutDescription.textContent = aboutData.bio;
}
//==========Initialize About Me
loadPreviewAboutSection();






//==============Projects Section===============

const previewProjectsGrid = document.getElementById("preview-projects-grid");


function loadPreviewProjects() {

    const savedProjects = localStorage.getItem("projects");

    if (!savedProjects) {
        return;
    }

    const projects = JSON.parse(savedProjects);

    previewProjectsGrid.innerHTML = "";


    projects.forEach(function (project) {

        const projectCard = document.createElement("div");

        projectCard.className = "project-card";

        const technologies = Array.isArray(project.technologies)
            ? project.technologies
            : project.technologies.split(",");

        const technologiesHTML = technologies
            .map(function (technology) {

                return `<span>${technology.trim()}</span>`;

            })
            .join("");


        projectCard.innerHTML = `

            <img src="${project.image}" alt="${project.title}" class="project-card-image" >

            <div class="project-card-content">

                <h3>${project.title}</h3>

                <div class="project-tech-stack">
                    ${technologiesHTML}
                </div>

                <p>${project.discription}</p>

                <div class="project-links">

                    <a href="${project.github}" target="_blank" rel="noopener noreferrer">
                        <i class="ri-github-fill"></i>
                    </a>

                    ${
                        project.liveDemo
                        ? `<a  href="${project.liveDemo}" target="_blank" rel="noopener noreferrer" >
                                <i class="ri-global-line"></i>
                            </a>`: ""
                    }

                </div>

            </div>
        `;


        previewProjectsGrid.appendChild(projectCard);

    });
}

//==========Initialize Projects================
loadPreviewProjects();









//================ Skills Section =================

const previewSkillsGrid = document.getElementById("preview-skills-grid");

//============= Load Skills =======================
function loadPreviewSkills() {

    const savedSkills = localStorage.getItem("skills");

    if (!savedSkills) {
        return;
    }

    const skills = JSON.parse(savedSkills);

    previewSkillsGrid.innerHTML = "";

    skills.forEach(function (skill) {

        const skillCard = document.createElement("div");

        skillCard.className = "skill-card";

        skillCard.innerHTML = `

            <div class="skill-card-header">

                <div class="skill-info">

                    <div class="skill-icon">
                        <i class="${skill.icon}"></i>
                    </div>

                    <div>
                        <h3>${skill.name}</h3>
                        <span class="skill-badge">${skill.category}</span>
                    </div>

                </div>

            </div>


            <div class="skill-progress">

                <div class="progress-bar">

                    <div 
                        class="progress-fill" 
                        style="width: ${skill.level}%">
                    </div>

                </div>

                <span class="progress-value">
                    ${skill.level}%
                </span>

            </div>

        `;

        previewSkillsGrid.appendChild(skillCard);

    });
}
//============= Initialize Skills =================
loadPreviewSkills();





//================ Experience Section =================

const previewExperienceContainer = document.getElementById("preview-experience-container");

//================ Load Experiences =================
function loadPreviewExperiences() {

    const savedExperiences = localStorage.getItem("experiences");

    if (!savedExperiences) {
        return;
    }

    const experiences = JSON.parse(savedExperiences);

    previewExperienceContainer.innerHTML = "";


    experiences.forEach(function (experience) {

        const experienceCard =
            document.createElement("div");

        experienceCard.className = "experience-card";

        experienceCard.innerHTML = `

            <div class="experience-card-header">

                <div class="experience-details">

                    <h3>${experience.company}</h3>

                    <h4>${experience.position}</h4>

                    <span>${experience.duration}</span>

                </div>

            </div>

            <p class="experience-text">
                ${experience.description}
            </p>

        `;

        previewExperienceContainer.appendChild(experienceCard);

    });
}
//================ Initialize Experience =================
loadPreviewExperiences();





//================ Resume Section ===========================

const previewDownloadResumeBtn = document.getElementById("preview-download-resume-btn");

//================ Download Resume =================

previewDownloadResumeBtn.addEventListener("click", function (event) {

    event.preventDefault();

    const savedResume = localStorage.getItem("resumeData");

    if (!savedResume) {
        alert("Resume is not available.");
        return;
    }
    const resumeData = JSON.parse(savedResume);

    //=========== Uploaded PDF ===========
    if (resumeData.type === "file") {

        const downloadLink = document.createElement("a");
        downloadLink.href = resumeData.data;
        downloadLink.download = resumeData.name || "Resume.pdf";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    //=========== Resume URL ===========
    else if (resumeData.type === "link") {
        window.open(resumeData.data, "_blank");
    }

});





//================== Contact Preview Section ====================

const previewContactEmail = document.getElementById("preview-contact-email");

const previewContactPhone = document.getElementById("preview-contact-phone");

const previewContactLocation = document.getElementById("preview-contact-location");

//================== Load Contact Data ==========================

function loadPreviewContact() {

    const savedContact = localStorage.getItem("contactData");

    if (!savedContact) {
        return;
    }

    const contactData = JSON.parse(savedContact);


    //================ Email =================

    previewContactEmail.textContent =
        contactData.email;

    previewContactEmail.href =
        `mailto:${contactData.email}`;

    //================ Phone =================

    previewContactPhone.textContent =
        contactData.phone;

    previewContactPhone.href =
        `tel:${contactData.phone}`;

    //================ Location ==============

    previewContactLocation.textContent =
        contactData.location;

}
//================ Initialize Contact =================

loadPreviewContact();