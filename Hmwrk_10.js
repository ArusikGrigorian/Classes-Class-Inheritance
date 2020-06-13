// EX 1

class Author {
  constructor(fullName, email, gender) {
    this.fullName = fullName;
    this.email = email;
    this.gender = gender;
  }

  get fullName() {
    return this._fullName;
  }
  set fullName(v) {
    if(!v.includes(" ")) {
      Object.defineProperty(this, "notification", {
        value : "This fullName is author's literary pseudonym",
        enumerable: true,
        writable : true,
        configurale : true
      })
    }
    this._fullName = v;
  }

  toString (param) {
    let str = '';
    if (typeof param === "object") {
      return param += str;
    }
    if (typeof param === "function") {
      return param += str;
    }
    else if (typeof param === "number") {
      return param += str;
    }
    else {
      for(let i = 0; i < param.length; i++) {
        str += param[i] + ",";
    }
      return str.substring(-1, str.length - 2);
    }
  }
}

class Book {
  constructor(author, title, price, quantity) {
    this.author = author;
    this.title = title;
    this.price = price;
    this.quantity = quantity;
  }

  get author() {
    return this._author;
  }
  set author(v) {
    if (v instanceof Author) {
      this._author = v;
    }
  }

  get title() {
    return this._title;
  }
  set title(v) {
    if (v.length < 20) {
      this._title = v;
    }
  }

  getProfit(prePrice) {
    return (this.price * this.quantity) - (prePrice * this.quantity);
  }

  toString(prmtr) {
    return Author.prototype.toString(prmtr);
  }
}



// EX 2

class Account {
  constructor(name, id, balance) {
    this.name = name;
    Object.defineProperty(this, "id", {
      get: function() {
        return id;
      },
      enumerable: true,
    });
    this.balance = balance;
  }

  get name() {
    return this._name;
  }
  set name(v) {
    if (typeof v === "string" && v.length < 20) {
      this._name = v;
    }
  }

  get balance() {
    return this._balance;
  }
  set balance(v) {
    if (typeof v === "number") {
      this._balance = v;
    }
  }

  credit(amount) {
    this._balance += amount;
  }

  debit(amount) {
    if(amount > this._balance) {
      return "Amount exceeded balance!";
    }
    this._balance -= amount;
  }

  transferTo(anotherAccount, amount) {
    if(amount > this._balance) {
      return "Amount exceeded balance!";
    }
    this._balance -= amount;
    anotherAccount.balance += amount;
  }

  toString(prmtr) {
    return Author.prototype.toString(prmtr); //suggesting, that class Author and class Account are on the same platform,
                                            //and there can be an access to Authors's methods, f.e. toString().
  }

  static identifyAccounts(accountFirst, accountSecond) {
    for(let key in accountFirst) {
      if (accountFirst[key] != accountSecond[key]) {
        return "These accounts are not the same!";
      }
    }
    return "These accounts are the same!";  
  }
}



//EX 3

class Person {
  constructor(firstName, lastName, gender, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.age = age;
  }

  get fullName() {
    return this.firstName + " " + this.lastName;
  }
  set fullName(v) {
    if (typeof v === "string" && v.trim().length != 0 && v.includes(" ")) {
      [this.firstName, this.lastName] = v.split(" ")
    }
  }

  toString (param) {
    let str = '';
    if (typeof param === "object") {
      return param += str;
    }
    if (typeof param === "function") {
      return param += str;
    }
    else if (typeof param === "number") {
      return param += str;
    }
    else {
      for(let i = 0; i < param.length; i++) {
        str += param[i] + ",";
      }
    return str.substring(-1, str.length - 2);
    }
  }
}

class Student extends Person {
  constructor(firstName, lastName, gender, age, programList, year, fee) {
    super(firstName, lastName, gender, age);
    this.programList = programList;
    this.year = year;
    this.fee = fee;
    this.date = {};
  }

  get programList() {
    return this._programList;
  }
  set programList(v) {
    if (typeof v === "object" && v.length >= 5) {
      this._programList = v;
    }
  }

  passExam(program, grade, crspTeacher) { // maximum grade for each program is 10
    let allvalues;
    let totalGrade;
    if (!this.programList.includes(program)) {
      return "This program is not in the programList";
    }
    this.date[program] = grade;
    allvalues = Object.values(this.date);
    totalGrade = allvalues.reduce(function(sum, current) {
      return sum + current;
    }, 0);
    if (totalGrade >= 50) {
      this.year ++;
      this.fee /= 2;
      crspTeacher.pay *= 2;
      return `Congratulations, ${this.fullName} !!! You've passed your exams !!!`
    }
  }

  toString(prmtr) {
    return super.toString(prmtr);
  }
}

class Teacher extends Person {
  constructor(firstName, lastName, gender, age, program, pay) {
    super(firstName, lastName, gender, age);
    this.program = program;
    this.pay = pay;
  }

  get pay() {
    return this._pay;
  }
  set pay (v) {
    if (v > 2000) {
      this._pay = v;
    }
  }

  toString(prmtr) {
    return super.toString(prmtr);
  }
}
