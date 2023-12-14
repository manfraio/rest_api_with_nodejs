const crypto = require('crypto')

const products = [
    {
        "id": "0dfe3b7e-df47-4e3b-aa31-1017eb2a68e3",
        "name": "Laptop",
        "price": 400,
        "quantity": 4,
        "active": false
    },
    {
        "id": "0dfe3b7e-df47-4e3b-aa31-1017eb2a68e4",
        "name": "Keyboard",
        "price": 29.99,
        "quantity": 10,
        "active": true
    },
    {
        "id": "0dfe3b7e-df47-4e3b-aa31-1017eb2a68e5",
        "name": "Computer",
        "price": 700,
        "quantity": 1,
        "active": true
    }  
]

exports.getAllProducts = (request, response) => {
    response.status(200).json(products)
}

exports.getProductById = (request, response) => {
    const product = products.find(product => product.id == request.params.id)

    if (!product) {
        return response.status(404).json({ message: 'Product not found' })
    }

    response.status(200).json(product)
}

exports.createProduct = (request, response) => {
    const { name, price, quantity, active } = request.body

    if (!name) {
        return response.status(422).json({ message: 'Name is required' })
    }

    const id = crypto.randomUUID()

    products.push({
        id,
        name,
        price,
        quantity,
        active
    })

    response.status(201).json({ message: 'Product created successfully', id })
}

exports.updateProduct = (request, response) => {
    const product = products.find(product => product.id == request.params.id)

    if (!product) {
        return response.status(404).json({ message: 'Product not found' })
    }   
    
    const { name, price, quantity, active } = request.body

    if (name) {
        product.name = name
    }

    if (price) {
        product.price = price
    }    

    if (quantity) {
        product.quantity = quantity
    }    
    
    if ('active' in request.body) {
        product.active = active
    }  
    
    response.status(200).json({ message: 'Product updated successfully' })
}

exports.deleteProduct = (request, response) => {
    const productIndex = products.findIndex(product => product.id == request.params.id)

    if (productIndex == -1) {
        return response.status(404).json({ message: 'Product not found' })
    }

    products.splice(productIndex, 1)

    response.status(200).json({ message: 'Product deleted successfully.' })
}
