import { PrismaClient } from "@prisma/client";

const express = require("express");
const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// @desc GET all Users from prisma Db

app.get("/users", async function (req, res) {
    const Users = await prisma.User.findMany({ orderBy: { createdAt: "asc" } });
    res.json(Users);
});

// @desc GET User by unique id from prisma Db

app.get("/user/:id", async function (req, res) {
    const User = await prisma.User.findUnique({
        where: {
            id: parseInt(req.params.id),
        },
    });
    res.json(User);
});

// @desc POST New user to prisma Db unique email restriction

app.post(`/user-create`, async (req, res) => {
    try {
        const result = await prisma.User.create({
            data: {
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.secondName,
                telephoneNumber: req.body.telephoneNumber,
            },
        });
        res.json(result);
    } catch (e) {
        if (e.code === "P2002") {
            res.send(
                "The email introduced is registered, a new user cannot be created with this email"
            );
        } else {
            res.send("There is a problem the user has not been saved");
        }
    }
});

// @desc PUT Update User from prisma Db unique email restriction

app.put("/user-edit/:id", async function (req, res) {
    try {
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
    } catch (e) {
        if (e.code === "P2002") {
            res.send(
                "The email introduced is registered, a new user cannot be created with this email"
            );
        } else {
            res.send("There is a problem the user has not been saved");
        }
    }
});

// @desc DELETE User from prisma Db oDelete cascade userUpdates

app.delete("/user-delete/:id", async function (req, res) {
    await prisma.User.delete({
        where: {
            id: parseInt(req.params.id),
        },
    });
    res.send(true);
});

// @desc POST User updates to prisma Db

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

// @desc GET User updates by unique Userid from prisma Db

app.get("/userUpdates/:id", async function (req, res) {
    const Updates = await prisma.userUpdated.findMany({
        where: {
            userId: parseInt(req.params.id),
        },
    });
    res.json(Updates);
});

export default {
    path: "/api",
    handler: app,
};
