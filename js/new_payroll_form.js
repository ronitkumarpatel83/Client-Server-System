let isUpdate = false;
let employeePayrollObj = {};

window.addEventListener('DOMContentLoaded', (event) =>{
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function(){
        if(name.value.length==0){
            textError.textContent = "";
            return;
        }
        try{
            checkName(name.value)
            textError.textContent = "";
        }catch(e){
            textError.textContent = e;
        }
    });

    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input' , function(){
        output.textContent=salary.value;
    });

    checkForupdate();
});

const save = (event) =>{

    try {
        setEmployeePayrollObject();
        if (site_properties.use_local_storage.match("true")) {
            createAndUpdateStorage(); 
            resetForm();
            window.location.replace(site_properties.home_page);
        }else{
            createORupdateEmployeePayroll();
        }
        } catch (e) {
        return
    }
}

const createORupdateEmployeePayroll = () => {
    let postUrl = site_properties.server_url;
    let methodCall = "POST";
    if(isUpdate){
        methodCall = "PUT"
        postUrl = postUrl + employeePayrollObj.id;
    }
    makeServiceCall(methodCall, postUrl, true, employeePayrollObj)
        .then(responseText => {
            resetForm();
            window.location.replace(site_properties.home_page);
        })
        .catch(error => {
            throw error;
        })
}

const setEmployeePayrollObject = () =>{
    // if(!isUpdate && site_properties.use_local_storage.match("true")){
    //     employeePayrollObj.id = createEmployeePayrollId();
    // }
    employeePayrollObj._name = getInputValueById('#name');
    employeePayrollObj._image = getSelectedValues('[name=profile]').pop();
    employeePayrollObj._gender = getSelectedValues('[name=gender]').pop();
    employeePayrollObj._department = getSelectedValues('[name=department]');
    employeePayrollObj._salary = getInputValueById('#salary');
    employeePayrollObj._note = getInputValueById('#notes');
    let date = `${getInputValueById('#day')}-${getInputValueById('#month')}-${getInputValueById('#year')}`;
    employeePayrollObj._startDate = date;   
}

const createAndUpdateStorage = () => {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    
    if(employeePayrollList){
        let empPayrollData = employeePayrollList.
                                find(empData => empData.id == employeePayrollObj.id);
        if (!empPayrollData) {
            employeePayrollList.push(employeePayrollObj);
        }else{
            const index = employeePayrollList.
                            map(empData => empData.id)
                            .indexOf(empPayrollData.id);
            employeePayrollList.splice(index,1,employeePayrollObj)
        }
    }else{
        employeePayrollList = [employeePayrollObj]
    }
    alert("Your Data Is Submited..");
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList))
}


const createEmployeePayrollId = () => {
    let list =  JSON.parse(localStorage.getItem('EmployeePayrollList'));
    id = list.length+1;
    return id;
}

// const createEmployeePayroll = () => {
//     let employeePayrollData = new EmployeeDetails();
//     try {
//         employeePayrollData.name = getInputValueById('#name');
//     } catch (e) {
//         setTextValue('.text-error', e);
//         throw e ;
//     }
//     let list =  JSON.parse(localStorage.getItem('EmployeePayrollList'));
//     employeePayrollData.id = list.length;
//     employeePayrollData.image = getSelectedValues('[name=profile]').pop();
//     employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
//     employeePayrollData.department = getSelectedValues('[name=department]');
//     employeePayrollData.salary = getInputValueById('#salary');
//     employeePayrollData.note = getInputValueById('#notes');
//     let date = `${getInputValueById('#day')}-${getInputValueById('#month')}-${getInputValueById('#year')}`;
//     employeePayrollData.startDate = date;
//     alert(employeePayrollData.toString());

//     return employeePayrollData
// }

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
        if(item.checked) selItems.push(item.value);
    });
    return selItems;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

//unUsed
const getInputElementValue = (id) => {
    let value = document.getElementsById(id).value;
    return value;
}

const resetForm = () => {
    setValue('#name','')
    unSetValue('[name=profile]');
    unSetValue('[name=gender]');
    unSetValue('[name=depratment]');
    setValue('#salary','')
    setValue('#notes','')
    setValue('#day','1')
    setValue('#month','05')
    setValue('#year','2020')
}

const unSetValue = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}

const setTextValue = (id,value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}

const checkForupdate = () => {
    const employeePayrollJson = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJson ? true : false;
    if (!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    setForm();
}

const setForm = () =>{    
    setValue('#name', employeePayrollObj._name);
    setSelectedValues('[name=profile]', employeePayrollObj._image);
    setSelectedValues('[name=gender]', employeePayrollObj._gender);
    setSelectedValues('[name=department]', employeePayrollObj._department);
    setValue('#salary', employeePayrollObj._salary);
    setTextValue('.salary-output', employeePayrollObj._salary)
    setValue('#notes', employeePayrollObj._note);
    let date = employeePayrollObj._startDate.split("-")
    setValue('#day', date[0]);
    setValue('#month', date[1]);
    setValue('#year', date[2]);
}

const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item =>{
        if (Array.isArray(value)) {
            if (value.includes(item.value)) {
                item.checked = true;
            }
        }
        else if (item.value === value)
        item.checked = true;
    })
}
