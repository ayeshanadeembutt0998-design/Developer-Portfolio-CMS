// ============ Sidebar Navigation ============

// Sidebar navigation buttons
const navItems = document.querySelectorAll(".sidebar-nav .nav-item[data-section]");

// Function to show selected section
function showSection(sectionName) {

    // Remove active class from all sidebar buttons
    navItems.forEach(function (navItem) {
        navItem.classList.remove("active");
    });

    // Hide every portfolio section
    document.getElementById("about-section").style.display = "none";
    document.getElementById("projects-section").style.display = "none";
    document.getElementById("skills-section").style.display = "none";
    document.getElementById("experience-section").style.display = "none";
    document.getElementById("resume-section").style.display = "none";
    document.getElementById("contact-section").style.display = "none";


    // Add active class to clicked navigation button
    const activeNavItem = document.querySelector(`.sidebar-nav .nav-item[data-section="${sectionName}"]`);

    if (activeNavItem) {
        activeNavItem.classList.add("active");
    }

    // Show the selected section
    const selectedSection = document.getElementById( `${sectionName}-section`);

    if (selectedSection) {
        selectedSection.style.display = "block";
    }
}

// Navigation button click
navItems.forEach(function (navItem) {

    navItem.addEventListener("click", function () {

        const sectionName = navItem.dataset.section;

        showSection(sectionName);

    });

});
// ============ Default Section ============

// About Me is shown by default
showSection("about");



// ============ Theme Switcher ============

const themeSwitcherBtn = document.getElementById("theme-switcher-btn");
const themeIcon = themeSwitcherBtn.querySelector(".theme-icon");

themeSwitcherBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");
    if (document.body.classList.contains("dark-theme")) {
        // Dark theme → Moon icon
        themeIcon.classList.remove("ri-sun-line");
        themeIcon.classList.add("ri-moon-line");
    } else {
        // Light theme → Sun icon
        themeIcon.classList.remove("ri-moon-line");
        themeIcon.classList.add("ri-sun-line");
    }
});



// ============ Reset Portfolio ============

const resetPortfolioBtn = document.getElementById("reset-portfolio-btn");

resetPortfolioBtn.addEventListener("click", function () {
    const confirmReset = confirm(
        "Are you sure you want to reset your portfolio? All saved portfolio data will be deleted."
    );
    if (!confirmReset) {
        return;
    }
    // Remove portfolio data
    localStorage.removeItem("aboutData");
    localStorage.removeItem("profileImage");
    localStorage.removeItem("projects");
    localStorage.removeItem("skills");
    localStorage.removeItem("experiences");
    localStorage.removeItem("contactData");
    localStorage.removeItem("resumeData");
    // Reload the dashboard
    location.reload();
});




//============About Section Js=============

//============About Elements===============

const fullNameInput = document.getElementById("full-name");
const professionInput = document.getElementById("profession");
const bioInput = document.getElementById("bio");
const githubInput = document.getElementById("github");
const linkedinInput = document.getElementById("linkedin");
const emailInput = document.getElementById("email");
const saveAboutBtn = document.getElementById("save-about-btn");

const profileImage = document.querySelector(".profile-image-wrapper img");
const profileImageInput = document.getElementById("profile-image-input");
const changeImageBtn = document.querySelector(".change-image-btn");
const profileImagePlaceholder = document.querySelector(".profile-image-placeholder");

//=============About Event====================
saveAboutBtn.addEventListener("click", saveAbout);
changeImageBtn.addEventListener("click", openFilePicker);
profileImageInput.addEventListener("change", uploadProfileImage);

//==============Save about data================
function saveAbout() {
    const aboutData = {
        fullName: fullNameInput.value.trim(),
        profession: professionInput.value.trim(),
        bio: bioInput.value.trim(),
        github: githubInput.value.trim(),
        linkedin: linkedinInput.value.trim(),
        email: emailInput.value.trim()
    };

    if (!aboutData.fullName || !aboutData.profession || !aboutData.bio || !aboutData.github || !aboutData.linkedin || !aboutData.email) {
        alert("Please fill in all fields.");
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(aboutData.email)) {
        alert("Please enter a valid email");
        return;
    }

    const urlPattern = /^(https?:\/\/)?(www\.)?[\w.-]+\.[a-z]{2,}(\/.*)?$/i;
    if (!urlPattern.test(aboutData.github) || !urlPattern.test(aboutData.linkedin)) {
        alert("Please enter valid URLs ");
        return;
    }

    localStorage.setItem("aboutData", JSON.stringify(aboutData));
    alert("About information saved successfully!")
}

//==========Open file picker============
function openFilePicker() {
    profileImageInput.click();
}

//===========Upload Image================
function uploadProfileImage() {
    const file = profileImageInput.files[0];
    if (!file) {
        return;
    }

    // Image type validation
    if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
    }

    // Image Size validation
    if (file.size > 2 * 1024 * 1024) {
        alert("Image size must be less than 2MB");
        return;
    }

    const reader = new FileReader();
    reader.onload = function () {
        profileImage.src = reader.result;

        profileImage.style.display = "block";
        profileImagePlaceholder.style.display = "none";
        // Save image in localStorage
        localStorage.setItem("profileImage", reader.result)
    };
    reader.readAsDataURL(file);
}



//=================Load About==================
function loadAbout() {
    const savedAbout = JSON.parse(localStorage.getItem("aboutData"));
    if (!savedAbout) {
        return;
    }
    fullNameInput.value = savedAbout.fullName;
    professionInput.value = savedAbout.profession;
    bioInput.value = savedAbout.bio;
    githubInput.value = savedAbout.github;
    linkedinInput.value = savedAbout.linkedin;
    emailInput.value = savedAbout.email;

    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
        profileImage.src = savedImage;
        profileImage.style.display = "block";

        profileImagePlaceholder.style.display = "none";
    }
    else {
        profileImage.style.display = "none";

        profileImagePlaceholder.style.display = "flex";
    }
}
loadAbout();





//============Projects Section Js============

//============Projects Elements===============

const projectImageInput = document.getElementById("project-image");
const projectTitleInput = document.getElementById("project-title");
const technologiesInput = document.getElementById("technologies");
const githubLinkInput = document.getElementById("github-link");
const liveDemoInput = document.getElementById("live-demo");
const projectDiscriptionInput = document.getElementById("project-discription");

const projectUploadPreview = document.querySelector(".project-upload-preview");
const uploadPlaceholder = document.querySelector(".upload-placeholder");

const saveProjectBtn = document.querySelector(".save-project-btn");
const projectsGrid = document.querySelector(".projects-grid");
const sortProjects = document.getElementById("sort-projects");

const projectUploadArea = document.querySelector(".upload-area");


//=============Projects Data====================
let projects = [];
let projectImageData = "";
let editingProjectIndex = null;

//==================Events======================
saveProjectBtn.addEventListener("click", saveProject);
projectImageInput.addEventListener("change", uploadProjectImage);

projectUploadArea.addEventListener("click", openProjectFilePicker);


//==================Save Project=================
function saveProject() {

    const projectData = {
        title: projectTitleInput.value.trim(),
        technologies: technologiesInput.value.split(",").map(function (technology) {
            return technology.trim();
        }).filter(function (technology) {
            return technology !== "";
        }),
        github: githubLinkInput.value.trim(),
        liveDemo: liveDemoInput.value.trim(),
        discription: projectDiscriptionInput.value.trim(),
        image: projectImageData
    };

    if (!projectData.title || projectData.technologies.length === 0 || !projectData.github || !projectData.discription) {
        alert("Please fill in all required fields.");
        return;
    }

    const urlPattern = /^(https?:\/\/)?(www\.)?[\w.-]+\.[a-z]{2,}(\/.*)?$/i;
    if (!urlPattern.test(projectData.github)) {
        alert("Please enter a valid GitHub URL. ");
        return;
    }
    if (projectData.liveDemo && !urlPattern.test(projectData.liveDemo)) {
        alert("Please enter a valid liveDemo URL.");
        return;
    }

    if (!projectImageData) {
        alert("Please select a project image.");
        return;
    }

    if (editingProjectIndex !== null) {
        projects[editingProjectIndex] = projectData;
        editingProjectIndex = null;
    }
    else {
        projects.push(projectData);
    }


    localStorage.setItem("projects", JSON.stringify(projects));
    displayProjects();
    resetProjectForm();
}

//========Reset the form after saving project=========
function resetProjectForm() {
    projectTitleInput.value = "";
    technologiesInput.value = "";
    githubLinkInput.value = "";
    liveDemoInput.value = "";
    projectDiscriptionInput.value = "";

    projectImageData = "";

    projectImageInput.value = "";

    projectUploadPreview.src = "";
    projectUploadPreview.style.display = "none";

    uploadPlaceholder.style.display = "";

    projectUploadArea.style.border = "";
}



//================Open Project file picker==========
function openProjectFilePicker() {
    projectImageInput.click();
}

//==================Upload Project Image=============
function uploadProjectImage() {

    const file = projectImageInput.files[0];

    if (!file) {
        return;
    }
    if (!file.type.startsWith("image/")) {
        alert("Please select an image file.");
        return;
    }
    if (file.size > 2 * 1024 * 1024) {
        alert("Image size must be less than 2MB.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function () {
        projectImageData = reader.result;
        projectUploadPreview.src = reader.result;
        projectUploadPreview.style.display = "block";
        uploadPlaceholder.style.display = "none";
        projectUploadArea.style.border = "2px solid var(--accent-color)";
    }
    reader.readAsDataURL(file);
}

//============Load Projects===========
function loadProjects() {
    const savedProjects = localStorage.getItem("projects");
    if (!savedProjects) {
        return;
    }
    projects = JSON.parse(savedProjects);
}
loadProjects();
displayProjects();

//===========Display Projects===========

function displayProjects() {

    projectsGrid.innerHTML = "";

    projects.forEach(function (project, index) {

        const technologies = Array.isArray(project.technologies)
            ? project.technologies
            : project.technologies.split(",");

        const technologiesHTML = technologies
            .map(function (technology) {
                return `<span>${technology.trim()}</span>`;
            })
            .join("");

        const projectCard = document.createElement("div");

        projectCard.className = "project-card";
        projectCard.dataset.index = index;

        projectCard.innerHTML = `
            <img src="${project.image}" 
                 alt="${project.title}" 
                 class="project-card-image">

            <div class="project-card-content">

                <h3>${project.title}</h3>

                <div class="project-tech-stack">
                    ${technologiesHTML}
                </div>

                <p>${project.discription}</p>

                <div class="project-links">
                    <a href="${project.github}" target="_blank">
                        <i class="ri-github-fill"></i>
                    </a>

                    ${project.liveDemo ? `
                        <a href="${project.liveDemo}" target="_blank">
                            <i class="ri-global-line"></i>
                        </a>
                    ` : ""}
                </div>

                <div class="project-actions">
                    <button class="edit-project-btn">
                        <i class="ri-pencil-line"></i>
                        Edit
                    </button>

                    <button class="delete-project-btn">
                        <i class="ri-delete-bin-6-line"></i>
                        Delete
                    </button>
                </div>

            </div>
        `;

        const editBtn = projectCard.querySelector(".edit-project-btn");

        editBtn.addEventListener("click", function () {
            editProject(index);
        });

        const deleteBtn = projectCard.querySelector(".delete-project-btn");

        deleteBtn.addEventListener("click", function () {
            const index = projectCard.dataset.index;

            projects.splice(index, 1);

            localStorage.setItem("projects", JSON.stringify(projects));

            displayProjects();
        });

        projectsGrid.appendChild(projectCard);
    });
}

function editProject(index) {
    const project = projects[index];

    editingProjectIndex = index;

    projectTitleInput.value = project.title;
    technologiesInput.value = project.technologies;
    githubLinkInput.value = project.github;
    liveDemoInput.value = project.liveDemo;
    projectDiscriptionInput.value = project.discription;

    projectImageData = project.image;

    projectUploadPreview.src = project.image;
    projectUploadPreview.style.display = "block";
    uploadPlaceholder.style.display = "none";
    projectUploadArea.style.border = "2px solid var(--accent-color)";
}








//================Skills Elements=====================
const skillNameInput = document.getElementById("skill-name");
const skillCategoryInput = document.getElementById("skill-category");
const skillLevelInput = document.getElementById("skill-level");
const skillIconInput = document.getElementById("skill-icon");
const skillLevelValue = document.querySelector(".range-value");

const addSkillBtn = document.querySelector(".skills-button-container .primary-btn");

const skillsGrid = document.querySelector(".skills-grid");
const sortSkills = document.getElementById("sort-skills");


//======================Skills Data=====================
let skills = [];
let editingSkillIndex = null;


//======================Skill Events=====================
skillLevelInput.addEventListener("input", function () {
    skillLevelValue.textContent = `${skillLevelInput.value}%`;
});

addSkillBtn.addEventListener("click", saveSkill);


//====Save Skill======
function saveSkill() {
    const skillData = {
        name: skillNameInput.value.trim(),
        category: skillCategoryInput.value.trim(),
        level: Number(skillLevelInput.value),
        icon: skillIconInput.value.trim()
    };
    if (!skillData.name || !skillData.category || !skillData.category || skillData.category == "Select Category" || skillData.level < 0 || skillData.level > 100) {
        alert("Please fill in all required fields correctly.");
        return;
    }
    if (editingSkillIndex !== null) {
        skills[editingSkillIndex] = skillData;
        editingSkillIndex = null;
    }
    else {
        skills.push(skillData);
    }
    localStorage.setItem("skills", JSON.stringify(skills));
    displaySkills();
    resetSkillForm();
}

//==============Reset Form=================
function resetSkillForm() {
    skillNameInput.value = "";

    skillCategoryInput.selectedIndex = 0;

    skillLevelInput.value = 70;
    skillLevelValue.textContent = "70%";

    skillIconInput.value = "";

    editingSkillIndex = null;
}


//======Display Skill======
function displaySkills() {

    skillsGrid.innerHTML = "";

    skills.forEach(function (skill, index) {
        const skillCard = document.createElement("div");

        skillCard.className = "skill-card";
        skillCard.dataset.index = index;
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

                <div class="skill-actions">

                    <button class="edit-btn">
                        <i class="ri-edit-2-line"></i>
                    </button>

                    <button class="delete-btn">
                        <i class="ri-delete-bin-6-line"></i>
                    </button>

                </div>

            </div>

            <div class="skill-progress">

                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${skill.level}%"></div>
                </div>

                <span class="progress-value">${skill.level}%</span>

            </div>
        `;

        const editBtn = skillCard.querySelector(".edit-btn");
        editBtn.addEventListener("click", function () {
            editSkill(index);
        });

        const deleteBtn = skillCard.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", function () {
            const index = skillCard.dataset.index;
            skills.splice(index, 1);
            localStorage.setItem("skills", JSON.stringify(skills));
            displaySkills();
        });

        skillsGrid.appendChild(skillCard);
    })
}

//===========Load Skills=============
function loadSkills() {
    const savedSkills = localStorage.getItem("skills");
    if (!savedSkills) {
        return;
    }
    skills = JSON.parse(savedSkills);
}
loadSkills();
displaySkills();

function editSkill(index) {

    const skill = skills[index];

    editingSkillIndex = index;

    skillNameInput.value = skill.name;
    skillCategoryInput.value = skill.category;
    skillLevelInput.value = skill.level;
    skillIconInput.value = skill.icon;

    skillLevelValue.textContent = `${skill.level}%`;
}





//===============Experience Section===================


//================ Experience Elements =================

const companyInput = document.getElementById("company");
const positionInput = document.getElementById("position");
const durationInput = document.getElementById("duration");
const experienceDescriptionInput = document.getElementById("experience-discription");

const saveExperienceBtn = document.getElementById("save-experience-btn");

const experienceListContainer = document.querySelector(".experience-list-container");


//================ Experience Data =================

let experiences = [];
let editingExperienceIndex = null;


//================ Experience Events =================

saveExperienceBtn.addEventListener("click", saveExperience);


//================ Save Experience =================

function saveExperience() {

    const experienceData = {
        company: companyInput.value.trim(),
        position: positionInput.value.trim(),
        duration: durationInput.value.trim(),
        description: experienceDescriptionInput.value.trim()
    };
    if (
        !experienceData.company ||
        !experienceData.position ||
        !experienceData.duration ||
        !experienceData.description
    ) {
        alert("Please fill in all required fields.");
        return;
    }
    //================ Add / Edit =================
    if (editingExperienceIndex !== null) {
        experiences[editingExperienceIndex] = experienceData;
        editingExperienceIndex = null;
    } else {
        experiences.push(experienceData);
    }

    localStorage.setItem("experiences", JSON.stringify(experiences));

    displayExperiences();
    resetExperienceForm();
}


//================ Reset Experience Form =================
function resetExperienceForm() {

    companyInput.value = "";
    positionInput.value = "";
    durationInput.value = "";
    experienceDescriptionInput.value = "";

    editingExperienceIndex = null;
}

//================ Display Experiences =================

function displayExperiences() {

    experienceListContainer.innerHTML = "";

    experiences.forEach(function (experience, index) {

        const experienceCard = document.createElement("div");

        experienceCard.className = "experience-card";

        experienceCard.dataset.index = index;


        experienceCard.innerHTML = `
            <div class="experience-card-header">

                <div class="experience-details">

                    <h3>${experience.company}</h3>

                    <h4>${experience.position}</h4>

                    <span>${experience.duration}</span>

                </div>


                <div class="experience-actions">

                    <button class="experience-edit-btn">
                        <i class="ri-edit-line"></i>
                    </button>

                    <button class="experience-delete-btn">
                        <i class="ri-delete-bin-6-line"></i>
                    </button>

                </div>

            </div>


            <p class="experience-text">
                ${experience.description}
            </p>
        `;


        //================ Edit Button =================
        const editBtn =
            experienceCard.querySelector(".experience-edit-btn");

        editBtn.addEventListener("click", function () {

            editExperience(index);

        });

        //================ Delete Button =================

        const deleteBtn =
            experienceCard.querySelector(".experience-delete-btn");

        deleteBtn.addEventListener("click", function () {

            const index = experienceCard.dataset.index;

            experiences.splice(index, 1);

            localStorage.setItem(
                "experiences",
                JSON.stringify(experiences)
            );

            displayExperiences();

        });


        experienceListContainer.appendChild(experienceCard);

    });
}


//================ Edit Experience =================

function editExperience(index) {

    const experience = experiences[index];

    editingExperienceIndex = index;

    companyInput.value = experience.company;
    positionInput.value = experience.position;
    durationInput.value = experience.duration;
    experienceDescriptionInput.value = experience.description;

}


//================ Load Experiences =================

function loadExperiences() {

    const savedExperiences =
        localStorage.getItem("experiences");

    if (!savedExperiences) {
        return;
    }
    experiences = JSON.parse(savedExperiences);
}

//================ Initial Load =================
loadExperiences();
displayExperiences();






//==================Resume Section=====================

//==================Resume Elements=====================
const resumeFileInput = document.getElementById("resume-file");
const chooseFileBtn = document.getElementById("choose-file-btn");
const resumeLinkInput = document.getElementById("resume-link");
const uploadResumeBtn = document.getElementById("upload-resume-btn");

const resumeCard = document.querySelector(".resume-card");
const currentResumeSection = document.querySelector(".current-resume-section");

const resumePreviewBtn = document.querySelector(".resume-preview-btn");
const resumeDeleteBtn = document.querySelector(".resume-delete-btn");

const downloadResumeBtn = document.querySelector(".download-resume-btn");

const resumeFileName = document.querySelector(".resume-info h3");
const resumeMeta = document.querySelector(".resume-meta");

//===============Resume Data======================
let resumeData = null;


//===============Choose Resume File===============
chooseFileBtn.addEventListener("click", function () {
    resumeFileInput.click();
});

resumeFileInput.addEventListener("change", function () {
    const file = resumeFileInput.files[0];
    if (!file) {
        return;
    }

    //===Validation====
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
        alert("Please select a PDF file.");
        resumeFileInput.value = "";
        return;
    }

    if (file.size > 5 * 1024 * 1024) {
        alert("Resume size must be less than 5MB.");
        resumeFileInput.value = "";
        return;
    }
    const reader = new FileReader();
    reader.onload = function () {
        resumeData = {
            name: file.name,
            size: file.size,
            data: reader.result,
            type: "file"
        };
        localStorage.setItem("resumeData", JSON.stringify(resumeData));
        displayResume();

    }
    reader.readAsDataURL(file);
});


//================ Resume Link =================

uploadResumeBtn.addEventListener("click", function () {
    const resumeLink = resumeLinkInput.value.trim();
    if (!resumeLink) {
        alert("Please enter your resume link.");
        return;
    }
    const urlPattern = /^(https?:\/\/)[^\s]+$/i;
    if (!urlPattern.test(resumeLink)) {
        alert("Please enter a valid resume URL.");
        return;
    }

    resumeData = {
        name: "Resume",
        size: 0,
        data: resumeLink,
        type: "link"
    };

    localStorage.setItem("resumeData", JSON.stringify(resumeData));
});

//================ Load Resume =================

function loadResume() {

    const savedResume = localStorage.getItem("resumeData");
    if (!savedResume) {
        return;
    }
    resumeData = JSON.parse(savedResume);
}
loadResume();
displayResume();

//================ Display Resume =================

function displayResume() {
    if (!resumeData) {
        currentResumeSection.hidden = true;
        return;
    }
    currentResumeSection.hidden = false;
    resumeFileName.textContent = resumeData.name;
    if (resumeData.type === "link") {
        resumeMeta.innerHTML = `
            <span>
                <i class="ri-link"></i>
                Resume Link
            </span>
        `;
    } else {
        const sizeInKB = Math.round(resumeData.size / 1024);
        resumeMeta.innerHTML = `
            <span>
                <i class="ri-file-list-3-line"></i>
                ${sizeInKB} KB
            </span>
        `;
    }
}

//================ Resume Preview =================

resumePreviewBtn.addEventListener("click", function () {
    if (!resumeData) {
        alert("Please upload or add a resume link first.");
        return;
    }
    window.open(resumeData.data, "_blank");
});

//================ Resume Delete =================

resumeDeleteBtn.addEventListener("click", function () {
    if (!resumeData) {
        alert("No resume to delete.");
        return;
    }
    const confirmDelete = confirm("Are you sure you want to delete your resume?");

    if (!confirmDelete) {
        return;
    }
    localStorage.removeItem("resumeData");
    resumeData = null;

    resumeFileInput.value = "";
    resumeLinkInput.value = "";

    displayResume();
    alert("Resume deleted successfully.");
});

//================ Resume Download =================

downloadResumeBtn.addEventListener("click", function () {

    if (!resumeData) {
        alert("Please upload a resume first.");
        return;
    }

    const downloadLink = document.createElement("a");
    downloadLink.href = resumeData.data;
    downloadLink.download = resumeData.name;

    document.body.appendChild(downloadLink);

    downloadLink.click();

    document.body.removeChild(downloadLink);
});






//================== Contact Section =====================

//================== Contact Elements ====================

const contactEmailInput = document.getElementById("contact-email");
const contactPhoneInput = document.getElementById("contact-phone");
const contactLocationInput = document.getElementById("contact-location");
const contactLinkedinInput = document.getElementById("contact-linkedin");
const contactGithubInput = document.getElementById("contact-github");

const saveContactBtn = document.getElementById("save-contact-btn");


//================== Contact Data ========================

let contactData = {
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: ""
};


//================== Contact Events ======================

saveContactBtn.addEventListener("click", saveContact);

//================== Save Contact =========================

function saveContact() {

    const contact = {
        email: contactEmailInput.value.trim(),
        phone: contactPhoneInput.value.trim(),
        location: contactLocationInput.value.trim(),
        linkedin: contactLinkedinInput.value.trim(),
        github: contactGithubInput.value.trim()
    };
    //================ Validation =================

    if (
        !contact.email ||
        !contact.phone ||
        !contact.location ||
        !contact.linkedin ||
        !contact.github
    ) {
        alert("Please fill in all contact fields.");
        return;
    }

    //================ Phone Validation ============
    const phonePattern = /^\d{11}$/;

    if (!phonePattern.test(contact.phone)) {
        alert("Phone number must contain exactly 11 digits.");
        return;
    }
    //================ Email Validation ============

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(contact.email)) {
        alert("Please enter a valid email address.");
        return;
    }
    //================ URL Validation ==============

    const urlPattern = /^(https?:\/\/)?(www\.)?[\w.-]+\.[a-z]{2,}(\/.*)?$/i;
    if (!urlPattern.test(contact.linkedin)) {
        alert("Please enter a valid LinkedIn URL.");
        return;
    }
    if (!urlPattern.test(contact.github)) {
        alert("Please enter a valid GitHub URL.");
        return;
    }

    //================ Save Data ===================

    contactData = contact;
    localStorage.setItem(
        "contactData",
        JSON.stringify(contactData)
    );

    alert("Contact information saved successfully.");
}

//================== Load Contact ========================

function loadContact() {
    const savedContact = localStorage.getItem("contactData");
    if (!savedContact) {
        return;
    }
    contactData = JSON.parse(savedContact);
    displayContact();
}


//================== Display Contact ====================

function displayContact() {
    contactEmailInput.value = contactData.email;
    contactPhoneInput.value = contactData.phone;
    contactLocationInput.value = contactData.location;
    contactLinkedinInput.value = contactData.linkedin;
    contactGithubInput.value = contactData.github;
}

//================== Initialize Contact ==================
loadContact();