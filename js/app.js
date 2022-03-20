const fillTable = () => {

    let num = 0

    let tbody = document.querySelector(".body-table")
    let character = document.querySelector("#character")
    let status = document.querySelector("#status")
    let gender = document.querySelector("#gender")
    let species = document.querySelector("#species")
    let origin = document.querySelector("#origin")

    fetch("https://rickandmortyapi.com/api/character")
    .then(res => res.json())
    .then(data => {

        let rowData = data.results.map(item => {
            if(character.value == item.nam || status.value == item.status || species.value == item.species || gender.value == item.gender || origin.value == item.origin) {
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