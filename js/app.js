const fillTable = () => {

    let num = 0

    let tbody = document.querySelector(".body-table")
    let charprofile = document.querySelector(".character-profile")
    let characterInfo = document.querySelector("#info")
    let character = document.querySelector("#character")
    let status = document.querySelector("#status")
    let gender = document.querySelector("#gender")
    let species = document.querySelector("#species")
    let origin = document.querySelector("#origin")
    let buttons

    fetch(`https://rickandmortyapi.com/api/character`)
    .then(res => res.json())
    .then(data => {

        let filtered = filter(character, status, gender, species, origin, data)

        let rowData = filtered?.map(item => {
            num++
            return `<tr>
                <td>${num}</td>
                <td>${item.name}</td>
                <td>${item.status}</td>
                <td>${item.species}</td>
                <td>${item.gender}</td>
                <td>${item.origin.name}</td>
                <td>
                    <i class='bx bx-log-in-circle btn' style="color: #646464"></i>
                </td>
            </tr>`
        }).join('')

        tbody.innerHTML = rowData

        buttons = tbody.querySelectorAll(".btn")

        for(var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", (e) => {
                let row = e.target.parentNode.parentNode
                let text = createProfile(row, filtered)
                charprofile.innerHTML = text
                characterInfo.innerHTML = "Character Info"
                window.location.href = "#info"
            })
        }
    })

}

const createProfile = (dataRow, data) => {

    data = data.filter(item => item.name == dataRow.cells[1].innerText)

    let image
    let name
    let status
    let species
    let gender
    let origin

    data.map(item => {
        name = item.name
        status = item.status 
        species = item.species 
        gender = item.gender 
        origin = item.origin 
        image = item.image
    })

    let profileData = () => {
        return `<div class="picture">
                <img src="${image}">
            </div>
            <div class="profile">
                <p>Name<br>
                <b>${name}</b><br><br></p>
                <p>Species<br>
                <b>${species}</b><br><br></p>
                <p>Status<br>
                <b>${status}</b><br><br></p>
                <p>Gender<br>
                <b>${gender}</b><br><br></p>
                <p>Origin<br>
                <b>${origin.name}</b></p>
            </div>
        `
    }

    return profileData()
}

const filter = (character, status, gender, species, origin, data) => {
    let filteredData = data.results

    if(dataFilter(character)){
        filteredData = filteredData.filter(item => item.name == character.value)
    }
    if(dataFilter(status)){
        filteredData = filteredData.filter(item => item.status == status.value)
    }
    if(dataFilter(gender)){
        filteredData = filteredData.filter(item => item.gender == gender.value)
    }
    if(dataFilter(species)){
        filteredData = filteredData.filter(item => item.species == species.value)
    }
    if(dataFilter(origin)){
        filteredData = filteredData.filter(item => item.origin.name == origin.value)
    }
    return filteredData
}

const dataFilter = (value) => {
    if(value.value != "" && value.value != "Choose gender" && value.value != "Choose status"){
        return true
    }
}