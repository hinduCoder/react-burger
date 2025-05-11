import {
    LoginApiResponse,
    OrderApiResponse,
    UserResponse
} from '../../src/utils/types';
import { testIngredients } from './test-data';

describe('Burger constructor', () => {
    beforeEach(() => {
        cy.intercept('GET', '/api/ingredients', {
            body: {
                success: true,
                data: testIngredients
            }
        });
        cy.intercept('POST', '/api/auth/login', {
            body: {
                success: true,
                user: { name: 'Антон', email: 'antngribv@yandex.ru' },
                accessToken: 'access',
                refreshToken: 'refresh'
            } as LoginApiResponse
        });
        cy.intercept('GET', 'api/auth/user', {
            statusCode: 403
        });
        cy.intercept('POST', '/api/orders', {
            body: {
                success: true,
                order: {
                    number: 12345
                }
            } as OrderApiResponse
        }).as('postOrder');
    });
    it('opens constructor', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Соберите бургер');
    });

    it('opens ingredient detail modal', () => {
        cy.visit('http://localhost:3000');
        cy.get('[class^=ingredient-card_ingredient_card__]')
            .eq(2)
            .as('ingredient');

        cy.get('@ingredient').then(card => {
            const text = card.children().last().text();
            cy.wrap(card).click();

            cy.url().should('include', '/ingredient');

            cy.get('#modal').should('contain.text', text);
        });

        cy.contains('Детали ингредиента');

        cy.get('body').type('{esc}');

        cy.url().should('not.include', '/ingredient');
        cy.contains('Детали ингредиента').should('not.exist');
        cy.get('#modal').should('be.empty');
    });

    it('creates an order', () => {
        cy.visit('http://localhost:3000');

        cy.get('[class^=burger-ingredients_ingredients_list__]').as(
            'ingredient_list'
        );
        cy.get('[class^=burger-constructor_burger_constructor__]').as(
            'constructor'
        );

        cy.get('@ingredient_list')
            .find(
                '>div:nth-child(1) [class^=ingredient-card_ingredient_card__]'
            )
            .first()
            .as('bun');
        cy.get('@ingredient_list')
            .find(
                '>div:nth-child(2) [class^=ingredient-card_ingredient_card__]'
            )
            .first()
            .as('sauce');
        cy.get('@ingredient_list')
            .find(
                '>div:nth-child(3) [class^=ingredient-card_ingredient_card__]'
            )
            .first()
            .as('main');

        cy.get('@bun').drag('@constructor');
        cy.get('@sauce').drag('@constructor');
        cy.get('@main').drag('@constructor');

        cy.get('@constructor').find('button').click();

        cy.url().should('include', '/login');

        cy.get('input[name=email]').type('antngribv@yandex.ru');
        cy.get('input[name=password]').type('123456');

        cy.get('button').should('have.text', 'Войти').click();

        cy.contains('Соберите бургер');

        cy.get('@constructor').find('button').click();

        cy.wait('@postOrder');
        cy.get('#modal').should('contain', 'Ваш заказ начали готовить');
        cy.get('#modal').should('contain', '12345');
    });
});
