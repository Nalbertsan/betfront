import { useState } from "react";
import { Card, Tag, Divider, Modal, Input, Button, Select } from "antd";
import { EventDetails } from '../../api/ApiBlock'
import { useBlock } from "../../hooks/useBlock";

const { Option } = Select;

const BettingEventCard = ({ event, adm, contract, privateKey }: { event: EventDetails, adm: boolean, contract: string, privateKey: string }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOutcome, setSelectedOutcome] = useState<string | null>(null);
  const [betAmount, setBetAmount] = useState<number | undefined>(undefined);
  const { usePlaceBet, useFinalizeEvent } = useBlock();
  const place = usePlaceBet();
  const finalize = useFinalizeEvent();

  const showModal = () => {
    if (!event.finalized) {
      setIsModalVisible(true);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedOutcome(null);
    setBetAmount(undefined);
  };

  const handleConfirm = () => {
    if (selectedOutcome && betAmount) {
      place.mutate({
        contractAddress: contract,
        privateKey,
        eventId: event.eventId,
        outcome: selectedOutcome,
        amount: betAmount,
      }, {
      onSuccess: () => alert(`Aposta no resultado "${selectedOutcome}" confirmada com ${betAmount} ETH!`),
      onError: () => alert(`Aposta no resultado "${selectedOutcome}" Cancelada por falta de saldo!`)
      });
      handleCancel(); // Fecha o modal após confirmação
    } else {
      alert("Por favor, selecione uma opção e insira o valor da aposta.");
    }
  };

  const handleFinalizeEvent = (outcome: string, eventId: number, contractAddress: string, privateKey: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Impede a propagação do clique
    finalize.mutate({ contractAddress, privateKey, eventId, result: outcome });
    alert(`Evento ${outcome} finalizado com sucesso!`);
  };

  return (
    <>
      <Card
        className="p-8 shadow-lg bg-white rounded-lg"
        bordered
        onClick={showModal}
        hoverable
      >
        <h2 className="text-lg font-bold text-gray-700">
          Evento: <span className="text-blue-600">{event.eventName}</span>
        </h2>

        <Divider />

        <div className="my-4">
          <strong>Odds:</strong>
          <div className="flex justify-between">
            {Object.entries(event.odds).map(([key, value]) => (
              <div key={key}>
                <Tag color={event.eventResult === key ? "green" : "blue"}>
                  {key}
                </Tag>
                : {`${(Number(value) / 1e18).toFixed(2)} X`}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <Tag color={event.finalized ? "green" : "red"}>
            {event.finalized ? "Finalizado" : "Em andamento"}
          </Tag>

          {event.finalized && event.eventResult && (
            <div className="mt-2">
              <strong>Resultado:</strong> {event.eventResult}
            </div>
          )}
        </div>

        {!event.finalized && adm && (
          <>
            {Object.keys(event.outcomes).map((outcome) => (
              <Button
                key={outcome}
                type="primary"
                className="mt-4 mr-2"
                onClick={(e) => handleFinalizeEvent(outcome, event.eventId, contract, privateKey, e)}
              >
                Finalizar {outcome}
              </Button>
            ))}
          </>
        )}
      </Card>

      <Modal
        title="Fazer uma aposta"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancelar
          </Button>,
          <Button
            key="confirm"
            type="primary"
            onClick={handleConfirm}
            disabled={!selectedOutcome || !betAmount}
          >
            Confirmar Aposta
          </Button>,
        ]}
      >
        <div className="mb-4">
          <strong>Escolha uma opção:</strong>
          <Select
            placeholder="Selecione um resultado"
            className="w-full mt-2"
            onChange={(value) => setSelectedOutcome(value)}
            disabled={event.finalized}
          >
            {Object.keys(event.outcomes).map((key) => (
              <Option key={key} value={key}>
                {key} (Odds: {(Number(event.odds[key]) / 1e18).toFixed(2)} X)
              </Option>
            ))}
          </Select>
        </div>

        <div className="mb-4">
          <strong>Insira o valor da aposta:</strong>
          <Input
            type="number"
            placeholder="Valor em ETH"
            className="mt-2"
            onChange={(e) => setBetAmount(Number(e.target.value))}
            disabled={event.finalized}
          />
        </div>
      </Modal>
    </>
  );
};

export default BettingEventCard;
