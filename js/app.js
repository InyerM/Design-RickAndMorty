const fillTable = () => {

    let num = 0

    let invalid = document.querySelectorAll(".invalid")
    let tbody = document.querySelector(".body-table")
    let character = document.querySelector("#character")
    let status = document.querySelector("#status")
    let gender = document.querySelector("#gender")
    let species = document.querySelector("#species")
    let origin = document.querySelector("#origin")

    if(character.value == "" || status.value == "Choose status" || gender.value == "Choose gender" || species.value == "" || origin.value == ""){
        validate(character, invalid[0])
        validate(status, invalid[1])
        validate(gender, invalid[2])
        validate(species, invalid[3])
        validate(origin, invalid[4])
    }
    else{
        fetch("https://rickandmortyapi.com/api/character")
        .then(res => res.json())
        .then(data => {

            let rowData = data.results.map(item => {
                if(character.value == item.name || status.value == item.status || species.value == item.species || gender.value == item.gender || origin.value == item.origin) {
                    num++
                    return `<tr>
                    <td>${num}</td>
                    <td>${item.name}</td>
                    <td>${item.status}</td>
                    <td>${item.species}</td>
                    <td>${item.gender}</td>
                    <td>${item.origin.name}</td>
                    </tr>`
                }
            }).join('')
            
            tbody.innerHTML = rowData
        })
    }

}

const validate = (field, invalid) => {
    if(field.value == "" || field.value == "Choose status" || field.value == "Choose gender"){
        field.classList.toggle("invalid-option")
        invalid.innerHTML = "Please fill out this field"
    }
    else{
        field.classList.remove("invalid-option")
        invalid.innerHTML = ""
    }
}