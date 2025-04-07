const express = require("express");
const app = express();
app.use(express.json());

const port = process.env.PORT || 8080;

// Estructura de datos: concesionarios
let concesionarios = [
  {
    id: 0,
    nombre: "Concesionario Madrid",
    direccion: "Calle Falsa 123",
    coches: [
      { id: 0, modelo: "Corsa", cv: 90, precio: 12000 },
      { id: 1, modelo: "Astra", cv: 110, precio: 15000 },
    ],
  },
];

// ======================
// ENDPOINTS CONCESIONARIOS
// ======================

// GET todos los concesionarios
app.get("/concesionarios", (req, res) => {
  res.json(concesionarios);
});

// POST nuevo concesionario
app.post("/concesionarios", (req, res) => {
  const nuevo = { ...req.body, id: concesionarios.length, coches: [] };
  concesionarios.push(nuevo);
  res.json({ message: "Concesionario creado", concesionario: nuevo });
});

// GET concesionario por ID
app.get("/concesionarios/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const encontrado = concesionarios.find((c) => c.id === id);
  if (!encontrado) return res.status(404).json({ message: "No encontrado" });
  res.json(encontrado);
});

// PUT actualizar concesionario
app.put("/concesionarios/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = concesionarios.findIndex((c) => c.id === id);
  if (index === -1) return res.status(404).json({ message: "No encontrado" });

  concesionarios[index] = { ...concesionarios[index], ...req.body };
  res.json({ message: "Concesionario actualizado" });
});

// DELETE concesionario
app.delete("/concesionarios/:id", (req, res) => {
  const id = parseInt(req.params.id);
  concesionarios = concesionarios.filter((c) => c.id !== id);
  res.json({ message: "Concesionario eliminado" });
});

// ======================
// ENDPOINTS COCHES
// ======================

// GET coches de un concesionario
app.get("/concesionarios/:id/coches", (req, res) => {
  const id = parseInt(req.params.id);
  const concesionario = concesionarios.find((c) => c.id === id);
  if (!concesionario) return res.status(404).json({ message: "No encontrado" });

  res.json(concesionario.coches);
});

// POST añadir coche a un concesionario
app.post("/concesionarios/:id/coches", (req, res) => {
  const id = parseInt(req.params.id);
  const concesionario = concesionarios.find((c) => c.id === id);
  if (!concesionario) return res.status(404).json({ message: "No encontrado" });

  const nuevoCoche = {
    ...req.body,
    id: concesionario.coches.length,
  };
  concesionario.coches.push(nuevoCoche);
  res.json({ message: "Coche añadido", coche: nuevoCoche });
});

// GET coche específico
app.get("/concesionarios/:id/coches/:cocheId", (req, res) => {
  const id = parseInt(req.params.id);
  const cocheId = parseInt(req.params.cocheId);

  const concesionario = concesionarios.find((c) => c.id === id);
  if (!concesionario) return res.status(404).json({ message: "No encontrado" });

  const coche = concesionario.coches.find((c) => c.id === cocheId);
  if (!coche) return res.status(404).json({ message: "Coche no encontrado" });

  res.json(coche);
});

// PUT actualizar coche
app.put("/concesionarios/:id/coches/:cocheId", (req, res) => {
  const id = parseInt(req.params.id);
  const cocheId = parseInt(req.params.cocheId);

  const concesionario = concesionarios.find((c) => c.id === id);
  if (!concesionario) return res.status(404).json({ message: "No encontrado" });

  const cocheIndex = concesionario.coches.findIndex((c) => c.id === cocheId);
  if (cocheIndex === -1) return res.status(404).json({ message: "Coche no encontrado" });

  concesionario.coches[cocheIndex] = {
    ...concesionario.coches[cocheIndex],
    ...req.body,
  };

  res.json({ message: "Coche actualizado" });
});

// DELETE eliminar coche
app.delete("/concesionarios/:id/coches/:cocheId", (req, res) => {
  const id = parseInt(req.params.id);
  const cocheId = parseInt(req.params.cocheId);

  const concesionario = concesionarios.find((c) => c.id === id);
  if (!concesionario) return res.status(404).json({ message: "No encontrado" });

  concesionario.coches = concesionario.coches.filter((c) => c.id !== cocheId);
  res.json({ message: "Coche eliminado" });
});

// ======================
// ARRANCAR SERVIDOR
// ======================
app.listen(port, () => {
  console.log(`Servidor desplegado en puerto: ${port}`);
});
