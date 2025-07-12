'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { s } from 'framer-motion/client';

export default function Clients() {
  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    etapa: '',
  });

  const fetchClientes = async () => {
    const res = await fetch('/api/clients');
    const data = await res.json();
    setClientes(data);
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const modalClient = () => {
    setShowModal(!showModal);
  };
  const clientRegister = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log('Cliente cadastrado:', data);
      await fetchClientes();
      setShowModal(false);
    } catch (error) {
      console.error('Error registering client:', error);
    }
  };
  return (
    <div>
      <h1>Clientes</h1>
      <div className="flex gap-2 w-full">
        <Input placeholder="Pesquisar cliente" className="mb-4 bg-white" />
        <Button type="submit" variant="outline">
          Search
        </Button>
        <Button onClick={modalClient}>Adicionar Cliente</Button>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Etapa</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clientes.map((cliente: any) => (
              <TableRow key={cliente.id}>
                <TableCell>{cliente.nome}</TableCell>
                <TableCell>{cliente.telefone}</TableCell>
                <TableCell>{cliente.email}</TableCell>
                <TableCell>{cliente.etapa}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Adicionar Cliente</h2>
            <form className="space-y-4" onSubmit={clientRegister}>
              <Input
                placeholder="Nome"
                value={formData.nome}
                onChange={(e) =>
                  setFormData({ ...formData, nome: e.target.value })
                }
              />
              <Input
                placeholder="Telefone"
                value={formData.telefone}
                onChange={(e) =>
                  setFormData({ ...formData, telefone: e.target.value })
                }
              />
              <Input
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <Input
                placeholder="Etapa"
                value={formData.etapa}
                onChange={(e) =>
                  setFormData({ ...formData, etapa: e.target.value })
                }
              />

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowModal(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Salvar</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
