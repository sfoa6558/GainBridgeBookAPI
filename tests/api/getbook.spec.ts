import { test, expect, type Page } from '@playwright/test';



test.beforeAll(async ({ request }) => {
    await request.post('/books', {
        data: {
            "title": "Heavy",
            "author": "Kiese Laymon",
            "genre": "Memoir",
            "reviews": [
                {
                    "rating": 5,
                    "comment": "A memoir about a man dealing with issues"
                }
            ]

        }
    });




});


test('returns details of specific book with valid id', async ({ request }) => {

    const response = await request.get('/books/1');
    expect(response.ok()).toBeTruthy()
    const body = await response.json();

    expect(await body.json()).toContainEqual(expect.objectContaining({
        "id": "1",
        "title": "Heavy",
        "author": "Kiese Laymon",
        "genre": "Fiction",
        "reviews": [
            {
                "reviewId": "r1",
                "rating": 5,
                "comment": "A memoir about a man dealing with issues"
            }
        ]
    }));

});

test('returns details of specific book with invalid id', async ({ request }) => {

    const response = await request.get('/books/2');
    expect(response.ok()).toBeFalsy()



});

test.afterAll(async ({ request }) => {

    var response = await request.delete('/books/1');
    expect(response.ok()).toBeTruthy;


});
