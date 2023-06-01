const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./Models/User');
const Post = require('./Models/Post');
const port = 9000;

app.use(express.json());
app.use(cors({
    origin: "http://localhost:4200"
}));

app.listen(port, () => {
    console.log("Listening to port", port);
});
// mongodb://localhost:27017/MindLeak
mongoose.connect("mongodb+srv://sk_shoheb_33:Shaik%40123@cluster0.koiugbd.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected successfully to MongoDB");
    })
    .catch((err) => {
        console.log("Connection error", err);
    });

app.post('/signup', (req, res) => {
    User.create(req.body)
        .then(() => {
            res.status(200).json({ message: "Created user successfully" });
        })
        .catch((err) => {
            res.status(400).json({ error: "Error occurred: " + err });
        });
});

app.get('/login/:userName', (req, res) => {
    const userName = req.params.userName;

    User.findOne({ userName: userName })
        .then((result) => {
            if (result) {
                res.status(200).json(result);
                // res.send(result);
            } else {
                res.status(400).json({ error: "Error occurred: " + err });
            }
        })
        .catch((err) => {
            res.status(400).json({ error: "Error occurred: " + err });
        });
});

app.post('/post', (req, res) => {
    Post.create(req.body).then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(500).json({ message: "Failed to post", status: false });
    });
})
app.get('/getPosts', (req, res) => {
    Post.find({}).then((result) => {
        // res.status(200).json({ message: "Successfully fetched", status: true });
        res.send(result);
    }).catch((err) => {
        res.status(500).json({ message: "Failed to fetch", status: false });
    });
})


app.put('/updatePost/:postId', (req, res) => {
    Post.updateOne({ _id: req.params.postId }, { $set: req.body }).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

app.put('/updateUser/:userName', (req, res) => {
    User.findOneAndUpdate({ "userName": req.params.userName }, { $set: req.body }).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

app.get('/myPosts/:userName', (req, res) => {
    Post.find({ createdBy: req.params.userName }).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(300).send(err);
    });
});

app.get('/getUser/:userName', (req, res) => {
    User.findOne({ userName: req.params.userName }).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(300).send(err);
    });
});

app.get('/getPost/:id', (req, res) => {
    Post.findById(req.params.id).then((result) => {
        res.status(201).send(result);
    }).catch((err) => {
        res.status(300).send(err);
    });
});

app.get('/users', (req, res) => {
    User.find({}).then((result) => {
        res.status(201).send(result);
    }).catch((err) => {
        res.status(300).send(err);
    });
})