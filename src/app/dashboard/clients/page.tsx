import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function clients() {
  return (
    <div>
      <h1>Clientes</h1>
      <div className='flex gap-2 w-full '>
        <Input placeholder="Pesquisar cliente" className="mb-4 bg-white" />
        <Button type="submit" variant="outline">
          Search
        </Button>
      </div>


      <div>
        <p>Lista de clientes será exibida aqui.</p>
      </div>
    </div>
  );
}
