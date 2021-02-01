const fs = require('fs');
const pathFile = './products.json';

class Archivo {
    constructor(title, price, thumbnail){
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    };

    save = async () => {

        const product = {
            title: this.title,
            price: this.price,
            thumbnail: this.thumbnail,
        };

        try {
            if(fs.existsSync(pathFile)){
                const file = await JSON.parse(fs.readFileSync(pathFile, 'utf-8'));
                product.id = file.length + 1;
                fs.writeFileSync(pathFile, `${JSON.stringify([...file, product])}`);
            } else {
                fs.writeFileSync(pathFile, `${JSON.stringify([product])}`);
            }; 
        } catch (err) {
            throw new Error('¡Ups!');
        }
    };

    read = async () => {
        try {
            if(fs.existsSync(pathFile)){
                const file = await JSON.parse(fs.readFileSync(pathFile, 'utf-8'));
                console.log(file);
            } else {
                console.log([]);
            }
        } catch (error) {
            throw new Error('¡Ups!');
        }
    };

    delete = async () => {
        try {
            await fs.unlink(pathFile, err => err ? console.log(err) : console.log('Deleted'))
        } catch (error) {
            throw new Error('¡Ups!');
        }
    }
};

const newFile = new Archivo('test titulo', 'test precio', 'test thumbnail')

newFile.read();