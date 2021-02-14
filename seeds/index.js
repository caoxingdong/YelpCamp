const mongoose = require('mongoose')
const Campground = require('../models/compground')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('Database connected')
})

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedBD = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author: '6025037f29f12c142c62ed7a',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: "Point",
                coordinates: [-113.1331, 47.0202]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/xdcao/image/upload/v1613263759/YelpCamp/tnpy46thkgjfhbrzfkjg.jpg',
                    filename: 'YelpCamp/tnpy46thkgjfhbrzfkjg'
                },
                {
                    url: 'https://res.cloudinary.com/xdcao/image/upload/v1613263758/YelpCamp/sazsjnnw2rvwiu2sqsta.jpg',
                    filename: 'YelpCamp/sazsjnnw2rvwiu2sqsta'
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price
        })
        await camp.save()
    }
}

seedBD().then(() => {
    mongoose.connection.close()
})