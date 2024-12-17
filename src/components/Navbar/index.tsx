import { useState } from "react";
import {
  Dropdown,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
  Button,
  Modal,
  TextInput,
} from "flowbite-react";
import { useBlock } from "../../hooks/useBlock";

// Tipo e contas de teste
type Account = {
  adm: boolean;
  accountAddress: string;
  privateKey: string;
};

export const accounts: Account[] = [
  {
    adm: true,
    accountAddress: "0x56674f87d9F8bFbc22F7F256a8BA813cc1D821D1",
    privateKey: "0xa03cf99a5ad99c123677f256effb1af8daef3cc2b00d50e22da5ed15ceb33a48",
  },
  {
    adm: false,
    accountAddress: "0xD13e5c077024B7eEb8266c5D13B5ab62f1130Be0",
    privateKey: "0xeed98686b793008277fea9820acc350e381bbd015d39303796c0a9a3de75ef9e",
  },
  {
    adm: false,
    accountAddress: "0x5df057eFeccA99cB8D26f90AfFF99449F924Ec03",
    privateKey: "0x70deae725b6909634a89c8d8b26b01b9e79db27f2e6ef4cc7bf7268fc033d76b",
  },
  {
    adm: false,
    accountAddress: "0x73A65f76ad7f12FCc5e7Bb051eCC4F9284c4dCDE",
    privateKey: "0x4f28359ea82d51efcfbd11db35aa0bcd5f8a7831fb7ad2eaa404ca9c4bba757e",
  },
  {
    adm: false,
    accountAddress: "0xB64b6dF1a6E864796ef067fc03368f663290F84C",
    privateKey: "0x5cb6e4308b0cd1da502b3187eab8b3e5b51e075f5e8c0525e0ab1acc82525fdb",
  },
];

interface NavBarComponentProps {
  selectedAccount: Account,
  setSelectedAccount: React.Dispatch<React.SetStateAction<Account>>
}

export function NavBarComponent({selectedAccount,setSelectedAccount}:NavBarComponentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"deposit" | "withdraw">("deposit");
  const [transactionAmount, setTransactionAmount] = useState<number>(0);

  const { useBalance, useContractBalance, useDeposit, useWithdraw } = useBlock();

  const contract = "0xdBCe2c7230cfEA0153c78f1316828826A330B089";

  const depositMutation = useDeposit();
  const withdrawMutation = useWithdraw();

  const handleTransaction = async () => {
    const { privateKey } = selectedAccount;

    if (modalType === "deposit") {
      try {
        await depositMutation.mutateAsync({
          fromAddress: contract,
          privateKey: privateKey,
          value: transactionAmount,
        });
      } catch (error) {
        console.error("Erro ao realizar depósito:", error);
      }
    } else if (modalType === "withdraw") {
      try {
        await withdrawMutation.mutateAsync({
          fromAddress: contract,
          privateKey: privateKey,
        });
      } catch (error) {
        console.error("Erro ao realizar retirada:", error);
      }
    }
    setTransactionAmount(0);
    setIsModalOpen(false);
  };

  const formatCurrency = (value: bigint) =>
    `${(Number(value) / 1e18).toFixed(2)} ETH`; // Converte bigint para número antes de formatar

  return (
    <Navbar fluid rounded className="w-full text-base font-semibold">
      <NavbarBrand>
        <div className=""></div>
      </NavbarBrand>

      <NavbarCollapse>
        {/* Dropdown de contas */}
        <Dropdown
          label={selectedAccount.accountAddress || "Selecione uma conta"}
          inline
          arrowIcon={true}
          className="mr-4"
        >
          {accounts.map((account) => (
            <DropdownItem
              key={account.accountAddress}
              onClick={() => setSelectedAccount(account)}
            >
              {account.accountAddress} {account.adm && "(ADM)"}
            </DropdownItem>
          ))}
        </Dropdown>

        {/* Informações de saldo */}
        <div className="flex items-center gap-4">
          <div>
            <strong>Carteira:</strong>{" "}
            {formatCurrency(useBalance(selectedAccount.accountAddress).data)}
          </div>
          <div>
            <strong>Site:</strong>{" "}
            {formatCurrency(
              useContractBalance(contract, selectedAccount.privateKey).data
            )}
          </div>
        </div>

        {/* Botões de depósito e retirada */}
        <div className="flex gap-2">
          <Button
            color="green"
            onClick={() => {
              setModalType("deposit");
              setIsModalOpen(true);
            }}
          >
            Depositar
          </Button>
          <Button
            color="red"
            onClick={() => {
              setModalType("withdraw");
              setIsModalOpen(true);
            }}
          >
            Retirar Tudo
          </Button>
        </div>
      </NavbarCollapse>

      <div className="flex items-center gap-2">
        <NavbarToggle />
      </div>

      {/* Modal de depósito/retirada */}
      <Modal
        show={isModalOpen}
        size="md"
        onClose={() => setIsModalOpen(false)}
        className="p-4"
      >
        <Modal.Header>
          {modalType === "deposit" ? "Depósito" : "Retirada"}
        </Modal.Header>
        <Modal.Body>
          {modalType === "deposit" ? (
            <>
              <p>Digite o valor que deseja depositar:</p>
              <TextInput
                type="number"
                value={transactionAmount}
                onChange={(e) => setTransactionAmount(Number(e.target.value))}
                placeholder="Valor em ETH"
              />
            </>
          ) : (
            <p>Tem certeza de que deseja retirar todo o valor?</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setIsModalOpen(false)}>
            Cancelar
          </Button>
          <Button color="blue" onClick={handleTransaction}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
}
