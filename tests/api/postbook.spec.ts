import { test, expect, type Page } from '@playwright/test';




test('creates a book with review', async ({ request }) => {
  const newBook = await request.post('/books', {
    data: {
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "genre": "Novel",
      "reviews": [
        {
          "rating": 4.5,
          "comment": "A mesmerizing tale of ambition and love."
        }
      ]

    }
  });
  expect(newBook.ok()).toBeTruthy();
  expect(newBook.status()).toBe(200);
  const responseBody = await newBook.json()
  expect(responseBody).toHaveProperty("id", "1");
  expect(responseBody).toHaveProperty("message", "Book added successfully.");



});

test('creates a book with no review', async ({ request }) => {
  const newBook = await request.post('/books', {
    data: {
      "title": "Long Division",
      "author": "Kiese Laymon",
      "genre": "Fiction"

    }
  });
  expect(newBook.ok()).toBeTruthy();
  expect(newBook.status()).toBe(200);
  const responseBody = await newBook.json()
  expect(responseBody).toHaveProperty("id", "2");
  expect(responseBody).toHaveProperty("message", "Book added successfully.");



});

test('creates a book with a number in the title', async ({ request }) => {
  const newBook = await request.post('/books', {
    data: {
      "title": 7,
      "author": "F. Scott Fitzgerald",
      "genre": "Novel"

    }
  });

  expect(newBook.ok()).toBeFalsy();
  expect(newBook.status()).toBe(400);

});

test('creates a book with no title', async ({ request }) => {
  const newBook = await request.post('/books', {
    data: {
      "author": "F. Scott Fitzgerald",
      "genre": "Novel",

    }
  });

  expect(newBook.ok()).toBeFalsy();
  expect(newBook.status()).toBe(400);

});

test('creates a book with no author', async ({ request }) => {
  const newBook = await request.post('/books', {
    data: {
      "title": "The Great Gatsby",
      "genre": "Novel",

    }
  });

  expect(newBook.ok()).toBeFalsy();
  expect(newBook.status()).toBe(400);

});

test('creates a book with no genre', async ({ request }) => {
  const newBook = await request.post('/books', {
    data: {
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",

    }
  });

  expect(newBook.ok()).toBeFalsy();
  expect(newBook.status()).toBe(400);

});

test('creates a book with a review and no rating', async ({ request }) => {
  const newBook = await request.post('/books', {
    data: {
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "genre": "Novel",
      "reviews": [
        {

          "comment": "A mesmerizing tale of ambition and love."
        }
      ]

    }
  });

  expect(newBook.ok()).toBeFalsy();
  expect(newBook.status()).toBe(400);

});

test('creates a book with a review and no comment', async ({ request }) => {
  const newBook = await request.post('/books', {
    data: {
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "genre": "Novel",
      "reviews": [
        {
          "rating": 4.5
        }
      ]

    }
  });

  expect(newBook.ok()).toBeFalsy();
  expect(newBook.status()).toBe(400);

});

test('creates a book with a review and a string for the rating', async ({ request }) => {
  const newBook = await request.post('/books', {
    data: {
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "genre": "Novel",
      "reviews": [
        {
          "rating": "4.5",
          "comment": "A mesmerizing tale of ambition and love."
        }
      ]

    }
  });

  expect(newBook.ok()).toBeFalsy();
  expect(newBook.status()).toBe(400);

});

test('creates a book with a review and a number for the comment', async ({ request }) => {
  const newBook = await request.post('/books', {
    data: {
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "genre": "Novel",
      "reviews": [
        {
          "rating": 4.5,
          "comment": 6
        }
      ]

    }
  });

  expect(newBook.ok()).toBeFalsy();
  expect(newBook.status()).toBe(400);

});


test('creates a book with international characters in title', async ({ request }) => {
  const newBook = await request.post('/books', {
    data: {
      "title": "à,é,î,õ,ü,åæ,œ,ç,Ð,ð,ø,¿,¡,ß",
      "author": "F. Scott Fitzgerald",
      "genre": "Novel",
      "reviews": [
        {
          "rating": 4.5,
          "comment": "A mesmerizing tale of ambition and love."
        }
      ]

    }
  });
  expect(newBook.ok()).toBeTruthy();
  expect(newBook.status()).toBe(200);
  const responseBody = await newBook.json()
  expect(responseBody).toHaveProperty("id", "3");
  expect(responseBody).toHaveProperty("message", "Book added successfully.");

});

test('creates a book with international characters in author', async ({ request }) => {
  const newBook = await request.post('/books', {
    data: {
      "title": "The Great Gatsby",
      "author": "à,é,î,õ,ü,åæ,œ,ç,Ð,ð,ø,¿,¡,ß",
      "genre": "Novel",
      "reviews": [
        {
          "rating": 4.5,
          "comment": "A mesmerizing tale of ambition and love."
        }
      ]

    }
  });
  expect(newBook.ok()).toBeTruthy();
  expect(newBook.status()).toBe(200);
  const responseBody = await newBook.json()
  expect(responseBody).toHaveProperty("id", "4");
  expect(responseBody).toHaveProperty("message", "Book added successfully.");

});

test.afterAll(async ({ request }) => {
  for (let i = 1; i <= 4; i++) {
    var response = await request.delete('/books/' + i);
    expect(response.ok()).toBeTruthy;
  }

});





