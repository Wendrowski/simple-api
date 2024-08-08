import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON bodies

// Define the type for an item
interface Item {
  id: number;
  name: string;
  [key: string]: any; // Allows additional properties
}

// Simulated in-memory database
let items: Item[] = [];

// Create a new item
app.post('/items', (req: Request, res: Response) => {
  const item: Item = req.body;
  items.push(item);
  res.status(201).send(item);
});

// Read all items
app.get('/items', (req: Request, res: Response) => {
  res.send(items);
});

// Read a single item by ID
app.get('/items/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const item = items.find(i => i.id === id);
  if (item) {
    res.send(item);
  } else {
    res.status(404).send({ message: 'Item not found' });
  }
});

// Update an item by ID
app.put('/items/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const index = items.findIndex(i => i.id === id);
  if (index !== -1) {
    items[index] = req.body;
    res.send(items[index]);
  } else {
    res.status(404).send({ message: 'Item not found' });
  }
});

// Delete an item by ID
app.delete('/items/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const index = items.findIndex(i => i.id === id);
  if (index !== -1) {
    const deletedItem = items.splice(index, 1);
    res.send(deletedItem);
  } else {
    res.status(404).send({ message: 'Item not found' });
  }
});

// Initial route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

// Server listening
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
