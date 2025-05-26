import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  //  Executar arquivos de teste em paralelo
  fullyParallel: true,

  //  Impede que test.only fique por acidente
  forbidOnly: !!process.env.CI,

  //  Repetir testes no CI para evitar flakiness
  retries: process.env.CI ? 2 : 0,

  //  Se estiver no CI, rodar só com 1 worker para estabilidade
  workers: process.env.CI ? 1 : undefined,

  //  Relatório HTML gerado automaticamente
  reporter: [['html', { open: 'never' }]],

  use: {


    //  Coletar trace se falhar
    trace: 'on-first-retry',

    //  Capturar screenshot só se falhar
    screenshot: 'only-on-failure',

    //  Capturar vídeo só se falhar
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Descomente se quiser também testar em outros navegadores:
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  // Se tiver um dev server, configure aqui
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
