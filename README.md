# 🐍 GruPy-VCA - Landing Page

Esta é a página oficial do **GruPy-VCA (Grupo de Usuários Python de Vitória da Conquista e Região)**. O projeto centraliza informações sobre eventos, meetups, fotos de encontros passados e canais de comunicação da comunidade.

A aplicação é uma Single Page Application (SPA) estática, construída para ser leve, rápida e hospedada gratuitamente via **GitHub Pages**.

---

## 🚀 Tecnologias Utilizadas

* **Frontend:** HTML5, JavaScript (Vanilla) e [Tailwind CSS](https://tailwindcss.com/) (via CDN).
* **Automação:** Python 3.10+ para processamento de dados e imagens.
* **Hospedagem:** GitHub Pages.
* **Dados:** Estrutura baseada em arquivos JSON locais (sem necessidade de banco de dados).

---

## 🛠️ Como o projeto funciona

O site funciona de forma orientada a dados. Em vez de editar o HTML para cada novo evento, utilizamos um script Python que varre a pasta `/events`, processa as informações e gera um índice global consumido pelo JavaScript.



---

## 📸 Como adicionar um novo evento

Para manter a organização, siga estes passos:

1.  **Crie a pasta do evento:** Dentro de `/events`, crie uma pasta seguindo o padrão `AAAA-MM-NOME-DO-EVENTO` (ex: `2026-02-python-no-ifba`).
2.  **Adicione os dados:** Crie um arquivo `data.json` dentro da pasta com a seguinte estrutura:
    ```json
    {
        "id": "slug-do-evento",
        "title": "Título do Encontro",
        "description": "Breve descrição do que aconteceu.",
        "date_start": "2026-02-15",
        "date_end": "2026-02-15",
        "link": "[https://link-da-inscricao.com](https://link-da-inscricao.com)",
        "images": {
            "cover": "capa.jpg",
            "gallery_path": "fotos/"
        }
    }
    ```
3.  **Fotos:** Coloque a imagem de capa na raiz da pasta e as fotos da galeria dentro da subpasta `/fotos`.
4.  **Processe os dados:** Rode o script de automação na raiz do projeto:
    ```bash
    python build_events.py
    ```
    *Este script irá renomear as fotos em ordem numérica, padronizar extensões e atualizar o índice global do site.*

---

## 🤝 Como contribuir

A comunidade é feita por voluntários! Você pode ajudar de várias formas:

### 💻 Código e Design
* Melhorando a responsividade da Landing Page.
* Criando novos componentes ou modais de galeria.
* Otimizando o script de build em Python.

### 📢 Conteúdo e Comunidade
* Sugerindo pautas para os próximos meetups.
* Atuando como **Community Manager** ou **Curador de Conteúdo**.
* Ajudando na divulgação dos eventos locais.

Para contribuir com código:
1. Faça um **Fork** do projeto.
2. Crie uma **Branch** para sua feature (`git checkout -b feature/nova-melhoria`).
3. Dê um **Commit** nas suas alterações (`git commit -m 'Adiciona nova funcionalidade'`).
4. Faça um **Push** para a Branch (`git push origin feature/nova-melhoria`).
5. Abra um **Pull Request**.

---

## ⚖️ Código de Conduta

O GruPy-VCA segue o **Código de Conduta da Python Brasil**, que preza pelo respeito, diversidade e inclusão. Não toleramos qualquer tipo de assédio ou comportamento inadequado em nossos canais ou eventos.

---

**Mantido com ❤️ pela comunidade Python de Vitória da Conquista.**