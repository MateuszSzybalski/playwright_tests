import { test, expect, request as PlaywrightRequest } from '@playwright/test';

test.describe('API tests', () => {
  
  let apiContext: PlaywrightRequest.APIRequestContext;

  test.beforeAll(async () => {
    apiContext = await PlaywrightRequest.newContext();
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test('GET - posts', async () => {
    const response = await apiContext.get('https://jsonplaceholder.typicode.com/posts');
    expect(response.status()).toBe(200);
    
    const get = await response.json();
    expect(Array.isArray(get)).toBe(true);
    expect(get.length).toBeGreaterThan(0);
    
    expect(get[0]).toHaveProperty('userId');
    expect(get[0]).toHaveProperty('id');
    expect(get[0]).toHaveProperty('title');
    expect(get[0]).toHaveProperty('body');
  });

  test('POST - posts', async () => {
    const newPost = {
        userId: 999,
        title: 'Tester Test',
        body: 'Test Test Test'
      };
  
      const response = await apiContext.post('https://jsonplaceholder.typicode.com/posts', {data: newPost});  
      expect(response.status()).toBe(201);
  
      const post = await response.json();
      expect(post).toHaveProperty('id');
      expect(post).toHaveProperty('userId', newPost.userId);
      expect(post).toHaveProperty('title', newPost.title);
      expect(post).toHaveProperty('body', newPost.body);
    });

    test('PUT - posts', async () => {
        const postId = 99;
        const newPut = {
          userId: 999,
          title: 'Tester Test',
          body: 'Test Test Test'
        };
    
        const response = await apiContext.put(`https://jsonplaceholder.typicode.com/posts/${postId}`, {data: newPut});    
        expect(response.status()).toBe(200);
    
        const put = await response.json();
        expect(put).toHaveProperty('id', postId);
        expect(put).toHaveProperty('userId', newPut.userId);
        expect(put).toHaveProperty('title', newPut.title);
        expect(put).toHaveProperty('body', newPut.body);
      });

  test('GET - comments', async () => {
    const response = await apiContext.get('https://jsonplaceholder.typicode.com/comments');
    expect(response.status()).toBe(200);
    
    const get = await response.json();
    expect(Array.isArray(get)).toBe(true);
    expect(get.length).toBeGreaterThan(0);
    
    expect(get[0]).toHaveProperty('postId');
    expect(get[0]).toHaveProperty('id');
    expect(get[0]).toHaveProperty('name');
    expect(get[0]).toHaveProperty('email');
    expect(get[0]).toHaveProperty('body');
  });

  test('POST - comments', async () => {
    const newPost = {
      postId: 999,
      name: 'Tester',
      email: 'tester@test.com',
      body: 'Test'
    };

    const response = await apiContext.post('https://jsonplaceholder.typicode.com/comments', {data: newPost});
    expect(response.status()).toBe(201);

    const post = await response.json();
    expect(post).toHaveProperty('postId', newPost.postId);
    expect(post).toHaveProperty('name', newPost.name);
    expect(post).toHaveProperty('email', newPost.email);
    expect(post).toHaveProperty('body', newPost.body);
    expect(post).toHaveProperty('id');
  });

  
  test('PUT - comments', async () => {
    const commentId = 99;
    const newPut = {
      postId: 999,
      userId: 999,
      name: 'Tester Test',
      email: 'tester@example.com',
      body: 'Test Test Test'
    };

    const response = await apiContext.put(`https://jsonplaceholder.typicode.com/comments/${commentId}`, {data: newPut});
    expect(response.status()).toBe(200);

    const put = await response.json();
    expect(put).toHaveProperty('id', commentId);
    expect(put).toHaveProperty('postId', newPut.postId);
    expect(put).toHaveProperty('userId', newPut.userId);
    expect(put).toHaveProperty('name', newPut.name);
    expect(put).toHaveProperty('email', newPut.email);
    expect(put).toHaveProperty('body', newPut.body);
  });
});
