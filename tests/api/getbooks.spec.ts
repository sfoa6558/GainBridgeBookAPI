import { test, expect } from '@playwright/test';

const GENRE = "Children Literature"
const AUTHOR = "Mark Twain"
const INVALID = 6;

test.beforeAll(async ({ request }) => {
  await request.post('/books', {
    data: {
      "title": "The Adventures of Tom Sawyer",
      "author": `${AUTHOR}`,
      "genre": `${GENRE}`,
      "reviews": [
        {
          "rating": 4.5,
          "comment": "Adventures of a mischievous young man"
        }
      ]

    }
  });

  await request.post('/books', {
    data: {
      "title": "Adventures of Huckleberry Finn",
      "author": `${AUTHOR}`,
      "genre": `${GENRE}`,
      "reviews": [
        {
          "rating": 5,
          "comment": "Adventures of a mischievous young man"
        }
      ]

    }
  });

  await request.post('/books', {
    data: {
      "title": "The Catcher in the Rye",
      "author": 'J.D. Salinger',
      "genre": 'Novel',
      "reviews": [
        {
          "rating": 5,
          "comment": "A novel about the complex issues of innocence, identity, belonging, loss, and depression"
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

  expect(body.books[0].title).toBe("The Adventures of Tom Sawyer");
  expect(body.books[0].author).toBe(`${AUTHOR}`);
  expect(body.books[0].genre).toBe(`${GENRE}`);
  expect(body.books[0].reviews).toContainEqual(
    {
      "rating": 4.5,
      "comment": "Adventures of a mischievous young man"
    }
  )

  expect(body.books[1].title).toBe("Adventures of Huckleberry Finn");
  expect(body.books[1].author).toBe(`${AUTHOR}`);
  expect(body.books[1].genre).toBe(`${GENRE}`);
  expect(body.books[1].reviews).toContainEqual(
    {
      "rating": 5,
      "comment": "Adventures of a mischievous young man."
    }
  )


});

test('returns a list of books', async ({ request }) => {

  const response = await request.get(`/books`);
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body.books.length).toEqual(3);

  expect(body.books[0].title).toBe("The Adventures of Tom Sawyer");
  expect(body.books[0].author).toBe(`${AUTHOR}`);
  expect(body.books[0].genre).toBe(`${GENRE}`);
  expect(body.books[0].reviews).toContainEqual(
    {
      "rating": 4.5,
      "comment": "Adventures of a mischievous young man"
    }
  )
  expect(body.books[1].title).toBe("Adventures of Huckleberry Finn");
  expect(body.books[1].author).toBe(`${AUTHOR}`);
  expect(body.books[1].genre).toBe(`${GENRE}`);
  expect(body.books[1].reviews).toContainEqual(
    {
      "rating": 5,
      "comment": "Adventures of a mischievous young man."
    }
  )

  expect(body.books[2].title).toBe("The Catcher in the Rye");
  expect(body.books[2].author).toBe("J.D. Salinger");
  expect(body.books[2].genre).toBe('Novel');
  expect(body.books[2].reviews).toContainEqual(
    {
      "rating": 5,
      "comment": "A novel about the complex issues of innocence, identity, belonging, loss, and depression"
    }
  )


});

test('returns a list of books by author', async ({ request }) => {

  const response = await request.get(`/books?author=/J.D. Salinger`);
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body.books.length).toEqual(1);


  expect(body.books[0].title).toBe("The Catcher in the Rye");
  expect(body.books[0].author).toBe("J.D. Salinger");
  expect(body.books[0].genre).toBe('Novel');
  expect(body.books[0].reviews).toContainEqual(
    {
      "rating": 5,
      "comment": "A novel about the complex issues of innocence, identity, belonging, loss, and depression"
    }
  )


});


test('returns a list of books by genre', async ({ request }) => {

  const response = await request.get(`/books?genre=/${GENRE}`);
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body.books.length).toEqual(2);


  expect(body.books[0].title).toBe("The Adventures of Tom Sawyer");
  expect(body.books[0].author).toBe(`${AUTHOR}`);
  expect(body.books[0].genre).toBe(`${GENRE}`);
  expect(body.books[0].reviews).toContainEqual(
    {
      "rating": 4.5,
      "comment": "Adventures of a mischievous young man"
    }
  )
  expect(body.books[1].title).toBe("Adventures of Huckleberry Finn");
  expect(body.books[1].author).toBe(`${AUTHOR}`);
  expect(body.books[1].genre).toBe(`${GENRE}`);
  expect(body.books[1].reviews).toContainEqual(
    {
      "rating": 5,
      "comment": "Adventures of a mischievous young man."
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