import { test, expect } from '@playwright/test';

const GENRE = "Fiction"
const AUTHOR = "Herman Melville"
const INVALID = 6;

test.beforeAll(async ({ request }) => {
  await request.post('/books', {
    data: {
      "title": "Billy Budd,Sailor",
      "author": `${AUTHOR}`,
      "genre": `${GENRE}`,
      "reviews": [
        {
          "rating": 4.5,
          "comment": "The corruption of innocence by society"
        }
      ]

    }
  });

  await request.post('/books', {
    data: {
      "title": "Moby-Dick",
      "author": `${AUTHOR}`,
      "genre": `${GENRE}`,
      "reviews": [
        {
          "rating": 5,
          "comment": "An epic tale of man versus nature."
        }
      ]

    }
  });

  await request.post('/books', {
    data: {
      "title": "Heavy: An American Memoir",
      "author": 'Kiese Laymon',
      "genre": 'Memoir',
      "reviews": [
        {
          "rating": 5,
          "comment": "A memoir about a man dealing with issues"
        }
      ]

    }
  });

});


test('returns a filtered list of books by author and genre', async ({ request }) => {

  const response = await request.get(`/books?genre=/${GENRE}&author=${AUTHOR}`);
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body.books.length).toEqual(2);

  expect(body.books[0].title).toBe("Billy Budd,Sailor");
  expect(body.books[0].author).toBe(`${AUTHOR}`);
  expect(body.books[0].genre).toBe(`${GENRE}`);
  expect(body.books[0].reviews).toContainEqual(
    {
      "rating": 4.5,
      "comment": "The corruption of innocence by society"
    }
  )

  expect(body.books[1].title).toBe("Moby-Dick");
  expect(body.books[1].author).toBe(`${AUTHOR}`);
  expect(body.books[1].genre).toBe(`${GENRE}`);
  expect(body.books[1].reviews).toContainEqual(
    {
      "rating": 5,
      "comment": "An epic tale of man versus nature."
    }
  )


});

test('returns a list of books', async ({ request }) => {

  const response = await request.get(`/books`);
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body.books.length).toEqual(3);

  expect(body.books[0].title).toBe("Billy Budd,Sailor");
  expect(body.books[0].author).toBe(`${AUTHOR}`);
  expect(body.books[0].genre).toBe(`${GENRE}`);
  expect(body.books[0].reviews).toContainEqual(
    {
      "rating": 4.5,
      "comment": "The corruption of innocence by society"
    }
  )

  expect(body.books[1].title).toBe("Moby-Dick");
  expect(body.books[1].author).toBe(`${AUTHOR}`);
  expect(body.books[1].genre).toBe(`${GENRE}`);
  expect(body.books[1].reviews).toContainEqual(
    {
      "rating": 5,
      "comment": "An epic tale of man versus nature."
    }
  )

  expect(body.books[2].title).toBe("Heavy: An American Memoir");
  expect(body.books[2].author).toBe("Kiese Laymon");
  expect(body.books[2].genre).toBe('Memoir');
  expect(body.books[2].reviews).toContainEqual(
    {
      "rating": 5,
      "comment": "A memoir about a man dealing with issues"
    }
  )


});

test('returns a list of books by author', async ({ request }) => {

  const response = await request.get(`/books?author=/Kiese Laymon`);
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body.books.length).toEqual(1);


  expect(body.books[0].title).toBe("Heavy: An American Memoir");
  expect(body.books[0].author).toBe("Kiese Laymon");
  expect(body.books[0].genre).toBe('Memoir');
  expect(body.books[0].reviews).toContainEqual(
    {
      "rating": 5,
      "comment": "A memoir about a man dealing with issues"
    }
  )


});

test('returns a list of books with invalid genre parameter', async ({ request }) => {

  const response = await request.get(`/books?genre=/${INVALID}&author=${AUTHOR}`);
  expect(response.ok).toBeFalsy();




});

test('returns a list of books with invalid author parameter', async ({ request }) => {

  const response = await request.get(`/books?genre=/${GENRE}&author=${INVALID}`);
  expect(response.ok).toBeFalsy();



});

test.afterAll(async ({ request }) => {
  for (let i = 1; i <= 3; i++) {
    var response = await request.delete('/books/' + i);
    expect(response.ok()).toBeTruthy;
  }

});