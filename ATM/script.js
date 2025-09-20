console.log('js running')

class Account {
  constructor(holderName, ifscCode, bankName, branchName, mobileNumber) {
    this.ifscCode = ifscCode;
    this.holderName = holderName;
    this.bankName = bankName;
    this.mobileNumber = mobileNumber;
    this.branchName = branchName;
    this.AccountNo = generateAccountNumber();
    this.Pin = generatePin();
    this.AccountBalance = 0;
  }
  currentPin(){
    return this.Pin
  }
  resetPin(currentPin, newPin) {
    if (currentPin == this.Pin) {
      this.Pin = newPin
    }
    else {
      console.log('you enterd a wrong pin')
    }
  }
  debit(amount, pin) {
    if (pin == this.Pin) {

      if (this.AccountBalance == 0 || amount > this.AccountBalance || amount <= 0) {
        console.log('insufficent amount')
      }
      else {
        this.AccountBalance = this.AccountBalance - amount;
        console.log('current ammount : ', this.AccountBalance)
      }
    }
    else {
      console.log('you entered wrong pin')
    }
  }
  credited(amount, pin) {
    if (pin == this.Pin) {
      if (amount <= 0) {
        console.log('insufficent amount')
      }
      else {
        this.AccountBalance += amount
        console.log('ammount cradited successfully')
        console.log('current ammount : ', this.AccountBalance)
      }
    }
    else {
      console.log('you entered wrong pin')
    }
  }
  accountInfo() {
    let obj = {
      ifscCode: this.ifscCode,
      holderName: this.holderName,
      bankName: this.bankName,
      mobileNumber: this.mobileNumber,
      branchName: this.branchName,
      AccountNo: this.AccountNo,
      Pin: this.Pin,
      AccountBalance: this.AccountBalance,
    }
    console.log(obj)
  }
  
  
}
function generateAccountNumber() {
  let AccountNo = ''
  for (let x = 0; x < 12; x++) {
    if (x % 3 === 0 && x != 0) {
      AccountNo += '-'
    }
    let ran = Math.floor(Math.random() * 10)
    AccountNo += ran
  }
  return AccountNo
}
function generatePin() {
  return Math.floor(Math.random() * 9999 - 1000) + 1000
}
let person1 = new Account('tyson', 512, 'bob', 'dewas', 9244857513)
person1.currentPin()
person1.resetPin(person1.currentPin(),2406)
person1.credited(90000)


