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
const addExpBtn = document.getElementById("addExpBtn");
const experienceForm = document.getElementById("experienceForm");

// Toggle experience form ONLY
addExpBtn.addEventListener("click", () => {
    experienceForm.style.display =
        experienceForm.style.display === "none" ? "flex" : "none";
});

// Function to create employee view modal
function createViewModal(employee) {
    const modal = document.createElement("div");
    modal.className = "employee-view";

    modal.innerHTML = `
        <section>
            <div class="headerr">
                <div>
                    <h1>${employee.name}</h1>
                    <h2>${employee.role}</h2>
                </div>
                <img src="${employee.pic}" alt="" style="height:60px; border-radius:50%;">
            </div>

            <div class="experience-all">
                <div class="header-experience"><h1>Experience</h1></div>
                <div class="experience">
                    <h2>Company: ${employee.company || "N/A"}</h2>
                    <h2>Position: ${employee.position || "N/A"}</h2>
                    <h2>Start: ${employee.date_start || "N/A"}</h2>
                    <h2>End: ${employee.date_end || "N/A"}</h2>
                </div>
                <div class="contact">
                    <h2>Email: ${employee.email || "N/A"}</h2>
                    <h2>Phone: ${employee.phone || "N/A"}</h2>
                </div>
            </div>

            <button class="close-view">Close</button>
        </section>
    `;

    modal.querySelector(".close-view").addEventListener("click", () => {
        modal.remove();
    });

    document.body.appendChild(modal);
}

// Submit employee
document.querySelector(".submit-btn").addEventListener("click", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const role = document.getElementById("role").value;
    const pic  = document.getElementById("photo_url").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const company = document.getElementById("company_name")?.value;
    const position = document.getElementById("position")?.value;
    const date_start = document.getElementById("date_start")?.value;
    const date_end = document.getElementById("date_end")?.value;

    if (!name || !role) {
        alert("fill all fields");
        return;
    }

    const employee = { 
        name, role, pic, email, phone, company, position, date_start, date_end, inRoom: false   
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
        <button type="button" class="view-btn">View</button>
    `;

    list_employer.appendChild(card);
    form.style.display = "none";

    // Clear fields
    document.getElementById("name").value = "";
    document.getElementById("role").value = "";
    document.getElementById("photo_url").value = "";

    // Add event for view button
    const viewBtn = card.querySelector(".view-btn");
    viewBtn.addEventListener("click", () => {
        createViewModal(employee);
    });
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
