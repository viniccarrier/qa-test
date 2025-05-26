import { test, expect } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config();

test("Deve logar na plataforma saucedemo com sucesso ao inserir as credenciais de usuário e senha", async ({
  page,
}) => {
  await page.goto("https://saucedemo.com/");

  const username = process.env.USER;

  const password = process.env.PASSWORD;

 const tituloProdutos = page.locator('[data-test="title"]');

  if (!username || !password) {
    throw new Error(
      "Usuário ou Senha não definidos no arquivo de configuração .env"
    );
  }

  await page.fill("#user-name", username);
  await page.fill("#password", password);

  await page.click("#login-button");

  await expect(tituloProdutos).toBeVisible();
});

test("Deve apresentar mensagem de error ao tentar logar com credenciais inválidas", async ({
  page,
}) => {
  await page.goto("https://saucedemo.com/");

  const username = "Teste123";

  const password = "123Teste";

  const errorMassge = page.locator('[data-test="error"]');

  await page.fill("#user-name", username);
  await page.fill("#password", password);

  await page.click("#login-button");

  await expect(errorMassge).toHaveText(
    "Epic sadface: Username and password do not match any user in this service"
  );
});

test("Adicionar 3 itens ao carrinho na plataforma Saudecemo", async ({
  page,
}) => {
  await page.goto("https://saucedemo.com/");

  const username = process.env.USER;
  const password = process.env.PASSWORD;
 const tituloProdutos = page.locator('[data-test="title"]');
  const cartBadge = page.locator(".shopping_cart_badge");
  const addItemsCart = [
    "add-to-cart-sauce-labs-backpack",
    "add-to-cart-sauce-labs-bike-light",
    "add-to-cart-sauce-labs-bolt-t-shirt",
  ];

  if (!username || !password) {
    throw new Error(
      "Usuário ou Senha não definidos no arquivo de configuração .env"
    );
  }

  await page.fill("#user-name", username);
  await page.fill("#password", password);
  await page.click("#login-button");

  await expect(tituloProdutos).toBeVisible();

  for (const item of addItemsCart) {
    await page.click(`[data-test=${item}]`);
  }

  await expect(cartBadge).toHaveText("3");
});

test("Remover 2 itens do carrinho na plataforma Saudecemo", async ({
  page,
}) => {
  await page.goto("https://saucedemo.com/");

  const username = process.env.USER;
  const password = process.env.PASSWORD;
 const tituloProdutos = page.locator('[data-test="title"]');
  const cartBadge = page.locator(".shopping_cart_badge");
  const addItemsCart = [
    "add-to-cart-sauce-labs-backpack",
    "add-to-cart-sauce-labs-bike-light",
    "add-to-cart-sauce-labs-bolt-t-shirt",
  ];

  const removeItems = [
    "remove-sauce-labs-backpack",
    "remove-sauce-labs-bike-light",
  ];

  if (!username || !password) {
    throw new Error(
      "Usuário ou Senha não definidos no arquivo de configuração .env"
    );
  }

  await page.fill("#user-name", username);
  await page.fill("#password", password);
  await page.click("#login-button");

  await expect(tituloProdutos).toBeVisible();

  for (const item of addItemsCart) {
    await page.click(`[data-test=${item}]`);
  }

  await expect(cartBadge).toHaveText("3");

  for (const item of removeItems) {
    await page.click(`[data-test=${item}]`);
  }

  await expect(cartBadge).toHaveText("1");
});

test("Validar produtos  restantes na plataforma Saudecemo", async ({
  page,
}) => {
  await page.goto("https://saucedemo.com/");

  const username = process.env.USER;
  const password = process.env.PASSWORD;
 const tituloProdutos = page.locator('[data-test="title"]');
  const cartBadge = page.locator(".shopping_cart_badge");
  const addItemsCart = [
    "add-to-cart-sauce-labs-backpack",
    "add-to-cart-sauce-labs-bike-light",
    "add-to-cart-sauce-labs-bolt-t-shirt",
  ];

  const removeItems = [
    "remove-sauce-labs-backpack",
    "remove-sauce-labs-bike-light",
  ];

  if (!username || !password) {
    throw new Error(
      "Usuário ou Senha não definidos no arquivo de configuração .env"
    );
  }

  await page.fill("#user-name", username);
  await page.fill("#password", password);
  await page.click("#login-button");

  await expect(tituloProdutos).toBeVisible();

  for (const item of addItemsCart) {
    await page.click(`[data-test=${item}]`);
  }

  await expect(cartBadge).toHaveText("3");

  for (const item of removeItems) {
    await page.click(`[data-test=${item}]`);
  }

  await expect(cartBadge).toHaveText("1");

  await expect(
    page.locator('[data-test="inventory-item-name"]', {
      hasText: "Sauce Labs Bolt T-Shirt",
    })
  ).toHaveCount(1);
  await expect(
    page.locator('[data-test="inventory-item-price"]', { hasText: "$15.99" })
  ).toHaveCount(2);
  await expect(
    page.getByText(
      "Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt."
    )
  ).toBeVisible();

  await page.locator('[data-test="shopping-cart-link"]').click();

  await expect(
    page.locator('[data-test="inventory-item-name"]', {
      hasText: "Sauce Labs Bolt T-Shirt",
    })
  ).toHaveCount(1);
  await expect(
    page.locator('[data-test="inventory-item-price"]', { hasText: "$15.99" })
  ).toHaveCount(1);
  await expect(
    page.getByText(
      "Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt."
    )
  ).toBeVisible();
});

test("Validar  mensagens de erros  campos não preenchidos nome, endereço e etc.. na plataforma Saudecemo", async ({
  page,
}) => {
  await page.goto("https://saucedemo.com/");

  const username = process.env.USER;
  const password = process.env.PASSWORD;
 const tituloProdutos = page.locator('[data-test="title"]');
  const cartBadge = page.locator(".shopping_cart_badge");
  const addItemsCart = [
    "add-to-cart-sauce-labs-backpack",
    "add-to-cart-sauce-labs-bike-light",
    "add-to-cart-sauce-labs-bolt-t-shirt",
  ];

  const removeItems = [
    "remove-sauce-labs-backpack",
    "remove-sauce-labs-bike-light",
  ];

  const firstName = "Mavis";
  const lastName = "Pantera";
  const zipCode = "36000000";

  if (!username || !password) {
    throw new Error(
      "Usuário ou Senha não definidos no arquivo de configuração .env"
    );
  }

  await page.fill("#user-name", username);
  await page.fill("#password", password);
  await page.click("#login-button");

  await expect(tituloProdutos).toBeVisible();

  for (const item of addItemsCart) {
    await page.click(`[data-test=${item}]`);
  }

  await expect(cartBadge).toHaveText("3");

  for (const item of removeItems) {
    await page.click(`[data-test=${item}]`);
  }

  await expect(cartBadge).toHaveText("1");

  await page.locator('[data-test="shopping-cart-link"]').click();

  await page.locator("#checkout").click();

  await page.locator("#continue").click();

  await expect(
    page.locator("text=Error: First Name is required")
  ).toBeVisible();

  await page.fill("#first-name", firstName);

  await page.locator("#continue").click();

  await page.fill("#last-name", lastName);
  await expect(page.locator("text=Error: Last Name is required")).toBeVisible();
  await page.locator("#continue").click();
  await expect(
    page.locator("text=Error: Postal Code is required")
  ).toBeVisible();

  await page.fill("#postal-code", zipCode);
  await page.locator("#continue").click();
});
