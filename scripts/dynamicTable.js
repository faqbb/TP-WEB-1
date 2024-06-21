const apiEndpoint = 'https://6675d4f5a8d2b4d072f19c6b.mockapi.io/web/tp/userExperiences';

async function fetchData() {
    try {
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
            throw new Error(`Error! Estado de respuesta: ${response.status}`);
        }
        const data = await response.json();
        let table = document.getElementById('apiTableBody');
        if(table) {
            data.forEach(item => {
                addRow(item.Destiny, item.Companion, item.Date, table)
            });
        }
    } catch (e) {
        console.log(e);
    }
}

function getDayAndMonth(dateTimeString) {
    const date = new Date(dateTimeString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}-${month}`;
}


function addRow(destiny, companion, date, table) {
    console.log(table)
    const newRow = table.insertRow();
    
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);

    cell1.classList = "tertiaryColor"
    cell1.innerText = destiny;

    cell2.classList = "tertiaryColor";
    cell2.innerText = companion;

    cell3.classList = "tertiaryColor";
    cell3.innerText = getDayAndMonth(date);

    //cell4.innerHTML = '<button onclick="editRow(this)" class="rowButton backgroundPrimary tertiaryColor">Editar</button> <button onclick="deleteRow(this)" class="rowButton backgroundPrimary tertiaryColor">Borrar</button>';
}

function deleteRow(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function editRow(button) {
    const row = button.parentNode.parentNode;
    const cells = row.getElementsByTagName('td');
    
    for (let i = 0; i < cells.length - 1; i++) {
        cells[i].contentEditable = cells[i].contentEditable === "true" ? "false" : "true";
        // metodo put para cells[i].innerText
    }
}

fetchData()