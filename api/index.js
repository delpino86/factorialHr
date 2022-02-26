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
    const Users = await prisma.User.findMany();
    res.json(Users);
});
app.get("/user/:id", async function (req, res) {
    const User = await prisma.User.findUnique({
        where: {
            id: parseInt(req.params.id),
        },
    });
    res.json(User);
});
app.get("/userUpdates/:id", async function (req, res) {
    const Updates = await prisma.userUpdated.findMany({
        where: {
            userId: parseInt(req.params.id),
        },
    });
    res.json(Updates);
});

app.post(`/user-create`, async (req, res) => {
    const result = await prisma.User.create({
        data: {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.secondName,
            telephoneNumber: req.body.telephoneNumber,
        },
    });
    res.json(result);
});
app.delete("/user-delete/:id", async function (req, res) {
    await prisma.User.delete({
        where: {
            id: parseInt(req.params.id),
        },
    });
    res.send(true);
});
app.put("/user-edit/:id", async function (req, res) {
    const user = await prisma.User.update({
        where: {
            id: parseInt(req.params.id),
        },

        data: {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.secondName,
            telephoneNumber: req.body.telephoneNumber,
        },
    });
    res.json(user);
});
app.post("/user-save-edit/:id", async function (req, res) {
    const Update = await prisma.userUpdated.create({
        data: {
            changedFirstName: req.body.dirtyFirstName,
            changedLastName: req.body.dirtySecondName,
            changedEmail: req.body.dirtyEmail,
            changedTelephoneNumber: req.body.dirtyTelephoneNumber,
            userId: parseInt(req.params.id),
        },
    });

    res.json(Update);
});

export default {
    path: "/api",
    handler: app,
};
