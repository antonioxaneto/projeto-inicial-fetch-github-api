import { getUser } from '/src/scripts/services/user.js'
import { getRepositories } from '/src/scripts/services/repositories.js'
import { user } from '/src/scripts/objects/user.js'
import { screen } from '/src/scripts/objects/screen.js'
import { getEvents } from '/src/scripts/services/events.js'

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    if(validateEmptyInput(userName)) return
    getUserProfile(userName)
})

function validateEmptyInput(userName){
if(userName.length === 0){
    alert('Preencha o campo com o nome do usuário do GitHub')
    return true
}
}

document.getElementById('input-search').addEventListener('keyup', (e) => {
   const userName = e.target.value
   const key = e.which || e.keyCode
   const isEnterKeyPressed = key === 13

   if(isEnterKeyPressed){
    if(userName.length === 0){
        alert('Preencha o campo com o nome do usuário do GitHub')
        return
    }
    getUserData(userName)
   }
})

async function getUserData(userName){
   
     const userResponse = await getUser(userName)
     
    if(userResponse.message === "Not Found"){
        screen.renderNotFound()
        return
    }

     const repositoriesResponse = await getRepositories(userName)
     const eventsResponse = await getEvents(userName)

     user.setInfo(userResponse)
     user.setRepositories(repositoriesResponse)
     user.setEvents(eventsResponse)
     
     screen.renderUser(user)
}