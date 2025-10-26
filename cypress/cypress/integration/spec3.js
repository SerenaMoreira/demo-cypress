describe('Teste End-to-End da Micro-Livraria', () => {
    
    it('Teste 1: Visita Página', () => {
        // abre o site
        cy.visit('http://localhost:5000/')
    })

    it('Teste 2: Verifica item na página', () => {
        // Verifica se existe o livro 'Design Patterns' com o data-id=3
        cy.get('[data-id=3]').should('contain.text', 'Design Patterns')
    })

    it('Teste 3: Calcula Frete', () => {
        // Calcula o frete para o livro 'Design Patterns'
        cy.get('[data-id=3]').within(() => {
            cy.get('input').type('10000-000') // Insere um CEP de exemplo
            cy.contains('Calcular Frete').click()
            cy.wait(2000) // Espera a requisição e a exibição do pop-up
        })
        
        // Verifica a mensagem de frete no pop-up (SweetAlert2)
        cy.get('.swal-text').contains('O frete é: R$')

        // Fecha o pop-up com o preço do frete
        cy.get('.swal-button').click()
    })

    // NOVO TESTE: SIMULAR A COMPRA DE UM LIVRO
    it('Teste 4: Compra de um Livro', () => {
        // Usa cy.contains para encontrar o botão 'Comprar' e clica nele
        cy.get('[data-id=3]').within(() => {
            cy.contains('Comprar').click()
        })
        
        // Espera o pop-up de confirmação de compra ser exibido.
        // O tempo de espera (wait) é crucial para requisições de rede.
        cy.wait(4000) 

        // 1. Verifica se no pop-up temos a mensagem de sucesso:
        cy.get('.swal-text').contains('Sua compra foi realizada com sucesso')

        // 2. Fecha o pop-up, clicando em seu botão
        cy.get('.swal-button').click()
    })
})