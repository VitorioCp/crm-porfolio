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
import { body } from 'framer-motion/client';

export default function Clients() {
  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    etapa: '',
  });
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [selectionMode, setSelectionMode] = useState(false);

  const fetchClientes = async () => {
    const res = await fetch('/api/clients');
    const data = await res.json();
    setClientes(data);
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const toggleSelectClient = (id: string) => {
    setSelectedClients((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = async () => {
  try {
    await Promise.all(
      selectedClients.map((id) =>
        fetch(`/api/clients`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        })
      )
    );
    setSelectedClients([]);
    setSelectionMode(false);
    fetchClientes();
  } catch (error) {
    console.error('Erro ao deletar clientes:', error);
  }
};

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
      await fetchClientes();
      setShowModal(false);
    } catch (error) {
      console.error('Error registering client:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Clientes</h1>

      <div className="flex flex-wrap gap-2 w-full mb-6 items-center">
        <Input
          placeholder="🔍 Buscar..."
          className="bg-white rounded-full px-4 py-2 flex-grow shadow-sm"
        />

        <div className="flex gap-2 justify-end w-full">
          {!selectionMode ? (
            <Button
              onClick={() => setSelectionMode(true)}
              className="bg-gray-100 text-black rounded-full px-4 py-2 hover:shadow transition"
            >
              🖉
            </Button>
          ) : (
            <>
              <Button
                onClick={handleDeleteSelected}
                disabled={selectedClients.length === 0}
                className="bg-red-500 text-white rounded-full px-4 py-2 hover:shadow transition"
              >
                🗑️
              </Button>
              <Button
                onClick={() => {
                  setSelectionMode(false);
                  setSelectedClients([]);
                }}
                className="bg-gray-200 text-black rounded-full px-4 py-2 hover:shadow transition"
              >
                ✕
              </Button>
            </>
          )}

          <Button
            onClick={modalClient}
            className="bg-blue-600 text-white rounded-full px-4 py-2 hover:shadow transition"
          >
            ➕
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              {selectionMode && <TableHead className="w-10">✔️</TableHead>}
              <TableHead>Nome</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Etapa</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clientes.map((cliente: any) => (
              <TableRow
                key={cliente.id}
                className={`transition hover:bg-gray-50 ${
                  selectedClients.includes(cliente.id) ? 'bg-gray-100' : ''
                }`}
              >
                {selectionMode && (
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedClients.includes(cliente.id)}
                      onChange={() => toggleSelectClient(cliente.id)}
                      className="accent-blue-600 scale-110"
                    />
                  </TableCell>
                )}
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
                className="rounded-full px-4 py-2 shadow"
              />
              <Input
                placeholder="Telefone"
                value={formData.telefone}
                onChange={(e) =>
                  setFormData({ ...formData, telefone: e.target.value })
                }
                className="rounded-full px-4 py-2 shadow"
              />
              <Input
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="rounded-full px-4 py-2 shadow"
              />
              <Input
                placeholder="Etapa"
                value={formData.etapa}
                onChange={(e) =>
                  setFormData({ ...formData, etapa: e.target.value })
                }
                className="rounded-full px-4 py-2 shadow"
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowModal(false)}
                  className="rounded-full px-4 py-2"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-600 text-white rounded-full px-4 py-2"
                >
                  Salvar
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
