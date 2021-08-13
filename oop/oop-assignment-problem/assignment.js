 class Course {
   //This is private field for Course class
   #price;

   get price() {
     return `\$${this.#price}`;
   }

   //ถ้ามีการ assign ค่ามาที่ price มันก็จะเข้ามาที่ setter นี่เลย
   //เหมือนกับว่า คนอื่นจะไม่สามารถส่งค่าที่จะ return ไปได้เลย จะต้องผ่านการทำอะไรสักอย่าง แล้วค่อน return ค่า # (private ออกไป)
   //ถ้ามีการ สร้าง object จาก class ตัวนี้ขึ้นมาโดยการใส่ค่าท price ที่เป็นลบ จะเกิด error 'Invalid Value'
   set price(value) {
     if (value < 0) {
       throw "Invalid Value";
     }
     this.#price = value;
   }

   constructor(title, length, price) {
     this.title = title;
     this.length = length;
     this.price = price;
   }

   //method
   calculateValue() {
     return this.length / this.#price;
   }
   printSummary() {
     console.log(
       `This is summary ${this.title} Total time to learn is ${this.length} and price = ${this.price}`
     );
   }
 }

 const aviationCourse = new Course('Aviation Basic', 40, 800);
 const interCourse = new Course('inter Basic Guide', 20, 300);

 console.log(aviationCourse.calculateValue()) 
 console.log(interCourse.calculateValue()) 

 aviationCourse.printSummary();
 interCourse.printSummary();


 //inheritance
 class PrcticalCourse extends Course {
     constructor(title, length, price, exerciseCount){
         super(title, length, price)
         this.numOfecercise = exerciseCount;
     }
 }

 const reactCourse = new PrcticalCourse('React - Course', 80, 400, 10)
 console.log(reactCourse)
 reactCourse.printSummary();