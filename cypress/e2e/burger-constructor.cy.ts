import {
    LoginApiResponse,
    OrderApiResponse,
    UserResponse
} from '../../src/utils/types';
import { testIngredients } from './test-data';

describe('Burger constructor', () => {
    const modalSelector = '#modal';
    const ingredientCardDataSelector = 'ingredient_card';

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
        cy.visit('');
        cy.contains('Соберите бургер');
    });

    it('opens ingredient detail modal', () => {
        cy.visit('');
        cy.getByCyData(ingredientCardDataSelector).eq(2).as('ingredient');

        cy.get('@ingredient').then(card => {
            const text = card.children().last().text();
            cy.wrap(card).click();

            cy.url().should('include', '/ingredient');

            cy.get(modalSelector).should('contain.text', text);
        });

        cy.contains('Детали ингредиента');

        cy.get('body').type('{esc}');

        cy.url().should('not.include', '/ingredient');
        cy.contains('Детали ингредиента').should('not.exist');
        cy.get(modalSelector).should('be.empty');
    });

    it('creates an order', () => {
        cy.visit('');

        cy.getByCyData('ingredients_list').as('ingredient_list');
        cy.getByCyData('burger_constructor').as('constructor');

        cy.get('@ingredient_list')
            .children()
            .eq(0)
            .findByCyData(ingredientCardDataSelector)
            .first()
            .as('bun');
        cy.get('@ingredient_list')
            .children()
            .eq(1)
            .findByCyData(ingredientCardDataSelector)
            .first()
            .as('sauce');
        cy.get('@ingredient_list')
            .children()
            .eq(2)
            .findByCyData(ingredientCardDataSelector)
            .first()
            .as('main');

        cy.get('@bun').drag('@constructor');
        cy.get('@sauce').drag('@constructor');
        cy.get('@main').drag('@constructor');

        cy.get('@constructor').find('button').click();

        cy.url().should('include', '/login');

        cy.getByCyData('email_input').type('antngribv@yandex.ru');
        cy.getByCyData('password_input').type('123456');

        cy.get('button').should('have.text', 'Войти').click();

        cy.contains('Соберите бургер');

        cy.get('@constructor').find('button').click();

        cy.wait('@postOrder');
        cy.get(modalSelector).should('contain', 'Ваш заказ начали готовить');
        cy.get(modalSelector).should('contain', '12345');
    });
});
