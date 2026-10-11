import {expect, Locator, Page} from "@playwright/test";

export class WidgetPage {
    private readonly cookieWrapper: Locator;
    private readonly cookieButton: Locator;
    private readonly widgetWrapper: Locator;
    private readonly widgetOpenButton: Locator;
    private readonly widgetBody: Locator;
    private readonly popularArticleItem: Locator;
    private readonly writeToUsButton: Locator;
    private readonly widgetCloseButton: Locator;

    constructor(protected page: Page) {
        this.cookieWrapper = page.locator('._UCHI_COOKIE__wrap:not(._UCHI_COOKIE__wrap--fake)');
        this.cookieButton = this.cookieWrapper.locator('._UCHI_COOKIE__button');
        this.widgetWrapper = page.locator('[class^=widgetWrapper]:has(> [class^=widget__])');
        this.widgetOpenButton = page.getByTestId('openWidget');
        this.widgetBody = page.locator('[class^=widgetWrapper] > [class^=widget__]');
        this.popularArticleItem = page.getByTestId('article-list-item');
        this.writeToUsButton = page.getByTestId('button_feedback_form');
        this.widgetCloseButton = page.getByRole("button").and(page.locator('[class^=closeBtn]'));
    }

    async goto() {
        await this.page.goto('/');
    }

    async closeCookiesPopup() {
        await this.cookieButton.click();
    }

    async openWidget() {
        await this.widgetOpenButton.click();
    }

    async closeWidget() {
        await this.widgetCloseButton.click();
    }

    async checkWidgetIsVisible() {
        await expect(this.widgetBody).toBeVisible();
    }

    async checkWidgetIsNotVisible() {
        await expect(this.widgetBody).not.toBeVisible();
    }

    async clickFirstPopularArticle() {
        await this.popularArticleItem.first().click();
    }

    async clickWriteToUs() {
        await this.writeToUsButton.click();
    }

    async checkHeaderIsVisible(title: string) {
        await expect(this.widgetWrapper.getByRole('heading', {name: title, exact: true})).toBeVisible();
    }
}
