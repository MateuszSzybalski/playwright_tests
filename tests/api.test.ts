import { test, expect, request as PlaywrightRequest } from '@playwright/test';

test.describe('API tests', () => {
  
  let apiContext: PlaywrightRequest.APIRequestContext;

  test.beforeAll(async () => {
    apiContext = await PlaywrightRequest.newContext();
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test('GET for posts', async () => {
    const response = await apiContext.get('https://jsonplaceholder.typicode.com/posts');
    expect(response.status()).toBe(200);
    
    const posts = await response.json();
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);
    
    expect(posts[0]).toHaveProperty('userId');
    expect(posts[0]).toHaveProperty('id');
    expect(posts[0]).toHaveProperty('title');
    expect(posts[0]).toHaveProperty('body');
  });

  test('POST for posts', async () => {
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

  test('GET for comments', async () => {
    const response = await apiContext.get('https://jsonplaceholder.typicode.com/comments');
    expect(response.status()).toBe(200);
    
    const comments = await response.json();
    expect(Array.isArray(comments)).toBe(true);
    expect(comments.length).toBeGreaterThan(0);
    
    expect(comments[0]).toHaveProperty('postId');
    expect(comments[0]).toHaveProperty('id');
    expect(comments[0]).toHaveProperty('name');
    expect(comments[0]).toHaveProperty('email');
    expect(comments[0]).toHaveProperty('body');
  });

  test('POST for comments', async () => {
    const newComment = {
      postId: 999,
      name: 'Tester',
      email: 'tester@test.com',
      body: 'Test'
    };

    const response = await apiContext.post('https://jsonplaceholder.typicode.com/comments', {data: newComment});
    expect(response.status()).toBe(201);

    const comment = await response.json();
    expect(comment).toHaveProperty('postId', newComment.postId);
    expect(comment).toHaveProperty('name', newComment.name);
    expect(comment).toHaveProperty('email', newComment.email);
    expect(comment).toHaveProperty('body', newComment.body);
    expect(comment).toHaveProperty('id');
  });
});
