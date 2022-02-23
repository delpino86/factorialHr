import { PrismaClient } from "@prisma/client";

const express = require("express");

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/test", function (req, res) {
    res.send("Test successful");
});

app.get("/users", async function (req, res) {
    const Users = await prisma.user.findMany();
    res.json(Users);
});
app.post(`/user-create`, async (req, res) => {
    const result = await prisma.user.create({
        data: {
            email: req.body.email,
            firstName: req.body.firstName,
            secondName: req.body.secondName,
            telephoneNumber: req.body.telephoneNumber,
        },
    });
    res.json(result);
});
app.delete("/user-delete/:id", async function (req, res) {
    await prisma.user.delete({
        where: {
            id: parseInt(req.params.id),
        },
    });
    res.send(true);
});
export default {
    path: "/api",
    handler: app,
};
