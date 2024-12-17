import { useState } from "react";
import BettingEventCard from "../components/CardEvent/CardEvent";
import { NavBarComponent } from "../components/Navbar";
import { useBlock } from "../hooks/useBlock";
import { Button, Modal, TextInput } from "flowbite-react";
import { Account, accounts } from "../Utils/Types";

export default function Home() {
  const { useCreateBettingEvent, useEventDetails } = useBlock();

  // Hook para criar um novo evento
  const bettingEvent = useCreateBettingEvent();

  // Hook para buscar detalhes dos eventos
  const contract = "0xdBCe2c7230cfEA0153c78f1316828826A330B089";
  const { data: events, isLoading, error, refetch } = useEventDetails(contract);

  // Estados do Modal e inputs
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account>(accounts[0]);
  const [eventName, setEventName] = useState<string>("");
  const [outcome1, setOutcome1] = useState<string>("");
  const [outcome2, setOutcome2] = useState<string>("");
  const { privateKey, adm } = selectedAccount;

  // Função de envio do evento
  const handleCreateEvent = async () => {
    if (!outcome1 || !outcome2 || !eventName) {
      alert("Preencha todos os campos.");
      return;
    }

    try {
      await bettingEvent.mutateAsync({
        contractAddress: contract,
        privateKey,
        eventName,
        outcomes: [outcome1, outcome2], // Pegando valores dinâmicos
      });
      alert("Evento criado com sucesso!");
      setIsModalOpen(false);
      setEventName("");
      setOutcome1("");
      setOutcome2("");
      refetch(); // Atualiza os eventos na tela
    } catch (error) {
      console.error("Erro ao criar o evento:", error);
      alert("Erro ao criar o evento.");
    }
  };

  return (
    <main className="w-full min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-600 via-slate-600 to-slate-900">
      {/* Header */}
      <header className="flex items-center justify-center">
        <NavBarComponent
          setSelectedAccount={setSelectedAccount}
          selectedAccount={selectedAccount}
        />
      </header>

      {/* Seção Principal */}
      <section className="w-full flex justify-center py-5">
        <div className="w-full max-w-screen-lg flex flex-col gap-3">
          {/* Botão para abrir o modal */}
          {adm && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-caroline-blue border p-4 rounded-md text-white font-bold text-lg"
            >
              Adicionar Evento
            </button>
          )}

          {/* Renderização dinâmica dos eventos */}
          {isLoading && <p className="text-white">Carregando eventos...</p>}
          {error && (
            <p className="text-red-500">
              Erro ao buscar eventos: {error.message}
            </p>
          )}
          {events && events.length > 0 ? (
            events.map((event) => (
              <BettingEventCard key={event.eventId} event={event} adm={adm} privateKey={privateKey} contract={contract} />
            ))
          ) : (
            <p className="text-white">Nenhum evento disponível.</p>
          )}
        </div>
      </section>

      {/* Modal para criar evento */}
      <Modal show={isModalOpen} size="md" onClose={() => setIsModalOpen(false)}>
        <Modal.Header>Adicionar Novo Evento</Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nome do Evento
              </label>
              <TextInput
                placeholder="Nome do evento"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Outcome 1
              </label>
              <TextInput
                placeholder="Ex: Cara"
                value={outcome1}
                onChange={(e) => setOutcome1(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Outcome 2
              </label>
              <TextInput
                placeholder="Ex: Coroa"
                value={outcome2}
                onChange={(e) => setOutcome2(e.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setIsModalOpen(false)}>
            Cancelar
          </Button>
          <Button color="blue" onClick={handleCreateEvent}>
            Criar Evento
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
}
