import { Router } from "express";
import { Request, Response } from "express";
import { ToDo } from "../database/schemas/toDo";

export const todoRoute = Router();

todoRoute.get("/todo", async (req: Request, res: Response) => {
  const id = req.query.id;
  if (id) {
    try {
      const singleTodo = await ToDo.findById(id);
      return res.json(singleTodo);
    } catch (e) {
      return res.json({ error: e.message });
    }
  }
  try {
    const todos = await ToDo.find();
    return res.json(todos);
  } catch (e) {
    return res.json({ error: e.message });
  }
});

todoRoute.post("/todo", async (req: Request, res: Response) => {
  const todo = req.body;
  if (!todo.title) {
    return res.json({
      error: "The request body is missing 'title' param.",
    });
  }
  try {
    const newToDo = await ToDo.create({
      title: todo.title,
      desc: todo.desc || null,
    });
    return res.json(newToDo);
  } catch (e) {
    return res.json({ error: e.message });
  }
});

todoRoute.put("/todo", async (req: Request, res: Response) => {
  const id = req.query.id;
  const data = req.body;
  if (!data) {
    return res.json({ error: "Missing body." });
  }
  try {
    const updatedToDo = await ToDo.findByIdAndUpdate(id, data, {
      new: true,
    });
    return res.json(updatedToDo);
  } catch (e) {
    return res.json({ error: e.message });
  }
});

todoRoute.put("/todo-status", async (req: Request, res: Response) => {
  const id = req.query.id;
  const doc = await ToDo.findById(id);
  if (doc?.done) {
    doc.done = false;
    await doc.save();
    return res.json(doc);
  }
  if (doc?.done === false) {
    doc.done = true;
    await doc.save();
    return res.json(doc);
  }
});

todoRoute.put("/todo-archive", async (req: Request, res: Response) => {
  const id = req.query.id;
  const doc = await ToDo.findById(id);
  if (doc?.archived) {
    doc.archived = false;
    await doc.save();
    return res.json(doc);
  }
  if (doc?.archived === false) {
    doc.archived = true;
    await doc.save();
    return res.json(doc);
  }
});

todoRoute.delete("/todo", async (req: Request, res: Response) => {
  try {
    await ToDo.deleteMany({ archived: true });
    return res.json({ success: true });
  } catch (e) {
    return res.json({ error: e.message, success: false });
  }
});
