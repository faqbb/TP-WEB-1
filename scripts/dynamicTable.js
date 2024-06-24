
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
                addEditableRow(item.id, item.Destiny, item.Companion, item.Date, table)
            });
        }
    } catch (e) {
        console.log(e);
    }
}


function addEditableRow(id, destiny, companion, date, table) {
    const newRow = table.insertRow();
    
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);

    cell1.classList = "tertiaryColor"
    cell1.innerText = id;

    cell2.classList = "tertiaryColor"
    cell2.innerText = destiny;

    cell3.classList = "tertiaryColor";
    cell3.innerText = companion;

    cell4.classList = "tertiaryColor";
    cell4.innerText = date;

    cell5.innerHTML = '<button onclick="editRow(this)" class="rowButton backgroundPrimary tertiaryColor">Editar</button> <button onclick="deleteRow(this)" class="rowButton backgroundPrimary tertiaryColor">Borrar</button> <button onclick="sendToApi(this)" class="rowButton backgroundPrimary tertiaryColor">Enviar</button>';
}

async function addFromInputs() {
    let destiny = document.getElementById("destinyInput").value
    let companion = document.getElementById("companionInput").value
    let date = document.getElementById("dateInput").value
    let table = document.getElementById('apiTableBody');
    if(table && destiny && companion && date) {
        const data = {
            Destiny: destiny,
            Companion: companion,
            Date: date
        };
        await postToApi(data)
        addEditableRow(data.id, data.Destiny, data.Companion, data.Date, table)
    }
}

async function sendToApi(button) {
    try {
        const row = button.parentNode.parentNode;
        const cell1 = row.cells[0].innerText;
        const cell2 = row.cells[1].innerText;
        const cell3 = row.cells[2].innerText;
        const cell4 = row.cells[3].innerText;
    
        const data = {
            id: cell1,
            Destiny: cell2,
            Companion: cell3,
            Date: cell4
        };
        let id = await isExistingData(data)
        console.log(id)
        if(id >= 0) {
            putInApi(data, id) 
        } else {
            postToApi(data)
        }
        } catch(e) {
            console.log(e)
        }
}

async function postToApi(data) {
    try {
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`Error! Estado de respuesta: ${response.status}`);
        }
        const result = await response.json();
        console.log('Respuesta de la api:', result);
        } catch(e) {
            console.log(e);
        }
    }

async function putInApi(data, id) {
        const updateResponse = await fetch(`${apiEndpoint}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!updateResponse.ok) {
        throw new Error(`Error! Estado de respuesta: ${updateResponse.status}`);
      }
      const updateResult = await updateResponse.json();
      console.log('Datos actualizados:', updateResult);
      return true; 
}

  async function isExistingData(rowData) {
    try {
        let existingId = -1;
      const response = await fetch(apiEndpoint); 
      if (!response.ok) {
        throw new Error(`Error! Estado de respuesta: ${response.status}`);
      }
      const data = await response.json();
      for (let item of data) {
        if (item.id === rowData.id) {
          existingId = item.id;
          break; 
        }
      }
      return existingId; 
    } catch (e) {
      console.error(e);
      return existingId;
    }
  }
  
async function deleteData(id) {
try {
    const response = await fetch(`${apiEndpoint}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      console.log(`Elemento con ID ${id} eliminado correctamente.`);
    } else {
      console.error(`Error! Estado de respuesta: ${updateResponse.status}`);
    }
  } catch (e) {
    console.error('Se produjo un error al intentar eliminar el elemento:', e);
  }
}

async function deleteRow(button) {
    const row = button.parentNode.parentNode;
    const id = row.cells[0].innerText;
    await deleteData(id)
    row.parentNode.removeChild(row);
}

function editRow(button) {
    const row = button.parentNode.parentNode;
    const cells = row.getElementsByTagName('td');
    for (let i = 0; i < cells.length - 1; i++) {
        cells[i].contentEditable = cells[i].contentEditable === "true" ? "false" : "true";
        button.innerText = cells[i].contentEditable === "true" ? "Dejar de editar" : "Editar"
    }
}

fetchData()