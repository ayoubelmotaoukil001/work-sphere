const allEmployees = [];

const form = document.getElementById("form");
const openBtn = document.getElementById("adduser");
const closeBtns = document.querySelectorAll(".close-btn");

openBtn.addEventListener("click", () => {
    form.style.display = "flex";
});

closeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        form.style.display = "none";
    });
});

// Add employer
const list_employer = document.getElementById("emplyers-list");

document.querySelector(".submit-btn").addEventListener("click", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const role = document.getElementById("role").value;
    const pic  = document.getElementById("photo_url").value;

    if (!name || !role) {
        alert("fill all fields");
        return;
    }

    const employee = { 
    name, 
    role, 
    pic,
    inRoom: false   
};

    allEmployees.push(employee);

    const card = document.createElement("div");
    card.classList.add("inside");
    card.innerHTML = `
        <div class="img">
            <img src="${pic}">
        </div>
        <div class="name">
            <h1>${name}</h1>
        </div>
        <div class="Role">
            <h2>${role}</h2>
        </div>
    `;

    list_employer.appendChild(card);

    form.style.display = "none";
    document.getElementById("name").value = "";
    document.getElementById("role").value = "";
});

// Add to room
const roomButtons = document.querySelectorAll(".add-to-room");

roomButtons.forEach(btn => {
    btn.addEventListener("click", () => {

        const role = btn.dataset.role;
        const roomDiv = btn.parentElement.nextElementSibling;

       const filtered = allEmployees.filter(emp => {
    if (emp.inRoom) return false;    
    if (emp.role === "manager") return true;
    if (role === "conference") return true;
    return emp.role === role;
});



       

        const select = document.createElement("select");
        filtered.forEach(emp => {
            const option = document.createElement("option");
            option.value = emp.name;
            option.textContent = emp.name;
            select.appendChild(option);
        });

        const confirmBtn = document.createElement("button");
        confirmBtn.textContent = "add to room";
        confirmBtn.type = "button"; 
        confirmBtn.className = "butoooon";

        const container = document.createElement("div");
        container.appendChild(select);
        container.appendChild(confirmBtn);
        roomDiv.appendChild(container);

        confirmBtn.addEventListener("click", () => {
            const selected = select.value;
            const empObj = filtered.find(emp => emp.name === selected);

            if (empObj) {
                empObj.inRoom = true; 
                const empDiv = document.createElement("div");
                empDiv.classList.add("employee");
                empDiv.innerHTML = `
                    <div class="img">
                        <img src="${empObj.pic}">
                    </div>
                    <div class="nameandrole">
                        <div class="name">
                            <h1>${empObj.name}</h1>
                        </div>
                        <div class="Role">
                            <h2>${empObj.role}</h2>
                        </div>
                        <div class="removuserfromroom">
                            <button type="button">x</button>
                        </div>
                    </div>
                `;
                roomDiv.appendChild(empDiv);

                const removeBtn = empDiv.querySelector(".removuserfromroom button");
            removeBtn.addEventListener("click", () => {
                empDiv.remove();
                 empObj.inRoom = false; 

                // Return employee to Employers section if not manager
                if(empObj.role !== "manager"){
                    const card = document.createElement("div");
                    card.classList.add("inside");
                    card.innerHTML = `
                        <div class="img">
                            <img src="${empObj.pic}">
                        </div>
                        <div class="name">
                            <h1>${empObj.name}</h1>
                        </div>
                        <div class="Role">
                            <h2>${empObj.role}</h2>
                        </div>
                    `;
                    list_employer.appendChild(card);
                }
            });

            }


            if(empObj.role !== "manager"){
                const employerCards = Array.from(list_employer.children);
                const cardToRemove = employerCards.find(card => card.querySelector(".name h1").textContent === empObj.name);
                if (cardToRemove) cardToRemove.remove();
            
            }


            container.remove();
        });
    });
});
