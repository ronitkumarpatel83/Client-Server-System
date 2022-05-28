const salary = document.querySelector('#salary');
        const output = document.querySelector('.salary-output');
        output.textContent = salary.value;
        salary.addEventListener('input' , function(){
            output.textContent=salary.value;
        });

        
        const text = document.querySelector('#name');
        const textError = document.querySelector('.text-error');
        text.addEventListener('input', function(){
            let nameRegex= RegExp('^[A-Z]{1}[a-z]{2,}$');
            if(nameRegex.test(text.value))
                textError.textContent = "";
            else textError.textContent = "Name Is Incorrect";
        });


function save(event){
    event.preventDefault()
    alert("Form is Submitted")

    class EmployeeDetails{
        constructor(...para){
            this.name = para[0];
            this.image = para[1];
            this.gender = para[2];
            this.department = para[3];
            this.startDate = para[4];
            this.salary = para[5];
        }
    
        get name(){return this._name}
        set name(name){
            let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
            if (nameRegex.test(name))
                this._name = name
            else throw "Name Is Incorrect!!"
        }
        
        get image(){return this._image}
        set image(image){this._image = image}
        
        get salary(){return this._salary}
        set salary(salary){this._salary = salary}
        
        get gender(){return this._gender}
        set gender(gender){this._gender = gender}

        get startDate(){return this._startDate}
        set startDate(startDate){this._startDate = startDate}

        get department(){return this._department}
        set department(department){this._department = department}
    }

    try {
        newName = document.getElementById('name').value
        newImage = document.querySelector('input[name=profile]:checked').value; 
        newGender = document.querySelector('input[name=gender]:checked').value;
        newDepartment = document.querySelector('input[name=department]:checked').value;
        newSalary = document.querySelector('input[name=salary]').value;
        newDay = document.getElementById('day').value 
        newMonth = document.getElementById('month').value 
        newDate = `${newDay}/${newMonth}`

        let details = new EmployeeDetails(newName,newImage,newGender,newDepartment,newDate,newSalary)
        console.log(details);
    } catch (e) {
        console.error(e);
    }
}