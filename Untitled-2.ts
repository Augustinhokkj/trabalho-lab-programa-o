// Classe que representa um livro
class Livro {
  constructor(titulo, autor, anoPublicacao, genero, isbn) {
    this.titulo = titulo;
    this.autor = autor;
    this.anoPublicacao = anoPublicacao;
    this.genero = genero;
    this.isbn = isbn;
    this.disponivel = true; // Disponível inicialmente
  }

  toString() {
    return `Título: ${this.titulo}, Autor: ${this.autor}, ISBN: ${this.isbn}`;
  }

  pegar() {
    this.disponivel = false;
  }

  devolver() {
    this.disponivel = true;
  }
}

// Classe que representa um membro da biblioteca
class Membro {
  constructor(nome, idMembro, dataNascimento, endereco) {
    this.nome = nome;
    this.idMembro = idMembro;
    this.dataNascimento = dataNascimento;
    this.endereco = endereco;
    this.livrosEmprestados = []; // Array de livros emprestados
  }

  toString() {
    return `Nome: ${this.nome}, ID do Membro: ${this.idMembro}`;
  }

  pegarLivro(livro) {
    if (this.livrosEmprestados.length < 3 && livro.disponivel) {
      this.livrosEmprestados.push(livro);
      livro.pegar();
      console.log(`O livro "${livro.titulo}" foi emprestado com sucesso por ${this.nome}.`);
    } else {
      if (this.livrosEmprestados.length >= 3) {
        console.log(
          `O membro "${this.nome}" atingiu o limite máximo de empréstimos de 3 livros.`
        );
      } else {
        console.log(`O livro "${livro.titulo}" não está disponível no momento.`);
      }
    }
  }

  devolverLivro(livro) {
    const indiceLivro = this.livrosEmprestados.findIndex(
      (livroEmprestado) => livroEmprestado.isbn === livro.isbn
    );

    if (indiceLivro !== -1) {
      this.livrosEmprestados.splice(indiceLivro, 1);
      livro.devolver();
      console.log(`O livro "${livro.titulo}" foi devolvido com sucesso por ${this.nome}.`);
    } else {
      console.log(
        `O membro "<span class="math-inline">\{this\.nome\}" não emprestou o livro "</span>{livro.titulo}".`
      );
    }
  }
}

// Classe que representa um empréstimo de biblioteca
class Emprestimo {
  constructor(livro, membro, dataEmprestimo, dataVencimento) {
    this.livro = livro;
    this.membro = membro;
    this.dataEmprestimo = dataEmprestimo;
    this.dataVencimento = dataVencimento;
    this.dataDevolucao = null; // Definido quando devolvido
  }

  toString() {
    return `Livro: ${this.livro.titulo}, Emprestador: ${this.membro.nome}, Data de Empréstimo: ${this.dataEmprestimo.toLocaleDateString()}, Data de Vencimento: ${this.dataVencimento.toLocaleDateString()}`;
  }

  atrasado() {
    return this.dataDevolucao === null && Date.now() > this.dataVencimento.getTime();
  }
}

// Classe principal da Biblioteca
class Biblioteca {
  constructor() {
    this.livros = [];
    this.membros = [];
    this.emprestimos = [];
  }

  adicionarLivro(livro) {
    this.livros.push(livro);
    console.log(`O livro "${livro.titulo}" foi adicionado à biblioteca.`);
  }

  removerLivro(livro) {
    const indiceLivro = this.livros.findIndex(
      (livroBiblioteca) => livroBiblioteca.isbn === livro.isbn
    );

    if (indiceLivro !== -1) {
      this.livros.splice(indiceLivro, 1);
      console.log(`O livro "${livro.titulo}" foi removido da biblioteca.`);
    } else {
      console.log(`O livro "${livro.titulo}" não foi encontrado na biblioteca.`);
    }
  }