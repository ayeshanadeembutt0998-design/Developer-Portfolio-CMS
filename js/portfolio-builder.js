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

//=============About Event====================
saveAboutBtn.addEventListener("click", saveAbout);
profileImageInput.addEventListener("change", uploadProfileImage);
changeImageBtn.addEventListener("click", openFilePicker);

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
    if(!emailPattern.test(aboutData.email)){
        alert("Please enter a valid email");
        return;
    }

    const urlPattern = /^(https?:\/\/)?(www\.)?[\w.-]+\.[a-z]{2,}(\/.*)?$/i;
    if(!urlPattern.test(aboutData.github)||!urlPattern.test(aboutData.linkedin)) {
        alert("Please enter valid URLs ");
        return;
    }

    localStorage.setItem("aboutData", JSON.stringify(aboutData));
    alert("About information saved successfully!")
}

function uploadProfileImage() {
    const file = profileImageInput.files[0];
    if (!file) {
        return
    }

    // Image type validation
    if(!file.type.startsWith("image/")){
        alert("Please select an image file");
        return;
    }

    // Image Size validation
    if(file.size > 2*1024*1024) {
        alert("Image size must be less than 2MB");
        return;
    }

    const reader = new FileReader();
    reader.onload = function () {
        profileImage.src = reader.result;

        // Save image in localStorage
        localStorage.setItem("profileImage", reader.result)
    };
    reader.readAsDataURL(file);
}
function openFilePicker() {
    profileImageInput.click();
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
        profileImage.src = savedImage
    }
}
loadAbout();







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
saveProjectBtn.addEventListener("click",saveProject);
projectImageInput.addEventListener("change",uploadProjectImage);

projectUploadArea.addEventListener("click",openProjectFilePicker);


//==================Save Project=================
function saveProject () {

    const projectData = {
        title : projectTitleInput.value.trim(),
        technologies : technologiesInput.value.trim(),
        github : githubLinkInput.value.trim(),
        liveDemo : liveDemoInput.value.trim(),
        discription : projectDiscriptionInput.value.trim(),
        image : projectImageData
    };

    if(!projectData.title || !projectData.technologies || !projectData.github || !projectData.discription) {
        alert("Please fill in all required fields.");
        return;
    }

     const urlPattern = /^(https?:\/\/)?(www\.)?[\w.-]+\.[a-z]{2,}(\/.*)?$/i;
    if(!urlPattern.test(projectData.github)) {
        alert("Please enter a valid GitHub URL. ");
        return;
    }
    if(projectData.liveDemo && !urlPattern.test(projectData.liveDemo)) {
        alert("Please enter a valid liveDemo URL.");
        return;
    }

    if(!projectImageData) {
        alert("Please select a project image.");
        return;
    }

    if(editingProjectIndex !== null) {
        projects[editingProjectIndex] = projectData;
        editingProjectIndex = null;
    }
    else {
        projects.push(projectData);
    }

    
    localStorage.setItem("projects",JSON.stringify(projects));
    displayProjects();
    resetProjectForm();
}


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
function openProjectFilePicker () {
    projectImageInput.click();
}

//==================Upload Project Image=============
function uploadProjectImage () {

    const file = projectImageInput.files[0];

    if(!file) {
        return;
    }
    if(!file.type.startsWith("image/")) {
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
function loadProjects () {
    const savedProjects = localStorage.getItem("projects");
    if(!savedProjects) {
        return;
    }
    projects = JSON.parse(savedProjects);
}
loadProjects();
displayProjects();

//===========Display Projects===========
function displayProjects () {

    projectsGrid.innerHTML = "";

    projects.forEach(function (project,index) {

        const projectCard = document.createElement("div");

        projectCard.className = "project-card";
        projectCard.dataset.index = index;

        projectCard.innerHTML = `<img src = "${project.image}" alt = "${project.title}" class = "project-card-image" >
        <div class = "project-card-content" >
            <h3>${project.title}</h3>
            <div class = "project-tech-stack" >
                <span>${project.technologies}</span>
            </div>
            <p>${project.discription}</p>
            <div class = "project-links">
                <a href = "${project.github}" target = "_blank">
                    <i class = "ri-github-fill"></i>
                </a>
                
                ${project.liveDemo ? `<a href = "${project.liveDemo}" target = "_blank">
                                            <i class = "ri-global-line"></i>
                                            </a>` : ""}
                                            
                </div>
                <div class = "project-actions">
                    <button class = "edit-project-btn">
                        <i class = "ri-pencil-line"></i>
                            Edit
                    </button>
                    <button class = "delete-project-btn">
                        <i class = "ri-delete-bin-6-line"></i>
                            Delete
                    </button>
                </div>
            </div>`;

            const editBtn = projectCard.querySelector(".edit-project-btn");
            editBtn.addEventListener("click",function(){
                editProject(index);
            })


            const deleteBtn = projectCard.querySelector(".delete-project-btn");

            deleteBtn.addEventListener("click",function(){
                const index = projectCard.dataset.index;
                projects.splice(index,1);
                localStorage.setItem("projects",JSON.stringify(projects));
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
skillLevelInput.addEventListener("input",function(){
    skillLevelValue.textContent = `${skillLevelInput.value}%`;
});

addSkillBtn.addEventListener("click",saveSkill);


//====Save Skill======
function saveSkill() {
    const skillData = {
        name : skillNameInput.value.trim(),
        category : skillCategoryInput.value.trim(),
        level : Number(skillLevelInput.value),
        icon : skillIconInput.value.trim()
    };
    if(!skillData.name || !skillData.category || !skillData.category || skillData.category == "Select Category" || skillData.level < 0 || skillData.level > 100){
        alert("Please fill in all required fields correctly.");
        return;
    }
    if(editingSkillIndex !== null) {
        skills[editingSkillIndex] = skillData;
        editingSkillIndex = null;
    }
    else {
        skills.push(skillData);
    }
    localStorage.setItem("skills",JSON.stringify(skills));
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
function displaySkills () {

    skillsGrid.innerHTML = "";

    skills.forEach(function(skill,index) {
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
        editBtn.addEventListener("click",function() {
            editSkill(index);
        });

        const deleteBtn = skillCard.querySelector(".delete-btn");
        deleteBtn.addEventListener("click",function () {
            const index = skillCard.dataset.index;
            skills.splice(index,1);
            localStorage.setItem("skills",JSON.stringify(skills));
            displaySkills();
        });

        skillsGrid.appendChild(skillCard);
    })
}

//===========Load Skills=============
function loadSkills () {
    const savedSkills = localStorage.getItem("skills");
    if(!savedSkills) {
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