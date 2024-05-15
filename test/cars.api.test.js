require("dotenv").config()

const request = require("supertest");
const app = require("../app")

describe("Route not found", () => {
    it("Can't find route", async () => {
        const response = await request(app).get("/v1/car")
        expect(response.statusCode).toBe(404)
    })
})

describe("Get Car API", () => {
    it("Success getting car list", async () => {
        const response = await request(app).get("/v1/cars")
        expect(response.statusCode).toBe(200)
    });
})

describe("Create Car Data", () => {
    const AdminEmailBody = {
        "email" : "admin@binar.co.id",
        "password": "123456"
    }

    const CustomerEmailBody = {
        "email" : "ranggawarsita@binar.co.id",
        "password": "123456"
    }

    let adminToken = ""
    let customerToken = ""

    const carBody = {
        name: "Jagpanther",
        price: 300000,
        size: "LARGE",
        image: "https://source.unsplash.com/519x519",
    }

    beforeEach(async () => {
        let response = await request(app).post("/v1/auth/login").send(AdminEmailBody)
        adminToken = response.body.accessToken

        response = await request(app).post("/v1/auth/login").send(CustomerEmailBody)
        customerToken = response.body.accessToken
    })

    it("Success creating new car data", async () => {
        const response = await request(app)
            .post("/v1/cars").send(carBody)
            .set('Authorization', `Bearer ${adminToken}`)
        expect(response.statusCode).toBe(201)
    })

    it("Failed creating car data", async () => {
        const response = await request(app)
            .post("/v1/cars").send(carBody)
            .set('Authorization', `Bearer ${customerToken}`)
        expect(response.statusCode).toBe(401)
    })
})

describe("Auth", () => {
    
})