import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface ClientData {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  etapa: string;
}

interface ModalEditClientProps {
  showEditModal: boolean;
  clientUpdate: (e: React.FormEvent) => void;
  setShowEditModal: (show: boolean) => void;
  formData: ClientData;
  setFormData: (data: ClientData) => void;
}

export const ModalEditClient = ({
  showEditModal,
  clientUpdate,
  setShowEditModal,
  formData,
  setFormData
}: ModalEditClientProps) => {
  if (!showEditModal) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Editar Cliente</h2>
        <form className="space-y-4" onSubmit={clientUpdate}>
          <Input
            name="nome"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleChange}
            className="rounded-full px-4 py-2 shadow"
          />
          <Input
            name="telefone"
            placeholder="Telefone"
            value={formData.telefone}
            onChange={handleChange}
            className="rounded-full px-4 py-2 shadow"
          />
          <Input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="rounded-full px-4 py-2 shadow"
          />
          <Input
            name="etapa"
            placeholder="Etapa"
            value={formData.etapa}
            onChange={handleChange}
            className="rounded-full px-4 py-2 shadow"
          />
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => setShowEditModal(false)}
              className="rounded-full px-4 py-2"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 text-white rounded-full px-4 py-2"
            >
              Atualizar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};