import { test, expect, type Page } from '@playwright/test';



test.beforeAll(async ({ request }) => {
    await request.post('/books', {
        data: {
            "title": "Billy Budd,Sailor",
            "author": "Herman Melville",
            "genre": "Fiction"

        }
    });

    await request.post('/books', {
        data: {
            "title": "Moby Dick",
            "author": "Herman Melville",
            "genre": "Fiction",
            "reviews": [
                {
                    "rating": 4.5,
                    "comment": "The corruption of innocence by society"
                }
            ]

        }
    });

});


test('deletes specific book with no review', async ({ request }) => {

    const response = await request.delete('/books/1');
    expect(response.ok()).toBeTruthy()

});

test('deletes specific book with review', async ({ request }) => {

    const response = await request.delete('/books/2');
    expect(response.ok()).toBeFalsy()

});


test('deletes book with invalid id', async ({ request }) => {

    const response = await request.delete('/books/3');
    expect(response.ok()).toBeFalsy()

});

test.afterAll(async ({ request }) => {
    for (let i = 1; i <= 2; i++) {
        var response = await request.delete('/books/' + i);
        expect(response.ok()).toBeTruthy;
    }

});