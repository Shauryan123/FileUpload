const parentDiv = document.getElementById("fileList");

function createFileMarkup(file) {
    return `
        <div class="files__entity">
            <i class="files__icon fa fa-file-text" aria-hidden="true"></i>
            <span class="files__date">Date created: ${file.createdAt}</span>
            <a href="${file.name}" class="files__link"><i class="fa fa-eye tests__icon" aria-hidden="true"></i></a>
        </div>
    `;
}

async function getFiles() {
    try {
        const response = await axios.get("/api/getFiles");
        console.log(response)
        const files = response.data.files;

        parentDiv.innerHTML = ""; // Clear previous file list

        files.forEach((file) => {
            const markup = createFileMarkup(file);
            parentDiv.insertAdjacentHTML("beforeend", markup);
        });
    } catch (error) {
        console.log(error);
    }
}

window.addEventListener("load", getFiles);

// Listen for file upload event and update the file list
const fileInput = document.getElementById("myFile");
fileInput.addEventListener("change", getFiles);