import { test, expect } from "@playwright/test";

test("GET Listar usuários e validar dados", async ({ request }) => {
  const response = await request.get("https://reqres.in/api/users?page=2");

  expect(response.status()).toBe(200);

  // Parseando a resposta como JSON
  const responseBody = await response.json();

  expect(Array.isArray(responseBody.data)).toBeTruthy();

  for (const user of responseBody.data) {
    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("first_name");
    expect(user).toHaveProperty("last_name");
    expect(user).toHaveProperty("email");

    const emailRegexValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect(emailRegexValidation.test(user.email)).toBeTruthy();
  }
});

test("POST Criar um usuário", async ({ request }) => {
  const BASE_URL = "https://reqres.in/api/users";
  const HEADERS = {
    "Content-Type": "application/json",
    "x-api-key": "reqres-free-v1",
  };

  const payload = {
    name: "Mavis",
    job: "Gatinha",
  };

  const startTime = Date.now();
  const response = await request.post(BASE_URL, {
    data: payload,
    headers: HEADERS,
  });

  const endTime = Date.now();

  const responseTime = endTime - startTime;

  expect(responseTime).toBeLessThanOrEqual(1000);
  expect(response.status()).toBe(201);

  const responseBody = await response.json();

  expect(responseBody.name).toBe(payload.name);
  expect(responseBody.job).toBe(payload.job);
  expect(responseBody).toHaveProperty("id");
  expect(responseBody).toHaveProperty("createdAt");
});

test("PUT  Atualizar um usuário", async ({ request }) => {
  const BASE_URL = "https://reqres.in/api/users";
  const HEADERS = {
    "Content-Type": "application/json",
    "x-api-key": "reqres-free-v1",
  };

  const payload = {
    name: "Maria Eduarda",
    job: "Residente Fisioterapia",
  };

  const startTime = Date.now();
  const response = await request.put(`${BASE_URL}/2`, {
    data: payload,
    headers: HEADERS,
  });

  const endTime = Date.now();

  const responseTime = endTime - startTime;

  expect(responseTime).toBeLessThanOrEqual(1000);
  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  expect(responseBody.name).toBe(payload.name);
  expect(responseBody.job).toBe(payload.job);
  expect(responseBody).toHaveProperty("updatedAt");
});

test("DELETE  Usuário inexistente deve retornar 204 e não 404 conforme API", async ({
  request,
}) => {
  const BASE_URL = "https://reqres.in/api/users";
  const HEADERS = {
    "Content-Type": "application/json",
    "x-api-key": "reqres-free-v1",
  };
  const response = await request.delete(`${BASE_URL}/999`, {
    headers: HEADERS,
  });
  expect(response.status()).toBe(204);
});

test("Simulando e validando erros e tratamentos", async ({ request }) => {
  const BASE_URL = "https://reqres.in/api/users";
  const HEADERS = {
    "Content-Type": "application/json",
    "x-api-key": "reqres-free-v1",
  };
  try {
    await request.get(BASE_URL, {
      headers: HEADERS,
      timeout: 1,
    });
    throw new Error("A requisição não deve ter sucesso.");
  } catch (error: any) {
    expect(error.message).toContain("timed out");
  }
});

test("Simulando e validando falhas na rede", async ({ page }) => {
  await page.route("**/*", (route) => {
    route.abort("failed");
  });
  try {
    await page.goto("https://reqres.in", { waitUntil: "domcontentloaded" });
    throw new Error("Navegação não deve ser bem sucedida");
  } catch (error: any) {
    expect(error.message).toContain("net::ERR_FAILED");
  }
});
