// app/empresa/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EmpresaPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    setLoading(true);
    const res = await fetch("/api/companies/create", {
      method: "POST",
      body: JSON.stringify({ name }),
    });

    if (res.ok) {
      router.push("/dashboard"); // ou qualquer rota pós login
    } else {
      alert("Erro ao criar empresa");
    }

    setLoading(false);
  };

  const handleJoin = async () => {
    setLoading(true);
    const res = await fetch("/api/companies/join", {
      method: "POST",
      body: JSON.stringify({ companyId }),
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      alert("Erro ao entrar na empresa");
    }

    setLoading(false);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>
        <h2 className="text-xl font-semibold">Criar nova empresa</h2>
        <Input
          placeholder="Nome da empresa"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button onClick={handleCreate} disabled={loading || !name}  className="bg-secondary text-primary hover:bg-secondary/90 mt-4">
          Criar
        </Button>
      </div>

      <div className="border-t pt-6">
        <h2 className="text-xl font-semibold">Entrar em empresa existente</h2>
        <Input
          placeholder="ID da empresa (ou código)"
          value={companyId}
          onChange={(e) => setCompanyId(e.target.value)}
        />
        <Button onClick={handleJoin} disabled={loading || !companyId}  className="bg-secondary text-primary hover:bg-secondary/90 mt-4">
          Entrar
        </Button>
      </div>
    </div>
  );
}
