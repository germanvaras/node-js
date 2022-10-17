const fs = require("fs")

const product = {
    title: "Remera Nube",
    price: 5000,
    thumbnail: 'http://'
}
const product2 = {
    title: "Remera Black",
    price: 4000,
    thumbnail: 'http://'
}
const product3 = {
    title: "Remera Sword",
    price: 4500,
    thumbnail: 'http://'
}

class Contenedor {
    constructor(file) {
        this.file = file
    }

    async save(product) {
        try {
            const data = await fs.promises.readFile(this.file, "utf-8")
            const dataParse = JSON.parse(data)
            const id =  dataParse.at(-1).id + 1
            dataParse.push({ ...product, id: id })
            await fs.promises.writeFile(this.file, JSON.stringify(dataParse, null, 2));
            return id
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

const run = async () => {
    try {
        const products = new Contenedor("./file.txt")
        console.log(await products.save(product))
        console.log(await products.getById(1))
        console.log(await products.getAll())
        console.log(await products.save(product2))
        console.log(await products.getAll())
        await products.deleteById(4)
        console.log(await products.getAll())
        console.log(await products.save(product3))
        // descomentar para eliminar todo
        // await products.deleteAll()
        // console.log(await products.getAll())
    } catch {
        console.log("No corre")
    }
}
run()