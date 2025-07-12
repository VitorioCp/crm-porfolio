'use client';

import { BoxInfo } from '@/components/BoxInfo/boxInfo';

export default function DashboardPage() {
  return (
    <main className="p-10">
      <h1>Dashboard</h1>
      <p>Bem-vindo ao seu CRM, Vitório!</p>

      <div className="flex gap-5">
        <BoxInfo
          descricao="Comparado a 1 semana atrás."
          valor={14}
          novidades={5}
          topico="Clientes"
        />
        <BoxInfo
          descricao="last month"
          valor={"R$2.500,00"}
          novidades={'-8%'}
          topico="Receita"
        />
      </div>
    </main>
  );
}
