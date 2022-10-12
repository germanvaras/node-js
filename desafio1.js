class User{
    constructor(name, lastname, pets = [], books = []){
        this.name = name 
        this.lastname = lastname 
        this.pets  = pets
        this.books = books
    }
    getFullName(){
        return ` Nombre completo : ${this.name} ${this.lastname}`
    }
    addPets(name){ 
        this.pets.push(name)
    }
    countPets(){
        let inexistencia = `${this.name} no tiene mascotas`
        let pluralSingular = this.pets.length > 1 ? "mascotas" : "mascota"
        let resultado  =  this.pets.length === 0 ?
        inexistencia :
        `${this.name} tiene ${this.pets.length} ${pluralSingular}`
        return resultado
    }
    getBooksName(name, autor){
        this.books.push({name:name, autor:autor})
        let nameBooks = this.books.map(e => (e.name))
    }

}
const user1 = new User("German", "Varas")
const completeName1 = user1.getFullName()
console.log(completeName1)
let countPets = user1.countPets()
console.log(countPets)
const getPet1 = user1.addPets("Pepe")
countPets = user1.countPets()
console.log(countPets)
const getPet2 = user1.addPets("Toby")
countPets = user1.countPets()
console.log(countPets)
const getBook1 = user1.getBooksName("Don Quijote la Mancha", "Miguel de Cervantes")
console.log(getBook1)
const getBook2 = user1.getBooksName("Martin Fierro", "Jose Hernandez")
console.log(getBook2)