'use client';

import { BoxInfo } from '@/components/BoxInfo/boxInfo';

export default function DashboardPage() {
  return (
    <main className="p-10">
      <h1>Dashboard</h1>
      <p>Bem-vindo ao seu CRM, Vitório!</p>

      <div className="flex gap-5">
        <BoxInfo
          descricao="Ultima semana"
          valor={14}
          novidades={5}
          topico="Clientes"
        />
        <BoxInfo
          descricao="Ultima semana"
          valor={"R$2.500,00"}
          novidades={-8}
          topico="Receita"
          exibirPorcentagem={true}
        />
      </div>
    </main>
  );
}
