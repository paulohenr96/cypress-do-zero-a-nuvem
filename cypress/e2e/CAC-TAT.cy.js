// describe('template spec', () => {
//   it('passes', () => {
//     cy.visit('https://example.cypress.io')
//   })
// })


describe('Index', () => {
  beforeEach(() => cy.visit('../../src/index.html'))

  it('verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')


  })
  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText=Cypress._.repeat('abcdefghijklmnopqrstuvwxyz',2)
    
    cy.get('input[name="firstName"]').type('Fulano')
    cy.get('input[name="lastName"]').type('Silva')
    cy.get('input[name="email"]').first().type('fulano@email.com')
    cy.get('input[name="phone"]').first().type('(15)99343-1234')
    cy.get('textarea').type(longText,{delay:0})
    cy.contains('Enviar').click()
    cy.get('.success').should('be.visible')

  })


  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    const longText=Cypress._.repeat('abcdefghijklmnopqrstuvwxyz',1)

    cy.get('input[name="firstName"]').type('Fulano')
    cy.get('input[name="lastName"]').type('Silva')
    cy.get('input[name="email"]').first().type('fulanoemail.com')
    cy.get('input[name="phone"]').first().type('(15)99343-1234')
    cy.get('textarea').type(longText,{delay:0})
    cy.contains('Enviar').click()
    cy.get('.error').should('be.visible')


  })

   it('O campo telefone continua vazio mesmo se inserir', () => {
    const longText=Cypress._.repeat('abcdefghijklmnopqrstuvwxyz',1)

    cy.get('input[name="firstName"]').type('Fulano')
    cy.get('input[name="lastName"]').type('Silva')
    cy.get('input[name="email"]').first().type('fulano@email.com')
    cy.get('input[name="phone"]')
      .first()
      .type('abcde')
      .should('have.value','')
    


  })
   it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    const longText=Cypress._.repeat('abcdefghijklmnopqrstuvwxyz',1)

    cy.get('input[name="firstName"]').type('Fulano')
    cy.get('input[name="lastName"]').type('Silva')
    cy.get('input[name="email"]').first().type('fulano@email.com')
    cy.get("#phone-checkbox").click();
    cy.get('textarea').type(longText,{delay:0})
    cy.contains('Enviar').click()
    cy.get('.error').should('be.visible')

  })
   it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    const longText=Cypress._.repeat('abcdefghijklmnopqrstuvwxyz',1)

    cy.get('input[name="firstName"]').type('Fulano')
      .should('have.value','Fulano')
      .clear()
      .should('have.value','')
    cy.get('input[name="lastName"]').type('Silva')
      .should('have.value','Silva')
      .clear()
      .should('have.value','')
    cy.get('input[name="email"]').first().type('fulano@email.com')
      .should('have.value','fulano@email.com')
      .clear()
      .should('have.value','')
    cy.get('input[name="phone"]').first().type('15993431234')
      .should('have.value','15993431234')
      .clear()
      .should('have.value','')
    cy.get('textarea').type(longText)
      .should('have.value',longText)
      .clear()
      .should('have.value','')
   

  })
   it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
   
   
    cy.contains('Enviar').click()
    cy.get('.error').should('be.visible')

  })


  it('preenche os campos obrigatórios e envia o formulário usando app action', () => {
    const longText=Cypress._.repeat('abcdefghijklmnopqrstuvwxyz',2)
    const formulario={
      firstName:'Fulano',
      lastName:'Silva',
      email:'fulano@email.com',
      phone:'(15)99343-1234',
      textarea:longText
    }
    cy.fillMandatoryFieldsAndSubmit(formulario)
    cy.get('.success').should('be.visible')

  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('Youtube').should('have.value','youtube');
  })
  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select('mentoria').should('have.value','mentoria');
  })
 it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product').select(1).should('have.value','blog');
  })


  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="Feedback"]')
      .check()
      .should('be.checked')
  })
  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]').each(($radio, index,$list) => {

      cy.wrap($radio)
      .check()
      .should('be.checked')
    })
     
  })


  it('marca ambos checkboxes, depois desmarca o último', () => {
   

    cy.get('input[type="checkbox"]')
      .as('checkboxes')
      .check()
    cy.get('@checkboxes')
      .each(checkbox => {
      expect(checkbox[0].checked).to.equal(true)
    }).last().uncheck().should('not.be.checked') 
  })


  
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
   
    const longText=Cypress._.repeat('abcdefghijklmnopqrstuvwxyz',2)
    
    cy.get('input[name="firstName"]').type('Fulano')
    cy.get('input[name="lastName"]').type('Silva')
    cy.get('input[name="email"]').first().type('fulano@email.com')
    cy.get('#phone-checkbox').check()
    cy.get('textarea').type(longText,{delay:0})
    cy.contains('Enviar').click()
    cy.get('.error').should('be.visible')


  })
  
  it('seleciona um arquivo da pasta fixtures', () => {
   
    // cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json').then(input => {

    //   expect(input[0].files[0].name).to.equal('example.json')
    // })
    cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json').should(input => {

      expect(input[0].files[0].name).to.equal('example.json')
    })
  })


   it('seleciona um arquivo simulando um drag-and-drop', () => {
   
    
    cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json',{action:'drag-drop'}).should(input => {

      expect(input[0].files[0].name).to.equal('example.json')
    })
  })


  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
   

    cy.fixture('example.json',{encoding:null}).as('exampleFile')
    
    cy.get('input[type="file"]').selectFile('@exampleFile').should(input => {

      expect(input[0].files[0].name).to.equal('example.json')
    })
  })
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
   

    cy.contains('a','Política de Privacidade').should('have.attr', 'target', '_blank').and('have.attr','href','privacy.html')
  })
  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
   
    cy.contains('a','Política de Privacidade').invoke('removeAttr', 'target').click();

    cy.contains('h1','CAC TAT - Política de Privacidade').should('be.visible')
  })

    it.only('testa a página da política de privacidade de forma independente', () => {
       cy.contains('a','Política de Privacidade').invoke('removeAttr', 'target').click();

    cy.get('.privacy').should('be.visible');

  })
}); 