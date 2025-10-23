# Instruções para Desenvolvimento Upload de Documentos para Loja de Carros

## Função Principal

### Desenvolver um sistema de upload de arquivos que:
- Faz upload de documentos no Filestash organizados por **placa de veículo**
- Aceita entradas de **arquivo e fotos** (jpgs,png,doc,docs,xlsx,pdf e relacionados)
- Categoria e Nomeia os arquivos para posteriormente efetuar o upload


### Regras:
- Placa será um input de texto required (com Validação/Máscara de Placa Normal e Mercosul) - Deve respeitar o formado ABC1234 ou Mercosul
- Cada arquivo deve ser feito upload na pasta da Placa/Categoria (usar FileStash API abaixo)
- O arquivo obrigatoriamente deve ter uma categoria
- O arquivo opcionalmente pode ter seu filename alterado pela ui


### Sugestão de UI MultiStep/Wizard
- 1. Haverá um dropzone que o cliente subirá todos seus arquivos, cada arquivo será um passo do form
- 2. Nos passos de cada arquivo ele vai ter 50% um preview, 50% um formulário, podendo alterar filename e categorizar, no último arquivo/passo usuário confirma e submete o formulário e uma rota de API sobe os arquivos pro filestash

***

## Organização de Documentos

### Estrutura de Pastas

```
/[PLACA]/
├── Manutenção/
├── Nota Fiscal/
├── Contrato/
├── Plano De Venda/
├── Débitos E Reembolso/
├── Fotos Do Veículo/
└── Outros/
```


### Categorias Obrigatórias

1. **Manutenção**
2. **Nota Fiscal**
3. **Contrato**
4. **Plano De Venda**
5. **Débitos E Reembolso**
6. **Fotos Do Veículo**
7. **Outros**

### Regras de Nomenclatura (SISTEMA DEVE NOMEAR)

Padrão:
`YEARMMDD_USERFILENAME_USERNAME.EXTENSAO`

**Exemplo:**
`20250914_TROCA_OLEO_NOTA_FERREIRA_SERVICOS_LTDA_FABIOGODOY.pdf`

***

## APIs Filestash

### Upload de Arquivo

```bash
curl "$INSTANCE/api/files/cat?share=$SHARE&key=$KEY&path=/CATEGORIA/ARQUIVO" \
  -X POST --data @arquivo_local
```
