const STORAGE_KEY = "passwords";

function loadPasswords() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function savePasswords(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function render() {
    const list = document.getElementById("list");
    list.innerHTML = "";

    loadPasswords().forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "entry";
        div.innerHTML = `
            <strong>${item.url}</strong><br>
            Логин: ${item.login}<br>
            Пароль: ${item.password}<br>
            <small>${item.date}</small>
        `;
        list.appendChild(div);
    });
}

function addEntry() {
    const url = document.getElementById("url").value;
    const login = document.getElementById("login").value;
    const password = document.getElementById("password").value;

    if (!url || !login || !password) {
        alert("Заполните все поля");
        return;
    }

    const data = loadPasswords();
    data.push({
        url,
        login,
        password,
        date: new Date().toLocaleString()
    });

    savePasswords(data);
    render();

    document.getElementById("url").value = "";
    document.getElementById("login").value = "";
    document.getElementById("password").value = "";
}

function generatePassword(length = 16) {
    const chars =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let pwd = "";
    for (let i = 0; i < length; i++) {
        pwd += chars[Math.floor(Math.random() * chars.length)];
    }
    document.getElementById("password").value = pwd;
}

render();
