let empPayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
    if(site_properties.use_local_storage.match("true")){
        getEmployeePayrollDataFromStorage();
    }else getEmployeePayrollDataFromServer();
});

const getEmployeePayrollDataFromStorage = () => {
     empPayrollList = localStorage.getItem('EmployeePayrollList') ?
                         JSON.parse(localStorage.getItem('EmployeePayrollList')):[];
    processEmployeePayrollDataResponse();
}

const processEmployeePayrollDataResponse = () => {
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
}


const getEmployeePayrollDataFromServer = () =>{
    makeServiceCall("GET", "http://localhost:3000/EmployeePayrollList",true)
        .then(responseText =>{
            empPayrollList = JSON.parse(responseText);
            processEmployeePayrollDataResponse();
        })
        .catch(error => {
            console.log("GET Status Error: "+ JSON.stringify(error));
            empPayrollList = [];
            processEmployeePayrollDataResponse();
        })
}

const createInnerHtml = () => {
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th>"+
                       "<th>Start Date</th><th>Action</th>";
    
    if (empPayrollList.length == 0) return ;

    let innerHtml = `${headerHtml}`; 
    for (const empPayrollData of empPayrollList){
        innerHtml = `${innerHtml}
        <tr>
            <td>
                <img class="profile" src="${empPayrollData._image}">
            </td>
            <td>${empPayrollData._name}</td>
            <td>${empPayrollData._gender}</td>
            <td><div class="dept-label">${empPayrollData._department}</div>
            </td>
            <td>${empPayrollData._salary}</td>
            <td>${empPayrollData._startDate}</td>
            <td>
                <img id="${empPayrollData.id}" onclick="remove(this)" src="../assest/icons/delete-black-18dp.svg" alt="Delete">
                <img id="${empPayrollData.id}" onclick="update(this)" src="../assest/icons/create-black-18dp.svg" alt="Edit">
            </td>
        </tr>
        `;
    }
document.querySelector('#table-display').innerHTML = innerHtml;
}

const remove = (node) =>{
    let empPayrollData = empPayrollList.find(empData => empData.id==node.id);
    if (!empPayrollData) return;
    const index = empPayrollList
                  .map(empData => empData.id)
                  .indexOf(empPayrollData.id);
    empPayrollList.splice(index,1);
    if (site_properties.use_local_storage.match("true")){
        localStorage.setItem("EmployeePayrollList", JSON.stringify(empPayrollList));
        document.querySelector(".emp-count").textContent= empPayrollList.length;
        createInnerHtml();
    }else{
        const deleteUrl = site_properties.server_url + empPayrollData.id.toString();
        makeServiceCall("DELETE", deleteUrl, false)
            .then(responseText => {
                document.querySelector(".emp-count").textContent = empPayrollList.length;
                createInnerHtml();
            })
            .catch(error => {
                console.log("DELETE Status: "+ JSON.stringify(error));
            });
    }
}

const update = (node) =>{
    let empPayrollData = empPayrollList.find(empData => empData.id==node.id);
    if (!empPayrollData) return;
    localStorage.setItem("editEmp", JSON.stringify(empPayrollData));
    window.location.replace(site_properties.add_emp_payroll_page);
}

