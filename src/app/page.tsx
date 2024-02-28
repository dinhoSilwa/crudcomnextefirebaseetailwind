"use client"
import { useState, useEffect, FormEvent } from "react";
import { getDocs, collection, deleteDoc, doc, addDoc, updateDoc } from "firebase/firestore";
import { database } from "./api/firebaseConfig";
import { PenIcon, Trash2 } from "lucide-react";
import { FirebaseError } from "firebase/firebase-error";
import { useRouter } from "next/router";

interface Contact {
  id: string;
  name: string;
  email: string;
  telefone: string;
  msg: string;
}

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [msg, setMsg] = useState('');
  const [editForm, setEditForms] = useState(false);
  const [contatos, setContatos] = useState<Contact[]>([]);
  const [userIdDb , setuserIdDb ] = useState<string>('');

  const registerDatabase = async (getData: Contact): Promise<boolean> => {
    try {
      await addDoc(collection(database, 'contatos'), getData);
      return true;
    } catch (error) {
      console.error("Falha ao conectar ", error);
      return false;
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const register = await registerDatabase({ name, email, telefone, msg });
      if (register) {
        console.log("Conectado com sucesso!");
      } else {
        console.log("Falha ao conectar");
      }
    } catch {
      console.error("Erro ao enviar os dados");
    }
  };

  useEffect(() => {
    async function getContactsForFetch() {
      try {
        const querySnapshot = await getDocs(collection(database, 'contatos'));
        const getContactsBd: Contact[] = [];
        querySnapshot.forEach((doc) => {
          getContactsBd.push({ id: doc.id, ...doc.data() } as Contact);
        });
        setContatos(getContactsBd);
        console.log("contatos Capturados com Sucesso")
      } catch (error) {
        console.error("Falha ao Capturar Contatos", error)
      }
    }
    getContactsForFetch();
  }, []);

  const handleIconUpdate = (dados: Contact) => {
    setEditForms(!editForm);
    setuserIdDb(dados.id);
    setName(dados.name);
    setEmail(dados.email);
    setTelefone(dados.telefone);
    setMsg(dados.msg);
  };

  const handleNewData = async () => {
    console.log(userIdDb);
    try {
      const toUpdateField: Contact = { id: userIdDb, name, email, telefone, msg };
      const docRef = doc(collection(database, 'contatos'), userIdDb);
      await updateDoc(docRef, toUpdateField);
      console.log("Documento atualizado com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar documento:", error);
    }
  };

  const deleteItemBd = async (dados: Contact) => {
    try {
      await deleteDoc(doc(database, "contatos", dados.id));
      console.log("Documento excluído com sucesso");
    } catch (error) {
      console.error("Erro ao excluir documento:", error);
    }
  };

  return (
    <>
      <main className="flex gap-10 items-center justify-center mt-10">
        <form className="flex flex-col p-8 bg-zinc-100 w-[40%] space-y-4" onSubmit={handleSubmit}>
          <legend>CRUD com NextJs e FireBase:</legend>
          <input defaultValue={name} type="text" placeholder="Digite o nome" className="p-3 rounded-xl" onChange={event => setName(event.target.value)} />
          <input defaultValue={email} type="text" placeholder="Digite o Email" className="p-3 rounded-xl" onChange={event => setEmail(event.target.value)} />
          <input defaultValue={telefone} type="tel" placeholder="Digite o telefone " className="p-3 rounded-xl" onChange={event => setTelefone(event.target.value)} />
          <input defaultValue={msg} type="text" placeholder="Observações" className="p-3 rounded-xl" onChange={event => setMsg(event.target.value)} />
          {editForm ? <button type="button" className="bg-blue-700 p-4 text-white" onClick={handleNewData}>Editar Dados</button> : <button type="submit" className="bg-green-500 p-4 text-white">Cadastrar</button>}
        </form>

        <div className="w-[40%] border overflow-y-auto h-[400px]">
          <header>
            Lista de contatos :
          </header>
          <section>
            {contatos.map((dados) => (
              <ul key={dados.id} className="bg-zinc-100 flex flex-col gap-3 p-8 border-zinc-800 border-b-2">
                <li>Nome: {dados.name}</li>
                <li>Email: {dados.email}</li>
                <li>Telefone: {dados.telefone}</li>
                <li>Mensagem: {dados.msg}</li>
                <li className="w-full flex gap-2 justify-end cursor-pointer">
                  <span onClick={() => deleteItemBd(dados)}>
                    <Trash2 className="text-red-600 hover:text-red-700" />
                  </span>
                  <span onClick={() => handleIconUpdate(dados)}>
                    <PenIcon className="text-zinc-800 hover:text-zinc-900" />
                  </span>
                </li>
              </ul>
            ))}
          </section>
        </div>
      </main>
    </>
  );
}
