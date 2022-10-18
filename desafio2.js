const fs = require("fs")
class Contenedor {
    constructor(file) {
        this.file = file
    }

    async save(product) {
        try {
            const data = await fs.promises.readFile(this.file, "utf-8")
            const dataParse = JSON.parse(data)
            let idMax = 0
            dataParse.forEach( prod => {
                if(prod.id > idMax){
                    idMax = prod.id
                }})
            
            dataParse.push({ ...product, id: idMax + 1  })
            await fs.promises.writeFile(this.file, JSON.stringify(dataParse, null, 2));
            return idMax + 1
        }
        catch {
            await fs.promises.writeFile(this.file, JSON.stringify([{ ...product, id: 1 }]));
            return 1;
        }
    }
    async getById(numberId) {
        try {
            const data = await fs.promises.readFile(this.file, "utf-8")
            const dataParse = JSON.parse(data)
            return await dataParse.find((item) => item.id === numberId) || null
        }
        catch (err) {
            throw new Error(err)
        }
    }
    async getAll() {
        try {
            const data = await fs.promises.readFile(this.file, "utf-8")
            return await JSON.parse(data)
        }
        catch (err) {
            throw new Error(err)
        }
    }
    async deleteById(numberId) {
        try {
            const data = await fs.promises.readFile(this.file, "utf-8")
            const dataParse = JSON.parse(data)
            const filterData = dataParse.filter((filter) => filter.id !== numberId)
            await fs.promises.writeFile(this.file, JSON.stringify(filterData));
        }
        catch (err) {
            throw new Error(err)
        }
    }
    async deleteAll() {
        try {
            await fs.promises.writeFile(this.file, "[]");
        } catch (err) {
            throw new Error(err);
        }
    }
}
module.exports = Contenedor;