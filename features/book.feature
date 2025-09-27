Feature: Fluxo completo de gerenciamento de usuário e livros na API DemoQA

  Scenario: Criar usuário, gerar token, verificar autorização e alugar livros
    Given que eu tenho um usuário com credenciais únicas
    When eu envio uma requisição para criar o usuário
    Then o usuário deve ser criado com sucesso
      And um "userId" deve ser retornado

    When eu gero um token de acesso com essas credenciais
    Then o token deve ser gerado com sucesso
      And o token deve ser retornado

    When eu verifico se o usuário está autorizado
    Then a resposta deve indicar que o usuário está autorizado

    When eu faço uma requisição para listar todos os livros disponíveis
    Then a resposta deve retornar pelo menos dois livros
      And seleciono os dois primeiros livros para aluguel

    When eu envio uma requisição para alugar os dois livros selecionados
    Then a resposta deve confirmar que dois livros foram alugados

    When eu faço uma requisição para listar os detalhes do usuário
    Then a resposta deve retornar o "userId" correto
      And deve conter os dois livros alugados com os ISBNs corretos
