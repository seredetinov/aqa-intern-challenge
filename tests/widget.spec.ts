import {test} from '@playwright/test';
import {WidgetPage} from "./widget.page";

test.describe('Uchi.ru - Виджет базы знаний', () => {
    let widgetPage: WidgetPage;

    test.beforeEach(async ({context, page}) => {
        await test.step('Входим в АБ с поддержкой виджета', async () => {
            await context.addCookies([{
                name: 'ab_mainpage_redesign',
                value: 'a',
                url: 'https://uchi.ru',
            }]);
        });

        widgetPage = new WidgetPage(page);

        await test.step('Открываем Главную страницу', async () => {
            await widgetPage.goto();
        });

        await test.step('Скрываем попап с куками', async () => {
            await widgetPage.closeCookiesPopup();
        });
    });

    test('Открытие виджета', async () => {
        await test.step('Кликаем на кнопку открытия виджета', async () => {
            await widgetPage.openWidget();
        });

        await test.step('Проверяем, что виджет отображается', async () => {
            await widgetPage.checkWidgetIsVisible();
        });
    });

    test('Корректный заголовок на форме обращения в Поддержку', async () => {
        await test.step('Кликаем на кнопку открытия виджета', async () => {
            await widgetPage.openWidget();
        });

        await test.step('Кликаем на первую популярную статью', async () => {
            await widgetPage.clickFirstPopularArticle();
        });

        await test.step('Кликаем на кнопку "Написать нам"', async () => {
            await widgetPage.clickWriteToUs();
        });

        const expectedTitle = 'Связь с поддержкой';
        await test.step(`Проверяем, что форма имеет заголовок "${expectedTitle}"`, async () => {
            await widgetPage.checkHeaderIsVisible(expectedTitle);
        });
    });

    test('Закрытие виджета', async () => {
        await test.step('Кликаем на кнопку открытия виджета', async () => {
            await widgetPage.openWidget();
        });

        await test.step('Проверяем, что виджет отображается', async () => {
            await widgetPage.checkWidgetIsVisible();
        });

        await test.step('Кликаем на кнопку закрытия виджета', async () => {
            await widgetPage.closeWidget();
        });

        await test.step('Проверяем, что виджет не отображается', async () => {
            await widgetPage.checkWidgetIsNotVisible()
        });
    });
})
