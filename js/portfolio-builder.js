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
