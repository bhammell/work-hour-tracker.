const clockInBtn = document.getElementById("clockInBtn");
const clockOutBtn = document.getElementById("clockOutBtn");
const status = document.getElementById("status");
const logList = document.getElementById("logList");

const logs = JSON.parse(localStorage.getItem("workLogs") || "[]");

function updateLogs() {
  logList.innerHTML = "";
  logs.forEach(log => {
    const li = document.createElement("li");
    li.textContent = `${log.type} at ${new Date(log.time).toLocaleTimeString()}`;
    logList.appendChild(li);
  });
}

function saveLog(type) {
  const time = new Date().toISOString();
  logs.push({ type, time });
  localStorage.setItem("workLogs", JSON.stringify(logs));
  updateLogs();
  status.textContent = `Status: ${type === 'Clock In' ? 'Working' : 'Not working'}`;
}

clockInBtn.onclick = () => saveLog("Clock In");
clockOutBtn.onclick = () => saveLog("Clock Out");

updateLogs();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}