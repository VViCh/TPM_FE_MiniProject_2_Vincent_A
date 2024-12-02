function _id(id){
    return document.getElementById(id)
}

function _class(className){
    return document.getElementsByClassName(className)
}

const inputSkill = _id("skill-input")
const addButton = _id("add-button")
const skillGallery = _id("skill-gallery")
addButton.addEventListener("click", addSkill)

const skillList = JSON.parse(localStorage.getItem("skillData")) ?? [];

function setChecked(id, checked){
    skillList.forEach(function(skill){
        if(skill.id === id){
            skill.checked = checked;
        }
    })
    updateGallery()
    saveSkill()
}

function toggleButton(button){
    button.classList.toggle("active")
}

function generateSkill(skill){
    const skillBubble = document.createElement('div')
    skillBubble.className = 'skill'
    skillBubble.id = `skill-${skill.id}`
    skillBubble.innerHTML = `
        <div class="skill-bubble">
            <p class="${skill}" id="skill-${skill.id}">${skill.skill}</p>
            <button class="delete-button" id="delete-button-${skill.id}">
                ×
            </button>
        </div>
    `
    skillGallery.append(skillBubble)

    const deleteButton = _id(`delete-button-${skill.id}`)
    deleteButton.addEventListener("click", () => removeSkill(skill.id))

    return skillBubble
}

function updateGallery(list = skillList){
    skillGallery.innerHTML = ""
    skillList.forEach(skill => {
        skillGallery.append(generateSkill(skill))
    })
}

function saveSkill() {
    localStorage.setItem('skillData', JSON.stringify(skillList))
}

function addSkill(){
    const title = inputSkill.value
    if(title.length === 0) return

    const newSkill = {
        id: crypto.randomUUID(),
        skill: title
    }

    skillList.push(newSkill)
    updateGallery()
    saveSkill()

    inputSkill.value = ""
}

function removeSkill(id){
    const index = skillList.findIndex((skill) => skill.id == id)
    const removed = skillList.splice(index, 1)
    _id(`skill-${id}`).remove();
    saveSkill()
}

updateGallery()
