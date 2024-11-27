import express, { Router } from 'express';

const app = express();
const port = 8080;
const router = Router();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use("/new", router);
app.set("view engine", "ejs");

const links = [
  { href: "/", text: "Home" },
  { href: "/new", text: "Post Message" },
];

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

app.get("/", (req, res) => {
  res.render("index", { links, title: "Mini Messageboard", messages });
});

app.get("/message/:id", (req, res) => {
  const { id } = req.params;
  res.render("message", { links, title: "View Message", message: messages[id] });
});

router.get("/", (req, res) => {
  res.render("form", { links, title: "New Message" });
});

router.post("/", (req, res) => {
  const { messageUser, messageText } = req.body;
  messages.push({ text: messageText, user: messageUser, added: new Date() });
  res.redirect("/")
});

app.use((req, res) => {
  res.render("404", { links, title: "404 - Page Not Found" });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});