import React, { useState } from "react";
const apiUrl = process.env.REACT_APP_API_URL;

function MedicamentoCreate() {
  const [usuarioId, setUsuarioId] = useState(1); // TODO: pegar o id do usuário logado
  const [nomeProduto, setNomeProduto] = useState("");
  const [nomeLab, setNomeLab] = useState("");
  const [imagemProduto, setImagemProduto] = useState("");
  const [dosagem, setDosagem] = useState("");
  const [tipoProduto, setTipoProduto] = useState("");
  const [precoUnitario, setPrecoUnitario] = useState("");
  const [totalEstoque, setTotalEstoque] = useState(0);
  const [descricao, setDescricao] = useState("");
  const [submitted, setSubmitted] = useState("");

  const cadastraMedicamento = async (event) => {
    event.preventDefault();
    console.log([
      usuarioId,
      nomeProduto,
      nomeLab,
      imagemProduto,
      dosagem,
      tipoProduto,
      precoUnitario,
      totalEstoque,
      descricao,
    ]);

    const formData = new FormData();
    formData.append("usuarioId", usuarioId);
    formData.append("nomeProduto", nomeProduto);
    formData.append("nomeLab", nomeLab);
    formData.append("imagemProduto", imagemProduto);
    formData.append("dosagem", dosagem);
    formData.append("tipoProduto", tipoProduto);
    formData.append("precoUnitario", precoUnitario);
    formData.append("totalEstoque", totalEstoque);
    formData.append("descricao", descricao);

    //Cria um objeto do formulário
    let formDataObject = Object.fromEntries(formData.entries());
    //Transforma o objeto em JSON
    let formDataJsonString = JSON.stringify(formDataObject);

    try {
      const response = await fetch(
        `${apiUrl}/produtos/admin/`,

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: formDataJsonString,
        }
      );

      if (response.ok) {
        setNomeProduto("");
        setNomeLab("");
        setSubmitted(true);
      } else {
        console.log("Falha cadastrando o medicamento");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center text-gray-500 text-sm">
      <div className="bg-white shadow-lg rounded-md p-3 md:p-10 flex flex-col w-11/12 max-w-lg">
        <div>
          {submitted ? (
            <p className="text-center">Medicamento cadastrado com sucesso!</p>
          ) : (
            <div>
              <h1 className="text-4xl font-extrabold text-center">
                Cadastrar Medicamento
              </h1>
              <form
                className="bg-white shadow-lg rounded-md p-3 md:p-10 flex flex-col w-10/11 max-w-lg group"
                onSubmit={cadastraMedicamento}
                noValidate
              >
                <label for="nomeProduto" className="mb-2">
                  <span>Nome do Medicamento</span>
                  <input
                    name="nomeProduto"
                    id="nomeProduto"
                    type="text"
                    className="w-full rounded border border-gray-300 bg-inherit p-2.5 shadow shadow-gray-100 mt-0 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                    placeholder=" "
                    required
                    pattern=".{5,}"
                    value={nomeProduto}
                    onChange={(e) => setNomeProduto(e.target.value)}
                  />
                  <span className="mt-0 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                    O Nome do Medicamento deve ter no mínimo 5 caracteres
                  </span>
                </label>

                <label for="nomeLab" className="mb-2">
                  <span>Nome do Laboratório</span>
                  <input
                    name="nomeLab"
                    id="nomeLab"
                    type="text"
                    className="w-full rounded border border-gray-300 bg-inherit p-2.5 shadow shadow-gray-100 mt-0 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                    placeholder=" "
                    required
                    pattern=".{5,}"
                    value={nomeLab}
                    onChange={(e) => setNomeLab(e.target.value)}
                  />
                  <span className="mt-0 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer">
                    O Nome do Laboratório deve ter no mínimo 5 caracteres
                  </span>
                </label>

                <label for="imagemProduto" className="mb-2">
                  <span>Link da Imagem</span>
                  <input
                    name="imagemProduto"
                    id="imagemProduto"
                    type="text"
                    className="w-full rounded border border-gray-300 bg-inherit p-2.5 shadow shadow-gray-100 mt-0 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                    value={imagemProduto}
                    onChange={(e) => setImagemProduto(e.target.value)}
                    placeholder="http://"
                    required
                    pattern=".{10,}"
                  />
                  <span className="mt-0 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                    O Link da Imagem é obrigatório
                  </span>
                </label>

                <label for="dosagem" className="mb-2">
                  <span>Dosagem</span>
                  <input
                    name="dosagem"
                    id="dosagem"
                    type="text"
                    className="w-full rounded border border-gray-300 bg-inherit p-2.5 shadow shadow-gray-100 mt-0 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                    value={dosagem}
                    onChange={(e) => setDosagem(e.target.value)}
                    placeholder=" "
                    required
                    pattern=".{2,}"
                  />
                  <span className="mt-0 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                    A dosagem é obrigatória
                  </span>
                </label>

                <label for="tipoProduto" className="mb-2">
                  <span>Tipo de Medicamento</span>
                  <input
                    name="tipoProduto"
                    id="tipoProduto"
                    type="text"
                    className="w-full rounded border border-gray-300 bg-inherit p-2.5 shadow shadow-gray-100 mt-0 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                    value={tipoProduto}
                    onChange={(e) => setTipoProduto(e.target.value)}
                    placeholder="Controlado / Não Controlado "
                    required
                    pattern="(Controlado|Não Controlado)"
                  />
                  <span className="mt-0 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                    O Tipo de Medicamento deve ser Controlado ou Não Controlado
                  </span>
                </label>

                <label for="precoUnitario" className="mb-2">
                  <span>Preço</span>
                  <input
                    name="precoUnitario"
                    id="precoUnitario"
                    type="number"
                    className="w-full rounded border border-gray-300 bg-inherit p-2.5 shadow shadow-gray-100 mt-0 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                    value={precoUnitario}
                    onChange={(e) => setPrecoUnitario(e.target.value)}
                    placeholder="R$ "
                    min={0.01}
                    step={0.01}
                    required
                    pattern="(0*[1-9]\d*(\.\d+)?|0+\.\d*[1-9]\d*)"
                  />
                  <span className="mt-0 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                    O valor precisa ser positivo
                  </span>
                </label>

                <label for="estoque" className="mb-2">
                  <span>Estoque</span>
                  <input
                    name="estoque"
                    id="estoque"
                    type="number"
                    className="w-full rounded border border-gray-300 bg-inherit p-2.5 shadow shadow-gray-100 mt-0 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                    value={totalEstoque}
                    onChange={(e) => setTotalEstoque(e.target.value)}
                    min={0}
                    required
                  />
                  <span className="mt-0 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                    O estoque não poder ser menor que 0
                  </span>
                </label>

                <label for="descricao">
                  <span>Descrição</span>
                  <textarea
                    name="descricao"
                    id="descricao"
                    className="w-full rounded border border-gray-300 bg-inherit p-2.5 shadow shadow-gray-100 mt-0 appearance-none outline-none text-neutral-800"
                    rows="3"
                    cols="5"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                  />
                </label>
                <button
                  type="submit"
                  class="mt-2 bg-blue-500 py-3 rounded-md text-white group-invalid:pointer-events-none group-invalid:opacity-50"
                >
                  Efetuar Cadastro
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MedicamentoCreate;