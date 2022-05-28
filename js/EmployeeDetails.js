class EmployeeDetails{

    id;

    get name(){return this._name}
    set name(name){
        let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
        if (nameRegex.test(name))
            this._name = name
        else throw "Name Is Incorrect!!"
    }
    
    get image(){return this._image}
    set image(image){this._image = image}
    
    get gender(){return this._gender}
    set gender(gender){this._gender = gender}

    get department(){return this._department}
    set department(department){this._department = department}

    get salary(){return this._salary}
    set salary(salary){this._salary = salary}

    get note(){return this._note}
    set note(note){this._note = note}

    get startDate(){return this._startDate}
    set startDate(startDate){this._startDate = startDate}

    // option = {year: 'numeric', month: 'numeric', day: 'numeric'};
    // empDate = !this.startDate ? "undefined":
    //                     this.startDate.toLocaleDateString(undefined, option);
        
    toString(){
        return "id="+this.id + ", name='" + this.name+ "', gender='"+this.gender+
        "', profilePic='"+this.image+"', department='"+this.department+
        "', salary='"+this.salary + "', startDate='"+this.startDate+"', note='"+this.note+"'."
    }

    
}