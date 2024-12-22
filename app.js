import express, { Router } from 'express';
import { addMessage, getAllMessages, getMessage } from './db/queries';

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

app.get("/", async (req, res) => {
  const messages = await getAllMessages();
  res.render("index", { links, title: "Mini Messageboard", messages });
});

app.get("/message/:id", async (req, res) => {
  const { id } = req.params;
  const message = await getMessage(id);
  res.render("message", { links, title: "View Message", message });
});

router.get("/", (req, res) => {
  res.render("form", { links, title: "New Message" });
});

router.post("/", async (req, res) => {
  const { messageUser, messageText } = req.body;
  await addMessage(messageUser, messageText);
  res.redirect("/")
});

app.use((req, res) => {
  res.render("404", { links, title: "404 - Page Not Found" });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});