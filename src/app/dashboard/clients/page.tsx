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
import { email } from 'zod/v4';
import { useEffect, useState } from 'react';

export default function Clients() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      const res = await fetch('/api/clients');
      const data = await res.json();
      setClientes(data);
    };
    fetchClientes();
  }, []);

  return (
    <div>
      <h1>Clientes</h1>
      <div className="flex gap-2 w-full">
        <Input placeholder="Pesquisar cliente" className="mb-4 bg-white" />
        <Button type="submit" variant="outline">
          Search
        </Button>
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
    </div>
  );
}
